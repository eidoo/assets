const { readdirSync, renameSync, mkdirSync, rmdirSync } = require('fs')

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
