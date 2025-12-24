// ============================================
// VoteKampus - Admin Dashboard Page
// ============================================

const AdminDashboard = {
    // Demo data
    stats: {
        totalPolls: 12,
        activePolls: 3,
        totalVoters: 1234,
        avgParticipation: 89
    },

    recentPolls: [
        { id: 1, title: 'Pemilihan Ketua BEM 2024', status: 'active', votes: 456, created: '20 Des 2024' },
        { id: 2, title: 'Proposal Kegiatan Semester', status: 'closed', votes: 1089, created: '15 Des 2024' },
        { id: 3, title: 'Pemilihan Ketua Himpunan', status: 'draft', votes: 0, created: '18 Des 2024' }
    ],

    render(params = []) {
    const activePage = params[0] || 'dashboard';
    const user = Auth.getUser();

    let content = '';

        if (activePage === 'dashboard') {
            content = `<h2>📊 Dashboard Admin</h2>`;
        } else if (activePage === 'polling') {
            content = `<h2>🗳️ Kelola Polling</h2>`;
        } else if (activePage === 'create') {
            content = `<h2>➕ Buat Polling Baru</h2>`;
        } else if (activePage === 'analytics') {
            content = `<h2>📈 Analytics</h2>`;
        } else if (activePage === 'students') {
            content = `<h2>👥 Data Mahasiswa</h2>`;
        }

        return `
            <div class="dashboard-layout">
                ${Components.sidebar('admin', activePage)}
                
                <main class="dashboard-main">
                    ${activePage === 'dashboard' ? `
                    <header class="dashboard-header">
                        <div>
                            <h1 class="dashboard-title">📊 Admin Dashboard</h1>
                            <p class="dashboard-subtitle">Kelola polling dan pantau statistik</p>
                        </div>
                        <button class="btn btn-primary" onclick="Router.navigate('/admin/create')">
                            ${Components.icons.plus}
                            Buat Polling Baru
                        </button>
                    </header>
                    
                    <!-- Stats Overview -->
                    <section class="stats-grid animate-fadeInUp">
                        ${Components.statCard(this.stats.totalPolls, 'Total Polling', 'poll', 'primary')}
                        ${Components.statCard(this.stats.activePolls, 'Polling Aktif', 'activity', 'success')}
                        ${Components.statCard(this.stats.totalVoters.toLocaleString('id-ID'), 'Total Pemilih', 'users', 'info')}
                        ${Components.statCard(this.stats.avgParticipation + '%', 'Rata-rata Partisipasi', 'chart', 'warning')}
                    </section>
                    
                    <div class="admin-grid">
                        <!-- Recent Polls Table -->
                        <section class="admin-section animate-fadeInUp stagger-1">
                            <div class="section-header-row">
                                <h2 class="section-title-sm">📋 Polling Terbaru</h2>
                                <a href="#/admin/polling" class="view-all-link">
                                    Lihat Semua ${Components.icons.arrowRight}
                                </a>
                            </div>
                            
                            <div class="table-container">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Judul</th>
                                            <th>Status</th>
                                            <th>Votes</th>
                                            <th>Dibuat</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${this.recentPolls.map(poll => `
                                            <tr>
                                                <td>
                                                    <span class="font-medium">${poll.title}</span>
                                                </td>
                                                <td>
                                                    <span class="badge ${this.getStatusBadgeClass(poll.status)} badge-dot">
                                                        ${this.getStatusLabel(poll.status)}
                                                    </span>
                                                </td>
                                                <td>${poll.votes.toLocaleString('id-ID')}</td>
                                                <td>${poll.created}</td>
                                                <td>
                                                    <div class="table-actions">
                                                        <button class="btn btn-ghost btn-sm" title="Edit">
                                                            ✏️
                                                        </button>
                                                        <button class="btn btn-ghost btn-sm" title="Statistik" onclick="Router.navigate('/results/${poll.id}')">
                                                            📊
                                                        </button>
                                                        ${poll.status === 'draft' ? `
                                                            <button class="btn btn-ghost btn-sm text-success" title="Publish">
                                                                ▶️
                                                            </button>
                                                        ` : poll.status === 'active' ? `
                                                            <button class="btn btn-ghost btn-sm text-danger" title="Tutup">
                                                                ⏹️
                                                            </button>
                                                        ` : ''}
                                                    </div>
                                                </td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                        
                        <!-- Participation Chart -->
                        <section class="admin-section animate-fadeInUp stagger-2">
                            <h2 class="section-title-sm">📈 Trend Partisipasi (30 Hari)</h2>
                            <div class="chart-card">
                                <canvas id="trendChart" height="200"></canvas>
                            </div>
                        </section>
                    </div>
                    
                    <!-- Quick Actions -->
                    <section class="quick-actions-section animate-fadeInUp stagger-3">
                        <h2 class="section-title-sm">⚡ Aksi Cepat</h2>
                        <div class="admin-actions-grid">
                            <button class="admin-action-card" onclick="Router.navigate('/admin/create')">
                                <div class="admin-action-icon primary">
                                    ${Components.icons.plus}
                                </div>
                                <span class="admin-action-label">Buat Polling</span>
                            </button>
                            <button class="admin-action-card" onclick="Router.navigate('/admin/students')">
                                <div class="admin-action-icon info">
                                    ${Components.icons.users}
                                </div>
                                <span class="admin-action-label">Kelola Mahasiswa</span>
                            </button>
                            <button class="admin-action-card" onclick="AdminDashboard.exportAllResults()">
                                <div class="admin-action-icon success">
                                    ${Components.icons.download}
                                </div>
                                <span class="admin-action-label">Export Data</span>
                            </button>
                            <button class="admin-action-card" onclick="Router.navigate('/admin/settings')">
                                <div class="admin-action-icon warning">
                                    ${Components.icons.settings}
                                </div>
                                <span class="admin-action-label">Pengaturan</span>
                            </button>
                        </div>
                    </section>
                    ` : activePage === 'profile' ? `
                    <header class="dashboard-header">
                        <h1>👤 Profil Saya</h1>
                        <p>Informasi akun Anda</p>
                    </header>

                    <section class="profile-card">
                        <p><b>Nama:</b> ${user.name}</p>
                        <p><b>NIM:</b> ${user.nim}</p>
                        <p><b>Email:</b> ${user.email}</p>
                        <p><b>Fakultas:</b> ${user.faculty}</p>
                        <p><b>Jurusan:</b> ${user.major}</p>
                    </section>
                    ` : activePage === 'settings' ? `
                    <header class="dashboard-header">
                        <h1>⚙️ Pengaturan</h1>
                        <p>Kelola pengaturan sistem</p>
                    </header>

                    <section class="settings-section">
                        <div class="settings-card">
                            <h3>Pengaturan Sistem</h3>
                            <p>Pengaturan sistem akan ditampilkan di sini.</p>
                        </div>
                    </section>
                    ` : `
                    <header class="dashboard-header">
                        <h1>📋 Admin</h1>
                        <p>Halaman admin</p>
                    </header>
                    `
                    }

                </main>
            </div>
            
            <style>
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: var(--space-6);
                    margin-bottom: var(--space-8);
                }
                
                .admin-grid {
                    display: grid;
                    grid-template-columns: 2fr 1fr;
                    gap: var(--space-6);
                    margin-bottom: var(--space-8);
                }
                
                .admin-section {
                    background: white;
                    border-radius: var(--radius-xl);
                    padding: var(--space-6);
                    box-shadow: var(--shadow-card);
                }
                
                .section-title-sm {
                    font-size: var(--text-lg);
                    font-weight: var(--font-bold);
                    margin-bottom: var(--space-4);
                }
                
                .section-header-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: var(--space-4);
                }
                
                .view-all-link {
                    display: flex;
                    align-items: center;
                    gap: var(--space-2);
                    font-size: var(--text-sm);
                    font-weight: var(--font-medium);
                    color: var(--primary);
                }
                
                .table-actions {
                    display: flex;
                    gap: var(--space-1);
                }
                
                .btn-sm {
                    padding: var(--space-1) var(--space-2);
                }
                
                .chart-card {
                    padding: var(--space-4);
                }
                
                /* Admin Actions */
                .admin-actions-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: var(--space-4);
                }
                
                .admin-action-card {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: var(--space-3);
                    padding: var(--space-6);
                    background: white;
                    border: 1px solid var(--neutral-200);
                    border-radius: var(--radius-xl);
                    cursor: pointer;
                    transition: all var(--transition-base);
                }
                
                .admin-action-card:hover {
                    border-color: var(--primary-light);
                    box-shadow: var(--shadow-md);
                    transform: translateY(-2px);
                }
                
                .admin-action-icon {
                    width: 56px;
                    height: 56px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: var(--radius-xl);
                }
                
                .admin-action-icon.primary {
                    background: var(--primary-100);
                    color: var(--primary);
                }
                
                .admin-action-icon.info {
                    background: var(--info-light);
                    color: var(--info);
                }
                
                .admin-action-icon.success {
                    background: var(--success-light);
                    color: var(--success);
                }
                
                .admin-action-icon.warning {
                    background: var(--warning-light);
                    color: var(--warning);
                }
                
                .admin-action-label {
                    font-size: var(--text-sm);
                    font-weight: var(--font-medium);
                    color: var(--neutral-700);
                }
                
                @media (max-width: 1200px) {
                    .stats-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    
                    .admin-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .admin-actions-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
                
                @media (max-width: 640px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .admin-actions-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>
        `;
    },

    getStatusBadgeClass(status) {
        switch (status) {
            case 'active': return 'badge-success';
            case 'closed': return 'badge-danger';
            case 'draft': return 'badge-warning';
            default: return 'badge-neutral';
        }
    },

    getStatusLabel(status) {
        switch (status) {
            case 'active': return 'Aktif';
            case 'closed': return 'Selesai';
            case 'draft': return 'Draft';
            default: return status;
        }
    },

    afterRender() {
        setTimeout(() => this.initTrendChart(), 100);
    },

    initTrendChart() {
        const ctx = document.getElementById('trendChart');
        if (!ctx) return;

        // Generate random trend data for demo
        const labels = [];
        const data = [];
        for (let i = 29; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            labels.push(date.getDate() + '/' + (date.getMonth() + 1));
            data.push(Math.floor(Math.random() * 50) + 50);
        }

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Partisipasi (%)',
                    data: data,
                    borderColor: '#4F46E5',
                    backgroundColor: 'rgba(79, 70, 229, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    pointHoverBackgroundColor: '#4F46E5',
                    pointHoverBorderColor: '#fff',
                    pointHoverBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        display: true,
                        grid: {
                            display: false
                        },
                        ticks: {
                            maxTicksLimit: 7,
                            font: {
                                family: "'Inter', sans-serif",
                                size: 11
                            }
                        }
                    },
                    y: {
                        display: true,
                        min: 0,
                        max: 100,
                        grid: {
                            color: 'rgba(0,0,0,0.05)'
                        },
                        ticks: {
                            callback: value => value + '%',
                            font: {
                                family: "'Inter', sans-serif",
                                size: 11
                            }
                        }
                    }
                },
                interaction: {
                    mode: 'index',
                    intersect: false
                }
            }
        });
    },

    exportAllResults() {
        Components.showToast('Export', 'Semua data sedang di-export...', 'info');
    }
};
