import _  from 'lodash';
import ls from 'local-storage';
import { LOCATIONS_HAS_ERRORED } from '../constans/constans';
import { LOCATIONS_IS_LOADING } from '../constans/constans';
import { LOCATIONS_FETCH_DATA_SUCCESS } from '../constans/constans';
import { LOCATIONS_SET_DATA_SUCCESS } from '../constans/constans';
import { FILTER_LOCATIONS } from '../constans/constans';
import { SELECT_LOCATION } from '../constans/constans';
import { UPDATE_LOCATIONS } from '../constans/constans';
import { DELETE_LOCATIONS } from '../constans/constans';







export function locationsFetchData(key){
  return (dispatch) =>{
    try {
      var locations = ls.get('locations');
    } catch (e) {}
    if(Array.isArray(locations)){
      dispatch(locationsFetchDataSuccess(locations))
    }else{
      dispatch(locationsFetchDataSuccess([]))
    }
  }
}
export function locationsSetData(locations, key){

  return (dispatch) =>{
    if(Array.isArray(locations)){
      ls.set(key, locations);
      return locations;
    }
  }
}
export function addLocationItem(location){
  return (dispatch) =>{
    if(Object.keys(location).length > 0){
      try {
        let oldLocations = ls.get('locations') || [];
        oldLocations.push(location);
        ls.set('locations', oldLocations);
      } catch (e) {}
    }
  }
}
export function editLocationItem(location){
  return (dispatch) =>{
    if(Object.keys(location).length > 0){
      try {
        let oldLocations = ls.get('locations') || [];
        let updateLocations = oldLocations.map((loc)=>{
          if(location._id === loc._id){
            loc._id = location._id,
            loc.name = location.name,
            loc.address = location.address,
            loc.lat = location.lat,
            loc.long = location.long,
            loc.category = location.category
          }
          return loc;
        })
        ls.set('locations', updateLocations);
      } catch (e) {}
    }
  }
}

export function deleteLocationItem(id){
  return (dispatch) =>{
    if(id){
      try {
        let oldLocations = ls.get('locations');
        let oldLocationsObj = _.mapKeys(oldLocations, '_id');
        let newLocationsObj = _.omit(oldLocationsObj, id);
        let newLocationsArr = Object.values(newLocationsObj).map((location)=>{
          return location;
        })
        ls.set('locations', newLocationsArr);
        dispatch(deleteLocations(newLocationsArr))
      } catch (e) {}
    }
  }
}

export function locationsFetchDataSuccess(locations) {
    return {
        type: LOCATIONS_FETCH_DATA_SUCCESS,
        locations
    };
}
export function updateLocations(locations) {
    return {
        type: UPDATE_LOCATIONS,
        locations
    };
}
export function deleteLocations(locations) {
    return {
        type: DELETE_LOCATIONS,
        locations
    };
}
export function locationsSetDataSuccess(locations) {
    return {
        type: LOCATIONS_SET_DATA_SUCCESS,
        locations
    };
}
export function selectLocation(location) {
    return {
        type: SELECT_LOCATION,
        location
    };
}
