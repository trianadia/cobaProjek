const ProfilePage = {
    render() {
        const user = Auth.getUser();

        return `
            <div class="dashboard-layout">
                ${Components.sidebar('student', 'profile')}
                
                <main class="dashboard-main">
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
                </main>
            </div>
        `;
    }
};
