const mongoose = require("mongoose");

const connetDatabase = () =>
  mongoose
    .connect(process.env.DBPATH, {
    })
    .then((data) => {
      console.log(`mongodb connected with server ${data.connection.host}`);
    });

module.exports = connetDatabase;