import {
    FETCH_DATA_REQUEST,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILURE,
  } from "./actionTypes";
  
  
  export const fetchDataRequest = () => ({
    type: FETCH_DATA_REQUEST,
  });
  
  
  export const fetchDataSuccess = (data: any) => ({
    type: FETCH_DATA_SUCCESS,
    payload: data,
  });
  
  
  export const fetchDataFailure = (error: string) => ({
    type: FETCH_DATA_FAILURE,
    error,
  });
  