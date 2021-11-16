import { configureStore } from '@reduxjs/toolkit';

import { cohortsReducer } from './discussions/cohorts/data';
import { commentsReducer } from './discussions/comments/data';
import { configReducer } from './discussions/data/slices';
import { threadsReducer } from './discussions/posts/data';
import { topicsReducer } from './discussions/topics/data';

export function initializeStore(preloadedState = undefined) {
  return configureStore({
    reducer: {
      topics: topicsReducer,
      threads: threadsReducer,
      comments: commentsReducer,
      cohorts: cohortsReducer,
      config: configReducer,
    },
    preloadedState,
  });
}

const store = initializeStore();

export default store;
