// script.js

const customerForm = document.getElementById("customer-form");
const editForm = document.getElementById("edit-form");
const editDeleteButtons = document.getElementById("edit-delete-buttons");
const tableBody = document.getElementById("table-body");

let selectedGuestCode = null;

// Function to create a new customer
customerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(customerForm);
  const formDataObject = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });

  try {
    const response = await fetch("/api/cust", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataObject),
    });

    if (response.ok) {
      refreshTable();
      customerForm.reset();
    } else {
      console.error("Failed to create customer");
    }
  } catch (error) {
    console.error("Error creating customer:", error);
  }
});

// Function to refresh the table
function refreshTable() {
  fetch("/api/cust")
    .then((response) => response.json())
    .then((data) => {
      tableBody.innerHTML = "";

      data.forEach((customer) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${customer.guest_code}</td>
          <td>${customer.guest_name}</td>
          <td>${customer.guest_birth}</td>
          <td>${customer.guest_hp}</td>
          <td>${customer.guest_addr}</td>
          <td>${customer.guest_mail}</td>
          <td>
            <button class="edit-button" data-guest-code="${customer.guest_code}" onclick="handleEditButtonClick(this)">Edit</button>
            <button class="delete-button" data-guest-code="${customer.guest_code}" onclick="handleDeleteButtonClick(this)">Delete</button>
          </td>
        `;

        tableBody.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Error refreshing table data:", error);
    });
}

// Function to handle edit button click
function handleEditButtonClick(button) {
  selectedGuestCode = button.getAttribute("data-guest-code");

  const editGuestCode = editForm.querySelector('[name="edit_guest_code"]');
  const editGuestName = editForm.querySelector('[name="edit_guest_name"]');
  const editGuestBirth = editForm.querySelector('[name="edit_guest_birth"]');
  const editGuestHP = editForm.querySelector('[name="edit_guest_hp"]');
  const editGuestAddr = editForm.querySelector('[name="edit_guest_addr"]');
  const editGuestMail = editForm.querySelector('[name="edit_guest_mail"]');

  editGuestCode.value = selectedGuestCode;

  const row = button.parentNode.parentNode;
  const cells = row.querySelectorAll("td");

  editGuestName.value = cells[1].textContent;
  editGuestBirth.value = cells[2].textContent;
  editGuestHP.value = cells[3].textContent;
  editGuestAddr.value = cells[4].textContent;
  editGuestMail.value = cells[5].textContent;

  customerForm.style.display = "none";
  editForm.style.display = "block";
  editDeleteButtons.style.display = "block";
}

// Function to handle delete button click
function handleDeleteButtonClick(button) {
  const guestCode = button.getAttribute("data-guest-code");

  fetch(`/api/cust/${guestCode}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        refreshTable();
        cancelEdit();
      } else {
        console.error("Failed to delete customer");
      }
    })
    .catch((error) => {
      console.error("Error deleting customer:", error);
    });
}

// Function to cancel edit
function cancelEdit() {
  customerForm.reset();
  editForm.reset();
  customerForm.style.display = "block";
  editForm.style.display = "none";
  editDeleteButtons.style.display = "none";
  selectedGuestCode = null;
}

// Function to save changes
editForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(editForm);
  const formDataObject = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });

  fetch(`/api/cust/${selectedGuestCode}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formDataObject),
  })
    .then((response) => {
      if (response.ok) {
        refreshTable();
        cancelEdit();
      } else {
        console.error("Failed to save changes");
      }
    })
    .catch((error) => {
      console.error("Error saving changes:", error);
    });
});

// Initial data load
refreshTable();
