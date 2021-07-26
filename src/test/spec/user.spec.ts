import { chai, expect, app, chaiHttp } from "../test.config";
chai.use(chaiHttp);

import { createUserPayload } from "../mocks/user.mocks";

describe("User", function () {
  describe("POST /user/", function () {
    it("should create user", async function () {
      const response = await chai
        .request(app)
        .post("/user")
        .send(createUserPayload);
      expect(response.error).to.be.false;
      expect(response).to.have.status(201);
      expect(response.body).to.not.be.null;
    });
  });

  describe("POST /user/login", function () {
    it("should login user", async function () {
      const response = await chai.request(app).post("/user/login").send({
        login: "13433dw",
        password: "trudne.haslo123",
      });
      expect(response.error).to.be.false;
      expect(response).to.have.status(200);
      expect(response.body).to.not.be.null;
    });
  });
});
