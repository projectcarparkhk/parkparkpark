// import dotenv from 'dotenv'
// import fs from 'fs'
// import path from 'path'
// import sanityClient from '@sanity/client'
const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')
const sanityClient = require('@sanity/client')

dotenv.config()

const __DIRNAME = path.resolve(path.dirname(''))

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: 'v2021-03-25',
}

const client = sanityClient(config)

const writeFile = ({ pathName, fileName, content }) => {
  fs.mkdirSync(path.resolve(__DIRNAME, pathName), {
    recursive: true,
  })
  fs.writeFileSync(
    path.resolve(__DIRNAME, `${pathName}/${fileName}`),
    JSON.stringify(content)
  )
}

async function getCarparks() {
  return client.fetch(`*[_type == 'carpark']{
    name,
    slug
  }`)
}

async function getSubDistricts() {
  return client.fetch(`*[_type == 'subDistrict']{
    name,
    slug
  }`)
}

async function main() {
  const subDistricts = await getSubDistricts()
  writeFile({
    pathName: `./cache`,
    fileName: `subDistricts.json`,
    content: subDistricts.map((subDistrict) => ({
      ...subDistrict,
      type: 'sub-districts',
    })),
  })

  const carparks = await getCarparks()
  writeFile({
    pathName: `./cache`,
    fileName: `carparks.json`,
    content: carparks.map((carpark) => ({
      ...carpark,
      type: 'carparks',
    })),
  })
}

main()
