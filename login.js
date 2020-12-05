const cancelBtn = document.getElementById('cancelBtn')
const logName = document.getElementById('logName')
const logPsw = document.getElementById('logPsw')
const logBtn = document.getElementById('logBtn')
const logHiddendiv = document.getElementById('logHiddendiv')

localStorage.setItem("logNameV", logName.value)
localStorage.setItem("logPswV", logPsw.value)

cancelBtn.addEventListener('click', closeIt)
logBtn.addEventListener('click', loggingIn)

function closeIt() {
    window.location.href = "index.html";
}

function loggingIn() {
    let info = {
        name: logName.value,
        password: logPsw.value,   
    }
    let options = {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(info)
    }
    fetch('http://167.99.138.67:1111/login', options)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.success) {
                logHiddendiv.style.color = 'green'
                logHiddendiv.innerText = `${data.message}!`  
                setTimeout(function(){window.location.href = "index.html";}, 2000)
                localStorage.setItem('secret', data.secretKey)
                localStorage.setItem('userName', logName.value) 
            } else {
                logHiddendiv.innerText = `${data.message}!`
            }
        })
}
