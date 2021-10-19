const { readdirSync, readFileSync, writeFileSync } = require('fs')
const beautify = require('json-beautify')

const dir = `${process.argv[2]}/assets`

const tokens = []
readdirSync(dir, { withFileTypes: true })
  .filter(_dirent => _dirent.isDirectory())
  .forEach(_dirent => {
    const { name, type, decimals, symbol, description}  = JSON.parse(readFileSync(`${dir}/${_dirent.name}/info.json`, 'utf-8'))
    tokens.push({
      name,
      type,
      decimals,
      symbol,
      description,
      address: _dirent.name.toLowerCase()
    })
  })

writeFileSync(`${process.argv[2]}/tokenlist_v2.json`, beautify(tokens, null, 2, 100))