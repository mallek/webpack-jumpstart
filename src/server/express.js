import express from "express"
import path from "path"

const server = express()

const webpack = require("webpack")
const config = require("../../config/webpack.dev.js")
const compiler = webpack(config)
require("webpack-mild-compile")(compiler)

const webpackDevMiddleware =
    require("webpack-dev-middleware")(
        compiler,
        config.devServer
    )
const webpackHotMiddleware =
    require("webpack-hot-middleware")(compiler)

server.use(webpackDevMiddleware)
server.use(webpackHotMiddleware)

const staticMiddleware = express.static("dist")

server.use(staticMiddleware)

const PORT = process.env.PORT || 8080
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})