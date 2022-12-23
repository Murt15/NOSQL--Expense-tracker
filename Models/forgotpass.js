const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const forgotPassSchema= new Schema({
    uuid: {
        type: String,
        required: true
    },
   active:{
    type:Boolean,
    required: true
   },
   userId:{
    type: Schema.Types.ObjectId,
    ref:'User',
    required:true
   } 
})

module.exports = mongoose.model('ForgotPassword', forgotPassSchema)
// const Sequelize = require('sequelize');
// const sequelize = require('../utils/database');


// const Forgotpassword = sequelize.define('forgotpassword', {
//     id: {
//         type: Sequelize.UUID,
//         allowNull: false,
//         primaryKey: true
//     },
//     active: {
//         type: Sequelize.BOOLEAN
//     },
//     expiresby: {
//         type: Sequelize.DATE
//     }
// })

// module.exports = Forgotpassword;