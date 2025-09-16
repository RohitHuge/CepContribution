// Sample data storage (initialize from localStorage or empty arrays)
let citizens = JSON.parse(localStorage.getItem('citizens')) || [];
let grievances = JSON.parse(localStorage.getItem('grievances')) || [];
let payments = JSON.parse(localStorage.getItem('payments')) || [];
let bellMessages = JSON.parse(localStorage.getItem('bellMessages')) || [];
let adminNotifications = JSON.parse(localStorage.getItem('adminNotifications')) || [];

let selectedPaymentMethod = '';
let isCitizenLoggedIn = false;
let currentCitizenId = null;
let isAdminLoggedIn = false;

// Global constants for admin login
const ADMIN_ID = 'sevagram'; // Corrected from 'admin'
const ADMIN_PASSWORD = '1235'; // Corrected from 'password123'

// Function to save data to localStorage
function saveData() {
    localStorage.setItem('citizens', JSON.stringify(citizens));
    localStorage.setItem('grievances', JSON.stringify(grievances));
    localStorage.setItem('payments', JSON.stringify(payments));
    localStorage.setItem('bellMessages', JSON.stringify(bellMessages));
    localStorage.setItem('adminNotifications', JSON.stringify(adminNotifications));
    updateAdminStats(); // Update stats whenever data changes
}

// Helper to show notifications
function showNotification(message, type = 'success') {
    const notificationDiv = document.getElementById('notification');
    notificationDiv.textContent = message;
    notificationDiv.className = `notification ${type}`;
    notificationDiv.style.display = 'block';
    setTimeout(() => {
        notificationDiv.style.display = 'none';
    }, 5000);
}

// Bell icon notification handling
function updateBellDot() {
    const dot = document.getElementById('bellDot');
    if (!dot) return;
    // Show dot if there are any notifications with viewCount < 5
    if (bellMessages.some(msg => msg.viewCount < 5)) {
        dot.style.display = 'block';
    } else {
        dot.style.display = 'none';
    }
}

function displayBellNotifications() {
    const notificationList = document.getElementById('bellNotificationList');
    notificationList.innerHTML = ''; // Clear previous notifications

    // Filter out messages that have already been viewed 5 or more times
    // This creates a temporary array for display
    let currentlyActiveMessages = bellMessages.filter(msg => msg.viewCount < 5);

    if (currentlyActiveMessages.length === 0) {
        notificationList.innerHTML = '<div>No new notifications.</div>';
        bellMessages = []; // Clear all if none are active to keep localStorage clean
        saveData();
        updateBellDot();
        return;
    }

    currentlyActiveMessages.forEach((msg) => {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'bell-notification-item'; // Add a class for styling if needed
        msgDiv.style.padding = '8px 0';
        msgDiv.style.borderBottom = '1px solid #eee';
        msgDiv.style.wordBreak = 'break-word';

        const msgText = document.createElement('span');
        msgText.textContent = msg.message;
        msgDiv.appendChild(msgText);

        const viewCountSpan = document.createElement('span');
        viewCountSpan.style.fontSize = '0.8em';
        viewCountSpan.style.marginLeft = '10px';
        viewCountSpan.style.color = '#888';
        viewCountSpan.textContent = `(Viewed ${msg.viewCount} times)`;
        msgDiv.appendChild(viewCountSpan);

        notificationList.appendChild(msgDiv);

        // Increment view count for the message in the ORIGINAL bellMessages array
        const originalMsg = bellMessages.find(m => m === msg); // Find the original object reference
        if (originalMsg) {
            originalMsg.viewCount++;
        }
    });

    // After displaying and incrementing view counts, filter the main bellMessages array
    // to remove any that have now reached 5 or more views.
    bellMessages = bellMessages.filter(msg => msg.viewCount < 5);
    
    saveData(); // Save the updated (and potentially smaller) bellMessages array
    updateBellDot(); // Update dot visibility based on remaining messages
}

// Add a message to the bell notifications
// This function will now primarily be called for admin-initiated messages
function addBellNotification(message) {
    bellMessages.push({ message: message, viewCount: 0 });
    saveData();
    updateBellDot();
}


