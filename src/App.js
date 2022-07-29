import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login"
import Register from './pages/register/Register'
import Profile from "./pages/profile/Profile"
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import Single from "./pages/single/Single";
import axios from "axios";
import { LoginSuccess } from "./context/AuthActions";

function App() {

  const {user,dispatch } = useContext(AuthContext)

  useEffect(() => {
    const getUser = async () =>{
      try {
        const res = await axios.get(`https://knowersocial.herokuapp.com/api/users/${user?._id}`)
        dispatch(LoginSuccess(res.data))
      } catch (err) {
        console.log(err)
      }
    }
    if (user){
      getUser()
    }
  }, [user,dispatch])
  
  return (
    <Router>
      <Switch>
        <Route exact path="/">
            {user ? <Home />: <Register />}
          </Route>
          <Route path="/login">
            {user?<Redirect to="/" />:<Login />}
          </Route>
          <Route path="/register">
            {user?<Redirect to="/" />:<Register />}
          </Route>
          <Route path="/profile/:username">
            <Profile />
          </Route>
          <Route path="/posts/:id">
            <Single />
          </Route>
      </Switch>
    </Router>
  );
}

export default App;
