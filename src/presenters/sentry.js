const Sentry = require('@sentry/node')

Sentry.init({ dsn: process.env.SENTRY_URL })

const { requestHandler, errorHandler } = Sentry.Handlers

module.exports = { requestHandler, errorHandler }
