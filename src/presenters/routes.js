const fs = require('fs')
const path = require('path')

const { validateAuthorization } = require('./jwt')

const parseObject = (list, dir) => list.reduce((acc, value) => {
  const obj = fs.readdirSync(`${dir}/${value}`)
  obj.map(a => acc.push({ object: a, root: `${value}`, dir: `${dir}/${value}/${a}` }))
  acc = acc.filter(a => a.object !== 'case.js')
  return acc
}, [])

const generateRoute = (list, app, models) => list.map(val => {
  const c = require(val.dir)
  let args = [`/api${c.path}`]
  if (c.authenticate) args = args.concat(validateAuthorization)
  c.database ? args.push(c.handler(models)) : args.push(c.handler)
  args = args.concat(c.middleware)
  args.push(c.handler)
  app._router[c.method.toLowerCase()].apply(app._router, args)
})

module.exports = app => {
  try {
    const dir = path.join(__dirname, '../controllers')
    const databaseFn = require(path.join(__dirname, '../database/mysql/models'))
    const models = databaseFn
    const listRoutes = fs.readdirSync(dir)
    const parse = parseObject(listRoutes, dir, models)
    generateRoute(parse, app)
  } catch (error) {
    console.warn(`Error in generate modules routes express: ${error.message}`)
  }
}
