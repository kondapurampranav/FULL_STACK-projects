const loginForm = document.querySelector("#login-form")
loginForm.addEventListener("submit", loginInfo)

async function loginInfo(event){
    console.log("JS loaded")
    event.preventDefault()

    const email = document.querySelector("#email")
    const password = document.querySelector("#password")

    const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
    })
    const data = await response.json()
    console.log(data)

    const token = data.token
    console.log(token)

    if(response.ok){
        window.location.href = "dashboard.html"
    }
    else{
        alert(data.error)
    }

    localStorage.setItem("token", data.token)
}