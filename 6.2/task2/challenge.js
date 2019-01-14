// read each file from given directory
// read the contents and trim
// save the file back

const fs = require('fs').promises
const path = require('path')
const dirname = path.join(__dirname, '/files')

let deleteFileIfOld = async (file) => {
  let filePath = path.join(dirname, file)
  console.log(`Reading file ${filePath}`)

  let { mtimeMs } = await fs.stat(filePath)
  console.log(`file ${filePath} was modified on ${mtimeMs}`)

  if (mtimeMs <= cutoffTime) {
    fs.unlink(filePath)
    console.log(`Deleted file ${filePath}`)
  } else {
    console.log(`Retained file ${filePath}`)
  }
}

let cutoffTime = new Date() - 7 * 24 * 60 * 60 * 1000
let main = async () => {
  console.log('started processing')
  console.log(`cut off time is ${cutoffTime}`)

  let files = await fs.readdir(dirname)
  await Promise.all(files.map(async (file) => {
    await deleteFileIfOld(file)
  }))
  console.log('finished processing')
}

main()
