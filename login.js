const LI_apiUrl = "http://localhost:8084/api";

async function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch(`${LI_apiUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    if (response.ok) {
        const user = await response.json();
        sessionStorage.setItem('userId', user.id);
        sessionStorage.setItem('userName', user.name);
        console.log("user logged in: ")
        console.log(user.id + user.name)
        window.location.href = 'home.html';
    } else {
        alert('Login failed!');
    }
}