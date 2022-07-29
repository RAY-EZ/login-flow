const User = require('../model/user');
/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
 function getMe(req, res){
  res.send('this is me')
}
async function myTheme(req, res){
  const { userid } = res.locals
  let {theme} = await User.findById(userid,{ theme: 1, _id:0});

  res.statusCode = 200;

  res.send({
    status:"success",
    theme
  })
}


async function updateTheme(req, res){
  let {theme} = req.body;
  theme = Object.values(theme);

  let user = await User.findById(res.locals.userid);
  user.theme = theme;
  await user.save();

  res.statusCode = 200;

  res.send({
    status:"success",
    user
  })
}

exports.getMe = getMe;
exports.myTheme = myTheme;
exports.updateTheme = updateTheme;
