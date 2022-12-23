const url="http://localhost:3000";
window.addEventListener('DOMContentLoaded',()=>{
    getleaderboard();
})


async function getleaderboard(){
   let response=await axios.get(`${url}/purchase/getLeaderboard`)
   var no=1;//console.log(response);
   for (var i=0;i<response.data.length;i++){
    
    showUser(response.data[i],no);
    no++;
   }
   //console.log(response);
}

function showUser(data,no){
    
    const parentNode=document.getElementById("user_list");
    const childHTML=`<ul class="user-heading-list">
                        
                        <li class="user-heading-item">${no}.  ${data.name}</li>
                        <li class="user-heading-item"><button id=${data._id} onClick=showExpense("${data._id}") class="expense">Check Expense</button></li>
                        
                    </ul>`;

    parentNode.innerHTML=parentNode.innerHTML+childHTML;
}

async function showExpense (id){
    const obj={
        id:id
    }

    let response=await axios.post(`${url}/purchase/expense`,obj)
    //console.log(response);
    const parentNode=document.getElementById("main-expense");
    parentNode.innerHTML='';
    for(let i=0;i<response.data.length;i++){
        const childHTML=`<div class="expense-list">
                            <li class="expense-item">${response.data[i].expenseAmount}</li>
                            <li class="expense-item">${response.data[i].description}</li>
                            <li class="expense-item">${response.data[i].category}</li>
                        </div>`
        parentNode.innerHTML=parentNode.innerHTML+childHTML;
    }
    
    
    const open = document.getElementById(id);
    const close = document.getElementById("close");
    const container = document.getElementById("container");

    open.addEventListener("click", () => {
        container.classList.add("active");
    });

    close.addEventListener("click", () => {
        container.classList.remove("active");
    });
}
