import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
  SliceSelectors,
} from "@reduxjs/toolkit";

interface DashboardState {
  comments: Array<Comment>;
}

export const dashboardSlice = createSlice<
  DashboardState,
  SliceCaseReducers<DashboardState>,
  "dashboard",
  SliceSelectors<DashboardState>
>({
  name: "dashboard",
  initialState: { comments: [] },
  reducers: {
    commentsLoaded: (dashboard, action) => {
      dashboard.comments = action.payload;
    },
  },
});

export const { commentsLoaded } = dashboardSlice.actions;

// selectors
export const comments = (state: DashboardState) => {
  return state.comments;
};

// TO DO: implement isAuthorized, isOwner, isVerified
