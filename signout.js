let UserCreds = JSON.parse(sessionStorage.getItem("user-creds"));
let UserInfo = JSON.parse(sessionStorage.getItem("user-info"));

let GreetHead = document.getElementById('greet');
let SignoutBtn = document.getElementById('signoutbutton');



function Signout(){
    sessionStorage.removeItem("user-creds");
    sessionStorage.removeItem("user-info");
    window.location.href = 'index.html'
}

function CheckCred(){
    if (!sessionStorage.getItem("user-creds"))
    window.location.href = 'index.html'

    else{
        GreetHead.innerText = 'SmileChart User: ' + `${UserInfo.firstname}` + " " + `${UserInfo.lastname}`;
    }
}

window.addEventListener('load',CheckCred);
SignoutBtn.addEventListener('click', Signout);
