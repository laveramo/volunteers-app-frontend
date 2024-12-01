const LHR_apiUrl = "http://localhost:8085/api"; 
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

async function loadHelpRequests() {
    const response = await fetch(`${LHR_apiUrl}/list-help-requests/all`);
    if (response.ok) {
        const helpRequests = await response.json();
        const tableBody = document.getElementById('help-requests-table');
        tableBody.innerHTML = ''; // Clear the table before updating

        helpRequests.forEach(request => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${request.requestBy}</td>
                <td>${request.title}</td>
                <td>${new Date(request.date).toLocaleDateString()}</td>
                <td>${request.status}</td>
                <td><button onclick="applyAsVolunteer('${request.id}')">➕ Apply</button></td>
            `;
            tableBody.appendChild(row);
        });
    } else {
        alert('Failed to load help requests');
    }
}

function applyAsVolunteer(requestId) {
    if (confirm('Are you sure you want to apply as a volunteer?')) {
        const userName = sessionStorage.getItem('userName');
        
        fetch(`${HR_apiUrl}/helprequest/assign_volunteer?Volunteer=${encodeURIComponent(userName)}&Id=${requestId}`, {
            method: 'PUT'
        })
        .then(response => {
            if (response.ok) {
                alert('Successfully applied as a volunteer!');
                loadHelpRequests(); // Refresh the table
            } else {
                alert('Failed to apply as a volunteer.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred.');
        });
    }
}

function showHelpRequestForm() {
    document.getElementById('help-request-form').style.display = 'block';
}

function hideHelpRequestForm() {
    document.getElementById('help-request-form').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    loadHelpRequests();
    displayUserName();
});

function displayUserName() {
    const userName = sessionStorage.getItem('userName');
    document.getElementById('user-name').textContent = userName ? userName : 'admin';
}
