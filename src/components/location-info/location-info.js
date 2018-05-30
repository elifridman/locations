import React, { Component } from 'react';
import { connect } from 'react-redux';
import _  from 'lodash';
import { locationsFetchData } from '../../actions/locationsAction';
import { withRouter } from 'react-router-dom'


class LocationInfo extends Component{
  constructor(props){
    super(props);
    this.state = {
      selectedLocation : {}
    }
  }
  render(){
    if(Object.keys(this.props.locations).length===0){
      return(
        <div>Loading...</div>
      )
    }

    const locationId = this.props.match.params.id
    const { locations } = this.props;
    const selectedLocation = locations[locationId];


    const renderSelectedCategories = () =>{
      return selectedLocation.category.map((cat) =>{
        return(
          <span key={cat} className="badge badge-primary">{cat}</span>
        )
      })
    }

    const renderInfoPage = ()=>{
      return (
        <div className="jumbotron">
          <h4 className="display-3"><span className="info-title">location title: </span>{selectedLocation.name}</h4>
          <p className="lead"><span className="info-title">location categories</span>{renderSelectedCategories()}</p>
          <hr className="my-4"/>
          <p><span className="info-title"></span>{selectedLocation.address}</p>
          <p><span className="info-title"></span>{selectedLocation.lat}</p>
          <p><span className="info-title"></span>{selectedLocation.long}</p>

        </div>
      )
    }

    return(
      <div className="location-info">
        {renderInfoPage()}
      </div>
    )
  }

componentDidMount(){
  this.props.fetchDataLocations();
}

}

const mapStateToProps = (state) =>{
  return{
    locations: state.locations.locations,
  }
}
const mapDispatchToProps = (dispatch) =>{
  return {
    fetchDataLocations: (term) => dispatch(locationsFetchData(term))
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(withRouter(LocationInfo));
