const url="http://localhost:3000";



async function  signup(event){
    event.preventDefault();
    const name=event.target.name.value
    const emailid=event.target.emailid.value
    const password=event.target.password.value

    const signupObj={
        name:name,emailid:emailid,password:password
    }
    try {
        let res=await axios.post(`${url}/user/signup`,signupObj);
        if(res.data.alreadyexisting==true){
            //console.log(res.data)
            window.alert("User Already Registered");
        }else{
            window.alert("User Registered")
        }
        window.location.href='../views/login.html'
    } catch (err) {
        console.log(err)
    }
}

async function login(event){
    event.preventDefault();
    const emailid=event.target.emailid.value
    const password=event.target.password.value
    loginObj={
        emailid:emailid,
        password:password

    }

    try {
        let res=await axios.post(`${url}/user/login`,loginObj);
        // console.log(res.data)
        if (res.data.success==true){
            window.localStorage.setItem('token',res.data.token)
            console.log(res)

            window.location.href='../views/index.html'
        }else if(res.data.password=="incorrect"){
            window.alert("Password is Incorrect")

        }else{
            window.alert("User Not Registered")
        } 
        
    } catch (err) {
        console.log(err)
    }
}

async function forgotpassword(event){
    event.preventDefault();
    const email=event.target.emailid.value;
    const details={email:email}
    try {
        let response=await axios.post(`${url}/user/forgotpassword`,details);
        console.log(response);
    } catch (error) {
        console.log(error)
    }
   
}