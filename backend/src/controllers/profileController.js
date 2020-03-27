const db = require('../database/connection');

module.exports = {

    async index(req, res){

        const ong_id = req.headers.authorization;

        try {

            const incidents = await db('incidents').where('ong_id', ong_id);

            return res.json(incidents)
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'internal error' });
        }
    },
}