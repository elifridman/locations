import React, { Component } from 'react';
import { connect } from 'react-redux';
import _  from 'lodash';
import uuidv1 from  'uuid/v1';
import { locationsSetData } from '../../actions/locationsAction';
import { categoriesSetData } from '../../actions/categoriesAction';
import { locationsFetchData } from '../../actions/locationsAction';
import { categoriesFetchData } from '../../actions/categoriesAction';
import LocationItem  from '../location-item/location-item';
import ActionsBar from '../actions-bar/actions-bar';


class LocationList extends Component{
  constructor(props){
    super(props);
    this.state = {
      locations:{},
      filteredLocations:{},
      filteredCategories:{},
      selectedCategories:{}

    }
    this.selectCategory = this.selectCategory.bind(this);
  }
  filterLocations(){
    const newFilterLocations = _.mapKeys (Object.values(this.state.locations).filter((location)=>{
      if(Object.keys(this.state.selectedCategories).length === 0){
        return true;
      }else{
        let include = false;
        for(let selectedCategory in this.state.selectedCategories){
            if(location.category.includes(selectedCategory)){
              include = true;
            }
          }
          return include;
      }
    }), '_id');
    this.setState({
      filteredLocations: {...newFilterLocations}
    })

  }
  selectCategory(e){
    const id = e.target.value;
    if(id !== 'select category'){
      this.setState({
        filteredCategories: _.omit(this.state.filteredCategories, id),
        selectedCategories: {...this.state.selectedCategories, [id]:{_id:id, name:id}}
      },()=>{
        this.filterLocations();
      })
    }

  }
  removeCategory(id){
    this.setState({
      selectedCategories: _.omit(this.state.selectedCategories, id),
      filteredCategories: {...this.state.filteredCategories, [id]:{_id:id, name: id}}
    },()=>{
      this.filterLocations();
    })
  }

  render(){
    let { selectedLocation } = this.props;
    let isSelected = (Object.keys(selectedLocation).length)?true: false;
    const actionsBar = {
      title: 'Locations',
      showMap: true,
      showInfo: true,
      actions: [
        {
          text: 'add location',
          link: '/locations/add'

        },
        {
          text: 'edit location',
          eventType:'locations-edit'

        },
        {
          text: 'delete location',
          eventType:'locations-delete'

        }
      ]
    }
    const renderBadges = () =>{
      return Object.keys(this.state.selectedCategories).map((key) =>{
        const selectedCategory = this.state.selectedCategories[key];
          return (

              <span key={selectedCategory._id} className="badge badge-success">{selectedCategory.name}

                  <span onClick={()=>{this.removeCategory(selectedCategory.name)}} className="close-badge" aria-hidden="true">&times;</span>

              </span>

          )
      })
    }
    const renderCategoriesList = () =>{
      return Object.keys(this.state.filteredCategories).map((key) =>{
        const category = this.state.filteredCategories[key];
          return (
            <option value ={category._id} key={category._id}>{category.name}</option>
          )
      })
    }
    const renderLocationsList = () =>{
      return Object.keys(this.state.filteredLocations).map((key) =>{
        const location = this.state.filteredLocations[key];
          return (
            <li key ={location._id} className="list-group-item mb-4"><LocationItem location = {location} /></li>
          )
      })
    }
    return(

      <div className="justify-content-center">
        <ActionsBar actionsBar = {actionsBar} isSelected={isSelected}/>
          <div className="location-list mt-4">
            <div className="row">
              <div className="col-md-12">
                <div className="filter-categories mb-4 d-flex justify-content-between form-inline">
                  <div className="list-group form-control label-list">
                    {this.state.selectedCategories? renderBadges(): ''}
                  </div>
                  <select onChange={this.selectCategory} className="form-control select-category" id="exampleFormControlSelect1">
                    <option>select category</option>
                    {renderCategoriesList()}
                  </select>
                </div>
            </div>
          </div>
            <div className="row">
              <div className="col-md-12">
                <ul className="list-group">
                 {renderLocationsList()}
                </ul>
              </div>
            </div>

          </div>

      </div>
    )
  }
  componentDidMount(){

    const categories = [
     {_id: 'Vaction', name:'Vaction'},
     {_id: 'Work', name:'Work'},
     {_id: 'Shopping', name:'Shopping'},
     {_id: 'Restaurant', name:'Restaurant'}
   ]
   const locations = [
    {
      _id: uuidv1(),
       name:'my hotel',
       address: 'kohav hyam',
       long: 32.109333,
       lat: 34.855499,
       category: ['Vaction']

     },
    {
      _id: uuidv1(),
       name:'iforex',
       address: 'herzelia',
       long: 32.109377,
       lat: 34.855444,
       category: ['Work']
    },
    {
      _id: uuidv1(),
       name:'my shop',
       address: 'azrieli',
       long: 32.10993,
       lat: 34.855442,
       category: ['Shopping']
    },
    {
      _id: uuidv1(),
       name:'my restaurant',
       address: 'dr shaksoka',
       long: 11.109333,
       lat: 44.855499,
       category: ['Restaurant']
    }
  ]
    /*Setting example data*/
    if(!localStorage.getItem('locations')){
      this.props.setDataLocations(locations, 'locations');
      this.props.setDataCategories(categories, 'categories');
    }

    /*Fetching data*/
    this.props.fetchDataLocations('locations');
    this.props.fetchDatacategories('categories');


  }

  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.locations).length>0) {
      this.setState({
        filteredCategories:nextProps.categories,
        locations:nextProps.locations,
        filteredLocations: nextProps.locations
      })
    }

  }

}

const mapStateToProps = (state) =>{
  return{
    locations: state.locations.locations,
    selectedLocation: state.locations.selectedLocation,
    categories: state.categories.categories,
  }
}
const mapDispatchToProps = (dispatch) =>{
  return {
    fetchDataLocations: (term) => dispatch(locationsFetchData(term)),
    fetchDatacategories: (term) => dispatch(categoriesFetchData(term)),
    setDataLocations: (locations, term) => dispatch(locationsSetData(locations,term)),
    setDataCategories: (categories, term) => dispatch(categoriesSetData(categories, term)),
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(LocationList);
