import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';
import {RootState} from "../../app/rootReducer";
import axios from "axios";

interface SearcherState {
  search: string
  dropdown: string
  repo: object
  user: object
}

interface DiffState {
  search: string
  dropdown: string
  repo: object
  user: object
}

const initialState: DiffState = {
    search: '',
    dropdown: 'repos',
    repo: [],
    user: []
};

export interface RepoDetails {
  id: number
  name: string
  full_name: string
  open_issues_count: number
}

export interface User {
  login: string
  avatar_url: string
}

export const searchSlice = createSlice({
  name: 'searcher',
  initialState,
  reducers: {
    logged: (state, action: PayloadAction<SearcherState>) => {
      state.search = action.payload.search;
      state.dropdown = action.payload.dropdown;
      state.repo = action.payload.repo;
      state.user = action.payload.user;
    },
    repoDeets: (state, action: PayloadAction<RepoDetails>) => {
      state.repo = action.payload
    },
    userDeets: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    }
  },
})

export const { logged, repoDeets, userDeets } = searchSlice.actions;

export async function getRepoDetails(repo: string) {
  const url = `https://api.github.com/search/repositories?q=${repo}`

  const { data } = await axios.get<RepoDetails>(url)
  return data
}

export async function getUserDetails(user: string) {
  const url = `https://api.github.com/search/users?q=${user}`

  const { data } = await axios.get<User>(url)
  return data
}

export const loggedAsync = (repo: string): AppThunk => async dispatch => {
  try {
    const repoDetails = await getRepoDetails(repo)
    dispatch(repoDeets(repoDetails))
  } catch (err) {
    console.log(err)
  }
};

export const userAsync = (user: string): AppThunk => async dispatch => {
  try {
    const userDetails = await getUserDetails(user)
    dispatch(userDeets(userDetails))
  } catch (err) {
    console.log(err)
  }
};

export const selectSearch = (state: RootState) => state.searcher;

export default searchSlice.reducer;
