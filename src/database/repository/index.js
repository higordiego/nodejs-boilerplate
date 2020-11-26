const databaseFn = require('../models')
const models = databaseFn

exports.models = models

/**
 * @function
 * @param  {String} collection - O nome da colection que irá buscar no banco de dados
 * @param  {Object} query - Query inserida na pesquisa do banco de dados.
 * @returns {Promise} Result - resultado da query
 */

exports.findAll = (collection, query) => models[collection].findAll(query)

/**
 * @param  {String} collection - O nome da colection que irá buscar no banco de dados
 * @param  {Object} query - Query inserida na pesquisa do banco de dados.
 * @param  {Object} options - Opção de retorno de objeto
 * @returns {Promise} Result - resultado da query ou stack de new Error()
 */

exports.findAllPaginate = async (collection, query, pages) => {
  const Model = models[collection]
  const HelperPaginate = require('../../presenters/paginate')(Model)
  const page = await HelperPaginate.countAll(pages, query)
  return HelperPaginate.listAll(query)(page)
}

exports.findOne = (collection, query) => models[collection].findOne(query)

/**
 * @param  {String} collection - O nome da colection que irá buscar no banco de dados
 * @param  {Object} data - Dados que será inserido no banco de dados.
 * @returns {Promise} Result - resultado da inserção ou stack de new Error()
 */

exports.create = (collection, data) => models[collection].create(data, { raw: true })

/**
 * @param  {String} collection - O nome da colection que irá buscar no banco de dados
 * @param  {Object} query - Query inserida na pesquisa do banco de dados.
 * @param  {Object} data - Dados que será alterado
 * @returns {Promise} Result - resultado do update ou stack de new Error()
 */

exports.update = (collection, query, data) => models[collection].update(data, query)

/**
 * @function
 * @param  {String} collection - O nome da colection que irá buscar no banco de dados
 * @param  {Object} query - Query inserida na pesquisa do banco de dados.
 * @returns {Promise} Result - resultado do update ou stack de new Error()
 */

exports.remove = (collection, query) => models[collection].destroy(query)
