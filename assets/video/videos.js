// Kacheln öffnen ihr Video in einem Abspielfenster. Ohne JavaScript bleibt jede Kachel ein
// gewöhnlicher Link auf die Videodatei. Kein Autoplay außer nach dem Klick, kein Tracking.
(function () {
  var dialog = document.querySelector('.video-dialog');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  var video = dialog.querySelector('video');
  var titel = dialog.querySelector('.video-dialog-title');
  document.querySelectorAll('[data-video]').forEach(function (kachel) {
    kachel.addEventListener('click', function (ereignis) {
      ereignis.preventDefault();
      video.src = kachel.getAttribute('href');
      titel.textContent = kachel.getAttribute('data-title') || '';
      dialog.showModal();
      var p = video.play();
      if (p && p.catch) p.catch(function () {});
    });
  });
  dialog.addEventListener('close', function () {
    video.pause();
    video.removeAttribute('src');
    video.load();
  });
  // Klick neben das Video schließt das Fenster.
  dialog.addEventListener('click', function (ereignis) {
    if (ereignis.target === dialog) dialog.close();
  });
})();
