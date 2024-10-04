// Importujeme potrebné moduly
const expressLayouts = require("express-ejs-layouts"); // Middleware pre podporu layoutov v EJS
const express = require("express"); // Express framework pre vytváranie webových aplikácií
const path = require("path"); // Modul pre prácu s cestami k súborom

// Vytvoríme inštanciu Express aplikácie
const app = express();

// Definujeme port, na ktorom bude aplikácia bežať
const PORT = 7000;

// Middleware na servírovanie statických súborov
// Tento middleware sprístupní súbory z priečinka "public" (napr. CSS, JavaScript, obrázky)
app.use(express.static(path.join(__dirname, "./public")));

// Používame middleware pre EJS layouty
app.use(expressLayouts);

// Nastavujeme predvolený layout pre EJS šablóny
// Layouty umožňujú zdieľať spoločné časti stránky (napr. hlavička, päta) medzi rôznymi šablónami
app.set("layout", "layouts/main");

// Nastavujeme EJS ako templating engine
app.set("view engine", "ejs");

// Nastavujeme cestu k priečinku so šablónami (views)
app.set("views", path.join(__dirname, "views"));

// Middleware na detekciu AJAX požiadaviek
// Tento middleware pridá premennú `isAjax` do `res.locals`, ktorá bude `true`, ak je požiadavka AJAX
app.use((req, res, next) => {
  res.locals.isAjax = req.xhr; // `req.xhr` je `true`, ak je požiadavka AJAX (XMLHttpRequest)
  next(); // Prechádzame na ďalší middleware alebo route handler
});

// Definujeme route pre hlavnú stránku (Home)
app.get("/", (req, res) =>
  res.render("home", {
    // Ak je požiadavka AJAX, nepoužívame layout (`false`)
    // Inak použijeme predvolený layout "layouts/main"
    layout: res.locals.isAjax ? false : "layouts/main",
  })
);

// Definujeme route pre stránku Kontakt (Contact)
app.get("/contact", (req, res) =>
  res.render("contact", {
    // Rovnaká logika ako pre hlavnú stránku
    layout: res.locals.isAjax ? false : "layouts/main",
  })
);

// Definujeme dynamickú route pre príspevky (Post) s parametrom `slug`
app.get("/post/:slug", (req, res) => {
  // Získame query parameter `param` z URL (napr. /post/post-title?param=hodnota)
  const queryParam = req.query.param;

  // Renderujeme šablónu "post" s dátami
  res.render("post", {
    slug: req.params.slug, // Hodnota parametra `slug` z URL
    queryParam, // Hodnota query parametra `param`
    // Opäť kontrolujeme, či je požiadavka AJAX a podľa toho nastavujeme layout
    layout: res.locals.isAjax ? false : "layouts/main",
  });
});

// Spustíme server a počúvame na definovanom porte
app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`));
