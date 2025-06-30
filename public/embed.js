(() => {
  const q = new URLSearchParams(location.search);

  const ply      = q.get('ply');
  const settings = q.get('settings');
  if (!ply || !settings) {
    document.body.textContent =
      'Error: supply ?ply=…&settings=… in the iframe src URL.';
    return;
  }

  const poster = q.get('poster') ||
                 ply.replace(/\.compressed\.ply$/, '_poster.png');
  const skybox = 'https://viewer.rdcont.us/skybox.png';      // hard-coded

  const viewer = new URL('https://viewer.rdcont.us/');
  viewer.searchParams.set('content',  ply);
  viewer.searchParams.set('settings', settings);
  viewer.searchParams.set('poster',   poster);
  viewer.searchParams.set('skybox',   skybox);

  /* ---------- simple cover ---------- */
  document.body.innerHTML = `
    <style>
      html,body{margin:0;height:100%;background:#111;display:flex;align-items:center;justify-content:center}
      .cover{position:relative;width:100%;height:100%;max-width:100%;max-height:100%;overflow:hidden}
      .bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.25}
      .ui{position:relative;z-index:1;display:flex;flex-direction:column;gap:6px;align-items:center;text-align:center}
      .btn{padding:.6em 1.5em;border:none;border-radius:10px;box-shadow:0 4px 12px rgba(0,0,0,.5);cursor:pointer;font:600 1rem sans-serif}
      .load{background:#0d6efd;color:#fff}
      .open{background:#444;color:#eee;text-decoration:none}
      .logo{max-width:280px;width:70%;height:auto;opacity:.65;margin-top:6px}
      @media(max-width:768px){.load{display:none}.open{padding:.6em 1.2em;font-size:.9rem}}
    </style>
    <div class="cover">
      <img class="bg" src="${poster}" alt="">
      <div class="ui">
        <button class="btn load" id="btn-load">▶ Load 3D model</button>
        <a class="btn open" href="${viewer}" target="_blank">↗ Open in New Tab</a>
        <img class="logo" src="logo.svg" alt="">
      </div>
    </div>`;

  document.getElementById('btn-load')?.addEventListener('click', () => {
    /* replace() keeps history clean and re-uses this same frame */
    location.replace(viewer.href);
  });
})();
