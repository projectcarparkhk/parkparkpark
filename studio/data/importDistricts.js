const readline = require('readline')
const fs = require('fs')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const inputPath = '/Users/anthonysiu/parkparkpark/studio/data/districts.csv'
const outputPath = '/Users/anthonysiu/parkparkpark/studio/data/district.ndjson'

function importDistrictData() {
  const rl = readline.Interface({
    input: fs.createReadStream(inputPath),
  })
  try {
    fs.unlinkSync(outputPath)
  } catch (err) {
    // continue
  }
  const districts = []
  rl.on('line', (line) => {
    const data = line.split(',')

    const districtZh = data[data.length - 2]
    const districtEn = data[data.length - 1]
    if (!districts.includes(districtEn)) {
      const districtData = {
        _type: 'district',
        name: {
          _type: 'localeString',
          en: districtEn,
          zh: districtZh,
        },
        slug: {
          _type: 'localeSlug',
          enSlug: {
            _type: 'slug',
            current: districtEn.toLowerCase().split(' ').join('-'),
          },
          zhSlug: {
            _type: 'slug',
            current: districtZh,
          },
        },
      }
      fs.appendFileSync(outputPath, `${JSON.stringify(districtData)}\n`)
      districts.push(districtEn)
    }
  })

  importData()
}

const importData = async () => {
  const { stdout } = await exec(`sanity dataset import ${outputPath} staging`)
  console.log(stdout)
}

importDistrictData()
