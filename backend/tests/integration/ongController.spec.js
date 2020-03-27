const supertest = require('supertest');
const app = require('../../src/app');

const db = require('../../src/database/connection');

describe('ONG Controller Test Suit', () => {

    beforeEach( async () => {
        await db.migrate.latest();
    });

    afterEach( async () => {
        await db.migrate.rollback();
    });

    afterAll( async () => {
        await db.destroy();
      });

    it('should be able to create a new ONG', async () => {

        const response = await supertest(app).post('/ongs').send({
            name: "ong1",	
            email: "ong1@ong1.com",
            whatsapp: "19000000000",
            city: "cordeirópolis",
            uf: "sp"
        });
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});