import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/register-user",
        method: "POST",
        body: userInfo,
      }),
    }),
    changeUserRole: builder.mutation({
      query: (roleInfo) => ({
        url: "/auth/change-user-role",
        method: "PUT",
        body: roleInfo,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useChangeUserRoleMutation,
} = authApi;
