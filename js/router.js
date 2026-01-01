// ============================================
// VoteKampus - Simple Router
// ============================================
console.log("ROUTER UPDATE AKTIF");

const Router = {
    routes: {},
    currentRoute: null,
    
    // Initialize router
    init() {
        window.addEventListener('hashchange', () => this.handleRoute());
        window.addEventListener('load', () => this.handleRoute());
    },
    
    // Register a route
    register(path, handler) {
        this.routes[path] = handler;
    },
    
    // Navigate to a route
    navigate(path) {
        window.location.hash = path;
    },
    
    // Handle route changes
    handleRoute() {
        const hash = window.location.hash.slice(1) || '/';
        const segments = hash.split('/').filter(Boolean);

        const fullPath = '/' + segments.join('/');
        const basePath = '/' + (segments[0] || '');
        const params = segments.slice(1);

        // Prefer exact match first (e.g., '/admin/polling')
        if (this.routes[fullPath]) {
            this.currentRoute = fullPath;
            this.routes[fullPath]([]);
            return;
        }

        // Fallback: base route with params (e.g., '/vote/1' -> '/vote', ['1'])
        if (this.routes[basePath]) {
            this.currentRoute = basePath;
            this.routes[basePath](params);
            return;
        }

        // Unknown route -> go home
        this.navigate('/');
    },


    // Get current route
    getCurrentRoute() {
        return this.currentRoute;
    }
};
