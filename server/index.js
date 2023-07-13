const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connection = require("./db");
const app = express();
const PORT = process.env.PORT || 4000;

/* ====================== Database connection ==========================
----------------------------------------------------------------------*/
connection(); //db.js
/*---------------------------------------------------------------------
=====================================================================*/

/* ====================== Middleware ==================================
---------------------------------------------------------------------*/
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});
/*--------------------------------------------------------------------
===================================================================*/
/* ====================== Listen port ===================================
----------------------------------------------------------------------*/
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
/*--------------------------------------------------------------------
===================================================================*/

/* ======================= Routes ====================================
-------------------------------------------------------------------*/
const userRoutes = require("./src/routes/userRoutes");
const contactRoutes = require("./src/routes/contactRoutes");
const chatRoutes = require("./src/routes/chatRoutes");

// routes
app.use("/api", userRoutes);
app.use("/api", contactRoutes);
app.use("/api", chatRoutes);
/*-------------------------------------------------------------------
==================================================================*/
