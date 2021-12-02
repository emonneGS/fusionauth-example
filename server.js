const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('express').Router()
const FusionAuthClient = require("@fusionauth/typescript-client");

const clientSecret = 'tt4vYwZmuFG7-CV_DDlnivbr0TwelFQLoYFff1AROZE';
const clientId = '26b78653-7fee-496b-80db-c694cc5b1565';
const fusionAuthPort = 9011;
const fusionAuthUrl = 'http://localhost:';
const redirectUri = 'http://localhost:8080/oauth-redirect'

const fusClient = new FusionAuthClient.FusionAuthClient(
    clientId, `${fusionAuthUrl}${fusionAuthPort}`)

console.log(
    `${fusionAuthUrl}${fusionAuthPort}/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}`
)
const api_key = 'xmMIV05h9Hat2SIKPTKNuizhQ52GSWlt9wc_hQT4ias6o9yDEdO07IKg'
const app = express()

router.get('/oauth-redirect', async(req,res) => {
    const code = req.query.code;
    console.log(code);
    try {
        const accessToken = await fusClient.exchangeOAuthCodeForAccessToken(
            code, clientId, clientSecret, redirectUri)
        res.send(accessToken)
    } catch (e) {
        console.log(e)
    }
    
})

router.get('/', (req, res) => {
  
    // Redirect the user to log in via FusionAuth
    res.redirect(redirectUri);

  });

app.use(router)
app.use(express.json());

app.use(cors(
    {
      origin: true,
      credentials: true
    })
  );


app.listen(8080, () => {
 console.log ('listen')
})
