import { CATEGORIES_HAS_ERRORED } from '../constans/constans';
import { CATEGORIES_IS_LOADING } from '../constans/constans';
import { CATEGORIES_FETCH_DATA_SUCCESS } from '../constans/constans';
import { CATEGORIES_SET_DATA_SUCCESS } from '../constans/constans';
import { FILTER_CATEGORIES_ADD_ITEM } from '../constans/constans';
import { FILTER_CATEGORIES_REMOVE_ITEM } from '../constans/constans';



/*get data from local storage*/
export function categoriesFetchData(key){
  return (dispatch) =>{
    dispatch(categoriesIsLoading(true));
    const stringCategories = localStorage.getItem(key);
    let categories = [];
    try {
      categories = JSON.parse(stringCategories);
    } catch (e) {
      dispatch(categoriesIsLoading(false));
      return dispatch(categoriesHasErrored);
    }
    if(Array.isArray(categories)){
      dispatch(categoriesIsLoading(false))
      dispatch(categoriesFetchDataSuccess(categories))
    }
  }
}

/*set data in local storage*/
export function categoriesSetData(categories, key){
  return (dispatch) =>{
    if(Array.isArray(categories)){
      localStorage.setItem(key, JSON.stringify(categories));
      return categories;
    }
  }
}

export function categoriesHasErrored(bool) {
    return {
        type: CATEGORIES_HAS_ERRORED,
        hasErrored: bool
    };
}
export function categoriesIsLoading(bool) {
    return {
        type: CATEGORIES_IS_LOADING,
        isLoading: bool
    };
}
export function categoriesFetchDataSuccess(categories) {
    return {
        type: CATEGORIES_FETCH_DATA_SUCCESS,
        categories
    };
}
export function filterCategoriesAddItem(category) {
    return {
        type: FILTER_CATEGORIES_ADD_ITEM,
        category
    };
}
export function filterCategoriesRemoveItem(category) {
    return {
        type: FILTER_CATEGORIES_REMOVE_ITEM,
        category
    };
}

export function categoriesSetDataSuccess(categories) {
    return {
        type: CATEGORIES_SET_DATA_SUCCESS,
        categories
    };
}
