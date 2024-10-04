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

// Middleware na detekciu AJAX požiadaviek
app.use((req, res, next) => {
  res.locals.isAjax = req.xhr;
  next();
});

app.get("/", (req, res) =>
  res.render("home", {
    layout: res.locals.isAjax ? false : "layouts/main",
  })
);
app.get("/contact", (req, res) =>
  res.render("contact", {
    layout: res.locals.isAjax ? false : "layouts/main",
  })
);
app.get("/post/:slug", (req, res) => {
  const queryParam = req.query.param; // Napr. /post/post-title?param=hodnota
  res.render("post", {
    slug: req.params.slug,
    queryParam,
    layout: res.locals.isAjax ? false : "layouts/main",
  });
});

app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`));
