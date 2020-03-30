import axios from "axios";

let mock = {};

if (process.env.NODE_ENV === "test") {
  const MockAdapter = require("axios-mock-adapter");
  mock = mock = new MockAdapter(axios);
}

export { mock, axios };
