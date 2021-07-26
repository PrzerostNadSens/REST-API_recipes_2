import chai, { expect, should } from "chai";
import app from "../index";

describe("User", function () {
  describe("POST /user/", function () {
    it("it should POST create user", async function () {
      const response = await chai.request(app).post("/user").send({
        first_name: "Rafal",
        last_name: "Chmielewski",
        login: "134dd33dw",
        email: "313d3dw@pr4dzyklad.com",
        password: "trudne.haslo123",
        role: "Admin",
      });
      expect(response.error).to.be.false;
      expect(response).to.have.status(201);
      expect(response.body).to.not.be.null;
    });
  });

  describe("POST /user/login", function () {
    it("it should POST login user", async function () {
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
