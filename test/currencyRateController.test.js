const { expect } = require("chai");
const fetchApi = require("./utils/fetchApi");

describe("Test currency rate controller", () => {

    const currencyRate = { rates: [], date: new Date(), base: "USD" };

    it("Should list all currency rates", async() => {
        const res = await fetchApi("get", "currencyRates");

        console.log(res);

        expect(res).to.be.a("array");
    });

    it("Should create new currency rate", async() => {
        const res = await fetchApi("post", "currencyRate", currencyRate);

        currencyRate.id = res._id;

        expect(res).to.be.a("object");
        expect(res._id).to.be.a("string");
    });

    it("Should update currency rate", async() => {
        const res = await fetchApi("patch", `currencyRate/${currencyRate.id}`, {base: "PLN"});

        expect(res).to.be.a("object");
        expect(res.ok).to.be.equal(1);
    });

    it("Should delete category rate", async() => {
        const res = await fetchApi("delete", `currencyRate/${currencyRate.id}`);

        expect(res).to.be.a("object");
        expect(res.deletedCount).to.be.equal(1);
    });

});