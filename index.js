const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT||5000
const app=express();
// middlware
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uhtrr.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run()
{
   try{
     await client.connect();
     const userCollection=client.db('userList').collection('userInformation');
     
     app.get('/users',async(req,res)=>{
        const query={};
        const cursor=userCollection.find(query);
        const users= await cursor.toArray();
        res.send(users);
     })

   }
   finally
   {

   }
}
run().catch(console.dir)

app.get('/',(req,res)=>{
    res.send('Running')
})
app.listen(port,()=>{
    console.log("Server Running")
})