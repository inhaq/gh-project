import {combineReducers} from '@reduxjs/toolkit'
import searcherSlice from "../features/searcher/searcherSlice";

const rootReducer = combineReducers({
  searcher: searcherSlice
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
