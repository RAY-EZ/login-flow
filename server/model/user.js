const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  theme:{
    type: [String],
    validate: {
      validator: checkLength, 
      message: function(props){
        return `${props.path} should have length equals to 3, got ${props.value.length}`
      }
    },
    default: ['#FFFFFF','#DDEEED','#FDF1E0']
  }
}, {
  toJSON: {
    transform: function(obj, ret){
      delete ret._id;
      ret.id = obj.id;
      delete ret.password;
    }
  }
})
/**
 * 
 * @param {String[]} theme 
 */
function checkLength(theme){
  return theme.length === 3;
}

userSchema.pre('save', function(next){
  if(!this.isNew) next();
  bcrypt.hash(this.password, 10).then((hashedPassword)=>{
    this.password = hashedPassword;
    next();
  })
})

const User = mongoose.model('user', userSchema);

module.exports = User;