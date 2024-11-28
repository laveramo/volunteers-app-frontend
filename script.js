const SU_apiUrl = "http://localhost:8083/api";
const LI_apiUrl = "http://localhost:8084/api";
function navigateTo(page) {
    window.location.href = page;
}

async function signup() {
    const firstName = document.getElementById('signup-firstname').value;
    const lastName = document.getElementById('signup-lastname').value;
    const email = document.getElementById('signup-email').value;
    const phoneNumber = document.getElementById('signup-phone').value;
    const password = document.getElementById('signup-password').value;

    console.log(JSON.stringify({ firstName, lastName, email, phoneNumber, password }))

    const response = await fetch(`${SU_apiUrl}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, phoneNumber, password })
    });

    alert(response.ok ? 'Sign up successful!' : 'Sign up failed, try again later');
    if (response.ok) navigateTo('login.html');
}

async function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch(`${LI_apiUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    if (response.ok) {
        navigateTo('index.html');
    } else {
        alert('Login failed!');
    }
}
