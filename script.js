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
        navigateTo('home.html');
    } else {
        alert('Login failed!');
    }
}

const LHR_apiUrl = "http://localhost:8085/api"; // Cambia este URL según tu servicio.

async function loadHelpRequests() {
    const response = await fetch(`${LHR_apiUrl}/list-help-requests/all`);
    if (response.ok) {
        const helpRequests = await response.json();
        const tableBody = document.getElementById('help-requests-table');
        tableBody.innerHTML = ''; // Limpiar la tabla antes de actualizar.

        helpRequests.forEach(request => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${request.requestBy}</td>
                <td>${request.title}</td>
                <td>${new Date(request.date).toLocaleDateString()}</td>
                <td>${request.status}</td>
            `;
            tableBody.appendChild(row);
        });
    } else {
        alert('Failed to load help requests');
    }
}

function showHelpRequestForm() {
    document.getElementById('help-request-form').style.display = 'block';
}

function hideHelpRequestForm() {
    document.getElementById('help-request-form').style.display = 'none';
}

const HR_apiUrl = "http://localhost:8086/api";
async function createHelpRequest() {
    const title = document.getElementById('request-title').value;
    const description = document.getElementById('request-description').value;

    const requestBy = "admin"; 
    const requestBody = {
        title,
        description,
        requestBy 
    };

    const response = await fetch(`${HR_apiUrl}/helprequest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
    });

    if (response.ok) {
        alert('Help Request created successfully!');
        hideHelpRequestForm();
        loadHelpRequests(); // Recargar la tabla después de crear.
    } else {
        alert('Failed to create Help Request');
    }
}

// Llamar a la función para cargar las solicitudes cuando se cargue la página.
document.addEventListener('DOMContentLoaded', loadHelpRequests);

