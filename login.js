function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // Demo credentials
    if (username === "admin" && password === "1234") {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "index.html"; // expense tracker
    } else {
        document.getElementById("error").innerText =
            "Invalid username or password";
    }
}
