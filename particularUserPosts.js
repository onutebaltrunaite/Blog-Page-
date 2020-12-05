const allPostByUser = document.getElementById('allPostByUser')
const blogTitle = document.getElementById('blogTitle')
const accountName = document.getElementById('accountName')

let userNm = localStorage.getItem('userNm')

let username = localStorage.getItem('userName')
accountName.innerText = `${username}`

let posts

getAllPostsByUser()
function getAllPostsByUser() {
    fetch(`http://167.99.138.67:1111/getuserposts/${userNm}`)
    .then(response => response.json())
    .then(data => {
    console.log(data)
    posts = data.data
    showAllCards()
})
}

function showAllCards() {
    blogTitle.innerText = `All posts by ${userNm}`
        posts.map (item => {
            // console.log(item)
            allPostByUser.innerHTML += 
                `
                <div class="blogCard">
                <div><img id="cardImg" src="${item.image}" alt=""></div>
                <div>
                    <div class="d-flex mb-5">
                        <div class="fontStyle">${item.timestamp} /</div>
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

function openSinglePost(event) {
    let postId = event.target.id
    let userN = event.target.attributes.name.value

    localStorage.setItem("postId", postId)
    localStorage.setItem("userN", userN)

    window.location.href = "singlePost.html";
}
