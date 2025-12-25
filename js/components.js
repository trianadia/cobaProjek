// ============================================
// VoteKampus - Reusable UI Components
// ============================================

const Components = {

    // SVG Icons
    icons: {
        vote: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
        dashboard: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>`,
        poll: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>`,
        check: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
        chart: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>`,
        user: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
        users: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
        settings: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
        logout: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
        plus: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
        calendar: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
        clock: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
        arrowLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,
        arrowRight: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
        menu: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
        x: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
        eye: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
        eyeOff: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`,
        mail: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
        lock: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
        shield: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
        zap: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
        activity: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
        trendUp: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
        history: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/><path d="M12 7v5l4 2"/></svg>`,
        checkCircle: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
        alertCircle: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
        home: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
        info: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
        star: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
        download: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`
    },

    // Public Navbar
    navbar(isLoggedIn = false) {
        return `
            <nav class="navbar" id="navbar">
                <div class="navbar-container">
                    <a href="#/" class="navbar-brand">
                        <span class="navbar-brand-icon">🗳️</span>
                        <span>VoteKampus</span>
                    </a>
                    
                    <ul class="navbar-nav hide-mobile">
                        <li><a href="#/" class="${Router.getCurrentRoute() === '/' ? 'active' : ''}">Home</a></li>
                        <li><a href="#/tentang">Tentang</a></li>
                        <li><a href="#/fitur">Fitur</a></li>
                        <li><a href="#/kontak">Kontak</a></li>
                    </ul>
                    
                    <div class="navbar-actions">
                        ${isLoggedIn
                ? `<a href="#/dashboard" class="btn btn-primary">Dashboard</a>`
                : `<a href="#/login" class="btn btn-primary">Masuk</a>`
            }
                        <button class="navbar-mobile-toggle" onclick="App.toggleMobileMenu()">
                            ${this.icons.menu}
                        </button>
                    </div>
                </div>
            </nav>
        `;
    },

    // Dashboard Sidebar
    sidebar(role = 'student', activePage = 'dashboard') {
        const studentNav = [
            { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', href: '#/dashboard' },
            { id: 'polling', label: 'Polling Aktif', icon: 'poll', href: '#/polling' },
            { id: 'history', label: 'Riwayat Vote', icon: 'history', href: '#/history' },
            { id: 'results', label: 'Hasil Voting', icon: 'chart', href: '#/results' }
        ];

        const adminNav = [
            { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', href: '#/admin' },
            { id: 'manage', label: 'Kelola Polling', icon: 'poll', href: '#/admin/polling' },
            { id: 'create', label: 'Buat Polling', icon: 'plus', href: '#/admin/create' },
            { id: 'analytics', label: 'Analytics', icon: 'chart', href: '#/admin/analytics' },
            { id: 'students', label: 'Mahasiswa', icon: 'users', href: '#/admin/students' },
            // Admin quick access to student views without switching menu
            { id: 'polling-active', label: 'Polling Aktif', icon: 'poll', href: '#/admin/polling-aktif' },
            { id: 'history', label: 'Riwayat Vote', icon: 'history', href: '#/admin/riwayat' },
            { id: 'results', label: 'Hasil Voting', icon: 'chart', href: '#/admin/hasil' }
        ];

        const navItems = role === 'admin' ? adminNav : studentNav;
        const user = Auth.getUser();

        return `
            <aside class="sidebar" id="sidebar">
                <div class="sidebar-header">
                    <a href="#/" class="sidebar-brand">
                        <span class="sidebar-brand-icon">🗳️</span>
                        <div class="sidebar-brand-text">
                            <span class="sidebar-brand-name">VoteKampus</span>
                            <span class="sidebar-brand-subtitle">${role === 'admin' ? 'Admin Panel' : 'Student Portal'}</span>
                        </div>
                    </a>
                </div>
                
                <nav class="sidebar-nav">
                    <div class="sidebar-nav-section">
                        <span class="sidebar-nav-title">Menu</span>
                        <ul class="sidebar-nav-items">
                            ${navItems.map(item => `
                                <li class="sidebar-nav-item">
                                    <a href="${item.href}" class="${activePage === item.id ? 'active' : ''}">
                                        <span class="sidebar-nav-icon">${this.icons[item.icon]}</span>
                                        <span>${item.label}</span>
                                    </a>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    
                    <div class="sidebar-nav-section">
                        <span class="sidebar-nav-title">Akun</span>
                        <ul class="sidebar-nav-items">
                            <li class="sidebar-nav-item">
                                <a href="#/profile">
                                    <span class="sidebar-nav-icon">${this.icons.user}</span>
                                    <span>Profil</span>
                                </a>
                            </li>
                            <li class="sidebar-nav-item">
                                <a href="#" onclick="Auth.logout(); return false;">
                                    <span class="sidebar-nav-icon">${this.icons.logout}</span>
                                    <span>Logout</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
                
                <div class="sidebar-footer">
                    <div class="sidebar-user">
                        <div class="sidebar-user-avatar">
                            ${user ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div class="sidebar-user-info">
                            <span class="sidebar-user-name">${user ? user.name : 'User'}</span>
                            <span class="sidebar-user-role">${user ? user.nim : ''}</span>
                        </div>
                    </div>
                </div>
            </aside>
            <div class="sidebar-overlay" id="sidebarOverlay" onclick="App.closeSidebar()"></div>
        `;
    },

    // Footer
    footer() {
        return `
            <footer class="footer">
                <div class="container">
                    <div class="footer-grid">
                        <div class="footer-brand">
                            <div class="footer-brand-name">
                                <span class="footer-brand-icon">🗳️</span>
                                VoteKampus
                            </div>
                            <p>Platform voting modern untuk organisasi mahasiswa. Transparan, aman, dan real-time.</p>
                        </div>
                        
                        <div class="footer-column">
                            <h5>Platform</h5>
                            <ul class="footer-links">
                                <li><a href="#/fitur">Fitur</a></li>
                                <li><a href="#/keamanan">Keamanan</a></li>
                                <li><a href="#/faq">FAQ</a></li>
                            </ul>
                        </div>
                        
                        <div class="footer-column">
                            <h5>Organisasi</h5>
                            <ul class="footer-links">
                                <li><a href="#/tentang">Tentang Kami</a></li>
                                <li><a href="#/kontak">Kontak</a></li>
                                <li><a href="#/privacy">Kebijakan Privasi</a></li>
                            </ul>
                        </div>
                        
                        <div class="footer-column">
                            <h5>Dukungan</h5>
                            <ul class="footer-links">
                                <li><a href="#/panduan">Panduan</a></li>
                                <li><a href="#/bantuan">Pusat Bantuan</a></li>
                                <li><a href="mailto:support@votekampus.id">Email Support</a></li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="footer-bottom">
                        <p class="footer-copyright">&copy; 2024 VoteKampus. All rights reserved.</p>
                        <div class="footer-social">
                            <a href="#" aria-label="Twitter">𝕏</a>
                            <a href="#" aria-label="Instagram">📷</a>
                            <a href="#" aria-label="GitHub">💻</a>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    },

    // Stat Card
    statCard(value, label, icon, type = 'primary', trend = null) {
        return `
            <div class="stat-card animate-fadeInUp">
                <div class="stat-card-icon ${type}">
                    ${this.icons[icon] || icon}
                </div>
                <div class="stat-card-value">${value}</div>
                <div class="stat-card-label">${label}</div>
                ${trend ? `
                    <div class="stat-card-trend ${trend.direction}">
                        ${this.icons.trendUp}
                        ${trend.value}
                    </div>
                ` : ''}
            </div>
        `;
    },

    // Poll Card
    pollCard(poll) {
        const hasVoted = poll.hasVoted;
        const isActive = poll.status === 'active';

        return `
            <div class="poll-card animate-fadeInUp" onclick="Router.navigate('/vote/${poll.id}')">
                <div class="poll-card-image" style="background: ${poll.gradient || 'var(--gradient-primary)'};">
                </div>
                <div class="poll-card-body">
                    <div class="poll-card-status">
                        <span class="badge ${isActive ? 'badge-success' : 'badge-neutral'} badge-dot">
                            ${isActive ? 'Aktif' : 'Selesai'}
                        </span>
                        ${hasVoted
                ? `<span class="badge badge-neutral">✓ Sudah Vote</span>`
                : isActive ? `<span class="badge badge-success">Belum Vote</span>` : ''
            }
                    </div>
                    <h4 class="poll-card-title">${poll.title}</h4>
                    <div class="poll-card-date">
                        ${this.icons.calendar}
                        <span>${poll.startDate} - ${poll.endDate}</span>
                    </div>
                    ${isActive && !hasVoted ? `
                        <div class="poll-card-date">
                            ${this.icons.clock}
                            <span>Sisa ${poll.remainingDays} hari</span>
                        </div>
                    ` : ''}
                    <div class="poll-card-meta">
                        <span class="poll-card-voters">
                            ${this.icons.users}
                            ${poll.totalVotes} pemilih
                        </span>
                        <span class="poll-card-action ${hasVoted || !isActive ? 'view' : 'vote'}">
                            ${hasVoted || !isActive ? 'Lihat Hasil' : 'Vote →'}
                        </span>
                    </div>
                </div>
            </div>
        `;
    },

    // Candidate Card
    candidateCard(candidate, isSelected = false) {
        return `
            <div class="candidate-card ${isSelected ? 'selected' : ''}" 
                 onclick="VotingPage.selectCandidate(${candidate.id})"
                 data-candidate="${candidate.id}">
                <img src="${candidate.photo || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(candidate.name) + '&size=120&background=4F46E5&color=fff'}" 
                     alt="${candidate.name}" 
                     class="candidate-avatar">
                <h3 class="candidate-name">${candidate.name}</h3>
                <p class="candidate-tagline">"${candidate.tagline}"</p>
                <div class="candidate-radio">
                    ${isSelected
                ? `${this.icons.check} Terpilih`
                : '○ Pilih Kandidat'
            }
                </div>
            </div>
        `;
    },

    // Modal
    modal(id, title, content, footer = '') {
        return `
            <div class="modal-backdrop" id="${id}">
                <div class="modal">
                    <div class="modal-header">
                        <h3 class="modal-title">${title}</h3>
                        <button class="modal-close" onclick="Components.closeModal('${id}')">
                            ${this.icons.x}
                        </button>
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                    ${footer ? `
                        <div class="modal-footer">
                            ${footer}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    },

    openModal(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.add('visible');
        }
    },

    closeModal(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.remove('visible');
        }
    },

    // Toast Notification
    showToast(title, message, type = 'success') {
        const container = document.getElementById('toastContainer') || this.createToastContainer();
        const toastId = 'toast-' + Date.now();

        const iconMap = {
            success: this.icons.checkCircle,
            error: this.icons.alertCircle,
            warning: this.icons.alertCircle,
            info: this.icons.info
        };

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.id = toastId;
        toast.innerHTML = `
            <span class="toast-icon">${iconMap[type]}</span>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" onclick="Components.removeToast('${toastId}')">
                ${this.icons.x}
            </button>
        `;

        container.appendChild(toast);

        // Auto remove after 5 seconds
        setTimeout(() => this.removeToast(toastId), 5000);
    },

    createToastContainer() {
        const container = document.createElement('div');
        container.className = 'toast-container';
        container.id = 'toastContainer';
        document.body.appendChild(container);
        return container;
    },

    removeToast(id) {
        const toast = document.getElementById(id);
        if (toast) {
            toast.style.animation = 'fadeIn 0.3s ease reverse';
            setTimeout(() => toast.remove(), 300);
        }
    },

    // Loading Spinner
    spinner(size = 'md') {
        return `<div class="spinner spinner-${size}"></div>`;
    },

    // Empty State
    emptyState(title, message, action = null) {
        return `
            <div class="empty-state">
                <div class="empty-state-icon">📭</div>
                <h3 class="empty-state-title">${title}</h3>
                <p class="empty-state-text">${message}</p>
                ${action ? `
                    <a href="${action.href}" class="btn btn-primary">${action.label}</a>
                ` : ''}
            </div>
        `;
    },

    // Animated counter
    animateValue(element, start, end, duration) {
        const range = end - start;
        const increment = end > start ? 1 : -1;
        const stepTime = Math.abs(Math.floor(duration / range));
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            element.textContent = current.toLocaleString('id-ID');
            if (current === end) {
                clearInterval(timer);
            }
        }, stepTime);
    }
};
