import axios from "axios";
import { DOMAIN } from "../constant";

export const signupUser = async (name, email, password) => {
  const response = await axios.post(
    `${DOMAIN}/api/v1/signup`,
    {
      name: name,
      email: email,
      password: password,
    }
  );
  console.log(response.data);
  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await axios.post(`${DOMAIN}/api/v1/login`, {
    email: email,
    password: password,
  });
  console.log(response.data);
  return response.data;
};
