const express = require("express")
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const helmet = require("helmet")
const morgan = require("morgan")
const path = require("path")
const multer = require("multer")
const cors = require("cors")

const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")

const app = express()
dotenv.config()
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true
    })
    .then(() => console.log("Database connected!"))
    .catch(err => console.log(err));

app.use(express.json())
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))
app.use(helmet())
app.use(morgan("common"))
app.use(cors())

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads")
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name)
    }
})
const upload = multer({ storage: storage })

app.use("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("file has been upload ...")
})
app.use("/api/users", userRoute)
app.get("/test", (req, res) => {
    res.send("start")
})
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)

const port = process.env.PORT || 8800

app.listen(port, () => {
    console.log(`Backend server is running on ${port} `)
})