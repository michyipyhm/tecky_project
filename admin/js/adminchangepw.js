function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.body.style.backgroundColor = "white";
}

window.onload = async () => {
    const usernameLabel = document.querySelector("#usernameLabel");

    await getAdminProfile();
    async function getAdminProfile() {
        const res = await fetch("/adminchangepw");
        const data = await res.json();

        if (res.ok) {
            const user = data.user;
            console.log(user)
            usernameLabel.innerHTML = user.admin_name;
            console.log("usernameLabel.innerHTML:[" + JSON.stringify(usernameLabel.innerHTML) + "]")
        }
    }
}


async function logout() {
    const res = await fetch("/logout", {
        method: "POST",
    });
    const data = await res.json();
    if (res.ok) {
        window.location.href = "/index.html";
    } else {
        alert(data.message);
    }
}

const addProductBtn = document.querySelector("#addProductBtn");
const logoutBtn = document.querySelector("#logoutBtn");
const orderRecordBtn = document.querySelector("#orderRecordBtn");
const shoppingCartBtn = document.querySelector("#shoppingCartBtn");

orderRecordBtn.addEventListener("click", (e) => {
    window.location.href = "/order.html";
});

logoutBtn.addEventListener("click", (e) => {
    logout()
})

shoppingCartBtn.addEventListener("click", (e) => {
    window.location.href = "http://localhost:8080/shoppingcart.html";
});

addProductBtn.addEventListener("click", (e) => {
    window.location.href = "./addproduct.html";
});

document.addEventListener('DOMContentLoaded', (e) => {
   const updatedBtn = document.querySelector("#updatedBtn");
    updatedBtn.addEventListener('click', async function (e) {
        e.preventDefault()

        let password = document.getElementById("newPasswordinput").value;
        console.log("password:[" + password + "]")
        let confirmPassword = document.getElementById("confirmPwinput").value;

        if (password === null || password === "" || confirmPassword === null || confirmPassword === "") {
            alert("New Password & Confirm Password can't empty");
            return;
        } else if (password !== confirmPassword) {
            alert("The New Password or Confirm Password is incorrect.");
            return;
        } else {

            console.log(JSON.stringify(password))
            const res = await fetch('/adminChangePw', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({password}),
            }
            )
            const data = await res.json()
            console.log("data:[" + JSON.stringify(data) + "]")
            if (res.ok) {
                alert("OK!!!")
                // window.location.href = "/admin.html";
            } else {
                alert(data.message, "Update Failed")
            }
        }
    })
});

