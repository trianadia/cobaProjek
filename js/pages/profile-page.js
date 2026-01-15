const ProfilePage = {
    render() {
        const user = Auth.getUser();
        const role = user?.role === 'admin' ? 'admin' : 'student';

        // Generate avatar dengan inisial
        const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();
        const avatarBg = user.role === 'admin' ? '#667EEA' : '#10B981';

        return `
            <div class="dashboard-layout">
                ${Components.sidebar(role, 'profile')}
                
                <main class="dashboard-main">
                    <section style="display:grid; grid-template-columns:1fr; gap:20px;">
                        <!-- Card Profil Utama -->
                        <div class="card" style="padding:0; overflow:hidden; border:1px solid var(--neutral-200); border-radius:16px;">
                            <!-- Background Header -->
                            <div style="background: linear-gradient(135deg, ${avatarBg} 0%, ${user.role === 'admin' ? '#764ba2' : '#059669'} 100%); height:120px;"></div>
                            
                            <!-- Konten Profil -->
                            <div style="padding:0 24px 24px 24px;">
                                <div style="display:flex; gap:20px; margin-top:-60px; margin-bottom:20px; align-items:flex-end;">
                                    <!-- Avatar -->
                                    <div style="width:120px; height:120px; border-radius:16px; background:${avatarBg}; display:flex; align-items:center; justify-content:center; color:white; font-size:48px; font-weight:700; border:4px solid white; box-shadow:0 4px 12px rgba(0,0,0,0.15);">
                                        ${initials}
                                    </div>
                                    
                                    <!-- Info Singkat -->
                                    <div style="flex:1; margin-bottom:8px;">
                                        <h2 style="font-size:24px; font-weight:700; margin:0; color:var(--neutral-900);">${user.name}</h2>
                                        <p style="margin:4px 0 0 0; color:var(--neutral-600); font-size:14px;">
                                            <span class="badge badge-${user.role === 'admin' ? 'primary' : 'success'}">
                                                ${user.role === 'admin' ? '👨‍💼 Administrator' : '👨‍🎓 Mahasiswa'}
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                <!-- Detail Profil -->
                                <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px;">
                                    <div>
                                        <h3 style="font-size:12px; font-weight:700; color:var(--neutral-500); text-transform:uppercase; letter-spacing:0.5px; margin:0 0 12px 0;">Informasi Pribadi</h3>
                                        <div style="display:flex; flex-direction:column; gap:16px;">
                                            <div>
                                                <p style="font-size:12px; color:var(--neutral-500); text-transform:uppercase; font-weight:600; margin:0 0 4px 0;">Nama</p>
                                                <p style="font-size:15px; color:var(--neutral-900); font-weight:500; margin:0;">${user.name}</p>
                                            </div>
                                            <div>
                                                <p style="font-size:12px; color:var(--neutral-500); text-transform:uppercase; font-weight:600; margin:0 0 4px 0;">${user.role === 'admin' ? 'Username' : 'NIM'}</p>
                                                <p style="font-size:15px; color:var(--neutral-900); font-weight:500; margin:0; font-family:monospace;">${user.nim}</p>
                                            </div>
                                            <div>
                                                <p style="font-size:12px; color:var(--neutral-500); text-transform:uppercase; font-weight:600; margin:0 0 4px 0;">Email</p>
                                                <p style="font-size:15px; color:var(--neutral-900); font-weight:500; margin:0; word-break:break-all;">${user.email}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 style="font-size:12px; font-weight:700; color:var(--neutral-500); text-transform:uppercase; letter-spacing:0.5px; margin:0 0 12px 0;">Informasi Institusi</h3>
                                        <div style="display:flex; flex-direction:column; gap:16px;">
                                            <div>
                                                <p style="font-size:12px; color:var(--neutral-500); text-transform:uppercase; font-weight:600; margin:0 0 4px 0;">Fakultas</p>
                                                <p style="font-size:15px; color:var(--neutral-900); font-weight:500; margin:0;">${user.faculty || (user.role === 'admin' ? 'Admin' : '-')}</p>
                                            </div>
                                            <div>
                                                <p style="font-size:12px; color:var(--neutral-500); text-transform:uppercase; font-weight:600; margin:0 0 4px 0;">Jurusan</p>
                                                <p style="font-size:15px; color:var(--neutral-900); font-weight:500; margin:0;">${user.major || '-'}</p>
                                            </div>
                                            <div>
                                                <p style="font-size:12px; color:var(--neutral-500); text-transform:uppercase; font-weight:600; margin:0 0 4px 0;">Role</p>
                                                <p style="font-size:15px; color:var(--neutral-900); font-weight:500; margin:0; text-transform:capitalize;">${user.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Aksi -->
                        <div class="card" style="padding:20px; border:1px solid var(--neutral-200); border-radius:12px;">
                            <h3 style="font-size:14px; font-weight:700; margin:0 0 12px 0; color:var(--neutral-900);">Aksi Akun</h3>
                            <div style="display:flex; gap:12px; flex-wrap:wrap;">
                                <button class="btn btn-outline" id="editProfileBtn">
                                    ✏️ Edit Profil
                                </button>
                                <button class="btn btn-outline" id="changePasswordBtn">
                                    🔐 Ubah Password
                                </button>
                                <button class="btn btn-danger" style="margin-left:auto;" onclick="Auth.logout()">
                                    🚪 Logout
                                </button>
                            </div>
                        </div>
                    </section>

                    <style>
                        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap');
                        
                        .dashboard-main {
                            font-family: 'Lora', serif;
                        }
                        .card {
                            background: white;
                            border-radius: 12px;
                            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                        }
                        .form-grid {
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            gap: 16px 20px;
                        }
                        .form-grid .full-width {
                            grid-column: 1 / -1;
                        }
                        .modal-actions {
                            display: flex;
                            justify-content: flex-end;
                            gap: 8px;
                        }
                        /* Modal-specific polish */
                        #editProfileModal .modal-body,
                        #changePasswordModal .modal-body {
                            background: linear-gradient(180deg, #f8fafc 0%, #ffffff 30%);
                            padding: 5px 20px 12px;
                        }
                        #editProfileModal .form-group,
                        #changePasswordModal .form-group {
                            margin-bottom: 12px;
                        }
                        #editProfileModal .form-label,
                        #changePasswordModal .form-label {
                            font-weight: 600;
                            color: var(--neutral-700);
                        }
                        #editProfileModal .form-input,
                        #changePasswordModal .form-input {
                            border-color: var(--neutral-200);
                            background: white;
                            font-size: 14px;
                        }
                        #editProfileModal .form-input:focus,
                        #changePasswordModal .form-input:focus {
                            border-color: var(--primary);
                            box-shadow: 0 0 0 3px var(--primary-100);
                        }
                        @media (max-width: 720px) {
                            .form-grid {
                                grid-template-columns: 1fr;
                            }
                        }
                    </style>
                </main>
            </div>

            ${Components.modal('editProfileModal', 'Edit Profil', `
                <form id="editProfileForm" class="form-grid">
                    <div class="form-group">
                        <label class="form-label">Nama</label>
                        <input class="form-input" type="text" name="name" value="${user.name}" placeholder="Nama lengkap" required />
                    </div>
                    <div class="form-group">
                        <label class="form-label">${user.role === 'admin' ? 'Username' : 'NIM'}</label>
                        <input class="form-input" type="text" name="nim" value="${user.nim}" placeholder="${user.role === 'admin' ? 'Username' : 'Nomor Induk Mahasiswa'}" required />
                    </div>
                    <div class="form-group">
                        <label class="form-label">Email</label>
                        <input class="form-input" type="email" name="email" value="${user.email}" placeholder="Email kampus" required />
                    </div>
                    <div class="form-group">
                        <label class="form-label">Fakultas</label>
                        <input class="form-input" type="text" name="faculty" value="${user.faculty || ''}" placeholder="Nama fakultas" />
                    </div>
                    <div class="form-group full-width">
                        <label class="form-label">Jurusan</label>
                        <input class="form-input" type="text" name="major" value="${user.major || ''}" placeholder="Jurusan / Program studi" />
                    </div>
                </form>
            `, `
                <div class="modal-actions">
                    <button type="button" class="btn btn-outline" onclick="Components.closeModal('editProfileModal')">Batal</button>
                    <button type="submit" form="editProfileForm" class="btn btn-primary">Simpan Perubahan</button>
                </div>
            `)}

            ${Components.modal('changePasswordModal', 'Ubah Password', `
                <form id="changePasswordForm" class="form-grid">
                    <div class="form-group full-width">
                        <label class="form-label">Password Saat Ini</label>
                        <input class="form-input" type="password" name="currentPassword" placeholder="Masukkan password sekarang" required />
                    </div>
                    <div class="form-group">
                        <label class="form-label">Password Baru</label>
                        <input class="form-input" type="password" name="newPassword" minlength="6" placeholder="Minimal 6 karakter" required />
                    </div>
                    <div class="form-group">
                        <label class="form-label">Konfirmasi Password Baru</label>
                        <input class="form-input" type="password" name="confirmPassword" minlength="6" placeholder="Ulangi password baru" required />
                    </div>
                </form>
            `, `
                <div class="modal-actions">
                    <button type="button" class="btn btn-outline" onclick="Components.closeModal('changePasswordModal')">Batal</button>
                    <button type="submit" form="changePasswordForm" class="btn btn-primary">Simpan Password</button>
                </div>
            `)}
        `;
    },

    afterRender() {
        const editBtn = document.getElementById('editProfileBtn');
        const changeBtn = document.getElementById('changePasswordBtn');

        editBtn?.addEventListener('click', () => Components.openModal('editProfileModal'));
        changeBtn?.addEventListener('click', () => Components.openModal('changePasswordModal'));

        const editProfileForm = document.getElementById('editProfileForm');
        if (editProfileForm) {
            editProfileForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);

                const payload = {
                    name: (formData.get('name') || '').toString().trim(),
                    nim: (formData.get('nim') || '').toString().trim(),
                    email: (formData.get('email') || '').toString().trim(),
                    faculty: (formData.get('faculty') || '').toString().trim(),
                    major: (formData.get('major') || '').toString().trim()
                };

                Auth.updateUser(payload);
                Components.showToast('Berhasil', 'Profil berhasil diperbarui', 'success');
                Components.closeModal('editProfileModal');
                App.renderPage(ProfilePage);
            });
        }

        const changePasswordForm = document.getElementById('changePasswordForm');
        if (changePasswordForm) {
            changePasswordForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);

                const currentPassword = (formData.get('currentPassword') || '').toString();
                const newPassword = (formData.get('newPassword') || '').toString();
                const confirmPassword = (formData.get('confirmPassword') || '').toString();

                if (newPassword.length < 6) {
                    Components.showToast('Gagal', 'Password baru minimal 6 karakter', 'error');
                    return;
                }

                if (newPassword !== confirmPassword) {
                    Components.showToast('Gagal', 'Konfirmasi password tidak cocok', 'error');
                    return;
                }

                const result = Auth.changePassword(currentPassword, newPassword);
                if (!result.success) {
                    Components.showToast('Gagal', result.error || 'Tidak dapat mengubah password', 'error');
                    return;
                }

                Components.showToast('Berhasil', 'Password berhasil diubah', 'success');
                Components.closeModal('changePasswordModal');
                changePasswordForm.reset();
            });
        }
    }
};
