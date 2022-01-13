const { readdirSync, writeFileSync } = require('fs')
const beautify = require('json-beautify')

const overrides = require('./retailers_overrides.json')

const dir = "retailers"
const output = {}
const supportedExtensions = ["png"]

readdirSync(dir, { withFileTypes: true })
  .forEach(_dirent => {
    const parts = _dirent.name.split('.')
    const fileName = parts[0]
    const fileExt = parts[1]

    if (!supportedExtensions.includes(fileExt.toLowerCase())) {
      return
    }
    
    const fileOverrides = overrides[fileName]
    if (fileOverrides) {
      if (Array.isArray(fileOverrides)) {
        fileOverrides.forEach(fileOverride => { output[fileOverride] =  fileName })
      } else {
        output[fileOverrides] =  fileName
      }
    } else {
      const key = fileName.replace(new RegExp("_", "g"), " ")
      output[key] = fileName
    }
  })

writeFileSync("retailers/_export.json", beautify(output, null, 2, 100))
