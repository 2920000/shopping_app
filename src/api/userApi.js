import instance from "./axiosClient";

const userApi = {
  updateUserInfor: async (payload) => {
    return instance.post("/user/updateUserInfor", {
      payload,
    });
  },
  fetchShippingAddress: async (userId) => {
    return instance.get("/user/shippingInfor", {
      params: {
        userId,
      },
    });
  },
};

export default userApi;
