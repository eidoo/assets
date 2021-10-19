const { readdirSync, renameSync, mkdirSync } = require('fs')

const removeChecksum = (_source, _temp) =>
  readdirSync(_source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .forEach(dirent => {
      renameSync(`${_source}/${dirent.name}`, `${_temp}/${dirent.name.toLowerCase()}`)
    })


removeChecksum(process.argv[2], process.argv[3])
