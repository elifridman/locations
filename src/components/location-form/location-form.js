import React, { Component } from 'react';
import { connect } from 'react-redux';
import { categoriesFetchData  } from '../../actions/categoriesAction';
import { addLocationItem } from '../../actions/locationsAction';
import { editLocationItem } from '../../actions/locationsAction';

import _  from 'lodash';
import uuidv1 from  'uuid/v1';



class LocationForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      _id: null,
      locationName: '',
      locationAddress:'',
      latitude:'',
      longitude:'',
      categories: {},
      filteredCategories:{},
      selectedCategories: {},
      formErrors:{locationName: {valid:false, touch:false}, locationAddress: {valid:false, touch:false}, latitude: {valid:false, touch:false}, longitude: {valid:false, touch:false}, categories: {valid:false, touch:false}},
      formValid: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
logValidation(){

}
validateField(fieldName, value){
  let fieldValidationErrors = this.state.formErrors;
  let locationNameValid = this.state.locationName.valid;
  let locationAddressValid = this.state.locationAddress.valid;
  let latitudeValid = this.state.latitude.valid;
  let longitudeValid = this.state.longitude.valid;
  let categoriesValid = this.state.selectedCategories || {};



   switch(fieldName) {
     case 'locationName':
       locationNameValid = value.length > 0;
       fieldValidationErrors.locationName.valid = locationNameValid ? true : false;
       fieldValidationErrors.locationName.touch = true;
       break;
     case 'locationAddress':
       locationAddressValid = value.length > 0;
       fieldValidationErrors.locationAddress.valid = locationAddressValid ? true : false;
       fieldValidationErrors.locationAddress.touch = true
       break;
     case 'latitude':
       latitudeValid = value.length > 0;
       fieldValidationErrors.latitude.valid = latitudeValid ? true : false;
       fieldValidationErrors.latitude.touch = true;
       break;
     case 'longitude':
       longitudeValid = value.length > 0;
       fieldValidationErrors.longitude.valid = longitudeValid ? true : false;
       fieldValidationErrors.longitude.touch = true;
       break;
     case 'categories':
       categoriesValid = Object.keys(categoriesValid).length > 0;
       fieldValidationErrors.categories.valid = categoriesValid ? true : false;
       fieldValidationErrors.categories.touch = true;
       break;
     default:
       break;
   }
   this.setState({
     formErrors: fieldValidationErrors
    }, this.validateForm);
  }

validateForm() {
  let formValidUpdate = this.state.formErrors.locationName && this.state.formErrors.locationAddress &&
  this.state.formErrors.latitude && this.state.formErrors.longitude && this.state.formErrors.categories;
 this.setState({
   formValid: formValidUpdate
 },this.logValidation);

}

