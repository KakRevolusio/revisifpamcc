
  document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
      createPopupCard("Selamat datang di AMB Website. Belajar online gratis untuk mempelajari HTML, CSS, JavaScript, dan PHP.");
    }, 5000);
  });

  function createPopupCard(message) {
    var popupCard = document.createElement("div");
    popupCard.className = "popup-card";

    var messageParagraph = document.createElement("p");
    messageParagraph.textContent = message;
    popupCard.appendChild(messageParagraph);

    var startButton = document.createElement("button");
    startButton.textContent = "Mulai";
    startButton.addEventListener("click", function() {
      document.body.removeChild(popupCard);
    });

    popupCard.appendChild(startButton);
    document.body.appendChild(popupCard);
  }

  window.addEventListener('scroll', function() {
    var header = document.querySelector('.header-area');
    header.classList.toggle('scrolled', window.scrollY > 0);
  });


  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        if (response) {
          return response; // Menggunakan respons yang telah di-cache jika tersedia
        }
  
        // Jika respons tidak ada di cache, lakukan permintaan preloading
        return fetch(event.request.clone()).then(response => {
          // Menyimpan respons yang diunduh ke dalam cache
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open('cacheName').then(cache => {
              cache.put(event.request, responseClone);
            });
          }
  
          return response; // Mengembalikan respons ke klien
        });
      })
    );
  });