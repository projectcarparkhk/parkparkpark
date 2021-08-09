const readline = require('readline')
const fs = require('fs')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const inputPath = `${__dirname}/districts.csv`
const outputPath = `${__dirname}/area.ndjson`

function importAreaData() {
  const rl = readline.Interface({
    input: fs.createReadStream(inputPath),
  })
  try {
    fs.unlinkSync(outputPath)
  } catch (err) {
    // continue
  }
  const areas = []
  rl.on('line', (line) => {
    const data = line.split(',')

    const areaZh = data[data.length - 2]
    const areaEn = data[data.length - 1]
    if (!areas.includes(areaEn)) {
      const areaData = {
        _type: 'area',
        _id: `${areaEn.toLowerCase().split(' ').join('-')}`,
        name: {
          _type: 'localeString',
          en: areaEn,
          zh: areaZh,
        },
        slug: {
          _type: 'slug',
          name: areaEn.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
          current: areaEn.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
        },
      }
      fs.appendFileSync(outputPath, `${JSON.stringify(areaData)}\n`)
      areas.push(areaEn)
    }
  })

  importData()
}

const importData = async () => {
  const { stdout } = await exec(`sanity dataset import ${outputPath} staging`)
  console.log(stdout)
}

importAreaData()
