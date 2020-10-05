const app = require('../../index')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')

const req = supertest(app)
const validJWT = jwt.sign({}, process.env.TOKEN_SECRET)
const invalidJWT = jwt.sign({}, 'wrong_secret')

describe('Test authentication process', () => {
  it('should return 401 when no auth header was send', async () => {
    const res = await req.get('/api/example')
    expect(res.status).toBe(401)
    expect(JSON.stringify(res.body)).toContain('Token não informado!')
  })

  it('should return 401 when no valid auth header was send', async () => {
    const res = await req.get('/api/example').set('Authorization', 'Bearer bearer bearer')
    expect(res.status).toBe(401)
    expect(JSON.stringify(res.body)).toContain('Erro no token!')
  })

  it('should return 401 when Bearer prefix was invalid', async () => {
    const res = await req.get('/api/example').set('Authorization', `Bearererer ${validJWT}`)
    expect(res.status).toBe(401)
    expect(JSON.stringify(res.body)).toContain('Token mal formatado!')
  })

  it('should return 401 when JWT was bad formatted', async () => {
    const res = await req.get('/api/example').set('Authorization', 'Bearer jwt.jwt.jwt.jwt')
    expect(res.status).toBe(401)
    expect(JSON.stringify(res.body)).toContain('Token mal formatado!')
  })

  it('should return 401 when JWT was invalid', async () => {
    const res = await req.get('/api/example').set('Authorization', `Bearer ${invalidJWT}`)
    expect(res.status).toBe(401)
    expect(JSON.stringify(res.body)).toContain('Token informado é inválido!')
  })

  it('should return 200 when JWT was valid', async () => {
    const authResponse = await req.post('/api/authenticate').send({ email: 'admin@admin.com.br', password: '123123' })
    const res = await req.get('/api/example').set('Authorization', `Bearer ${authResponse.body.token}`).send({ email: 'admin@admin.com.br', password: '123123' })
    expect(res.status).toBe(200)
  })
})
