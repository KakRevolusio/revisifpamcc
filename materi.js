
var players = [];

function onYouTubeIframeAPIReady() {
  players.push(new YT.Player('video1', {
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  }));
  players.push(new YT.Player('video2', {
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  }));
  players.push(new YT.Player('video3', {
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  }));
}

function onPlayerReady(event) {
  event.target.playVideo();
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    setTimeout(function() {
      var ratingId = event.target.getIframe().getAttribute('id').replace('video', 'rating');
      document.getElementById(ratingId).style.display = "block";
    }, 10000);
  }
}

function rateVideo(videoId, rating) {
  // Simpan rating ke server atau lakukan tindakan yang diinginkan
  console.log("Video ID: " + videoId + ", Rating: " + rating);

  // Tampilkan notifikasi penilaian
  alert("Terima kasih atas penilaian Anda!");
}

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
  