// Tab switching logic
function showTab(tabId) {
    // Check if the user is trying to access features that require citizen login
    const requiresCitizenLogin = ['tax-payment', 'grievance', 'track'].includes(tabId);

    if (requiresCitizenLogin && !isCitizenLoggedIn) {
        showNotification('Please login to access this feature.', 'error');
        // Redirect to login tab
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.nav-tab').forEach(navTab => navTab.classList.remove('active'));
        document.getElementById('login').classList.add('active');
        document.querySelector(`.nav-tab[onclick="showTab('login')"]`).classList.add('active');
        return; // Stop further execution
    }

    // Existing admin login check
    if (tabId === 'admin') {
        if (!isAdminLoggedIn) {
            document.getElementById('adminLoginModal').style.display = 'flex';
            // Redirect to login tab if admin not logged in
            document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.nav-tab').forEach(navTab => navTab.classList.remove('active'));
            document.getElementById('login').classList.add('active');
            document.querySelector(`.nav-tab[onclick="showTab('login')"]`).classList.add('active');
            return; // Stop further execution
        }
    }

    // Normal tab switching logic if all checks pass
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(navTab => navTab.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    document.querySelector(`.nav-tab[onclick="showTab('${tabId}')"]`).classList.add('active');

    // Handle admin tab display after successful login (if it was the target)
    if (tabId === 'admin' && isAdminLoggedIn) {
        updateAdminStats();
        // The active class is already added above, no need to re-add
    } else if (tabId !== 'admin') {
        // Hide admin dashboard content if switching away from admin tab
        document.getElementById('admin').classList.remove('active');
    }
}

// Function to initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Add the red dot element to the bell icon
    const bellBtn = document.getElementById('notificationBell');
    if (bellBtn) {
        const dot = document.createElement('span');
        dot.id = 'bellDot';
        dot.style.position = 'absolute';
        dot.style.top = '2px';
        dot.style.right = '2px';
        dot.style.width = '12px';
        dot.style.height = '12px';
        dot.style.background = 'red';
        dot.style.borderRadius = '50%';
        dot.style.display = 'none'; // Initially hidden
        dot.style.zIndex = '101';
        bellBtn.appendChild(dot);
    }
    updateBellDot(); // Initial check for dot visibility

    const bellPanel = document.getElementById('bellNotifications');

    if (bellBtn && bellPanel) {
        bellBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent click from closing immediately
            if (bellPanel.style.display === 'block') {
                bellPanel.style.display = 'none';
            } else {
                displayBellNotifications(); // Update and show notifications
                bellPanel.style.display = 'block';
            }
        });

        // Close notifications when clicking outside
        document.addEventListener('click', function(e) {
            if (bellPanel.style.display === 'block' && !bellPanel.contains(e.target) && e.target !== bellBtn && !bellBtn.contains(e.target)) {
                bellPanel.style.display = 'none';
            }
        });
    }

    // Citizen Login Form Submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const citizenId = document.getElementById('citizenId').value;
            const password = document.getElementById('password').value;

            const citizen = citizens.find(c => (c.propertyId === citizenId || c.aadhaar === citizenId) && c.password === password);

            if (citizen) {
                isCitizenLoggedIn = true;
                currentCitizenId = citizenId;
                showNotification('Login successful!', 'success');
                // Optionally, automatically switch to a default logged-in tab or stay on login
                // For now, let's switch to the tax-payment tab as a common next step
                showTab('tax-payment'); // Automatically switch to a feature after login
            } else {
                showNotification('Invalid Citizen ID/Property ID or Password.', 'error');
            }
        });
    }

    // Registration Form Submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const regName = document.getElementById('regName').value;
            const regFatherName = document.getElementById('regFatherName').value;
            const regPhone = document.getElementById('regPhone').value;
            const regEmail = document.getElementById('regEmail').value;
            const regAddress = document.getElementById('regAddress').value;
            const regPropertyId = document.getElementById('regPropertyId').value;
            const regAadhaar = document.getElementById('regAadhaar').value;
            const regPassword = document.getElementById('regPassword').value;

            // Simple validation: check if property ID or Aadhaar already exists
            if (citizens.some(c => c.propertyId === regPropertyId || c.aadhaar === regAadhaar)) {
                showNotification('User with this Property ID or Aadhaar already exists.', 'error');
                return;
            }

            const newCitizen = {
                name: regName,
                fatherName: regFatherName,
                phone: regPhone,
                email: regEmail,
                address: regAddress,
                propertyId: regPropertyId,
                aadhaar: regAadhaar,
                password: regPassword,
                grievances: [], // Store grievances for this citizen
                payments: [], // Store payments for this citizen
                notifications: [] // Store direct notifications for this citizen
            };
            citizens.push(newCitizen);
            saveData();
            showNotification('Registration successful! You can now login.', 'success');
            registerForm.reset();
            // Optionally switch to login tab
            showTab('login');
        });
    }

    // Payment Form Submission
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Payment processed via selectPaymentMethod and proceedPaymentBtn
            // This button's actual action is triggered when a payment method is selected and then the button clicked.
            // For now, let's simulate successful payment on form submit if a method is selected
            if (selectedPaymentMethod) {
                const payPropertyId = document.getElementById('payPropertyId').value;
                const payAmount = parseFloat(document.getElementById('payAmount').value);
                const payTaxType = document.getElementById('payTaxType').value;
                const bankName = document.getElementById('bankName').value;
                const accountNumber = document.getElementById('accountNumber').value;
                const ifsc = document.getElementById('ifsc').value;

                // Find the citizen
                const citizen = citizens.find(c => c.propertyId === payPropertyId);

                if (citizen) {
                    const payment = {
                        id: `PAY-${Date.now()}`,
                        propertyId: payPropertyId,
                        amount: payAmount,
                        taxType: payTaxType,
                        method: selectedPaymentMethod,
                        bankName: bankName,
                        accountNumber: accountNumber,
                        ifsc: ifsc,
                        date: new Date().toLocaleDateString(),
                        status: 'Completed'
                    };
                    payments.push(payment);
                    citizen.payments.push(payment); // Add payment to citizen's record
                    saveData();
                    showNotification(`Payment of ₹${payAmount} for ${payTaxType} received successfully via ${selectedPaymentMethod}!`, 'success');
                    
                    showReceipt(payment); // <<< CALL showReceipt HERE

                    paymentForm.reset();
                    document.getElementById('proceedPaymentBtn').style.display = 'none';
                    selectedPaymentMethod = ''; // Reset selected method
                    document.querySelectorAll('.payment-method').forEach(pm => pm.classList.remove('selected'));
                } else {
                    showNotification('Property ID not found.', 'error');
                }
            } else {
                showNotification('Please select a payment method.', 'error');
            }
        });
    }

    // Grievance Form Submission
    const grievanceForm = document.getElementById('grievanceForm');
    if (grievanceForm) {
        grievanceForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const grievanceName = document.getElementById('grievanceName').value;
            const grievancePhone = document.getElementById('grievancePhone').value;
            const grievanceCategory = document.getElementById('grievanceCategory').value;
            const grievanceSubject = document.getElementById('grievanceSubject').value;
            const grievanceDescription = document.getElementById('grievanceDescription').value;
            const grievanceAddress = document.getElementById('grievanceAddress').value;
            const grievanceUrgency = document.getElementById('grievanceUrgency').value;

            const newGrievance = {
                id: `GRV-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
                name: grievanceName,
                phone: grievancePhone,
                category: grievanceCategory,
                subject: grievanceSubject,
                description: grievanceDescription,
                address: grievanceAddress,
                urgency: grievanceUrgency,
                date: new Date().toLocaleDateString(),
                status: 'Pending',
                replies: []
            };
            grievances.push(newGrievance);
            saveData();
            showNotification(`Grievance submitted successfully! Your ID is: ${newGrievance.id}`, 'success');
            // Removed: addBellNotification(`Your grievance (${newGrievance.id}) has been submitted.`);
            grievanceForm.reset();
            updateTrackResults(); // Update track tab
        });
    }

    // UPI Modal handlers
    const upiModal = document.getElementById('upiModal');
    const qrPaidBtn = document.getElementById('qrPaidBtn');
    const closeUpiModalBtn = document.getElementById('closeUpiModalBtn');

    if (qrPaidBtn) {
        qrPaidBtn.addEventListener('click', () => {
    upiModal.style.display = 'none';

    const payPropertyId = document.getElementById('payPropertyId').value;
    const payAmount = parseFloat(document.getElementById('payAmount').value);
    const payTaxType = document.getElementById('payTaxType').value;
    const bankName = document.getElementById('bankName').value;
    const accountNumber = document.getElementById('accountNumber').value;
    const ifsc = document.getElementById('ifsc').value;

    const citizen = citizens.find(c => c.propertyId === payPropertyId);

    if (citizen) {
        const payment = {
            id: `PAY-${Date.now()}`,
            propertyId: payPropertyId,
            amount: payAmount,
            taxType: payTaxType,
            method: selectedPaymentMethod,
            bankName,
            accountNumber,
            ifsc,
            date: new Date().toLocaleDateString(),
            status: 'Completed'
        };

        payments.push(payment);
        citizen.payments.push(payment);
        saveData();

        if (confirm(`Payment successful!\n\nPayment ID: ${payment.id}\n\nDo you want to download the receipt now?`)) {
            generatePDFReceipt(payment);  // 🔸 Automatically generate and download
        } else {
            showNotification('Payment completed. You can download the receipt later from the Track Status tab.', 'success');
        }

        document.getElementById('paymentForm').reset();
        document.getElementById('proceedPaymentBtn').style.display = 'none';
        selectedPaymentMethod = '';
        document.querySelectorAll('.payment-method').forEach(pm => pm.classList.remove('selected'));
    } else {
        showNotification('Property ID not found.', 'error');
    }
});


    }

    if (closeUpiModalBtn) {
        closeUpiModalBtn.addEventListener('click', () => {
            upiModal.style.display = 'none';
            showNotification('UPI payment cancelled.', 'error');
        });
    }

    // Admin Login Modal handlers
    const adminLoginModal = document.getElementById('adminLoginModal');
    const adminLoginBtn = document.getElementById('adminLoginBtn');
    const closeAdminLoginModalBtn = document.getElementById('closeAdminLoginModalBtn');

    if (adminLoginBtn) {
        adminLoginBtn.addEventListener('click', () => {
            const adminId = document.getElementById('adminIdInput').value;
            const adminPassword = document.getElementById('adminPasswordInput').value;

            if (adminId === ADMIN_ID && adminPassword === ADMIN_PASSWORD) {
                isAdminLoggedIn = true;
                adminLoginModal.style.display = 'none';
                showNotification('Admin login successful!', 'success');
                showTab('admin'); // Show admin dashboard
            } else {
                showNotification('Invalid Admin ID or Password.', 'error');
            }
        });
    }

    if (closeAdminLoginModalBtn) {
        closeAdminLoginModalBtn.addEventListener('click', () => {
            adminLoginModal.style.display = 'none';
            // If admin cancels login, switch back to home tab
            showTab('login');
        });
    }

    // New Receipt Modal handlers
    const closeReceiptModalBtn = document.getElementById('closeReceiptModalBtn');
    if (closeReceiptModalBtn) {
        closeReceiptModalBtn.addEventListener('click', () => {
            document.getElementById('receiptModal').style.display = 'none';
        });
    }

    const printReceiptBtn = document.getElementById('printReceiptBtn');
    if (printReceiptBtn) {
        printReceiptBtn.addEventListener('click', () => {
            const printContent = document.getElementById('receiptContent').innerHTML;
            const originalBody = document.body.innerHTML;

            // Temporarily change body content for printing
            document.body.innerHTML = printContent;

            // Hide the receipt modal *before* printing
            document.getElementById('receiptModal').style.display = 'none';

            // Set up the onafterprint event listener
            const afterPrintHandler = () => {
                // Show notification first
                showNotification('Receipt processing complete. Check your downloads or printer.', 'success');
                
                // Restore original content immediately
                document.body.innerHTML = originalBody; 

                // Then, set a small timeout for reload to allow notification to be seen
                setTimeout(() => {
                    location.reload(); 
                }, 1000); // 1 second delay
                
                window.removeEventListener('afterprint', afterPrintHandler); // Remove the event listener to prevent multiple calls
            };

            window.addEventListener('afterprint', afterPrintHandler);

            // Trigger the print dialog
            window.print();
        });
    }

    // Initial calls to populate data if available and update UI
    updateAdminStats();
    updateTrackResults();
});


// Payment method selection
function selectPaymentMethod(method) {
    selectedPaymentMethod = method;
    const paymentMethods = document.querySelectorAll('.payment-method');
    paymentMethods.forEach(pm => pm.classList.remove('selected'));
    document.querySelector(`.payment-method[onclick="selectPaymentMethod('${method}')"]`).classList.add('selected');
    
    const proceedPaymentBtn = document.getElementById('proceedPaymentBtn');
    proceedPaymentBtn.style.display = 'block';

    if (method === 'upi') {
        document.getElementById('upiModal').style.display = 'flex';
        // Hide the proceed button on the main form when UPI modal is active
        proceedPaymentBtn.style.display = 'none';
    } else {
        document.getElementById('upiModal').style.display = 'none';
    }
}

// Track Status Functionality
function trackStatus() {
    const trackId = document.getElementById('trackId').value.trim();
    const trackResultsDiv = document.getElementById('trackResults');
    trackResultsDiv.innerHTML = '<h3>Search Results</h3>';

    if (!trackId) {
        trackResultsDiv.innerHTML += '<p>Please enter a Grievance ID or Property ID.</p>';
        return;
    }

    let resultsFound = false;

    // Search for grievances
    const matchedGrievances = grievances.filter(g => g.id.includes(trackId) || g.propertyId === trackId);
    if (matchedGrievances.length > 0) {
        resultsFound = true;
        matchedGrievances.forEach(grievance => {
            const grievanceDiv = document.createElement('div');
            grievanceDiv.className = 'grievance-item';
            grievanceDiv.innerHTML = `
                <div class="grievance-header">
                    <span class="grievance-id">${grievance.id}</span>
                    <span class="status ${grievance.status.toLowerCase().replace(' ', '-')}">${grievance.status}</span>
                </div>
                <h4>${grievance.subject}</h4>
                <p>${grievance.description}</p>
                <small>Submitted: ${grievance.date} | Urgency: ${grievance.urgency}</small>
            `;
            // Display replies for the citizen
            if (grievance.replies && grievance.replies.length > 0) {
                const repliesDiv = document.createElement('div');
                repliesDiv.style.marginTop = '10px';
                repliesDiv.innerHTML = '<h5>Replies:</h5>';
                grievance.replies.forEach(reply => {
                    repliesDiv.innerHTML += `<p style="font-size:0.9em; margin-bottom:5px;"><strong>Admin:</strong> ${reply.message} <small>(${reply.date})</small></p>`;
                });
                grievanceDiv.appendChild(repliesDiv);
            }
            trackResultsDiv.appendChild(grievanceDiv);
        });
    }

    // Search for payments (assuming propertyId is sufficient to track payments)
    const matchedPayments = payments.filter(p => p.propertyId === trackId);
    if (matchedPayments.length > 0) {
        resultsFound = true;
        const paymentsHeader = document.createElement('h3');
        paymentsHeader.textContent = 'Recent Payments';
        trackResultsDiv.appendChild(paymentsHeader);

        matchedPayments.forEach(payment => {
            const paymentDiv = document.createElement('div');
            paymentDiv.className = 'card'; // Reusing card style for payment display
            paymentDiv.innerHTML = `
                <h4>Tax Type: ${payment.taxType}</h4>
                <p>Amount: ₹${payment.amount}</p>
                <p>Payment ID: ${payment.id}</p>
                <p>Method: ${payment.method}</p>
                <p>Date: ${payment.date}</p>
                <p>Status: <span class="status ${payment.status.toLowerCase().replace(' ', '-')}">${payment.status}</span></p>
            `;
            trackResultsDiv.appendChild(paymentDiv);
        });
    }

    if (!resultsFound) {
        trackResultsDiv.innerHTML += '<p>No records found for the given ID.</p>';
    }
}


// Function to update the default displayed grievances on the 'Track Status' tab
function updateTrackResults() {
    const trackResultsDiv = document.getElementById('trackResults');
    // Keep the "Search by ID" card, only update the "Recent Grievances" section.
    let recentGrievancesSection = trackResultsDiv.querySelector('h3:nth-of-type(2)');
    if (!recentGrievancesSection) {
        recentGrievancesSection = document.createElement('h3');
        recentGrievancesSection.textContent = 'Recent Grievances';
        trackResultsDiv.appendChild(recentGrievancesSection);
    }
    
    // Clear previous recent grievances (except search results)
    let currentGrievanceItems = trackResultsDiv.querySelectorAll('.grievance-item');
    currentGrievanceItems.forEach(item => item.remove());

    // Sort grievances by date, newest first
    const sortedGrievances = [...grievances].sort((a, b) => new Date(b.date) - new Date(a.date));

    // Display up to 3 recent grievances
    sortedGrievances.slice(0, 3).forEach(grievance => {
        const grievanceDiv = document.createElement('div');
        grievanceDiv.className = 'grievance-item';
        grievanceDiv.innerHTML = `
            <div class="grievance-header">
                <span class="grievance-id">${grievance.id}</span>
                <span class="status ${grievance.status.toLowerCase().replace(' ', '-')}">${grievance.status}</span>
            </div>
            <h4>${grievance.subject}</h4>
            <p>${grievance.description}</p>
            <small>Submitted: ${grievance.date} | Urgency: ${grievance.urgency}</small>
        `;
        trackResultsDiv.appendChild(grievanceDiv);
    });
}

// Handle form submission
const userForm = document.getElementById('userForm');
userForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
    };

    try {
        const response = await fetch('https://your-backend-endpoint.com/api/store-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            showNotification('Data submitted successfully!', 'success');
        } else {
            showNotification('Failed to submit data.', 'error');
        }
    } catch (error) {
        showNotification('An error occurred while submitting data.', 'error');
    }
});

// Admin Dashboard Functions
function updateAdminStats() {
    const totalProperties = citizens.length;
    const totalTaxCollected = payments.reduce((sum, p) => sum + p.amount, 0);
    const pendingGrievances = grievances.filter(g => g.status === 'Pending' || g.status === 'In Progress').length;
    
    // For resolved this month, you'd need more sophisticated date handling
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const resolvedThisMonth = grievances.filter(g => {
        if (g.status === 'Resolved' && g.resolvedDate) { // Assuming a 'resolvedDate' field exists
            const rDate = new Date(g.resolvedDate);
            return rDate.getMonth() === currentMonth && rDate.getFullYear() === currentYear;
        }
        return false;
    }).length;

    document.querySelector('#admin .admin-stats .stat-card:nth-child(1) .number').textContent = totalProperties;
    document.querySelector('#admin .admin-stats .stat-card:nth-child(2) .number').textContent = `₹${totalTaxCollected.toLocaleString('en-IN')}`;
    document.querySelector('#admin .admin-stats .stat-card:nth-child(3) .number').textContent = pendingGrievances;
    document.querySelector('#admin .admin-stats .stat-card:nth-child(4) .number').textContent = resolvedThisMonth;
}

function showAdminFunction(funcType) {
    if (!isAdminLoggedIn) {
        showNotification('Please login as admin to access this feature.', 'error');
        document.getElementById('adminLoginModal').style.display = 'flex';
        return;
    }

    const adminContentArea = document.getElementById('adminDynamicContent'); // New div for dynamic content
    if (!adminContentArea) {
        console.error("adminDynamicContent div not found!");
        return;
    }
    adminContentArea.innerHTML = ''; // Clear previous content

    switch (funcType) {
        case 'users':
            showNotification('Admin: Displaying Users', 'info');
            displayAdminUsers();
            break;
        case 'taxes':
            showNotification('Admin: Displaying Tax Payments', 'info');
            displayAdminPayments();
            break;
        case 'grievances':
            showNotification('Admin: Managing Grievances', 'info');
            displayAdminGrievances();
            break;
        default:
            break;
    }
}

// Placeholder for displaying Admin Users (basic list)
function displayAdminUsers() {
    const adminContentArea = document.getElementById('adminDynamicContent');
    adminContentArea.innerHTML = '<h3>Manage Users</h3>';
    if (citizens.length === 0) {
        adminContentArea.innerHTML += '<p>No citizens registered yet.</p>';
        return;
    }

    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.innerHTML = `
        <thead>
            <tr>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Name</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Property ID</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Aadhaar</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Phone</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Email</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Bank Name</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Account Number</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">IFSC</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Receipt Numbers</th> </tr>
        </thead>
        <tbody>
        </tbody>
    `;
    const tbody = table.querySelector('tbody');

    citizens.forEach(citizen => {
        // Get bank details from the first payment if available
        const firstPayment = citizen.payments && citizen.payments.length > 0 ? citizen.payments[0] : null;
        const bankName = firstPayment ? firstPayment.bankName : 'N/A';
        const accountNumber = firstPayment ? firstPayment.accountNumber : 'N/A';
        const ifsc = firstPayment ? firstPayment.ifsc : 'N/A';

        // Get all receipt IDs for the citizen
        const receiptIds = citizen.payments && citizen.payments.length > 0 ?
                           citizen.payments.map(p => p.id).join('<br>') : 'N/A'; // Join with <br> for multi-line display

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="border: 1px solid #ddd; padding: 8px;">${citizen.name}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${citizen.propertyId}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${citizen.aadhaar}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${citizen.phone}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${citizen.email || 'N/A'}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${bankName}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${accountNumber}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${ifsc}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${receiptIds}</td> `;
        tbody.appendChild(tr);
    });
    adminContentArea.appendChild(table);
}

