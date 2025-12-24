// ============================================
// VoteKampus - Main Application
// ============================================

localStorage.removeItem('votekampus_user');

const App = {
    // Current page instance for cleanup
    currentPage: null,

    // Initialize application
    init() {
        console.log('🗳️ VoteKampus - Initializing...');

        // Register routes
        this.registerRoutes();

        // Initialize router
        Router.init();

        console.log('✅ VoteKampus - Ready!');
    },

    // Register all routes
    registerRoutes() {
        // Public routes
        Router.register('/', () => this.renderPage(LandingPage));
        Router.register('/login', () => this.renderPage(LoginPage));
        Router.register('/tentang', () => {
            this.renderPage(LandingPage);
            setTimeout(() => {
                document.getElementById('tentang')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        });

        Router.register('/fitur', () => {
            this.renderPage(LandingPage);
            setTimeout(() => {
                document.getElementById('fitur')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        });

        Router.register('/kontak', () => {
            this.renderPage(LandingPage);
            setTimeout(() => {
                document.getElementById('kontak')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        });


        // Student routes (protected)
        Router.register('/dashboard', () => {
            Auth.requireAuth(() => this.renderPage(StudentDashboard, ['dashboard']));
        });

        Router.register('/polling', () => {
            Auth.requireAuth(() => this.renderPage(StudentDashboard, ['polling']));
        });

        Router.register('/vote', (params) => {
            Auth.requireAuth(() => this.renderPage(VotingPage, params));
        });

        Router.register('/history', () => {
            Auth.requireAuth(() => this.renderPage(StudentDashboard, ['history']));
        });

        Router.register('/results', () => {
            Auth.requireAuth(() => this.renderPage(StudentDashboard, ['results']));
        });

        Router.register('/profile', () => {
            Auth.requireAuth(() => this.renderPage(StudentDashboard));
        });

        // Admin routes (protected + admin only)
        Router.register('/admin', () => {
            Auth.requireAuth(() => {
                Auth.requireAdmin(() => this.renderPage(AdminDashboard, ['dashboard']));
            });
        });

        Router.register('/admin/polling', () => {
            Auth.requireAuth(() => {
                Auth.requireAdmin(() => this.renderPage(AdminDashboard, ['polling']));
            });
        });

        Router.register('/admin/create', () => {
            Auth.requireAuth(() => {
                Auth.requireAdmin(() => this.renderPage(AdminDashboard, ['create']));
            });
        });

        Router.register('/admin/analytics', () => {
            Auth.requireAuth(() => {
                Auth.requireAdmin(() => this.renderPage(AdminDashboard, ['analytics']));
            });
        });

        Router.register('/admin/students', () => {
            Auth.requireAuth(() => {
                Auth.requireAdmin(() => this.renderPage(AdminDashboard, ['students']));
            });
        });

    },

    // Render a page
    renderPage(page, params = []) {
        // Cleanup previous page
        if (this.currentPage && this.currentPage.destroy) {
            this.currentPage.destroy();
        }

        // Get the app container
        const app = document.getElementById('app');
        if (!app) return;

        // Render the page
        app.innerHTML = page.render(params);

        // Call afterRender if exists
        if (page.afterRender) {
            page.afterRender();
        }

        // Store current page
        this.currentPage = page;

        // Scroll to top
        window.scrollTo(0, 0);
    },

    // Toggle mobile menu
    toggleMobileMenu() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');

        if (sidebar) {
            sidebar.classList.toggle('open');
        }
        if (overlay) {
            overlay.classList.toggle('visible');
        }
    },

    // Close sidebar
    closeSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');

        if (sidebar) {
            sidebar.classList.remove('open');
        }
        if (overlay) {
            overlay.classList.remove('visible');
        }
    }
};

// Start the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => App.init());
