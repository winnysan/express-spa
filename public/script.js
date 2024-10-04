console.log("script has been loaded");

document.addEventListener("DOMContentLoaded", () => {
  const navigateTo = (url) => {
    fetch(url, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    })
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("app").innerHTML = html;
        history.pushState(null, null, url);
      })
      .catch((err) => console.error("Chyba pri načítaní stránky:", err));
  };

  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  window.addEventListener("popstate", () => {
    // Pri navigácii pomocou tlačidiel prehliadača načítame obsah aktuálnej URL
    fetch(location.pathname, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    })
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("app").innerHTML = html;
      })
      .catch((err) => console.error("Chyba pri načítaní stránky:", err));
  });
});
