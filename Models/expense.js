const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const expenseSchema= new Schema({
    expenseAmount:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})

module.exports=mongoose.model('Expense',expenseSchema);

// const Sequelize = require('sequelize');

// const sequelize = require('../utils/database');


// const Expense = sequelize.define('expense', {
//     id: {
//       type: Sequelize.INTEGER,
//       autoIncrement: true,
//       allowNull: false,
//       primaryKey: true
//     },
//     expenseAmount: {
//       type: Sequelize.INTEGER,
//       allowNull: false
//     },
//     description: {
//       type: Sequelize.STRING,
//       allowNull: false
//     },
//     category: {
//       type: Sequelize.STRING,
//       allowNull: false
//     }
    
//   });
  
//   module.exports = Expense;