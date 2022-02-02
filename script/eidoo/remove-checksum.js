const path = require('path')
const { copyFileSync, existsSync, readdirSync, renameSync, mkdirSync, rmdirSync } = require('fs')

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

const copyCustomAssets = (_source, _temp) =>
  readdirSync(_source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .forEach(dirent => {
      const from = `${_source}/${dirent.name}`
      const to = `${_temp}/${dirent.name.toLowerCase()}`
      if (existsSync(to)) {
        rmdirSync(to, { recursive: true, force: true })
      }
      copyDirSync(from, to)
    })

const removeChecksumAndMove = (_source, _temp) =>
  readdirSync(_source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .forEach(dirent => {
      renameSync(`${_source}/${dirent.name}`, `${_temp}/${dirent.name.toLowerCase()}`)
    })

mkdirSync(`${process.argv[2]}/temp`)
removeChecksumAndMove(`${process.argv[2]}/assets`, `${process.argv[2]}/temp`)
removeChecksumAndMove(`${process.argv[2]}/temp`, `${process.argv[2]}/assets`)
rmdirSync(`${process.argv[2]}/temp`)

mkdirSync(`${process.argv[2]}/temp`)
removeChecksumAndMove(`${process.argv[2]}/custom-assets`, `${process.argv[2]}/temp`)
removeChecksumAndMove(`${process.argv[2]}/temp`, `${process.argv[2]}/custom-assets`)
rmdirSync(`${process.argv[2]}/temp`)

copyCustomAssets(`${process.argv[2]}/custom-assets`, `${process.argv[2]}/assets`)
