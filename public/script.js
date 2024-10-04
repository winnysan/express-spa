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
        initializePage(); // Inicializujeme event listenery
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
    fetch(location.pathname + location.search, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    })
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("app").innerHTML = html;
        initializePage(); // Inicializujeme event listenery
      })
      .catch((err) => console.error("Chyba pri načítaní stránky:", err));
  });

  // Definícia funkcie initializePage
  const initializePage = () => {
    // Tu vlož event listenery, ktoré sa majú znovu načítať pri každej zmene stránky

    // Príklad: Event listener pre tlačidlo s id 'myButton'
    const myButton = document.getElementById("myButton");
    if (myButton) {
      myButton.addEventListener("click", () => {
        alert("Tlačidlo bolo stlačené!");
      });
    }

    // Príklad: Event listenery pre všetky prvky s triedou 'someClass'
    const elements = document.querySelectorAll(".someClass");
    elements.forEach((element) => {
      element.addEventListener("mouseover", () => {
        console.log("Prešiel si myšou nad prvkom.");
      });
    });

    // Tu môžeš pridať ďalšie inicializácie potrebné pre aktuálnu stránku
  };

  // Inicializuj stránku pri prvom načítaní
  initializePage();
});
