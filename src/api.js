import axios from "axios";

const AUTH_API_ENDPOINT =
  "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth";

export const signUp = payload => axios.post(AUTH_API_ENDPOINT, payload);
