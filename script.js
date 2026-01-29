//register-function
function register() {
    const username = document.getElementById('username').value
    const accountNumber = document.getElementById('accountNo').value
    const password = document.getElementById('password').value


    if (!username || !accountNumber || !password) {
        alert("Please all the Details📝👆")
        return
    }
    if (accountNumber in localStorage) {
        alert("Account Number already exists")
        return
    }
    const user = {
        uname: username,
        id: accountNumber,
        pass: password,
        bal: 0
    }
    localStorage.setItem(accountNumber, JSON.stringify(user))
    window.location.href = "./login.html"
}

//login-function
function loginBank() {
    const accountNo = document.getElementById("logaccountNo").value
    const password = document.getElementById("loginPass").value

    if (!accountNo || !password) {
        alert('Enter all the details')
        return
    }
    if (!(accountNo in localStorage)) {
        alert("Account number not found")
        return
    }
    const userObj = JSON.parse(localStorage.getItem(accountNo))//convert json to js object

    if (userObj.pass !== password) {
        alert("Incorrect password")
        return
    }

    // alert("login successful")
    localStorage.setItem("loggedUser", accountNo)
    window.location.href = "./home.html"
}

//function-logout
function logOut() {
    localStorage.removeItem("loggedUser")
    window.location.href = "./login.html"
}


//function-deposit
function deposit() { 
const loggedUserAcno = localStorage.getItem("loggedUser")//to know about the which user logged
 const user = JSON.parse(localStorage.getItem(loggedUserAcno))//get element from loggeduser 

 let depositAmount = document.getElementById("depositAmount").value.trim()//value from deposit input field 
 if (!depositAmount) {//checking input filled or not 
 alert("fill the blank")
  return
 } 
 //assigning balance from user to a variable "balance" 
 depositAmount = Number(depositAmount)// converting to number datatype- of value from deposit inputfield(string) 

 user.bal += depositAmount//updating balance by adding balance+depositamount 



 localStorage.setItem(loggedUserAcno, JSON.stringify(user))//storing userobject to loggedUser
htmlData = `
<p>$${user.bal}</p>` 
  
  balAmount.innerHTML = htmlData
   document.getElementById("depositAmount").value = ""
 }

//function-Withdraw

function withdraw() {
  const acno = localStorage.getItem("loggedUser");
  if (!acno) {
    alert("Please login first");
    return;
  }

  const user = JSON.parse(localStorage.getItem(acno));
  let amount = Number(document.getElementById("withdrawAmount").value.trim());

  if (!amount || amount <= 0) {
    alert("Enter valid amount");
    return;
  }

  if (user.bal < amount) {
    alert("Insufficient balance");
    return;
  }

  user.bal -= amount;
  localStorage.setItem(acno, JSON.stringify(user));

  balAmount.innerHTML = `<p>$ ${user.bal}</p>`;
  document.getElementById("withdrawAmount").value = "";
}

