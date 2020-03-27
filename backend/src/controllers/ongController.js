const generateUniqueId = require('../utils/generateUniqueId');

const db = require('../database/connection');

module.exports = {

    async index(req, res){

        try {

            const ongs = await db('ongs').select('*');

            return res.json(ongs);
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'internal error' });
        }
    },

    async store(req, res){

        const { name, email, whatsapp, city, uf } = req.body;

        const id = generateUniqueId();

        try {
            
            await db('ongs').insert({
                id,
                name, 
                email, 
                whatsapp, 
                city, 
                uf
            });
    
            return res.json({ id });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'internal error' });
        }
    }
}