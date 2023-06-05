/// <reference types="chrome">

type Manifest = chrome.runtime.ManifestV3

class ManifestParser {
  private constructor() {}

  static convertManifestToString(manifest: Manifest): string {
    return JSON.stringify(manifest, null, 2)
  }
}

export default ManifestParser
