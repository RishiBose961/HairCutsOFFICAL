import { useContext, useEffect } from 'react'
import './App.css';
import Authlayout from './Layouts/AuthLayout/Authlayout';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Forgot from './components/Forgot/Forgot';
import Reset from './components/Reset/Reset';
import Activatelayout from './Layouts/ActivateLayout/Activatelayout';
import axios from 'axios';
import { AuthContext } from './context/AuthContext'
import ProfileLayout from './Layouts/ProfileLayout/Home';
import Details from './components/Feed/Details';

function App() {
  const { dispatch, token, isLoggedIn } = useContext(AuthContext)

  //get ac token
  useEffect(() => {
    const _appSignging = localStorage.getItem("_appSignging");
    if (_appSignging) {
      const getToken = async () => {
        const res = await axios.post("/api/auth/access", null);
        dispatch({ type: "GET_TOKEN", payload: res.data.ac_token });
      };
      getToken();
    }
  }, [dispatch, isLoggedIn]);

  //get user data

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        dispatch({ type: "SIGNING" });
        const res = await axios.get("api/auth/user", {
          headers: { Authorization: token },
        });
        dispatch({ type: "GET_USER", payload: res.data });
      };
      getUser();
    }
  }, [dispatch, token])

  return (
    <BrowserRouter>
      <Switch>
        <Route 
        exact 
        path="/" 
        component={isLoggedIn?ProfileLayout:Authlayout} />
        <Route exact path="/forgot" component={Forgot} />
        <Route exact path="/auth/reset-password/:token" component={Reset} />
        <Route exact path="/api/auth/activate/:activation_token"
          component={Activatelayout}
        />
        <Route exact path='/:id' component={isLoggedIn? Details :Authlayout}/>
      </Switch>
      {/* <Slidebar/>
        <Feed/> */}
      {/* <Authlayout/> */}
    </BrowserRouter>
  );
}

export default App;
