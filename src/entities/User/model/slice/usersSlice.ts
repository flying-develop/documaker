/* eslint-disable import/no-cycle */
import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';
import { fetchUsersFulfilled } from '&/entities/User/model/slice/reducers/fetchUsersFulfilled';
import { fetchUsers } from '../services/fetchUsers';
import { UsersSchema } from '../types/UsersSchema';
import { setPending } from './reducers/setPending';
import { setRejected } from './reducers/setRejected';
import { fetchRoles } from '../services/fetchRoles';
import { fetchRolesFulfilled } from './reducers/fetchRolesFulfilled';
import { fetchUpdateUserById } from '../services/fetchUpdateUserById';
import { fetchUpdateUserByIdFulfilled } from './reducers/fetchUpdateUserByIdFulfilled';
import { addUser } from '../services/addUser';
import { addUserFulfilled } from './reducers/addUserFulfilled';
import { blockUser } from '../services/blockUser';
import { blockUserFulfilled } from './reducers/blockUserFulfilled';
import { deleteUser } from '../services/deleteUser';
import { deleteUserFulfilled } from './reducers/deleteUserFulfilled';
import { editUser } from '../services/editUser';
import { editUserFulfilled } from './reducers/editUserFulfilled';
import { changeUserManagers } from '../services/changeUserManagers';
import { changeUserManagersFulfilled } from './reducers/changeUserManagersFulfilled';
import { setUserFilter } from './reducers/setUserFilter';
import { deleteUserFilter } from './reducers/deleteUserFilter';
import { resetTemplateFilters } from './reducers/resetTemplateFilters';

const initialState: UsersSchema = {
    error: null,
    loading: false,
    users: [],
    roles: [],
    pagination: {
        current: 1,
        pageSize: 20,
        total: 0,
    },
    filters: {},
};
export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUserFilter,
        deleteUserFilter,
        resetTemplateFilters,
    },
    extraReducers: (builder: ActionReducerMapBuilder<UsersSchema>) => {
        builder
            .addCase(fetchUsers.pending, setPending)
            .addCase(fetchUsers.rejected, setRejected)
            .addCase(fetchUsers.fulfilled, fetchUsersFulfilled)

            .addCase(addUser.pending, setPending)
            .addCase(addUser.rejected, setRejected)
            .addCase(addUser.fulfilled, addUserFulfilled)

            .addCase(editUser.pending, setPending)
            .addCase(editUser.rejected, setRejected)
            .addCase(editUser.fulfilled, editUserFulfilled)

            .addCase(fetchRoles.pending, setPending)
            .addCase(fetchRoles.rejected, setRejected)
            .addCase(fetchRoles.fulfilled, fetchRolesFulfilled)

            .addCase(blockUser.pending, setPending)
            .addCase(blockUser.rejected, setRejected)
            .addCase(blockUser.fulfilled, blockUserFulfilled)

            .addCase(deleteUser.pending, setPending)
            .addCase(deleteUser.rejected, setRejected)
            .addCase(deleteUser.fulfilled, deleteUserFulfilled)

            .addCase(fetchUpdateUserById.pending, setPending)
            .addCase(fetchUpdateUserById.rejected, setRejected)
            .addCase(fetchUpdateUserById.fulfilled, fetchUpdateUserByIdFulfilled)

            .addCase(changeUserManagers.pending, setPending)
            .addCase(changeUserManagers.rejected, setRejected)
            .addCase(changeUserManagers.fulfilled, changeUserManagersFulfilled);
    },
});

export const { actions: usersActions } = usersSlice;
export const { reducer: usersReducer } = usersSlice;
