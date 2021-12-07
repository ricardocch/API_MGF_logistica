const host = require("./app.ts");
const { conn } = require("./db.ts");

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

host.listen(process.env.PORT || 3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
});