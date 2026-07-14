import api from "./api";

export const getProfile = ({ userId, name, email }) =>
  api.get(`/profile/${userId}`, {
    params: {
      name,
      email,
    },
  });
