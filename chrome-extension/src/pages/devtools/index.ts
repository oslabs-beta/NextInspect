try {
  chrome.devtools.panels.create(
    'NextInspect',
    'icon.png',
    'src/pages/panel/index.html'
  );

} catch (error) {
  console.log(error);
}


