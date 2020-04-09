const { PROTOCOL, DOMAIN, PORT } = process.env;

module.exports = () => {
    console.log('\x1b[36m%s\x1b[0m', `EXPRESS API listening on ${PROTOCOL}://${DOMAIN}:${PORT}`);
};