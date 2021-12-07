const server = require("./app.js");
const { conn } = require("./db.js");

// Syncing all the models at once.
// conn
// //   .sync({
// //     force: false,
// //   })
//   .then(() => {
//     server.listen(process.env.PORT || 3001, () => {
//       console.log("%s listening at 3001"); // eslint-disable-line no-console
//     });
//   });

server.listen(process.env.PORT || 3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
});