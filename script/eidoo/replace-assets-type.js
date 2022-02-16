const replaceInFile = require('replace-in-file')

const blockchainPath = process.argv[2]
const blockchainToOptions = {
  avalanchec_mainnet: {
    from: /"type":[ ]?"AVALANCHE"/g,
    to: '"type": "ERC20"',
  },
  fantom_mainnet: {
    from: /"type":[ ]?"FANTOM"/g,
    to: '"type": "ERC20"',
  },
  polygon_mainnet: {
    from: /"type":[ ]?"POLYGON"/g,
    to: '"type": "ERC20"',
  }
}
const blockchainOptions = blockchainToOptions[blockchainPath.replace('blockchains/', '')]
if (blockchainOptions) {
  const options = {
    files: `${blockchainPath}/assets/*/info.json`,
    ...blockchainOptions
  }
  replaceInFile(options).catch(err => console.error('replaceInFile error:', err))
}
