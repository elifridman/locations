import { ITEMS_HAS_ERRORED } from '../constans/constans';

const initialState = {

}

export default function(state = initialState, action){
  switch (action.type) {
    // case ITEMS_HAS_ERRORED:
    //   //  return action.hasErrored;
    //   return state;
    //   break;
    default:
      return state;
  }
}
