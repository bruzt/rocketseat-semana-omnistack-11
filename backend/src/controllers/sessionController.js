const db = require('../database/connection');

module.exports = {

    async store(req, res){

        const { id } = req.body;
        
        try {

            const ong = await db('ongs').where('id', id).select('name').first();

            if(!ong) return res.status(400).json({ error: 'no ONG found' });

            return res.json(ong);
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'internal error' });
        }
    }
}