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
  USER_UPDATE_SUCCESS,
} from "../constants/userConstants";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = (email: string, password: string) => async (dispatch: any) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    AsyncStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error: any) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => async (dispatch: any) => {
  AsyncStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};

export const register = (name: string, email: string, password: string, accountType: string) => async (dispatch: any) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users",
      { name, accountType, email, password },
      config
    );

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    AsyncStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error: any) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


// export const updateProfile = (user: any) => async (dispatch: any, getState: any) => { try { dispatch({ type: USER_UPDATE_REQUEST }); const { userLogin: { userInfo }, } = getState(); const config = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };
// 
//     const { data } = await axios.post("/api/users/profile", user, config);
// 
//     dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
// 
//     dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
// 
//     localStorage.setItem("userInfo", JSON.stringify(data));
//   } catch (error: any) {
//     dispatch({
//       type: USER_UPDATE_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };
