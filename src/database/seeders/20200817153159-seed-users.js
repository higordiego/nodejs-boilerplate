'use strict'

const { generatePassword } = require('../../presenters/password')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const companyId = await queryInterface.rawSelect('Companies', { where: { name: 'Devexo' } }, ['id'])
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    await queryInterface.bulkInsert('Users', [
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        name: 'Administrator Devexo',
        email: 'admin@devexo.com.br',
        isAdmin: true,
        password: generatePassword('123123123'),
        CompanyId: companyId,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', {})
  }
}
