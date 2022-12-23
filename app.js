const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');

const dotenv=require('dotenv');

dotenv.config();

const mongoose=require('mongoose');
const helmet = require("helmet");
const morgan=require('morgan');
const fs=require('fs');

const path = require('path');

const app=express();

// const User=require('./Models/user');
// const Expenses=require('./Models/expense');
// const Order=require('./Models/order')
// const ForgotPassword=require('./Models/forgotpass');

const purchaseRoutes=require('./routes/purchase')
const userRoutes=require('./routes/user');
const expenseRoutes=require('./routes/expense')

const logStream=fs.createWriteStream(path.join(__dirname,'acess.log'),{flags:'a'})
app.use(cors());
//Relations
//One to Many
// Expenses.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
// User.hasMany(Expenses);

// User.hasMany(Order);
// Order.belongsTo(User);


// User.hasMany(ForgotPassword);
// ForgotPassword.belongsTo(User);

app.use(bodyParser.json({ extended: false }));

app.use(helmet());
app.use(morgan('combined',{stream:logStream}));

// app.use((req,res)=>{
//     res.sendFile(path.join(__dirname,`Frontend/${req.url}`))
// })

app.use('/expense',expenseRoutes);
app.use('/user',userRoutes);
app.use('/purchase',purchaseRoutes);

mongoose.connect('mongodb+srv://murtaza:murt123@cluster0.rnbmlzo.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    app.listen(3000);
})
.catch(err=>console.log(err))


app.use((req,res,next)=>{
    res.status(404).send('<h1>Page Not Found</h1>')
})