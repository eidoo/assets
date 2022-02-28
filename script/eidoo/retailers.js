const { readdirSync, writeFileSync } = require('fs')
const beautify = require('json-beautify')

const overrides = require('./retailers_overrides.json')

const dir = "retailers"
const newOutput = {}
const output = {}
const supportedExtensions = ["png"]

const addURLEncode = (fileName) => {
  return fileName
    .replace(new RegExp("&", "g"), "%26")
    .replace(new RegExp("à", "g"), "%C3%A0")
    .replace(new RegExp("ã", "g"), "%C3%A3")
    .replace(new RegExp("ä", "g"), "%C3%A4")
    .replace(new RegExp("å", "g"), "%C3%A5")
    .replace(new RegExp("ç", "g"), "%C3%A7")
    .replace(new RegExp("è", "g"), "%C3%A8")
    .replace(new RegExp("é", "g"), "%C3%A9")
    .replace(new RegExp("ê", "g"), "%C3%AA")
    .replace(new RegExp("ë", "g"), "%C3%AB")
    .replace(new RegExp("ì", "g"), "%C3%AC")
    .replace(new RegExp("î", "g"), "%C3%AE")
    .replace(new RegExp("ï", "g"), "%C3%AF")
    .replace(new RegExp("ò", "g"), "%C3%B2")
    .replace(new RegExp("ô", "g"), "%C3%B4")
    .replace(new RegExp("ö", "g"), "%C3%B6")
    .replace(new RegExp("ù", "g"), "%C3%B9")
    .replace(new RegExp("û", "g"), "%C3%BB")
    .replace(new RegExp("ü", "g"), "%C3%BC")
    .replace(new RegExp("\\+", "g"), "%2B")
}

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
        fileOverrides.forEach(fileOverride => { output[fileOverride] =  addURLEncode(fileName) })
      } else {
        output[fileOverrides] =  addURLEncode(fileName)
      }
    } else {
      const key = fileName.replace(new RegExp("_", "g"), " ")
      output[key] = addURLEncode(fileName)
    }

    for (const key of Object.keys(output)) {
      if (!newOutput[key.length]) {
        newOutput[key.length] = {}
      }
      newOutput[key.length][key] = output[key]
    }
  })

writeFileSync("retailers/_export.json", beautify(newOutput, null, 2, 100))
