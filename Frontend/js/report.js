const token=localStorage.getItem('token');

const parentNode=document.getElementById("report-expenses");

const tparentNode=document.getElementById("report-total");

const url="http://localhost:3000";
var number;
window.addEventListener('DOMContentLoaded', ()=>{
    let page=1;
    number =10;
    getExpense(page,number);

})


document.getElementById("no-of-items").onchange=()=>{
     number=document.getElementById("no-of-items").value;
     let page=1;
     parentNode.innerHTML='';
     tparentNode.innerHTML='';
     getExpense(page,number);

}


async function getExpense(page,number){
    //
    try {
        const response= await axios.get(`${url}/purchase/all-expense/${number}?page=${page}`,{headers:{'Authorization':token}});
        //console.log(response.data);
        var totalAmount=0;
        for (var i = 0; i < response.data.val.length; i++) {
            //console.log("1");
            //console.log(response.data);
            totalAmount=totalAmount+response.data.val[i].expenseAmount;
            showExpense(response.data.val[i])
            
        }
        showPagination(response.data.currentPage,response.data.hasNextPage,response.data.hasPreviousPage,response.data.lastPage,response.data.nextPage,response.data.previousPage)
        showtotal(totalAmount);
       
    } catch (err) {
        console.log(err)
    }
}
function showExpense(data){
    //console.log(data);
    const arr=data.createdAt.split('T');
    // console.log(data.createdAt);
    // console.log(arr);
   
    var childHTML=`<ul class="list-heading" id=${data._id}>
                        <li class="expense-item">${arr[0]}</li>
                        <li class="expense-item">${data.description}</li>
                        <li class="expense-item">${data.category}</li>
                        <li class="expense-item">${data.expenseAmount}</li>    
                    </ul>`;

    parentNode.innerHTML=parentNode.innerHTML+childHTML;

}

function showtotal(total){
   
    var childHTML=`<h2>Total Expense : ${total}</h2>`;

    tparentNode.innerHTML=tparentNode.innerHTML+childHTML;
}


function showPagination(currentPage,hasNextPage,hasPreviousPage,lastPage,nextPage,previousPage){
    pagination.innerHTML='';

    if(hasPreviousPage){
        const button2 = document.createElement('button');
        button2.classList.add('active');
        button2.innerHTML = previousPage;
        button2.addEventListener('click', ()=>getExpense(previousPage,number));
        pagination.appendChild(button2);

    }



    const button1 = document.createElement('button');
    button1.classList.add('active');
    button1.innerHTML = `<h3>${currentPage}<h3>`;
    
    button1.addEventListener('click', ()=>getExpense(currentPage,number))
    pagination.appendChild(button1);

    if(hasNextPage){
        const button3 = document.createElement('button');
        button3.classList.add('active');
        button3.innerHTML = nextPage;
        button3.addEventListener('click',()=>getExpense(nextPage,number))
        pagination.appendChild(button3);
    }
  
}
