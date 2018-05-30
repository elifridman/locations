import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// import { locationsSetData } from './actions/locationsAction';
// import { categoriesSetData } from './actions/categoriesAction';
import TopBar from './components/top-bar/top-bar';
import LocationList from './components/location-list/location-list';
import CategoriesList from './components/categories-list/categories-list';
import Footer from './components/footer/footer';
import LocationForm from './components/location-form/location-form';
import LocationInfo from './components/location-info/location-info';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopBar/>
        <div className="container">
          <Switch>
            <Route path="/locations/edit" component={LocationForm} />
            <Route path="/locations/add" component={LocationForm} />
            <Route path="/locations/:id" component={LocationInfo} />
            <Route path="/locations" component={LocationList} />
            <Route path="/categories" component={CategoriesList} />
            <Route exact path="/" render={() => (
                  <Redirect to="/locations"/>
              )}/>
          </Switch>
        </div>
        <Footer/>
      </div>
    );
  }
}
export default App;
