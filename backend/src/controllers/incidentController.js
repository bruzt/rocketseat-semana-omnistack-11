const db = require('../database/connection');

module.exports = {

    async index(req, res){

        const { page = 1 } = req.query;

        try {

            const [ count ] = await db('incidents').count();

            const incidents = await db('incidents')
                .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
                .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf'])
                .limit(5)
                .offset((page -1) * 5);
                

            res.header('X-Total-Count', count['count(*)']);
            return res.json(incidents);
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'internal error' });
        }
    },

    async store(req, res){

        const ong_id = req.headers.authorization;
        const { title, description, value  } = req.body;

        if(!ong_id) return res.status(400).json({ error: 'authorization is required' });
        if(!title || !description || !value) return res.status(400).json({ error: 'all fields must be filled' });

        try {

            const ong = await db('ongs').where('id', ong_id);
            
            if(!ong || ong.length < 1) return res.status(400).json({ error: 'ong not found' });

            const [ id ] = await db('incidents').insert({
                title, 
                description, 
                value,
                ong_id
            });

            return res.json({ id });
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'internal error' });
        }
    },

    async destroy(req, res){

        const { id } = req.params;
        const ong_id = req.headers.authorization;

        if(!ong_id) return res.status(400).json({ error: 'authorization is required' });

        try {

            const ong = await db('ongs').where('id', ong_id).first();

            const incident = await db('incidents').where('id', id).first();
  
            if(!ong || !incident || incident.ong_id != ong.id) return res.status(400).json({ error: 'ong or incident not found' });
            
            await db('incidents').delete().where('id', id);
            
            return res.sendStatus(200);
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'internal error' });
        }
    }
}