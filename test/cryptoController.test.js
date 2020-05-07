const { expect } = require("chai");
const fetchApi = require("./utils/fetchApi");

describe("Test crypto controller", () => {

    const crypto = { name: "Test" };

    it("Should list all cryptos", async() => {
        const res = await fetchApi("get", "cryptos");

        expect(res).to.be.a("array");
    });

    it("Should create new crypto", async() => {
        const res = await fetchApi("post", "crypto", crypto);

        crypto.id = res._id;

        expect(res).to.be.a("object");
        expect(res._id).to.be.a("string");
    });

    it("Should update crypto", async() => {
        const res = await fetchApi("patch", `crypto/${crypto.id}`, {name: "Test2"});

        expect(res).to.be.a("object");
        expect(res.ok).to.be.equal(1);
    });

    it("Should delete category", async() => {
        const res = await fetchApi("delete", `crypto/${crypto.id}`);

        expect(res).to.be.a("object");
        expect(res.deletedCount).to.be.equal(1);
    });

});