// read each file from given directory
// read the contents and trim
// save the file back

const fs = require('fs').promises
const path = require('path')
const dirname = path.join(__dirname, '/files')

let resizeFile = async (file) => {
  let filePath = path.join(dirname, file)
  console.log(`Reading file ${filePath}`)
  let { size } = await fs.stat(filePath)
  await fs.truncate(filePath, size / 2)
  console.log(`Wrote file ${filePath}`)
}

let main = async () => {
  console.log('started processing')
  let files = await fs.readdir(dirname)
  await Promise.all(files.map(async (file) => {
    await resizeFile(file)
  }))
  console.log('finished processing')
}

main()
