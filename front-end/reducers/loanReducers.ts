import {
  ASSET_ADD_DATA_ADDED,
  ASSET_ADD_DATA_REQUEST,
  ASSET_LOAD_COMPLETED,
  ASSET_LOAD_STARTED
} from "../constants/loanConstants";

export const assetReducer = (state = { assetLoaded: false, }, action: any) => {
    switch(action.type) {
      case ASSET_LOAD_STARTED:
        return {
          ...state,
          assetLoading: true,
        };
      case ASSET_LOAD_COMPLETED:
        return {
          ...state,
          assetLoading: false,
          assetLoaded: true,
          data: action.payload.data,
          error: action.payload.error,
        };
      default: 
          return state;
    }
}
