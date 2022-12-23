const Razorpay=require('razorpay');
const Order=require('../Models/order');
const Expense=require('../Models/expense');
const User = require('../Models/user');
const order = require('../Models/order');



exports.getPremium=async (req, res) => {
    //console.log( process.env.RAZORPAY_KEY_ID,process.env.RAZORPAY_KEY_SECRET);
    try {
        var rzp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })
        const amount = 25000;

        rzp.orders.create({amount, currency: "INR"}, (err, order) => {
            if(err) {
                console.log(err);
            }
            //req.user.createOrder({ orderid: order.id, status: 'PENDING'})
            const ORDER=new Order({orderId:order.id,status:'PENDING',userId:req.user[0]._id})
            ORDER.save()
           .then(() => {
                return res.status(201).json({ order, key_id : process.env.RAZORPAY_KEY_ID});

            }).catch(err => {
                console.log(err);
            })
        })
    } catch(err){
        console.log(err);
        res.status(403).json({ message: 'Something went wrong', error: err})
    }
}

exports.postTransactionStatus= async (req, res ) => {
    try {
        const { payment_id, order_id} = req.body;
        Order.findOne({orderId : order_id}).then((order)=>{
            order.paymentId=payment_id;
            order.status="Successfull";
            return order.save()
        })
        // Order.findOne({orderId : order_id}).then(order => { { paymentid: payment_id, status: 'SUCCESSFUL'}
        //     order.update({ paymentid: payment_id, status: 'SUCCESSFUL'})
        .then(() => {
                User.findByIdAndUpdate(req.user[0]._id,{isPremiumUser:true})
                console.log("done");
                return res.status(202).json({sucess: true, message: "Transaction Successful"});
            }).catch((err)=> {
               // console.log('hii123')
                console.log(err)
                
            })
       
    } catch (err) {
        console.log(err);
        //console.log('hii12345')
        res.status(403).json({ error: err, message: 'Something went wrong' })

    }
}

exports.getLeaderBoard=async(req,res,next)=>{
    let user=await User.find();
    //console.log(user)
    res.json(user);
}

exports.getExpense=async(req,res,next)=>{
    //console.log(req.body.id);
    id=req.body.id;

    const user=await User.findOne({where:{id:id}})
    //console.log(user);
    //const expenses= await user.getExpenses();
    const expenses=await Expense.find({userId:id})
    res.json(expenses)
}

exports.getAllexpense=async(req,res,next)=>{
    const items=req.params.items;
    const ITEMS_Per_Page =parseInt(items);
    // console.log(ITEMS_Per_Page);
    try {
       
        const page=+req.query.page ||1;
        const totalItems =await  Expense.count({ userId: req.user._id })
        const val= await  Expense.find({ 'userId': req.user[0]._id })
        .limit(ITEMS_Per_Page)
        .skip((page - 1) * ITEMS_Per_Page)
    
        res.json({
            val:val,
            isPremium:req.user.isPremiumuser,
            currentPage: page,
            hasNextPage: totalItems > page * ITEMS_Per_Page,
            hasPreviousPage: page > 1,
            nextPage: +page + 1,
            previousPage: +page - 1,
            lastPage: Math.ceil(totalItems / ITEMS_Per_Page)
        });
        
    } catch (err) {
        console.log(err);
    }
    
}