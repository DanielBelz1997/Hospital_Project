const request = require("supertest");
const { app } = require("../server.ts");

const loginTest = {
  username: "dani",
  password: "123456",
};

describe("getList function", () => {
  it("should return a list of users", async () => {
    const Response = await request(app).get("/api/list/getUsers");
    expect(Response.statusCode).toBe(200);
  });
  it("should login a user", async () => {
    const Response = await request(app)
      .get("/api/list/logintUser")
      .send(loginTest);
    expect(Response.statusCode).toBe(200);
  });
});
