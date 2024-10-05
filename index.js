const expressLayouts = require("express-ejs-layouts"); // Middleware pre podporu layoutov v EJS
const express = require("express"); // Express framework pre vytváranie webových aplikácií
const path = require("path"); // Modul pre prácu s cestami k súborom

const app = express();

const PORT = 7000;

app.use(express.static(path.join(__dirname, "./public")));

app.use(expressLayouts);
app.set("layout", "layouts/main");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware na detekciu AJAX požiadaviek
// Tento middleware pridá premennú `isAjax` do `res.locals`, ktorá bude `true`, ak je požiadavka AJAX
app.use((req, res, next) => {
  res.locals.isAjax = req.xhr; // `req.xhr` je `true`, ak je požiadavka AJAX (XMLHttpRequest)
  next(); // Prechádzame na ďalší middleware alebo route handler
});

// Middleware ktory kontroluje ci je user prihlaseny a ak ano, tak ho ulozi do req
app.use((req, res, next) => {
  res.locals.user = {
    name: "Marek",
    email: "marek@example.com",
  };
  next();
});

app.get("/", (req, res) =>
  res.render("home", {
    user: res.locals.user, // user je prihlaseny
    // Ak je požiadavka AJAX, nepoužívame layout (`false`)
    // Inak použijeme predvolený layout "layouts/main"
    layout: res.locals.isAjax ? false : "layouts/main",
  })
);

app.get("/contact", (req, res) =>
  res.render("contact", {
    user: undefined, // user je odhlaseny
    layout: res.locals.isAjax ? false : "layouts/main",
  })
);

app.get("/post/:slug", (req, res) => {
  // Získame query parameter `param` z URL (napr. /post/post-title?param=hodnota)
  const queryParam = req.query.param;

  res.render("post", {
    user: res.locals.user, // user je prihlaseny
    slug: req.params.slug, // Hodnota parametra `slug` z URL
    queryParam, // Hodnota query parametra `param`
    // Opäť kontrolujeme, či je požiadavka AJAX a podľa toho nastavujeme layout
    layout: res.locals.isAjax ? false : "layouts/main",
  });
});

app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`));
