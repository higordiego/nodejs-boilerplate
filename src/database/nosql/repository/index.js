
const { clientConnect } = require('../config')

const url = `${process.env.DB_URL}`

/**
 * @function
 * @param  {String} collection - O nome da colection que irá buscar no banco de dados
 * @param  {Object} query - Query inserida na pesquisa do banco de dados.
 * @param  {Object} options - Options mensagem filtrada para objeto de retorno.
 * @returns {Promise} Result - resultado da query ou stack de new Error()
 */

exports.findAll = async (collection, query, options = {}) => {
  let conn = null
  try {
    conn = await clientConnect(url)
    const result = await conn.db().collection(collection).find(query, options).toArray()
    conn.close()
    return result
  } catch (err) {
    if (conn !== null) conn.close()
    throw new Error(`Error in search db: ${err}`)
  }
}

/**
 * @function
 * @param  {String} collection - O nome da colection que irá buscar no banco de dados
 * @param  {Object} query - Query inserida na pesquisa do banco de dados.
 * @param  {Object} options - Opção de retorno de objeto
 * @returns {Promise} Result - resultado da query ou stack de new Error()
 */

exports.findOne = async (collection, query, options = {}) => {
  let conn = null
  try {
    conn = await clientConnect(url)
    const result = await conn.db().collection(collection).findOne(query, { ...options })
    conn.close()
    return result
  } catch (err) {
    if (conn !== null) conn.close()
    throw new Error(`Error in search db: ${err}`)
  }
}

/**
 * @function
 * @param  {String} collection - O nome da colection que irá buscar no banco de dados
 * @param  {Object} query - Query inserida na pesquisa do banco de dados.
 * @param  {Object} data - Dados que será inserido no banco de dados.
 * @param  {Object} options - Opção de retorno de objeto
 * @returns {Promise} Result - resultado da query ou stack de new Error()
 */
exports.findOneAndUpdate = async (collection, query, data, options = {}) => {
  let conn = null
  try {
    conn = await clientConnect(url)
    const result = await conn.db().collection(collection).findOneAndUpdate(query, data, options)
    conn.close()
    return result
  } catch (err) {
    if (conn !== null) conn.close()
    throw new Error(`Error in search db: ${err}`)
  }
}

/**
 * @function
 * @param  {String} collection - O nome da colection que irá buscar no banco de dados
 * @param  {Object} data - Dados que será inserido no banco de dados.
 * @returns {Promise} Result - resultado da inserção ou stack de new Error()
 */

exports.create = async (collection, data) => {
  let conn = null
  try {
    conn = await clientConnect(url)
    const result = await conn.db().collection(collection).insertOne(data)
    conn.close()
    return result.ops[0]
  } catch (err) {
    if (conn !== null) conn.close()
    throw new Error(`Error in search db: ${err}`)
  }
}

/**
 * @function
 * @param  {String} collection - O nome da colection que irá buscar no banco de dados
 * @param  {Object} data - Dados que será inserido no banco de dados.
 * @returns {Promise} Result - resultado da inserção ou stack de new Error()
 */
exports.aggregate = async (collection, data) => {
  let conn = null
  try {
    conn = await clientConnect(url)
    const result = await conn.db().collection(collection).aggregate(data).toArray()
    conn.close()
    return result[0]
  } catch (err) {
    if (conn !== null) conn.close()
    throw new Error(`Error in search db: ${err}`)
  }
}

exports.aggregateAll = async (collection, data) => {
  let conn = null
  try {
    conn = await clientConnect(url)
    const result = await conn.db().collection(collection).aggregate(data).toArray()
    conn.close()
    return result
  } catch (err) {
    if (conn !== null) conn.close()
    throw new Error(`Error in search db: ${err}`)
  }
}

/**
 * @function
 * @param  {String} collection - O nome da colection que irá buscar no banco de dados
 * @param  {Object} query - Query inserida na pesquisa do banco de dados.
 * @param  {Object} data - Dados que será alterado
 * @returns {Promise} Result - resultado do update ou stack de new Error()
 */

exports.update = async (collection, query, data) => {
  let conn = null
  try {
    conn = await clientConnect(url)
    const { result } = await conn.db().collection(collection).updateOne(query, data)
    conn.close()
    return { result }
  } catch (err) {
    if (conn !== null) conn.close()
    throw new Error(`Error in search db: ${err}`)
  }
}

/**
 * @function
 * @param  {String} collection - O nome da colection que irá buscar no banco de dados
 * @param  {Object} query - Query inserida na pesquisa do banco de dados.
 * @param  {Object} data - Dados que será alterado
 * @returns {Promise} Result - resultado do remove ou stack de new Error()
 */

exports.remove = async (collection, query, data) => {
  let conn = null
  try {
    conn = await clientConnect(url)
    const { result } = await conn.db().collection(collection).deleteMany(query)
    conn.close()
    return { result }
  } catch (err) {
    if (conn !== null) conn.close()
    throw new Error(`Error in search db: ${err}`)
  }
}
