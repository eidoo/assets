const path = require('path')
const { copyFileSync, readdirSync, mkdirSync } = require('fs')

const copyDirSync = (src, dest) => {
  mkdirSync(dest, { recursive: true })
  const entries = readdirSync(src, { withFileTypes: true })
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath)
    } else {
      copyFileSync(srcPath, destPath)
    }
  }
}

module.exports = {
  copyDirSync
}
