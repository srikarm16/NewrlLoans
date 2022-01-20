import { ActivityIndicatorBase } from "react-native";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS, } from "../constants/userConstants";

export const assetReducer = (state = {}, action: any) {
    switch(action.type) {
        default: 
            return state;
    }
}
