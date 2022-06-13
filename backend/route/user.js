require("dotenv").config();
const User = require('../model/user');
const http = require('../utils/http');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth')
const config = require('../app.config');


router.post('/login', auth({block: false}), async (req, res) => {
  const payload = req.body;
  // console.log(req.body)
  if (!payload) return res.sendStatus(400);

  const code = payload.code;
  const provider = payload.provider;
  if (!code || !provider) return res.sendStatus(400); // not enough data
  if (!Object.keys(config.auth).includes(provider)) return res.sendStatus(400); // Az Object.keys(config.auth) visszaadja a config.auth kulcsait. //dummy stuff sent

  
  const response = await http.post(config.auth[provider].token_endpoint, {
      code: code,
      client_id: config.auth[provider].client_id,
      client_secret: config.auth[provider].client_secret,
      redirect_uri: config.auth[provider].redirect_uri,
      grant_type: "authorization_code",
      // grant_type: config.auth[provider].grant_type,
      },
      // "scope": config.auth[provider].scope
      {
        headers: {
        Accept: "application/json",
      },
  });
  
  if (!response) return res.sendStatus(500);
  if (response.status !== 200) return res.sendStatus(401); // amit a google ad, nem 200-as, akkor nem tudjuk azonosítani

  //github oauth flow-jához
  let openId;
  // console.log(response);

  const onlyOauth = !response.data.id_token;
  if (onlyOauth) {
    // let accesstoken = response.data.split("=")[1].split("&")[0];
    let accesstoken = response.data.access_token;

    const userResponse = await http.get(config.auth[provider].user_endpoint, {
      headers: {
        authorization: "Bearer " + accesstoken,
      },
    });
    // console.log(response.data);

    if (!response) return res.sendStatus(500);
    if (response.status !== 200) return res.sendStatus(401);  
    const id = config.auth[provider].user_id;

    openId = userResponse.data[id]; //openIdnak adunk egy értéket
  } else {
    const decoded = jwt.decode(response.data.id_token);
    if (!decoded) return res.sendStatus(500);
    openId = decoded.sub; //openIdnak adunk egy értéket
  }

  // find the user from db // Elmentjük a usert a googleId/openid alapján.
  const key = `providers.${provider}`;
  let user = await User.findOne(
    { [key]: openId },
  );

  if (user && res.locals.user?.providers) {
    user.providers = { ...user.providers, ...res.locals.user.providers };

    user = await user.save();
  }

  //account merge előtt
  // let user = await User.findOneAndUpdate(
  //   { [key]: openId },
  //   { providers: {[provider]: openId} },
  //   { upsert: true, new: true },
  // );

  // const user = { username: "random", profile: {
  //   id: "randomsting",
  //   account: {
  //     balance: "..",
  //     id: ".."
  //   }
  // }}
  
  // const b1 = (user && user.profile && user.profile.account) ? user.profile.account.balance : null; // A b1 értéke balance vagy semmi lesz.
  // const b1 = user?.profile?.account?.balance // Ez ugyanaz, mint a felette lévő sor.
  
  //optional chaining user?._id = user ? user._id : null
  const sessionToken = jwt.sign({userId: user?._id, providers: user ? user.providers : { [provider]: openId }}, process.env.JWT_SECRET, {expiresIn: "1h"}); // ezt az id-t a mongoDB adta nekik, secret key, expires in // a user?._id ugyanaz, mint a user ? user._id : null, tulajdonképpen egy ternary operator rövidítése

  res.json({sessionToken}); // Visszaküldjük neki stringként (sessiontoken), de küldhetjük objectben is ({sessiontoken})/{"sessiontoken": sessionToken}.

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

router.post('/create', auth({ block: true }), async (req, res) => {
  // res.locals.user elérhető itt
  if (!req.body?.username) return res.sendStatus(400);
  const user = await User.create({ username: req.body.username, providers: res.locals.user.providers });

  const sessionToken = jwt.sign({ userId: user._id, providers: user.providers }, process.env.JWT_SECRET, { expiresIn: "1h" }); 

  res.json({ sessionToken });

});

// router.post('/logout', async (req, res) => {
    
// });

module.exports = router;