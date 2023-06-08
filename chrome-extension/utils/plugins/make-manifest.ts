/// <reference types="chrome">

import * as fs from 'fs'
import * as path from 'path'
import ManifestParser from '../manifest-parser'
import type { PluginOption } from 'vite'

const distDir = path.resolve(__dirname, '..', '..', 'dist')
const publicDir = path.resolve(__dirname, '..', '..', '..', 'public')

export default function makeManifest(
  manifest: chrome.runtime.ManifestV3,
  config: { isDev: boolean },
): PluginOption {
  function makeManifest(to: string) {
    if (!fs.existsSync(to)) {
      fs.mkdirSync(to)
    }
    const manifestPath = path.resolve(to, 'manifest.json')

    fs.writeFileSync(
      manifestPath,
      ManifestParser.convertManifestToString(manifest),
    )
  }

  return {
    name: 'make-manifest',
    buildStart() {
      if (config.isDev) {
        makeManifest(distDir)
      }
    },
    buildEnd() {
      if (config.isDev) {
        return
      }
      makeManifest(distDir)
    },
  }
}
