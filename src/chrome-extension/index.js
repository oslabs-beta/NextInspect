chrome.devtools.panels.create(
  'NextInspect',
  'icon.png',
  'panel.html',
  (panel) => {
    console.log('panel loaded')
  },
)
