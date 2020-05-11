const { expect } = require("chai");
const fetchApi = require("./utils/fetchApi");
const accounts = require("./utils/accounts");

describe("Test signin", () => {
    const user = accounts.find(({email}) => email === "admin@example.com");
    let token;

    it("Should login user", async() => {
        const res = await fetchApi("post", "signin", user);

        token = res.authorization;

        console.log("\n\n\n>>> token >>> ", token);

        expect(res.authorization).to.be.a("string");
    });

    it("Should list users", async() => {
        const res = await fetchApi("get", "currencies", "", token);

        console.log("\n\n>>> res >>> ", res.response.length);

        expect(res.response).to.be.a("array");
    });

    it("Should logout user", async() => {
        const res = await fetchApi("get", "signout", "", token);

        console.log("\n\n\n>>> res >>> ", res);

        expect(res.response).to.be.a("object");
        expect(res.response.status).to.be.equal(200);
    });

});