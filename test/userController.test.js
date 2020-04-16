const { expect } = require("chai");
const fetchApi = require("./utils/fetchApi");

describe("Test user controller", () => {

    const user = { email: "test@email.com", password: "11111111" };

    it("Should list all users", async() => {
        const res = await fetchApi("get", "users");

        expect(res).to.be.a("array");
        expect(res[0]._id).to.be.a("string");
    });

    it("Should create new user", async() => {
        const res = await fetchApi("post", "user", user);

        user.id = res._id;

        expect(res).to.be.a("object");
        expect(res._id).to.be.a("string");
    });

    it("Should update user", async() => {
        const res = await fetchApi("patch", `user/${user.id}`, {role: "admin"});

        expect(res).to.be.a("object");
        expect(res.ok).to.be.equal(1);
    });

    it("Should delete user", async() => {
        const res = await fetchApi("delete", `user/${user.id}`);

        expect(res).to.be.a("object");
        expect(res.deletedCount).to.be.equal(1);
    });

});