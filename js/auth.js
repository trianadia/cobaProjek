// ============================================
// VoteKampus - Authentication Module
// ============================================

const Auth = {
    // Storage key
    STORAGE_KEY: 'votekampus_user',

    // Demo users for testing
    demoUsers: [
        {
            id: 1,
            nim: '2021001',
            email: 'ahmad@student.kampus.ac.id',
            password: 'demo123',
            name: 'Ahmad Rizki',
            role: 'student',
            faculty: 'Fakultas Teknik',
            major: 'Teknik Informatika'
        },
        {
            id: 2,
            nim: '2021002',
            email: 'siti@student.kampus.ac.id',
            password: 'demo123',
            name: 'Siti Nurhaliza',
            role: 'student',
            faculty: 'Fakultas Ekonomi',
            major: 'Manajemen'
        },
        {
            id: 3,
            nim: 'admin',
            email: 'admin@kampus.ac.id',
            password: 'admin123',
            name: 'Admin BEM',
            role: 'admin',
            faculty: 'Admin',
            major: '-'
        }
    ],

    // Login
    login(nimOrEmail, password) {
        const user = this.demoUsers.find(u =>
            (u.nim === nimOrEmail || u.email === nimOrEmail)
        );

        if (user) {
            const savedPassword = localStorage.getItem(`${this.STORAGE_KEY}_password_${user.nim}`);
            const expectedPassword = savedPassword || user.password;

            if (password !== expectedPassword) {
                return { success: false, error: 'NIM/Email atau password salah' };
            }

            const userData = { ...user };
            delete userData.password;

            // ✅ Simpan di sessionStorage (hilang saat tab ditutup/refresh)
            sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(userData));

            return { success: true, user: userData };
        }

        return { success: false, error: 'NIM/Email atau password salah' };
    },

    // Logout
    logout() {
        sessionStorage.removeItem(this.STORAGE_KEY);
        Router.navigate('/');
        Components.showToast('Berhasil', 'Anda telah keluar dari sistem', 'success');
    },

    // Get current user
    getUser() {
        const userData = sessionStorage.getItem(this.STORAGE_KEY);
        return userData ? JSON.parse(userData) : null;
    },

    // Update user profile in current session
    updateUser(updates) {
        const user = this.getUser();
        if (!user) return null;

        const updatedUser = { ...user, ...updates };
        sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedUser));
        return updatedUser;
    },

    // Check if logged in
    isLoggedIn() {
        return this.getUser() !== null;
    },

    // Check if admin
    isAdmin() {
        const user = this.getUser();
        return user && user.role === 'admin';
    },

    // Protected route middleware
    requireAuth(callback) {
        if (!this.isLoggedIn()) {
            Router.navigate('/login');
            return false;
        }
        return callback();
    },

    // Admin only middleware
    requireAdmin(callback) {
        if (!this.isAdmin()) {
            Router.navigate('/dashboard');
            Components.showToast(
                'Akses Ditolak',
                'Anda tidak memiliki izin untuk mengakses halaman ini',
                'error'
            );
            return false;
        }
        return callback();
    },

    // Change password (demo-level persistence using localStorage)
    changePassword(currentPassword, newPassword) {
        const user = this.getUser();
        if (!user) {
            return { success: false, error: 'Anda belum login' };
        }

        const savedPassword = localStorage.getItem(`${this.STORAGE_KEY}_password_${user.nim}`);
        const demoUser = this.demoUsers.find(u => u.nim === user.nim || u.email === user.email);
        const expectedPassword = savedPassword || demoUser?.password;

        if (!expectedPassword) {
            return { success: false, error: 'Data pengguna tidak ditemukan' };
        }

        if (currentPassword !== expectedPassword) {
            return { success: false, error: 'Password saat ini tidak sesuai' };
        }

        localStorage.setItem(`${this.STORAGE_KEY}_password_${user.nim}`, newPassword);
        return { success: true };
    }
};
