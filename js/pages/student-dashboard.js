// ============================================
// VoteKampus - Student Dashboard Page
// ============================================

const StudentDashboard = {
    // Demo polling data
    polls: [
        {
            id: 1,
            title: 'Pemilihan Ketua BEM 2024',
            description: 'Pemilihan Ketua Badan Eksekutif Mahasiswa periode 2024-2025',
            status: 'active',
            startDate: '23 Des 2024',
            endDate: '25 Des 2024',
            remainingDays: 2,
            totalVotes: 456,
            totalEligible: 1200,
            hasVoted: false,
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        {
            id: 2,
            title: 'Proposal Kegiatan Semester Genap',
            description: 'Voting untuk menentukan kegiatan prioritas semester genap',
            status: 'active',
            startDate: '20 Des 2024',
            endDate: '22 Des 2024',
            remainingDays: 0,
            totalVotes: 1089,
            totalEligible: 1200,
            hasVoted: true,
            gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'
        },
        {
            id: 3,
            title: 'Pemilihan Ketua Himpunan Teknik',
            description: 'Pemilihan Ketua Himpunan Mahasiswa Teknik Informatika',
            status: 'closed',
            startDate: '15 Des 2024',
            endDate: '17 Des 2024',
            remainingDays: 0,
            totalVotes: 234,
            totalEligible: 300,
            hasVoted: true,
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        }
    ],

    render(params = []) {
        const activePage = params[0] || 'dashboard';

        const user = Auth.getUser();
        const activePolls = this.polls.filter(p => p.status === 'active');
        const votedCount = this.polls.filter(p => p.hasVoted).length;
        const pendingCount = activePolls.filter(p => !p.hasVoted).length;

        return `
            <div class="dashboard-layout">
                ${Components.sidebar('student', activePage)}
                
                <main class="dashboard-main">
                   ${
                        activePage === 'dashboard' ? `
                        <header class="dashboard-header">
                        <div>
                            <h1 class="dashboard-title">👋 Selamat Datang, ${user?.name?.split(' ')[0] || 'Mahasiswa'}!</h1>
                            <p class="dashboard-subtitle">Lihat dan kelola voting Anda di sini</p>
                        </div>
                        <button class="btn btn-primary hide-mobile" onclick="Router.navigate('/polling')">
                            ${Components.icons.poll}
                            Lihat Semua Polling
                        </button>
                    </header>
                    
                    <!-- Stats Overview -->
                    <section class="stats-grid animate-fadeInUp">
                        ${Components.statCard(activePolls.length, 'Polling Aktif', 'poll', 'primary')}
                        ${Components.statCard(votedCount, 'Sudah Vote', 'check', 'success')}
                        ${Components.statCard(pendingCount, 'Belum Vote', 'clock', 'warning')}
                        ${Components.statCard(Math.round((votedCount / this.polls.length) * 100) + '%', 'Partisipasi Anda', 'chart', 'info')}
                    </section>
                    
                    <!-- Quick Actions -->
                    <section class="quick-actions mb-8">
                        <h2 class="section-title-sm">⚡ Aksi Cepat</h2>
                        <div class="actions-grid">
                            ${pendingCount > 0 ? `
                                <button class="action-card action-vote" onclick="Router.navigate('/polling')">
                                    <div class="action-icon">${Components.icons.poll}</div>
                                    <div class="action-content">
                                        <span class="action-title">Vote Sekarang</span>
                                        <span class="action-desc">${pendingCount} polling menunggu</span>
                                    </div>
                                    ${Components.icons.arrowRight}
                                </button>
                            ` : ''}
                            <button class="action-card" onclick="Router.navigate('/history')">
                                <div class="action-icon">${Components.icons.history}</div>
                                <div class="action-content">
                                    <span class="action-title">Riwayat Vote</span>
                                    <span class="action-desc">Lihat voting Anda</span>
                                </div>
                                ${Components.icons.arrowRight}
                            </button>
                            <button class="action-card" onclick="Router.navigate('/results')">
                                <div class="action-icon">${Components.icons.chart}</div>
                                <div class="action-content">
                                    <span class="action-title">Hasil Voting</span>
                                    <span class="action-desc">Lihat hasil real-time</span>
                                </div>
                                ${Components.icons.arrowRight}
                            </button>
                        </div>
                    </section>
                    
                    <!-- Active Polls -->
                    <section class="polls-section">
                        <div class="section-header-row">
                            <h2 class="section-title-sm">🗳️ Polling Aktif</h2>
                            <a href="#/polling" class="view-all-link">
                                Lihat Semua ${Components.icons.arrowRight}
                            </a>
                        </div>
                        
                        ${activePolls.length > 0 ? `
                            <div class="polls-grid">
                                ${activePolls.map((poll, index) => `
                                    <div class="animate-fadeInUp stagger-${index + 1}">
                                        ${Components.pollCard(poll)}
                                    </div>
                                `).join('')}
                            </div>
                        ` : `
                            ${Components.emptyState(
            'Tidak Ada Polling Aktif',
            'Saat ini tidak ada polling yang sedang berlangsung. Cek kembali nanti!',
            null
        )}
                        `}
                    </section>
                    
                    <!-- Recent Activity -->
                    <section class="activity-section mt-8">
                        <h2 class="section-title-sm">📋 Aktivitas Terakhir</h2>
                        <div class="activity-card">
                            <div class="activity-list">
                                <div class="activity-item">
                                    <div class="activity-icon success">
                                        ${Components.icons.checkCircle}
                                    </div>
                                    <div class="activity-content">
                                        <span class="activity-title">Vote berhasil tercatat</span>
                                        <span class="activity-desc">Proposal Kegiatan Semester Genap</span>
                                    </div>
                                    <span class="activity-time">2 jam lalu</span>
                                </div>
                                <div class="activity-item">
                                    <div class="activity-icon primary">
                                        ${Components.icons.poll}
                                    </div>
                                    <div class="activity-content">
                                        <span class="activity-title">Polling baru tersedia</span>
                                        <span class="activity-desc">Pemilihan Ketua BEM 2024</span>
                                    </div>
                                    <span class="activity-time">1 hari lalu</span>
                                </div>
                                <div class="activity-item">
                                    <div class="activity-icon success">
                                        ${Components.icons.checkCircle}
                                    </div>
                                    <div class="activity-content">
                                        <span class="activity-title">Vote berhasil tercatat</span>
                                        <span class="activity-desc">Pemilihan Ketua Himpunan Teknik</span>
                                    </div>
                                    <span class="activity-time">3 hari lalu</span>
                                </div>
                            </div>
                        </div>
                    </section>
			    ` : activePage === 'polling' ? `
                        <header class="dashboard-header">
                            <div>
                                <h1 class="dashboard-title">🗳️ Polling Aktif</h1>
                                <p class="dashboard-subtitle">Daftar polling yang sedang berlangsung</p>
                            </div>
                        </header>
                        
                        <!-- Filter Tabs -->
                        <div class="filter-tabs mb-6">
                            <button class="filter-tab active" data-filter="all">
                                Semua (${this.polls.filter(p => p.status === 'active').length})
                            </button>
                            <button class="filter-tab" data-filter="pending">
                                Belum Vote (${activePolls.filter(p => !p.hasVoted).length})
                            </button>
                            <button class="filter-tab" data-filter="voted">
                                Sudah Vote (${activePolls.filter(p => p.hasVoted).length})
                            </button>
                        </div>
                        
                        <!-- Active Polls List -->
                        ${activePolls.length > 0 ? `
                            <div class="polls-list">
                                ${activePolls.map((poll, index) => `
                                    <div class="poll-item-card animate-fadeInUp stagger-${index + 1}" data-voted="${poll.hasVoted}">
                                        <div class="poll-item-header" style="background: ${poll.gradient}">
                                            <div class="poll-item-badge">
                                                ${poll.hasVoted ? 
                                                    `<span class="badge badge-success">
                                                        ${Components.icons.checkCircle} Sudah Vote
                                                    </span>` :
                                                    `<span class="badge badge-warning">
                                                        ${Components.icons.clock} Belum Vote
                                                    </span>`
                                                }
                                            </div>
                                            ${poll.remainingDays > 0 ? `
                                                <div class="poll-item-timer">
                                                    ${Components.icons.clock}
                                                    <span>${poll.remainingDays} hari lagi</span>
                                                </div>
                                            ` : `
                                                <div class="poll-item-timer urgent">
                                                    ${Components.icons.alert}
                                                    <span>Berakhir hari ini!</span>
                                                </div>
                                            `}
                                        </div>
                                        
                                        <div class="poll-item-body">
                                            <h3 class="poll-item-title">${poll.title}</h3>
                                            <p class="poll-item-description">${poll.description}</p>
                                            
                                            <div class="poll-item-meta">
                                                <div class="poll-meta-item">
                                                    ${Components.icons.calendar}
                                                    <span>${poll.startDate} - ${poll.endDate}</span>
                                                </div>
                                                <div class="poll-meta-item">
                                                    ${Components.icons.users}
                                                    <span>${poll.totalVotes} / ${poll.totalEligible} vote</span>
                                                </div>
                                            </div>
                                            
                                            <!-- Progress Bar -->
                                            <div class="poll-progress">
                                                <div class="poll-progress-bar">
                                                    <div class="poll-progress-fill" style="width: ${(poll.totalVotes / poll.totalEligible * 100).toFixed(1)}%"></div>
                                                </div>
                                                <span class="poll-progress-text">${(poll.totalVotes / poll.totalEligible * 100).toFixed(1)}% partisipasi</span>
                                            </div>
                                            
                                            <div class="poll-item-actions">
                                                ${!poll.hasVoted ? `
                                                    <button class="btn btn-primary btn-block" onclick="Router.navigate('/vote/${poll.id}')">
                                                        ${Components.icons.poll}
                                                        Vote Sekarang
                                                    </button>
                                                ` : `
                                                    <button class="btn btn-outline btn-block" onclick="Router.navigate('/results/${poll.id}')">
                                                        ${Components.icons.chart}
                                                        Lihat Hasil
                                                    </button>
                                                `}
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        ` : `
                            ${Components.emptyState(
                                'Tidak Ada Polling Aktif',
                                'Saat ini tidak ada polling yang sedang berlangsung. Cek kembali nanti!',
                                null
                            )}
                        `}
                    ` : activePage === 'history' ? `
                        <header class="dashboard-header">
                            <div>
                                <h1 class="dashboard-title">📜 Riwayat Vote</h1>
                                <p class="dashboard-subtitle">Catatan vote yang pernah Anda lakukan</p>
                            </div>
                        </header>

                        <section class="stats-grid animate-fadeInUp">
                            ${Components.statCard(this.polls.filter(p => p.hasVoted).length, 'Total Vote', 'check', 'success')}
                            ${Components.statCard(this.polls.filter(p => p.status === 'closed' && p.hasVoted).length, 'Polling Selesai', 'poll', 'primary')}
                            ${Components.statCard(this.polls.filter(p => p.status === 'active' && p.hasVoted).length, 'Aktif (Sudah Vote)', 'history', 'info')}
                            ${Components.statCard(this.polls.length, 'Total Polling', 'chart', 'warning')}
                        </section>

                        <section class="history-section">
                            <h2 class="section-title-sm">🕑 Timeline Riwayat</h2>
                            ${this.polls.filter(p => p.hasVoted).length > 0 ? `
                                <div class="history-list">
                                    ${this.polls
                                        .filter(p => p.hasVoted)
                                        .sort((a,b) => (a.status === 'active' ? -1 : 1))
                                        .map((poll, index) => `
                                            <div class="history-item animate-fadeInUp stagger-${index + 1}">
                                                <div class="history-line">
                                                    <span class="history-dot ${poll.status === 'closed' ? 'done' : 'active'}"></span>
                                                </div>
                                                <div class="history-card">
                                                    <div class="history-card-header">
                                                        <div class="history-badges">
                                                            <span class="badge ${poll.status === 'closed' ? 'badge-danger' : 'badge-success'} badge-dot">
                                                                ${poll.status === 'closed' ? 'Selesai' : 'Aktif'}
                                                            </span>
                                                            <span class="badge badge-neutral">✓ Sudah Vote</span>
                                                        </div>
                                                        <div class="history-date">
                                                            ${Components.icons.calendar}
                                                            <span>${poll.startDate} - ${poll.endDate}</span>
                                                        </div>
                                                    </div>
                                                    <h3 class="history-title">${poll.title}</h3>
                                                    <p class="history-desc">${poll.description}</p>
                                                    <div class="history-meta">
                                                        <div class="history-meta-item">
                                                            ${Components.icons.users}
                                                            <span>${poll.totalVotes} / ${poll.totalEligible} vote</span>
                                                        </div>
                                                        ${poll.status === 'active' ? `
                                                            <div class="history-meta-item">
                                                                ${Components.icons.clock}
                                                                <span>Sisa ${poll.remainingDays} hari</span>
                                                            </div>
                                                        ` : ''}
                                                    </div>
                                                    <div class="history-actions">
                                                        <button class="btn btn-outline" onclick="Router.navigate('/results/${poll.id}')">
                                                            ${Components.icons.chart}
                                                            Lihat Hasil
                                                        </button>
                                                        <button class="btn btn-ghost" onclick="Router.navigate('/vote/${poll.id}')">
                                                            ${Components.icons.poll}
                                                            Buka Halaman Polling
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        `).join('')}
                                </div>
                            ` : `
                                ${Components.emptyState(
                                    'Belum ada riwayat',
                                    'Anda belum melakukan vote pada polling manapun.',
                                    { href: '#/polling', label: 'Lihat Polling Aktif' }
                                )}
                            `}
                        </section>
        		    ` : activePage === 'results' ? `
            			<h2>📊 Hasil Voting</h2>
            			<p>Halaman hasil voting.</p>
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
        		    ` : `
            			<h2>Dashboard</h2>
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
                
                .section-title-sm {
                    font-size: var(--text-lg);
                    font-weight: var(--font-bold);
                    color: var(--neutral-900);
                    margin-bottom: var(--space-4);
                }
                
                .section-header-row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: var(--space-4);
                }
                
                .view-all-link {
                    display: flex;
                    align-items: center;
                    gap: var(--space-2);
                    font-size: var(--text-sm);
                    font-weight: var(--font-medium);
                    color: var(--primary);
                    text-decoration: none;
                }
                
                .view-all-link:hover {
                    text-decoration: underline;
                }
                
                /* Quick Actions */
                .actions-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: var(--space-4);
                }
                
                .action-card {
                    display: flex;
                    align-items: center;
                    gap: var(--space-4);
                    padding: var(--space-5);
                    background: white;
                    border: 1px solid var(--neutral-200);
                    border-radius: var(--radius-xl);
                    cursor: pointer;
                    transition: all var(--transition-base);
                    text-align: left;
                }
                
                .action-card:hover {
                    border-color: var(--primary-light);
                    box-shadow: var(--shadow-md);
                    transform: translateX(4px);
                }
                
                .action-card.action-vote {
                    background: var(--gradient-primary);
                    border-color: transparent;
                    color: white;
                }
                
                .action-card.action-vote:hover {
                    box-shadow: var(--shadow-primary);
                }
                
                .action-icon {
                    width: 48px;
                    height: 48px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--neutral-100);
                    border-radius: var(--radius-lg);
                    color: var(--primary);
                }
                
                .action-vote .action-icon {
                    background: rgba(255, 255, 255, 0.2);
                    color: white;
                }
                
                .action-content {
                    flex: 1;
                }
                
                .action-title {
                    display: block;
                    font-weight: var(--font-semibold);
                    color: var(--neutral-900);
                }
                
                .action-vote .action-title {
                    color: white;
                }
                
                .action-desc {
                    font-size: var(--text-sm);
                    color: var(--neutral-500);
                }
                
                .action-vote .action-desc {
                    color: rgba(255, 255, 255, 0.8);
                }
                
                .action-card > svg {
                    color: var(--neutral-400);
                }
                
                .action-vote > svg {
                    color: rgba(255, 255, 255, 0.8);
                }
                
                /* Polls Grid */
                .polls-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                    gap: var(--space-6);
                }
                
                /* Activity Section */
                .activity-card {
                    background: white;
                    border-radius: var(--radius-xl);
                    box-shadow: var(--shadow-card);
                    overflow: hidden;
                }
                
                .activity-list {
                    display: flex;
                    flex-direction: column;
                }
                
                .activity-item {
                    display: flex;
                    align-items: center;
                    gap: var(--space-4);
                    padding: var(--space-4) var(--space-5);
                    border-bottom: 1px solid var(--neutral-100);
                }
                
                .activity-item:last-child {
                    border-bottom: none;
                }
                
                .activity-icon {
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: var(--radius-lg);
                }
                
                .activity-icon.success {
                    background: var(--success-light);
                    color: var(--success);
                }
                
                .activity-icon.primary {
                    background: var(--primary-100);
                    color: var(--primary);
                }
                
                .activity-content {
                    flex: 1;
                }
                
                .activity-title {
                    display: block;
                    font-size: var(--text-sm);
                    font-weight: var(--font-medium);
                    color: var(--neutral-900);
                }
                
                .activity-desc {
                    font-size: var(--text-sm);
                    color: var(--neutral-500);
                }
                
                .activity-time {
                    font-size: var(--text-xs);
                    color: var(--neutral-400);
                }
                
                /* Responsive */
                @media (max-width: 1024px) {
                    .stats-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
                
                @media (max-width: 640px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .polls-grid {
                        grid-template-columns: 1fr;
                    }
                }
                
                    /* Filter Tabs */
                    .filter-tabs {
                        display: flex;
                        gap: var(--space-2);
                        padding: var(--space-1);
                        background: white;
                        border-radius: var(--radius-lg);
                        box-shadow: var(--shadow-card);
                        width: 100%;
                        justify-content: space-between;
                    }
                
                    .filter-tab {
                        padding: var(--space-3) var(--space-5);
                        font-size: var(--text-sm);
                        font-weight: var(--font-medium);
                        color: var(--neutral-600);
                        background: transparent;
                        border: none;
                        border-radius: var(--radius-md);
                        cursor: pointer;
                        transition: all var(--transition-base);
                        white-space: nowrap;
                        flex: 1;
                        text-align: center;
                    }
                
                    .filter-tab:hover {
                        color: var(--primary);
                        background: var(--primary-50);
                    }
                
                    .filter-tab.active {
                        color: white;
                        background: var(--primary);
                    }
                
                    /* Polls List */
                    .polls-list {
                        display: flex;
                        flex-direction: column;
                        gap: var(--space-6);
                    }
                
                    .poll-item-card {
                        background: white;
                        border-radius: var(--radius-xl);
                        box-shadow: var(--shadow-card);
                        overflow: hidden;
                        transition: all var(--transition-base);
                    }
                
                    .poll-item-card:hover {
                        box-shadow: var(--shadow-lg);
                        transform: translateY(-2px);
                    }
                
                    .poll-item-header {
                        padding: var(--space-5);
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        color: white;
                    }
                
                    .poll-item-badge .badge {
                        display: inline-flex;
                        align-items: center;
                        gap: var(--space-2);
                        padding: var(--space-2) var(--space-4);
                        background: rgba(255, 255, 255, 0.95);
                        border-radius: var(--radius-full);
                        font-size: var(--text-xs);
                        font-weight: var(--font-semibold);
                    }
                
                    .badge-success {
                        color: var(--success);
                    }
                
                    .badge-warning {
                        color: var(--warning);
                    }
                
                    .poll-item-timer {
                        display: flex;
                        align-items: center;
                        gap: var(--space-2);
                        padding: var(--space-2) var(--space-3);
                        background: rgba(255, 255, 255, 0.2);
                        border-radius: var(--radius-md);
                        font-size: var(--text-sm);
                        font-weight: var(--font-medium);
                    }
                
                    .poll-item-timer.urgent {
                        background: rgba(239, 68, 68, 0.2);
                        animation: pulse 2s infinite;
                    }
                
                    @keyframes pulse {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.7; }
                    }
                
                    .poll-item-body {
                        padding: var(--space-6);
                    }
                
                    .poll-item-title {
                        font-size: var(--text-xl);
                        font-weight: var(--font-bold);
                        color: var(--neutral-900);
                        margin-bottom: var(--space-2);
                    }
                
                    .poll-item-description {
                        font-size: var(--text-base);
                        color: var(--neutral-600);
                        line-height: 1.6;
                        margin-bottom: var(--space-5);
                    }
                
                    .poll-item-meta {
                        display: flex;
                        gap: var(--space-6);
                        margin-bottom: var(--space-5);
                    }
                
                    .poll-meta-item {
                        display: flex;
                        align-items: center;
                        gap: var(--space-2);
                        font-size: var(--text-sm);
                        color: var(--neutral-600);
                    }
                
                    .poll-meta-item svg {
                        width: 18px;
                        height: 18px;
                        color: var(--neutral-400);
                    }
                
                    /* Progress Bar */
                    .poll-progress {
                        margin-bottom: var(--space-5);
                    }
                
                    .poll-progress-bar {
                        height: 8px;
                        background: var(--neutral-100);
                        border-radius: var(--radius-full);
                        overflow: hidden;
                        margin-bottom: var(--space-2);
                    }
                
                    .poll-progress-fill {
                        height: 100%;
                        background: var(--gradient-primary);
                        border-radius: var(--radius-full);
                        transition: width 1s ease;
                    }
                
                    .poll-progress-text {
                        font-size: var(--text-xs);
                        color: var(--neutral-500);
                        font-weight: var(--font-medium);
                    }
                
                    .poll-item-actions {
                        display: flex;
                        gap: var(--space-3);
                    }
                
                    .btn-block {
                        width: 100%;
                    }
                
                    /* Responsive */
                    @media (max-width: 640px) {
                        .poll-item-header {
                            flex-direction: column;
                            gap: var(--space-3);
                            align-items: flex-start;
                        }
                    
                        .poll-item-meta {
                            flex-direction: column;
                            gap: var(--space-3);
                        }
                    
                        .filter-tabs {
                            flex-wrap: nowrap;
                        }
                    }

                /* History */
                .history-section { margin-top: var(--space-6); }
                .history-list { position: relative; display: flex; flex-direction: column; gap: var(--space-6); }
                .history-item { display: grid; grid-template-columns: 24px 1fr; gap: var(--space-4); }
                .history-line { position: relative; }
                .history-line::after { content: ''; position: absolute; left: 11px; top: 0; bottom: 0; width: 2px; background: var(--neutral-200); }
                .history-dot { position: relative; z-index: 1; width: 22px; height: 22px; border-radius: var(--radius-full); background: var(--primary-100); border: 3px solid var(--primary);
                               box-shadow: 0 0 0 4px rgba(79,70,229,0.12); }
                .history-dot.done { background: var(--success-light); border-color: var(--success); box-shadow: 0 0 0 4px rgba(34,197,94,0.12); }
                .history-card { background: white; border-radius: var(--radius-xl); box-shadow: var(--shadow-card); padding: var(--space-6); }
                .history-card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-3); }
                .history-badges { display: flex; gap: var(--space-2); align-items: center; }
                .history-date { display: flex; gap: var(--space-2); align-items: center; color: var(--neutral-500); font-size: var(--text-sm); }
                .history-title { font-size: var(--text-xl); font-weight: var(--font-bold); margin-bottom: var(--space-2); }
                .history-desc { color: var(--neutral-600); margin-bottom: var(--space-4); }
                .history-meta { display: flex; gap: var(--space-6); margin-bottom: var(--space-5); }
                .history-meta-item { display: flex; gap: var(--space-2); align-items: center; color: var(--neutral-600); font-size: var(--text-sm); }
                .history-actions { display: flex; gap: var(--space-3); }
                
                @media (max-width: 640px) {
                    .history-item { grid-template-columns: 18px 1fr; }
                    .history-meta { flex-direction: column; gap: var(--space-3); }
                }
            </style>
        `;
    },

    afterRender() {
        // Setup filter tabs interaction on Polling page
        const tabs = document.querySelectorAll('.filter-tab');
        const list = document.querySelector('.polls-list');
        const cards = document.querySelectorAll('.poll-item-card');

        if (!tabs.length || !list || !cards.length) return;

        // Create empty placeholder for filtered results
        let emptyPlaceholder = document.querySelector('.polls-empty-placeholder');
        if (!emptyPlaceholder) {
            emptyPlaceholder = document.createElement('div');
            emptyPlaceholder.className = 'polls-empty-placeholder';
            emptyPlaceholder.innerHTML = Components.emptyState(
                'Tidak ada polling untuk filter ini',
                'Coba pilih filter lain atau kembali ke Semua',
                null
            );
            emptyPlaceholder.style.display = 'none';
            list.appendChild(emptyPlaceholder);
        }

        const applyFilter = (type) => {
            let visibleCount = 0;
            cards.forEach(card => {
                const voted = card.getAttribute('data-voted') === 'true';
                let show = true;
                if (type === 'pending') show = !voted;
                else if (type === 'voted') show = voted;
                else show = true; // all

                card.style.display = show ? '' : 'none';
                if (show) visibleCount++;
            });

            // Toggle placeholder when no items are visible
            emptyPlaceholder.style.display = visibleCount === 0 ? '' : 'none';
        };

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                applyFilter(tab.dataset.filter || 'all');
            });
        });

        // Initialize default filter
        const activeTab = Array.from(tabs).find(t => t.classList.contains('active'));
        applyFilter(activeTab ? activeTab.dataset.filter : 'all');
    }
};
