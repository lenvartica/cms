// Church Management System - JavaScript Application
class ChurchApp {
    constructor() {
        this.currentUser = null;
        this.users = JSON.parse(localStorage.getItem('churchUsers')) || [];
        this.donations = JSON.parse(localStorage.getItem('churchDonations')) || [];
        this.events = JSON.parse(localStorage.getItem('churchEvents')) || [];
        this.selectedPaymentMethod = null;
        this.init();
        this.initializeAdmin();
    }

    init() {
        this.checkAuthStatus();
        this.loadDashboardData();
    }

    // Initialize Admin Account
    initializeAdmin() {
        const adminEmail = 'generationoffaith254@gmail.com';
        const adminExists = this.users.find(u => u.email === adminEmail);
        
        if (!adminExists) {
            const adminUser = {
                id: 'admin_' + Date.now(),
                name: 'Church Administrator',
                email: adminEmail,
                phone: '',
                password: 'generation',
                role: 'admin',
                createdAt: new Date().toISOString()
            };
            this.users.push(adminUser);
            localStorage.setItem('churchUsers', JSON.stringify(this.users));
        }
    }

    // Authentication Functions
    checkAuthStatus() {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            this.currentUser = JSON.parse(loggedInUser);
            this.showDashboard();
        } else {
            this.showAuth();
        }
    }

    showAuth() {
        document.getElementById('authContainer').style.display = 'flex';
        document.getElementById('dashboardContainer').style.display = 'none';
    }

    showDashboard() {
        document.getElementById('authContainer').style.display = 'none';
        document.getElementById('dashboardContainer').style.display = 'block';
        document.getElementById('userName').textContent = this.currentUser.name;
        this.loadUserProfile();
        
        // Show admin features if user is admin
        if (this.currentUser.role === 'admin') {
            this.showAdminFeatures();
        }
    }

    handleLogin(event) {
        event.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        const user = this.users.find(u => u.email === email && u.password === password);
        
        if (user) {
            this.currentUser = user;
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            this.showDashboard();
            this.showNotification('Login successful!', 'success');
        } else {
            this.showNotification('Invalid email or password', 'danger');
        }
    }

    handleRegister(event) {
        event.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const phone = document.getElementById('registerPhone').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            this.showNotification('Passwords do not match', 'danger');
            return;
        }

        if (this.users.find(u => u.email === email)) {
            this.showNotification('Email already registered', 'danger');
            return;
        }

        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            phone,
            password,
            createdAt: new Date().toISOString(),
            role: 'member'
        };

        this.users.push(newUser);
        localStorage.setItem('churchUsers', JSON.stringify(this.users));
        
        this.showNotification('Account created successfully!', 'success');
        this.showLoginForm();
    }

    logout() {
        localStorage.removeItem('loggedInUser');
        this.currentUser = null;
        this.showAuth();
        this.showNotification('Logged out successfully', 'info');
    }

    // Form Navigation
    showLoginForm() {
        document.getElementById('loginForm').classList.remove('hidden');
        document.getElementById('registerForm').classList.add('hidden');
    }

    showRegisterForm() {
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('registerForm').classList.remove('hidden');
    }

    // Show Admin Features
    showAdminFeatures() {
        // Add admin navigation items
        const sidebar = document.querySelector('.sidebar .nav');
        const adminNav = `
            <li class="nav-item">
                <a class="nav-link" href="#" onclick="showPage('admin')">
                    <i class="fas fa-cog me-2"></i>Admin Dashboard
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" onclick="showPage('userManagement')">
                    <i class="fas fa-users-cog me-2"></i>User Management
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" onclick="showPage('settings')">
                    <i class="fas fa-cogs me-2"></i>Settings
                </a>
            </li>
        `;
        
        // Check if admin nav already exists
        if (!sidebar.querySelector('.nav-admin')) {
            const adminDiv = document.createElement('div');
            adminDiv.className = 'nav-admin mt-3';
            adminDiv.innerHTML = `
                <h6 class="px-3 text-muted small">ADMINISTRATION</h6>
                <ul class="nav flex-column">${adminNav}</ul>
            `;
            sidebar.appendChild(adminDiv);
        }
    }

    // Page Navigation
    showPage(pageName) {
        // Hide all pages
        document.querySelectorAll('.page-content').forEach(page => {
            page.classList.add('hidden');
        });

        // Show selected page
        document.getElementById(pageName + 'Page').classList.remove('hidden');

        // Update navigation
        document.querySelectorAll('.sidebar .nav-link').forEach(link => {
            link.classList.remove('active');
        });
        if (event && event.target) {
            event.target.classList.add('active');
        }

        // Load page-specific data
        if (pageName === 'dashboard') {
            this.loadDashboardData();
        } else if (pageName === 'livestream') {
            this.loadLivestreamData();
        } else if (pageName === 'giving') {
            this.loadGivingData();
        } else if (pageName === 'events') {
            this.loadEventsData();
        } else if (pageName === 'profile') {
            this.loadUserProfile();
        } else if (pageName === 'admin') {
            this.loadAdminDashboard();
        } else if (pageName === 'userManagement') {
            this.loadUserManagement();
        } else if (pageName === 'settings') {
            this.loadSettings();
        }
    }

    // Dashboard Functions
    loadDashboardData() {
        document.getElementById('memberCount').textContent = this.users.length;
        document.getElementById('eventCount').textContent = this.events.length;
        
        const totalGiving = this.donations.reduce((sum, d) => sum + d.amount, 0);
        document.getElementById('givingTotal').textContent = `$${totalGiving.toLocaleString()}`;
        
        document.getElementById('livestreamCount').textContent = '3'; // Mock data
    }

    // Livestream Functions
    loadLivestreamData() {
        this.loadPastServices();
    }

    startLivestream() {
        const livestreamContainer = document.querySelector('.livestream-container');
        livestreamContainer.innerHTML = `
            <video id="livestreamVideo" controls autoplay style="width: 100%; height: 100%;">
                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
        this.showNotification('Livestream started!', 'success');
    }

    sendMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (message) {
            this.addChatMessage(this.currentUser.name, message);
            input.value = '';
            
            // Simulate response
            setTimeout(() => {
                this.addChatMessage('Pastor', 'Thank you for joining! God bless!');
            }, 1000);
        }
    }

    addChatMessage(sender, message) {
        const chatMessages = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'mb-2';
        messageDiv.innerHTML = `
            <strong>${sender}:</strong> ${message}
            <small class="text-muted d-block">${new Date().toLocaleTimeString()}</small>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    loadPastServices() {
        const pastServices = document.getElementById('pastServices');
        const services = [
            { title: 'Last Sunday Service', date: 'December 3, 2024', views: 245 },
            { title: 'Thanksgiving Service', date: 'November 23, 2024', views: 189 },
            { title: 'Bible Study - Romans', date: 'November 20, 2024', views: 123 }
        ];

        pastServices.innerHTML = services.map(service => `
            <div class="col-md-4 mb-3">
                <div class="card">
                    <div class="card-body text-center">
                        <i class="fas fa-video fa-2x text-primary mb-2"></i>
                        <h6>${service.title}</h6>
                        <p class="text-muted">${service.date}</p>
                        <p class="text-muted"><small>${service.views} views</small></p>
                        <button class="btn btn-sm btn-outline-primary" onclick="watchReplay('${service.title}')">Watch Replay</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    watchReplay(title) {
        this.showNotification(`Loading ${title}...`, 'info');
    }

    // Payment Functions
    selectPaymentMethod(element, method) {
        document.querySelectorAll('.payment-method').forEach(el => {
            el.classList.remove('selected');
        });
        element.classList.add('selected');
        this.selectedPaymentMethod = method;

        // Show/hide card details based on method
        const cardDetails = document.getElementById('cardDetails');
        if (method === 'card') {
            cardDetails.classList.remove('hidden');
        } else {
            cardDetails.classList.add('hidden');
        }
    }

    processPayment(event) {
        event.preventDefault();
        
        if (!this.selectedPaymentMethod) {
            this.showNotification('Please select a payment method', 'warning');
            return;
        }

        const donationType = document.getElementById('donationType').value;
        const amount = parseFloat(document.getElementById('donationAmount').value);
        const email = document.getElementById('donorEmail').value;

        const donation = {
            id: Date.now().toString(),
            userId: this.currentUser.id,
            type: donationType,
            amount: amount,
            method: this.selectedPaymentMethod,
            email: email,
            date: new Date().toISOString(),
            status: 'completed'
        };

        this.donations.push(donation);
        localStorage.setItem('churchDonations', JSON.stringify(this.donations));

        this.showNotification(`Payment of $${amount} processed successfully!`, 'success');
        
        // Reset form
        event.target.reset();
        document.querySelectorAll('.payment-method').forEach(el => {
            el.classList.remove('selected');
        });
        this.selectedPaymentMethod = null;
        document.getElementById('cardDetails').classList.add('hidden');

        // Update dashboard
        this.loadDashboardData();
    }

    loadGivingData() {
        const totalGiving = this.donations.reduce((sum, d) => sum + d.amount, 0);
        const thisMonth = this.donations.filter(d => {
            const date = new Date(d.date);
            const now = new Date();
            return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
        }).reduce((sum, d) => sum + d.amount, 0);

        // Update giving statistics
        document.querySelector('#givingPage .text-success').textContent = `$${thisMonth.toLocaleString()}`;
        document.querySelector('#givingPage .text-primary').textContent = `$${totalGiving.toLocaleString()}`;
    }

    // Events Functions
    loadEventsData() {
        const defaultEvents = [
            { id: '1', title: 'Sunday Service', time: 'Every Sunday at 10:00 AM', location: 'Main Sanctuary' },
            { id: '2', title: 'Bible Study', time: 'Wednesday at 7:00 PM', location: 'Fellowship Hall' },
            { id: '3', title: 'Youth Group', time: 'Friday at 6:00 PM', location: 'Youth Center' },
            { id: '4', title: 'Prayer Meeting', time: 'Tuesday at 6:00 PM', location: 'Prayer Room' },
            { id: '5', title: 'Men\'s Fellowship', time: 'Saturday at 8:00 AM', location: 'Fellowship Hall' },
            { id: '6', title: 'Women\'s Ministry', time: 'Thursday at 10:00 AM', location: 'Main Hall' }
        ];

        this.events = defaultEvents;
        localStorage.setItem('churchEvents', JSON.stringify(this.events));

        const eventsList = document.getElementById('eventsList');
        eventsList.innerHTML = this.events.map(event => `
            <div class="col-md-4 mb-3">
                <div class="card">
                    <div class="card-body">
                        <h5>${event.title}</h5>
                        <p class="text-muted">${event.time}</p>
                        <p><i class="fas fa-map-marker-alt me-1"></i>${event.location}</p>
                        <button class="btn btn-primary btn-sm" onclick="registerForEvent('${event.id}')">Register</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    registerForEvent(eventId) {
        const event = this.events.find(e => e.id === eventId);
        if (event) {
            this.showNotification(`Registered for ${event.title}!`, 'success');
        }
    }

    // Profile Functions
    loadUserProfile() {
        if (this.currentUser) {
            document.getElementById('profileName').value = this.currentUser.name || '';
            document.getElementById('profileEmail').value = this.currentUser.email || '';
            document.getElementById('profilePhone').value = this.currentUser.phone || '';
        }
    }

    updateProfile(event) {
        event.preventDefault();
        
        const name = document.getElementById('profileName').value;
        const email = document.getElementById('profileEmail').value;
        const phone = document.getElementById('profilePhone').value;

        // Update current user
        this.currentUser.name = name;
        this.currentUser.email = email;
        this.currentUser.phone = phone;

        // Update in users array
        const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
        if (userIndex !== -1) {
            this.users[userIndex] = this.currentUser;
            localStorage.setItem('churchUsers', JSON.stringify(this.users));
            localStorage.setItem('loggedInUser', JSON.stringify(this.currentUser));
        }

        // Update display name
        document.getElementById('userName').textContent = this.currentUser.name;
        
        this.showNotification('Profile updated successfully!', 'success');
    }

    // Admin Dashboard Functions
    loadAdminDashboard() {
        // Update admin statistics
        const totalUsers = this.users.length;
        const totalDonations = this.donations.reduce((sum, d) => sum + d.amount, 0);
        const totalEvents = this.events.length;
        const activeUsers = this.users.filter(u => u.role !== 'admin').length;

        // Update admin dashboard content
        const adminPage = document.getElementById('adminPage');
        if (adminPage) {
            adminPage.innerHTML = `
                <h2 class="mb-4">Admin Dashboard</h2>
                
                <div class="row mb-4">
                    <div class="col-md-3 mb-3">
                        <div class="stats-card">
                            <i class="fas fa-users fa-2x mb-2"></i>
                            <h4>${totalUsers}</h4>
                            <p>Total Users</p>
                        </div>
                    </div>
                    <div class="col-md-3 mb-3">
                        <div class="stats-card">
                            <i class="fas fa-dollar-sign fa-2x mb-2"></i>
                            <h4>$${totalDonations.toLocaleString()}</h4>
                            <p>Total Donations</p>
                        </div>
                    </div>
                    <div class="col-md-3 mb-3">
                        <div class="stats-card">
                            <i class="fas fa-calendar fa-2x mb-2"></i>
                            <h4>${totalEvents}</h4>
                            <p>Total Events</p>
                        </div>
                    </div>
                    <div class="col-md-3 mb-3">
                        <div class="stats-card">
                            <i class="fas fa-user-check fa-2x mb-2"></i>
                            <h4>${activeUsers}</h4>
                            <p>Active Members</p>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h5>Recent Activity</h5>
                            </div>
                            <div class="card-body">
                                <div id="recentActivity">
                                    <p class="text-muted">Loading recent activity...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h5>System Status</h5>
                            </div>
                            <div class="card-body">
                                <div class="mb-2">
                                    <i class="fas fa-circle text-success me-2"></i>System Online
                                </div>
                                <div class="mb-2">
                                    <i class="fas fa-circle text-success me-2"></i>Database Connected
                                </div>
                                <div class="mb-2">
                                    <i class="fas fa-circle text-warning me-2"></i>Livestream Ready
                                </div>
                                <div class="mb-2">
                                    <i class="fas fa-circle text-success me-2"></i>Payment System Active
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        this.loadRecentActivity();
    }

    loadRecentActivity() {
        const activityContainer = document.getElementById('recentActivity');
        if (!activityContainer) return;

        const activities = [
            { type: 'user', message: 'New user registered', time: '2 hours ago' },
            { type: 'donation', message: 'Donation received: $100', time: '3 hours ago' },
            { type: 'event', message: 'Sunday service completed', time: '1 day ago' },
            { type: 'livestream', message: 'Livestream ended', time: '1 day ago' }
        ];

        activityContainer.innerHTML = activities.map(activity => `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <span>${activity.message}</span>
                <small class="text-muted">${activity.time}</small>
            </div>
        `).join('');
    }

    // User Management Functions
    loadUserManagement() {
        const userManagementPage = document.getElementById('userManagementPage');
        if (userManagementPage) {
            userManagementPage.innerHTML = `
                <h2 class="mb-4">User Management</h2>
                
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <input type="text" class="form-control" id="userSearch" placeholder="Search users..." style="width: 300px;">
                    </div>
                    <button class="btn btn-primary" onclick="showAddUserModal()">
                        <i class="fas fa-plus me-2"></i>Add User
                    </button>
                </div>

                <div class="card">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Created</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="usersTable">
                                    <!-- Users will be loaded here -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;
        }
        this.displayUsers();
    }

    displayUsers() {
        const usersTable = document.getElementById('usersTable');
        if (!usersTable) return;

        const users = this.users.filter(u => u.role !== 'admin'); // Don't show admin in list
        usersTable.innerHTML = users.map(user => `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td><span class="badge bg-primary">${user.role}</span></td>
                <td>${new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary" onclick="editUser('${user.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteUser('${user.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-warning" onclick="resetPassword('${user.id}')">
                        <i class="fas fa-key"></i>
                    </button>
                </td>
            </tr>
        `).join('');

        // Add search functionality
        const searchInput = document.getElementById('userSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                const rows = usersTable.querySelectorAll('tr');
                rows.forEach(row => {
                    const text = row.textContent.toLowerCase();
                    row.style.display = text.includes(searchTerm) ? '' : 'none';
                });
            });
        }
    }

    editUser(userId) {
        const user = this.users.find(u => u.id === userId);
        if (user) {
            const newName = prompt('Enter new name:', user.name);
            const newEmail = prompt('Enter new email:', user.email);
            const newRole = prompt('Enter new role (member/volunteer/leader):', user.role);
            
            if (newName && newEmail && newRole) {
                user.name = newName;
                user.email = newEmail;
                user.role = newRole;
                localStorage.setItem('churchUsers', JSON.stringify(this.users));
                this.displayUsers();
                this.showNotification('User updated successfully!', 'success');
            }
        }
    }

    deleteUser(userId) {
        if (confirm('Are you sure you want to delete this user?')) {
            this.users = this.users.filter(u => u.id !== userId);
            localStorage.setItem('churchUsers', JSON.stringify(this.users));
            this.displayUsers();
            this.showNotification('User deleted successfully!', 'success');
        }
    }

    resetPassword(userId) {
        const user = this.users.find(u => u.id === userId);
        if (user) {
            const newPassword = prompt('Enter new password for ' + user.name + ':');
            if (newPassword) {
                user.password = newPassword;
                localStorage.setItem('churchUsers', JSON.stringify(this.users));
                this.showNotification('Password reset successfully!', 'success');
            }
        }
    }

    showAddUserModal() {
        const name = prompt('Enter user name:');
        const email = prompt('Enter user email:');
        const password = prompt('Enter user password:');
        const role = prompt('Enter user role (member/volunteer/leader):');
        
        if (name && email && password && role) {
            const newUser = {
                id: Date.now().toString(),
                name: name,
                email: email,
                phone: '',
                password: password,
                role: role,
                createdAt: new Date().toISOString()
            };
            
            this.users.push(newUser);
            localStorage.setItem('churchUsers', JSON.stringify(this.users));
            this.displayUsers();
            this.showNotification('User added successfully!', 'success');
        }
    }

    // Settings Functions
    loadSettings() {
        const settingsPage = document.getElementById('settingsPage');
        if (settingsPage) {
            settingsPage.innerHTML = `
                <h2 class="mb-4">System Settings</h2>
                
                <div class="row">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h5>Church Information</h5>
                            </div>
                            <div class="card-body">
                                <form onsubmit="updateChurchSettings(event)">
                                    <div class="mb-3">
                                        <label class="form-label">Church Name</label>
                                        <input type="text" class="form-control" id="churchName" value="Generation of Faith Ministry">
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Church Email</label>
                                        <input type="email" class="form-control" id="churchEmail" value="info@generationoffaith.org">
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Church Phone</label>
                                        <input type="tel" class="form-control" id="churchPhone" value="+254 123 456 789">
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Church Address</label>
                                        <textarea class="form-control" id="churchAddress" rows="3">123 Church Street, Nairobi, Kenya</textarea>
                                    </div>
                                    <button type="submit" class="btn btn-primary">Save Settings</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h5>System Configuration</h5>
                            </div>
                            <div class="card-body">
                                <div class="mb-3">
                                    <label class="form-label">Default Currency</label>
                                    <select class="form-select" id="defaultCurrency">
                                        <option value="USD" selected>USD ($)</option>
                                        <option value="KES">KES (KSh)</option>
                                        <option value="EUR">EUR (€)</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Time Zone</label>
                                    <select class="form-select" id="timeZone">
                                        <option value="UTC" selected>UTC</option>
                                        <option value="EAT">East Africa Time (EAT)</option>
                                        <option value="EST">Eastern Time (EST)</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="enableNotifications" checked>
                                        <label class="form-check-label" for="enableNotifications">
                                            Enable Email Notifications
                                        </label>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="enableLivestream" checked>
                                        <label class="form-check-label" for="enableLivestream">
                                            Enable Livestream
                                        </label>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="enablePayments" checked>
                                        <label class="form-check-label" for="enablePayments">
                                            Enable Online Payments
                                        </label>
                                    </div>
                                </div>
                                <button class="btn btn-primary" onclick="saveSystemSettings()">Save System Settings</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mt-4">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h5>Data Management</h5>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-3">
                                        <button class="btn btn-outline-primary w-100 mb-2" onclick="exportUsers()">
                                            <i class="fas fa-download me-2"></i>Export Users
                                        </button>
                                    </div>
                                    <div class="col-md-3">
                                        <button class="btn btn-outline-primary w-100 mb-2" onclick="exportDonations()">
                                            <i class="fas fa-download me-2"></i>Export Donations
                                        </button>
                                    </div>
                                    <div class="col-md-3">
                                        <button class="btn btn-outline-warning w-100 mb-2" onclick="clearCache()">
                                            <i class="fas fa-trash me-2"></i>Clear Cache
                                        </button>
                                    </div>
                                    <div class="col-md-3">
                                        <button class="btn btn-outline-danger w-100 mb-2" onclick="resetSystem()">
                                            <i class="fas fa-exclamation-triangle me-2"></i>Reset System
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    updateChurchSettings(event) {
        event.preventDefault();
        this.showNotification('Church settings updated successfully!', 'success');
    }

    saveSystemSettings() {
        this.showNotification('System settings saved successfully!', 'success');
    }

    exportUsers() {
        const dataStr = JSON.stringify(this.users, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        const exportFileDefaultName = 'users_export.json';
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        
        this.showNotification('Users exported successfully!', 'success');
    }

    exportDonations() {
        const dataStr = JSON.stringify(this.donations, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        const exportFileDefaultName = 'donations_export.json';
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        
        this.showNotification('Donations exported successfully!', 'success');
    }

    clearCache() {
        if (confirm('Are you sure you want to clear the cache?')) {
            localStorage.clear();
            this.showNotification('Cache cleared successfully!', 'success');
            setTimeout(() => {
                location.reload();
            }, 1000);
        }
    }

    resetSystem() {
        if (confirm('Are you sure you want to reset the entire system? This action cannot be undone!')) {
            if (confirm('This will delete all data except the admin account. Are you absolutely sure?')) {
                localStorage.clear();
                this.showNotification('System reset successfully!', 'success');
                setTimeout(() => {
                    location.reload();
                }, 1000);
            }
        }
    }

    // Utility Functions
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
}

// Global functions for HTML event handlers
let churchApp;

function handleLogin(event) {
    churchApp.handleLogin(event);
}

function handleRegister(event) {
    churchApp.handleRegister(event);
}

function showLoginForm() {
    churchApp.showLoginForm();
}

function showRegisterForm() {
    churchApp.showRegisterForm();
}

function logout() {
    churchApp.logout();
}

function showPage(pageName) {
    churchApp.showPage(pageName);
}

function selectPaymentMethod(element, method) {
    churchApp.selectPaymentMethod(element, method);
}

function processPayment(event) {
    churchApp.processPayment(event);
}

function startLivestream() {
    churchApp.startLivestream();
}

function sendMessage() {
    churchApp.sendMessage();
}

function watchReplay(title) {
    churchApp.watchReplay(title);
}

function registerForEvent(eventId) {
    churchApp.registerForEvent(eventId);
}

function updateProfile(event) {
    churchApp.updateProfile(event);
}

function showAddUserModal() {
    churchApp.showAddUserModal();
}

function editUser(userId) {
    churchApp.editUser(userId);
}

function deleteUser(userId) {
    churchApp.deleteUser(userId);
}

function resetPassword(userId) {
    churchApp.resetPassword(userId);
}

function updateChurchSettings(event) {
    churchApp.updateChurchSettings(event);
}

function saveSystemSettings() {
    churchApp.saveSystemSettings();
}

function exportUsers() {
    churchApp.exportUsers();
}

function exportDonations() {
    churchApp.exportDonations();
}

function clearCache() {
    churchApp.clearCache();
}

function resetSystem() {
    churchApp.resetSystem();
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    churchApp = new ChurchApp();
});
