const request = require("supertest");
const app = require('../src/server')

console.log(app)

describe("Test the root path", () => {
  test("It should response the GET method", () => {
    return request(app)
      .get("/")
      .expect(200);
  });
});

//testing to ensure invalid request returns 400 status 

//testing to determine shape of mock OTEL data is correct 