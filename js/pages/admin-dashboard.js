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

    // Demo riwayat vote untuk tabel "Catatan Voting"
    voteLogs: [
        {
            name: 'Ahmad Rizki', nim: '2021001', email: 'ahmad@student.kampus.ac.id',
            faculty: 'Fakultas Teknik', major: 'Teknik Informatika',
            poll: 'Pemilihan Ketua BEM 2024', choice: 'Ahmad Rizki',
            time: '20 Des 2024 14:35', status: 'Tercatat'
        },
        {
            name: 'Siti Nurhaliza', nim: '2021002', email: 'siti@student.kampus.ac.id',
            faculty: 'Fakultas Ekonomi', major: 'Manajemen',
            poll: 'Pemilihan Ketua BEM 2024', choice: 'Siti Nurhaliza',
            time: '20 Des 2024 14:42', status: 'Tercatat'
        },
        {
            name: 'Budi Santoso', nim: '2021010', email: 'budi@student.kampus.ac.id',
            faculty: 'Fakultas Sains', major: 'Matematika',
            poll: 'Pemilihan Ketua BEM 2024', choice: 'Ahmad Rizki',
            time: '20 Des 2024 15:10', status: 'Tercatat'
        },
        {
            name: 'Rina Wijaya', nim: '2021023', email: 'rina@student.kampus.ac.id',
            faculty: 'Fakultas Sosial', major: 'Ilmu Komunikasi',
            poll: 'Proposal Kegiatan Semester', choice: 'Setuju',
            time: '15 Des 2024 10:25', status: 'Tercatat'
        },
        {
            name: 'Fajar Hermawan', nim: '2021044', email: 'fajar@student.kampus.ac.id',
            faculty: 'Fakultas Teknik', major: 'Sipil',
            poll: 'Proposal Kegiatan Semester', choice: 'Setuju',
            time: '15 Des 2024 11:05', status: 'Tercatat'
        },
        {
            name: 'Maya Putri', nim: '2021066', email: 'maya@student.kampus.ac.id',
            faculty: 'Fakultas Kedokteran', major: 'Kedokteran',
            poll: 'Proposal Kegiatan Semester', choice: 'Tidak Setuju',
            time: '15 Des 2024 13:40', status: 'Tercatat'
        }
    ],

    // Demo data mahasiswa
    students: [
        { id: 1, name: 'Ahmad Rizki', nim: '2021001', faculty: 'Teknik', major: 'Informatika', year: '2021', status: 'Aktif', email: 'ahmad@student.kampus.ac.id' },
        { id: 2, name: 'Siti Nurhaliza', nim: '2021002', faculty: 'Ekonomi', major: 'Manajemen', year: '2021', status: 'Aktif', email: 'siti@student.kampus.ac.id' },
        { id: 3, name: 'Budi Santoso', nim: '2021003', faculty: 'Teknik', major: 'Mesin', year: '2021', status: 'Verifikasi', email: 'budi@student.kampus.ac.id' },
        { id: 4, name: 'Rina Wijaya', nim: '2021004', faculty: 'Hukum', major: 'Hukum Perdata', year: '2021', status: 'Aktif', email: 'rina@student.kampus.ac.id' },
        { id: 5, name: 'Fajar Hermawan', nim: '2021005', faculty: 'Sastra', major: 'Sastra Indonesia', year: '2021', status: 'Aktif', email: 'fajar@student.kampus.ac.id' },
        { id: 6, name: 'Maya Putri', nim: '2021006', faculty: 'Teknik', major: 'Informatika', year: '2021', status: 'Nonaktif', email: 'maya@student.kampus.ac.id' }
    ],

    // State untuk hasil voting
    hasilViewState: {
        mode: 'list', // 'list' atau 'detail'
        selectedPollId: null
    },

    // State untuk edit polling
    editPollState: {
        isEditing: false,
        editingPollId: null
    },

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
                        </div>
                        <div class="table-container">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Judul</th>
                                        <th>Status</th>
                                        <th>Votes</th>
                                        <th>Dibuat</th>
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
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section class="admin-section animate-fadeInUp stagger-2" style="margin-top:20px;">
                        <h2 class="section-title-sm">📈 Trend Partisipasi (30 Hari)</h2>
                        <div class="chart-card">
                            <canvas id="trendChart" height="200"></canvas>
                        </div>
                    </section>
                </div>

                <section class="quick-actions-section animate-fadeInUp stagger-3" style="margin-top:20px;">
                    <h2 class="section-title-sm">⚡ Aksi Cepat</h2>
                    <div class="admin-actions-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(150px, 1fr)); gap:20px; margin-top:16px;">
                        <button class="admin-action-card" style="display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; padding:20px; background:white; border:1px solid var(--neutral-200); border-radius:12px; cursor:pointer; transition:all 0.2s;" onclick="Router.navigate('/admin/create')">
                            <div class="admin-action-icon primary" style="width:64px; height:64px; display:flex; align-items:center; justify-content:center; border-radius:12px; background:var(--primary-100); color:var(--primary); font-size:32px;">${Components.icons.plus}</div>
                            <span style="font-size:14px; font-weight:600; color:var(--neutral-900); text-align:center;">Buat Polling</span>
                        </button>
                        <button class="admin-action-card" style="display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; padding:20px; background:white; border:1px solid var(--neutral-200); border-radius:12px; cursor:pointer; transition:all 0.2s;" onclick="Router.navigate('/admin/students')">
                            <div class="admin-action-icon info" style="width:64px; height:64px; display:flex; align-items:center; justify-content:center; border-radius:12px; background:var(--info-light); color:var(--info); font-size:32px;">${Components.icons.users}</div>
                            <span style="font-size:14px; font-weight:600; color:var(--neutral-900); text-align:center;">Kelola Mahasiswa</span>
                        </button>
                        <button class="admin-action-card" style="display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; padding:20px; background:white; border:1px solid var(--neutral-200); border-radius:12px; cursor:pointer; transition:all 0.2s;" onclick="AdminDashboard.exportAllResults()">
                            <div class="admin-action-icon success" style="width:64px; height:64px; display:flex; align-items:center; justify-content:center; border-radius:12px; background:var(--success-light); color:var(--success); font-size:32px;">${Components.icons.download}</div>
                            <span style="font-size:14px; font-weight:600; color:var(--neutral-900); text-align:center;">Export Data</span>
                        </button>
                    </div>
                </section>
            `;
        } else if (activePage === 'polling') {
            // Cek apakah sedang dalam mode edit
            if (this.editPollState.isEditing && this.editPollState.editingPollId) {
                pageContent = this.renderEditPolling(this.editPollState.editingPollId);
            } else {
                pageContent = this.renderPollingList();
            }
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
        } else if (activePage === 'history' || activePage === 'riwayat') {
            pageContent = `
                <section class="admin-section animate-fadeInUp">
                    <div class="section-header-row" style="margin-bottom:20px; gap:16px;">
                        <h2 class="section-title-sm">📋 Catatan Voting</h2>
                        <div style="display:flex; gap:12px; align-items:center;">
                            <input class="form-input" style="width:220px;" placeholder="Cari nama pemilih atau polling" />
                            <select class="form-input" style="width:180px;">
                                <option>Semua Polling</option>
                                <option>Pemilihan Ketua BEM 2024</option>
                                <option>Proposal Kegiatan Semester</option>
                                <option>Pemilihan Ketua Himpunan</option>
                            </select>
                        </div>
                    </div>

                    <div class="table-container">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Nama Pemilih</th>
                                    <th>Polling</th>
                                    <th>Pilihan</th>
                                    <th>Waktu Voting</th>
                                    <th>Status</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${AdminDashboard.voteLogs.map((log, i) => `
                                    <tr>
                                        <td>${log.name}</td>
                                        <td>${log.poll}</td>
                                        <td>${log.choice}</td>
                                        <td>${log.time}</td>
                                        <td><span class="badge badge-success badge-dot">${log.status}</span></td>
                                        <td>
                                            <div class="table-actions">
                                                <button class="btn btn-ghost btn-sm" title="Detail" onclick="AdminDashboard.showVoteDetail(${i})">📋</button>
                                            </div>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </section>

                ${Components.modal('voteDetailModal', 'Detail Mahasiswa', `
                    <div id="voteDetailContent"></div>
                `, `
                    <div class="modal-actions">
                        <button class="btn btn-outline" onclick="Components.closeModal('voteDetailModal')">Tutup</button>
                    </div>
                `)}
                <style>
                    /* Scoped styling for vote detail modal values */
                    #voteDetailModal .detail-value {
                        font-size: var(--text-sm);
                        font-weight: var(--font-normal);
                        color: var(--neutral-800);
                    }
                    #voteDetailModal .form-label {
                        font-size: 12px;
                        font-weight: var(--font-medium);
                        color: var(--neutral-600);
                        margin-bottom: 4px;
                    }
                </style>

                <section class="admin-section animate-fadeInUp stagger-1" style="margin-top:20px;">
                    <h2 class="section-title-sm">📊 Statistik Riwayat</h2>
                    <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:16px; margin-top:16px;">
                        <div class="card" style="padding:16px; border:1px solid var(--neutral-200); border-radius:12px; text-align:center;">
                            <p style="font-size:12px; color:var(--neutral-500); margin:0; text-transform:uppercase; font-weight:600;">Total Voting</p>
                            <p style="font-size:24px; font-weight:700; color:var(--primary); margin:8px 0 0 0;">1.089</p>
                        </div>
                        <div class="card" style="padding:16px; border:1px solid var(--neutral-200); border-radius:12px; text-align:center;">
                            <p style="font-size:12px; color:var(--neutral-500); margin:0; text-transform:uppercase; font-weight:600;">Hari Ini</p>
                            <p style="font-size:24px; font-weight:700; color:var(--success); margin:8px 0 0 0;">456</p>
                        </div>
                        <div class="card" style="padding:16px; border:1px solid var(--neutral-200); border-radius:12px; text-align:center;">
                            <p style="font-size:12px; color:var(--neutral-500); margin:0; text-transform:uppercase; font-weight:600;">Minggu Ini</p>
                            <p style="font-size:24px; font-weight:700; color:var(--warning); margin:8px 0 0 0;">823</p>
                        </div>
                        <div class="card" style="padding:16px; border:1px solid var(--neutral-200); border-radius:12px; text-align:center;">
                            <p style="font-size:12px; color:var(--neutral-500); margin:0; text-transform:uppercase; font-weight:600;">Tercatat</p>
                            <p style="font-size:24px; font-weight:700; color:var(--info); margin:8px 0 0 0;">100%</p>
                        </div>
                    </div>
                </section>
            `;
        } else if (activePage === 'hasil') {
            // Cek apakah sedang dalam mode detail
            if (this.hasilViewState.mode === 'detail' && this.hasilViewState.selectedPollId) {
                pageContent = this.renderHasilDetail(this.hasilViewState.selectedPollId);
            } else {
                pageContent = this.renderHasilList();
            }
        } else if (activePage === 'hasil-old-backup') {
            pageContent = `
                <header class="dashboard-header">
                    <div>
                        <h1 class="dashboard-title">📊 Hasil Voting</h1>
                        <p class="dashboard-subtitle">Lihat hasil voting</p>
                    </div>
                    <div style="display:flex; gap:12px;">
                        <button class="btn btn-outline" onclick="AdminDashboard.exportResults()">
                            ${Components.icons.download} Export
                        </button>
                        <button class="btn btn-primary" onclick="Router.navigate('/results')">
                            Lihat Detail Lengkap
                        </button>
                    </div>
                </header>

                <section class="admin-section animate-fadeInUp">
                    <div class="section-header-row" style="margin-bottom:20px;">
                        <h2 class="section-title-sm">📋 Ringkasan Hasil Voting</h2>
                        <select class="form-input" style="width:200px;" onchange="AdminDashboard.filterResultsByStatus(this.value)">
                            <option value="all">Semua Status</option>
                            <option value="active">Sedang Berlangsung</option>
                            <option value="closed">Selesai</option>
                        </select>
                    </div>
                    
                    <div class="table-container">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Nama Polling</th>
                                    <th>Status</th>
                                    <th>Total Suara</th>
                                    <th>Partisipasi</th>
                                    <th>Pemenang Sementara</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${this.recentPolls.map(poll => {
                                    const totalVoters = 1500; // Total mahasiswa yang berhak vote
                                    const participation = Math.round((poll.votes / totalVoters) * 100);
                                    const leader = poll.status === 'draft' ? '-' : 'Kandidat #1';
                                    
                                    return `
                                        <tr>
                                            <td>
                                                <div style="font-weight:500;">${poll.title}</div>
                                                <div style="font-size:12px; color:var(--neutral-500);">Dibuat: ${poll.created}</div>
                                            </td>
                                            <td>
                                                <span class="badge ${this.getStatusBadgeClass(poll.status)} badge-dot">
                                                    ${this.getStatusLabel(poll.status)}
                                                </span>
                                            </td>
                                            <td>
                                                <div style="font-weight:500;">${poll.votes.toLocaleString('id-ID')}</div>
                                                <div style="font-size:12px; color:var(--neutral-500);">dari ${totalVoters.toLocaleString('id-ID')}</div>
                                            </td>
                                            <td>
                                                <div style="display:flex; align-items:center; gap:8px;">
                                                    <div style="flex:1; height:6px; background:var(--neutral-200); border-radius:3px; overflow:hidden;">
                                                        <div style="width:${participation}%; height:100%; background:var(--primary); transition:width 0.3s;"></div>
                                                    </div>
                                                    <span style="font-size:13px; font-weight:500; min-width:40px;">${participation}%</span>
                                                </div>
                                            </td>
                                            <td>
                                                ${poll.status === 'draft' ? 
                                                    '<span style="color:var(--neutral-400);">Belum dimulai</span>' : 
                                                    `<span style="font-weight:500;">${leader}</span>`
                                                }
                                            </td>
                                            <td>
                                                <div class="table-actions">
                                                    <button class="btn btn-ghost btn-sm" title="Lihat Detail" onclick="Router.navigate('/results/${poll.id}')">
                                                        📊
                                                    </button>
                                                    <button class="btn btn-ghost btn-sm" title="Export" onclick="AdminDashboard.exportSingleResult(${poll.id})">
                                                        💾
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                </section>

                <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-top:20px;">
                    <section class="admin-section animate-fadeInUp stagger-1">
                        <h2 class="section-title-sm" style="margin-bottom:16px;">🏆 Top Polling (Berdasarkan Partisipasi)</h2>
                        <div style="display:flex; flex-direction:column; gap:12px;">
                            ${this.recentPolls
                                .sort((a, b) => b.votes - a.votes)
                                .slice(0, 3)
                                .map((poll, index) => {
                                    const totalVoters = 1500;
                                    const participation = Math.round((poll.votes / totalVoters) * 100);
                                    const medals = ['🥇', '🥈', '🥉'];
                                    
                                    return `
                                        <div class="card" style="padding:16px; border:1px solid var(--neutral-200); border-radius:12px; display:flex; align-items:center; gap:12px;">
                                            <div style="font-size:24px;">${medals[index]}</div>
                                            <div style="flex:1;">
                                                <div style="font-weight:500; margin-bottom:4px;">${poll.title}</div>
                                                <div style="font-size:12px; color:var(--neutral-500);">
                                                    ${poll.votes.toLocaleString('id-ID')} suara • ${participation}% partisipasi
                                                </div>
                                            </div>
                                            <button class="btn btn-outline btn-sm" onclick="Router.navigate('/results/${poll.id}')">
                                                Lihat
                                            </button>
                                        </div>
                                    `;
                                }).join('')}
                        </div>
                    </section>

                    <section class="admin-section animate-fadeInUp stagger-2">
                        <h2 class="section-title-sm" style="margin-bottom:16px;">📈 Statistik Keseluruhan</h2>
                        <div style="display:flex; flex-direction:column; gap:16px;">
                            <div style="display:flex; justify-content:space-between; align-items:center; padding:12px; background:var(--primary-50); border-radius:8px;">
                                <div>
                                    <div style="font-size:13px; color:var(--neutral-600);">Total Voting Selesai</div>
                                    <div style="font-size:24px; font-weight:700; color:var(--primary);">
                                        ${this.recentPolls.filter(p => p.status === 'closed').length}
                                    </div>
                                </div>
                                <div style="font-size:32px;">✅</div>
                            </div>
                            
                            <div style="display:flex; justify-content:space-between; align-items:center; padding:12px; background:var(--success-light); border-radius:8px;">
                                <div>
                                    <div style="font-size:13px; color:var(--neutral-600);">Voting Aktif</div>
                                    <div style="font-size:24px; font-weight:700; color:var(--success);">
                                        ${this.recentPolls.filter(p => p.status === 'active').length}
                                    </div>
                                </div>
                                <div style="font-size:32px;">🔄</div>
                            </div>
                            
                            <div style="display:flex; justify-content:space-between; align-items:center; padding:12px; background:var(--warning-light); border-radius:8px;">
                                <div>
                                    <div style="font-size:13px; color:var(--neutral-600);">Draft</div>
                                    <div style="font-size:24px; font-weight:700; color:var(--warning);">
                                        ${this.recentPolls.filter(p => p.status === 'draft').length}
                                    </div>
                                </div>
                                <div style="font-size:32px;">📝</div>
                            </div>
                            
                            <div style="display:flex; justify-content:space-between; align-items:center; padding:12px; background:var(--info-light); border-radius:8px;">
                                <div>
                                    <div style="font-size:13px; color:var(--neutral-600);">Total Suara Terkumpul</div>
                                    <div style="font-size:24px; font-weight:700; color:var(--info);">
                                        ${this.recentPolls.reduce((sum, poll) => sum + poll.votes, 0).toLocaleString('id-ID')}
                                    </div>
                                </div>
                                <div style="font-size:32px;">🗳️</div>
                            </div>
                        </div>
                    </section>
                </div>
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
                <section class="admin-section animate-fadeInUp">
                    <div class="section-header-row">
                        <h2 class="section-title-sm">📋 Daftar Mahasiswa</h2>
                        <div style="display:flex; gap:8px; align-items:center;">
                            <input class="form-input" style="width:220px; font-size:var(--text-sm);" placeholder="Cari nama atau NIM" />
                            <select class="form-input" style="width:160px; font-size:var(--text-sm);">
                                <option>Semua Fakultas</option>
                                <option>Teknik</option>
                                <option>Ekonomi</option>
                                <option>Hukum</option>
                                <option>Sastra</option>
                            </select>
                            <select class="form-input" style="width:160px; font-size:var(--text-sm);">
                                <option>Semua Status</option>
                                <option>Aktif</option>
                                <option>Verifikasi</option>
                                <option>Nonaktif</option>
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
                                    <th>Angkatan</th>
                                    <th>Status</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${this.students.map((student, i) => `
                                    <tr>
                                        <td><span class="font-medium">${student.name}</span></td>
                                        <td>${student.nim}</td>
                                        <td>${student.faculty}</td>
                                        <td>${student.major}</td>
                                        <td>${student.year}</td>
                                        <td><span class="badge ${this.getStudentStatusBadge(student.status)} badge-dot">${student.status}</span></td>
                                        <td class="table-actions">
                                            <button class="btn btn-ghost btn-sm" title="Detail" onclick="AdminDashboard.showStudentDetail(${i})">📋</button>
                                            <button class="btn btn-ghost btn-sm" title="Edit" onclick="AdminDashboard.showEditStudent(${i})">✏️</button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </section>

                ${Components.modal('studentDetailModal', 'Detail Mahasiswa', `
                    <div id="studentDetailContent"></div>
                `, `
                    <div class="modal-actions">
                        <button class="btn btn-outline" onclick="Components.closeModal('studentDetailModal')">Tutup</button>
                    </div>
                `)}

                ${Components.modal('editStudentModal', 'Edit Mahasiswa', `
                    <div id="editStudentContent"></div>
                `, `
                    <div class="modal-actions">
                        <button class="btn btn-outline" onclick="Components.closeModal('editStudentModal')">Batal</button>
                        <button class="btn btn-primary" onclick="AdminDashboard.saveStudentEdit()">Simpan</button>
                    </div>
                `)}

                <style>
                    #studentDetailModal .detail-value,
                    #editStudentModal .detail-value {
                        font-size: var(--text-sm);
                        font-weight: var(--font-normal);
                        color: var(--neutral-800);
                    }
                </style>
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

    // Method untuk render list hasil voting
    renderHasilList() {
        return `
            <section class="admin-section animate-fadeInUp">
                <div class="section-header-row" style="margin-bottom:20px;">
                    <h2 class="section-title-sm">📋 Ringkasan Hasil Voting</h2>
                </div>
                
                <div class="table-container">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Nama Polling</th>
                                <th>Status</th>
                                <th>Total Suara</th>
                                <th>Partisipasi</th>
                                <th>Pemenang Sementara</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.recentPolls.map(poll => {
                                const totalVoters = 1500;
                                const participation = Math.round((poll.votes / totalVoters) * 100);
                                const leader = poll.status === 'draft' ? '-' : 'Kandidat #1';
                                
                                return `
                                    <tr>
                                        <td>
                                            <div style="font-weight:500;">${poll.title}</div>
                                            <div style="font-size:12px; color:var(--neutral-500);">Dibuat: ${poll.created}</div>
                                        </td>
                                        <td>
                                            <span class="badge ${this.getStatusBadgeClass(poll.status)} badge-dot">
                                                ${this.getStatusLabel(poll.status)}
                                            </span>
                                        </td>
                                        <td>
                                            <div style="font-weight:500;">${poll.votes.toLocaleString('id-ID')}</div>
                                            <div style="font-size:12px; color:var(--neutral-500);">dari ${totalVoters.toLocaleString('id-ID')}</div>
                                        </td>
                                        <td>
                                            <div style="display:flex; align-items:center; gap:8px;">
                                                <div style="flex:1; height:6px; background:var(--neutral-200); border-radius:3px; overflow:hidden;">
                                                    <div style="width:${participation}%; height:100%; background:var(--primary); transition:width 0.3s;"></div>
                                                </div>
                                                <span style="font-size:13px; font-weight:500; min-width:40px;">${participation}%</span>
                                            </div>
                                        </td>
                                        <td>
                                            ${poll.status === 'draft' ? 
                                                '<span style="color:var(--neutral-400);">Belum dimulai</span>' : 
                                                `<span style="font-weight:500;">${leader}</span>`
                                            }
                                        </td>
                                        <td>
                                            <div class="table-actions">
                                                <button class="btn btn-ghost btn-sm" title="Lihat Detail" onclick="AdminDashboard.showHasilDetail(${poll.id})">
                                                    📊
                                                </button>
                                                <button class="btn btn-ghost btn-sm" title="Export" onclick="AdminDashboard.exportSingleResult(${poll.id})">
                                                    💾
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            </section>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-top:20px;">
                <section class="admin-section animate-fadeInUp stagger-1">
                    <h2 class="section-title-sm" style="margin-bottom:16px;">🏆 Top Polling (Berdasarkan Partisipasi)</h2>
                    <div style="display:flex; flex-direction:column; gap:12px;">
                        ${this.recentPolls
                            .sort((a, b) => b.votes - a.votes)
                            .slice(0, 3)
                            .map((poll, index) => {
                                const totalVoters = 1500;
                                const participation = Math.round((poll.votes / totalVoters) * 100);
                                const medals = ['🥇', '🥈', '🥉'];
                                
                                return `
                                    <div class="card" style="padding:16px; border:1px solid var(--neutral-200); border-radius:12px; display:flex; align-items:center; gap:12px;">
                                        <div style="font-size:24px;">${medals[index]}</div>
                                        <div style="flex:1;">
                                            <div style="font-weight:500; margin-bottom:4px;">${poll.title}</div>
                                            <div style="font-size:12px; color:var(--neutral-500);">
                                                ${poll.votes.toLocaleString('id-ID')} suara • ${participation}% partisipasi
                                            </div>
                                        </div>
                                        <button class="btn btn-outline btn-sm" onclick="AdminDashboard.showHasilDetail(${poll.id})">
                                            Lihat
                                        </button>
                                    </div>
                                `;
                            }).join('')}
                    </div>
                </section>

                <section class="admin-section animate-fadeInUp stagger-2">
                    <h2 class="section-title-sm" style="margin-bottom:16px;">📈 Statistik Keseluruhan</h2>
                    <div style="display:flex; flex-direction:column; gap:16px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; padding:12px; background:var(--primary-50); border-radius:8px;">
                            <div>
                                <div style="font-size:13px; color:var(--neutral-600);">Total Voting Selesai</div>
                                <div style="font-size:24px; font-weight:700; color:var(--primary);">
                                    ${this.recentPolls.filter(p => p.status === 'closed').length}
                                </div>
                            </div>
                            <div style="font-size:32px;">✅</div>
                        </div>
                        
                        <div style="display:flex; justify-content:space-between; align-items:center; padding:12px; background:var(--success-light); border-radius:8px;">
                            <div>
                                <div style="font-size:13px; color:var(--neutral-600);">Voting Aktif</div>
                                <div style="font-size:24px; font-weight:700; color:var(--success);">
                                    ${this.recentPolls.filter(p => p.status === 'active').length}
                                </div>
                            </div>
                            <div style="font-size:32px;">🔄</div>
                        </div>
                        
                        <div style="display:flex; justify-content:space-between; align-items:center; padding:12px; background:var(--warning-light); border-radius:8px;">
                            <div>
                                <div style="font-size:13px; color:var(--neutral-600);">Draft</div>
                                <div style="font-size:24px; font-weight:700; color:var(--warning);">
                                    ${this.recentPolls.filter(p => p.status === 'draft').length}
                                </div>
                            </div>
                            <div style="font-size:32px;">📝</div>
                        </div>
                        
                        <div style="display:flex; justify-content:space-between; align-items:center; padding:12px; background:var(--info-light); border-radius:8px;">
                            <div>
                                <div style="font-size:13px; color:var(--neutral-600);">Total Suara Terkumpul</div>
                                <div style="font-size:24px; font-weight:700; color:var(--info);">
                                    ${this.recentPolls.reduce((sum, poll) => sum + poll.votes, 0).toLocaleString('id-ID')}
                                </div>
                            </div>
                            <div style="font-size:32px;">🗳️</div>
                        </div>
                    </div>
                </section>
            </div>
        `;
    },

    // Method untuk render list polling
    renderPollingList() {
        return `
            <section class="admin-section animate-fadeInUp">
                <div class="section-header-row">
                    <h2 class="section-title-sm">📋 Daftar Polling</h2>
                    <div class="form-group" style="margin:0; display:flex; gap:8px; align-items:center;">
                        <input class="form-input" style="width:220px; font-size:var(--text-sm);" placeholder="Cari judul polling" />
                        <select class="form-input" style="width:160px; font-size:var(--text-sm);">
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
                                        <button class="btn btn-ghost btn-sm" title="Edit" onclick="AdminDashboard.startEditPolling(${poll.id})">✏️</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </section>
        `;
    },

    // Method untuk render form edit polling
    renderEditPolling(pollId) {
        const poll = this.recentPolls.find(p => p.id === pollId);
        if (!poll) return this.renderPollingList();

        return `
            <header class="dashboard-header">
                <button class="btn btn-ghost" onclick="AdminDashboard.cancelEditPolling()" style="padding:8px 12px;">
                    ← Kembali
                </button>
                <button class="btn btn-primary" onclick="AdminDashboard.saveEditPolling(${pollId})">
                    💾 Simpan Perubahan
                </button>
            </header>

            <section class="admin-section animate-fadeInUp">
                <h1 class="dashboard-title" style="margin-bottom:24px;">✏️ Edit Polling: ${poll.title}</h1>
                
                <div style="display:grid; grid-template-columns:2fr 1fr; gap:24px;">
                    <div>
                        <div class="form-group">
                            <label class="form-label">Judul Polling</label>
                            <input class="form-input" id="editTitle" value="${poll.title}" placeholder="Judul polling" />
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Deskripsi</label>
                            <textarea class="form-input" id="editDesc" rows="4" placeholder="Deskripsikan tujuan polling">Polling tentang ${poll.title}</textarea>
                        </div>
                        
                        <div class="form-group" style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                            <div>
                                <label class="form-label">Tanggal Mulai</label>
                                <input type="date" class="form-input" id="editStartDate" />
                            </div>
                            <div>
                                <label class="form-label">Tanggal Selesai</label>
                                <input type="date" class="form-input" id="editEndDate" />
                            </div>
                        </div>

                        <div class="form-group" style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                            <div>
                                <label class="form-label">Visibilitas</label>
                                <select class="form-input" id="editVisibility">
                                    <option>Semua Mahasiswa</option>
                                    <option>Fakultas Tertentu</option>
                                    <option>Program Studi Tertentu</option>
                                </select>
                            </div>
                            <div>
                                <label class="form-label">Metode Vote</label>
                                <select class="form-input" id="editMethod">
                                    <option>Single Choice</option>
                                    <option>Multiple Choice</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="form-label">Kandidat/Pilihan</label>
                            <div style="display:flex; gap:8px; margin-bottom:12px;">
                                <input class="form-input" id="newCandidate" style="flex:1;" placeholder="Nama kandidat" />
                                <button class="btn btn-outline" onclick="AdminDashboard.addCandidate()">Tambah</button>
                            </div>
                            <div id="candidatesList" style="display:flex; flex-direction:column; gap:8px;">
                                <div class="card" style="padding:10px; border:1px solid var(--neutral-200); border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
                                    <span>Ahmad Rizki</span>
                                    <button class="btn btn-ghost btn-sm">Hapus</button>
                                </div>
                                <div class="card" style="padding:10px; border:1px solid var(--neutral-200); border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
                                    <span>Siti Nurhaliza</span>
                                    <button class="btn btn-ghost btn-sm">Hapus</button>
                                </div>
                            </div>
                        </div>

                        <div class="form-group" style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
                            <label class="form-check"><input type="checkbox" class="form-check-input" /> <span class="form-check-label">Acak urutan kandidat</span></label>
                            <label class="form-check"><input type="checkbox" class="form-check-input" /> <span class="form-check-label">Perlu konfirmasi sebelum kirim</span></label>
                        </div>

                        <div style="display:flex; gap:12px; justify-content:flex-end; margin-top:20px;">
                            <button class="btn btn-outline" onclick="AdminDashboard.cancelEditPolling()">Batal</button>
                            <button class="btn btn-primary" onclick="AdminDashboard.saveEditPolling(${pollId})">Simpan Perubahan</button>
                        </div>
                    </div>

                    <div>
                        <div class="card" style="padding:16px; border:1px solid var(--neutral-200); border-radius:12px;">
                            <h3 class="section-title-sm" style="margin-bottom:12px;">Status Polling</h3>
                            <div style="display:flex; flex-direction:column; gap:12px;">
                                <div>
                                    <p style="font-size:12px; color:var(--neutral-500); margin:0; font-weight:600;">Status Saat Ini</p>
                                    <p style="font-size:14px; margin:4px 0 0 0;">
                                        <span class="badge ${this.getStatusBadgeClass(poll.status)} badge-dot">
                                            ${this.getStatusLabel(poll.status)}
                                        </span>
                                    </p>
                                </div>
                                <div>
                                    <p style="font-size:12px; color:var(--neutral-500); margin:0; font-weight:600;">Total Suara</p>
                                    <p style="font-size:18px; font-weight:700; margin:4px 0 0 0;">
                                        ${poll.votes.toLocaleString('id-ID')}
                                    </p>
                                </div>
                                <div>
                                    <p style="font-size:12px; color:var(--neutral-500); margin:0; font-weight:600;">Dibuat Pada</p>
                                    <p style="font-size:14px; margin:4px 0 0 0;">${poll.created}</p>
                                </div>
                            </div>
                            
                            <div style="margin-top:16px; padding-top:16px; border-top:1px solid var(--neutral-200);">
                                <p style="font-size:12px; color:var(--neutral-600); margin:0; line-height:1.6;">
                                    💡 <strong>Tips:</strong> Anda hanya bisa mengubah polling yang masih dalam status Draft. Untuk polling Aktif atau Selesai, hanya informasi yang bisa diubah.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    },
    // Method untuk render detail hasil voting
    renderHasilDetail(pollId) {
        const poll = this.recentPolls.find(p => p.id === pollId);
        if (!poll) return this.renderHasilList();

        // Data kandidat dummy
        const candidates = [
            { id: 1, name: 'Ahmad Rizki', votes: 490, percentage: 45, initials: 'AR', color: '#6366F1' },
            { id: 2, name: 'Siti Nurhaliza', votes: 380, percentage: 35, initials: 'SN', color: '#10B981' },
            { id: 3, name: 'Budi Santoso', votes: 219, percentage: 20, initials: 'BS', color: '#F59E0B' }
        ];

        const totalVotes = poll.votes;
        const totalEligible = 1200;
        const participationRate = Math.round((totalVotes / totalEligible) * 100);

        return `
            <header class="dashboard-header">
                <button class="btn btn-ghost" onclick="AdminDashboard.backToHasilList()" style="padding:8px 12px;">
                    ← Kembali
                </button>
                <button class="btn btn-outline" onclick="AdminDashboard.exportSingleResult(${pollId})">
                    ${Components.icons.download} Export
                </button>
            </header>

            <section class="admin-section animate-fadeInUp">
                <div style="margin-bottom:12px;">
                    <span class="badge ${this.getStatusBadgeClass(poll.status)} badge-dot">
                        ${this.getStatusLabel(poll.status).toUpperCase()}
                    </span>
                </div>
                <h1 class="dashboard-title" style="margin-bottom:8px;">📊 Hasil: ${poll.title}</h1>
                
                <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:20px; margin-top:24px;">
                    <div>
                        <div style="font-size:32px; font-weight:700; color:var(--primary);">${totalVotes.toLocaleString('id-ID')}</div>
                        <div style="font-size:14px; color:var(--neutral-600);">Total Suara</div>
                    </div>
                    <div>
                        <div style="font-size:32px; font-weight:700; color:var(--primary);">${totalEligible.toLocaleString('id-ID')}</div>
                        <div style="font-size:14px; color:var(--neutral-600);">Total Pemilih Eligible</div>
                    </div>
                    <div>
                        <div style="font-size:32px; font-weight:700; color:var(--primary);">${participationRate}%</div>
                        <div style="font-size:14px; color:var(--neutral-600);">Tingkat Partisipasi</div>
                    </div>
                </div>
            </section>

            ${poll.status !== 'draft' ? `
                <section class="admin-section animate-fadeInUp stagger-1" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color:white; padding:32px; margin-top:20px;">
                    <div style="display:flex; align-items:center; justify-content:space-between;">
                        <div style="display:flex; align-items:center; gap:24px;">
                            <div style="width:80px; height:80px; border-radius:50%; background:rgba(255,255,255,0.2); backdrop-filter:blur(10px); display:flex; align-items:center; justify-content:center; font-size:32px; font-weight:700; border:3px solid rgba(255,255,255,0.3);">
                                ${candidates[0].initials}
                            </div>
                            <div>
                                <div style="display:inline-block; padding:4px 12px; background:rgba(255,255,255,0.2); border-radius:20px; font-size:12px; font-weight:600; margin-bottom:8px;">
                                    🏆 PEMENANG
                                </div>
                                <h2 style="font-size:32px; font-weight:700; margin:0;">${candidates[0].name}</h2>
                                <div style="font-size:28px; font-weight:700; margin-top:4px;">${candidates[0].votes.toLocaleString('id-ID')} <span style="font-size:18px; font-weight:400;">suara (${candidates[0].percentage}%)</span></div>
                            </div>
                        </div>
                        <div style="font-size:64px;">🎉</div>
                    </div>
                </section>
            ` : ''}

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-top:20px;">
                <section class="admin-section animate-fadeInUp stagger-2">
                    <h2 class="section-title-sm">Distribusi Suara</h2>
                    <div style="margin-top:20px; display:flex; justify-content:center;">
                        <canvas id="distributionChart" width="300" height="300"></canvas>
                    </div>
                </section>

                <section class="admin-section animate-fadeInUp stagger-3">
                    <h2 class="section-title-sm">Perolehan Suara</h2>
                    <div style="display:flex; flex-direction:column; gap:16px; margin-top:20px;">
                        ${candidates.map(candidate => `
                            <div>
                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                                    <div style="display:flex; align-items:center; gap:12px;">
                                        <div style="width:40px; height:40px; border-radius:50%; background:${candidate.color}; display:flex; align-items:center; justify-content:center; color:white; font-weight:600; font-size:14px;">
                                            ${candidate.initials}
                                        </div>
                                        <span style="font-weight:500;">${candidate.name}</span>
                                    </div>
                                    <span style="font-weight:600;">${candidate.votes.toLocaleString('id-ID')}</span>
                                </div>
                                <div style="height:32px; background:var(--neutral-200); border-radius:6px; overflow:hidden;">
                                    <div style="width:${candidate.percentage}%; height:100%; background:${candidate.color}; transition:width 0.5s; display:flex; align-items:center; justify-content:flex-end; padding-right:8px;">
                                        <span style="color:white; font-weight:600; font-size:14px;">${candidate.percentage}%</span>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </section>
            </div>

            <style>
                .dashboard-title {
                    font-size: var(--text-2xl);
                    font-weight: var(--font-bold);
                    color: var(--neutral-900);
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
        setTimeout(() => {
            this.initTrendChart();
            this.initDistributionChart();
        }, 100);
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

    initDistributionChart() {
        const ctx = document.getElementById('distributionChart');
        if (!ctx) return;

        // Data kandidat untuk pie chart
        const candidates = [
            { name: 'Ahmad Rizki', votes: 490, color: '#6366F1' },
            { name: 'Siti Nurhaliza', votes: 380, color: '#10B981' },
            { name: 'Budi Santoso', votes: 219, color: '#F59E0B' }
        ];

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: candidates.map(c => c.name),
                datasets: [{
                    data: candidates.map(c => c.votes),
                    backgroundColor: candidates.map(c => c.color),
                    borderWidth: 0,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                cutout: '60%',
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((value / total) * 100);
                                return label + ': ' + value.toLocaleString('id-ID') + ' (' + percentage + '%)';
                            }
                        }
                    }
                }
            }
        });
    },

    exportAllResults() {
        Components.showToast('Export', 'Semua data sedang di-export...', 'info');
    },

    exportResults() {
        Components.showToast('Export', 'Data hasil voting sedang di-export...', 'info');
    },

    exportSingleResult(pollId) {
        Components.showToast('Export', `Export data polling #${pollId}...`, 'info');
    },

    filterResultsByStatus(status) {
        console.log('Filter by status:', status);
        Components.showToast('Filter', `Menampilkan polling: ${status}`, 'info');
    },

    showHasilDetail(pollId) {
        this.hasilViewState.mode = 'detail';
        this.hasilViewState.selectedPollId = pollId;
        // Re-render halaman
        App.renderPage(AdminDashboard, ['hasil']);
    },

    backToHasilList() {
        this.hasilViewState.mode = 'list';
        this.hasilViewState.selectedPollId = null;
        // Re-render halaman
        App.renderPage(AdminDashboard, ['hasil']);
    },

    startEditPolling(pollId) {
        this.editPollState.isEditing = true;
        this.editPollState.editingPollId = pollId;
        // Re-render halaman
        App.renderPage(AdminDashboard, ['polling']);
    },

    cancelEditPolling() {
        this.editPollState.isEditing = false;
        this.editPollState.editingPollId = null;
        // Re-render halaman
        App.renderPage(AdminDashboard, ['polling']);
    },

    saveEditPolling(pollId) {
        const title = document.getElementById('editTitle')?.value;
        const desc = document.getElementById('editDesc')?.value;
        
        if (!title || !desc) {
            Components.showToast('Error', 'Judul dan deskripsi harus diisi', 'error');
            return;
        }
        
        Components.showToast('Sukses', 'Polling berhasil diperbarui!', 'success');
        this.cancelEditPolling();
    },

    addCandidate() {
        const input = document.getElementById('newCandidate');
        if (!input || !input.value) return;
        Components.showToast('Info', 'Kandidat ditambahkan', 'info');
        input.value = '';
    },

    exportRiwayat() {
        Components.showToast('Export', 'Data riwayat vote sedang di-export...', 'info');
    },

    // Tampilkan detail vote dalam modal
    showVoteDetail(index) {
        const log = this.voteLogs[index];
        if (!log) return;

        const html = `
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                <div>
                    <p class="form-label">Nama</p>
                    <p class="detail-value">${log.name}</p>
                </div>
                <div>
                    <p class="form-label">NIM</p>
                    <p class="detail-value">${log.nim || '-'}</p>
                </div>
                <div>
                    <p class="form-label">Email</p>
                    <p class="detail-value">${log.email || '-'}</p>
                </div>
                <div>
                    <p class="form-label">Fakultas</p>
                    <p class="detail-value">${log.faculty || '-'}</p>
                </div>
                <div>
                    <p class="form-label">Jurusan</p>
                    <p class="detail-value">${log.major || '-'}</p>
                </div>
                <div>
                    <p class="form-label">Polling</p>
                    <p class="detail-value">${log.poll}</p>
                </div>
                <div>
                    <p class="form-label">Pilihan</p>
                    <p class="detail-value">${log.choice}</p>
                </div>
                <div>
                    <p class="form-label">Waktu Voting</p>
                    <p class="detail-value">${log.time}</p>
                </div>
                <div>
                    <p class="form-label">Status</p>
                    <span class="badge badge-success badge-dot">${log.status}</span>
                </div>
            </div>
        `;

        const container = document.getElementById('voteDetailContent');
        if (container) container.innerHTML = html;
        Components.openModal('voteDetailModal');
    },

    // Get badge class for student status
    getStudentStatusBadge(status) {
        const statusMap = {
            'Aktif': 'badge-success',
            'Verifikasi': 'badge-warning',
            'Nonaktif': 'badge-danger'
        };
        return statusMap[status] || 'badge-neutral';
    },

    // Show student detail modal
    showStudentDetail(index) {
        const student = this.students[index];
        if (!student) return;

        const html = `
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                <div>
                    <p class="form-label">Nama Lengkap</p>
                    <p class="detail-value">${student.name}</p>
                </div>
                <div>
                    <p class="form-label">NIM</p>
                    <p class="detail-value">${student.nim}</p>
                </div>
                <div>
                    <p class="form-label">Email</p>
                    <p class="detail-value">${student.email}</p>
                </div>
                <div>
                    <p class="form-label">Fakultas</p>
                    <p class="detail-value">${student.faculty}</p>
                </div>
                <div>
                    <p class="form-label">Jurusan</p>
                    <p class="detail-value">${student.major}</p>
                </div>
                <div>
                    <p class="form-label">Angkatan</p>
                    <p class="detail-value">${student.year}</p>
                </div>
                <div>
                    <p class="form-label">Status</p>
                    <span class="badge ${this.getStudentStatusBadge(student.status)} badge-dot">${student.status}</span>
                </div>
            </div>
        `;

        const container = document.getElementById('studentDetailContent');
        if (container) container.innerHTML = html;
        Components.openModal('studentDetailModal');
    },

    // Show edit student modal
    showEditStudent(index) {
        const student = this.students[index];
        if (!student) return;

        const html = `
            <input type="hidden" id="editStudentIndex" value="${index}">
            <div style="display:grid; grid-template-columns:1fr; gap:12px;">
                <div class="form-group">
                    <label class="form-label">Nama Lengkap</label>
                    <input type="text" id="editStudentName" class="form-input" value="${student.name}">
                </div>
                <div class="form-group">
                    <label class="form-label">NIM</label>
                    <input type="text" id="editStudentNim" class="form-input" value="${student.nim}" disabled>
                </div>
                <div class="form-group">
                    <label class="form-label">Email</label>
                    <input type="email" id="editStudentEmail" class="form-input" value="${student.email}">
                </div>
                <div class="form-group">
                    <label class="form-label">Fakultas</label>
                    <select id="editStudentFaculty" class="form-input">
                        <option ${student.faculty === 'Teknik' ? 'selected' : ''}>Teknik</option>
                        <option ${student.faculty === 'Ekonomi' ? 'selected' : ''}>Ekonomi</option>
                        <option ${student.faculty === 'Hukum' ? 'selected' : ''}>Hukum</option>
                        <option ${student.faculty === 'Sastra' ? 'selected' : ''}>Sastra</option>
                        <option ${student.faculty === 'Sains' ? 'selected' : ''}>Sains</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Jurusan</label>
                    <input type="text" id="editStudentMajor" class="form-input" value="${student.major}">
                </div>
                <div class="form-group">
                    <label class="form-label">Angkatan</label>
                    <input type="text" id="editStudentYear" class="form-input" value="${student.year}">
                </div>
                <div class="form-group">
                    <label class="form-label">Status</label>
                    <select id="editStudentStatus" class="form-input">
                        <option ${student.status === 'Aktif' ? 'selected' : ''}>Aktif</option>
                        <option ${student.status === 'Verifikasi' ? 'selected' : ''}>Verifikasi</option>
                        <option ${student.status === 'Nonaktif' ? 'selected' : ''}>Nonaktif</option>
                    </select>
                </div>
            </div>
        `;

        const container = document.getElementById('editStudentContent');
        if (container) container.innerHTML = html;
        Components.openModal('editStudentModal');
    },

    // Save student edit
    saveStudentEdit() {
        const index = document.getElementById('editStudentIndex')?.value;
        if (index === null || index === undefined) return;

        const name = document.getElementById('editStudentName')?.value;
        const email = document.getElementById('editStudentEmail')?.value;
        const faculty = document.getElementById('editStudentFaculty')?.value;
        const major = document.getElementById('editStudentMajor')?.value;
        const year = document.getElementById('editStudentYear')?.value;
        const status = document.getElementById('editStudentStatus')?.value;

        if (!name || !email || !faculty || !major || !year || !status) {
            Components.showToast('Validasi', 'Semua field harus diisi', 'error');
            return;
        }

        this.students[index] = {
            ...this.students[index],
            name, email, faculty, major, year, status
        };

        Components.closeModal('editStudentModal');
        Components.showToast('Berhasil', 'Data mahasiswa berhasil diperbarui', 'success');
        Router.navigate('/admin/students');
    }
};
