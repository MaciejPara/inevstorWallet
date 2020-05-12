const { expect } = require("chai");
const fetchApi = require("./utils/fetchApi");

describe("Test register", () => {
    const user = { email: "cienias98@gmail.com", password: "11111111" };
    // let token;

    it("Should register user", async() => {
        const res = await fetchApi("post", "signup", user);

        console.log("\n\n\n>>> res >>> ", res);

        expect(res.response.message).to.be.equal("Registration success, check your email.");
    });

    // it("Should list users", async() => {
    //     const res = await fetchApi("get", "currencies", "", token);
    //
    //     console.log("\n\n>>> res >>> ", res.response.length);
    //
    //     expect(res.response).to.be.a("array");
    // });

    // it("Should logout user", async() => {
    //     const res = await fetchApi("get", "signout", "", token);
    //
    //     console.log("\n\n\n>>> res >>> ", res);
    //
    //     expect(res.response).to.be.a("object");
    //     expect(res.response.status).to.be.equal(200);
    // });

});