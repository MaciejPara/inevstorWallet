const { expect } = require("chai");
const fetchApi = require("./utils/fetchApi");

describe("Create user", () => {

    it("Should create new user", async() => {
        const res = await fetchApi("post", "user", { email: "test@email.com", password: "11111111" });

        expect(res).to.be.a("object");
        expect(res._id).to.be.a("string");
    });

});