// Placeholder for displaying Admin Payments (basic list)
function displayAdminPayments() {
    const adminContentArea = document.getElementById('adminDynamicContent');
    adminContentArea.innerHTML = '<h3>Tax Management - All Payments</h3>';
    if (payments.length === 0) {
        adminContentArea.innerHTML += '<p>No payments recorded yet.</p>';
        return;
    }

    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.innerHTML = `
        <thead>
            <tr>
                <th style="border: 1px solid #ddd; padding: 8px;">Payment ID</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Property ID</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Amount</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Tax Type</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Method</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Bank Name</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Account Number</th>
                <th style="border: 1px solid #ddd; padding: 8px;">IFSC</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Date</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Status</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    `;
    const tbody = table.querySelector('tbody');

    payments.forEach(payment => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="border: 1px solid #ddd; padding: 8px;">${payment.id}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${payment.propertyId}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">₹${payment.amount.toLocaleString('en-IN')}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${payment.taxType}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${payment.method}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${payment.bankName || 'N/A'}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${payment.accountNumber || 'N/A'}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${payment.ifsc || 'N/A'}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${payment.date}</td>
            <td style="border: 1px solid #ddd; padding: 8px;"><span class="status ${payment.status.toLowerCase().replace(' ', '-')}">${payment.status}</span></td>
        `;
        tbody.appendChild(tr);
    });
    adminContentArea.appendChild(table);
}

// Admin Grievance Management
function displayAdminGrievances() {
    const adminContentArea = document.getElementById('adminDynamicContent'); // Use the new dynamic content area
    adminContentArea.innerHTML = '<h3>Grievance Management</h3>';

    if (grievances.length === 0) {
        adminContentArea.innerHTML += '<p>No grievances submitted yet.</p>';
        return;
    }

    grievances.forEach(grievance => {
        const grievanceDiv = document.createElement('div');
        grievanceDiv.className = 'grievance-item';
        grievanceDiv.style.marginBottom = '20px';
        grievanceDiv.innerHTML = `
            <div class="grievance-header">
                <span class="grievance-id">ID: ${grievance.id}</span>
                <span class="status ${grievance.status.toLowerCase().replace(' ', '-')}">${grievance.status}</span>
            </div>
            <p><strong>Submitted By:</strong> ${grievance.name} (${grievance.phone})</p>
            <p><strong>Category:</strong> ${grievance.category}</p>
            <p><strong>Subject:</strong> ${grievance.subject}</p>
            <p><strong>Description:</strong> ${grievance.description}</p>
            <p><strong>Location:</strong> ${grievance.address}</p>
            <p><strong>Urgency:</strong> ${grievance.urgency}</p>
            <p><strong>Date:</strong> ${grievance.date}</p>
            <div style="margin-top: 10px;">
                <label for="status-${grievance.id}">Update Status:</label>
                <select id="status-${grievance.id}" onchange="updateGrievanceStatus('${grievance.id}', this.value)">
                    <option value="Pending" ${grievance.status === 'Pending' ? 'selected' : ''}>Pending</option>
                    <option value="In Progress" ${grievance.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                    <option value="Resolved" ${grievance.status === 'Resolved' ? 'selected' : ''}>Resolved</option>
                </select>
                <br><br>
                <label for="reply-${grievance.id}">Reply to Grievance:</label>
                <textarea id="reply-${grievance.id}" rows="2" placeholder="Type your reply here..."></textarea>
                <button class="btn btn-primary" onclick="sendGrievanceReply('${grievance.id}')" style="margin-top:10px;">Send Reply</button>
            </div>
            <div class="grievance-replies" id="grievanceReplies-${grievance.id}" style="margin-top:15px; border-top:1px dashed #eee; padding-top:10px;">
                <h5>Conversation History:</h5>
            </div>
        `;
        adminContentArea.appendChild(grievanceDiv);
        displayGrievanceReplies(grievance.id); // Display existing replies
    });
}

function updateGrievanceStatus(grievanceId, newStatus) {
    const grievanceIndex = grievances.findIndex(g => g.id === grievanceId);
    if (grievanceIndex !== -1) {
        grievances[grievanceIndex].status = newStatus;
        if (newStatus === 'Resolved') {
            grievances[grievanceIndex].resolvedDate = new Date().toLocaleDateString();
        }
        saveData();
        showNotification(`Grievance ${grievanceId} status updated to ${newStatus}.`, 'success');
        // Removed: addBellNotification(`Your grievance ${grievanceId} has been updated to: ${newStatus}.`);
        displayAdminGrievances(); // Re-render to show updated status
    }
}

function sendGrievanceReply(grievanceId) {
    const replyTextarea = document.getElementById(`reply-${grievanceId}`);
    const replyMessage = replyTextarea.value.trim();

    if (!replyMessage) {
        showNotification('Reply message cannot be empty.', 'error');
        return;
    }

    const grievanceIndex = grievances.findIndex(g => g.id === grievanceId);
    if (grievanceIndex !== -1) {
        grievances[grievanceIndex].replies.push({
            sender: 'Admin',
            message: replyMessage,
            date: new Date().toLocaleString()
        });
        saveData();
        showNotification('Reply sent successfully!', 'success');
        // Kept: This is a direct message from Admin to citizen about their grievance
        addBellNotification(`Admin has replied to your grievance ${grievanceId}: "${replyMessage}"`);
        replyTextarea.value = ''; // Clear textarea
        displayGrievanceReplies(grievanceId); // Update conversation history
    }
}

function displayGrievanceReplies(grievanceId) {
    const repliesDiv = document.getElementById(`grievanceReplies-${grievanceId}`);
    if (!repliesDiv) return;

    const grievance = grievances.find(g => g.id === grievanceId);
    if (grievance && grievance.replies && grievance.replies.length > 0) {
        repliesDiv.innerHTML = '<h5>Conversation History:</h5>'; // Clear and re-add heading
        grievance.replies.forEach(reply => {
            const p = document.createElement('p');
            p.style.fontSize = '0.9em';
            p.style.marginBottom = '5px';
            p.innerHTML = `<strong>${reply.sender}:</strong> ${reply.message} <small>(${reply.date})</small>`;
            repliesDiv.appendChild(p);
        });
    } else {
        repliesDiv.innerHTML = '<h5>No replies yet.</h5>';
    }
}


function sendAdminMessage() {
    if (!isAdminLoggedIn) {
        showNotification('Please login as admin to send messages.', 'error');
        return;
    }
    const message = document.getElementById('adminMessageInput').value.trim();
    if (message) {
        addBellNotification(`Admin Message: ${message}`);
        showNotification('Message sent to all users (via notification bell).', 'success');
        document.getElementById('adminMessageInput').value = '';
    } else {
        showNotification('Message cannot be empty.', 'error');
    }
}

// Function to show the receipt modal
function showReceipt(payment) {
    const receiptModal = document.getElementById('receiptModal');
    if (!receiptModal) {
        console.error('Receipt modal not found!');
        return;
    }

    const citizen = citizens.find(c => c.propertyId === payment.propertyId);
    const citizenName = citizen ? citizen.name : 'N/A';
    const citizenAadhaar = citizen ? citizen.aadhaar : 'N/A';

    document.getElementById('receiptId').textContent = payment.id;
    document.getElementById('receiptDate').textContent = payment.date;
    document.getElementById('receiptCitizenName').textContent = citizenName;
    document.getElementById('receiptPropertyId').textContent = payment.propertyId;
    document.getElementById('receiptAadhaar').textContent = citizenAadhaar;
    document.getElementById('receiptTaxType').textContent = payment.taxType;
    document.getElementById('receiptAmount').textContent = `₹${payment.amount.toLocaleString('en-IN')}`;
    document.getElementById('receiptMethod').textContent = payment.method;

    // Optional: display bank details on receipt if available for that payment
    const receiptBankDetailsSection = document.getElementById('receiptBankDetails');
    if (payment.method !== 'upi' && payment.bankName && payment.accountNumber) {
        document.getElementById('receiptBankName').textContent = payment.bankName;
        document.getElementById('receiptAccountNumber').textContent = payment.accountNumber;
        document.getElementById('receiptIFSC').textContent = payment.ifsc || 'N/A';
        receiptBankDetailsSection.style.display = 'block';
    } else {
        receiptBankDetailsSection.style.display = 'none'; // Hide if not applicable
    }

    receiptModal.style.display = 'flex'; // Show the modal
}

// Initial calls to populate data if available and update UI
updateAdminStats();
updateTrackResults();
function generatePDFReceipt(payment) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const citizen = citizens.find(c => c.propertyId === payment.propertyId);
    const name = citizen?.name || 'N/A';
    const aadhaar = citizen?.aadhaar || 'N/A';

    doc.setFontSize(18);
    doc.text("Tax Payment Receipt", 20, 20);

    doc.setFontSize(12);
    doc.text(`Receipt ID: ${payment.id}`, 20, 35);
    doc.text(`Date: ${payment.date}`, 20, 45);
    doc.text(`Name: ${name}`, 20, 55);
    doc.text(`Property ID: ${payment.propertyId}`, 20, 65);
    doc.text(`Aadhaar: ${aadhaar}`, 20, 75);
    doc.text(`Tax Type: ${payment.taxType}`, 20, 85);
    doc.text(`Amount: ₹${payment.amount.toLocaleString('en-IN')}`, 20, 95);
    doc.text(`Method: ${payment.method}`, 20, 105);

    if (payment.method !== 'upi') {
        doc.text(`Bank Name: ${payment.bankName}`, 20, 115);
        doc.text(`Account Number: ${payment.accountNumber}`, 20, 125);
        doc.text(`IFSC: ${payment.ifsc}`, 20, 135);
    }

    doc.save(`${payment.id}_receipt.pdf`);
}
const translations = {
    en: {
        welcome: "Welcome to Village Portal",
        citizenIdLabel: "Citizen ID / Property ID",
        password: "Password",
        login: "Login",
        register: "Register New Citizen",
        // Add more English keys here...
    },
    mr: {
        welcome: "ग्राम पोर्टलमध्ये आपले स्वागत आहे",
        citizenIdLabel: "नागरिक आयडी / मालमत्ता आयडी",
        password: "पासवर्ड",
        login: "लॉगिन",
        register: "नवीन नागरिक नोंदणी",
        // Add more Marathi translations here...
    }
};

function changeLanguage() {
    const lang = document.getElementById('languageSelector').value;
    localStorage.setItem('language', lang);
    applyTranslations(lang);
}

function applyTranslations(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    placeholders.forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('language') || 'en';
    document.getElementById('languageSelector').value = savedLang;
    applyTranslations(savedLang);
});

// Function to fetch notifications from the backend
async function fetchNotifications() {
    try {
        const response = await fetch('http://localhost:5000/notifications');
        if (!response.ok) {
            throw new Error('Failed to fetch notifications');
        }
        const notifications = await response.json();
        console.log('Fetched notifications:', notifications);
        // Update the bellMessages array with backend data
        bellMessages = notifications;
        saveData();
        updateBellDot();
    } catch (error) {
        console.error('Error fetching notifications:', error);
        showNotification('Error fetching notifications', 'error');
    }
}

// Call the fetchNotifications function when the page loads
window.addEventListener('load', fetchNotifications);
