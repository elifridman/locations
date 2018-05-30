import { combineReducers } from 'redux';
import LocationsReducer from './locationsReducer';
import CategoriesReducer from './categoriesReducer';
import HasErrorReducer from './hasErrorReducer';
import IsLoadingReducer from './isLoadingReducer';
import { reducer as formReducer } from 'redux-form';



export default combineReducers({
  locations: LocationsReducer,
  categories: CategoriesReducer,
  hasError: HasErrorReducer,
  isLoading: IsLoadingReducer,
  form: formReducer
});
