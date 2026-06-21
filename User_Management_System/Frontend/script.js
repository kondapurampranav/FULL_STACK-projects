
let info;
fetch("http://localhost:3000/users")
    .then(response => response.json())
    .then(data => {
        info = data,
        console.log(data)

        const dataBox = document.querySelector("#user-list")
    
    for(let i=0; i<info.length; i++){

        const box = document.createElement("div")
        box.classList.add("user-card")

        const name = document.createElement("p")
        name.classList.add("col--name")

        const email = document.createElement("p")
        email.classList.add("col--email")

        const role = document.createElement("p")
        if(info[i].role === "Admin"){
            role.classList.add("role-badge--admin")
        }
        else if(info[i].role === "Editor"){
            role.classList.add("role-badge--editor")
        }
        else{
            role.classList.add("role-badge--viewer")
        }
        
        const del = document.createElement("button")
        del.classList.add("btn--delete")

        const edit = document.createElement("button")
        edit.classList.add("btn--edit")

        name.textContent = info[i].name
        email.textContent = info[i].email
        role.textContent = info[i].role
        edit.textContent = "Edit"
        del.textContent = "Delete"

        box.append(name, email, role, edit, del)

        dataBox.appendChild(box)
    }
    })

    
const addbtn = document.querySelector("#add-user-btn")
addbtn.addEventListener("click", sendInput)
    
async function sendInput() {
    const input_fullname = document.querySelector("#user-name-input")
    const input_email = document.querySelector("#user-email-input")
    const input_role = document.querySelector("#user-role-select")

    fetch("http://localhost:3000/adduser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: input_fullname.value,
            email: input_email.value,
            role: input_role.value
        })
    })
    .then(response => response.json())
    .then(data => console.log(data))
}




