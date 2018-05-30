import { LOCATIONS_FETCH_DATA_SUCCESS } from '../constans/constans';
import { FILTER_LOCATIONS } from '../constans/constans';
import { SELECT_LOCATION } from '../constans/constans';
import { UPDATE_LOCATIONS } from '../constans/constans';
import { DELETE_LOCATIONS } from '../constans/constans';

import _  from 'lodash';

const initialState = {
  locations:{

  },
  filteredLocations:{

  },
  selectedLocation:{

  }
}


export default function(state = initialState, action){
  switch (action.type) {

    case LOCATIONS_FETCH_DATA_SUCCESS:
    const newLocations = _.mapKeys(action.locations, '_id');
      return {
        ...state,
        locations:{
            ...state.locations,
            ...newLocations
        },
        filteredLocations:{
          ...state.filteredLocations,
          ...newLocations

        }
      }
      break;
      case UPDATE_LOCATIONS:
      const updateLocations = _.mapKeys(action.locations, '_id');
      state = {
        ...state,
        locations:{
          ...state.locations,
          ...updateLocations

        }
      }
      return state
      break;
        case DELETE_LOCATIONS:
          const newUpdateLocations = _.mapKeys(action.locations, '_id');
          state = {
            ...state,
            locations:{
              ...state.locations,
              ...newUpdateLocations
            }
          }
          return state;
        break;

          case SELECT_LOCATION:

            return {
              ...state,
              selectedLocation:{
                [action.location._id]:action.location
              }
            }
          break;
          default:
            return state;
        }


  }
