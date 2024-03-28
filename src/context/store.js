import { configureStore } from "@reduxjs/toolkit";

// Reducers
import tasksReducer from "./reducers/tasksReducer";


// Store 
export default configureStore({
    reducer: {
        tasks: tasksReducer,
    },
    // For Removing state management serialzable Problems
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})