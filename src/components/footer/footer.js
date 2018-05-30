import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LocationIcon from '../../images/location.png'
import CategoryIcon from '../../images/category.png'

class Footer extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <footer className="footer bg-dark">
        <div className="container">
          <ul className="nav">
            <li className="nav-item">
              <Link to="/locations" className="nav-link" ><img src={LocationIcon}/></Link>
            </li>
            <li className="nav-item">
              <Link to="/categories" className="nav-link" ><img src={CategoryIcon}/></Link>
            </li>
          </ul>
        </div>
    </footer>
    )
  }
}

export default Footer;
