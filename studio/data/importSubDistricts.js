const readline = require('readline')
const fs = require('fs')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const inputPath = '/Users/anthonysiu/parkparkpark/studio/data/districts.csv'
const outputPath =
  '/Users/anthonysiu/parkparkpark/studio/data/subDistrict.ndjson'

const hotSubDistricts = ['wan-chai', 'causeway-bay','tsim-sha-tsui', 'mong-kok','central', 'admiralty']
const getDistrictIds = async () => {
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
    const [subDistrictZh, subDistrictEn, _1, _2, _3, districtEn] =
      line.split(',')
    const id = subDistrictEn.toLowerCase().split(' ').join('-').replace(/[^a-z0-9-_]/g,'');
    const zhSlug = subDistrictZh;
    const districtId = `${districtEn.toLowerCase().split(' ').join('-')}-district`
    const subDistrictData = {
      _type: 'subDistrict',
      _id: id,
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
          current: zhSlug,
        },
      },
      isHot: hotSubDistricts.includes(id),
      district: {
        _ref: districtId,
        _type: 'reference',
      },
    }
    fs.appendFileSync(
      outputPath,
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
