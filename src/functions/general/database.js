import { connect } from 'mongoose'
import { getCurrentTime } from '../utils/time.js'

export async function connectToDatabase (url) {
  if (typeof url !== 'string') {
    throw new Error(`The url type [string] was expected, but got a [${typeof url}]`)
  }

  await connect(url).then(() => console.log(`[${getCurrentTime()}]: 📦 Connected, database is ready to use.`))
    .catch((err) => { throw new Error(err) })
}
