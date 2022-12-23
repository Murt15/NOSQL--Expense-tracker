const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const userSchema = new Schema({
  name: {
      type: String,
      required: true
  },
  emailId: {
      type: String,
      required: true
  },
  password:{
    type:String,
    required:true

  },
  isPremiumUser:{
    type:Boolean
  }
  
});

module.exports = mongoose.model('User', userSchema)
// const Sequelize = require('sequelize');

// const sequelize = require('../utils/database');


// const User = sequelize.define('user', {
//     id: {
//       type: Sequelize.INTEGER,
//       autoIncrement: true,
//       allowNull: false,
//       primaryKey: true
//     },
//     name: {
//       type: Sequelize.STRING,
//       allowNull: false
//     },
//     emailId: {
//       type: Sequelize.STRING,
//       allowNull: false,
//       unique:true
//     },
//     password: {
//       type: Sequelize.STRING,
//       allowNull: false
//     },
//     isPremiumuser:Sequelize.BOOLEAN
    
//   });
  
//   module.exports = User;