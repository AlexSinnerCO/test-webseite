// Schaltkreis-Rätsel: Jeder Klick schaltet die Lampe und ihre direkten Nachbarn um.
(function () {
  var N = 3;
  var feld = document.getElementById('feld');
  var status = document.getElementById('status');
  var neu = document.getElementById('neu');
  if (!feld) return;
  var an = [];
  var zuege = 0;
  var knoepfe = [];

  function umschalten(i) {
    var r = Math.floor(i / N), c = i % N;
    [[r, c], [r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]].forEach(function (p) {
      if (p[0] >= 0 && p[0] < N && p[1] >= 0 && p[1] < N) {
        var k = p[0] * N + p[1];
        an[k] = !an[k];
      }
    });
  }

  function zeichnen() {
    var alle = an.every(Boolean);
    knoepfe.forEach(function (b, i) {
      b.classList.toggle('an', an[i]);
      b.setAttribute('aria-pressed', an[i] ? 'true' : 'false');
      b.setAttribute('aria-label', 'Lampe ' + (i + 1) + (an[i] ? ' an' : ' aus'));
      b.disabled = alle;
    });
    status.textContent = alle
      ? 'Geschafft in ' + zuege + ' Zügen! Alle Lampen leuchten.'
      : 'Züge: ' + zuege + ' · Leuchtend: ' + an.filter(Boolean).length + ' von ' + N * N;
  }

  function starten() {
    // Vom fertigen Zustand rückwärts mischen, damit jedes Rätsel lösbar ist.
    do {
      an = new Array(N * N).fill(true);
      for (var j = 0; j < 6; j++) umschalten(Math.floor(Math.random() * N * N));
    } while (an.every(Boolean));
    zuege = 0;
    zeichnen();
  }

  for (var i = 0; i < N * N; i++) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'lampe';
    b.innerHTML = '<span aria-hidden="true">💡</span>';
    (function (idx) {
      b.addEventListener('click', function () { umschalten(idx); zuege++; zeichnen(); });
    })(i);
    feld.appendChild(b);
    knoepfe.push(b);
  }
  neu.addEventListener('click', starten);
  starten();
})();
