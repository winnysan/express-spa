const expressLayouts = require("express-ejs-layouts");
const express = require("express");
const path = require("path");

const app = express();
const PORT = 7000;

app.use(express.static(path.join(__dirname, "./public")));

app.use(expressLayouts);
app.set("layout", "layouts/main");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => res.render("home"));
app.get("/contact", (req, res) => res.render("contact"));
app.get("/post/:slug", (req, res) => res.render("post", { slug: req.params.slug }));

app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`));
