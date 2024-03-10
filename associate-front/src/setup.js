// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function(app) {
//   app.use(
//     '/v1/',
//     createProxyMiddleware({
//       target: 'https://ubiquitous-space-cod-5rvv5wv5gwwf46qx-7000.app.github.dev',
//       changeOrigin: true,
//       logger: console,
//       logLevel: 'error',
//       onError: (err, req, res) => {
//         console.log(err)
//         res.send('<h1>Something went wrong.</h1>');
//       },
//     })
//   );
// };