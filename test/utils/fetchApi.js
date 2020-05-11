const fetch = require("node-fetch");
const { env, host } = require("./config");

const hasBody = method => {
    return ["post", "patch"].indexOf(method) !== -1;
};

module.exports = async(method = "get", path = "", params = {}, token = "") => {
    try {

        const context = {
            method,
            body: hasBody(method) && JSON.stringify(params),
            headers: {
                "content-type": hasBody(method) && "application/json",
                "cookie": [token],
            }
        };

        if(!hasBody(method)) delete context.body;

        const result = await fetch(`${env[host]}/${path}${method === "get" ? `?filter=${JSON.stringify(params)}` : ""}`, context);
        const response = await result.json();

        if(response.error) return console.error(response.error);
        else return {authorization: result.headers.get("set-cookie"), response};

    }catch (e) {
        console.error(e);
    }
};