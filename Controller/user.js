const User = require('../Models/user');
const ForgotPassword = require('../Models/forgotpass');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const sgMail = require('@sendgrid/mail');
const uuid = require('uuid');


function generateAccessToken(id) {
    return jwt.sign({ userId: id }, process.env.SECRET)
}

exports.postAddUser = async (req, res, next) => {
    // console.log(req.body);
    const name = req.body.name;
    const emailId = req.body.emailid;
    const password = req.body.password;
    try {

        const find = await User.find({  emailId: emailId  })
        if (find.length == 0) {
            bcrypt.hash(password, saltRounds, async function (err, hash) {
                const user=new User({ name: name, emailId: emailId, password: hash, isPremiumUser:false})
                await user.save()
                res.json({ alreadyexisting: false })
                console.log(err);
            });
        } else {
            res.json({ alreadyexisting: true })
        }




    } catch (err) {
        console.log(err)

    }

}

exports.postLoginUser = async (req, res, next) => {
    // console.log(req.body);
    const emailId = req.body.emailid;
    const password = req.body.password;

    try {

        let user = await User.find({  emailId: emailId  })

        //console.log(user)
        if (user.length !== 0) {
            //let res2 = await User.findAll({ where: { password: password } })
            //console.log(res2.length)
            bcrypt.compare(password, user[0].password, function (err, result) {
                // result == true
                //console.log(user[0]._id);
                if (result == true) {
                    res.json({ success: true, token: generateAccessToken(user[0]._id) })
                } else {
                    res.json({ password: "incorrect" })
                }
            });

        } else {
            res.json({ success: false });
        }

    } catch (err) {
        console.log(err);
    }


}

exports.ForgotPassword = async (req, res, next) => {
    const email = req.body.email;


    try {
        const user = await User.findOne({ emailId:email } );
        if (user) {
            const id = uuid.v4();
            //console.log('---------------'+user.id);
            const forgot=new ForgotPassword({uuid:id,active:true,userId:user.id})
            forgot.save()
                .catch(err => {
                    console.log(err)
                })
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const msg = {
                to: email, // Change to your recipient
                from: 'fastfury15@gmail.com', // Change to your verified sender
                subject: 'Reset Password Link',
                text: 'Click on the link to reset your password',
                html: `<a href="http://localhost:3000/user/resetpassword/${id}">Reset password</a>`,
            }

            const response = await sgMail.send(msg);
            res.status(response[0].statusCode).json({ message: 'Link to reset password sent to your mail ', sucess: true })

        } else {
            throw new Error('User Does Not Exist');
        }



    } catch (error) {
        console.log(error)
    }

}

exports.resetPassword = async (req, res, next) => {
    const id =  req.params.id;
    const request = await ForgotPassword.findOne({uuid:id});
    //console.log(request);
    if(request){
        await ForgotPassword.findOneAndUpdate({ 'uuid': id }, { active: false });
        res.send(`<html>
                        <form action="/user/updatepassword/${id}" method="get">
                            <label for="newpassword">Enter New password</label>
                            <input name="newpassword" type="password" required></input>
                            <button>reset password</button>
                        </form>
                    </html>`)
    }
}

exports.updatePassword=async (req,res,next)=>{
    try {
        // console.log(req.query);
        // console.log(req.params);
        const newPassword=req.query.newpassword;
        const id=req.params.rid;
        let request=await ForgotPassword.find({uuid:id});
        //console.log(request);
        let user=await User.findOne({_id:request[0].userId})

        if (user) {
            bcrypt.hash(newPassword, saltRounds, async function (err, hash) {
                await User.findByIdAndUpdate(request[0].userId, { password: hash });
               //await User.update({password:hash},{where:{id:request[0].userId}})
               res.send(
                `<html>
                    <h1> Success </h1> 
                </html>`
            );
            });
        }else{
            return res.status(404).json({error:'No User Exist' ,success:false })
        }
        
    } catch (error) {
        console.log(error);
    }
}