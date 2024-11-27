const apiUrl = "http://localhost:8083"; 
function navigateTo(page) {
    window.location.href = page;
}

async function signup() {
    const firstname = document.getElementById('signup-firstname').value;
    const lastname = document.getElementById('signup-lastname').value;
    const email = document.getElementById('signup-email').value;
    const phone = document.getElementById('signup-phone').value;
    const password = document.getElementById('signup-password').value;

    const response = await fetch(`${apiUrl}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstname, lastname, email, phone, password })
    });

    alert(response.ok ? 'Sign up successful!' : 'Sign up failed!');
    if (response.ok) navigateTo('index.html');
}

async function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    if (response.ok) {
        const data = await response.json();
        alert('Login successful! Token: ' + data.token);
        localStorage.setItem('token', data.token);
        navigateTo('index.html');
    } else {
        alert('Login failed!');
    }
}
