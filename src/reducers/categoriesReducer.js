import { CATEGORIES_FETCH_DATA_SUCCESS } from '../constans/constans';
import { FILTER_CATEGORIES_ADD_ITEM } from '../constans/constans';
import { FILTER_CATEGORIES_REMOVE_ITEM } from '../constans/constans';
import { FETCH_FILTER_CATEGORIES } from '../constans/constans';

import _  from 'lodash';

const initialState = {
  categories: {

  },
  filteredCategories: {

  }
}

export default function(state = initialState, action){
  switch (action.type) {

    case CATEGORIES_FETCH_DATA_SUCCESS:
      const newCategories = _.mapKeys(action.categories, '_id');
        state = {
          ...state,
          filteredCategories:{
            ...state.filteredCategories,
            ...newCategories
          },
          categories:{
            ...state.categories,
            ...newCategories
          }

        }
        return state;
      break;

      case FILTER_CATEGORIES_ADD_ITEM:
        const newFilteredCategories = _.omit(state.filteredCategories, action.category)
          state = {
            ...state,
            filteredCategories:{
              ...newFilteredCategories
            },
            selectedFilterdCategories:{
              ...state.selectedFilterdCategories,
              [action.category]:{_id: action.category, name: action.category}
            }
          }
          return state;
        break;


        case FILTER_CATEGORIES_REMOVE_ITEM:
          const newSelectedFilteredCategories = _.omit(state.selectedFilterdCategories, action.category)
            state = {
              ...state,
              filteredCategories:{
                ...state.filteredCategories,
                [action.category]:{_id: action.category, name: action.category}

              },
              selectedFilterdCategories:{
                ...newSelectedFilteredCategories
              }
            }
            return state;
          break;


    default:
      return state;
  }
}
