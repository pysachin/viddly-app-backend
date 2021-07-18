const request = require('supertest');
const {Genre} = require('../../models/genre');
const {User} = require('../../models/user');
let server;


describe('/api/generes',() =>{

    let token;
    let name;

    const exec = async () => {
        return await request(server)
                        .post('/api/generes')
                        .set('x-auth-token',token)
                        .send({ name});
    }

    beforeEach(() => { 
        server = require('../../app');
        token = new User().generateAuthToken();
        name = 'genre1';
    });
    afterEach(async () => { 
       
        await Genre.remove({});
        
        server.close();       
        
    });

    describe('GET /',()=>{
        it('1 should return all genres',async ()=>{
            await Genre.remove({});
            await Genre.collection.insertMany([
                {name: 'genre1'},
                {name: 'genre2'}
            ]);

            const res = await request(server).get('/api/generes');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
            await Genre.remove({});

        });
    });

    describe('GET /:id',()=>{
        it('2 should return genre if valid id is passed',async ()=>{
            const genre = new Genre({name: 'genre1'});
            
            await genre.save();
           
            const res = await request(server).get('/api/generes/'+genre._id);
          
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name',genre.name);
        });
    });

    describe('GET /:id',()=>{
        it('3 should return 404 genre if invalid id is passed',async ()=>{
            const res = await request(server).get('/api/genres/1b');
            expect(res.status).toBe(404);            
        });
    });

    describe('POST /', ()=>{
        it('4 should retrun 401 if client is not logged in', async () => {
            
            token = '';
            const res = await exec();
                        
            expect(res.status).toBe(401)

        });

        it('5 should retrun 400 if genre is less than 3 characters', async () => {
            name = new Array(2).join('x');
            const res = await exec();                        
            expect(res.status).toBe(400)

        });

        it('6 should retrun 400 if genre is greater than 20 characters', async () => {
            
            name = new Array(22).join('x');
            const res = await exec();                        
            expect(res.status).toBe(400)

        });

        it('7 should save the genre if it is valid', async () => {
                       
          
            await exec();
            const genre = await Genre.find({ name: 'genre1'});                                                
            expect(genre).not.toBeNull();

        });

        it('8 should return the genre if it is valid', async () => {
           
            const res = await exec();          
                                                       
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name','genre1');
        });

    });


    
});