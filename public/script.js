console.log("script has been loaded");

// Počkáme, kým sa načíta celý DOM (Document Object Model)
document.addEventListener("DOMContentLoaded", () => {
  /**
   * Funkcia pre navigáciu na novú URL bez obnovy celej stránky
   * @param {string} url - Cieľová URL, na ktorú chceme navigovať
   */
  const navigateTo = (url) => {
    // Vykonáme fetch požiadavku na zadanú URL
    fetch(url, {
      headers: {
        "X-Requested-With": "XMLHttpRequest", // Indikuje serveru, že ide o AJAX požiadavku
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text(); // Získame odpoveď ako text (HTML)
      })
      .then((html) => {
        // Nahradíme obsah elementu s id 'app' novým HTML
        document.getElementById("app").innerHTML = html;
        // Aktualizujeme históriu prehliadača s novou URL bez obnovy stránky
        history.pushState(null, null, url);
        // Inicializujeme event listenery pre novú stránku
        initializePage();
      })
      .catch((err) => console.error("Chyba pri načítaní stránky:", err)); // Ošetríme prípadné chyby
  };

  /**
   * Event listener pre kliknutia na odkazy s atribútom 'data-link'
   * Tento listener zachytáva kliknutia na odkazy a naviguje na novú URL pomocou SPA
   */
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault(); // Zabránime predvolenému správaniu (navigácia prehliadača)
      navigateTo(e.target.href); // Voláme našu funkciu navigateTo s URL z odkazu
    }
  });

  /**
   * Event listener pre udalosť 'popstate'
   * Spracováva navigáciu pomocou tlačidiel Späť a Dopredu v prehliadači
   */
  window.addEventListener("popstate", () => {
    // Pri navigácii pomocou tlačidiel prehliadača načítame obsah aktuálnej URL
    fetch(location.pathname + location.search, {
      headers: {
        "X-Requested-With": "XMLHttpRequest", // Indikuje serveru, že ide o AJAX požiadavku
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text(); // Získame odpoveď ako text (HTML)
      })
      .then((html) => {
        // Nahradíme obsah elementu s id 'app' novým HTML
        document.getElementById("app").innerHTML = html;
        // Inicializujeme event listenery pre novú stránku
        initializePage();
      })
      .catch((err) => console.error("Chyba pri načítaní stránky:", err)); // Ošetríme prípadné chyby
  });

  /**
   * Funkcia initializePage
   * Inicializuje všetky event listenery a ďalšiu logiku, ktorá je potrebná po načítaní novej stránky
   */
  const initializePage = () => {
    // Event listener pre tlačidlo s id 'myButton'
    const myButton = document.getElementById("myButton");
    if (myButton) {
      myButton.addEventListener("click", () => {
        navigateTo("/contact"); // Presmerovanie na stránku /contact pomocou SPA
      });
    }

    // Event listenery pre všetky prvky s triedou 'someClass'
    const elements = document.querySelectorAll(".someClass");
    elements.forEach((element) => {
      element.addEventListener("mouseover", () => {
        console.log("Prešiel si myšou nad prvkom."); // Logovanie správy do konzoly pri prechode myšou
      });
    });

    // Tu môžeš pridať ďalšie inicializácie potrebné pre aktuálnu stránku
    // Napríklad pripojenie ďalších event listenerov, inicializácia knižníc atď.
  };

  // Inicializuj stránku pri prvom načítaní
  initializePage();
});
