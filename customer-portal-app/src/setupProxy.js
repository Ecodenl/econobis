module.exports = function(app) {
    app.use((req, res, next) => {
        res.setHeader(
            'Content-Security-Policy',
            "default-src 'self'; script-src 'self' 'wasm-unsafe-eval' https://www.google.com https://www.gstatic.com https://cdn.privatecaptcha.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: blob: https:; connect-src 'self' http://localhost:3000 https://*.econobis.nl https://econobis-xaris.nl https://api.privatecaptcha.com; worker-src 'self' blob:; child-src 'self' blob:; frame-src 'self' https://www.google.com https://www.gstatic.com; object-src 'none'; base-uri 'self'; frame-ancestors 'none';"
        );

        next();
    });
};
