const { expect } = require("chai");
const fetchApi = require("./utils/fetchApi");

describe("Test category controller", () => {

    const category = { name: "currency" };

    it("Should list all categories", async() => {
        const res = await fetchApi("get", "categories");

        expect(res).to.be.a("array");
    });

    it("Should create new category", async() => {
        const res = await fetchApi("post", "category", category);

        category.id = res._id;

        expect(res).to.be.a("object");
        expect(res._id).to.be.a("string");
    });

    it("Should update category", async() => {
        const res = await fetchApi("patch", `category/${category.id}`, {name: "crypto"});

        expect(res).to.be.a("object");
        expect(res.ok).to.be.equal(1);
    });

    it("Should delete category", async() => {
        const res = await fetchApi("delete", `category/${category.id}`);

        expect(res).to.be.a("object");
        expect(res.deletedCount).to.be.equal(1);
    });

});