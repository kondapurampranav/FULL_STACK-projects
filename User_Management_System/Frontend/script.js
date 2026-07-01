let selectedUserId = null;


async function show_data(){
    const userList = document.querySelector("#user-list")
    userList.innerHTML = ""
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

    const users = data.data;

for (let i = 0; i < users.length; i++) {

    const infoBox = document.createElement("tr");
    userList.appendChild(infoBox);

    // ID

    const id = document.createElement("td");
    id.textContent = users[i].id;
    infoBox.appendChild(id);

    // Name

    const name = document.createElement("td");
    name.textContent = users[i].name;
    name.classList.add("col-name");
    infoBox.appendChild(name);

    // Email
    const email = document.createElement("td");
    email.textContent = users[i].email;
    email.classList.add("col-email");
    infoBox.appendChild(email);

    // Role

    const role = document.createElement("td");
    role.textContent = users[i].role;
    role.classList.add("role-badge");
    infoBox.appendChild(role);

    // Created At

    const created_at = document.createElement("td");
    created_at.textContent = users[i].created_at;
    infoBox.appendChild(created_at);

    // Action Column

    const action = document.createElement("td");
    infoBox.appendChild(action);

    // Delete Button

    const editBtn = document.createElement("a");
    editBtn.textContent = "Edit";
    editBtn.href = "#edit-modal";
    editBtn.classList.add("btn", "btn-ghost", "btn-sm");
    action.appendChild(editBtn)
    editBtn.addEventListener("click", () => {
    selectedUserId = users[i].id;
    document.querySelector("#edit-name").value = users[i].name;
    document.querySelector("#edit-email").value = users[i].email;
    document.querySelector("#edit-role").value = users[i].role;
});


    const deleteBtn = document.createElement("a");
    deleteBtn.textContent = "Delete";
    deleteBtn.href = "#delete-modal";
    deleteBtn.classList.add("btn", "btn-confirm-delete");
    action.appendChild(deleteBtn)
    deleteBtn.addEventListener("click", () => {
    selectedUserId = users[i].id;
    document.querySelector("#delete-user-name").textContent = users[i].name;
    });
    }
}
show_data()

const confirmDeleteBtn = document.querySelector("#confirm-delete-btn");
confirmDeleteBtn.addEventListener("click", deleteModal);

async function deleteModal() {
    const token = localStorage.getItem("token");
    const response = await fetch(
        `http://localhost:3000/deleteUser/${selectedUserId}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    const data = await response.json();
    console.log(data);
    show_data();
    window.location.hash = "";

}

const editForm = document.querySelector("#edit-user-form");
editForm.addEventListener("submit", updateUser);


async function updateUser(event){
    event.preventDefault();
    const name =
    document.querySelector("#edit-name");
    const email =
    document.querySelector("#edit-email");
    const role =
    document.querySelector("#edit-role");
    const token =
    localStorage.getItem("token");
    const response = await fetch(
        `http://localhost:3000/updateUser/${selectedUserId}`,
        {
            method: "PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body: JSON.stringify({
                name: name.value,
                email: email.value,
                role: role.value
            })
      }
    );
    const data = await response.json();
    console.log(data);
    show_data();
    window.location.href = ""
}
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
    
    show_data();
}

const logOut = document.querySelector("#logout-btn")
logOut.addEventListener("click", loggingOut)

function loggingOut(){
    localStorage.removeItem("token")
    window.location.href = "login.html"
}