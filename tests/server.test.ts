
import {connectToDatabase} from '../server/src/database';


//const fetch = require('node-fetch');


test('Testing connectToDatabase()', () =>{
    expect(connectToDatabase('mongodb+srv://jgerb:dbpass@armchairathletes.xnjlk.mongodb.net/?retryWrites=true&w=majority')).resolves;
})




//expect(JSON.parse(response)).toBe(200