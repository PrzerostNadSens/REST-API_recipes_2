import { chai, expect, app, chaiHttp } from "../test.config";
chai.use(chaiHttp);

describe("cos", function () {
  it("should do something", function () {
    const sum = 2 + 2;
    expect(sum).to.eq(4);
  });
});
