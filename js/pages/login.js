// ============================================
// VoteKampus - Login Page
// ============================================

const LoginPage = {
    showPassword: false,

    render() {
        return `
            <div class="login-page">
                <!-- Left Side - Branding -->
                <div class="login-branding">
                    <div class="login-branding-content">
                        <a href="#/" class="login-logo">
                            <span class="login-logo-icon">🗳️</span>
                            <span>VoteKampus</span>
                        </a>
                        <div class="login-branding-text">
                            <h1>Satu Suara,<br>Satu Perubahan</h1>
                            <p>Berpartisipasilah dalam menentukan masa depan organisasi mahasiswa kampus kita.</p>
                        </div>
                        <div class="login-branding-features">
                            <div class="login-feature">
                                ${Components.icons.shield}
                                <span>Voting Aman & Rahasia</span>
                            </div>
                            <div class="login-feature">
                                ${Components.icons.zap}
                                <span>Proses Cepat & Mudah</span>
                            </div>
                            <div class="login-feature">
                                ${Components.icons.activity}
                                <span>Hasil Real-time</span>
                            </div>
                        </div>
                    </div>
                    <div class="login-branding-pattern"></div>
                </div>
                
                <!-- Right Side - Form -->
                <div class="login-form-container">
                    <div class="login-form-wrapper animate-fadeInUp">
                        <div class="login-form-header">
                            <h2>Masuk ke Akun</h2>
                            <p>Gunakan NIM dan password yang terdaftar</p>
                        </div>
                        
                        <form id="loginForm" onsubmit="LoginPage.handleSubmit(event)">
                            <div id="loginError" class="login-error hidden">
                                ${Components.icons.alertCircle}
                                <span id="loginErrorText"></span>
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label" for="nim">NIM / Email</label>
                                <div class="input-icon-wrapper">
                                    <span class="input-icon">${Components.icons.user}</span>
                                    <input 
                                        type="text" 
                                        id="nim" 
                                        class="form-input" 
                                        placeholder="Masukkan NIM atau Email"
                                        autocomplete="username"
                                        required
                                    >
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label" for="password">Password</label>
                                <div class="input-icon-wrapper">
                                    <span class="input-icon">${Components.icons.lock}</span>
                                    <input 
                                        type="password" 
                                        id="password" 
                                        class="form-input" 
                                        placeholder="Masukkan password"
                                        autocomplete="current-password"
                                        required
                                    >
                                    <button type="button" class="input-icon-right" onclick="LoginPage.togglePassword()">
                                        <span id="passwordToggleIcon">${Components.icons.eye}</span>
                                    </button>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label class="form-check">
                                    <input type="checkbox" class="form-check-input" id="remember">
                                    <span class="form-check-label">Ingat saya di perangkat ini</span>
                                </label>
                            </div>
                            
                            <button type="submit" class="btn btn-primary btn-lg w-full" id="loginButton">
                                <span id="loginButtonText">Masuk</span>
                                <span id="loginSpinner" class="hidden">${Components.spinner('sm')}</span>
                            </button>
                        </form>
                        
                        <div class="login-footer">
                            <a href="#/forgot-password" class="login-link">Lupa password?</a>
                        </div>
                        
                        <div class="login-demo">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <style>
                .login-page {
                    display: flex;
                    min-height: 100vh;
                }
                
                /* Left Branding Side */
                .login-branding {
                    position: relative;
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--gradient-hero);
                    padding: var(--space-12);
                    overflow: hidden;
                }
                
                .login-branding-pattern {
                    position: absolute;
                    inset: 0;
                    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
                }
                
                .login-branding-content {
                    position: relative;
                    z-index: 1;
                    max-width: 480px;
                    color: white;
                }
                
                .login-logo {
                    display: flex;
                    align-items: center;
                    gap: var(--space-3);
                    font-family: var(--font-display);
                    font-size: var(--text-2xl);
                    font-weight: var(--font-bold);
                    color: white;
                    text-decoration: none;
                    margin-bottom: var(--space-12);
                }
                
                .login-logo-icon {
                    width: 48px;
                    height: 48px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: var(--radius-xl);
                    font-size: var(--text-2xl);
                }
                
                .login-branding-text h1 {
                    font-size: var(--text-5xl);
                    font-weight: var(--font-extrabold);
                    line-height: 1.2;
                    color: white;
                    margin-bottom: var(--space-6);
                }
                
                .login-branding-text p {
                    font-size: var(--text-lg);
                    color: rgba(255, 255, 255, 0.8);
                    margin-bottom: var(--space-10);
                }
                
                .login-branding-features {
                    display: flex;
                    flex-direction: column;
                    gap: var(--space-4);
                }
                
                .login-feature {
                    display: flex;
                    align-items: center;
                    gap: var(--space-3);
                    font-size: var(--text-sm);
                    color: rgba(255, 255, 255, 0.9);
                }
                
                .login-feature svg {
                    opacity: 0.8;
                }
                
                /* Right Form Side */
                .login-form-container {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: var(--space-12);
                    background: white;
                }
                
                .login-form-wrapper {
                    width: 100%;
                    max-width: 400px;
                }
                
                .login-form-header {
                    margin-bottom: var(--space-8);
                }
                
                .login-form-header h2 {
                    font-size: var(--text-3xl);
                    margin-bottom: var(--space-2);
                }
                
                .login-form-header p {
                    color: var(--neutral-500);
                }
                
                .login-error {
                    display: flex;
                    align-items: center;
                    gap: var(--space-3);
                    padding: var(--space-4);
                    background: var(--danger-light);
                    color: var(--danger);
                    border-radius: var(--radius-lg);
                    margin-bottom: var(--space-6);
                    font-size: var(--text-sm);
                }
                
                .login-error.hidden {
                    display: none;
                }
                
                .login-footer {
                    margin-top: var(--space-6);
                    text-align: center;
                }
                
                .login-link {
                    font-size: var(--text-sm);
                    color: var(--primary);
                    text-decoration: none;
                }
                
                .login-link:hover {
                    text-decoration: underline;
                }
                
                .login-demo {
                    margin-top: var(--space-8);
                    padding-top: var(--space-6);
                    border-top: 1px solid var(--neutral-200);
                    text-align: center;
                }
                
                .login-demo p {
                    font-size: var(--text-sm);
                    color: var(--neutral-500);
                    margin-bottom: var(--space-3);
                }
                
                .login-demo-accounts {
                    display: flex;
                    gap: var(--space-3);
                    justify-content: center;
                }
                
                .login-demo-btn {
                    padding: var(--space-2) var(--space-4);
                    background: var(--neutral-100);
                    border: 1px solid var(--neutral-200);
                    border-radius: var(--radius-lg);
                    font-size: var(--text-sm);
                    cursor: pointer;
                    transition: all var(--transition-fast);
                }
                
                .login-demo-btn:hover {
                    background: var(--primary-50);
                    border-color: var(--primary-light);
                }
                
                /* Responsive */
                @media (max-width: 1024px) {
                    .login-branding {
                        display: none;
                    }
                    
                    .login-form-container {
                        padding: var(--space-6);
                    }
                }
            </style>
        `;
    },

    afterRender() {
        // Focus on NIM input
        const nimInput = document.getElementById('nim');
        if (nimInput) {
            nimInput.focus();
        }
    },

    togglePassword() {
        this.showPassword = !this.showPassword;
        const passwordInput = document.getElementById('password');
        const toggleIcon = document.getElementById('passwordToggleIcon');

        if (passwordInput) {
            passwordInput.type = this.showPassword ? 'text' : 'password';
            toggleIcon.innerHTML = this.showPassword ? Components.icons.eyeOff : Components.icons.eye;
        }
    },

    handleSubmit(e) {
        e.preventDefault();

        const nim = document.getElementById('nim').value;
        const password = document.getElementById('password').value;
        const loginButton = document.getElementById('loginButton');
        const loginButtonText = document.getElementById('loginButtonText');
        const loginSpinner = document.getElementById('loginSpinner');
        const loginError = document.getElementById('loginError');
        const loginErrorText = document.getElementById('loginErrorText');

        // Show loading
        loginButton.disabled = true;
        loginButtonText.textContent = 'Memproses...';
        loginSpinner.classList.remove('hidden');
        loginError.classList.add('hidden');

        // Simulate API call
        setTimeout(() => {
            const result = Auth.login(nim, password);

            if (result.success) {
                Components.showToast('Berhasil', `Selamat datang, ${result.user.name}!`, 'success');

                // Redirect based on role
                if (result.user.role === 'admin') {
                    Router.navigate('/admin');
                } else {
                    Router.navigate('/dashboard');
                }
            } else {
                // Show error
                loginError.classList.remove('hidden');
                loginErrorText.textContent = result.error;

                // Reset button
                loginButton.disabled = false;
                loginButtonText.textContent = 'Masuk';
                loginSpinner.classList.add('hidden');
            }
        }, 1000);
    }
};
