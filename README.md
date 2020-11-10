# JS-Cookie-Logger

## Q/A

How do I create a MongoDB database?  
- 1. Signup to the website. https://www.mongodb.com/  
- 2. Create a free cluster.  
- 3. Get the connection URL for the mongodb cluster.  

How do I push this source to heroku?  
- 1. There are plenty of tutorials on youtube.  

How do I make this work for my heroku app?  
- 1. It is fairly simple all you have to do is change "mongo-connection" in the server.json file to your mongo db connection uri.  
- 2. Change all of the URL's in the javascript scripts that have YOURHEROKUAPP to (your heroku app obviously lol.)  
- 3. Make sure your IP whitelist for mongodb is set to all so that heroku can access it as heroku's IP is dynamic.  

Need further help?  
- 1. Contact me on discord.  
- 2. cj#1211
