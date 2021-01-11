const clientDomain = process.env.ENVIRONMENT === 'production' ? 'https://task-site-client.herokuapp.com' : 'http://localhost:3000'

module.exports = clientDomain