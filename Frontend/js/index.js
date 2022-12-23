const token=localStorage.getItem('token');

const url="http://localhost:3000";


const pagination=document.getElementById("pagination");

const parentNode = document.getElementById("allExpenses");

window.addEventListener('DOMContentLoaded', () => {
    let page=1;
   getExpense(page);
})

async function getExpense(page){
    try {
        const response=await axios.get(`${url}/expense?page=${page}`,{headers:{'Authorization':token}});
        //console.log(response);
        parentNode.innerHTML="";
        for (var i = 0; i < response.data.val.length; i++) {
            
            showNewReponseOnScreen(response.data.val[i]);
            
        }
        showPagination(response.data.currentPage,response.data.hasNextPage,response.data.hasPreviousPage,response.data.lastPage,response.data.nextPage,response.data.previousPage)
        //console.log(response.data);
        if(response.data.isPremiumUser==true){
            
            document.getElementById("razorpay-btn").style.display='none';
        }else{
            
            // button();
        }
    } catch (err) {
        console.log(err);
    }
}

async function saveToBackend(event) {
    event.preventDefault();
    //const token=localStorage.getItem('token');
    //console.log(token)
    const amount = event.target.expenseamt.value;
    const description = event.target.description.value;
    const category = event.target.category.value;

    const obj = {
        amount: amount,
        description: description,
        category: category
    }

    try {
        let response = await axios.post(`${url}/expense/add-expense`, obj,{headers:{'Authorization':token}});
        //console.log(response)
        showNewReponseOnScreen(response.data);

    } catch (error) {
        console.log(error)
    }
}

function showNewReponseOnScreen(response) {
    document.getElementById('amt').value = '';
    document.getElementById('des').value = '';
    document.getElementById("cat").value = " ";

    

    const childHTML = `<li id=${response._id} class="list">${response.expenseAmount}--${response.description}--${response.category}
                    <button onClick=deleteUser("${response._id}") class="bttd">Delete</button>
                    <button onClick=editUser("${response._id}","${response.expenseAmount}","${response.description}","${response.category}") class="btte">Edit</button>
                    </li>`


    parentNode.innerHTML = parentNode.innerHTML + childHTML;

}

function editUser(responseId) {

    const yurl = `${url}/expense/edit-expense/` + responseId;
    axios.get(yurl)
        .then((res) => {
            // console.log(res);
            document.getElementById('amt').value = res.data.expenseAmount;
            document.getElementById('des').value = res.data.description;
            document.getElementById("cat").value = res.data.category;
            deleteUser(responseId);
        }

        )
        .catch(err => console.log(err))

    // deleteUser(responseId);
}

async function deleteUser(responseId) {
    try {
        
        //console.log(responseId)

        const yurl = `${url}/expense/delete-expense/` + responseId;
        await axios.post(yurl);

        removeUserFromScreen(responseId);


    } catch (error) {
        console.log(error);
    }


}

function removeUserFromScreen(responseId) {

    //const parentNode = document.getElementById("allExpenses");

    const childNodeToBeDeleted = document.getElementById(responseId);

    if (childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }

}

function button(){
    document.getElementById("dark-mode").style.display='none';
    document.getElementById("leader-board").style.display='none';
    document.getElementById("gen-report").style.display='none';
}

function showPagination(currentPage,hasNextPage,hasPreviousPage,lastPage,nextPage,previousPage){
    pagination.innerHTML='';

    if(hasPreviousPage){
        const button2 = document.createElement('button');
        button2.classList.add('active');
        button2.innerHTML = previousPage;
        button2.addEventListener('click', ()=>getExpense(previousPage));
        pagination.appendChild(button2);

    }



    const button1 = document.createElement('button');
    button1.classList.add('active');
    button1.innerHTML = `<h3>${currentPage}<h3>`;
    
    button1.addEventListener('click', ()=>getExpense(currentPage))
    pagination.appendChild(button1);

    if(hasNextPage){
        const button3 = document.createElement('button');
        button3.classList.add('active');
        button3.innerHTML = nextPage;
        button3.addEventListener('click',()=>getExpense(nextPage))
        pagination.appendChild(button3);
    }
  
}


document.getElementById("razorpay-btn").onclick = async function (e) {
    const response  = await axios.get(`${url}/purchase/premiumMembership`, { headers: {"Authorization" : token} });
    console.log(response);
    var options =
    {
     "key": response.data.key_id, 
     "name": "Test Company",
     "order_id": response.data.order.id, 
     "prefill": {
       "name": "Test User",
       "email": "test.user@example.com",
       "contact": "8108778886"
     },
     "theme": {
      "color": "#3399cc"
     },
   
     "handler": function (response) {
         console.log(response);
         axios.post(`${url}/purchase/transactionstatus`,{
             order_id: options.order_id,
             payment_id: response.razorpay_payment_id,
         }, { headers: {"Authorization" : token} }).then(() => {
             alert('You are a Premium User Now')
             window.location.href='../views/index.html';
         }).catch((err) => {
            console.log(err);
             alert('Something went wrong. Try Again!!!')
         })
     },
  };
  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();

  rzp1.on('payment.failed', function (response){
  alert(response.error.code);
  alert(response.error.description);
  alert(response.error.source);
  alert(response.error.step);
  alert(response.error.reason);
  alert(response.error.metadata.order_id);
  alert(response.error.metadata.payment_id);
 });
}


document.getElementById("logout").onclick= ()=>{
    window.location.href='../views/login.html'
    localStorage.removeItem('token');
}

document.getElementById("leader-board").onclick=()=>{
    window.location.href='../views/leaderboard.html'
}

document.getElementById("gen-report").onclick=()=>{
    window.location.href='../views/report.html'
}

document.getElementById("dark-mode").onclick=()=>{
    document.body.classList.toggle("dark");
}