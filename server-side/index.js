const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')
var jwt = require('jsonwebtoken');
require('dotenv').config()


//middleware
app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7xouwts.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        //await client.connect();

        const userCollection = client.db('vibtree').collection('users')
       

        //users related apis
        //get users
        app.get('/users', async (req, res) => {
            // console.log(req.headers)
            const result = await userCollection.find().toArray()
            res.send(result)
        })


        //user creation
        app.post('/users', async (req, res) => {
            const user = req.body

            //checking user exist or not
            const query = { email: user.email }
            const existingUser = await userCollection.findOne(query)
            if (existingUser) {
                return res.send({ message: 'user already exist', insertedId: null })
            }
            const result = await userCollection.insertOne(user)
            res.send(result)
        })
        //delete user
        app.delete('/deleteUser',async(req,res)=>{
            const email =req.query.email
            const query ={email:email}
            const result = await userCollection.deleteOne(query)
            res.send(result)
        })
     
        //update user info
        app.patch('/updateUser', async (req, res) => {
            const userInfo = req.body
            const email = req.query.email
            const filter = {email: email }
            // console.log(userInfo)
            const updatedDoc = {
                $set: {
                    name: userInfo.name,
                    email: userInfo.email,
                    phone: userInfo.phone,
                    dob:userInfo.dob   
                }
            }
            const result = await userCollection.updateOne(filter, updatedDoc)
            res.send(result)
        })
      
        
        //user count
        app.get('/usersCount', async (req, res) => {
            const count = await userCollection.estimatedDocumentCount()
            res.send({ count })
        })

       
    } finally {
        // Ensures that the client will close when you finish/error
        //await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('vibtree-task server is running')
})

app.listen(port, () => {
    console.log(`vibtree-task server is running on port ${port}`)
})