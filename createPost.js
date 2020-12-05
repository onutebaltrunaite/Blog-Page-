const accountName = document.getElementById('accountName')
const imgSrc = document.getElementById('imgSrc')
const newPostTitle = document.getElementById('newPostTitle')
const newPostDescr = document.getElementById('newPostDescr')
const submitPost = document.getElementById('submitPost')
const hide = document.getElementById('hide')
const newPostsDiv = document.getElementById('newPostsDiv')

submitPost.addEventListener('click', createNewPost)


let username = localStorage.getItem('userName')
accountName.innerText = `${username}`

let key = localStorage.getItem("secret")
function createNewPost() {
    console.log(key)
    console.log(newPostDescr.value)

    let postInfo = {
        secretKey: key,
        title: newPostTitle.value,
        image: imgSrc.value,
        description: newPostDescr.value,
    }
    let options = {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(postInfo)
    }
    fetch('http://167.99.138.67:1111/createpost', options)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (!data.success) {
                hide.classList.add('hidden')
                hide.innerText = `${data.message}!`
            } else {
                window.location.href = "index.html"
            }
        })
}

