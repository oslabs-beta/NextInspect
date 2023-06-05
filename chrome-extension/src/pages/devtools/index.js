chrome.devtools.panels.create(
  'NextInspect',
  'icon.png',
  '../panel/index.html',
  (panel) => {
    console.log('panel loaded')
  },
)
