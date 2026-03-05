const http = require('http')
const fs = require('fs')
const path = require('path')

const publicDir = path.join(__dirname, 'public')
const port = process.env.PORT || 3000

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
}

const server = http.createServer((req, res) => {
  const cleanPath = req.url === '/' ? '/index.html' : req.url
  const filePath = path.join(publicDir, cleanPath)
  const ext = path.extname(filePath)
  const contentType = mimeTypes[ext] || 'application/octet-stream'

  if (!filePath.startsWith(publicDir)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Forbidden')
    return
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
      res.end('Not found')
      return
    }

    res.writeHead(200, { 'Content-Type': contentType })
    res.end(data)
  })
})

server.listen(port, '127.0.0.1', () => {
  console.log(`HouseHunt is running on http://127.0.0.1:${port}`)
})
