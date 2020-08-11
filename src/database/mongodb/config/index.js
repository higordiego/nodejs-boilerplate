require('saslprep')

const { MongoClient } = require('mongodb')

/**
 * @param {string} uri - connect url
 * @returns {Proimise} Connect - Retornando conexão de banco de dados.
 */
exports.clientConnect = (uri) => MongoClient.connect(uri, { useUnifiedTopology: true })
