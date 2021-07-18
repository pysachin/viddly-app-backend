
const request = require('supertest');
const {User} = require('../../models/user');
let server;
describe('auth middleware', () => {

   
    let token;
    let name;
    
    beforeEach(() => {
        server = require('../../app'); 
        token =  new User().generateAuthToken();
    });

    const exec = async () => {
        return await request(server)
                        .post('/api/generes')
                        .set('x-auth-token',token)
                        .send({ name});
    }

  
    afterEach(async () => { server.close();});


    it('1 should return 401 if no token is provided', async () =>{
        token = '';
        const res = await exec();

        expect(res.status).toBe(401);
    });

    it('2 should return 400 if token is invalid', async () =>{
        token = 'a';
        const res = await exec();

        expect(res.status).toBe(400);
    });
   

})