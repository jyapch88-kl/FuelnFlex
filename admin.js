class AdminDashboard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    --primary-color: oklch(98% 0.02 240);
                    --text-color: oklch(25% 0.05 240);
                    --accent-color: oklch(60% 0.25 290);
                    --accent-glow: oklch(70% 0.3 290 / 50%);
                    --card-bg: oklch(100% 0 0);
                    --shadow-color: oklch(25% 0.05 240 / 20%);
                    --border-color: oklch(90% 0.02 240);
                    --font-sans: 'Poppins', sans-serif;
                }
                .admin-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                }
                 .admin-header a {
                    background-color: var(--accent-color, #8a2be2);
                    color: white;
                    padding: 0.8rem 1.5rem;
                    border-radius: 8px;
                    text-decoration: none;
                    font-weight: 600;
                    transition: all 0.3s ease;
                 }
                .admin-header a:hover {
                    box-shadow: 0 0 15px var(--accent-glow, #8a2be280);
                    transform: translateY(-2px);
                }
                .admin-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                }
                .admin-card {
                    background: var(--card-bg, #fff);
                    padding: 1.5rem;
                    border-radius: 12px;
                    box-shadow: 0 4px 10px var(--shadow-color, rgba(0,0,0,0.1));
                    border: 1px solid var(--border-color, #eee);
                }
                h2 {
                    font-weight: 700;
                    margin-top: 0;
                    font-size: 1.8rem;
                }
            </style>
            <div class="admin-header">
                <h2>Admin Dashboard</h2>
                <a href="/app.html">Back to App</a>
            </div>
            <div class="admin-grid">
                <div class="admin-card">
                    <h3>Web Traffic</h3>
                    <p>Daily Active Users: 1,234</p>
                    <p>Weekly Active Users: 5,678</p>
                </div>
                <div class="admin-card">
                    <h3>User Statistics</h3>
                    <p>Total Users: 10,000</p>
                    <p>New Users This Week: 500</p>
                </div>
            </div>
        `;
    }
}

customElements.define('admin-dashboard', AdminDashboard);
