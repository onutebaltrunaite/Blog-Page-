const accountName = document.getElementById('accountName')
const blogTitle = document.getElementById('blogTitle')

const blogCardContainer = document.getElementById('blogCardContainer')
const cardImg = document.getElementById('cardImg')
const cardUsername = document.getElementById('cardUsername')
const cardTitle = document.getElementById('cardTitle')
const cardDescription = document.getElementById('cardDescription')

const newfirst = document.getElementById('newfirst')
const oldfirst = document.getElementById('oldfirst')

newfirst.addEventListener('click', newPostsfirst)
oldfirst.addEventListener('click', oldPostsfirst)

// user's name
let username = localStorage.getItem('userName')
accountName.innerText = `${username}`

// GET POSTS
let allPosts = []

getAllPosts()
function getAllPosts() {
    fetch(`http://167.99.138.67:1111/getallposts`)
    .then(response => response.json())
    .then(data => {
        data.data.map(item => {
            allPosts.push(item)
        })
      showPosts(allPosts)  
    }) 
    // console.log(allPosts)   
}

//  SHOW ALL POSTS
function showPosts() {
    blogCardContainer.innerHTML = ''
    allPosts.map(item => {
        var date = new Date(item.timestamp);
        var fdate = date.getFullYear() + '/' + ("0" + (date.getMonth() + 1)).slice(-2) + '/' + ("0" + date.getDate()).slice(-2);
        blogCardContainer.innerHTML += 
            `
            <div class="blogCard">
            <div><img id="cardImg" src="${item.image}" alt=""></div>
            <div>
                <div class="d-flex mb-5">
                    <div class="fontStyle">${fdate} /</div>
                    <div id="cardUsername" class="fontStyle" onclick="getAllUserPosts(event)">${item.username}</div>
                </div>
                <div>
                    <div class="mb-5 fitMeIn" id="cardTitle">${item.title}</div>
                    <div class="mb-5 fitMeIn" id="cardDescription">${item.description}</div>
                </div>
                <div class="d-flex">
                    <div id="${item.id}" name="${item.username}" onclick="openSinglePost(event)" class="readMore d-flex f-start grow1 fontStyle">READ MORE</div>
                    <div class="d-flex f-end grow1 icons">
                        <i class="fab fa-facebook-f"></i>
                        <i class="fab fa-twitter"></i>
                        <i class="fab fa-pinterest"></i>
                    </div>
                </div>
            </div>
        </div>
            `
    })
}

function newPostsfirst() {
    allPosts.sort(function(x,y){
        return  y.timestamp - x.timestamp
    })
    showPosts()  
}

function oldPostsfirst() {
    allPosts.sort(function(x,y){
        return  x.timestamp - y.timestamp
    })
    showPosts()  
}

// OPEN SINGLE POST
function openSinglePost(event) {
    let postId = event.target.id
    let userN = event.target.attributes.name.value

    localStorage.setItem("postId", postId)
    localStorage.setItem("userN", userN)

    window.location.href = "singlePost.html";
}

// ALL POSTS BY ONE USER
function getAllUserPosts(event) {
    let userNm = event.target.innerHTML
    console.log(userNm)
    localStorage.setItem("userNm", userNm)
    window.location.href = "particularUserPosts.html";
}








