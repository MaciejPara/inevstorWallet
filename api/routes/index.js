module.exports = [
    { method: "get", route: "/", controller: (req, res) => res.send(new Date()) },
    { method: "get", route: "/api", controller: (req, res) => res.send("api") },
];