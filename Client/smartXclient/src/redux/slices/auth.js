import { createSlice } from "@reduxjs/toolkit";

let tokenFromStorage = null;
try {
  const storedToken = localStorage.getItem("token");
  tokenFromStorage = storedToken ? JSON.parse(storedToken) : null;
} catch (error) {
  console.error("Error parsing token from localStorage:", error);
  tokenFromStorage = null;
}

const initialState={
    token: tokenFromStorage
}



export const authSlice= createSlice({
    name:"auth",
    initialState,
    reducers:{
        setToken:(state,value)=>{
            state.token=value.payload;
            localStorage.setItem("token",JSON.stringify(state.token));
        }
    }
});


export const {setToken} = authSlice.actions;

export default authSlice.reducer;