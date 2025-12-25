const ProfilePage = {
    render() {
        const user = Auth.getUser();
        const role = user?.role === 'admin' ? 'admin' : 'student';

        return `
            <div class="dashboard-layout">
                ${Components.sidebar(role, 'profile')}
                
                <main class="dashboard-main">
                    <header class="dashboard-header">
                        <h1>👤 Profil Saya</h1>
                        <p>Informasi akun Anda</p>
                    </header>

                    <section class="profile-card" style="padding:24px;">
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
                            <div>
                                <p><b>Nama:</b><br/>${user.name}</p>
                                <p><b>${user.role === 'admin' ? 'Username' : 'NIM'}:</b><br/>${user.nim}</p>
                                <p><b>Email:</b><br/>${user.email}</p>
                            </div>
                            <div>
                                <p><b>Fakultas:</b><br/>${user.faculty}</p>
                                <p><b>Jurusan:</b><br/>${user.major}</p>
                                <p><b>Role:</b><br/>${user.role}</p>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        `;
    }
};
