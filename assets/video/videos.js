// Kacheln öffnen ihr Video in einem Abspielfenster. Ohne JavaScript bleibt jede Kachel ein
// gewöhnlicher Link auf die Videodatei. Kein Autoplay außer nach dem Klick, kein Tracking.
(function () {
  // „Alle zeigen": im HTML offen (ohne JavaScript ist alles zu sehen). Auf schmalen Bildschirmen
  // zugeklappt, auf breiten immer offen (dort ist der Schalter ausgeblendet).
  var schmal = window.matchMedia ? window.matchMedia('(max-width: 600px)') : null;
  var mehr = document.querySelectorAll('.video-more');
  function anpassen() {
    mehr.forEach(function (d) { d.open = !(schmal && schmal.matches); });
  }
  if (schmal && mehr.length) {
    anpassen();
    if (schmal.addEventListener) schmal.addEventListener('change', anpassen);
  }

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
