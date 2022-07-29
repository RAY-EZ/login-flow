const express = require('express');
const { default: mongoose } = require('mongoose');
const config = require('./config.json');
const cookieParser = require('cookie-parser');

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');

const app = express();

app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE,PATCH');
  res.setHeader('Access-Control-Allow-Headers',req.get('access-control-request-headers') || '*' );
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  
  if(req.method == 'OPTIONS'){
    res.statusCode = 200;
    res.send();
    return;
  }
  
  next();
})
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.get('/', (req, res)=>{
  res.send('working')
})

app.use((error, req,res,next)=>{
  console.log(error)
})

async function start(){
  try {
    await mongoose.connect(config.mongodb)
    app.listen(5000, ()=>{
      console.log('listening on 5000')
    });
  } catch(e){
    
  }
}

start();
