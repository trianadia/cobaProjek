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

        // Build page-specific content based on activePage
        let pageContent = '';

        if (activePage === 'dashboard') {
            pageContent = `
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

                <section class="stats-grid animate-fadeInUp">
                    ${Components.statCard(this.stats.totalPolls, 'Total Polling', 'poll', 'primary')}
                    ${Components.statCard(this.stats.activePolls, 'Polling Aktif', 'activity', 'success')}
                    ${Components.statCard(this.stats.totalVoters.toLocaleString('id-ID'), 'Total Pemilih', 'users', 'info')}
                    ${Components.statCard(this.stats.avgParticipation + '%', 'Rata-rata Partisipasi', 'chart', 'warning')}
                </section>

                <div class="admin-grid">
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
                                            <td><span class="font-medium">${poll.title}</span></td>
                                            <td>
                                                <span class="badge ${this.getStatusBadgeClass(poll.status)} badge-dot">
                                                    ${this.getStatusLabel(poll.status)}
                                                </span>
                                            </td>
                                            <td>${poll.votes.toLocaleString('id-ID')}</td>
                                            <td>${poll.created}</td>
                                            <td>
                                                <div class="table-actions">
                                                    <button class="btn btn-ghost btn-sm" title="Edit">✏️</button>
                                                    <button class="btn btn-ghost btn-sm" title="Statistik" onclick="Router.navigate('/results/${poll.id}')">📊</button>
                                                    ${poll.status === 'draft' ? `
                                                        <button class="btn btn-ghost btn-sm text-success" title="Publish">▶️</button>
                                                    ` : poll.status === 'active' ? `
                                                        <button class="btn btn-ghost btn-sm text-danger" title="Tutup">⏹️</button>
                                                    ` : ''}
                                                </div>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section class="admin-section animate-fadeInUp stagger-2">
                        <h2 class="section-title-sm">📈 Trend Partisipasi (30 Hari)</h2>
                        <div class="chart-card">
                            <canvas id="trendChart" height="200"></canvas>
                        </div>
                    </section>
                </div>

                <section class="quick-actions-section animate-fadeInUp stagger-3">
                    <h2 class="section-title-sm">⚡ Aksi Cepat</h2>
                    <div class="admin-actions-grid">
                        <button class="admin-action-card" onclick="Router.navigate('/admin/create')">
                            <div class="admin-action-icon primary">${Components.icons.plus}</div>
                            <span class="admin-action-label">Buat Polling</span>
                        </button>
                        <button class="admin-action-card" onclick="Router.navigate('/admin/students')">
                            <div class="admin-action-icon info">${Components.icons.users}</div>
                            <span class="admin-action-label">Kelola Mahasiswa</span>
                        </button>
                        <button class="admin-action-card" onclick="AdminDashboard.exportAllResults()">
                            <div class="admin-action-icon success">${Components.icons.download}</div>
                            <span class="admin-action-label">Export Data</span>
                        </button>
                        <button class="admin-action-card" onclick="Router.navigate('/admin/settings')">
                            <div class="admin-action-icon warning">${Components.icons.settings}</div>
                            <span class="admin-action-label">Pengaturan</span>
                        </button>
                    </div>
                </section>
            `;
        } else if (activePage === 'polling') {
            pageContent = `
                <header class="dashboard-header">
                    <div>
                        <h1 class="dashboard-title">🗳️ Kelola Polling</h1>
                        <p class="dashboard-subtitle">Daftar polling dan aksi pengelolaan</p>
                    </div>
                    <button class="btn btn-primary" onclick="Router.navigate('/admin/create')">
                        ${Components.icons.plus} Buat Polling Baru
                    </button>
                </header>
                <section class="admin-section animate-fadeInUp">
                    <div class="section-header-row">
                        <h2 class="section-title-sm">📋 Daftar Polling</h2>
                        <div class="form-group" style="margin:0; display:flex; gap:8px; align-items:center;">
                            <input class="form-input" style="width:220px;" placeholder="Cari judul polling" />
                            <select class="form-input" style="width:160px;">
                                <option>Semua Status</option>
                                <option>Aktif</option>
                                <option>Draft</option>
                                <option>Selesai</option>
                            </select>
                        </div>
                    </div>
                    <div class="table-container">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Judul</th>
                                    <th>Status</th>
                                    <th>Periode</th>
                                    <th>Votes</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${this.recentPolls.map(poll => `
                                    <tr>
                                        <td>${poll.title}</td>
                                        <td><span class="badge ${this.getStatusBadgeClass(poll.status)} badge-dot">${this.getStatusLabel(poll.status)}</span></td>
                                        <td>${poll.created} - ${poll.status === 'active' ? 'Sedang berjalan' : poll.status === 'draft' ? 'Belum dijadwalkan' : 'Selesai'}</td>
                                        <td>${poll.votes.toLocaleString('id-ID')}</td>
                                        <td class="table-actions">
                                            <button class="btn btn-ghost btn-sm" title="Edit">✏️</button>
                                            <button class="btn btn-ghost btn-sm" title="Lihat hasil" onclick="Router.navigate('/admin/hasil')">📊</button>
                                            <button class="btn btn-ghost btn-sm" title="Salin link">🔗</button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </section>
            `;
        } else if (activePage === 'polling-active') {
            pageContent = `
                <header class="dashboard-header">
                    <div>
                        <h1 class="dashboard-title">🗳️ Polling Aktif</h1>
                        <p class="dashboard-subtitle">Lihat daftar polling yang sedang berjalan</p>
                    </div>
                </header>
                <section class="admin-section animate-fadeInUp">
                    <div class="admin-actions-grid" style="grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));">
                        ${this.recentPolls.filter(p=>p.status==='active').map(poll => `
                            <div class="card" style="padding:16px;">
                                <div class="section-header-row" style="margin-bottom:8px;">
                                    <span class="badge ${this.getStatusBadgeClass(poll.status)} badge-dot">${this.getStatusLabel(poll.status)}</span>
                                    <button class="btn btn-ghost btn-sm" onclick="Router.navigate('/admin/hasil')">Lihat</button>
                                </div>
                                <div class="font-medium">${poll.title}</div>
                                <div class="text-sm" style="color:var(--neutral-500);">Votes: ${poll.votes.toLocaleString('id-ID')}</div>
                            </div>
                        `).join('') || '<p>Tidak ada polling aktif.</p>'}
                    </div>
                </section>
            `;
        } else if (activePage === 'history') {
            pageContent = `
                <header class="dashboard-header">
                    <div>
                        <h1 class="dashboard-title">🧾 Riwayat Vote</h1>
                        <p class="dashboard-subtitle">Catatan voting yang telah berlangsung</p>
                    </div>
                </header>
                <section class="admin-section">
                    <p>Halaman Riwayat Vote (konten bisa diisi tabel riwayat).</p>
                </section>
            `;
        } else if (activePage === 'results') {
            pageContent = `
                <header class="dashboard-header">
                    <div>
                        <h1 class="dashboard-title">📊 Hasil Voting</h1>
                        <p class="dashboard-subtitle">Lihat hasil voting</p>
                    </div>
                </header>
                <section class="admin-section">
                    <p>Halaman Hasil Voting (bisa dihubungkan ke ResultsPage atau ringkasan).</p>
                </section>
            `;
        } else if (activePage === 'create') {
            pageContent = `
                <header class="dashboard-header">
                    <div>
                        <h1 class="dashboard-title">➕ Buat Polling Baru</h1>
                        <p class="dashboard-subtitle">Isi detail polling dan publikasikan</p>
                    </div>
                </header>
                <section class="admin-section animate-fadeInUp" style="display:grid; grid-template-columns:2fr 1fr; gap:20px;">
                    <div>
                        <div class="form-group">
                            <label class="form-label">Judul Polling</label>
                            <input class="form-input" placeholder="Misal: Pemilihan Ketua BEM 2025" />
                        </div>
                        <div class="form-group">
                            <label class="form-label">Deskripsi</label>
                            <textarea class="form-input" rows="4" placeholder="Deskripsikan tujuan polling"></textarea>
                        </div>
                        <div class="form-group" style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                            <div>
                                <label class="form-label">Tanggal Mulai</label>
                                <input type="date" class="form-input" />
                            </div>
                            <div>
                                <label class="form-label">Tanggal Selesai</label>
                                <input type="date" class="form-input" />
                            </div>
                        </div>
                        <div class="form-group" style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                            <div>
                                <label class="form-label">Visibilitas</label>
                                <select class="form-input">
                                    <option>Semua Mahasiswa</option>
                                    <option>Fakultas Tertentu</option>
                                    <option>Program Studi Tertentu</option>
                                </select>
                            </div>
                            <div>
                                <label class="form-label">Metode Vote</label>
                                <select class="form-input">
                                    <option>Single Choice</option>
                                    <option>Multiple Choice</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Kandidat</label>
                            <div class="card" style="padding:12px; border:1px solid var(--neutral-200); border-radius:12px;">
                                <div style="display:flex; gap:8px; margin-bottom:8px;">
                                    <input class="form-input" style="flex:1;" placeholder="Nama kandidat" />
                                    <button class="btn btn-outline">Tambah</button>
                                </div>
                                <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px;">
                                    <li class="card" style="padding:10px; border:1px solid var(--neutral-200); border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
                                        <span>Ahmad Rizki</span>
                                        <button class="btn btn-ghost btn-sm">Hapus</button>
                                    </li>
                                    <li class="card" style="padding:10px; border:1px solid var(--neutral-200); border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
                                        <span>Siti Nurhaliza</span>
                                        <button class="btn btn-ghost btn-sm">Hapus</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="form-group" style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
                            <label class="form-check"><input type="checkbox" class="form-check-input" /> <span class="form-check-label">Acak urutan kandidat</span></label>
                            <label class="form-check"><input type="checkbox" class="form-check-input" /> <span class="form-check-label">Perlu konfirmasi sebelum kirim</span></label>
                        </div>
                        <div style="display:flex; gap:12px; justify-content:flex-end; margin-top:12px;">
                            <button class="btn btn-outline" onclick="Router.navigate('/admin')">Batal</button>
                            <button class="btn btn-primary">Simpan & Publikasikan</button>
                        </div>
                    </div>
                    <div class="card" style="padding:16px; border:1px solid var(--neutral-200); border-radius:12px;">
                        <h3 class="section-title-sm" style="margin-bottom:12px;">Ringkasan</h3>
                        <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px; color:var(--neutral-600);">
                            <li>• Pastikan judul dan deskripsi jelas.</li>
                            <li>• Atur periode sesuai kebutuhan.</li>
                            <li>• Tambah kandidat minimal 2.</li>
                            <li>• Gunakan visibilitas untuk membatasi peserta.</li>
                        </ul>
                        <div class="card" style="margin-top:12px; padding:12px; background:var(--primary-50); border:none;">
                            <strong>Tip:</strong><br/> Aktifkan acak urutan kandidat untuk mengurangi bias.
                        </div>
                    </div>
                </section>
            `;
        } else if (activePage === 'analytics') {
            pageContent = `
                <header class="dashboard-header">
                    <div>
                        <h1 class="dashboard-title">📈 Analytics</h1>
                        <p class="dashboard-subtitle">Pantau statistik partisipasi dan tren</p>
                    </div>
                </header>
                <section class="admin-section">
                    <div class="chart-card"><canvas id="trendChart" height="200"></canvas></div>
                </section>
            `;
        } else if (activePage === 'students') {
            pageContent = `
                <header class="dashboard-header">
                    <div>
                        <h1 class="dashboard-title">👥 Data Mahasiswa</h1>
                        <p class="dashboard-subtitle">Kelola daftar mahasiswa</p>
                    </div>
                </header>
                <section class="admin-section">
                    <p>Halaman data mahasiswa (contoh konten placeholder).</p>
                </section>
            `;
        }

        return `
            <div class="dashboard-layout">
                ${Components.sidebar('admin', activePage)}
                <main class="dashboard-main">${pageContent}</main>
            </div>
            
            <style>
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: var(--space-6);
                    margin-bottom: var(--space-8);
                <section class="admin-section animate-fadeInUp">
                    <div class="table-container">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Polling</th>
                                    <th>Status</th>
                                    <th>Votes</th>
                                    <th>Selesai</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${this.recentPolls.map(poll => `
                                    <tr>
                                        <td>${poll.title}</td>
                                        <td><span class="badge ${this.getStatusBadgeClass(poll.status)} badge-dot">${this.getStatusLabel(poll.status)}</span></td>
                                        <td>${poll.votes.toLocaleString('id-ID')}</td>
                                        <td>${poll.created}</td>
                                        <td class="table-actions">
                                            <button class="btn btn-ghost btn-sm" onclick="Router.navigate('/admin/hasil')">Detail</button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </section>
                    display: grid;
                    grid-template-columns: 2fr 1fr;
                    gap: var(--space-6);
                    margin-bottom: var(--space-8);
                }
                
                .admin-section {
                    background: white;
                    border-radius: var(--radius-xl);
                <section class="admin-section animate-fadeInUp">
                    <div class="section-header-row">
                        <h2 class="section-title-sm">Ringkasan</h2>
                        <button class="btn btn-outline" onclick="Router.navigate('/results')">Buka Tampilan Detail</button>
                    </div>
                    <div class="table-container">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Polling</th>
                                    <th>Status</th>
                                    <th>Pemenang</th>
                                    <th>Partisipasi</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${this.recentPolls.map(poll => `
                                    <tr>
                                        <td>${poll.title}</td>
                                        <td><span class="badge ${this.getStatusBadgeClass(poll.status)} badge-dot">${this.getStatusLabel(poll.status)}</span></td>
                                        <td>${poll.status === 'active' ? '-' : 'Ahmad Rizki'}</td>
                                        <td>${poll.status === 'active' ? '—' : '78%'}</td>
                                        <td class="table-actions">
                                            <button class="btn btn-ghost btn-sm" onclick="Router.navigate('/results')">Lihat</button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </section>
                
                .section-title-sm {
                    font-size: var(--text-lg);
                    font-weight: var(--font-bold);
                    margin-bottom: var(--space-4);
                }
                
                .section-header-row {
                    display: flex;
                <section class="admin-section animate-fadeInUp">
                    <div class="form-group">
                        <label class="form-label">Judul Polling</label>
                        <input class="form-input" placeholder="Misal: Pemilihan Ketua BEM 2025" />
                    </div>
                    <div class="form-group">
                        <label class="form-label">Deskripsi</label>
                        <textarea class="form-input" rows="3" placeholder="Deskripsikan tujuan polling"></textarea>
                    </div>
                    <div class="form-group" style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                        <div>
                            <label class="form-label">Tanggal Mulai</label>
                            <input type="date" class="form-input" />
                        </div>
                        <div>
                            <label class="form-label">Tanggal Selesai</label>
                            <input type="date" class="form-input" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Kandidat</label>
                        <input class="form-input" placeholder="Pisahkan dengan koma, contoh: Ahmad, Siti, Budi" />
                    </div>
                    <div style="display:flex; gap:12px; justify-content:flex-end;">
                        <button class="btn btn-outline" onclick="Router.navigate('/admin')">Batal</button>
                        <button class="btn btn-primary">Simpan & Publikasikan</button>
                    </div>
                </section>
                }
                
                .view-all-link {
                    display: flex;
                    align-items: center;
                    gap: var(--space-2);
                    font-size: var(--text-sm);
                    font-weight: var(--font-medium);
                    color: var(--primary);
                <section class="admin-section animate-fadeInUp">
                    <div class="chart-card"><canvas id="trendChart" height="200"></canvas></div>
                </section>
                    display: flex;
                    gap: var(--space-1);
                }
                
                .btn-sm {
                    padding: var(--space-1) var(--space-2);
                }
                
                .chart-card {
                <section class="admin-section animate-fadeInUp">
                    <div class="section-header-row">
                        <h2 class="section-title-sm">Daftar Mahasiswa</h2>
                        <div class="form-group" style="margin:0; display:flex; gap:8px;">
                            <input class="form-input" style="width:220px;" placeholder="Cari nama atau NIM" />
                            <select class="form-input" style="width:160px;">
                                <option>Semua Fakultas</option>
                                <option>Teknik</option>
                                <option>Ekonomi</option>
                                <option>Hukum</option>
                            </select>
                        </div>
                    </div>
                    <div class="table-container">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Nama</th>
                                    <th>NIM</th>
                                    <th>Fakultas</th>
                                    <th>Jurusan</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Ahmad Rizki</td>
                                    <td>2021001</td>
                                    <td>Teknik</td>
                                    <td>Informatika</td>
                                    <td><span class="badge badge-success badge-dot">Aktif</span></td>
                                </tr>
                                <tr>
                                    <td>Siti Nurhaliza</td>
                                    <td>2021002</td>
                                    <td>Ekonomi</td>
                                    <td>Manajemen</td>
                                    <td><span class="badge badge-success badge-dot">Aktif</span></td>
                                </tr>
                                <tr>
                                    <td>Budi Santoso</td>
                                    <td>2021003</td>
                                    <td>Teknik</td>
                                    <td>Mesin</td>
                                    <td><span class="badge badge-warning badge-dot">Verifikasi</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
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
