// ============================================
// VoteKampus - Voting Page
// ============================================

const VotingPage = {
    selectedCandidate: null,
    currentPoll: null,

    // Demo candidates data
    candidates: {
        1: [
            {
                id: 1,
                name: 'Ahmad Rizki',
                tagline: 'Bersama Menuju Kampus Unggul',
                photo: null,
                visiMisi: 'Meningkatkan kualitas akademik dan kesejahteraan mahasiswa'
            },
            {
                id: 2,
                name: 'Siti Nurhaliza',
                tagline: 'Inovasi Tanpa Batas',
                photo: null,
                visiMisi: 'Mendorong inovasi dan kreativitas mahasiswa'
            },
            {
                id: 3,
                name: 'Budi Santoso',
                tagline: 'Untuk Semua Mahasiswa',
                photo: null,
                visiMisi: 'Membangun kebersamaan dan solidaritas antar mahasiswa'
            }
        ]
    },

    // Demo polls (same as dashboard)
    polls: {
        1: {
            id: 1,
            title: 'Pemilihan Ketua BEM 2024',
            description: 'Pemilihan Ketua Badan Eksekutif Mahasiswa periode 2024-2025. Pilihlah kandidat yang menurut Anda terbaik untuk memimpin organisasi mahasiswa.',
            status: 'active',
            startDate: '23 Des 2024',
            endDate: '25 Des 2024',
            remainingDays: 2,
            totalVotes: 456,
            totalEligible: 1200,
            hasVoted: false
        }
    },

    render(params) {
        const pollId = params && params[0] ? parseInt(params[0]) : 1;
        this.currentPoll = this.polls[pollId];

        if (!this.currentPoll) {
            return this.renderNotFound();
        }

        if (this.currentPoll.hasVoted) {
            return this.renderAlreadyVoted();
        }

        const candidates = this.candidates[pollId] || [];
        const participation = Math.round((this.currentPoll.totalVotes / this.currentPoll.totalEligible) * 100);

        return `
            <div class="dashboard-layout">
                ${Components.sidebar('student', 'polling')}
                
                <main class="dashboard-main">
                    <header class="voting-header animate-fadeInUp">
                        <button class="btn btn-ghost" onclick="Router.navigate('/dashboard')">
                            ${Components.icons.arrowLeft}
                            Kembali ke Dashboard
                        </button>
                    </header>
                    
                    <!-- Poll Info -->
                    <section class="poll-info animate-fadeInUp">
                        <div class="poll-info-header">
                            <span class="badge badge-success badge-dot">Aktif</span>
                            <span class="poll-deadline">
                                ${Components.icons.clock}
                                Sisa ${this.currentPoll.remainingDays} hari
                            </span>
                        </div>
                        <h1 class="poll-title">${this.currentPoll.title}</h1>
                        <p class="poll-description">${this.currentPoll.description}</p>
                        
                        <div class="poll-meta">
                            <div class="poll-meta-item">
                                ${Components.icons.calendar}
                                <span>${this.currentPoll.startDate} - ${this.currentPoll.endDate}</span>
                            </div>
                            <div class="poll-meta-item">
                                ${Components.icons.users}
                                <span>${this.currentPoll.totalVotes.toLocaleString('id-ID')} dari ${this.currentPoll.totalEligible.toLocaleString('id-ID')} pemilih (${participation}%)</span>
                            </div>
                        </div>
                        
                        <div class="poll-progress">
                            <div class="poll-progress-label">
                                <span>Partisipasi</span>
                                <span>${participation}%</span>
                            </div>
                            <div class="progress">
                                <div class="progress-bar" style="width: ${participation}%"></div>
                            </div>
                        </div>
                    </section>
                    
                    <!-- Candidates -->
                    <section class="candidates-section animate-fadeInUp stagger-1">
                        <h2 class="candidates-title">Pilih Kandidat</h2>
                        <p class="candidates-subtitle">Klik pada kandidat untuk memilih. Pastikan pilihan Anda sudah tepat sebelum submit.</p>
                        
                        <div class="candidate-grid">
                            ${candidates.map(candidate => Components.candidateCard(candidate, this.selectedCandidate === candidate.id)).join('')}
                        </div>
                    </section>
                    
                    <!-- Submit Button -->
                    <section class="submit-section animate-fadeInUp stagger-2">
                        <button 
                            class="btn btn-primary btn-lg submit-vote-btn" 
                            id="submitVoteBtn"
                            onclick="VotingPage.showConfirmModal()"
                            ${!this.selectedCandidate ? 'disabled' : ''}
                        >
                            ${Components.icons.check}
                            Submit Vote
                        </button>
                        <p class="submit-hint">
                            ⚠️ Pilihan tidak dapat diubah setelah Anda submit
                        </p>
                    </section>
                </main>
            </div>
            
            <!-- Confirmation Modal -->
            ${this.renderConfirmModal()}
            
            <!-- Success Modal -->
            ${this.renderSuccessModal()}
            
            <style>
                .voting-header {
                    margin-bottom: var(--space-6);
                }
                
                .poll-info {
                    background: white;
                    border-radius: var(--radius-2xl);
                    padding: var(--space-8);
                    box-shadow: var(--shadow-card);
                    margin-bottom: var(--space-8);
                }
                
                .poll-info-header {
                    display: flex;
                    align-items: center;
                    gap: var(--space-4);
                    margin-bottom: var(--space-4);
                }
                
                .poll-deadline {
                    display: flex;
                    align-items: center;
                    gap: var(--space-2);
                    font-size: var(--text-sm);
                    color: var(--neutral-500);
                }
                
                .poll-title {
                    font-size: var(--text-3xl);
                    margin-bottom: var(--space-3);
                }
                
                .poll-description {
                    font-size: var(--text-base);
                    color: var(--neutral-600);
                    margin-bottom: var(--space-6);
                    max-width: 700px;
                }
                
                .poll-meta {
                    display: flex;
                    flex-wrap: wrap;
                    gap: var(--space-6);
                    margin-bottom: var(--space-6);
                }
                
                .poll-meta-item {
                    display: flex;
                    align-items: center;
                    gap: var(--space-2);
                    font-size: var(--text-sm);
                    color: var(--neutral-600);
                }
                
                .poll-progress {
                    max-width: 400px;
                }
                
                .poll-progress-label {
                    display: flex;
                    justify-content: space-between;
                    font-size: var(--text-sm);
                    font-weight: var(--font-medium);
                    margin-bottom: var(--space-2);
                }
                
                .candidates-section {
                    margin-bottom: var(--space-8);
                }
                
                .candidates-title {
                    font-size: var(--text-xl);
                    margin-bottom: var(--space-2);
                }
                
                .candidates-subtitle {
                    font-size: var(--text-sm);
                    color: var(--neutral-500);
                    margin-bottom: var(--space-6);
                }
                
                .submit-section {
                    text-align: center;
                    padding: var(--space-8);
                    background: var(--neutral-50);
                    border-radius: var(--radius-2xl);
                }
                
                .submit-vote-btn {
                    min-width: 200px;
                }
                
                .submit-hint {
                    margin-top: var(--space-4);
                    font-size: var(--text-sm);
                    color: var(--neutral-500);
                }
                
                /* Confirm Modal Content */
                .confirm-candidate {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    padding: var(--space-4);
                }
                
                .confirm-avatar {
                    width: 100px;
                    height: 100px;
                    border-radius: var(--radius-full);
                    margin-bottom: var(--space-4);
                    border: 4px solid var(--primary-100);
                }
                
                .confirm-name {
                    font-size: var(--text-xl);
                    font-weight: var(--font-bold);
                    margin-bottom: var(--space-2);
                }
                
                .confirm-warning {
                    display: flex;
                    align-items: center;
                    gap: var(--space-2);
                    padding: var(--space-3) var(--space-4);
                    background: var(--warning-light);
                    color: #B45309;
                    border-radius: var(--radius-lg);
                    font-size: var(--text-sm);
                    margin-top: var(--space-4);
                }
                
                /* Success Modal Content */
                .success-content {
                    text-align: center;
                    padding: var(--space-6);
                }
                
                .success-icon {
                    width: 80px;
                    height: 80px;
                    margin: 0 auto var(--space-6);
                    background: var(--success-light);
                    border-radius: var(--radius-full);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--success);
                }
                
                .success-icon svg {
                    width: 40px;
                    height: 40px;
                }
                
                .success-title {
                    font-size: var(--text-2xl);
                    margin-bottom: var(--space-2);
                }
                
                .success-message {
                    color: var(--neutral-600);
                    margin-bottom: var(--space-6);
                }
                
                .success-receipt {
                    background: var(--neutral-50);
                    border-radius: var(--radius-lg);
                    padding: var(--space-4);
                    font-size: var(--text-sm);
                }
                
                .success-receipt-row {
                    display: flex;
                    justify-content: space-between;
                    padding: var(--space-2) 0;
                    border-bottom: 1px dashed var(--neutral-200);
                }
                
                .success-receipt-row:last-child {
                    border-bottom: none;
                }
                
                .success-receipt-label {
                    color: var(--neutral-500);
                }
                
                .success-receipt-value {
                    font-weight: var(--font-medium);
                }
                
                @media (max-width: 768px) {
                    .poll-info {
                        padding: var(--space-6);
                    }
                    
                    .poll-title {
                        font-size: var(--text-2xl);
                    }
                    
                    .candidate-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>
        `;
    },

    renderConfirmModal() {
        const candidates = this.candidates[1] || [];
        const selected = candidates.find(c => c.id === this.selectedCandidate);

        const content = selected ? `
            <div class="confirm-candidate">
                <img src="${selected.photo || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(selected.name) + '&size=100&background=4F46E5&color=fff'}" 
                     alt="${selected.name}" 
                     class="confirm-avatar">
                <h3 class="confirm-name">${selected.name}</h3>
                <p class="text-muted">"${selected.tagline}"</p>
                <div class="confirm-warning">
                    ${Components.icons.alertCircle}
                    Pilihan tidak dapat diubah setelah submit
                </div>
            </div>
        ` : '<p>Pilih kandidat terlebih dahulu</p>';

        const footer = `
            <button class="btn btn-outline" onclick="Components.closeModal('confirmModal')">
                Batal
            </button>
            <button class="btn btn-primary" onclick="VotingPage.submitVote()" id="confirmVoteBtn">
                Ya, Konfirmasi
            </button>
        `;

        return Components.modal('confirmModal', '⚠️ Konfirmasi Pilihan', content, footer);
    },

    renderSuccessModal() {
        const content = `
            <div class="success-content">
                <div class="success-icon animate-scaleIn">
                    ${Components.icons.checkCircle}
                </div>
                <h3 class="success-title">Vote Berhasil!</h3>
                <p class="success-message">Suara Anda telah tercatat dengan aman. Terima kasih telah berpartisipasi!</p>
                
                <div class="success-receipt">
                    <div class="success-receipt-row">
                        <span class="success-receipt-label">ID Transaksi</span>
                        <span class="success-receipt-value">#VK-2024-${Math.random().toString(36).substr(2, 8).toUpperCase()}</span>
                    </div>
                    <div class="success-receipt-row">
                        <span class="success-receipt-label">Waktu</span>
                        <span class="success-receipt-value">${new Date().toLocaleString('id-ID')}</span>
                    </div>
                    <div class="success-receipt-row">
                        <span class="success-receipt-label">Status</span>
                        <span class="success-receipt-value text-success">✓ Tercatat</span>
                    </div>
                </div>
            </div>
        `;

        const footer = `
            <button class="btn btn-primary w-full" onclick="Router.navigate('/results')">
                Lihat Hasil Voting
            </button>
        `;

        return Components.modal('successModal', '', content, footer);
    },

    renderNotFound() {
        return `
            <div class="dashboard-layout">
                ${Components.sidebar('student', 'polling')}
                <main class="dashboard-main">
                    ${Components.emptyState(
            'Polling Tidak Ditemukan',
            'Polling yang Anda cari tidak ada atau sudah dihapus.',
            { href: '#/dashboard', label: 'Kembali ke Dashboard' }
        )}
                </main>
            </div>
        `;
    },

    renderAlreadyVoted() {
        return `
            <div class="dashboard-layout">
                ${Components.sidebar('student', 'polling')}
                <main class="dashboard-main">
                    ${Components.emptyState(
            'Anda Sudah Memberikan Suara',
            'Anda sudah memberikan suara untuk polling ini. Setiap mahasiswa hanya dapat memilih sekali.',
            { href: '#/results', label: 'Lihat Hasil Voting' }
        )}
                </main>
            </div>
        `;
    },

    selectCandidate(candidateId) {
        this.selectedCandidate = candidateId;

        // Update UI
        document.querySelectorAll('.candidate-card').forEach(card => {
            const id = parseInt(card.dataset.candidate);
            if (id === candidateId) {
                card.classList.add('selected');
                card.querySelector('.candidate-radio').innerHTML = `${Components.icons.check} Terpilih`;
            } else {
                card.classList.remove('selected');
                card.querySelector('.candidate-radio').innerHTML = '○ Pilih Kandidat';
            }
        });

        // Enable submit button
        const submitBtn = document.getElementById('submitVoteBtn');
        if (submitBtn) {
            submitBtn.disabled = false;
        }
    },

    showConfirmModal() {
        if (!this.selectedCandidate) {
            Components.showToast('Pilih Kandidat', 'Silakan pilih kandidat terlebih dahulu', 'warning');
            return;
        }

        // Update modal content
        const modal = document.getElementById('confirmModal');
        if (modal) {
            const candidates = this.candidates[1] || [];
            const selected = candidates.find(c => c.id === this.selectedCandidate);

            if (selected) {
                const content = modal.querySelector('.modal-body');
                content.innerHTML = `
                    <div class="confirm-candidate">
                        <img src="${selected.photo || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(selected.name) + '&size=100&background=4F46E5&color=fff'}" 
                             alt="${selected.name}" 
                             class="confirm-avatar">
                        <h3 class="confirm-name">${selected.name}</h3>
                        <p class="text-muted">"${selected.tagline}"</p>
                        <div class="confirm-warning">
                            ${Components.icons.alertCircle}
                            Pilihan tidak dapat diubah setelah submit
                        </div>
                    </div>
                `;
            }
        }

        Components.openModal('confirmModal');
    },

    submitVote() {
        const confirmBtn = document.getElementById('confirmVoteBtn');
        if (confirmBtn) {
            confirmBtn.disabled = true;
            confirmBtn.innerHTML = `${Components.spinner('sm')} Memproses...`;
        }

        // Simulate API call
        setTimeout(() => {
            Components.closeModal('confirmModal');
            Components.openModal('successModal');

            // Mark as voted
            if (this.currentPoll) {
                this.currentPoll.hasVoted = true;
            }
        }, 1500);
    },

    afterRender() {
        // Reset selection
        this.selectedCandidate = null;
    }
};
