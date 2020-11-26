'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Companies', [{
      id: Sequelize.literal('uuid_generate_v4()'),
      name: 'Devexo',
      cnpj: '81119988000104',
      token: 'dsadsad321321321312312312321312dsadsadasdsa',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Companies', {})
  }
}
