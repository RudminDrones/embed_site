(() => {
  const q = new URLSearchParams(location.search);

  /* ---------- required URLs ---------- */
  const ply      = q.get('ply');
  const settings = q.get('settings');
  if (!ply || !settings) {
    document.body.textContent =
      'Error: supply ?ply=…&settings=… in the iframe src URL.';
    return;
  }

  /* ---------- optional URLs ---------- */
  const poster = q.get('poster') ||
                 ply.replace(/\.compressed\.ply$/, '_poster.png');
  const skybox = q.get('skybox') ||
                 'https://viewer.rdcont.us/skybox.png';

  /* ---------- build viewer URL ------- */
  const viewer = new URL('https://viewer.rdcont.us/');
  viewer.searchParams.set('content',  ply);
  viewer.searchParams.set('settings', settings);
  viewer.searchParams.set('poster',   poster);
  viewer.searchParams.set('skybox',   skybox);

  /* ---------- inject markup ---------- */
  document.getElementById('app').innerHTML = `
    <div class="wrapper">
      <div id="cover" class="cover">
        <img class="bg" src="${poster}" alt="">
        <div class="ui">
          <button class="load" id="btn-load">▶ Load 3D model</button>
          <a class="open" href="${viewer}" target="_blank">↗ Open in New Tab</a>
          <img class="logo" src="logo.svg" alt="">
        </div>
      </div>
      <iframe id="viewer-frame" loading="lazy" allowfullscreen></iframe>
    </div>`;

  /* ---------- button handler ---------- */
  document.getElementById('btn-load').onclick = () => {
    document.getElementById('viewer-frame').src = viewer;
    document.getElementById('cover').style.display = 'none';
  };
})();
