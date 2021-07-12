const config = {
    saml: {
        cert: './certs/idp_cert.pem',
        entryPoint: 'http://localhost:8080/auth/realms/hse/protocol/saml',
        issuer: 'http://localhost:3000',
        options: {
            failureRedirect: '/login',
            failureFlash: true
        }
    },

    server: {
        port: 5000
    },
    session: {
        resave: false,
        secret: 'supersecretpasswort',
        saveUninitialize: true
    }
};

module.exports = config;