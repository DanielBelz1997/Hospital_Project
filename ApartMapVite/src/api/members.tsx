import axios from "axios";

export const retrieveMembers = async () => {
  const response = await axios.get(
    "http://127.0.0.1:3302/api/members/",
  );
  return response.data;
};

