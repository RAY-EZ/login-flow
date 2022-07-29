const jwt =  require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config.json');

const User = require('../model/user');

const signToken = id => {
  return jwt.sign({ id }, config.JWT_SECRET, {
    expiresIn: config.EXPIRES_IN
  });
};

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
async function signup(req, res,next){
  let { username, password, } = req.body;
  if(!username, !password){
    res.statusCode = 400;
    return res.send({
      status: "bad request",
      error: "invalid field/s"
    })
  }
  
  try {
    const checkUser =await User.findOne({ username});
    if(checkUser){
      console.log(checkUser)
      res.statusCode = 400;
      return res.send({
        status: "bad request",
        error: "user already exists"
      })
    }
    const user = new User({
      username,
      password: password.trim()
    })
    await user.save();

    res.statusCode = 200;
    res.send({
      status: "success",
      user
    })
  } catch(e){
    return next(e)
  }
}
/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
async function signin(req, res){
  const { username, password} = req.body;
  
  const user = await User.findOne({ username: username});
  if(!user){
    res.statusCode = 401;
    return res.send({
      status: "unauthorized",
      error: "invalid username"
    })
  }
  

  bcrypt.compare(password, user.password).then(function(result){
    const token = signToken(user.id);

    if(result){
      res.statusCode = 200;
      res.cookie('jwt', token, { expires: new Date(Date.now() + config.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000), httpOnly: false});
      return res.send({
        status: "success",
        user
      })
    }
    
    res.statusCode = 401;
    return res.send({
      status: "failed",
      error: "incorrect username or password"
    })
  })
}

exports.protect = function(req, res, next){

  const {jwt: token} = req.cookies;

  if(!token){
    res.statusCode = 401;
    return res.send({
      status: "unauthorized",
      error: "invalid token"
    })
  }
  const payload = jwt.verify(token, config.JWT_SECRET);
  if(!payload.id){
    res.statusCode = 401;
    return res.send({
      status: "unauthorized",
      error: "invalid token"
    })
  }
  
  res.locals.userid = payload.id;
  next();
}
exports.signup = signup;
exports.signin = signin;