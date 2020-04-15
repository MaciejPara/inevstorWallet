const { expect } = require("chai");
const fetchApi = require("./utils/fetchApi");

describe("Is admin", () => {

    it("Should find an admin", async() => {
        const res = await fetchApi("get", "users", { role: "admin" });

        expect(res[0]).to.be.a("object");
        expect(res[0].role).to.be.equal("admin");
    });

});