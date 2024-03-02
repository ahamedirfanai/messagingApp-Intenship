import exp from "express";
import mongoose  from "mongoose";
import Messages from './dbMessages.js';
import cors from 'cors';
import Pusher from 'pusher';



const app=exp();

app.use(cors());
app.use(exp.json({ limit: '150mb' }));

const connection_url = "mongodb+srv://admin:ahamedirfan@cluster0.lzj2mds.mongodb.net/?retryWrites=true&w=majority&writeConcern=majority";


app.get('/',async(req,res)=>{

res.send("server is up and running");

})

app.post('/messages/new',async (req,res)=>{
    try{
    const newMessage =req.body
    const data= await Messages.create(newMessage)
        res.status(201).send(data)
    }
    catch(err){
        
           res.status(500).send(err)
    }
          

});

const pusher = new Pusher({
    appId: "1760386",
    key: "4c5f2b31146bf666a163",
    secret: "80f96642d9015d99d340",
    cluster: "ap2",
    useTLS: true
  });

const db = mongoose.connection
db.once("open",()=>{
    console.log("DB connected")
    const msgCollection = db.collection("messagingmessages")
    const changeStream = msgCollection.watch()
    changeStream.on('change',change=>{
        console.log(change)
        if(change.operationType ==="insert"){
            const messageDetails =change.fullDocument
            pusher.trigger("messages","inserted",{
                name:messageDetails.name,
                message:messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received
            })
         } else{
                console.log('Error trigerring Pusher')
            }
            
        })
    
})





app.get('/messages/sync', async (req, res) => {
    try {
        const data = await Messages.find();
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send(err);
    }
});



app.listen(9000,async()=>{
    console.log("server is running on port 9000");
})


mongoose.connect(connection_url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))

    .catch(error => console.error('Error connecting to MongoDB:', error));