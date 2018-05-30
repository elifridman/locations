import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TopBar extends Component {


  render(){
    return(
      <nav className="nav top-bar bg-dark">
        <Link to="/" className="nav-link active"><h1>My Locations</h1></Link>
      </nav>
    )
  }
}

export default TopBar;
