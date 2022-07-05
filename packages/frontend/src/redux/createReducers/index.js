import { combineReducers } from 'redux';

import combinedMainReducers from './combinedMainReducers';
import combinedSharedReducers from './combinedSharedReducers';
import setupAccountReducer from './setupAccountReducer';

export default (history) => combineReducers({
    // 还是combine
    ...combinedMainReducers(history),
    ...combinedSharedReducers,
    ...setupAccountReducer()
});
