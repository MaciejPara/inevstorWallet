module.exports = [
    { method: "get", route: "/", controller: (req, res) => res.send("test") },
    { method: "get", route: "/user", controller: (req, res) => res.send("user") },
    { method: "get", route: "/user/:id", controller: (req, res) => res.send({ userId: parseInt(req.params.id) }) },
];