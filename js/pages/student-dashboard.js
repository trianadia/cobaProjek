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
            			<h2>🗳️ Polling Aktif</h2>
          		  	<p>Halaman polling aktif.</p>
       			    ` : activePage === 'history' ? `
           		        <h2>📜 Riwayat Vote</h2>
          		  	<p>Halaman riwayat vote.</p>
        		    ` : activePage === 'results' ? `
            			<h2>📊 Hasil Voting</h2>
            			<p>Halaman hasil voting.</p>
       			    ` : activePage === 'profile' ? `
            			<h2>👤 Profil Saya</h2>
            			<p>Halaman profil.</p>
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
            </style>
        `;
    },

    afterRender() {
        // Any post-render logic
    }
};
