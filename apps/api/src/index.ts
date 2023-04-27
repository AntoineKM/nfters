import express from 'express'
import Log from './utils/log'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const server = app.listen(3000, () => {
  const { address, port } = server.address();
  Log.ready(`started server on ${address}:${port}, url: http://${address}:${port}`);
});