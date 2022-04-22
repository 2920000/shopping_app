import instance from "./axiosClient";

const accountApi = {
  post: async (payload) => {
    const option = payload.option;
    const data = payload.data;
    return instance.post(`/account/${option}`, {
      data,
    });
  },
};

export default accountApi

// const accountApi = {
//   login: async (payload) => {
//     const option = payload.option;
//     const data = payload.data;
//     return instance.post(`/account/${option}`, {
//       data,
//     });
//   },
//   register: async (payload) => {
//     const option = payload.option;
//     const data = payload.data;
//     return instance.post(`/account/${option}`, {
//       data,
//     });
//   },
// };
// export default accountApi;
