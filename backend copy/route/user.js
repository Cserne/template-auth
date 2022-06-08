const User = require('../model/user');
const httpModule = require('../utils/http');
const http = httpModule();
const router = require('express').Router();
const jwt = require('jsonwebtoken');

const config = {
    google: {
      client_id: "423125049963-vnhlm59vvirdjsquu0efhqvq5u91orks.apps.googleusercontent.com",
      client_secret: "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",
      redirect_uri: "http://localhost:3000/callback",
      token_endpoint: "https://oauth2.googleapis.com/token",
      user_endpoint: null,
      user_id: null, //Itt erre nincs szükség, ez egy oauth flow
    },
    
    github: {
      client_id: "ed08b763b1bc357943f6",
      client_secret: "a980a3bd37867b1f0675c3e0356933aadcd25118",
      redirect_uri: "http://localhost:3000/callback/github",
      token_endpoint: "https://github.com/login/oauth/access_token",
      user_endpoint: "https://api.github.com/user",
      user_id: "id",
    },
    
    // facebook: {
    //     clientId: "", //appid?
    //     clientsecret: "", //appsecret?
    //     redirecturi: "",
    //     tokenendpoint: ""
    // },

}

router.post('/login', async (req, res) => {
  const payload = req.body;
  console.log(req.body)
  if (!payload) return res.sendStatus(400);

  const code = payload.code;
  const provider = payload.provider;
  if (!code || !provider) return res.sendStatus(400);
  if (!Object.keys(config).includes(provider)) return res.sendStatus(400); // Az Object.keys(config) visszaadja a config kulcsait. //dummy stuff sent

  
  const response = await http.post(config[provider].token_endpoint, {
      code: code,
      client_id: config[provider].client_id,
      client_secret: config[provider].client_secret,
      redirect_uri: config[provider].redirect_uri,
      grant_type: "authorization_code",
      },
      // "scope": config[provider].scope
      {
        headers: {
        Accept: "application/json",
      },
  });
  
  if (!response) return res.sendStatus(500);
  if (response.status !== 200) return res.sendStatus(401);

  let openId;
  // console.log(response);

  const onlyOauth = !response.data.id_token;
  if (onlyOauth) {
    // let accesstoken = response.data.split("=")[1].split("&")[0];
    let accesstoken = response.data.access_token;

    const userResponse = await http.get(config[provider].user_endpoint, {
      headers: {
        authorization: "Bearer " + accesstoken,
      },
    });
    // console.log(response.data);

    if (!response) return res.sendStatus(500);
    if (response.status !== 200) return res.sendStatus(401);  
    const id = config[provider].user_id;

    openId = userResponse.data[id];
  } else {
    const decoded = jwt.decode(response.data.id_token);
    if (!decoded) return res.sendStatus(500);
    openId = decoded.sub;
  }

  // find the user from db
  const key = `providers.${provider}`;
  let user = await User.findOneAndUpdate(
    {
      [key]: openId,
    },
    {
      providers: {[provider]: openId}
    },
    { upsert: true, new: true },
  );

  const sessionToken = jwt.sign({userId: user._id, providers: user.providers}, process.env.JWT_SECRET, {expiresIn: "1h"});

  res.json({sessionToken});

  // if (!user) {
  //   User.create({
  //     // "username": "", // Nem required a modellben.
  //     "providers": {
  //       [provider]: decoded.sub
  //     }
  //   });
  // }
  //receive google code => get google token => get openId
  // if user exists ? send jwt token : create user and send jwt
});

router.post('/login', async (req, res) => {
    
});

module.exports = router;