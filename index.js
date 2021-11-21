const mongoose = require('mongoose');

 /**
  * Connect mongoose DB.
  */    
mongoose.connect(`mongodb://127.0.0.1:27017/testquery`);
 
const userSchema = new mongoose.Schema({
    username : String,
    age : Number
});

// userSchema.index({username : -1});
// console.log(userSchema.indexes())
const userModel = mongoose.model('Users', userSchema);

async function insertTest() {
    console.log('start insert, pleast wait...')
    for(var i = 0; i < 100000000; i++) {
        await userModel.create({username: 'user' + i,age: Math.floor(Math.random() * 100)});
    }
    console.log('insert done');
}


async function estimate() {
    await userModel.collection.dropIndexes({username : 1});
    console.log('Drop index successfull');
    console.time('query');
    const finded = await userModel.find({username: 'user999999'});
    console.timeEnd('query');
}

insertTest();
// estimate();