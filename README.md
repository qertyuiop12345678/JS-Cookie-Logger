# JS-Cookie-Logger

## Q/A

How do I create a MongoDB database?  
- Signup to the website. https://www.mongodb.com/  
- Create a free cluster.  
- Get the connection URL for the mongodb cluster.  

How do I push this source to heroku?  
- There are plenty of tutorials on youtube.  

How do I make this work for my heroku app?  
- It is fairly simple all you have to do is change "mongo-connection" in the server.json file to your mongo db connection uri.  
- Change all of the URL's in the javascript scripts that have YOURHEROKUAPP to (your heroku app obviously lol.)  
- Make sure your IP whitelist for mongodb is set to all so that heroku can access it as heroku's IP is dynamic.  

Need further help?  
- Contact me on discord.  
- cj#1211
