const axios = require('axios')
const beautify = require('json-beautify')
const { readdirSync, readFileSync, writeFileSync } = require('fs')

const overrides = require('./build-token-list_overrides.json')

const LIMIT = 800

;(async () => {
  const { data: resBody } = await axios({
    method: 'get',
    url: `https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?limit=${LIMIT}&sort=cmc_rank`,
    headers: {
      'X-CMC_PRO_API_KEY': process.env.EIDOO_ASSETS_CMC_PRO_API_KEY
    }
  })

  const overrideSymbols = overrides.symbols.map((x) => x.toLowerCase())
  const topSymbols = resBody.data.map((x) => x.symbol.toLowerCase())

  const dir = `${process.argv[2]}/assets`
  const tokens = []
  readdirSync(dir, { withFileTypes: true })
    .filter(_dirent => _dirent.isDirectory())
    .forEach(_dirent => {
      const file = readFileSync(`${dir}/${_dirent.name}/info.json`, 'utf-8')
      const { name, type, decimals, symbol, description}  = JSON.parse(file)
      if (overrideSymbols.includes(symbol.toLowerCase()) || topSymbols.includes(symbol.toLowerCase())) {
        tokens.push({
          name,
          type,
          decimals,
          symbol,
          description,
          address: _dirent.name.toLowerCase()
        })
      }
    })

  writeFileSync(`${process.argv[2]}/tokenlist_v2.json`, beautify(tokens, null, 2, 100))
})()
