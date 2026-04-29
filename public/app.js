const App = {
    state: { page: 'loading', rituals: [] },
    init() {
        this.loadStorage();
        this.render('hero');
        console.log("AI Pouring Engine Ready");
    },
    loadStorage() {
        this.state.rituals = JSON.parse(localStorage.getItem('hk_rituals')) || [];
    },
    render(page) {
        const container = document.getElementById('main-content');
        // Lógica de ruteo simplificada
        const templates = {
            hero: `<h1>Ritual Digital</h1><button class="btn-main" onclick="App.startScan()">EMPEZAR</button>`,
            scan: `<div class="loader">Detectando Contexto...</div>`
        };
        container.innerHTML = templates[page];
    },
    startScan() {
        this.render('scan');
        setTimeout(() => this.getWeather(), 1500);
    },
    async getWeather() {
        // Reducido: Llamada a API simplificada
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-34.60&longitude=-58.38&current_weather=true');
        const data = await res.json();
        this.state.weather = data.current_weather;
        this.render('result');
    }
};
App.init();
