const readline = require('readline')
const fs = require('fs')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const inputPath = `${__dirname}/districts.csv`
const outputPath = `${__dirname}/subDistrict.ndjson`

const hotSubDistricts = [
  'wan-chai',
  'causeway-bay',
  'tsim-sha-tsui',
  'mong-kok',
  'central',
  'admiralty',
]

async function importSubDistrictData() {
  // const districtIdMap = await getDistrictIds()
  const rl = readline.Interface({
    input: fs.createReadStream(inputPath),
  })
  try {
    fs.unlinkSync(outputPath)
  } catch (err) {
    // continue
  }

  rl.on('line', (line) => {
    const [subDistrictZh, subDistrictEn, _1, _2, _3, areaEn] = line.split(',')
    const id = subDistrictEn
      .toLowerCase()
      .split(' ')
      .join('-')
      .replace(/[^a-z0-9-_]/g, '')
    const areaId = `${areaEn.toLowerCase().split(' ').join('-')}`
    const subDistrictData = {
      _type: 'subDistrict',
      _id: id,
      name: {
        _type: 'localeString',
        en: subDistrictEn,
        zh: subDistrictZh,
      },
      slug: {
        _type: 'slug',
        name: subDistrictEn.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
        current: subDistrictEn.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
      isHot: hotSubDistricts.includes(id),
      area: {
        _ref: areaId,
        _type: 'reference',
      },
    }
    fs.appendFileSync(outputPath, `${JSON.stringify(subDistrictData)}\n`)
  })
  importData()
}

const importData = async () => {
  const { stdout } = await exec(`sanity dataset import ${outputPath} staging`)
  console.log(stdout)
}

importSubDistrictData()
