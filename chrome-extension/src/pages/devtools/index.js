chrome.devtools.panels.create(
  'NextInspect',
  'icon.png',
  'src/pages/panel/index.html',
  (panel) => {
    console.log('panel loaded')
  },
)
