import React, { Component } from 'react';
import { connect } from 'react-redux';
import _  from 'lodash';
import { selectLocation } from '../../actions/locationsAction';

class LocationItem extends Component{
  constructor(props){
    super(props);
  }
  render(){
    const selectLocation = ()=>{
      this.props.selectLocation(this.props.location);
    }
    return(
      <div className="location-item d-flex justify-content-between align-items-center">
        <span className="item-name">{this.props.location.name}</span>
        <input onClick={selectLocation} className="" type="radio" name="list-radio" id="radio-1" value={this.props.location._id}/>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) =>{
  return {
    selectLocation: (item) => dispatch(selectLocation(item)),

  }
}
export default connect(null, mapDispatchToProps)(LocationItem);
