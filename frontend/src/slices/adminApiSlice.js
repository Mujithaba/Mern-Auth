
import { apiSlice } from "./apiSlice";


const ADMIN_URL = '/api/admin';


export const adminsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // admin
        adminLogin: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/adminAuth`,
                method: 'POST',
                body: data
            })
        }),
        adminLogout: builder.mutation({
            query: () => ({
                url: `${ADMIN_URL}/logout`,
                method: 'POST',
            }),
        }),
        getUsersData: builder.mutation({
            query: () => ({
                url: `${ADMIN_URL}/users`,
                method: 'GET',
            })
        }),
        deleteUser: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/users/delete?id=${data}`,
                method: 'DELETE',
            })
        }),
        updateUserAdmin: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/users/updateUser`,
                method: 'PUT',
                body: data
            })
        }),
        addNewUser: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/addUser`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});


export const {
    useAdminLoginMutation,
    useAdminLogoutMutation,
    useGetUsersDataMutation,
    useDeleteUserMutation,
    useUpdateUserAdminMutation,
    useAddNewUserMutation
} = adminsApiSlice;