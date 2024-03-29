const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema=new Schema({
    paymentId:{
        type:String
        
    },
    orderId:{
        type:String
        
    },
    status:{
        type:String
        
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})

module.exports = mongoose.model('Order',orderSchema)
// const Sequelize = require('sequelize');
// const sequelize = require('../utils/database');


// const Order = sequelize.define('order', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     paymentid: Sequelize.STRING,
//     orderid: Sequelize.STRING,
//     status: Sequelize.STRING
// })

// module.exports = Order;