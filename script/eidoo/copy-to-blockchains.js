const { readdirSync } = require('fs')

const config = require('./copy-to-blockchains-config.json')
const { copyDirSync } = require('./utils.js')

const keys = Object.keys(config)

const copyToBlockchains = () =>
  readdirSync('blockchains_source', { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .forEach((dirent) => {
      if (keys.includes(dirent.name)) {
        const destinations = config[dirent.name]
        if (!Array.isArray(destinations)) {
          console.error(
            `Skipping ${dirent.name}: its value is not an array, please fix it inside "copy-to-blockchains-config.json"`
          )
        } else {
          for (const destination of destinations) {
            copyDirSync(`blockchains_source/${dirent.name}`, `blockchains/${destination}`)
          }
        }
      }
    })

copyToBlockchains()
