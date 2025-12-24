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

    const routePath = '/' + segments.join('/');
    const params = segments.slice(1);

    if (this.routes[routePath]) {
        this.currentRoute = routePath;
        this.routes[routePath](params);
    } else {
        this.navigate('/');
    }
},


    // Get current route
    getCurrentRoute() {
        return this.currentRoute;
    }
};
