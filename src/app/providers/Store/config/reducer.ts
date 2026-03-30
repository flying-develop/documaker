/* eslint-disable import/no-cycle */

import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { templatesReducer as templates } from '&/entities/Template/model/slice/templatesSlice';
import { usersReducer as users } from '&/entities/User/model/slice/usersSlice';
import { tagsReducer as tags } from '&/entities/Tag/model/slice/tagsSlice';
import { authReducer as auth } from '&/entities/Auth/model/slice/authSlice';
import { profileReducer as profile } from '&/entities/Profile/model/slice/profileSlice';

export const reducers = combineReducers({
    auth,
    profile,
    templates,
    users,
    tags
});

const reducer = persistReducer(
    {
        key: 'root',
        storage,
        version: 1,
        blacklist: ['auth', 'profile', 'templates', 'users', 'tags'],
    },
    reducers,
);

export type RootState = ReturnType<typeof reducer>;
export default reducer;
