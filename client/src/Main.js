import React, { Component } from "react";
import { 
    Routes,  
    Route,
    NavLink,
    HashRouter
  } from "react-router-dom";
  import Home from "./Home";
  import Stuff from "./Stuff";
  import Contact from "./Contact";
  import RegistrationForm from "./RegistrationForm";
  import Dashboard from "./Dashboard";

class Main extends Component {
  render() {
    return (
        <HashRouter>
        <div>
          <h1>Simple SPA</h1>
          <ul className="header">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/stuff">Stuff</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
            <li><NavLink to="/registrationform">Registration Form</NavLink></li>
            <li><NavLink to="/dashboard">Dashboard</NavLink></li>
          </ul>
          <div className="content">
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path="/stuff" element={<Stuff/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/registrationform" element={<RegistrationForm/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Routes>
          </div>
        </div>
        <div id="footer">
        <p>© 2022 Rizwan Parwej, All Rights Reserved.</p>
        </div>
      </HashRouter>
    );
  }
}
 
export default Main;