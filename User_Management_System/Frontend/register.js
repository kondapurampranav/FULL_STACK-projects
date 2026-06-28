const registerForm = document.querySelector("#register-form")
registerForm.addEventListener("submit", newRegisterForm)

async function newRegisterForm(event){
    event.preventDefault()
    const name = document.querySelector("#name")
    const email = document.querySelector("#email")
    const password = document.querySelector("#password")

    const response = await fetch("http://localhost:3000/auth/register",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name.value,
            email: email.value,
            password: password.value
        })

    })
    const data = await response.json()
    console.log(data)

    if (response.ok) {
        alert(data.message)
        window.location.href = "login.html"
    }
    else{
        alert(data.error)
    }
}