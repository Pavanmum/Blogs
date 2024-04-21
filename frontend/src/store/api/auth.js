import axios from "axios";

export const signupUser = async (name, email, password) => {
  const response = await axios.post(
    `${window.location.origin}/api/v1/signup`,
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
  const response = await axios.post(`${window.location.origin}/api/v1/login`, {
    email: email,
    password: password,
  });
  console.log(response.data);
  return response.data;
};
