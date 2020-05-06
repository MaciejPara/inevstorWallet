const { expect } = require("chai");
const fetchApi = require("./utils/fetchApi");

describe("Test currency controller", () => {

    const currency = { name: "Test" };

    it("Should list all currencies", async() => {
        const res = await fetchApi("get", "currencies");

        expect(res).to.be.a("array");
    });

    it("Should create new currency", async() => {
        const res = await fetchApi("post", "currency", currency);

        currency.id = res._id;

        expect(res).to.be.a("object");
        expect(res._id).to.be.a("string");
    });

    it("Should update currency", async() => {
        const res = await fetchApi("patch", `currency/${currency.id}`, {name: "Test2"});

        expect(res).to.be.a("object");
        expect(res.ok).to.be.equal(1);
    });

    it("Should delete category", async() => {
        const res = await fetchApi("delete", `currency/${currency.id}`);

        expect(res).to.be.a("object");
        expect(res.deletedCount).to.be.equal(1);
    });

});