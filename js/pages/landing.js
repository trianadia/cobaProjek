// ============================================
// VoteKampus - Landing Page
// ============================================

const LandingPage = {
    render() {
        const isLoggedIn = Auth.isLoggedIn();

        return `
            ${Components.navbar(isLoggedIn)}
            
            <main style="padding-top: var(--navbar-height);">
                <!-- Hero Section -->
                <section id="tentang" class="hero">
                    <div class="hero-bg"></div>
                    <div class="container">
                        <div class="hero-grid">
                            <div class="hero-content animate-fadeInUp">
                                <span class="hero-badge">
                                    ✨ Platform Voting Modern
                                </span>
                                <h1 class="hero-title">
                                    Suara Anda,<br>
                                    <span class="hero-title-gradient">Masa Depan Kampus</span>
                                </h1>
                                <p class="hero-description">
                                    Platform voting digital yang transparan, aman, dan real-time 
                                    untuk pemilihan BEM, DPM, dan organisasi kemahasiswaan lainnya.
                                </p>
                                <div class="hero-actions">
                                    <a href="#/login" class="btn btn-primary btn-lg">
                                        Mulai Voting
                                        ${Components.icons.arrowRight}
                                    </a>
                                    <a href="#/tentang" class="btn btn-secondary btn-lg">
                                        Pelajari Lebih
                                    </a>
                                </div>
                                <div class="hero-stats">
                                    <div class="hero-stat">
                                        <span class="hero-stat-value" data-count="1234">0</span>
                                        <span class="hero-stat-label">Total Pemilih</span>
                                    </div>
                                    <div class="hero-stat">
                                        <span class="hero-stat-value" data-count="12">0</span>
                                        <span class="hero-stat-label">Polling Aktif</span>
                                    </div>
                                    <div class="hero-stat">
                                        <span class="hero-stat-value" data-count="89">0</span>
                                        <span class="hero-stat-label">% Partisipasi</span>
                                    </div>
                                </div>
                            </div>
                            <div class="hero-visual animate-fadeInUp stagger-2">
                                <div class="hero-illustration">
                                    <div class="hero-card hero-card-1">
                                        <div class="hero-card-icon">🗳️</div>
                                        <span>Vote Submitted!</span>
                                    </div>
                                    <div class="hero-card hero-card-2">
                                        <div class="hero-card-icon">📊</div>
                                        <span>Live Results</span>
                                    </div>
                                    <div class="hero-card hero-card-3">
                                        <div class="hero-card-icon">✅</div>
                                        <span>Verified</span>
                                    </div>
                                    <div class="hero-blob"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- Features Section -->
                <section id="fitur" class="features-section">
                    <div class="container">
                        <div class="section-header animate-fadeInUp">
                            <span class="section-badge">Fitur Unggulan</span>
                            <h2 class="section-title">Voting Jadi Lebih Mudah</h2>
                            <p class="section-description">
                                Nikmati pengalaman voting modern dengan fitur-fitur canggih yang dirancang 
                                untuk transparansi dan kemudahan.
                            </p>
                        </div>
                        
                        <div class="features-grid">
                            <div class="feature-card animate-fadeInUp">
                                <div class="feature-icon">
                                    ${Components.icons.shield}
                                </div>
                                <h3 class="feature-title">Aman & Terenkripsi</h3>
                                <p class="feature-description">
                                    Data suara dilindungi dengan enkripsi end-to-end. 
                                    Privasi terjamin, hasil akurat.
                                </p>
                            </div>
                            
                            <div class="feature-card animate-fadeInUp stagger-1">
                                <div class="feature-icon success">
                                    ${Components.icons.zap}
                                </div>
                                <h3 class="feature-title">Cepat & Mudah</h3>
                                <p class="feature-description">
                                    Voting hanya butuh 1 klik. Interface intuitif 
                                    yang bisa diakses dari mana saja.
                                </p>
                            </div>
                            
                            <div class="feature-card animate-fadeInUp stagger-2">
                                <div class="feature-icon warning">
                                    ${Components.icons.activity}
                                </div>
                                <h3 class="feature-title">Real-time Result</h3>
                                <p class="feature-description">
                                    Pantau hasil voting secara langsung dengan grafik 
                                    interaktif yang update otomatis.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- How It Works Section -->
                <section class="how-section">
                    <div class="container">
                        <div class="section-header animate-fadeInUp">
                            <span class="section-badge">Bagaimana Cara Kerja</span>
                            <h2 class="section-title">3 Langkah Mudah</h2>
                        </div>
                        
                        <div class="steps-grid">
                            <div class="step-card animate-fadeInUp">
                                <div class="step-number">01</div>
                                <h3 class="step-title">Login dengan Akun</h3>
                                <p class="step-description">
                                    Masuk menggunakan NIM dan password yang sudah terdaftar 
                                    di sistem kampus.
                                </p>
                            </div>
                            
                            <div class="step-connector">
                                <div class="step-line"></div>
                            </div>
                            
                            <div class="step-card animate-fadeInUp stagger-1">
                                <div class="step-number">02</div>
                                <h3 class="step-title">Pilih Kandidat</h3>
                                <p class="step-description">
                                    Lihat profil kandidat, visi misi, dan buat pilihan 
                                    sesuai hati nurani.
                                </p>
                            </div>
                            
                            <div class="step-connector">
                                <div class="step-line"></div>
                            </div>
                            
                            <div class="step-card animate-fadeInUp stagger-2">
                                <div class="step-number">03</div>
                                <h3 class="step-title">Konfirmasi & Selesai</h3>
                                <p class="step-description">
                                    Konfirmasi pilihan Anda dan terima notifikasi bahwa 
                                    suara berhasil tercatat.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- CTA Section -->
                <section id="kontak" class="cta-section">
                    <div class="container">
                        <div class="cta-card animate-fadeInUp">
                            <div class="cta-content">
                                <h2 class="cta-title">Siap Memberikan Suara?</h2>
                                <p class="cta-description">
                                    Jadilah bagian dari perubahan. Suara Anda penting untuk 
                                    masa depan kampus kita.
                                </p>
                            </div>
                            <div class="cta-actions">
                                <a href="#/login" class="btn btn-primary btn-lg">
                                    Masuk Sekarang
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            
            ${Components.footer()}
            
            <style>
                /* Hero Section */
                .hero {
                    position: relative;
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    padding: var(--space-20) 0;
                    overflow: hidden;
                }
                
                .hero-bg {
                    position: absolute;
                    inset: 0;
                    background: 
                        radial-gradient(circle at 20% 50%, rgba(79, 70, 229, 0.08) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.08) 0%, transparent 50%),
                        radial-gradient(circle at 40% 80%, rgba(20, 184, 166, 0.06) 0%, transparent 40%);
                }
                
                .hero-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: var(--space-12);
                    align-items: center;
                }
                
                .hero-badge {
                    display: inline-block;
                    padding: var(--space-2) var(--space-4);
                    background: var(--primary-100);
                    color: var(--primary);
                    font-size: var(--text-sm);
                    font-weight: var(--font-semibold);
                    border-radius: var(--radius-full);
                    margin-bottom: var(--space-6);
                }
                
                .hero-title {
                    font-size: var(--text-6xl);
                    font-weight: var(--font-extrabold);
                    line-height: 1.1;
                    margin-bottom: var(--space-6);
                }
                
                .hero-title-gradient {
                    background: var(--gradient-hero);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                
                .hero-description {
                    font-size: var(--text-lg);
                    color: var(--neutral-600);
                    max-width: 480px;
                    margin-bottom: var(--space-8);
                }
                
                .hero-actions {
                    display: flex;
                    gap: var(--space-4);
                    margin-bottom: var(--space-12);
                }
                
                .hero-stats {
                    display: flex;
                    gap: var(--space-10);
                }
                
                .hero-stat {
                    text-align: center;
                }
                
                .hero-stat-value {
                    display: block;
                    font-family: var(--font-display);
                    font-size: var(--text-3xl);
                    font-weight: var(--font-bold);
                    color: var(--neutral-900);
                }
                
                .hero-stat-label {
                    font-size: var(--text-sm);
                    color: var(--neutral-500);
                }
                
                /* Hero Visual */
                .hero-visual {
                    position: relative;
                    height: 500px;
                }
                
                .hero-illustration {
                    position: relative;
                    width: 100%;
                    height: 100%;
                }
                
                .hero-blob {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 400px;
                    height: 400px;
                    background: var(--gradient-primary);
                    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
                    opacity: 0.15;
                    animation: float 6s ease-in-out infinite;
                }
                
                .hero-card {
                    position: absolute;
                    display: flex;
                    align-items: center;
                    gap: var(--space-3);
                    padding: var(--space-4) var(--space-5);
                    background: white;
                    border-radius: var(--radius-xl);
                    box-shadow: var(--shadow-xl);
                    font-weight: var(--font-semibold);
                    animation: float 4s ease-in-out infinite;
                }
                
                .hero-card-icon {
                    font-size: var(--text-2xl);
                }
                
                .hero-card-1 {
                    top: 20%;
                    left: 10%;
                    animation-delay: 0s;
                }
                
                .hero-card-2 {
                    top: 50%;
                    right: 5%;
                    animation-delay: 1s;
                }
                
                .hero-card-3 {
                    bottom: 20%;
                    left: 20%;
                    animation-delay: 2s;
                }
                
                /* Features Section */
                .features-section {
                    padding: var(--space-24) 0;
                    background: white;
                }
                
                .section-header {
                    text-align: center;
                    max-width: 600px;
                    margin: 0 auto var(--space-16);
                }
                
                .section-badge {
                    display: inline-block;
                    padding: var(--space-1) var(--space-3);
                    background: var(--primary-100);
                    color: var(--primary);
                    font-size: var(--text-xs);
                    font-weight: var(--font-semibold);
                    border-radius: var(--radius-full);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    margin-bottom: var(--space-4);
                }
                
                .section-title {
                    font-size: var(--text-4xl);
                    margin-bottom: var(--space-4);
                }
                
                .section-description {
                    font-size: var(--text-lg);
                    color: var(--neutral-600);
                }
                
                .features-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: var(--space-8);
                }
                
                .feature-card {
                    padding: var(--space-8);
                    background: var(--neutral-50);
                    border-radius: var(--radius-2xl);
                    text-align: center;
                    transition: all var(--transition-base);
                }
                
                .feature-card:hover {
                    transform: translateY(-8px);
                    background: white;
                    box-shadow: var(--shadow-xl);
                }
                
                .feature-icon {
                    width: 64px;
                    height: 64px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto var(--space-6);
                    background: var(--primary-100);
                    color: var(--primary);
                    border-radius: var(--radius-xl);
                }
                
                .feature-icon.success {
                    background: var(--success-light);
                    color: var(--success);
                }
                
                .feature-icon.warning {
                    background: var(--warning-light);
                    color: var(--warning);
                }
                
                .feature-title {
                    font-size: var(--text-xl);
                    margin-bottom: var(--space-3);
                }
                
                .feature-description {
                    color: var(--neutral-600);
                    line-height: var(--leading-relaxed);
                }
                
                /* How It Works Section */
                .how-section {
                    padding: var(--space-24) 0;
                    background: var(--neutral-50);
                }
                
                .steps-grid {
                    display: flex;
                    align-items: flex-start;
                    justify-content: center;
                    gap: var(--space-4);
                }
                
                .step-card {
                    flex: 1;
                    max-width: 300px;
                    padding: var(--space-8);
                    background: white;
                    border-radius: var(--radius-2xl);
                    text-align: center;
                    box-shadow: var(--shadow-card);
                }
                
                .step-number {
                    display: inline-block;
                    font-family: var(--font-display);
                    font-size: var(--text-4xl);
                    font-weight: var(--font-extrabold);
                    background: var(--gradient-primary);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    margin-bottom: var(--space-4);
                }
                
                .step-title {
                    font-size: var(--text-lg);
                    margin-bottom: var(--space-3);
                }
                
                .step-description {
                    color: var(--neutral-600);
                    font-size: var(--text-sm);
                }
                
                .step-connector {
                    display: flex;
                    align-items: center;
                    padding-top: var(--space-16);
                }
                
                .step-line {
                    width: 60px;
                    height: 2px;
                    background: linear-gradient(90deg, var(--primary) 0%, var(--primary-light) 100%);
                    border-radius: var(--radius-full);
                }
                
                /* CTA Section */
                .cta-section {
                    padding: var(--space-24) 0;
                    background: white;
                }
                
                .cta-card {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: var(--space-12);
                    background: var(--gradient-hero);
                    border-radius: var(--radius-2xl);
                    color: white;
                }
                
                .cta-title {
                    font-size: var(--text-3xl);
                    color: white;
                    margin-bottom: var(--space-2);
                }
                
                .cta-description {
                    color: rgba(255, 255, 255, 0.8);
                    max-width: 400px;
                }
                
                .cta-actions .btn-primary {
                    background: white;
                    color: var(--primary);
                    box-shadow: var(--shadow-lg);
                }
                
                .cta-actions .btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: var(--shadow-xl);
                }
                
                /* Responsive */
                @media (max-width: 1024px) {
                    .hero-grid {
                        grid-template-columns: 1fr;
                        text-align: center;
                    }
                    
                    .hero-description {
                        margin: 0 auto var(--space-8);
                    }
                    
                    .hero-actions {
                        justify-content: center;
                    }
                    
                    .hero-stats {
                        justify-content: center;
                    }
                    
                    .hero-visual {
                        display: none;
                    }
                    
                    .features-grid {
                        grid-template-columns: 1fr;
                        max-width: 400px;
                        margin: 0 auto;
                    }
                }
                
                @media (max-width: 768px) {
                    .hero-title {
                        font-size: var(--text-4xl);
                    }
                    
                    .hero-stats {
                        flex-direction: column;
                        gap: var(--space-4);
                    }
                    
                    .steps-grid {
                        flex-direction: column;
                        align-items: center;
                    }
                    
                    .step-connector {
                        transform: rotate(90deg);
                        padding: var(--space-4);
                    }
                    
                    .cta-card {
                        flex-direction: column;
                        text-align: center;
                        gap: var(--space-6);
                    }
                    
                    .cta-description {
                        margin: 0 auto;
                    }
                }
            </style>
        `;
    },

    afterRender() {
        // Animate stats
        this.animateStats();

        // Add scroll effect to navbar
        window.addEventListener('scroll', this.handleScroll);
    },

    animateStats() {
        const statValues = document.querySelectorAll('.hero-stat-value');
        statValues.forEach(el => {
            const target = parseInt(el.dataset.count);
            if (target) {
                Components.animateValue(el, 0, target, 2000);
            }
        });
    },

    handleScroll() {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    },

    destroy() {
        window.removeEventListener('scroll', this.handleScroll);
    }
};
