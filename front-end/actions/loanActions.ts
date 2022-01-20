import {
    ASSET_ADD_DATA_ADDED,
    ASSET_ADD_DATA_REQUEST,
    ASSET_LOAD_COMPLETED,
    ASSET_LOAD_STARTED
} from "../constants/loanConstants";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadAssets = (userToken: string) => async (dispatch: any) => {
    dispatch({
        type: ASSET_LOAD_STARTED,
    });
    const config = {
      headers: {
          "Authorization": `Bearer ${userToken}`,
      },
    };
    try {
        const { data } = await axios.get("/api/loans/load_assets", config);
        dispatch({
            type: ASSET_LOAD_COMPLETED,
            payload: {
                data: data,
            },
        });
    } catch(err) {
        console.log("axios ran into an error when fetching assets");
        dispatch({
            type: ASSET_LOAD_COMPLETED,
            payload: {
                error: err,
            },
        })
    }
}

export const addAsset = (tokenName: string, tokenType: string, amountCreated: number, valueCreated: number, userToken: string) => async (dispatch: any) => {
    dispatch({
        type: ASSET_ADD_DATA_REQUEST
    });
    const config = {
      headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${userToken}`,
      },
    };
    const body = {
        tokenName,
        tokenType,
        amountCreated,
        valueCreated,
    }
    try {
        const { data } = await axios.post("/api/loans/create-asset", body, config);
        dispatch({
            type: ASSET_ADD_DATA_ADDED,
            payload: {
                data
            },
        })
    } catch(err) {
        console.log("There was an error when adding a new asset");
        dispatch({
            type: ASSET_ADD_DATA_ADDED,
            payload: {
                error: err,
            },
        });
    }

}

// export const login = (email: string, password: string) => async (dispatch: any) => {
//   try {
//     dispatch({ type: USER_LOGIN_REQUEST });

//     const config = {
//       headers: {
//         "Content-type": "application/json",
//       },
//     };

//     const { data } = await axios.post(
//       "/api/users/login",
//       { email, password },
//       config
//     );

//     dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

//     AsyncStorage.setItem("userInfo", JSON.stringify(data));
//   } catch (error: any) {
//     dispatch({
//       type: USER_LOGIN_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };