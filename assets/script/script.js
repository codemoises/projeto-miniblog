const secrets = {
    url: "http://localhost:3000",
    auth: "YWRtaW46c2VjcmV0"
}
const components = {
    publication: (user, post) => `
    <div class="publication-area main-content">
    <div class="p-all">
        <div class="user-perfil">
            <img src="${user.picture ?? '../assets/image/icons/icon-perfil-2.svg'}" width="40px" height="40px" alt="icone de perfil">
        </div>
        <div class="grid-2">
            <div class="information-user">
                <div class="user-content">
                    <div class="username">
                        <p onclick="openProfile('${post.ownerId}')">${post.ownerId}</p>
                    </div>
                </div>
                <div class="dropdown">
                    <div class="img-options">
                        <img src="../assets/image/icons/icon-option.svg" alt="Icone opções">
                    </div>
                    
                    
                    <div class="dropdown-content">
                      <a href="#" onclick="reportPublication('${post._id.toString()}')"><img src="../assets/image/icons/flag.svg" alt="Icone flag"> Denunciar publicação</a>
                      <a href="#" onclick="deletePublication('${post.ownerId}', '${post._id.toString()}')"><img src="../assets/image/icons/deletar.svg" alt="Icone deletar"> Excluir publicação</a>
                    </div>
                  </div>
            </div>
            <div class="p-txt">
                <p>${post.content}</p>
            </div>
        </div>
    </div>
    <div class="icf-container">
        <div class="icf-img">
            <div class="icon-c" onclick="openCommentScreen('${post._id.toString()}')">
                <div class="img-m"><img src="../assets/image/icons/icon-comment.svg" alt=""></div>
                <div class="value">
                    <p>${post.comments.length}</p>
                </div>
            </div>
            <div class="icon-c" onclick="share('${post._id.toString()}')">
                <div class="img-m"><img src="../assets/image/icons/icon-share.svg" alt=""></div>
                <div class="value">
                    <p>${post.shares.length}</p>
                </div>
            </div>
            <div class="icon-c" onclick="reactToPublication('${post._id.toString()}')">
                <div class="img-m"><img src="../assets/image/icons/icon-like.svg" alt=""></div>
                <div class="value">
                    <p>${post.likes.length}</p>
                </div>
            </div>
        </div>
    </div>
</div>`
}

function login(username, password) {
    fetch(`${secrets.url}/users/${username}`, {headers: {"Authorization": `Basic ${secrets.auth}`}})
    .then(response => {
        return response.json();
    })
    .then(data => {
        if(data == null){
            window.alert("Usuário não encontrado, tente novamente");
            return;
        }
        if (data.password == password){
            sessionStorage.setItem('userId', username);
            sessionStorage.setItem('userDBId', data._id.toString());
            window.location.href = '../pages/feedScreen.html';
        }
        else
            window.alert('Informação inválida, tente novamente!');
    })
}

function signUp(name, id, password){
    fetch(`${secrets.url}/users/create`, {method: "POST", body: JSON.stringify({
        id: id,
        name: name,
        password: password
    }), headers: { "Content-type": "application/json; charset=UTF-8", "Authorization": `Basic ${secrets.auth}`}})
    .then(response => {
        if(response.ok)
            return response.json()
        window.alert('Não foi possível criar a conta, este @ já está sendo utilizado')
        throw new Error();
    })
    .then(data => {
        sessionStorage.setItem('userId', id);
        window.location.href = '../pages/feedScreen.html';
    })
}
function resetPassword(username, newPassword){
    fetch(`http:localhost:3000/users/update/${username}`, {method: "POST", body: JSON.stringify({password: newPassword}), headers: { "Content-type": "application/json; charset=UTF-8", "Authorization": `Basic ${secrets.auth}`}})
    .then(response => response.json())
    .then(data => {
        if(data.modifiedCount == 1){
            window.alert("Senha atualizada com sucesso!")
            window.location.href = '../pages/login.html';
        }
    });
}

function editProfile(name, bio){
    let postBody = {};
    if(name)
        postBody.name = name;
    if(bio)
        postBody.description = bio;

    fetch(`http:localhost:3000/users/update/${sessionStorage.getItem('userId')}`, {method: "POST", body: JSON.stringify(postBody), headers: { "Content-type": "application/json; charset=UTF-8", "Authorization": `Basic ${secrets.auth}`}})
    .then(response => response.json())
    .then(data => {
        if(data.modifiedCount == 1){
            window.alert("Informações atualizadas com sucesso!")
            window.location.href = '../pages/userProfileScreen.html';
        }
    });
}

function createPublication(content){
    if (!content)
        return;
    fetch(`${secrets.url}/posts/create`, {method: "POST", body: JSON.stringify({
        ownerId: sessionStorage.getItem('userId'),
        content: content,
        isReply: false
    }), headers: { "Content-type": "application/json; charset=UTF-8", "Authorization": `Basic ${secrets.auth}`}})
    .then(response => response.json())
    .then(data => {
        window.location.href = '../pages/feedScreen.html';
    })
}

function deletePublication(ownerId, id){
    if(ownerId != sessionStorage.getItem('userId'))
        return;
    fetch(`${secrets.url}/posts/delete/${id}`, {method: "POST", headers: { "Content-type": "application/json; charset=UTF-8", "Authorization": `Basic ${secrets.auth}`}})
    .then(response => response.json())
    .then(data => {
        window.location.href = '../pages/feedScreen.html';
    })
}

function reportPublication(id){
    fetch(`${secrets.url}/posts/report/${id}`, {method: "POST", body: JSON.stringify({userId: sessionStorage.getItem('userId')}), headers: { "Content-type": "application/json; charset=UTF-8", "Authorization": `Basic ${secrets.auth}`}});
}

function getUser(userId){
    return fetch(`${secrets.url}/users/${userId}`, {headers: {"Authorization": `Basic ${secrets.auth}`}})
    .then(response => response.json())
}

function setEditProfileInformation(){
    getUser(sessionStorage.getItem('userId')).then(user => {
        document.getElementById('name').value = user['name'];
        document.getElementById('bio').value = user['description'] ?? "";
    });
}

function setUserProfileScreenInformation(){
    getUser(sessionStorage.getItem('userId')).then(user => {
        document.getElementById('name').innerHTML = user['name'];
        document.getElementById('id').innerHTML = user['id'];
        document.getElementById('description').innerHTML = user['description'] ?? "";
        document.getElementById('picture').src = user['picture'] ?? "../assets/image/icons/icon-perfil-2.svg";
        document.getElementById('followersCount').innerHTML = user.followers.length;

        fetch(`${secrets.url}/posts/list/${sessionStorage.getItem('userId')}`, {headers: {"Authorization": `Basic ${secrets.auth}`}})
        .then(response => response.json())
        .then(data => {
            document.getElementById('publicationsCount').innerHTML = data.length;
            data.forEach(post => {
                document.getElementById('publications').innerHTML += "\n" + components.publication(user, post);
            });
        })
    });
}

function setProfileScreenInformation(){
    getUser(localStorage.getItem('profileId')).then(user => {
        document.getElementById('name').innerHTML = user['name'];
        document.getElementById('id').innerHTML = user['id'];
        document.getElementById('description').innerHTML = user['description'] ?? "";
        document.getElementById('picture').src = user['picture'] ?? "../assets/image/icons/icon-perfil-2.svg";
        document.getElementById('followersCount').innerHTML = user.followers.length;
        document.getElementById('follow-button').value = user.followers.includes(sessionStorage.getItem('userDBId')) ? "Seguindo" : "Seguir";

        fetch(`${secrets.url}/posts/list/${localStorage.getItem('profileId')}`, {headers: {"Authorization": `Basic ${secrets.auth}`}})
        .then(response => response.json())
        .then(data => {
            document.getElementById('publicationsCount').innerHTML = data.length;
            data.forEach(post => {
                document.getElementById('publications').innerHTML += "\n" + components.publication(user, post);
            });
        })
    });
}

function setFeedScreenInformation(){
    fetch(`${secrets.url}/posts`, {headers: {"Authorization": `Basic ${secrets.auth}`}})
    .then(response => response.json())
    .then(data => {
        data.forEach(post => {
            getUser(post.ownerId).then(user =>{
                document.getElementById('publications').innerHTML += "\n" + components.publication(user, post);
            })
        });
    })
}

function setCommentScreenInformation(){
    fetch(`${secrets.url}/posts/${localStorage.getItem('commentPostId')}`, {headers: {"Authorization": `Basic ${secrets.auth}`}})
    .then(response => response.json())
    .then(data => {
        data.comments.forEach(comment => {
            fetch(`${secrets.url}/posts/${comment}`, {headers: {"Authorization": `Basic ${secrets.auth}`}})
            .then(response => response.json())
            .then(post => {
                fetch(`${secrets.url}/users/${post.ownerId}`, {headers: {"Authorization": `Basic ${secrets.auth}`}})
                .then(response => response.json())
                .then(user => {
                    document.getElementById('comments').innerHTML += "\n" + components.publication(user, post);
                })
            })
        });
    })
}

function comment(content){
    if (!content)
        return;
    fetch(`${secrets.url}/posts/create`, {method: "POST", body: JSON.stringify({
        ownerId: sessionStorage.getItem('userId'),
        content: content,
        isReply: true
    }), headers: { "Content-type": "application/json; charset=UTF-8", "Authorization": `Basic ${secrets.auth}`}}) 
    .then(response => response.json())
    .then(data => {
        fetch(`${secrets.url}/posts/comment/${localStorage.getItem('commentPostId')}`, {method: "POST", body: JSON.stringify({
            postId: data._id
        }), headers: { "Content-type": "application/json; charset=UTF-8", "Authorization": `Basic ${secrets.auth}`}})
        .then(response => response.json())
        .then(data => {
            if(data.modifiedCount == 1)
            window.location.href = '../pages/commentScreen.html';
        })
    })
}

function reactToPublication(id){
    fetch(`${secrets.url}/posts/${id}`, {headers: {"Authorization": `Basic ${secrets.auth}`}})
    .then(response => response.json())
    .then(data => {
        if(!data.likes.includes(sessionStorage.getItem('userDBId')))
            likePublication(id);
        else
            unlikePublication(id);
        
        window.location.href = '../pages/feedScreen.html';
    })
}
function likePublication(id){
    fetch(`${secrets.url}/posts/like/${id}`, {method: "POST", body: JSON.stringify({userId: sessionStorage.getItem('userId')}), headers: { "Content-type": "application/json; charset=UTF-8", "Authorization": `Basic ${secrets.auth}`}})
}

function unlikePublication(id){
    fetch(`${secrets.url}/posts/unlike/${id}`, {method: "POST", body: JSON.stringify({userId: sessionStorage.getItem('userId')}), headers: { "Content-type": "application/json; charset=UTF-8", "Authorization": `Basic ${secrets.auth}`}})
}


function share(id){
    fetch(`${secrets.url}/posts/share/${id}`, {method: "POST", body: JSON.stringify({userId: sessionStorage.getItem('userId')}), headers: { "Content-type": "application/json; charset=UTF-8", "Authorization": `Basic ${secrets.auth}`}})
    window.location.href = '../pages/feedScreen.html';
}

function follow(){
    const alreadyFollowing = document.getElementById('follow-button').value != "Seguir";
    if(!alreadyFollowing){
        fetch(`http:localhost:3000/users/follow/${localStorage.getItem('profileId')}`, {method: "POST", body: JSON.stringify({followerId: sessionStorage.getItem("userId")}), headers: { "Content-type": "application/json; charset=UTF-8", "Authorization": `Basic ${secrets.auth}`}})
        .then(response => response.json())
        .then(data => {
            if(data.modifiedCount == 1){
                document.getElementById('follow-button').value = "Seguindo";
                let followersCount = document.getElementById('followersCount');
                followersCount.innerText = Number.parseInt(followersCount.innerText) + 1;
            }
        });
    }
    else{
        fetch(`http:localhost:3000/users/unfollow/${localStorage.getItem('profileId')}`, {method: "POST", body: JSON.stringify({followerId: sessionStorage.getItem("userId")}), headers: { "Content-type": "application/json; charset=UTF-8", "Authorization": `Basic ${secrets.auth}`}})
        .then(response => response.json())
        .then(data => {
            if(data.modifiedCount == 1){
                document.getElementById('follow-button').value = "Seguir";
                let followersCount = document.getElementById('followersCount');
                followersCount.innerText = Number.parseInt(followersCount.innerText) - 1;
            }
        });
    }
}

function openCommentScreen(postId){
    localStorage.setItem('commentPostId', postId);
    window.location.href = '../pages/commentScreen.html';
}

function openProfile(id){
    localStorage.setItem('profileId', id);
    window.location.href = '../pages/profileScreen.html';
}