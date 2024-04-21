const app = require("./app");
const connectDatabase = require("./database/dataBase");
const path = require("path");





connectDatabase();

app.get("/", (req, res) => { 
  app.use(express.static(path.resolve(__dirname, "frontend", "build"))); 
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html")); 
}); 



const server = app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});



process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`Shutting down the server for unhandle promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});