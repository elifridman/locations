import { ITEMS_IS_LOADING } from '../constans/constans';

const initialState = {

}

export default function(state = initialState, action){
  switch (action.type) {
    // case ITEMS_IS_LOADING:
    //   return action.isLoading;
    //   break;
    default:
      return state;
  }
}
