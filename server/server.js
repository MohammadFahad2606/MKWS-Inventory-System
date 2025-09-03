// server.js (CommonJS)
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");

dotenv.config();
const app = express();

// core middleware
app.use(cors());
app.use(express.json());

// health
app.get("/api/health", (req, res) => res.json({ ok: true }));

// routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);



// // Serve frontend build (React)
// const clientDistPath = path.join(__dirname, "../client/dist");
// app.use(express.static(clientDistPath));

// app.get(/^\/(?!api).*/, (req, res) => {
//   res.sendFile(path.join(clientDistPath, "index.html"));
// });
// const clientDistPath = path.join(
//   process.pkg ? path.dirname(process.execPath) + "/../client/dist" : __dirname + "/../client/dist"
// );
// app.use(express.static(clientDistPath));

// app.get(/^\/(?!api).*/, (req, res) => {
//   res.sendFile(path.join(clientDistPath, "index.html"));
// });



// -------------------------------------
// Serve React frontend
// -------------------------------------
let clientDistPath;
if (process.pkg) {
  // running inside pkg exe
  clientDistPath = path.join(path.dirname(process.execPath), "../../client/dist");
} else {
  // dev mode
  clientDistPath = path.join(__dirname, "../client/dist");
}

app.use(express.static(clientDistPath));

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(clientDistPath, "index.html"));
});


// 404 + error handlers 
app.use(notFound);
app.use(errorHandler);

// start
const PORT = process.env.PORT || 4000;
connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
});
