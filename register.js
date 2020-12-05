const newUser = document.getElementById('newUser')
const NewUserPsw = document.getElementById('NewUserPsw')
const NewUserPswRpt = document.getElementById('NewUserPswRpt')
const registerBtn = document.getElementById('registerBtn')
const hiddenDiv = document.getElementById('hiddenDiv')


registerBtn.addEventListener('click', createNewAccount)

function createNewAccount() {
        let accountInfo = {
        name: newUser.value,
        passwordOne: NewUserPsw.value,
        passwordTwo: NewUserPswRpt.value,
    }
    let options = {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(accountInfo)
    }
    fetch('http://167.99.138.67:1111/createaccount', options)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.success) {
                hiddenDiv.style.color = 'green'
                hiddenDiv.innerText = `${data.message}!`  
                setTimeout(function(){window.location.href = "login.html";}, 3000)
            } else {
                hiddenDiv.innerText = `${data.message}!`
            } 
        })      
}

