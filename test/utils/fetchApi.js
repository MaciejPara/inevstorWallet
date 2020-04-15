const fetch = require("node-fetch");
const { env, host } = require("./config");

module.exports = async(method = "get", path = "", params = {}, token = "") => {
    try {

        const context = {
            method,
            body: method === "post" && JSON.stringify(params),
            headers: {
                "content-type": method === "post" && "application/json",
                authorization: token
            }
        };

        if(method === "get") delete context.body;

        const result = await fetch(`${env[host]}/api/${path}${method === "get" ? `?filter=${JSON.stringify(params)}` : ""}`, context);

        const response = await result.json();

        if(response.error) return console.error(response.error);
        else return response;
    }catch (e) {
        console.error(e);
    }
};