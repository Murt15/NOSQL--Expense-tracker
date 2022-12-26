const Expense=require('../Models/expense');
const User=require('../Models/user');

const ITEMS_Per_Page=3;



exports.getAddExpense=((req,res,next)=>{
    const page=+req.query.page ||1;
    //console.log(req.user);
    
    Expense.count({ userId: req.user._id }).
    then((num)=>{
        totalItems=num;
        return   Expense.find({ 'userId': req.user[0]._id }).limit(ITEMS_Per_Page).skip((page - 1) * ITEMS_Per_Page)
    })
    .then((val)=>{
        // console.log(val);
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
    })
    .catch(err=>console.log(err))
})


exports.postAddExpense=((req,res,next)=>{
    const expenseAmount=req.body.amount;
    const description=req.body.description;
    const category=req.body.category;
    //console.log(req.user);
    const expense=new Expense({ 
        expenseAmount:expenseAmount,
        description:description,
        category:category,
        createdAt:new Date(),
        userId:req.user[0]._id})
   expense.save()
    .then((result) => {
        // console.log(result);
        res.json(result);
    })
    .catch((err) => {
        console.log(err)
    });
   
})

exports.postDeleteExpense=((req,res,next)=>{
    // console.log(req.params)
    const ExpenseId = req.params.userid;
    console.log(ExpenseId)
    Expense.findByIdAndRemove(ExpenseId)
    .then(result => {
      console.log('DESTROYED Expense');
      res.json();
    })
    .catch(err => console.log(err));
})

exports.getEditExpense=((req,res,next)=>{
    const ExpenseId = req.params.userid;
    Expense.findOne({_id:ExpenseId})
    .then((val)=>{
        res.json(val)
    })
    .catch(err=>console.log(err))

})










