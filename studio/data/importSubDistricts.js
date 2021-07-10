const readline = require('readline')
const fs = require('fs')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const inputPath = '/Users/anthonysiu/parkparkpark/studio/data/districts.csv'
const outputPath =
  '/Users/anthonysiu/parkparkpark/studio/data/subDistrict.ndjson'

const getDistrictIds = async (callback, data) => {
  const { stdout } = await exec(
    `sanity documents query "*[_type == 'district']"`
  )
  const response = JSON.parse(stdout)
  const districtIdMap = response.reduce(
    (acc, district) => ({
      ...acc,
      [district.name.en]: district._id,
    }),
    {}
  )
  return districtIdMap
}


async function importSubDistrictData() {
  const districtIdMap = await getDistrictIds()
  const rl = readline.Interface({
    input: fs.createReadStream(inputPath),
  })
  try {
    fs.unlinkSync(outputPath)
  } catch (err) {
    // continue
  }

  rl.on('line', (line) => {
    const [subDistrictZh, subDistrictEn, _, __, districtZh, districtEn] =
      line.split(',')
    const subDistrictData = {
      _type: 'subDistrict',
      name: {
        _type: 'localeString',
        en: subDistrictEn,
        zh: subDistrictZh,
      },
      slug: {
        _type: 'localeSlug',
        enSlug: {
          _type: 'slug',
          current: subDistrictEn.toLowerCase().split(' ').join('-'),
        },
        zhSlug: {
          _type: 'slug',
          current: subDistrictZh,
        },
      },
      district: {
        _ref: districtIdMap[districtEn],
        _type: 'reference',
      },
    }
    fs.appendFileSync(
      '/Users/anthonysiu/parkparkpark/studio/data/subDistrict.ndjson',
      `${JSON.stringify(subDistrictData)}\n`
    )
  })
  importData()
}

const importData = async () => {
  const { stdout } = await exec(`sanity dataset import ${outputPath} staging`)
  console.log(stdout)
}

importSubDistrictData()
