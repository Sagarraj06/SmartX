
import { autoBatchEnhancer,configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth.js";
import { userSlice } from "./slices/userData.js";


export const store = configureStore({
    reducer:{
        auth: authSlice.reducer,
        user: userSlice.reducer,
    }
    
});