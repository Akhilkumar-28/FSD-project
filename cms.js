// Retrieve contacts from localStorage or initialize an empty array
let contactsList = JSON.parse(localStorage.getItem('contacts')) || [];

// Function to display contacts
function displayContacts() {
    const contactContainer = document.getElementById('contactContainer');
    contactContainer.innerHTML = ''; // Clear the container before rendering

    contactsList.forEach((contact, index) => {
        const contactCard = document.createElement('div');
        contactCard.className = 'contact-card';

        contactCard.innerHTML = `
            <div class="contact-info">
                <h2>${contact.name}</h2>
                <p>${contact.phone}</p>
                <p>${contact.email}</p>
            </div>
            <div class="btn-container">
                <button class="edit-btn" onclick="editContact(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteContact(${index})">Delete</button>
            </div>
        `;

        contactContainer.appendChild(contactCard);
    });
}

// Function to add a new contact
function addContact() {
    const name = document.getElementById('nameInput').value.trim();
    const phone = document.getElementById('phoneInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();

    if (!name || !phone || !email) {
        alert('Please fill in all fields.');
        return;
    }

    const newContact = { name, phone, email };
    contactsList.push(newContact);
    localStorage.setItem('contacts', JSON.stringify(contactsList)); // Save to localStorage
    displayContacts(); // Refresh the contact list
    clearFields(); // Clear input fields
}

// Function to delete a contact
function deleteContact(index) {
    contactsList.splice(index, 1); // Remove the contact from the array
    localStorage.setItem('contacts', JSON.stringify(contactsList)); // Update localStorage
    displayContacts(); // Refresh the contact list
}

// Function to edit a contact
function editContact(index) {
    const nameInput = document.getElementById('nameInput');
    const phoneInput = document.getElementById('phoneInput');
    const emailInput = document.getElementById('emailInput');

    nameInput.value = contactsList[index].name;
    phoneInput.value = contactsList[index].phone;
    emailInput.value = contactsList[index].email;

    // Show the update button and hide the add button
    document.getElementById('addContactBtn').style.display = 'none';
    document.getElementById('updateContactBtn').style.display = 'inline-block';

    // Update the contact on clicking the update button
    document.getElementById('updateContactBtn').onclick = function () {
        updateContact(index);
    };
}

// Function to update a contact
function updateContact(index) {
    contactsList[index].name = document.getElementById('nameInput').value.trim();
    contactsList[index].phone = document.getElementById('phoneInput').value.trim();
    contactsList[index].email = document.getElementById('emailInput').value.trim();

    localStorage.setItem('contacts', JSON.stringify(contactsList)); // Update localStorage
    displayContacts(); // Refresh the contact list
    clearFields(); // Clear input fields

    // Show the add button and hide the update button
    document.getElementById('addContactBtn').style.display = 'inline-block';
    document.getElementById('updateContactBtn').style.display = 'none';
}

// Function to clear input fields
function clearFields() {
    document.getElementById('nameInput').value = '';
    document.getElementById('phoneInput').value = '';
    document.getElementById('emailInput').value = '';
}

// Initial display of contacts
displayContacts();