handleInputChange(e){
  let stateName = e.target.name;
  let stateValue = e.target.value;
  if(stateName !== 'categories'){
    this.setState({
      [stateName]:stateValue
    }, () =>{
      this.validateField(stateName, stateValue)
    })
  }else{
    this.selectCategory(stateValue, stateName)
  }
}
selectCategory(id, stateName){
  if(id !== 'select category'){
    this.setState({
      filteredCategories: _.omit(this.state.filteredCategories, id),
      selectedCategories: {...this.state.selectedCategories, [id]:{_id:id, name:id}}
    },()=>{
      this.validateField(stateName, id)
    })
  }else{
    this.validateField(stateName, id)
  }

}
removeCategory(id){
  this.setState({
    selectedCategories: _.omit(this.state.selectedCategories, id),
    filteredCategories: {...this.state.filteredCategories, [id]:{_id:id, name: id}}
  }, ()=>{
      this.validateField('categories', id)
  })
}
onSubmit(e){
   e.preventDefault();
  let selectedCat = Object.values(this.state.selectedCategories).map((value)=>{
    return value.name;
  })
  let id = this.state._id || uuidv1();
  let location = {
      _id: id,
      name:this.state.locationName,
      address:this.state.locationAddress,
      lat:this.state.latitude,
      long:this.state.longitude,
      category:selectedCat
    }
    if(Object.keys(this.props.selectedLocation).length > 0){
      this.props.editLocationItem(location);
    }
    this.props.addLocationItem(location);

}
  render(){

    const renderCategoriesList = () =>{
      return Object.keys(this.state.filteredCategories).map((key) =>{
        const category = this.state.filteredCategories[key];
          return (
            <option value ={category._id} key={category._id}>{category.name}</option>
          )
      })
    }
    const renderBadges = () =>{
      return Object.keys(this.state.selectedCategories).map((key) =>{
        const selectedCategory = this.state.selectedCategories[key];
          return (

              <span key={selectedCategory._id} className="badge badge-success">{selectedCategory.name}

                  <span onClick={()=>{
                    this.removeCategory(selectedCategory.name)
                  }} className="close-badge" aria-hidden="true">&times;</span>

              </span>

          )
      })
    }
    let nameError = !this.state.formErrors.locationName.valid && this.state.formErrors.locationName.touch;
    let addressError = !this.state.formErrors.locationAddress.valid && this.state.formErrors.locationAddress.touch;
    let latitudeError = !this.state.formErrors.latitude.valid && this.state.formErrors.latitude.touch;
    let longitudeError = !this.state.formErrors.longitude.valid && this.state.formErrors.longitude.touch;
    let categoriesError = !this.state.formErrors.categories.valid && this.state.formErrors.categories.touch;
    return(
      <div className="location-form">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="location-name">Location Name</label>
                <input
                  type="text"
                  value={this.state.locationName}
                  onChange={this.handleInputChange}
                  onBlur ={this.handleInputChange}
                  className={"form-control " + (nameError?'border border-danger':'')}
                  id="location-name"
                  name="locationName"
                  placeholder="Enter Location Name"
                />
                <div className={"invalid-feedback "+(nameError? 'd-block':'')}>Please add location name.</div>
              </div>
              <div className="form-group">
                <label htmlFor="location-address">Location Address</label>
                <textarea
                  className={"form-control " + (addressError?'border border-danger':'')}
                  id="location-address"
                  value={this.state.locationAddress}
                  onChange={this.handleInputChange}
                  onBlur ={this.handleInputChange}
                  rows="3"
                  name="locationAddress"></textarea>
                  <div className={"invalid-feedback "+(addressError? 'd-block':'')}>Please add location name.</div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="latitude">Latitude</label>
                  <input
                    type="text"
                    className={"form-control " + (latitudeError?'border border-danger':'')}
                    id="latitude"
                    value={this.state.latitude}
                    onChange={this.handleInputChange}
                    onBlur ={this.handleInputChange}
                    placeholder="Enter Latitude"
                    name="latitude"/>
                    <div className={"invalid-feedback "+(latitudeError? 'd-block':'')}>Please add location name.</div>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="longitude">Longitude</label>
                  <input
                    type="text"
                    className={"form-control " + (longitudeError?'border border-danger':'')}
                    id="longitude"
                    value={this.state.longitude}
                    onChange={this.handleInputChange}
                    onBlur ={this.handleInputChange}
                    placeholder="Enter Longitude"
                    name="longitude"/>
                    <div className={"invalid-feedback "+(longitudeError? 'd-block':'')}>Please add location name.</div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="cateories">Select Categories</label>
                <select name="categories" onChange={this.handleInputChange} onBlur ={this.handleInputChange}  className={"form-control select-category "+(categoriesError?'border border-danger':'')} id="cateories">
                  <option>select category</option>
                  {renderCategoriesList()}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="selectedCategories">Selected Categories: </label>
                { this.state.selectedCategories?renderBadges():''}
              </div>
              <button  type="submit" value="">Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount(){
    this.props.fetchDatacategories('categories');
  }
  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.categories).length>0) {
      this.setState({
        filteredCategories:nextProps.categories
      })
    }
    if(Object.keys(this.props.selectedLocation).length > 0){
      const selectedLocation = Object.values(nextProps.selectedLocation)[0];
      let selectedCategoryArr = selectedLocation.category.map((cat)=>{
        return {_id:cat, name:cat}
      })
        let selectedCategoryObj =_.mapKeys(selectedCategoryArr, '_id');
      this.setState({
        _id:selectedLocation._id,
        locationName:selectedLocation.name,
        locationAddress:selectedLocation.address,
        latitude:selectedLocation.lat,
        longitude:selectedLocation.long,
        selectedCategories:selectedCategoryObj
      });
    }
  }
}

const mapStateToProps = (state) =>{
  return{
    categories: state.categories.categories,
    selectedLocation: state.locations.selectedLocation,
  }
}
const mapDispatchToProps = (dispatch) =>{
  return {
    fetchDatacategories: (term) => dispatch(categoriesFetchData(term)),
    addLocationItem: (location) => dispatch(addLocationItem(location)),
    editLocationItem: (location) => dispatch(editLocationItem(location)),


  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationForm);
