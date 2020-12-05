const accountName = document.getElementById('accountName')

const imgSide = document.getElementById('imgSide')
const textSide = document.getElementById('textSide')
const titleSide = document.getElementById('titleSide')

const modal = document.getElementById('modal')
const modal2 = document.getElementById('modal2')

const textInModal = document.getElementById('textInModal')
const yesBtn = document.getElementById('yesBtn')
const noBtn = document.getElementById('noBtn')

const yesEdit = document.getElementById('yesEdit')
const noEdit = document.getElementById('noEdit')

const editingDiv = document.getElementById('editingDiv')
const curImgSrc = document.getElementById('curImgSrc')
const curPostTitle = document.getElementById('curPostTitle')
const curPostDescr = document.getElementById('curPostDescr')

const editPost = document.getElementById('editPost')
const hideEdit = document.getElementById('hideEdit')

yesBtn.addEventListener('click', deletingPost)
noBtn.addEventListener('click', closeModal)
editPost.addEventListener('click', openModal2)

yesEdit.addEventListener('click', editingPost)
noEdit.addEventListener('click', closeModal2)
let postId = localStorage.getItem('postId')

// particular post author:
let postUserN = localStorage.getItem('userN')

// logino name or logged user 
let accName = localStorage.getItem('userName')

let key = localStorage.getItem("secret")

// user's name
let username = localStorage.getItem('userName')
accountName.innerText = `${username}`

let post 

getSinglepost()
function getSinglepost() {
    fetch(`http://167.99.138.67:1111/getsinglepost/${postUserN}/${postId}`)
    .then(response => response.json())
    .then(data => {
        // console.log(data.data)
        post = data.data
        showPost()
    }) 
}
function showPost() {

        titleSide.innerText = `${post.title}`

        let frame = document.createElement('div')
        frame.classList.add('singlePostFrame')

        let img = document.createElement('img')
        img.classList.add('singleImgSize')
        img.src = post.image

        let description = document.createElement('div')
        description.classList.add('singleDescr')
        description.innerText = post.description

        let username = document.createElement('div')
        username.classList.add('singleUser')
        username.innerText = ` Post created by ${post.username}`

        imgSide.appendChild(img)
        frame.appendChild(description)
        frame.appendChild(username)

        if (post.username === accName) {
            let deleteBtn = document.createElement('button')
            deleteBtn.innerText = "DELETE"
            deleteBtn.classList.add('singlePostBtn')
            deleteBtn.addEventListener('click', openModal)

            let editBtn = document.createElement('button')
            editBtn.innerText = "EDIT"
            editBtn.classList.add('singlePostBtn')
            editBtn.addEventListener('click', openEditPostTab)

            frame.appendChild(deleteBtn)
            frame.appendChild(editBtn)
        }
        textSide.appendChild(frame)
}

function openModal() {
    modal.style.display = 'block'
}
function closeModal() {
    modal.style.display = 'none'   
}
function openModal2() {
    modal2.style.display = 'block' 
}
function closeModal2() {
    modal2.style.display = 'none' 
    editingDiv.style.display = 'none' 
}
function deletingPost() {
    let deleteInfo = {
        secretKey: key,
        id: postId,
    }
    let options = {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(deleteInfo)
    }
    fetch('http://167.99.138.67:1111/deletepost', options)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            window.location.href = "index.html"
        })
}
function openEditPostTab(event) {
    // console.log(event)
    editingDiv.style.display = 'flex'    
    curImgSrc.value = event.path[3].children[0].children[0].currentSrc
    curPostTitle.value = event.path[4].children[0].innerText 
    curPostDescr.value = event.path[1].children[0].innerText
}
function editingPost() {
    let editInfo = {
        secretKey: key,
        id: postId,
        title: curPostTitle.value,
        image: curImgSrc.value,
        description: curPostDescr.value,
    }
    let options = {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(editInfo)
    }
    fetch('http://167.99.138.67:1111/updatepost', options)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (!data.success) {
                hideEdit.classList.add('hidden')
                hideEdit.innerText = `${data.message}!`
            } else {
                window.location.href = 'singlePost.html';
            }
        })
}

