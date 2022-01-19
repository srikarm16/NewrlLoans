import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
// import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ReduxState {
    userLogin: {
        loading: boolean,
        userInfo: {
            _id: string,
            accountType: string,
            email: string,
            isAdmin: boolean,
            name: string,
            token: string,
        },
    };
    userRegister: {
        loading: boolean,
        userInfo: {
            _id: string,
            accountType: string,
            email: string,
            isAdmin: boolean,
            name: string,
            token: string,
        },
    };
    userUpdate: {
        loading: boolean,
        userInfo: {
            _id: string,
            accountType: string,
            email: string,
            isAdmin: boolean,
            name: string,
            token: string,
        },
    };
}


const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
});


// const userInfoFromStorage = AsyncStorage.getItem("userInfo")
//   ? JSON.parse(AsyncStorage.getItem("userInfo"))
//   : null;

const initialState = {
  userLogin: { userInfo: null },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
