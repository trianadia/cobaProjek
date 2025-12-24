// ============================================
// VoteKampus - Results Page
// ============================================

const ResultsPage = {
    charts: {},

    // Demo results data
    results: {
        1: {
            poll: {
                id: 1,
                title: 'Pemilihan Ketua BEM 2024',
                status: 'closed',
                totalVotes: 1089,
                totalEligible: 1200,
                closedAt: '25 Des 2024, 23:59 WIB'
            },
            candidates: [
                { id: 1, name: 'Ahmad Rizki', votes: 490, percentage: 45 },
                { id: 2, name: 'Siti Nurhaliza', votes: 381, percentage: 35 },
                { id: 3, name: 'Budi Santoso', votes: 218, percentage: 20 }
            ],
            winner: { id: 1, name: 'Ahmad Rizki', votes: 490, percentage: 45 }
        }
    },

    render(params) {
        const pollId = params && params[0] ? parseInt(params[0]) : 1;
        const result = this.results[pollId];

        if (!result) {
            return this.renderNotFound();
        }

        const { poll, candidates, winner } = result;
        const participation = Math.round((poll.totalVotes / poll.totalEligible) * 100);

        return `
            <div class="dashboard-layout">
                ${Components.sidebar('student', 'results')}
                
                <main class="dashboard-main">
                    <header class="results-header animate-fadeInUp">
                        <button class="btn btn-ghost" onclick="Router.navigate('/dashboard')">
                            ${Components.icons.arrowLeft}
                            Kembali
                        </button>
                        <button class="btn btn-outline" onclick="ResultsPage.exportResults()">
                            ${Components.icons.download}
                            Export
                        </button>
                    </header>
                    
                    <!-- Poll Info -->
                    <section class="results-info animate-fadeInUp">
                        <div class="results-info-header">
                            <span class="badge ${poll.status === 'closed' ? 'badge-danger' : 'badge-success'} badge-dot">
                                ${poll.status === 'closed' ? 'Selesai' : 'Aktif'}
                            </span>
                        </div>
                        <h1 class="results-title">📈 Hasil: ${poll.title}</h1>
                        
                        <div class="results-stats">
                            <div class="result-stat">
                                <span class="result-stat-value">${poll.totalVotes.toLocaleString('id-ID')}</span>
                                <span class="result-stat-label">Total Suara</span>
                            </div>
                            <div class="result-stat-divider"></div>
                            <div class="result-stat">
                                <span class="result-stat-value">${poll.totalEligible.toLocaleString('id-ID')}</span>
                                <span class="result-stat-label">Total Pemilih Eligible</span>
                            </div>
                            <div class="result-stat-divider"></div>
                            <div class="result-stat">
                                <span class="result-stat-value">${participation}%</span>
                                <span class="result-stat-label">Tingkat Partisipasi</span>
                            </div>
                        </div>
                    </section>
                    
                    <!-- Winner Card -->
                    <section class="winner-section animate-fadeInUp stagger-1">
                        <div class="winner-card">
                            <div class="winner-badge">🏆 PEMENANG</div>
                            <div class="winner-content">
                                <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(winner.name)}&size=120&background=4F46E5&color=fff" 
                                     alt="${winner.name}"
                                     class="winner-avatar">
                                <div class="winner-info">
                                    <h2 class="winner-name">${winner.name}</h2>
                                    <div class="winner-votes">
                                        <span class="winner-votes-count">${winner.votes.toLocaleString('id-ID')}</span>
                                        <span class="winner-votes-label">suara (${winner.percentage}%)</span>
                                    </div>
                                </div>
                            </div>
                            <div class="winner-confetti">🎉</div>
                        </div>
                    </section>
                    
                    <!-- Charts Section -->
                    <section class="charts-section animate-fadeInUp stagger-2">
                        <div class="charts-grid">
                            <!-- Pie Chart -->
                            <div class="chart-card">
                                <h3 class="chart-title">Distribusi Suara</h3>
                                <div class="chart-container">
                                    <canvas id="pieChart"></canvas>
                                </div>
                            </div>
                            
                            <!-- Bar Chart -->
                            <div class="chart-card">
                                <h3 class="chart-title">Perolehan Suara</h3>
                                <div class="chart-container">
                                    <canvas id="barChart"></canvas>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    <!-- Results Table -->
                    <section class="table-section animate-fadeInUp stagger-3">
                        <h3 class="section-title-sm">📊 Detail Perolehan Suara</h3>
                        <div class="table-container">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Peringkat</th>
                                        <th>Kandidat</th>
                                        <th>Jumlah Suara</th>
                                        <th>Persentase</th>
                                        <th>Progres</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${candidates.sort((a, b) => b.votes - a.votes).map((candidate, index) => `
                                        <tr>
                                            <td>
                                                <span class="rank-badge rank-${index + 1}">
                                                    ${index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                                                </span>
                                            </td>
                                            <td>
                                                <div class="candidate-cell">
                                                    <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(candidate.name)}&size=40&background=${index === 0 ? '4F46E5' : index === 1 ? '14B8A6' : 'F59E0B'}&color=fff" 
                                                         alt="${candidate.name}"
                                                         class="candidate-cell-avatar">
                                                    <span class="candidate-cell-name">${candidate.name}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span class="votes-count">${candidate.votes.toLocaleString('id-ID')}</span>
                                            </td>
                                            <td>
                                                <span class="percentage">${candidate.percentage}%</span>
                                            </td>
                                            <td style="width: 200px;">
                                                <div class="progress">
                                                    <div class="progress-bar" style="width: ${candidate.percentage}%; background: ${index === 0 ? 'var(--gradient-primary)' : index === 1 ? 'var(--gradient-success)' : 'var(--accent)'}"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </section>
                    
                    <!-- Participation Stats -->
                    <section class="participation-section animate-fadeInUp stagger-4">
                        <h3 class="section-title-sm">📈 Statistik Partisipasi</h3>
                        <div class="participation-grid">
                            <div class="participation-card">
                                <div class="participation-chart">
                                    <svg viewBox="0 0 36 36" class="circular-chart">
                                        <path class="circle-bg"
                                            d="M18 2.0845
                                            a 15.9155 15.9155 0 0 1 0 31.831
                                            a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                        <path class="circle"
                                            stroke-dasharray="${participation}, 100"
                                            d="M18 2.0845
                                            a 15.9155 15.9155 0 0 1 0 31.831
                                            a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                        <text x="18" y="20.35" class="percentage-text">${participation}%</text>
                                    </svg>
                                </div>
                                <div class="participation-info">
                                    <h4>Tingkat Partisipasi</h4>
                                    <p>${poll.totalVotes.toLocaleString('id-ID')} dari ${poll.totalEligible.toLocaleString('id-ID')} mahasiswa telah memberikan suara</p>
                                </div>
                            </div>
                            
                            <div class="participation-breakdown">
                                <div class="breakdown-item">
                                    <div class="breakdown-icon voted">
                                        ${Components.icons.checkCircle}
                                    </div>
                                    <div class="breakdown-content">
                                        <span class="breakdown-value">${poll.totalVotes.toLocaleString('id-ID')}</span>
                                        <span class="breakdown-label">Sudah Vote</span>
                                    </div>
                                </div>
                                <div class="breakdown-item">
                                    <div class="breakdown-icon not-voted">
                                        ${Components.icons.clock}
                                    </div>
                                    <div class="breakdown-content">
                                        <span class="breakdown-value">${(poll.totalEligible - poll.totalVotes).toLocaleString('id-ID')}</span>
                                        <span class="breakdown-label">Belum Vote</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
            
            <style>
                .results-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: var(--space-6);
                }
                
                .results-info {
                    background: white;
                    border-radius: var(--radius-2xl);
                    padding: var(--space-8);
                    box-shadow: var(--shadow-card);
                    margin-bottom: var(--space-8);
                }
                
                .results-info-header {
                    margin-bottom: var(--space-3);
                }
                
                .results-title {
                    font-size: var(--text-2xl);
                    margin-bottom: var(--space-6);
                }
                
                .results-stats {
                    display: flex;
                    align-items: center;
                    gap: var(--space-8);
                    flex-wrap: wrap;
                }
                
                .result-stat {
                    text-align: center;
                }
                
                .result-stat-value {
                    display: block;
                    font-family: var(--font-display);
                    font-size: var(--text-3xl);
                    font-weight: var(--font-bold);
                    color: var(--primary);
                }
                
                .result-stat-label {
                    font-size: var(--text-sm);
                    color: var(--neutral-500);
                }
                
                .result-stat-divider {
                    width: 1px;
                    height: 48px;
                    background: var(--neutral-200);
                }
                
                /* Winner Section */
                .winner-card {
                    position: relative;
                    background: var(--gradient-hero);
                    border-radius: var(--radius-2xl);
                    padding: var(--space-8);
                    margin-bottom: var(--space-8);
                    overflow: hidden;
                }
                
                .winner-badge {
                    display: inline-block;
                    padding: var(--space-2) var(--space-4);
                    background: rgba(255, 255, 255, 0.2);
                    color: white;
                    font-size: var(--text-sm);
                    font-weight: var(--font-bold);
                    border-radius: var(--radius-full);
                    margin-bottom: var(--space-4);
                    letter-spacing: 0.05em;
                }
                
                .winner-content {
                    display: flex;
                    align-items: center;
                    gap: var(--space-6);
                }
                
                .winner-avatar {
                    width: 100px;
                    height: 100px;
                    border-radius: var(--radius-full);
                    border: 4px solid rgba(255, 255, 255, 0.3);
                }
                
                .winner-name {
                    font-size: var(--text-3xl);
                    color: white;
                    margin-bottom: var(--space-2);
                }
                
                .winner-votes {
                    display: flex;
                    align-items: baseline;
                    gap: var(--space-2);
                }
                
                .winner-votes-count {
                    font-family: var(--font-display);
                    font-size: var(--text-4xl);
                    font-weight: var(--font-bold);
                    color: white;
                }
                
                .winner-votes-label {
                    font-size: var(--text-lg);
                    color: rgba(255, 255, 255, 0.8);
                }
                
                .winner-confetti {
                    position: absolute;
                    top: 20px;
                    right: 40px;
                    font-size: 48px;
                    animation: bounce 1s ease infinite;
                }
                
                /* Charts */
                .charts-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: var(--space-6);
                    margin-bottom: var(--space-8);
                }
                
                .chart-card {
                    background: white;
                    border-radius: var(--radius-xl);
                    padding: var(--space-6);
                    box-shadow: var(--shadow-card);
                }
                
                .chart-title {
                    font-size: var(--text-lg);
                    margin-bottom: var(--space-4);
                }
                
                .chart-container {
                    position: relative;
                    height: 300px;
                }
                
                /* Table */
                .section-title-sm {
                    font-size: var(--text-lg);
                    font-weight: var(--font-bold);
                    margin-bottom: var(--space-4);
                }
                
                .candidate-cell {
                    display: flex;
                    align-items: center;
                    gap: var(--space-3);
                }
                
                .candidate-cell-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: var(--radius-full);
                }
                
                .candidate-cell-name {
                    font-weight: var(--font-medium);
                }
                
                .votes-count {
                    font-weight: var(--font-semibold);
                    color: var(--neutral-900);
                }
                
                .percentage {
                    font-weight: var(--font-semibold);
                    color: var(--primary);
                }
                
                /* Participation */
                .participation-section {
                    margin-top: var(--space-8);
                }
                
                .participation-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: var(--space-6);
                }
                
                .participation-card {
                    display: flex;
                    align-items: center;
                    gap: var(--space-6);
                    background: white;
                    border-radius: var(--radius-xl);
                    padding: var(--space-6);
                    box-shadow: var(--shadow-card);
                }
                
                .participation-chart {
                    width: 120px;
                    height: 120px;
                }
                
                .circular-chart {
                    display: block;
                    max-width: 100%;
                }
                
                .circle-bg {
                    fill: none;
                    stroke: var(--neutral-200);
                    stroke-width: 3;
                }
                
                .circle {
                    fill: none;
                    stroke-width: 3;
                    stroke-linecap: round;
                    stroke: var(--primary);
                    animation: progress 1s ease-out forwards;
                }
                
                @keyframes progress {
                    0% { stroke-dasharray: 0, 100; }
                }
                
                .percentage-text {
                    fill: var(--neutral-900);
                    font-family: var(--font-display);
                    font-size: 0.5em;
                    font-weight: var(--font-bold);
                    text-anchor: middle;
                }
                
                .participation-info h4 {
                    font-size: var(--text-lg);
                    margin-bottom: var(--space-2);
                }
                
                .participation-info p {
                    font-size: var(--text-sm);
                    color: var(--neutral-600);
                }
                
                .participation-breakdown {
                    display: flex;
                    flex-direction: column;
                    gap: var(--space-4);
                    background: white;
                    border-radius: var(--radius-xl);
                    padding: var(--space-6);
                    box-shadow: var(--shadow-card);
                }
                
                .breakdown-item {
                    display: flex;
                    align-items: center;
                    gap: var(--space-4);
                }
                
                .breakdown-icon {
                    width: 48px;
                    height: 48px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: var(--radius-lg);
                }
                
                .breakdown-icon.voted {
                    background: var(--success-light);
                    color: var(--success);
                }
                
                .breakdown-icon.not-voted {
                    background: var(--neutral-100);
                    color: var(--neutral-500);
                }
                
                .breakdown-value {
                    display: block;
                    font-size: var(--text-2xl);
                    font-weight: var(--font-bold);
                }
                
                .breakdown-label {
                    font-size: var(--text-sm);
                    color: var(--neutral-500);
                }
                
                @media (max-width: 1024px) {
                    .charts-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .participation-grid {
                        grid-template-columns: 1fr;
                    }
                }
                
                @media (max-width: 768px) {
                    .results-stats {
                        justify-content: center;
                    }
                    
                    .result-stat-divider {
                        display: none;
                    }
                    
                    .winner-content {
                        flex-direction: column;
                        text-align: center;
                    }
                    
                    .winner-votes {
                        justify-content: center;
                    }
                }
            </style>
        `;
    },

    renderNotFound() {
        return `
            <div class="dashboard-layout">
                ${Components.sidebar('student', 'results')}
                <main class="dashboard-main">
                    ${Components.emptyState(
            'Hasil Tidak Ditemukan',
            'Hasil voting yang Anda cari tidak ada atau belum tersedia.',
            { href: '#/dashboard', label: 'Kembali ke Dashboard' }
        )}
                </main>
            </div>
        `;
    },

    afterRender() {
        // Initialize charts after DOM is ready
        setTimeout(() => this.initCharts(), 100);
    },

    initCharts() {
        const result = this.results[1];
        if (!result) return;

        const { candidates } = result;
        const labels = candidates.map(c => c.name);
        const data = candidates.map(c => c.votes);
        const colors = ['#4F46E5', '#14B8A6', '#F59E0B'];

        // Pie Chart
        const pieCtx = document.getElementById('pieChart');
        if (pieCtx) {
            this.charts.pie = new Chart(pieCtx, {
                type: 'doughnut',
                data: {
                    labels: labels,
                    datasets: [{
                        data: data,
                        backgroundColor: colors,
                        borderWidth: 0,
                        hoverOffset: 20
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '60%',
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                usePointStyle: true,
                                font: {
                                    family: "'Inter', sans-serif",
                                    size: 12
                                }
                            }
                        }
                    },
                    animation: {
                        animateRotate: true,
                        animateScale: true
                    }
                }
            });
        }

        // Bar Chart
        const barCtx = document.getElementById('barChart');
        if (barCtx) {
            this.charts.bar = new Chart(barCtx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Jumlah Suara',
                        data: data,
                        backgroundColor: colors,
                        borderRadius: 8,
                        borderSkipped: false
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: 'y',
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                            beginAtZero: true,
                            grid: {
                                display: false
                            },
                            ticks: {
                                font: {
                                    family: "'Inter', sans-serif"
                                }
                            }
                        },
                        y: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                font: {
                                    family: "'Inter', sans-serif"
                                }
                            }
                        }
                    },
                    animation: {
                        duration: 1000,
                        easing: 'easeOutQuart'
                    }
                }
            });
        }
    },

    exportResults() {
        Components.showToast('Export', 'Hasil voting sedang di-download...', 'info');
        // In a real app, this would generate and download a CSV/PDF
    },

    destroy() {
        // Clean up charts
        Object.values(this.charts).forEach(chart => {
            if (chart) chart.destroy();
        });
        this.charts = {};
    }
};
