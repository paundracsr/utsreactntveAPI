import {
    FETCH_DATA_REQUEST,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILURE,
  } from "./actionTypes";
  
  
  interface DataState {
    data: any[];
    loading: boolean;
    error: string | null;
  }
  
  
  const initialState: DataState = {
    data: [],
    loading: false,
    error: null,
  };
  
  
  const dataReducer = (state = initialState, action: any): DataState => {
    switch (action.type) {
      case FETCH_DATA_REQUEST:
        return {...state, loading: true, error: null};
      case FETCH_DATA_SUCCESS:
        return {...state, loading: false, data: action.payload};
      case FETCH_DATA_FAILURE:
        return {...state, loading: false, error: action.error};
      default:
        return state;
    }
  };
  
  
  export default dataReducer;