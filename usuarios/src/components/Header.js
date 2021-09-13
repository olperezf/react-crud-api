import React, { Component } from "react";
import logo from '../logo.svg';
import '../App.css';

class Header extends Component {
  render() {
    return (
      <div className="text-center">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>App(Usuarios) with React + API  Django o Rails</h2>
      </div>
    );
  }
}

export default Header;
