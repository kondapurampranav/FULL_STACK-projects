async function show_data(){
    const userList = document.querySelector("#user-list")

    const name = document.querySelector(".col-name")
    const email = document.querySelector(".col-email")
    const role = document.querySelector(".role-badge role-user")

    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
    const data = await response.json()
    console.log(data)

    for(let i=0; i<data.length; i++){
        const infoBox = document.createElement("tr")
        userList.appendChild(infoBox)
        infoBox.classList.add("")
        const name = document.createElement("td")
        infoBox.appendChild(name)
        name.textContent = data.name
        name.classList
    }
}

show_data()


const submitForm = document.querySelector("#add-user-form")
submitForm.addEventListener("submit", submitInfo)

async function submitInfo(event){
    event.preventDefault()

    const name = document.querySelector("#new-name")
    const email = document.querySelector("#new-email")
    const role = document.querySelector("#new-role")

    const token = localStorage.getItem("token")

    if(!token){
        window.location.href = "login.html"
    }

    const response = await fetch("http://localhost:3000/adduser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            name: name.value,
            email: email.value,
            role: role.value
        })
    })
    const data = await response.json()
    console.log(data)

    document.querySelector("#add-user-form").reset();
}

const logOut = document.querySelector("#logout-btn")
logOut.addEventListener("click", loggingOut)

function loggingOut(){
    localStorage.removeItem("token")
    window.location.href = "login.html"
}



const showData = document.querySelector("#add-user-form")
showData.addEventListener("submit", show_Data)
