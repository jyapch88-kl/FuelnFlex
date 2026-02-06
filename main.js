// Global premium state management
window.FuelFlexApp = window.FuelFlexApp || {};
window.FuelFlexApp.isPremium = localStorage.getItem('ff_premium') === 'true' || false;

class MainNavigation extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.mobileMenuOpen = false;
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            <style>
                :host {
                    display: block;
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                }
                nav {
                    background-color: var(--card-bg, #fff);
                    padding: 1rem 2rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    box-shadow: 0 2px 5px var(--shadow-color, rgba(0,0,0,0.1));
                }
                .nav-brand {
                    font-weight: 700;
                    font-size: 1.3rem;
                    color: var(--accent-color, #8a2be2);
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    white-space: nowrap;
                    overflow: visible;
                    flex-shrink: 0;
                }
                .nav-links {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 1rem;
                    flex: 1;
                }
                .hamburger {
                    display: none;
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 0.5rem;
                    flex-direction: column;
                    gap: 4px;
                }
                .hamburger span {
                    display: block;
                    width: 25px;
                    height: 3px;
                    background-color: var(--text-color, #333);
                    transition: all 0.3s ease;
                    border-radius: 2px;
                }
                .hamburger.active span:nth-child(1) {
                    transform: rotate(45deg) translate(6px, 6px);
                }
                .hamburger.active span:nth-child(2) {
                    opacity: 0;
                }
                .hamburger.active span:nth-child(3) {
                    transform: rotate(-45deg) translate(6px, -6px);
                }
                button, a {
                    background: none;
                    border: none;
                    color: var(--text-color, #333);
                    font-family: var(--font-sans, sans-serif);
                    font-size: 1rem;
                    font-weight: 600;
                    padding: 0.5rem 1rem;
                    cursor: pointer;
                    border-radius: 8px;
                    transition: all 0.3s ease;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    position: relative;
                    white-space: nowrap;
                }
                button:hover, a:hover, button.active {
                    background-color: var(--accent-color, #8a2be2);
                    color: white;
                    box-shadow: 0 0 15px var(--accent-glow, #8a2be280);
                }
                .icon {
                  font-variation-settings:
                  'FILL' 0,
                  'wght' 400,
                  'GRAD' 0,
                  'opsz' 24
                }
                .premium-badge {
                    background: linear-gradient(135deg, #FFD700, #FFA500);
                    color: #333;
                    font-size: 0.65rem;
                    padding: 0.15rem 0.4rem;
                    border-radius: 4px;
                    font-weight: 700;
                    text-transform: uppercase;
                    position: absolute;
                    top: -5px;
                    right: -5px;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                }
                .premium-user-badge {
                    background: linear-gradient(135deg, #FFD700, #FFA500);
                    color: #333;
                    padding: 0.5rem 1rem;
                    border-radius: 8px;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 0.3rem;
                    font-size: 0.9rem;
                }

                /* Mobile Styles */
                @media (max-width: 968px) {
                    nav {
                        padding: 1rem;
                        flex-wrap: wrap;
                    }
                    .hamburger {
                        display: flex;
                        order: 3;
                    }
                    .nav-brand {
                        order: 1;
                        font-size: 1.1rem;
                        flex-shrink: 0;
                        min-width: fit-content;
                    }
                    .nav-links {
                        order: 4;
                        flex-basis: 100%;
                        flex-direction: column;
                        gap: 0;
                        max-height: 0;
                        overflow: hidden;
                        transition: max-height 0.3s ease;
                    }
                    .nav-links.mobile-open {
                        max-height: 600px;
                        margin-top: 1rem;
                    }
                    button, a {
                        width: 100%;
                        justify-content: flex-start;
                        padding: 0.8rem 1rem;
                        border-radius: 0;
                        border-bottom: 1px solid var(--border-color, #eee);
                    }
                    button:last-child, a:last-child {
                        border-bottom: none;
                    }
                    .premium-user-badge {
                        order: 2;
                        padding: 0.4rem 0.8rem;
                        font-size: 0.8rem;
                    }
                }

                @media (max-width: 480px) {
                    nav {
                        padding: 0.8rem;
                    }
                    .nav-brand {
                        font-size: 1rem;
                        gap: 0.3rem;
                        flex-shrink: 0;
                        min-width: 0;
                        max-width: none;
                    }
                    .nav-brand .material-symbols-outlined {
                        font-size: 1.2rem;
                    }
                    button, a {
                        font-size: 0.95rem;
                        padding: 0.7rem 0.8rem;
                    }
                    .premium-badge {
                        font-size: 0.6rem;
                        padding: 0.1rem 0.3rem;
                    }
                }
            </style>
            <nav>
                <div class="nav-brand">
                    <span class="material-symbols-outlined">local_fire_department</span>
                    Fuel & Flex
                </div>
                ${window.FuelFlexApp.isPremium ? '<div class="premium-user-badge"><span class="material-symbols-outlined">workspace_premium</span>Premium</div>' : ''}
                <button class="hamburger" id="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <div class="nav-links" id="nav-links">
                    <a href="index.html">Home</a>
                    <button data-target="dashboard" class="active">Dashboard</button>
                    <button data-target="about-me">About Me</button>
                    <button data-target="nutrition-tracking">Nutrition Tracking</button>
                    <button data-target="fitness-goals">Fitness Goal Planning</button>
                    <button data-target="community">Community</button>
                    <button data-target="ai-health-chat" data-premium="true">
                        <span class="material-symbols-outlined icon">smart_toy</span>
                        AI Health Chat
                        <span class="premium-badge">PRO</span>
                    </button>
                    <a href="admin.html">Admin</a>
                </div>
            </nav>
        `;
    }

    connectedCallback() {
        this.shadowRoot.querySelectorAll('button[data-target]').forEach(button => {
            button.addEventListener('click', () => this.handleNavigation(button));
        });

        // Hamburger menu toggle
        const hamburger = this.shadowRoot.getElementById('hamburger');
        const navLinks = this.shadowRoot.getElementById('nav-links');

        hamburger.addEventListener('click', () => {
            this.mobileMenuOpen = !this.mobileMenuOpen;
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('mobile-open');
        });

        // Close mobile menu when a link is clicked
        this.shadowRoot.querySelectorAll('.nav-links button, .nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (this.mobileMenuOpen) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('mobile-open');
                    this.mobileMenuOpen = false;
                }
            });
        });
    }

    handleNavigation(button) {
        const targetId = button.dataset.target;
        const isPremiumFeature = button.dataset.premium === 'true';

        // Check if premium feature and user is not premium
        if (isPremiumFeature && !window.FuelFlexApp.isPremium) {
            // Show premium modal instead
            const modal = document.querySelector('pricing-modal');
            if (modal) {
                modal.show();
            }
            return;
        }

        this.shadowRoot.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        document.querySelectorAll('main > feature-section').forEach(section => {
            section.style.display = section.id === targetId ? 'block' : 'none';
        });
    }
}

class FeatureSection extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const title = this.getAttribute('title');
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    padding: clamp(1rem, 5vw, 3rem);
                }
                h2 {
                    font-size: clamp(1.8rem, 5vw, 2.5rem);
                    font-weight: 700;
                    color: var(--text-color, #333);
                    margin-bottom: 1.5rem;
                    text-align: left;
                }
            </style>
            <section>
                <h2>${title}</h2>
                <slot></slot>
            </section>
        `;
    }
}

class NutritionTracker extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Initialize meals data
        this.meals = [
            {
                id: 1,
                name: 'Breakfast Oatmeal',
                category: 'breakfast',
                calories: 350,
                protein: 12,
                carbs: 54,
                fat: 8,
                timestamp: new Date('2024-02-06T08:30:00'),
                image: null
            },
            {
                id: 2,
                name: 'Chicken Salad',
                category: 'lunch',
                calories: 420,
                protein: 35,
                carbs: 25,
                fat: 18,
                timestamp: new Date('2024-02-06T12:45:00'),
                image: null
            }
        ];

        this.dailyGoal = 2500;

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            <style>
                .nutrition-container {
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .daily-summary {
                    background: linear-gradient(135deg, var(--accent-color, #8a2be2), oklch(65% 0.3 320));
                    color: white;
                    padding: 2rem;
                    border-radius: 12px;
                    margin-bottom: 2rem;
                    box-shadow: 0 4px 10px var(--shadow-color, rgba(0,0,0,0.1));
                }
                .summary-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                    gap: 1.5rem;
                    margin-top: 1rem;
                }
                .summary-stat {
                    text-align: center;
                }
                .summary-stat .value {
                    font-size: 2rem;
                    font-weight: 700;
                    display: block;
                }
                .summary-stat .label {
                    font-size: 0.9rem;
                    opacity: 0.9;
                }
                .progress-ring {
                    width: 150px;
                    height: 150px;
                    margin: 1rem auto;
                }
                .tabs {
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 2rem;
                    border-bottom: 2px solid var(--border-color, #eee);
                }
                .tab {
                    background: none;
                    border: none;
                    padding: 1rem 1.5rem;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    color: var(--text-color, #333);
                    border-bottom: 3px solid transparent;
                    transition: all 0.3s ease;
                }
                .tab:hover {
                    color: var(--accent-color, #8a2be2);
                }
                .tab.active {
                    color: var(--accent-color, #8a2be2);
                    border-bottom-color: var(--accent-color, #8a2be2);
                }
                .tab-content {
                    display: none;
                }
                .tab-content.active {
                    display: block;
                }
                .entry-methods {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                    margin-bottom: 2rem;
                }
                .entry-card {
                    background: var(--card-bg, #fff);
                    padding: 2rem;
                    border-radius: 12px;
                    box-shadow: 0 4px 10px var(--shadow-color, rgba(0,0,0,0.1));
                    border: 1px solid var(--border-color, #eee);
                }
                .entry-card h3 {
                    margin-top: 0;
                    color: var(--accent-color, #8a2be2);
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .upload-area {
                    text-align: center;
                    padding: 2rem;
                    border: 2px dashed var(--border-color, #ccc);
                    border-radius: 12px;
                    transition: all 0.3s ease;
                    cursor: pointer;
                }
                .upload-area:hover {
                    border-color: var(--accent-color, #8a2be2);
                    background: var(--primary-color, #f9f9f9);
                }
                .upload-area.drag-over {
                    border-color: var(--accent-color, #8a2be2);
                    background: var(--primary-color, #f9f9f9);
                }
                #file-input {
                    display: none;
                }
                .upload-btn {
                    background-color: var(--accent-color, #8a2be2);
                    color: white;
                    padding: 0.8rem 1.5rem;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 1rem;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .upload-btn:hover {
                    box-shadow: 0 0 15px var(--accent-glow, #8a2be280);
                    transform: translateY(-2px);
                }
                .form-group {
                    margin-bottom: 1rem;
                }
                .form-group label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 600;
                    color: var(--text-color, #333);
                }
                .form-group input, .form-group select, .form-group textarea {
                    width: 100%;
                    padding: 0.8rem;
                    border: 1px solid var(--border-color, #ccc);
                    border-radius: 8px;
                    font-size: 1rem;
                    font-family: inherit;
                }
                .form-row {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                }
                .preview-image {
                    max-width: 100%;
                    border-radius: 8px;
                    margin-top: 1rem;
                }
                .loading {
                    text-align: center;
                    padding: 2rem;
                    display: none;
                }
                .loading.active {
                    display: block;
                }
                .spinner {
                    border: 4px solid var(--primary-color, #f0f0f0);
                    border-top: 4px solid var(--accent-color, #8a2be2);
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    animation: spin 1s linear infinite;
                    margin: 0 auto;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                .meals-list {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                .meal-card {
                    background: var(--card-bg, #fff);
                    padding: 1.5rem;
                    border-radius: 12px;
                    box-shadow: 0 4px 10px var(--shadow-color, rgba(0,0,0,0.1));
                    border: 1px solid var(--border-color, #eee);
                    display: grid;
                    grid-template-columns: auto 1fr auto;
                    gap: 1.5rem;
                    align-items: center;
                    transition: all 0.3s ease;
                }
                .meal-card:hover {
                    box-shadow: 0 6px 15px var(--shadow-color, rgba(0,0,0,0.15));
                }
                .meal-image {
                    width: 100px;
                    height: 100px;
                    border-radius: 8px;
                    object-fit: cover;
                    background: var(--primary-color, #f0f0f0);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .meal-image .icon {
                    font-size: 48px;
                    color: var(--accent-color, #8a2be2);
                }
                .meal-info {
                    flex: 1;
                }
                .meal-info h4 {
                    margin: 0 0 0.5rem 0;
                    color: var(--text-color, #333);
                    font-size: 1.2rem;
                }
                .meal-meta {
                    display: flex;
                    gap: 1rem;
                    font-size: 0.9rem;
                    color: #666;
                    margin-bottom: 0.5rem;
                }
                .category-badge {
                    background: var(--accent-color, #8a2be2);
                    color: white;
                    padding: 0.2rem 0.6rem;
                    border-radius: 12px;
                    font-size: 0.8rem;
                    font-weight: 600;
                }
                .nutrition-details {
                    display: flex;
                    gap: 1.5rem;
                    margin-top: 0.5rem;
                }
                .nutrition-item {
                    display: flex;
                    flex-direction: column;
                }
                .nutrition-item .value {
                    font-weight: 700;
                    color: var(--accent-color, #8a2be2);
                    font-size: 1.1rem;
                }
                .nutrition-item .label {
                    font-size: 0.8rem;
                    color: #666;
                }
                .meal-actions {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                .meal-actions button {
                    background: none;
                    border: 1px solid var(--border-color, #ccc);
                    padding: 0.5rem 1rem;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 0.3rem;
                }
                .meal-actions button:hover {
                    border-color: var(--accent-color, #8a2be2);
                    color: var(--accent-color, #8a2be2);
                }
                .meal-actions button.delete:hover {
                    border-color: #ff4444;
                    color: #ff4444;
                }
                .empty-state {
                    text-align: center;
                    padding: 3rem;
                    color: #666;
                }
                .empty-state .icon {
                    font-size: 64px;
                    color: #ccc;
                }
            </style>

            <div class="nutrition-container">
                <div class="daily-summary">
                    <h2 style="margin: 0 0 1rem 0;">Today's Nutrition</h2>
                    <div class="summary-grid">
                        <div class="summary-stat">
                            <span class="value" id="total-calories">770</span>
                            <span class="label">/ ${this.dailyGoal} kcal</span>
                        </div>
                        <div class="summary-stat">
                            <span class="value" id="total-protein">47</span>
                            <span class="label">Protein (g)</span>
                        </div>
                        <div class="summary-stat">
                            <span class="value" id="total-carbs">79</span>
                            <span class="label">Carbs (g)</span>
                        </div>
                        <div class="summary-stat">
                            <span class="value" id="total-fat">26</span>
                            <span class="label">Fat (g)</span>
                        </div>
                        <div class="summary-stat">
                            <span class="value" id="meals-count">2</span>
                            <span class="label">Meals Logged</span>
                        </div>
                    </div>
                </div>

                <div class="tabs">
                    <button class="tab active" data-tab="add-meal">
                        <span class="material-symbols-outlined">add_circle</span>
                        Add Meal
                    </button>
                    <button class="tab" data-tab="meal-history">
                        <span class="material-symbols-outlined">history</span>
                        Meal History
                    </button>
                </div>

                <div class="tab-content active" id="add-meal">
                    <div class="entry-methods">
                        <div class="entry-card">
                            <h3>
                                <span class="material-symbols-outlined">photo_camera</span>
                                Photo Upload
                            </h3>
                            <div class="upload-area" id="drop-zone">
                                <span class="material-symbols-outlined" style="font-size: 48px; color: var(--accent-color);">cloud_upload</span>
                                <p>Drag & drop a photo or click to browse</p>
                                <label for="file-input" class="upload-btn">
                                    <span class="material-symbols-outlined">photo_camera</span>
                                    Choose Photo
                                </label>
                                <input type="file" id="file-input" accept="image/*">
                            </div>
                            <img id="preview-image" class="preview-image" style="display: none;">
                            <div class="loading" id="photo-loading">
                                <div class="spinner"></div>
                                <p>Analyzing your food...</p>
                            </div>
                        </div>

                        <div class="entry-card">
                            <h3>
                                <span class="material-symbols-outlined">edit_note</span>
                                Manual Entry
                            </h3>
                            <form id="manual-form">
                                <div class="form-group">
                                    <label for="meal-name">Meal Name</label>
                                    <input type="text" id="meal-name" placeholder="e.g., Chicken Breast with Rice" required>
                                </div>
                                <div class="form-group">
                                    <label for="meal-category">Category</label>
                                    <select id="meal-category" required>
                                        <option value="">Select category</option>
                                        <option value="breakfast">Breakfast</option>
                                        <option value="lunch">Lunch</option>
                                        <option value="dinner">Dinner</option>
                                        <option value="snack">Snack</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="meal-calories">Calories</label>
                                    <input type="number" id="meal-calories" placeholder="e.g., 450" required>
                                </div>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="meal-protein">Protein (g)</label>
                                        <input type="number" id="meal-protein" placeholder="e.g., 30">
                                    </div>
                                    <div class="form-group">
                                        <label for="meal-carbs">Carbs (g)</label>
                                        <input type="number" id="meal-carbs" placeholder="e.g., 45">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="meal-fat">Fat (g)</label>
                                    <input type="number" id="meal-fat" placeholder="e.g., 15">
                                </div>
                                <button type="submit" class="upload-btn" style="width: 100%; justify-content: center;">
                                    <span class="material-symbols-outlined">add</span>
                                    Add Meal
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="tab-content" id="meal-history">
                    <div class="meals-list" id="meals-container">
                        <!-- Meals will be rendered here -->
                    </div>
                </div>
            </div>
        `;

        this.updateSummary();
        this.renderMeals();
    }

    connectedCallback() {
        // Tab switching
        this.shadowRoot.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = e.currentTarget.dataset.tab;
                this.switchTab(tabName);
            });
        });

        // Photo upload
        const fileInput = this.shadowRoot.getElementById('file-input');
        const dropZone = this.shadowRoot.getElementById('drop-zone');

        fileInput.addEventListener('change', (e) => this.handleFileUpload(e));

        // Drag and drop
        dropZone.addEventListener('click', () => fileInput.click());
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('drag-over');
        });
        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('drag-over');
        });
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.processPhotoUpload(files[0]);
            }
        });

        // Manual form submission
        const form = this.shadowRoot.getElementById('manual-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleManualEntry();
        });
    }

    switchTab(tabName) {
        this.shadowRoot.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        this.shadowRoot.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

        this.shadowRoot.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        this.shadowRoot.getElementById(tabName).classList.add('active');
    }

    handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;
        this.processPhotoUpload(file);
    }

    processPhotoUpload(file) {
        const loading = this.shadowRoot.getElementById('photo-loading');
        const preview = this.shadowRoot.getElementById('preview-image');

        // Show preview
        const reader = new FileReader();
        reader.onload = (e) => {
            preview.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);

        // Show loading
        loading.classList.add('active');

        // Simulate AI analysis
        setTimeout(() => {
            loading.classList.remove('active');

            // Generate mock nutrition data
            const mockData = this.generateMockNutrition();

            // Pre-fill the manual form with analyzed data
            this.shadowRoot.getElementById('meal-name').value = mockData.name;
            this.shadowRoot.getElementById('meal-calories').value = mockData.calories;
            this.shadowRoot.getElementById('meal-protein').value = mockData.protein;
            this.shadowRoot.getElementById('meal-carbs').value = mockData.carbs;
            this.shadowRoot.getElementById('meal-fat').value = mockData.fat;

            // Store the image for the meal
            this.pendingImage = preview.src;

            alert(`🍜 Food detected: ${mockData.name}\nCalories: ${mockData.calories} kcal\nProtein: ${mockData.protein}g | Carbs: ${mockData.carbs}g | Fat: ${mockData.fat}g\n\n✏️ Please review and adjust the details if needed, then click "Add Meal".\n\nNote: This is simulated AI detection. In production, this would use real computer vision API.`);
        }, 2000);
    }

    generateMockNutrition() {
        // Expanded food database with diverse cuisines (Singapore & Asian focused)
        const foods = [
            // Asian Noodles & Rice
            { name: 'Char Kway Teow', calories: 740, protein: 25, carbs: 85, fat: 32, cuisine: 'asian' },
            { name: 'Laksa', calories: 580, protein: 22, carbs: 65, fat: 28, cuisine: 'asian' },
            { name: 'Hokkien Mee', calories: 650, protein: 28, carbs: 72, fat: 30, cuisine: 'asian' },
            { name: 'Chicken Rice', calories: 550, protein: 32, carbs: 68, fat: 18, cuisine: 'asian' },
            { name: 'Nasi Lemak', calories: 680, protein: 22, carbs: 78, fat: 35, cuisine: 'asian' },
            { name: 'Fried Rice', calories: 520, protein: 18, carbs: 72, fat: 22, cuisine: 'asian' },
            { name: 'Pad Thai', calories: 490, protein: 20, carbs: 65, fat: 20, cuisine: 'asian' },
            { name: 'Pho', calories: 420, protein: 25, carbs: 55, fat: 12, cuisine: 'asian' },
            { name: 'Ramen', calories: 550, protein: 28, carbs: 68, fat: 22, cuisine: 'asian' },
            { name: 'Wonton Noodles', calories: 460, protein: 22, carbs: 58, fat: 18, cuisine: 'asian' },
            { name: 'Bak Chor Mee', calories: 480, protein: 24, carbs: 62, fat: 20, cuisine: 'asian' },
            { name: 'Ban Mian', calories: 440, protein: 20, carbs: 60, fat: 16, cuisine: 'asian' },
            { name: 'Mee Goreng', calories: 620, protein: 22, carbs: 75, fat: 28, cuisine: 'asian' },
            { name: 'Bee Hoon Goreng', calories: 580, protein: 20, carbs: 70, fat: 26, cuisine: 'asian' },

            // Asian Mains
            { name: 'Satay with Rice Cake', calories: 520, protein: 35, carbs: 45, fat: 25, cuisine: 'asian' },
            { name: 'Chicken Curry with Rice', calories: 620, protein: 30, carbs: 72, fat: 28, cuisine: 'asian' },
            { name: 'Rendang with Rice', calories: 680, protein: 32, carbs: 68, fat: 35, cuisine: 'asian' },
            { name: 'Dim Sum Platter', calories: 450, protein: 18, carbs: 52, fat: 22, cuisine: 'asian' },
            { name: 'Sushi Platter', calories: 420, protein: 22, carbs: 58, fat: 12, cuisine: 'asian' },
            { name: 'Bibimbap', calories: 560, protein: 24, carbs: 68, fat: 22, cuisine: 'asian' },

            // Western
            { name: 'Grilled Chicken Salad', calories: 350, protein: 40, carbs: 20, fat: 10, cuisine: 'western' },
            { name: 'Salmon with Vegetables', calories: 450, protein: 35, carbs: 25, fat: 20, cuisine: 'western' },
            { name: 'Pasta Carbonara', calories: 650, protein: 25, carbs: 70, fat: 28, cuisine: 'western' },
            { name: 'Beef Steak with Mashed Potato', calories: 720, protein: 42, carbs: 45, fat: 38, cuisine: 'western' },
            { name: 'Fish and Chips', calories: 840, protein: 32, carbs: 85, fat: 45, cuisine: 'western' },
            { name: 'Burger with Fries', calories: 780, protein: 30, carbs: 65, fat: 42, cuisine: 'western' },
            { name: 'Caesar Salad', calories: 380, protein: 28, carbs: 22, fat: 24, cuisine: 'western' },

            // Healthy Options
            { name: 'Poke Bowl', calories: 480, protein: 32, carbs: 55, fat: 15, cuisine: 'healthy' },
            { name: 'Quinoa Buddha Bowl', calories: 420, protein: 18, carbs: 58, fat: 14, cuisine: 'healthy' },
            { name: 'Fruit Smoothie Bowl', calories: 280, protein: 8, carbs: 55, fat: 5, cuisine: 'healthy' },
            { name: 'Acai Bowl', calories: 320, protein: 10, carbs: 62, fat: 8, cuisine: 'healthy' },

            // Snacks & Light Meals
            { name: 'Chicken Sandwich', calories: 420, protein: 28, carbs: 48, fat: 16, cuisine: 'western' },
            { name: 'Roti Prata (2 pieces)', calories: 380, protein: 12, carbs: 58, fat: 18, cuisine: 'asian' },
            { name: 'Spring Rolls (5 pieces)', calories: 340, protein: 14, carbs: 42, fat: 18, cuisine: 'asian' }
        ];

        // Simulate more intelligent detection by giving preference to Asian foods
        // (since we're Singapore-based)
        const asianFoods = foods.filter(f => f.cuisine === 'asian');
        const allFoods = foods;

        // 70% chance to detect as Asian food, 30% for all foods (simulating better Asian food recognition)
        const foodPool = Math.random() < 0.7 ? asianFoods : allFoods;

        return foodPool[Math.floor(Math.random() * foodPool.length)];
    }

    handleManualEntry() {
        const meal = {
            id: Date.now(),
            name: this.shadowRoot.getElementById('meal-name').value,
            category: this.shadowRoot.getElementById('meal-category').value,
            calories: parseInt(this.shadowRoot.getElementById('meal-calories').value) || 0,
            protein: parseInt(this.shadowRoot.getElementById('meal-protein').value) || 0,
            carbs: parseInt(this.shadowRoot.getElementById('meal-carbs').value) || 0,
            fat: parseInt(this.shadowRoot.getElementById('meal-fat').value) || 0,
            timestamp: new Date(),
            image: this.pendingImage || null
        };

        this.meals.unshift(meal);
        this.updateSummary();
        this.renderMeals();

        // Reset form
        this.shadowRoot.getElementById('manual-form').reset();
        this.shadowRoot.getElementById('preview-image').style.display = 'none';
        this.pendingImage = null;

        // Switch to history tab
        this.switchTab('meal-history');

        // Show success message
        alert(`${meal.name} added successfully!`);
    }

    deleteMeal(id) {
        if (confirm('Are you sure you want to delete this meal?')) {
            this.meals = this.meals.filter(m => m.id !== id);
            this.updateSummary();
            this.renderMeals();
        }
    }

    editMeal(id) {
        const meal = this.meals.find(m => m.id === id);
        if (!meal) return;

        // Switch to add meal tab and pre-fill form
        this.switchTab('add-meal');
        this.shadowRoot.getElementById('meal-name').value = meal.name;
        this.shadowRoot.getElementById('meal-category').value = meal.category;
        this.shadowRoot.getElementById('meal-calories').value = meal.calories;
        this.shadowRoot.getElementById('meal-protein').value = meal.protein;
        this.shadowRoot.getElementById('meal-carbs').value = meal.carbs;
        this.shadowRoot.getElementById('meal-fat').value = meal.fat;

        // Delete the old entry
        this.meals = this.meals.filter(m => m.id !== id);
        this.updateSummary();
        this.renderMeals();
    }

    updateSummary() {
        const today = new Date().toDateString();
        const todaysMeals = this.meals.filter(m => m.timestamp.toDateString() === today);

        const totals = todaysMeals.reduce((acc, meal) => ({
            calories: acc.calories + meal.calories,
            protein: acc.protein + meal.protein,
            carbs: acc.carbs + meal.carbs,
            fat: acc.fat + meal.fat
        }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

        this.shadowRoot.getElementById('total-calories').textContent = totals.calories;
        this.shadowRoot.getElementById('total-protein').textContent = totals.protein;
        this.shadowRoot.getElementById('total-carbs').textContent = totals.carbs;
        this.shadowRoot.getElementById('total-fat').textContent = totals.fat;
        this.shadowRoot.getElementById('meals-count').textContent = todaysMeals.length;
    }

    renderMeals() {
        const container = this.shadowRoot.getElementById('meals-container');

        if (this.meals.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <span class="material-symbols-outlined icon">restaurant</span>
                    <h3>No meals logged yet</h3>
                    <p>Start tracking your nutrition by adding your first meal!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.meals.map(meal => `
            <div class="meal-card">
                <div class="meal-image">
                    ${meal.image ?
                        `<img src="${meal.image}" alt="${meal.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">` :
                        `<span class="material-symbols-outlined icon">restaurant</span>`
                    }
                </div>
                <div class="meal-info">
                    <h4>${meal.name}</h4>
                    <div class="meal-meta">
                        <span class="category-badge">${meal.category}</span>
                        <span>${this.formatTime(meal.timestamp)}</span>
                    </div>
                    <div class="nutrition-details">
                        <div class="nutrition-item">
                            <span class="value">${meal.calories}</span>
                            <span class="label">Calories</span>
                        </div>
                        <div class="nutrition-item">
                            <span class="value">${meal.protein}g</span>
                            <span class="label">Protein</span>
                        </div>
                        <div class="nutrition-item">
                            <span class="value">${meal.carbs}g</span>
                            <span class="label">Carbs</span>
                        </div>
                        <div class="nutrition-item">
                            <span class="value">${meal.fat}g</span>
                            <span class="label">Fat</span>
                        </div>
                    </div>
                </div>
                <div class="meal-actions">
                    <button onclick="document.querySelector('nutrition-tracker').editMeal(${meal.id})">
                        <span class="material-symbols-outlined" style="font-size: 16px;">edit</span>
                        Edit
                    </button>
                    <button class="delete" onclick="document.querySelector('nutrition-tracker').deleteMeal(${meal.id})">
                        <span class="material-symbols-outlined" style="font-size: 16px;">delete</span>
                        Delete
                    </button>
                </div>
            </div>
        `).join('');
    }

    formatTime(date) {
        const now = new Date();
        const diff = now - date;
        const hours = Math.floor(diff / 3600000);

        if (hours < 1) return 'Just now';
        if (hours < 24) return `${hours}h ago`;
        if (date.toDateString() === now.toDateString()) return 'Today';
        if (date.toDateString() === new Date(now - 86400000).toDateString()) return 'Yesterday';
        return date.toLocaleDateString();
    }
}

class DashboardView extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Initialize data
        this.data = {
            nutrition: { current: 1500, goal: 2500 },
            workouts: { current: 3, goal: 5 },
            water: { current: 6, goal: 8 },
            steps: { current: 7500, goal: 10000 },
            sleep: { current: 6.5, goal: 8 },
            weight: { current: 75, goal: 70 }
        };

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            <style>
                .dashboard-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                    flex-wrap: wrap;
                    gap: 1rem;
                }
                .date-selector {
                    display: flex;
                    gap: 0.5rem;
                    align-items: center;
                }
                .date-selector button {
                    background: var(--card-bg, #fff);
                    border: 1px solid var(--border-color, #ccc);
                    padding: 0.5rem 1rem;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-weight: 600;
                }
                .date-selector button.active {
                    background-color: var(--accent-color, #8a2be2);
                    color: white;
                    border-color: var(--accent-color, #8a2be2);
                }
                .date-selector button:hover {
                    box-shadow: 0 0 10px var(--accent-glow, #8a2be280);
                }
                .quick-actions {
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 2rem;
                    flex-wrap: wrap;
                }
                .quick-action-btn {
                    background-color: var(--accent-color, #8a2be2);
                    color: white;
                    border: none;
                    padding: 0.8rem 1.5rem;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    transition: all 0.3s ease;
                }
                .quick-action-btn:hover {
                    box-shadow: 0 0 15px var(--accent-glow, #8a2be280);
                    transform: translateY(-2px);
                }
                .quick-action-btn .icon {
                    font-size: 20px;
                }
                .dashboard-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 1.5rem;
                    margin-bottom: 2rem;
                }
                .dashboard-card {
                    background: var(--card-bg, #fff);
                    padding: 1.5rem;
                    border-radius: 12px;
                    box-shadow: 0 4px 10px var(--shadow-color, rgba(0,0,0,0.1));
                    border: 1px solid var(--border-color, #eee);
                    transition: all 0.3s ease;
                    cursor: pointer;
                }
                .dashboard-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 6px 15px var(--shadow-color, rgba(0,0,0,0.15));
                }
                .card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                }
                .card-header h3 {
                    margin: 0;
                    font-weight: 600;
                    color: var(--accent-color, #8a2be2);
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .card-icon {
                    font-size: 24px;
                    color: var(--accent-color, #8a2be2);
                }
                .card-value {
                    font-size: 1.8rem;
                    font-weight: 700;
                    margin: 0.5rem 0;
                    color: var(--text-color, #333);
                }
                .progress-bar {
                    width: 100%;
                    background-color: var(--primary-color, #f0f0f0);
                    border-radius: 8px;
                    overflow: hidden;
                    height: 24px;
                    margin: 0.5rem 0;
                }
                .progress {
                    background: linear-gradient(90deg, var(--accent-color, #8a2be2), oklch(65% 0.3 320));
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 600;
                    transition: width 0.5s ease-in-out;
                }
                .edit-input {
                    width: 80px;
                    padding: 0.3rem;
                    border: 1px solid var(--border-color, #ccc);
                    border-radius: 4px;
                    font-size: 0.9rem;
                }
                .chart-container {
                    background: var(--card-bg, #fff);
                    padding: 1.5rem;
                    border-radius: 12px;
                    box-shadow: 0 4px 10px var(--shadow-color, rgba(0,0,0,0.1));
                    border: 1px solid var(--border-color, #eee);
                    margin-bottom: 2rem;
                }
                .chart-container h3 {
                    margin-top: 0;
                    font-weight: 600;
                    color: var(--accent-color, #8a2be2);
                }
                .chart {
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-around;
                    height: 200px;
                    gap: 0.5rem;
                    padding: 1rem 0;
                    background: var(--primary-color, #f9f9f9);
                    border-radius: 8px;
                }
                .bar-container {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: flex-end;
                    gap: 0.5rem;
                    height: 100%;
                    position: relative;
                }
                .bar {
                    width: 100%;
                    max-width: 60px;
                    background: linear-gradient(180deg, var(--accent-color, #8a2be2), oklch(65% 0.3 320));
                    border-radius: 8px 8px 0 0;
                    transition: all 0.5s ease-in-out;
                    position: relative;
                    min-height: 20px;
                    display: flex;
                    align-items: flex-start;
                    justify-content: center;
                    box-shadow: 0 2px 8px rgba(138, 43, 226, 0.3);
                }
                .bar-label {
                    font-size: 0.8rem;
                    font-weight: 600;
                    color: var(--text-color, #333);
                    margin-top: 0.5rem;
                }
                .bar-value {
                    font-size: 0.75rem;
                    color: white;
                    font-weight: 700;
                    position: absolute;
                    top: 8px;
                    left: 50%;
                    transform: translateX(-50%);
                    text-shadow: 0 1px 2px rgba(0,0,0,0.3);
                }
                .streak-badge {
                    background: linear-gradient(135deg, #ff6b6b, #ee5a6f);
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 8px;
                    font-weight: 600;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .motivational-quote {
                    background: linear-gradient(135deg, var(--accent-color, #8a2be2), oklch(65% 0.3 320));
                    color: white;
                    padding: 1.5rem;
                    border-radius: 12px;
                    text-align: center;
                    font-size: 1.1rem;
                    font-style: italic;
                    margin-bottom: 2rem;
                    box-shadow: 0 4px 10px var(--shadow-color, rgba(0,0,0,0.1));
                }
            </style>
            <div class="dashboard-header">
                <div>
                    <h2 style="margin: 0;">My Dashboard</h2>
                    <div class="streak-badge">
                        <span class="material-symbols-outlined">local_fire_department</span>
                        7 Day Streak!
                    </div>
                </div>
                <div class="date-selector">
                    <button class="active" data-range="today">Today</button>
                    <button data-range="week">This Week</button>
                    <button data-range="month">This Month</button>
                </div>
            </div>

            <div class="motivational-quote">
                "The only bad workout is the one that didn't happen."
            </div>

            <div class="quick-actions">
                <button class="quick-action-btn" data-action="meal">
                    <span class="material-symbols-outlined icon">restaurant</span>
                    Log Meal
                </button>
                <button class="quick-action-btn" data-action="workout">
                    <span class="material-symbols-outlined icon">fitness_center</span>
                    Log Workout
                </button>
                <button class="quick-action-btn" data-action="water">
                    <span class="material-symbols-outlined icon">water_drop</span>
                    Add Water
                </button>
                <button class="quick-action-btn" data-action="weight">
                    <span class="material-symbols-outlined icon">monitor_weight</span>
                    Update Weight
                </button>
            </div>

            <div class="dashboard-grid">
                <div class="dashboard-card" data-card="nutrition">
                    <div class="card-header">
                        <h3>
                            <span class="material-symbols-outlined card-icon">restaurant</span>
                            Calories
                        </h3>
                    </div>
                    <div class="card-value">
                        <span id="nutrition-current">1500</span> / <span id="nutrition-goal">2500</span>
                        <span style="font-size: 0.8rem;">kcal</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress" id="nutrition-progress" style="width: 60%;">60%</div>
                    </div>
                </div>

                <div class="dashboard-card" data-card="workouts">
                    <div class="card-header">
                        <h3>
                            <span class="material-symbols-outlined card-icon">fitness_center</span>
                            Workouts
                        </h3>
                    </div>
                    <div class="card-value">
                        <span id="workouts-current">3</span> / <span id="workouts-goal">5</span>
                        <span style="font-size: 0.8rem;">this week</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress" id="workouts-progress" style="width: 60%;">60%</div>
                    </div>
                </div>

                <div class="dashboard-card" data-card="water">
                    <div class="card-header">
                        <h3>
                            <span class="material-symbols-outlined card-icon">water_drop</span>
                            Water
                        </h3>
                    </div>
                    <div class="card-value">
                        <span id="water-current">6</span> / <span id="water-goal">8</span>
                        <span style="font-size: 0.8rem;">glasses</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress" id="water-progress" style="width: 75%;">75%</div>
                    </div>
                </div>

                <div class="dashboard-card" data-card="steps">
                    <div class="card-header">
                        <h3>
                            <span class="material-symbols-outlined card-icon">directions_walk</span>
                            Steps
                        </h3>
                    </div>
                    <div class="card-value">
                        <span id="steps-current">7,500</span> / <span id="steps-goal">10,000</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress" id="steps-progress" style="width: 75%;">75%</div>
                    </div>
                </div>

                <div class="dashboard-card" data-card="sleep">
                    <div class="card-header">
                        <h3>
                            <span class="material-symbols-outlined card-icon">bedtime</span>
                            Sleep
                        </h3>
                    </div>
                    <div class="card-value">
                        <span id="sleep-current">6.5</span> / <span id="sleep-goal">8</span>
                        <span style="font-size: 0.8rem;">hours</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress" id="sleep-progress" style="width: 81%;">81%</div>
                    </div>
                </div>

                <div class="dashboard-card" data-card="weight">
                    <div class="card-header">
                        <h3>
                            <span class="material-symbols-outlined card-icon">monitor_weight</span>
                            Weight
                        </h3>
                    </div>
                    <div class="card-value">
                        <span id="weight-current">75</span>
                        <span style="font-size: 0.8rem;">kg</span>
                    </div>
                    <p style="margin: 0.5rem 0; font-size: 0.9rem;">
                        Goal: <span id="weight-goal">70</span> kg
                        <span style="color: var(--accent-color);">(5 kg to go)</span>
                    </p>
                </div>
            </div>

            <div class="chart-container">
                <h3>Weekly Progress</h3>
                <div class="chart">
                    <div class="bar-container">
                        <div class="bar" style="height: 60%;">
                            <span class="bar-value">60%</span>
                        </div>
                        <span class="bar-label">Mon</span>
                    </div>
                    <div class="bar-container">
                        <div class="bar" style="height: 75%;">
                            <span class="bar-value">75%</span>
                        </div>
                        <span class="bar-label">Tue</span>
                    </div>
                    <div class="bar-container">
                        <div class="bar" style="height: 80%;">
                            <span class="bar-value">80%</span>
                        </div>
                        <span class="bar-label">Wed</span>
                    </div>
                    <div class="bar-container">
                        <div class="bar" style="height: 55%;">
                            <span class="bar-value">55%</span>
                        </div>
                        <span class="bar-label">Thu</span>
                    </div>
                    <div class="bar-container">
                        <div class="bar" style="height: 90%;">
                            <span class="bar-value">90%</span>
                        </div>
                        <span class="bar-label">Fri</span>
                    </div>
                    <div class="bar-container">
                        <div class="bar" style="height: 70%;">
                            <span class="bar-value">70%</span>
                        </div>
                        <span class="bar-label">Sat</span>
                    </div>
                    <div class="bar-container">
                        <div class="bar" style="height: 85%;">
                            <span class="bar-value">85%</span>
                        </div>
                        <span class="bar-label">Sun</span>
                    </div>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        // Date selector functionality
        this.shadowRoot.querySelectorAll('.date-selector button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.shadowRoot.querySelectorAll('.date-selector button').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                // Here you would typically fetch data for the selected date range
                console.log('Date range changed to:', e.target.dataset.range);
            });
        });

        // Quick action buttons
        this.shadowRoot.querySelectorAll('.quick-action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                this.handleQuickAction(action);
            });
        });

        // Card click for editing
        this.shadowRoot.querySelectorAll('.dashboard-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const cardType = e.currentTarget.dataset.card;
                this.handleCardEdit(cardType);
            });
        });
    }

    handleQuickAction(action) {
        switch(action) {
            case 'meal':
                const calories = prompt('Enter calories for this meal:');
                if (calories) {
                    this.data.nutrition.current = Math.min(
                        parseInt(this.data.nutrition.current) + parseInt(calories),
                        this.data.nutrition.goal
                    );
                    this.updateCard('nutrition');
                }
                break;
            case 'workout':
                this.data.workouts.current = Math.min(
                    this.data.workouts.current + 1,
                    this.data.workouts.goal
                );
                this.updateCard('workouts');
                break;
            case 'water':
                this.data.water.current = Math.min(
                    this.data.water.current + 1,
                    this.data.water.goal
                );
                this.updateCard('water');
                break;
            case 'weight':
                const weight = prompt('Enter your current weight (kg):');
                if (weight) {
                    this.data.weight.current = parseFloat(weight);
                    this.updateCard('weight');
                }
                break;
        }
    }

    handleCardEdit(cardType) {
        const value = prompt(`Update ${cardType} value:`);
        if (value && this.data[cardType]) {
            this.data[cardType].current = parseFloat(value);
            this.updateCard(cardType);
        }
    }

    updateCard(cardType) {
        const current = this.data[cardType].current;
        const goal = this.data[cardType].goal;
        const percentage = Math.round((current / goal) * 100);

        const currentEl = this.shadowRoot.getElementById(`${cardType}-current`);
        const progressEl = this.shadowRoot.getElementById(`${cardType}-progress`);

        if (currentEl) {
            currentEl.textContent = cardType === 'steps' ? current.toLocaleString() : current;
        }

        if (progressEl) {
            progressEl.style.width = `${percentage}%`;
            progressEl.textContent = `${percentage}%`;
        }
    }
}

class GoalPlanner extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.marathonPlan = null;

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            <style>
                .goal-planner-container {
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .goal-selection {
                    margin-bottom: 2rem;
                    text-align: center;
                    background: var(--card-bg, #fff);
                    padding: 2rem;
                    border-radius: 12px;
                    box-shadow: 0 4px 10px var(--shadow-color, rgba(0,0,0,0.1));
                }
                .goal-selection label {
                    display: block;
                    margin-bottom: 1rem;
                    font-size: 1.2rem;
                    font-weight: 600;
                    color: var(--text-color, #333);
                }
                select, input {
                    font-size: 1rem;
                    padding: 0.8rem;
                    border-radius: 8px;
                    border: 1px solid var(--border-color, #ccc);
                    font-family: inherit;
                }
                .plan {
                    background: var(--card-bg, #fff);
                    padding: 2rem;
                    border-radius: 12px;
                    box-shadow: 0 4px 10px var(--shadow-color, rgba(0,0,0,0.1));
                    display: none;
                }
                .plan.active {
                    display: block;
                }
                .plan h3 {
                    margin-top: 0;
                    color: var(--accent-color, #8a2be2);
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .plan ul {
                    list-style: none;
                    padding: 0;
                }
                .plan li {
                    padding: 0.8rem;
                    margin-bottom: 0.5rem;
                    background: var(--primary-color, #f9f9f9);
                    border-radius: 8px;
                    border-left: 4px solid var(--accent-color, #8a2be2);
                }
                .marathon-inputs {
                    background: var(--card-bg, #fff);
                    padding: 2rem;
                    border-radius: 12px;
                    box-shadow: 0 4px 10px var(--shadow-color, rgba(0,0,0,0.1));
                    margin-bottom: 2rem;
                    display: none;
                }
                .marathon-inputs.active {
                    display: block;
                }
                .input-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 1.5rem;
                    margin-bottom: 1.5rem;
                }
                .input-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                .input-group label {
                    font-weight: 600;
                    color: var(--text-color, #333);
                }
                .time-inputs {
                    display: flex;
                    gap: 0.5rem;
                    align-items: center;
                }
                .time-inputs input {
                    width: 80px;
                }
                .generate-btn {
                    background: var(--accent-color, #8a2be2);
                    color: white;
                    border: none;
                    padding: 1rem 2rem;
                    border-radius: 8px;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    justify-content: center;
                    width: 100%;
                }
                .generate-btn:hover {
                    box-shadow: 0 0 15px var(--accent-glow, #8a2be280);
                    transform: translateY(-2px);
                }
                .training-plan-header {
                    background: linear-gradient(135deg, var(--accent-color, #8a2be2), oklch(65% 0.3 320));
                    color: white;
                    padding: 1.5rem;
                    border-radius: 12px;
                    margin-bottom: 1.5rem;
                }
                .plan-stats {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                    gap: 1rem;
                    margin-top: 1rem;
                }
                .stat-item {
                    text-align: center;
                }
                .stat-value {
                    font-size: 1.8rem;
                    font-weight: 700;
                    display: block;
                }
                .stat-label {
                    font-size: 0.9rem;
                    opacity: 0.9;
                }
                .week-container {
                    margin-bottom: 1.5rem;
                }
                .week-header {
                    background: var(--accent-color, #8a2be2);
                    color: white;
                    padding: 1rem;
                    border-radius: 8px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .week-header:hover {
                    transform: translateX(5px);
                }
                .week-header h4 {
                    margin: 0;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .week-details {
                    background: var(--primary-color, #f9f9f9);
                    border-radius: 0 0 8px 8px;
                    overflow: hidden;
                    max-height: 0;
                    transition: max-height 0.3s ease;
                }
                .week-details.expanded {
                    max-height: 1000px;
                    border: 1px solid var(--border-color, #eee);
                    border-top: none;
                }
                .day-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 1rem;
                    padding: 1rem;
                }
                .day-card {
                    background: white;
                    padding: 1rem;
                    border-radius: 8px;
                    border: 1px solid var(--border-color, #eee);
                    transition: all 0.3s ease;
                }
                .day-card:hover {
                    box-shadow: 0 4px 10px var(--shadow-color, rgba(0,0,0,0.1));
                    transform: translateY(-2px);
                }
                .day-card.rest {
                    background: #f0f0f0;
                    opacity: 0.8;
                }
                .day-name {
                    font-weight: 700;
                    color: var(--accent-color, #8a2be2);
                    margin-bottom: 0.5rem;
                    display: flex;
                    align-items: center;
                    gap: 0.3rem;
                }
                .workout-type {
                    font-size: 0.85rem;
                    font-weight: 600;
                    color: #666;
                    margin-bottom: 0.3rem;
                }
                .workout-details {
                    font-size: 0.9rem;
                    color: #333;
                    line-height: 1.4;
                }
                .workout-icon {
                    font-size: 18px;
                }
                .run-type-easy { color: #51cf66; }
                .run-type-tempo { color: #ff922b; }
                .run-type-long { color: #339af0; }
                .run-type-intervals { color: #ff6b6b; }
                .run-type-recovery { color: #868e96; }
                .tips-section {
                    background: var(--primary-color, #f9f9f9);
                    padding: 1.5rem;
                    border-radius: 12px;
                    margin-top: 2rem;
                    border-left: 4px solid var(--accent-color, #8a2be2);
                }
                .tips-section h4 {
                    margin-top: 0;
                    color: var(--accent-color, #8a2be2);
                }
                .tips-section ul {
                    margin: 0;
                    padding-left: 1.5rem;
                }
                .tips-section li {
                    margin-bottom: 0.5rem;
                    line-height: 1.6;
                }
            </style>

            <div class="goal-planner-container">
                <div class="goal-selection">
                    <label for="goal-select">Select Your Fitness Goal</label>
                    <select id="goal-select">
                        <option value="">--Choose a Goal--</option>
                        <option value="weight-loss">Weight Loss</option>
                        <option value="muscle-gain">Muscle Gain</option>
                        <option value="marathon-training">Marathon Training</option>
                    </select>
                </div>

                <div class="marathon-inputs" id="marathon-inputs">
                    <h3>
                        <span class="material-symbols-outlined">directions_run</span>
                        Marathon Training Setup
                    </h3>
                    <div class="input-grid">
                        <div class="input-group">
                            <label for="target-time">Target Race Time</label>
                            <div class="time-inputs">
                                <input type="number" id="target-hours" min="2" max="6" placeholder="Hours" value="4">
                                <span>:</span>
                                <input type="number" id="target-minutes" min="0" max="59" placeholder="Min" value="0">
                            </div>
                        </div>
                        <div class="input-group">
                            <label for="training-weeks">Training Period (Weeks)</label>
                            <input type="number" id="training-weeks" min="8" max="24" placeholder="12-16 weeks recommended" value="16">
                        </div>
                        <div class="input-group">
                            <label for="current-mileage">Current Weekly Mileage (km)</label>
                            <input type="number" id="current-mileage" min="0" max="100" placeholder="e.g., 20" value="20">
                        </div>
                    </div>
                    <button class="generate-btn" id="generate-marathon-btn">
                        <span class="material-symbols-outlined">auto_awesome</span>
                        Generate Training Plan
                    </button>
                </div>

                <div class="plan" id="general-plan">
                    <h3>
                        <span class="material-symbols-outlined">checklist</span>
                        Your Personalized Plan
                    </h3>
                    <ul id="plan-steps"></ul>
                </div>

                <div class="plan" id="marathon-plan"></div>
            </div>
        `;
    }

    connectedCallback() {
        this.shadowRoot.getElementById('goal-select').addEventListener('change', (e) => this.handleGoalChange(e));
        this.shadowRoot.getElementById('generate-marathon-btn').addEventListener('click', () => this.generateMarathonPlan());
    }

    handleGoalChange(event) {
        const goal = event.target.value;
        const marathonInputs = this.shadowRoot.getElementById('marathon-inputs');
        const generalPlan = this.shadowRoot.getElementById('general-plan');
        const marathonPlanDiv = this.shadowRoot.getElementById('marathon-plan');

        // Hide all plans
        marathonInputs.classList.remove('active');
        generalPlan.classList.remove('active');
        marathonPlanDiv.classList.remove('active');

        if (!goal) return;

        if (goal === 'marathon-training') {
            marathonInputs.classList.add('active');
        } else {
            this.generateSimplePlan(goal);
        }
    }

    generateSimplePlan(goal) {
        const generalPlan = this.shadowRoot.getElementById('general-plan');
        const planSteps = this.shadowRoot.getElementById('plan-steps');

        let steps = [];
        if (goal === 'weight-loss') {
            steps = [
                'Consume a 500-calorie deficit each day to lose ~0.5kg per week',
                'Engage in 30 minutes of cardio, 5 days a week',
                'Incorporate strength training 3 days a week to preserve muscle',
                'Track your meals using the Nutrition Tracking feature',
                'Stay hydrated - aim for 8 glasses of water daily',
                'Get 7-9 hours of quality sleep each night'
            ];
        } else if (goal === 'muscle-gain') {
            steps = [
                'Consume a 300-500 calorie surplus each day',
                'Lift heavy weights 4-5 days a week with progressive overload',
                'Ensure adequate protein intake (1.6-2.2g per kg of body weight)',
                'Focus on compound exercises: squats, deadlifts, bench press, rows',
                'Allow 48 hours recovery between training the same muscle group',
                'Track your strength progress weekly'
            ];
        }

        planSteps.innerHTML = steps.map(step => `<li>${step}</li>`).join('');
        generalPlan.classList.add('active');
    }

    generateMarathonPlan() {
        const hours = parseInt(this.shadowRoot.getElementById('target-hours').value) || 4;
        const minutes = parseInt(this.shadowRoot.getElementById('target-minutes').value) || 0;
        const weeks = parseInt(this.shadowRoot.getElementById('training-weeks').value) || 16;
        const currentMileage = parseInt(this.shadowRoot.getElementById('current-mileage').value) || 20;

        const targetTimeMinutes = hours * 60 + minutes;
        const pacePerKm = targetTimeMinutes / 42.195; // Marathon distance

        // Calculate peak mileage (typically 70-80% through training)
        const peakWeek = Math.floor(weeks * 0.75);
        const peakMileage = Math.min(currentMileage * 2.5, 80); // Cap at 80km

        const plan = this.createWeeklyPlan(weeks, currentMileage, peakMileage, peakWeek, pacePerKm);

        this.renderMarathonPlan(plan, hours, minutes, weeks, pacePerKm);
    }

    createWeeklyPlan(totalWeeks, startMileage, peakMileage, peakWeek, pacePerKm) {
        const plan = [];

        for (let week = 1; week <= totalWeeks; week++) {
            let weeklyMileage;

            // Build up phase
            if (week <= peakWeek) {
                const progress = week / peakWeek;
                weeklyMileage = startMileage + (peakMileage - startMileage) * progress;
            }
            // Taper phase
            else {
                const taperProgress = (week - peakWeek) / (totalWeeks - peakWeek);
                weeklyMileage = peakMileage * (1 - taperProgress * 0.6); // Reduce by up to 60%
            }

            const weekPlan = this.generateWeekSchedule(week, Math.round(weeklyMileage), pacePerKm, week === totalWeeks);
            plan.push(weekPlan);
        }

        return plan;
    }

    generateWeekSchedule(weekNum, totalMileage, pacePerKm, isRaceWeek) {
        if (isRaceWeek) {
            return {
                week: weekNum,
                totalMileage,
                days: [
                    { day: 'Monday', type: 'Easy Run', distance: 5, description: 'Light recovery run, very easy pace' },
                    { day: 'Tuesday', type: 'Rest', distance: 0, description: 'Complete rest or light stretching' },
                    { day: 'Wednesday', type: 'Easy Run', distance: 3, description: 'Very short easy run to keep legs loose' },
                    { day: 'Thursday', type: 'Rest', distance: 0, description: 'Rest and prepare race gear' },
                    { day: 'Friday', type: 'Rest', distance: 0, description: 'Complete rest, hydrate well' },
                    { day: 'Saturday', type: 'Rest', distance: 0, description: 'Pre-race rest, early night' },
                    { day: 'Sunday', type: 'RACE DAY!', distance: 42.195, description: '🏃‍♂️ Marathon Race Day - You\'ve got this!' }
                ]
            };
        }

        const longRunDistance = Math.round(totalMileage * 0.35); // 35% of weekly mileage
        const tempoDistance = Math.round(totalMileage * 0.20); // 20%
        const easyRun1 = Math.round(totalMileage * 0.15); // 15%
        const easyRun2 = Math.round(totalMileage * 0.15); // 15%
        const recoveryRun = Math.round(totalMileage * 0.15); // 15%

        return {
            week: weekNum,
            totalMileage,
            days: [
                { day: 'Monday', type: 'Rest', distance: 0, description: 'Rest or cross-training (swimming, cycling)' },
                { day: 'Tuesday', type: 'Easy Run', distance: easyRun1, description: `${easyRun1}km at comfortable pace, ${this.formatPace(pacePerKm + 0.5)} min/km` },
                { day: 'Wednesday', type: 'Tempo Run', distance: tempoDistance, description: `${tempoDistance}km at ${this.formatPace(pacePerKm - 0.2)} min/km - comfortably hard` },
                { day: 'Thursday', type: 'Recovery Run', distance: recoveryRun, description: `${recoveryRun}km very easy pace, focus on form` },
                { day: 'Friday', type: 'Rest', distance: 0, description: 'Active recovery: yoga, stretching, or complete rest' },
                { day: 'Saturday', type: 'Intervals', distance: easyRun2, description: `${easyRun2}km with 5-8 x 800m at ${this.formatPace(pacePerKm - 0.3)} min/km` },
                { day: 'Sunday', type: 'Long Run', distance: longRunDistance, description: `${longRunDistance}km at ${this.formatPace(pacePerKm + 0.3)} min/km - build endurance` }
            ]
        };
    }

    formatPace(paceMinPerKm) {
        const minutes = Math.floor(paceMinPerKm);
        const seconds = Math.round((paceMinPerKm - minutes) * 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    renderMarathonPlan(plan, hours, minutes, weeks, pacePerKm) {
        const marathonPlanDiv = this.shadowRoot.getElementById('marathon-plan');
        const totalDistance = plan.reduce((sum, week) => sum + week.totalMileage, 0);

        marathonPlanDiv.innerHTML = `
            <div class="training-plan-header">
                <h3 style="margin: 0 0 1rem 0;">
                    <span class="material-symbols-outlined">emoji_events</span>
                    Your ${weeks}-Week Marathon Training Plan
                </h3>
                <div class="plan-stats">
                    <div class="stat-item">
                        <span class="stat-value">${hours}:${minutes.toString().padStart(2, '0')}</span>
                        <span class="stat-label">Target Time</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${this.formatPace(pacePerKm)}</span>
                        <span class="stat-label">Target Pace</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${weeks}</span>
                        <span class="stat-label">Weeks</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${Math.round(totalDistance)}</span>
                        <span class="stat-label">Total KM</span>
                    </div>
                </div>
            </div>

            ${plan.map(week => `
                <div class="week-container">
                    <div class="week-header" onclick="this.nextElementSibling.classList.toggle('expanded')">
                        <h4>
                            <span class="material-symbols-outlined">calendar_month</span>
                            Week ${week.week} - ${week.totalMileage}km total
                        </h4>
                        <span class="material-symbols-outlined">expand_more</span>
                    </div>
                    <div class="week-details">
                        <div class="day-grid">
                            ${week.days.map(day => `
                                <div class="day-card ${day.type === 'Rest' ? 'rest' : ''}">
                                    <div class="day-name">
                                        <span class="material-symbols-outlined workout-icon ${this.getRunTypeClass(day.type)}">
                                            ${this.getWorkoutIcon(day.type)}
                                        </span>
                                        ${day.day}
                                    </div>
                                    <div class="workout-type">${day.type}</div>
                                    <div class="workout-details">
                                        ${day.distance > 0 ? `<strong>${day.distance}km</strong><br>` : ''}
                                        ${day.description}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `).join('')}

            <div class="tips-section">
                <h4>
                    <span class="material-symbols-outlined">lightbulb</span>
                    Training Tips
                </h4>
                <ul>
                    <li><strong>Listen to your body:</strong> If you feel excessive fatigue or pain, take an extra rest day</li>
                    <li><strong>Nutrition:</strong> Fuel properly before long runs, aim for 30-60g carbs per hour during runs over 90 minutes</li>
                    <li><strong>Hydration:</strong> Drink water regularly throughout the day, not just during runs</li>
                    <li><strong>Recovery:</strong> Get 7-9 hours of sleep, consider foam rolling and stretching</li>
                    <li><strong>Race Day:</strong> Don't try anything new - stick to tested shoes, clothes, and nutrition</li>
                    <li><strong>Pace:</strong> The first half should feel easy - negative splits are ideal</li>
                </ul>
            </div>
        `;

        marathonPlanDiv.classList.add('active');

        // Scroll to the plan
        marathonPlanDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    getWorkoutIcon(type) {
        const icons = {
            'Rest': 'hotel',
            'Easy Run': 'directions_walk',
            'Tempo Run': 'speed',
            'Recovery Run': 'self_improvement',
            'Intervals': 'bolt',
            'Long Run': 'landscape',
            'RACE DAY!': 'emoji_events'
        };
        return icons[type] || 'directions_run';
    }

    getRunTypeClass(type) {
        if (type.includes('Easy') || type.includes('Recovery')) return 'run-type-easy';
        if (type.includes('Tempo')) return 'run-type-tempo';
        if (type.includes('Long')) return 'run-type-long';
        if (type.includes('Intervals')) return 'run-type-intervals';
        return 'run-type-recovery';
    }
}

class CommunityBoard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            <style>
                .community-container {
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .forum-header {
                    background: linear-gradient(135deg, var(--accent-color, #8a2be2), oklch(65% 0.3 320));
                    color: white;
                    padding: 2rem;
                    border-radius: 12px;
                    margin-bottom: 2rem;
                    text-align: center;
                }
                .forum-header h3 {
                    margin: 0 0 0.5rem 0;
                    font-size: 2rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                }
                .forum-header p {
                    margin: 0;
                    opacity: 0.9;
                }
                .post-form-card {
                    background: var(--card-bg, #fff);
                    padding: 2rem;
                    border-radius: 12px;
                    box-shadow: 0 4px 10px var(--shadow-color, rgba(0,0,0,0.1));
                    border: 1px solid var(--border-color, #eee);
                    margin-bottom: 2rem;
                }
                .post-form-card h4 {
                    margin: 0 0 1.5rem 0;
                    color: var(--accent-color, #8a2be2);
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .form-group {
                    margin-bottom: 1.5rem;
                }
                .form-group label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 600;
                    color: var(--text-color, #333);
                    display: flex;
                    align-items: center;
                    gap: 0.3rem;
                }
                .form-group input,
                .form-group textarea {
                    width: 100%;
                    padding: 0.9rem 1rem;
                    border: 2px solid var(--border-color, #e0e0e0);
                    border-radius: 8px;
                    font-size: 1rem;
                    font-family: inherit;
                    transition: all 0.3s ease;
                    background: var(--card-bg, #fff);
                }
                .form-group input:focus,
                .form-group textarea:focus {
                    outline: none;
                    border-color: var(--accent-color, #8a2be2);
                    box-shadow: 0 0 0 3px rgba(138, 43, 226, 0.1);
                }
                .form-group input::placeholder,
                .form-group textarea::placeholder {
                    color: #999;
                }
                .form-group textarea {
                    min-height: 120px;
                    resize: vertical;
                    line-height: 1.6;
                }
                .char-counter {
                    text-align: right;
                    font-size: 0.85rem;
                    color: #666;
                    margin-top: 0.3rem;
                }
                .add-post-btn {
                    background: var(--accent-color, #8a2be2);
                    color: white;
                    border: none;
                    padding: 1rem 2rem;
                    border-radius: 8px;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    justify-content: center;
                    width: 100%;
                }
                .add-post-btn:hover:not(:disabled) {
                    box-shadow: 0 0 15px var(--accent-glow, #8a2be280);
                    transform: translateY(-2px);
                }
                .add-post-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                .posts-section {
                    margin-bottom: 2rem;
                }
                .section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.5rem;
                }
                .section-header h4 {
                    margin: 0;
                    color: var(--text-color, #333);
                    font-size: 1.3rem;
                }
                .posts-count {
                    background: var(--primary-color, #f0f0f0);
                    color: var(--text-color, #666);
                    padding: 0.3rem 0.8rem;
                    border-radius: 12px;
                    font-size: 0.9rem;
                    font-weight: 600;
                }
                #posts-container {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                .empty-state {
                    text-align: center;
                    padding: 3rem;
                    color: #666;
                }
                .empty-state .icon {
                    font-size: 64px;
                    color: #ccc;
                    margin-bottom: 1rem;
                }

                @media (max-width: 768px) {
                    .forum-header {
                        padding: 1.5rem;
                    }
                    .forum-header h3 {
                        font-size: 1.5rem;
                    }
                    .post-form-card {
                        padding: 1.5rem;
                    }
                    .add-post-btn {
                        padding: 0.9rem 1.5rem;
                    }
                }
            </style>

            <div class="community-container">
                <local-services-map></local-services-map>

                <div class="forum-header">
                    <h3>
                        <span class="material-symbols-outlined">forum</span>
                        Community Forum
                    </h3>
                    <p>Share your fitness journey, ask questions, and connect with others</p>
                </div>

                <div class="post-form-card">
                    <h4>
                        <span class="material-symbols-outlined">edit_note</span>
                        Create a New Post
                    </h4>
                    <form id="post-form">
                        <div class="form-group">
                            <label for="post-title">
                                <span class="material-symbols-outlined" style="font-size: 18px;">title</span>
                                Post Title
                            </label>
                            <input
                                type="text"
                                id="post-title"
                                placeholder="Enter an engaging title for your post..."
                                maxlength="100"
                                required
                            />
                            <div class="char-counter">
                                <span id="title-counter">0</span>/100
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="post-content">
                                <span class="material-symbols-outlined" style="font-size: 18px;">description</span>
                                Share Your Thoughts
                            </label>
                            <textarea
                                id="post-content"
                                placeholder="Share your experiences, ask questions, or provide advice to the community..."
                                maxlength="1000"
                                required
                            ></textarea>
                            <div class="char-counter">
                                <span id="content-counter">0</span>/1000
                            </div>
                        </div>

                        <button type="submit" class="add-post-btn" id="add-post-btn">
                            <span class="material-symbols-outlined">add_circle</span>
                            Publish Post
                        </button>
                    </form>
                </div>

                <div class="posts-section">
                    <div class="section-header">
                        <h4>Recent Posts</h4>
                        <span class="posts-count" id="posts-count">2 Posts</span>
                    </div>
                    <div id="posts-container"></div>
                </div>

                <feature-voting></feature-voting>
            </div>
        `;
        
        this.posts = [
            { id: 1, title: 'Just hit my first fitness goal!', author: 'User123', content: 'Feeling amazing after reaching my 5k run goal!' },
            { id: 2, title: 'Best protein shake recipes?', author: 'FitFoodie', content: 'Looking for some new ideas for post-workout shakes.' },
        ];

        this.renderPosts();
    }

    renderPosts() {
        const postsContainer = this.shadowRoot.getElementById('posts-container');
        postsContainer.innerHTML = '';
        this.posts.forEach(post => {
            const postCard = document.createElement('post-card');
            postCard.setAttribute('id', `post-${post.id}`);
            postCard.setAttribute('title', post.title);
            postCard.setAttribute('author', post.author);
            postCard.setAttribute('content', post.content);
            postsContainer.appendChild(postCard);
        });
    }
    
    addPost(title, content) {
        const newPost = {
            id: Date.now(), // simple unique ID
            title,
            author: 'CurrentUser', // Replace with actual user
            content,
        };
        this.posts.push(newPost);
        this.renderPosts();
    }

    deletePost(postId) {
        this.posts = this.posts.filter(post => `post-${post.id}` !== postId);
        this.renderPosts();
    }

    updatePost(postId, newTitle, newContent) {
        const post = this.posts.find(p => `post-${p.id}` === postId);
        if (post) {
            post.title = newTitle;
            post.content = newContent;
            this.renderPosts();
        }
    }

    connectedCallback() {
        const form = this.shadowRoot.getElementById('post-form');
        const titleInput = this.shadowRoot.getElementById('post-title');
        const contentInput = this.shadowRoot.getElementById('post-content');
        const titleCounter = this.shadowRoot.getElementById('title-counter');
        const contentCounter = this.shadowRoot.getElementById('content-counter');
        const addPostBtn = this.shadowRoot.getElementById('add-post-btn');
        const postsCount = this.shadowRoot.getElementById('posts-count');

        // Character counters
        titleInput.addEventListener('input', () => {
            titleCounter.textContent = titleInput.value.length;
            this.validateForm();
        });

        contentInput.addEventListener('input', () => {
            contentCounter.textContent = contentInput.value.length;
            this.validateForm();
        });

        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = titleInput.value.trim();
            const content = contentInput.value.trim();

            if (title && content) {
                this.addPost(title, content);
                titleInput.value = '';
                contentInput.value = '';
                titleCounter.textContent = '0';
                contentCounter.textContent = '0';
                this.validateForm();

                // Update posts count
                postsCount.textContent = `${this.posts.length} ${this.posts.length === 1 ? 'Post' : 'Posts'}`;
            }
        });

        // Listen for delete-post events from post-card
        this.shadowRoot.addEventListener('delete-post', (event) => {
            this.deletePost(event.detail.postId);
            postsCount.textContent = `${this.posts.length} ${this.posts.length === 1 ? 'Post' : 'Posts'}`;
        });

        // Listen for update-post events from post-card
        this.shadowRoot.addEventListener('update-post', (event) => {
            const { postId, newTitle, newContent } = event.detail;
            this.updatePost(postId, newTitle, newContent);
        });
    }

    validateForm() {
        const titleInput = this.shadowRoot.getElementById('post-title');
        const contentInput = this.shadowRoot.getElementById('post-content');
        const addPostBtn = this.shadowRoot.getElementById('add-post-btn');

        const isValid = titleInput.value.trim().length > 0 && contentInput.value.trim().length > 0;
        addPostBtn.disabled = !isValid;
    }
}

class PostCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const title = this.getAttribute('title');
        const author = this.getAttribute('author');
        const content = this.getAttribute('content');
        this.shadowRoot.innerHTML = `
            <style>
                .post-card {
                    background: var(--card-bg, #fff);
                    padding: 1rem;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px var(--shadow-color, rgba(0,0,0,0.1));
                    margin-bottom: 1rem;
                    border: 1px solid var(--border-color, #eee);
                }
                h4 { margin: 0; }
                p { margin: 0.5rem 0 0; }
                .author { font-style: italic; font-size: 0.9rem; }
                .post-actions {
                    margin-top: 1rem;
                }
                .post-actions button {
                    background: none;
                    border: 1px solid var(--accent-color, #8a2be2);
                    color: var(--accent-color, #8a2be2);
                    padding: 0.3rem 0.6rem;
                    border-radius: 4px;
                    cursor: pointer;
                    margin-right: 0.5rem;
                }
                .edit-form {
                    display: none;
                }
                .edit-form input, .edit-form textarea {
                    width: 100%;
                    margin-bottom: 0.5rem;
                }
            </style>
            <div class="post-card">
                <div class="view-mode">
                    <h4>${title}</h4>
                    <p class="author">by ${author}</p>
                    <p>${content}</p>
                    <div class="post-actions">
                        <button class="edit-btn">Edit</button>
                        <button class="delete-btn">Delete</button>
                    </div>
                </div>
                <div class="edit-form">
                    <input type="text" class="edit-title" value="${title}"/>
                    <textarea class="edit-content">${content}</textarea>
                    <button class="save-btn">Save</button>
                    <button class="cancel-btn">Cancel</button>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        const viewMode = this.shadowRoot.querySelector('.view-mode');
        const editForm = this.shadowRoot.querySelector('.edit-form');

        this.shadowRoot.querySelector('.delete-btn').addEventListener('click', () => {
            // Dispatch an event to the parent (community-board) to delete the post
            this.dispatchEvent(new CustomEvent('delete-post', { 
                bubbles: true, 
                composed: true, 
                detail: { postId: this.id }
            }));
        });

        this.shadowRoot.querySelector('.edit-btn').addEventListener('click', () => {
            viewMode.style.display = 'none';
            editForm.style.display = 'block';
        });

        this.shadowRoot.querySelector('.cancel-btn').addEventListener('click', () => {
            viewMode.style.display = 'block';
            editForm.style.display = 'none';
        });

        this.shadowRoot.querySelector('.save-btn').addEventListener('click', () => {
            const newTitle = this.shadowRoot.querySelector('.edit-title').value;
            const newContent = this.shadowRoot.querySelector('.edit-content').value;

            this.dispatchEvent(new CustomEvent('update-post', {
                bubbles: true,
                composed: true,
                detail: { 
                    postId: this.id, 
                    newTitle, 
                    newContent 
                }
            }));

            viewMode.style.display = 'block';
            editForm.style.display = 'none';
        });
    }
}

class FeatureVoting extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .feature-voting {
                    background: var(--card-bg, #fff);
                    padding: 1.5rem;
                    border-radius: 12px;
                    box-shadow: 0 4px 10px var(--shadow-color, rgba(0,0,0,0.1));
                    margin-top: 2rem;
                }
                h3 {
                    margin-top: 0;
                    font-weight: 600;
                    color: var(--accent-color, #8a2be2);
                }
                .feature-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 0;
                    border-bottom: 1px solid var(--border-color, #eee);
                }
                .feature-item:last-child {
                    border-bottom: none;
                }
                .vote-btn {
                    background-color: var(--accent-color, #8a2be2);
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 8px;
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .vote-btn:hover {
                     box-shadow: 0 0 15px var(--accent-glow, #8a2be280);
                }
            </style>
            <div class="feature-voting">
                <h3>Vote for New Features</h3>
                <div class="feature-item">
                    <span>Dark Mode</span>
                    <button class="vote-btn">Vote</button>
                </div>
                <div class="feature-item">
                    <span>Apple Health Integration</span>
                    <button class="vote-btn">Vote</button>
                </div>
                <div class="feature-item">
                    <span>Custom Reminders</span>
                    <button class="vote-btn">Vote</button>
                </div>
            </div>
        `;
    }
}

class AboutMe extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Load user data from localStorage or use defaults
        this.userData = JSON.parse(localStorage.getItem('ff_user_profile')) || {
            name: 'John Doe',
            age: 28,
            gender: 'male',
            height: 175,
            weight: 75,
            targetWeight: 70,
            activityLevel: 'moderate',
            fitnessGoal: 'weight-loss',
            joinDate: new Date().toISOString(),
            achievements: []
        };

        this.achievements = [
            { id: 1, name: 'First Workout', icon: 'fitness_center', earned: true, date: '2024-01-15' },
            { id: 2, name: '7 Day Streak', icon: 'local_fire_department', earned: true, date: '2024-01-22' },
            { id: 3, name: 'First Marathon Plan', icon: 'directions_run', earned: true, date: '2024-02-01' },
            { id: 4, name: '30 Day Streak', icon: 'emoji_events', earned: false },
            { id: 5, name: 'Weight Goal Achieved', icon: 'trending_down', earned: false },
            { id: 6, name: 'Community Contributor', icon: 'forum', earned: false }
        ];

        this.render();
    }

    render() {
        const bmi = this.calculateBMI();
        const memberSince = new Date(this.userData.joinDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
        });

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            <style>
                .profile-container {
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .profile-header {
                    background: linear-gradient(135deg, var(--accent-color, #8a2be2), oklch(65% 0.3 320));
                    color: white;
                    padding: 2rem;
                    border-radius: 12px;
                    margin-bottom: 2rem;
                    display: flex;
                    align-items: center;
                    gap: 2rem;
                    flex-wrap: wrap;
                }
                .profile-avatar {
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    background: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 48px;
                    color: var(--accent-color, #8a2be2);
                    border: 4px solid rgba(255,255,255,0.3);
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .profile-avatar:hover {
                    transform: scale(1.05);
                    box-shadow: 0 8px 20px rgba(0,0,0,0.3);
                }
                .profile-info {
                    flex: 1;
                }
                .profile-name {
                    font-size: 2rem;
                    font-weight: 700;
                    margin: 0 0 0.5rem 0;
                }
                .profile-meta {
                    display: flex;
                    gap: 2rem;
                    margin-top: 1rem;
                    flex-wrap: wrap;
                }
                .meta-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .tabs {
                    display: flex;
                    gap: 1rem;
                    border-bottom: 2px solid var(--border-color, #eee);
                    margin-bottom: 2rem;
                    flex-wrap: wrap;
                }
                .tab {
                    background: none;
                    border: none;
                    padding: 1rem 1.5rem;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    color: var(--text-color, #666);
                    border-bottom: 3px solid transparent;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .tab:hover {
                    color: var(--accent-color, #8a2be2);
                }
                .tab.active {
                    color: var(--accent-color, #8a2be2);
                    border-bottom-color: var(--accent-color, #8a2be2);
                }
                .tab-content {
                    display: none;
                }
                .tab-content.active {
                    display: block;
                }
                .info-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                }
                .info-card {
                    background: var(--card-bg, #fff);
                    padding: 1.5rem;
                    border-radius: 12px;
                    box-shadow: 0 4px 10px var(--shadow-color, rgba(0,0,0,0.1));
                    border: 1px solid var(--border-color, #eee);
                }
                .info-card h3 {
                    margin: 0 0 1rem 0;
                    color: var(--accent-color, #8a2be2);
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .form-group {
                    margin-bottom: 1.5rem;
                }
                .form-group label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 600;
                    color: var(--text-color, #333);
                }
                .form-group input, .form-group select {
                    width: 100%;
                    padding: 0.8rem;
                    border: 1px solid var(--border-color, #ccc);
                    border-radius: 8px;
                    font-size: 1rem;
                    font-family: inherit;
                }
                .form-row {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                }
                .stat-display {
                    background: var(--primary-color, #f9f9f9);
                    padding: 1.5rem;
                    border-radius: 8px;
                    text-align: center;
                    margin-bottom: 1rem;
                }
                .stat-value {
                    font-size: 2.5rem;
                    font-weight: 700;
                    color: var(--accent-color, #8a2be2);
                    display: block;
                }
                .stat-label {
                    color: #666;
                    margin-top: 0.5rem;
                }
                .bmi-indicator {
                    width: 100%;
                    height: 30px;
                    border-radius: 15px;
                    background: linear-gradient(to right, #3498db, #2ecc71, #f39c12, #e74c3c);
                    position: relative;
                    margin: 1rem 0;
                }
                .bmi-pointer {
                    position: absolute;
                    width: 3px;
                    height: 40px;
                    background: #333;
                    top: -5px;
                    transition: left 0.5s ease;
                }
                .achievements-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                    gap: 1rem;
                }
                .achievement-card {
                    background: var(--card-bg, #fff);
                    padding: 1.5rem;
                    border-radius: 12px;
                    text-align: center;
                    border: 2px solid var(--border-color, #eee);
                    transition: all 0.3s ease;
                    cursor: pointer;
                }
                .achievement-card.earned {
                    border-color: #FFD700;
                    background: linear-gradient(135deg, #fff 0%, #fffaf0 100%);
                }
                .achievement-card.locked {
                    opacity: 0.4;
                    filter: grayscale(100%);
                }
                .achievement-card:hover:not(.locked) {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 20px var(--shadow-color, rgba(0,0,0,0.15));
                }
                .achievement-icon {
                    font-size: 48px;
                    color: var(--accent-color, #8a2be2);
                    margin-bottom: 0.5rem;
                }
                .achievement-card.earned .achievement-icon {
                    color: #FFD700;
                }
                .achievement-name {
                    font-weight: 600;
                    font-size: 0.9rem;
                }
                .achievement-date {
                    font-size: 0.75rem;
                    color: #666;
                    margin-top: 0.3rem;
                }
                .save-btn {
                    background: var(--accent-color, #8a2be2);
                    color: white;
                    border: none;
                    padding: 1rem 2rem;
                    border-radius: 8px;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                }
                .save-btn:hover {
                    box-shadow: 0 0 15px var(--accent-glow, #8a2be280);
                    transform: translateY(-2px);
                }
                .progress-section {
                    background: var(--primary-color, #f9f9f9);
                    padding: 1.5rem;
                    border-radius: 12px;
                    margin-bottom: 1rem;
                }
                .progress-item {
                    margin-bottom: 1.5rem;
                }
                .progress-item:last-child {
                    margin-bottom: 0;
                }
                .progress-label {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 0.5rem;
                    font-weight: 600;
                }
                .progress-bar {
                    width: 100%;
                    height: 24px;
                    background: #e0e0e0;
                    border-radius: 12px;
                    overflow: hidden;
                }
                .progress-fill {
                    height: 100%;
                    background: linear-gradient(90deg, var(--accent-color, #8a2be2), oklch(65% 0.3 320));
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 600;
                    font-size: 0.85rem;
                    transition: width 0.5s ease;
                }

                @media (max-width: 768px) {
                    .profile-header {
                        flex-direction: column;
                        text-align: center;
                    }
                    .profile-avatar {
                        width: 100px;
                        height: 100px;
                    }
                    .profile-name {
                        font-size: 1.5rem;
                    }
                    .form-row {
                        grid-template-columns: 1fr;
                    }
                    .info-grid {
                        grid-template-columns: 1fr;
                    }
                    .achievements-grid {
                        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
                    }
                }
            </style>

            <div class="profile-container">
                <div class="profile-header">
                    <div class="profile-avatar" title="Click to change avatar">
                        <span class="material-symbols-outlined">person</span>
                    </div>
                    <div class="profile-info">
                        <h1 class="profile-name">${this.userData.name}</h1>
                        <p>Transforming fitness into lifestyle</p>
                        <div class="profile-meta">
                            <div class="meta-item">
                                <span class="material-symbols-outlined">calendar_today</span>
                                <span>Member since ${memberSince}</span>
                            </div>
                            <div class="meta-item">
                                <span class="material-symbols-outlined">emoji_events</span>
                                <span>${this.achievements.filter(a => a.earned).length} Achievements</span>
                            </div>
                            <div class="meta-item">
                                <span class="material-symbols-outlined">local_fire_department</span>
                                <span>7 Day Streak</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="tabs">
                    <button class="tab active" data-tab="overview">
                        <span class="material-symbols-outlined">dashboard</span>
                        Overview
                    </button>
                    <button class="tab" data-tab="personal">
                        <span class="material-symbols-outlined">person</span>
                        Personal Info
                    </button>
                    <button class="tab" data-tab="health">
                        <span class="material-symbols-outlined">favorite</span>
                        Health Metrics
                    </button>
                    <button class="tab" data-tab="achievements">
                        <span class="material-symbols-outlined">emoji_events</span>
                        Achievements
                    </button>
                </div>

                <div class="tab-content active" id="overview">
                    <div class="info-grid">
                        <div class="info-card">
                            <h3>
                                <span class="material-symbols-outlined">analytics</span>
                                BMI Analysis
                            </h3>
                            <div class="stat-display">
                                <span class="stat-value">${bmi.value}</span>
                                <div class="stat-label">${bmi.category}</div>
                            </div>
                            <div class="bmi-indicator">
                                <div class="bmi-pointer" style="left: ${bmi.pointerPosition}%"></div>
                            </div>
                            <p style="text-align: center; font-size: 0.9rem; color: #666; margin-top: 0.5rem;">
                                Underweight | Normal | Overweight | Obese
                            </p>
                        </div>

                        <div class="info-card">
                            <h3>
                                <span class="material-symbols-outlined">trending_down</span>
                                Weight Progress
                            </h3>
                            <div class="progress-section">
                                <div class="progress-item">
                                    <div class="progress-label">
                                        <span>Current: ${this.userData.weight} kg</span>
                                        <span>Target: ${this.userData.targetWeight} kg</span>
                                    </div>
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: ${this.calculateWeightProgress()}%">
                                            ${Math.abs(this.userData.weight - this.userData.targetWeight).toFixed(1)} kg to go
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p style="margin-top: 1rem; color: #666;">
                                ${this.userData.weight > this.userData.targetWeight ?
                                    `You're ${(this.userData.weight - this.userData.targetWeight).toFixed(1)} kg away from your goal!` :
                                    'Congratulations! You\'ve reached your target weight!'}
                            </p>
                        </div>

                        <div class="info-card">
                            <h3>
                                <span class="material-symbols-outlined">directions_run</span>
                                Activity Level
                            </h3>
                            <div class="stat-display">
                                <span class="stat-value" style="font-size: 1.5rem; text-transform: capitalize;">
                                    ${this.userData.activityLevel}
                                </span>
                                <div class="stat-label">Current Activity Level</div>
                            </div>
                            <p style="margin-top: 1rem; color: #666;">
                                ${this.getActivityRecommendation()}
                            </p>
                        </div>
                    </div>
                </div>

                <div class="tab-content" id="personal">
                    <div class="info-grid">
                        <div class="info-card">
                            <h3>
                                <span class="material-symbols-outlined">badge</span>
                                Basic Information
                            </h3>
                            <div class="form-group">
                                <label for="name">Full Name</label>
                                <input type="text" id="name" value="${this.userData.name}">
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="age">Age</label>
                                    <input type="number" id="age" value="${this.userData.age}">
                                </div>
                                <div class="form-group">
                                    <label for="gender">Gender</label>
                                    <select id="gender">
                                        <option value="male" ${this.userData.gender === 'male' ? 'selected' : ''}>Male</option>
                                        <option value="female" ${this.userData.gender === 'female' ? 'selected' : ''}>Female</option>
                                        <option value="other" ${this.userData.gender === 'other' ? 'selected' : ''}>Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="info-card">
                            <h3>
                                <span class="material-symbols-outlined">flag</span>
                                Fitness Goals
                            </h3>
                            <div class="form-group">
                                <label for="fitness-goal">Primary Goal</label>
                                <select id="fitness-goal">
                                    <option value="weight-loss" ${this.userData.fitnessGoal === 'weight-loss' ? 'selected' : ''}>Weight Loss</option>
                                    <option value="muscle-gain" ${this.userData.fitnessGoal === 'muscle-gain' ? 'selected' : ''}>Muscle Gain</option>
                                    <option value="endurance" ${this.userData.fitnessGoal === 'endurance' ? 'selected' : ''}>Build Endurance</option>
                                    <option value="general-fitness" ${this.userData.fitnessGoal === 'general-fitness' ? 'selected' : ''}>General Fitness</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="activity-level">Activity Level</label>
                                <select id="activity-level">
                                    <option value="sedentary" ${this.userData.activityLevel === 'sedentary' ? 'selected' : ''}>Sedentary (Little to no exercise)</option>
                                    <option value="light" ${this.userData.activityLevel === 'light' ? 'selected' : ''}>Light (1-3 days/week)</option>
                                    <option value="moderate" ${this.userData.activityLevel === 'moderate' ? 'selected' : ''}>Moderate (3-5 days/week)</option>
                                    <option value="active" ${this.userData.activityLevel === 'active' ? 'selected' : ''}>Active (6-7 days/week)</option>
                                    <option value="very-active" ${this.userData.activityLevel === 'very-active' ? 'selected' : ''}>Very Active (Intense daily)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <button class="save-btn" id="save-personal-btn">
                        <span class="material-symbols-outlined">save</span>
                        Save Changes
                    </button>
                </div>

                <div class="tab-content" id="health">
                    <div class="info-grid">
                        <div class="info-card">
                            <h3>
                                <span class="material-symbols-outlined">straighten</span>
                                Body Measurements
                            </h3>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="height">Height (cm)</label>
                                    <input type="number" id="height" value="${this.userData.height}">
                                </div>
                                <div class="form-group">
                                    <label for="weight">Current Weight (kg)</label>
                                    <input type="number" id="weight" value="${this.userData.weight}" step="0.1">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="target-weight">Target Weight (kg)</label>
                                <input type="number" id="target-weight" value="${this.userData.targetWeight}" step="0.1">
                            </div>
                        </div>

                        <div class="info-card">
                            <h3>
                                <span class="material-symbols-outlined">calculate</span>
                                Health Calculations
                            </h3>
                            <div class="stat-display">
                                <span class="stat-value">${bmi.value}</span>
                                <div class="stat-label">Body Mass Index (BMI)</div>
                            </div>
                            <div class="stat-display">
                                <span class="stat-value">${this.calculateCalories()}</span>
                                <div class="stat-label">Daily Calorie Target</div>
                            </div>
                        </div>
                    </div>
                    <button class="save-btn" id="save-health-btn">
                        <span class="material-symbols-outlined">save</span>
                        Save Health Metrics
                    </button>
                </div>

                <div class="tab-content" id="achievements">
                    <div class="info-card">
                        <h3>
                            <span class="material-symbols-outlined">emoji_events</span>
                            Your Achievements
                        </h3>
                        <p style="margin-bottom: 1.5rem; color: #666;">
                            Unlock achievements by completing challenges and reaching milestones
                        </p>
                        <div class="achievements-grid">
                            ${this.achievements.map(achievement => `
                                <div class="achievement-card ${achievement.earned ? 'earned' : 'locked'}">
                                    <div class="achievement-icon">
                                        <span class="material-symbols-outlined">${achievement.icon}</span>
                                    </div>
                                    <div class="achievement-name">${achievement.name}</div>
                                    ${achievement.earned ? `<div class="achievement-date">${new Date(achievement.date).toLocaleDateString()}</div>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        // Tab switching
        this.shadowRoot.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = e.currentTarget.dataset.tab;
                this.switchTab(tabName);
            });
        });

        // Save personal info
        const savePersonalBtn = this.shadowRoot.getElementById('save-personal-btn');
        if (savePersonalBtn) {
            savePersonalBtn.addEventListener('click', () => this.savePersonalInfo());
        }

        // Save health metrics
        const saveHealthBtn = this.shadowRoot.getElementById('save-health-btn');
        if (saveHealthBtn) {
            saveHealthBtn.addEventListener('click', () => this.saveHealthMetrics());
        }
    }

    switchTab(tabName) {
        this.shadowRoot.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        this.shadowRoot.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

        this.shadowRoot.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        this.shadowRoot.getElementById(tabName).classList.add('active');
    }

    calculateBMI() {
        const heightM = this.userData.height / 100;
        const bmi = (this.userData.weight / (heightM * heightM)).toFixed(1);

        let category, pointerPosition;
        if (bmi < 18.5) {
            category = 'Underweight';
            pointerPosition = (bmi / 18.5) * 25;
        } else if (bmi < 25) {
            category = 'Normal Weight';
            pointerPosition = 25 + ((bmi - 18.5) / 6.5) * 25;
        } else if (bmi < 30) {
            category = 'Overweight';
            pointerPosition = 50 + ((bmi - 25) / 5) * 25;
        } else {
            category = 'Obese';
            pointerPosition = 75 + Math.min(((bmi - 30) / 10) * 25, 25);
        }

        return { value: bmi, category, pointerPosition };
    }

    calculateWeightProgress() {
        const start = this.userData.weight > this.userData.targetWeight ?
            this.userData.weight : this.userData.targetWeight;
        const target = this.userData.targetWeight;
        const current = this.userData.weight;

        const totalChange = Math.abs(start - target);
        const currentChange = Math.abs(start - current);

        return Math.min((currentChange / totalChange) * 100, 100);
    }

    calculateCalories() {
        // Harris-Benedict equation (simplified)
        const bmr = this.userData.gender === 'male' ?
            88.362 + (13.397 * this.userData.weight) + (4.799 * this.userData.height) - (5.677 * this.userData.age) :
            447.593 + (9.247 * this.userData.weight) + (3.098 * this.userData.height) - (4.330 * this.userData.age);

        const activityMultipliers = {
            sedentary: 1.2,
            light: 1.375,
            moderate: 1.55,
            active: 1.725,
            'very-active': 1.9
        };

        const tdee = bmr * (activityMultipliers[this.userData.activityLevel] || 1.55);
        return Math.round(tdee);
    }

    getActivityRecommendation() {
        const recommendations = {
            sedentary: 'Try to add at least 30 minutes of light exercise daily.',
            light: 'Great start! Consider increasing to 3-5 days per week.',
            moderate: 'Excellent! You\'re meeting the recommended activity guidelines.',
            active: 'Outstanding! Keep up the great work.',
            'very-active': 'Amazing dedication! Ensure you\'re getting adequate rest.'
        };
        return recommendations[this.userData.activityLevel] || '';
    }

    savePersonalInfo() {
        this.userData.name = this.shadowRoot.getElementById('name').value;
        this.userData.age = parseInt(this.shadowRoot.getElementById('age').value);
        this.userData.gender = this.shadowRoot.getElementById('gender').value;
        this.userData.fitnessGoal = this.shadowRoot.getElementById('fitness-goal').value;
        this.userData.activityLevel = this.shadowRoot.getElementById('activity-level').value;

        localStorage.setItem('ff_user_profile', JSON.stringify(this.userData));
        alert('Personal information saved successfully!');
        this.render();
    }

    saveHealthMetrics() {
        this.userData.height = parseInt(this.shadowRoot.getElementById('height').value);
        this.userData.weight = parseFloat(this.shadowRoot.getElementById('weight').value);
        this.userData.targetWeight = parseFloat(this.shadowRoot.getElementById('target-weight').value);

        localStorage.setItem('ff_user_profile', JSON.stringify(this.userData));
        alert('Health metrics saved successfully!');
        this.render();
    }
}

class AIHealthChat extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.conversationHistory = [];
        this.currentView = 'chat'; // 'chat' or 'specialists'

        // Knowledge base for AI responses
        this.knowledgeBase = {
            nutrition: {
                keywords: ['diet', 'food', 'eat', 'nutrition', 'calories', 'protein', 'carbs', 'meal', 'weight loss', 'weight gain'],
                responses: [
                    "A balanced diet is key to good health! Focus on whole foods like fruits, vegetables, lean proteins, and whole grains. Would you like me to connect you with a Dietician for personalized meal planning?",
                    "Nutrition is essential for achieving your fitness goals. Make sure you're getting enough protein (0.8-1g per pound of body weight) and staying hydrated. Need help with a meal plan? I can connect you with our Dietician!",
                    "Proper nutrition fuels your body! Try tracking your macros: 40% carbs, 30% protein, 30% fat is a good starting point. Want expert guidance? Our Dietician can help!"
                ]
            },
            fitness: {
                keywords: ['workout', 'exercise', 'gym', 'training', 'muscle', 'cardio', 'strength', 'run', 'lift', 'fitness'],
                responses: [
                    "Regular exercise is crucial for health! Aim for 150 minutes of moderate activity per week. Want a personalized workout plan? I can connect you with a Fitness Trainer!",
                    "Great that you're thinking about fitness! Combining strength training with cardio gives the best results. Would you like to speak with our Fitness Trainer for a customized program?",
                    "Exercise is medicine! Start with 3-4 days a week and gradually increase. Need professional guidance? Our Fitness Trainer can create a plan tailored to your goals!"
                ]
            },
            sports: {
                keywords: ['sport', 'game', 'competition', 'athlete', 'performance', 'training', 'coach', 'technique', 'skill'],
                responses: [
                    "Sports performance requires specific training techniques! Our Sports Coach specializes in improving athletic performance and competition readiness. Would you like to connect?",
                    "Whether you're training for competition or recreational sports, proper technique and conditioning are essential. Our Sports Coach can help optimize your performance!",
                    "Sports-specific training can dramatically improve your game! I can connect you with our Sports Coach who specializes in athletic performance and injury prevention."
                ]
            },
            medical: {
                keywords: ['pain', 'sick', 'doctor', 'health', 'symptom', 'injury', 'medication', 'condition', 'disease', 'treatment'],
                responses: [
                    "For medical concerns, it's important to consult with a healthcare professional. I can connect you with a Family Doctor who can properly assess your symptoms and provide treatment.",
                    "Your health is important! While I can provide general wellness information, medical issues should be evaluated by a doctor. Would you like me to help you connect with a Family Doctor?",
                    "I recommend speaking with a medical professional about health concerns. I can help you schedule a consultation with our Family Doctor for proper diagnosis and care."
                ]
            },
            general: {
                keywords: ['hello', 'hi', 'help', 'what', 'how', 'can', 'thanks', 'thank you'],
                responses: [
                    "I'm here to help with your health and fitness journey! I can answer questions about nutrition, exercise, wellness, and connect you with specialists. What would you like to know?",
                    "Hello! I'm your AI Health Assistant. I can provide guidance on fitness, nutrition, and wellness, plus connect you with our specialists: Family Doctor, Fitness Trainer, Sports Coach, or Dietician. How can I assist you?",
                    "Hi there! I'm here to support your health goals. Ask me anything about fitness, nutrition, or wellness, and I can also help you schedule appointments with our specialists!"
                ]
            }
        };

        this.specialists = [
            {
                id: 'doctor',
                name: 'Dr. Tan Wei Ming',
                role: 'Family Doctor',
                icon: 'medical_services',
                specialty: 'General Medicine & Preventive Care',
                availability: 'Mon-Fri, 9 AM - 5 PM',
                description: 'Board-certified family physician with 15 years of experience in primary care and preventive medicine at Singapore General Hospital.',
                color: '#ff6b6b'
            },
            {
                id: 'trainer',
                name: 'Marcus Lim',
                role: 'Fitness Trainer',
                icon: 'fitness_center',
                specialty: 'Strength & Conditioning',
                availability: 'Mon-Sat, 6 AM - 8 PM',
                description: 'ACE-certified personal trainer with expertise in strength training, weight loss, and body transformation. Former national athlete.',
                color: '#51cf66'
            },
            {
                id: 'coach',
                name: 'Raj Kumar',
                role: 'Sports Coach',
                icon: 'sports_soccer',
                specialty: 'Athletic Performance',
                availability: 'Tue-Sun, 7 AM - 7 PM',
                description: 'Professional sports coach specializing in performance optimization and sports-specific training. Singapore Sports Council certified.',
                color: '#339af0'
            },
            {
                id: 'dietician',
                name: 'Nur Aisyah Binte Hassan',
                role: 'Registered Dietician',
                icon: 'restaurant',
                specialty: 'Nutrition & Meal Planning',
                availability: 'Mon-Fri, 8 AM - 6 PM',
                description: 'Licensed dietician from National University Hospital specializing in personalized meal plans, weight management, and sports nutrition.',
                color: '#ff922b'
            }
        ];

        this.suggestedQuestions = [
            "How many calories should I eat daily?",
            "What's a good workout routine for beginners?",
            "How can I lose weight safely?",
            "What should I eat before a workout?",
            "How do I build muscle effectively?",
            "I have pain in my knee, what should I do?"
        ];

        this.render();
    }

    render() {
        // Check if user is premium
        if (!window.FuelFlexApp.isPremium) {
            this.shadowRoot.innerHTML = '<premium-gate></premium-gate>';
            return;
        }

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            <style>
                * {
                    box-sizing: border-box;
                }
                .ai-chat-container {
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .chat-header {
                    background: linear-gradient(135deg, var(--accent-color, #8a2be2), oklch(65% 0.3 320));
                    color: white;
                    padding: 1.5rem;
                    border-radius: 12px 12px 0 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .chat-header h2 {
                    margin: 0;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .view-toggle {
                    display: flex;
                    gap: 0.5rem;
                }
                .view-toggle button {
                    background: rgba(255,255,255,0.2);
                    border: none;
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }
                .view-toggle button.active {
                    background: white;
                    color: var(--accent-color, #8a2be2);
                }
                .view-toggle button:hover {
                    background: rgba(255,255,255,0.3);
                }
                .view-toggle button.active:hover {
                    background: white;
                }
                .main-content {
                    background: var(--card-bg, #fff);
                    border: 1px solid var(--border-color, #eee);
                    border-top: none;
                    border-radius: 0 0 12px 12px;
                    box-shadow: 0 4px 10px var(--shadow-color, rgba(0,0,0,0.1));
                }
                .chat-view, .specialists-view {
                    display: none;
                }
                .chat-view.active, .specialists-view.active {
                    display: block;
                }
                .suggested-questions {
                    padding: 1rem;
                    border-bottom: 1px solid var(--border-color, #eee);
                    background: var(--primary-color, #f9f9f9);
                }
                .suggested-questions h4 {
                    margin: 0 0 0.5rem 0;
                    color: var(--text-color, #333);
                    font-size: 0.9rem;
                }
                .question-chips {
                    display: flex;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                }
                .question-chip {
                    background: white;
                    border: 1px solid var(--border-color, #ccc);
                    padding: 0.4rem 0.8rem;
                    border-radius: 16px;
                    cursor: pointer;
                    font-size: 0.85rem;
                    transition: all 0.3s ease;
                }
                .question-chip:hover {
                    background: var(--accent-color, #8a2be2);
                    color: white;
                    border-color: var(--accent-color, #8a2be2);
                }
                .chat-window {
                    height: 500px;
                    padding: 1.5rem;
                    overflow-y: auto;
                    background-color: var(--card-bg, #fff);
                }
                .chat-message {
                    margin-bottom: 1.5rem;
                    animation: slideIn 0.3s ease;
                }
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .chat-message.user {
                    text-align: right;
                }
                .message-bubble {
                    display: inline-block;
                    padding: 0.9rem 1.3rem;
                    border-radius: 18px;
                    max-width: 75%;
                    word-wrap: break-word;
                }
                .chat-message.user .message-bubble {
                    background: linear-gradient(135deg, var(--accent-color, #8a2be2), oklch(65% 0.3 320));
                    color: white;
                    border-bottom-right-radius: 4px;
                }
                .chat-message.bot .message-bubble {
                    background: var(--primary-color, #f0f0f0);
                    color: var(--text-color, #333);
                    border-bottom-left-radius: 4px;
                }
                .chat-message.bot {
                    display: flex;
                    align-items: flex-start;
                    gap: 0.5rem;
                }
                .bot-avatar {
                    width: 36px;
                    height: 36px;
                    background: linear-gradient(135deg, var(--accent-color, #8a2be2), oklch(65% 0.3 320));
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    flex-shrink: 0;
                }
                .typing-indicator {
                    display: none;
                    padding: 0.9rem 1.3rem;
                    background: var(--primary-color, #f0f0f0);
                    border-radius: 18px;
                    width: fit-content;
                }
                .typing-indicator.active {
                    display: flex;
                    gap: 0.3rem;
                    align-items: center;
                }
                .typing-dot {
                    width: 8px;
                    height: 8px;
                    background: var(--accent-color, #8a2be2);
                    border-radius: 50%;
                    animation: typing 1.4s infinite;
                }
                .typing-dot:nth-child(2) {
                    animation-delay: 0.2s;
                }
                .typing-dot:nth-child(3) {
                    animation-delay: 0.4s;
                }
                @keyframes typing {
                    0%, 60%, 100% {
                        transform: translateY(0);
                    }
                    30% {
                        transform: translateY(-10px);
                    }
                }
                .quick-actions {
                    display: flex;
                    gap: 0.5rem;
                    margin-top: 0.5rem;
                    flex-wrap: wrap;
                }
                .quick-action-btn {
                    background: white;
                    border: 1px solid var(--accent-color, #8a2be2);
                    color: var(--accent-color, #8a2be2);
                    padding: 0.5rem 1rem;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 0.85rem;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 0.3rem;
                }
                .quick-action-btn:hover {
                    background: var(--accent-color, #8a2be2);
                    color: white;
                }
                .chat-input-container {
                    display: flex;
                    padding: 1rem;
                    border-top: 1px solid var(--border-color, #eee);
                    align-items: center;
                    gap: 0.5rem;
                    background: var(--primary-color, #f9f9f9);
                }
                .chat-input-container input {
                    flex-grow: 1;
                    border: 1px solid var(--border-color, #ccc);
                    border-radius: 24px;
                    padding: 0.9rem 1.2rem;
                    font-size: 1rem;
                    background: white;
                }
                .send-btn {
                    background: var(--accent-color, #8a2be2);
                    color: white;
                    border: none;
                    padding: 0.9rem 1.5rem;
                    border-radius: 24px;
                    cursor: pointer;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 0.3rem;
                    transition: all 0.3s ease;
                }
                .send-btn:hover {
                    box-shadow: 0 0 15px var(--accent-glow, #8a2be280);
                    transform: translateY(-2px);
                }
                .specialists-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 1.5rem;
                    padding: 1.5rem;
                }
                .specialist-card {
                    background: white;
                    border: 2px solid var(--border-color, #eee);
                    border-radius: 12px;
                    padding: 1.5rem;
                    transition: all 0.3s ease;
                    cursor: pointer;
                }
                .specialist-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 20px var(--shadow-color, rgba(0,0,0,0.15));
                }
                .specialist-header {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 1rem;
                }
                .specialist-icon {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 32px;
                    color: white;
                }
                .specialist-info h3 {
                    margin: 0;
                    font-size: 1.2rem;
                    color: var(--text-color, #333);
                }
                .specialist-info .role {
                    font-size: 0.9rem;
                    color: #666;
                    font-weight: 600;
                }
                .specialist-details {
                    margin: 1rem 0;
                }
                .detail-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-bottom: 0.5rem;
                    font-size: 0.9rem;
                    color: #666;
                }
                .detail-item .icon {
                    font-size: 18px;
                }
                .specialist-card p {
                    font-size: 0.9rem;
                    line-height: 1.5;
                    color: #666;
                    margin: 1rem 0;
                }
                .connect-btn {
                    width: 100%;
                    background: var(--accent-color, #8a2be2);
                    color: white;
                    border: none;
                    padding: 0.8rem;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                }
                .connect-btn:hover {
                    box-shadow: 0 0 15px var(--accent-glow, #8a2be280);
                    transform: translateY(-2px);
                }
            </style>

            <div class="ai-chat-container">
                <div class="chat-header">
                    <h2>
                        <span class="material-symbols-outlined">smart_toy</span>
                        AI Health Assistant
                    </h2>
                    <div class="view-toggle">
                        <button class="active" data-view="chat">Chat</button>
                        <button data-view="specialists">Specialists</button>
                    </div>
                </div>

                <div class="main-content">
                    <div class="chat-view active">
                        <div class="suggested-questions">
                            <h4>Quick Questions:</h4>
                            <div class="question-chips" id="question-chips"></div>
                        </div>
                        <div class="chat-window" id="chat-window">
                            <div class="chat-message bot">
                                <div class="bot-avatar">
                                    <span class="material-symbols-outlined">smart_toy</span>
                                </div>
                                <div>
                                    <div class="message-bubble">Hello! I'm your AI Health Assistant. I can help with fitness, nutrition, wellness advice, and connect you with our specialists. What would you like to know?</div>
                                </div>
                            </div>
                        </div>
                        <div class="chat-input-container">
                            <input type="text" id="chat-input" placeholder="Ask me anything about health and fitness...">
                            <button class="send-btn" id="send-btn">
                                <span class="material-symbols-outlined">send</span>
                                Send
                            </button>
                        </div>
                    </div>

                    <div class="specialists-view">
                        <div class="specialists-grid" id="specialists-grid"></div>
                    </div>
                </div>
            </div>
        `;

        this.renderSuggestedQuestions();
        this.renderSpecialists();
    }

    connectedCallback() {
        // View toggle
        this.shadowRoot.querySelectorAll('.view-toggle button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.target.dataset.view;
                this.switchView(view);
            });
        });

        // Chat input
        const chatInput = this.shadowRoot.getElementById('chat-input');
        const sendBtn = this.shadowRoot.getElementById('send-btn');

        sendBtn.addEventListener('click', () => this.sendMessage());
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // Suggested questions
        this.shadowRoot.querySelectorAll('.question-chip').forEach(chip => {
            chip.addEventListener('click', (e) => {
                chatInput.value = e.target.textContent;
                this.sendMessage();
            });
        });
    }

    switchView(view) {
        this.currentView = view;
        this.shadowRoot.querySelectorAll('.view-toggle button').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });
        this.shadowRoot.querySelectorAll('.chat-view, .specialists-view').forEach(v => {
            v.classList.toggle('active', v.classList.contains(`${view}-view`));
        });
    }

    renderSuggestedQuestions() {
        const container = this.shadowRoot.getElementById('question-chips');
        container.innerHTML = this.suggestedQuestions.map(q =>
            `<div class="question-chip">${q}</div>`
        ).join('');
    }

    renderSpecialists() {
        const container = this.shadowRoot.getElementById('specialists-grid');
        container.innerHTML = this.specialists.map(spec => `
            <div class="specialist-card" data-specialist="${spec.id}">
                <div class="specialist-header">
                    <div class="specialist-icon" style="background: ${spec.color};">
                        <span class="material-symbols-outlined">${spec.icon}</span>
                    </div>
                    <div class="specialist-info">
                        <h3>${spec.name}</h3>
                        <div class="role">${spec.role}</div>
                    </div>
                </div>
                <div class="specialist-details">
                    <div class="detail-item">
                        <span class="material-symbols-outlined icon">workspace_premium</span>
                        <span>${spec.specialty}</span>
                    </div>
                    <div class="detail-item">
                        <span class="material-symbols-outlined icon">schedule</span>
                        <span>${spec.availability}</span>
                    </div>
                </div>
                <p>${spec.description}</p>
                <button class="connect-btn" onclick="document.querySelector('ai-health-chat').connectSpecialist('${spec.id}')">
                    <span class="material-symbols-outlined">video_call</span>
                    Schedule Consultation
                </button>
            </div>
        `).join('');
    }

    sendMessage() {
        const input = this.shadowRoot.getElementById('chat-input');
        const message = input.value.trim();
        if (!message) return;

        this.addMessage(message, 'user');
        input.value = '';

        // Show typing indicator
        this.showTyping();

        // Generate AI response
        setTimeout(() => {
            this.hideTyping();
            const response = this.generateResponse(message);
            this.addMessage(response.text, 'bot', response.actions);
        }, 1500);
    }

    generateResponse(message) {
        const lowerMessage = message.toLowerCase();

        // Check each category
        for (const [category, data] of Object.entries(this.knowledgeBase)) {
            if (data.keywords.some(keyword => lowerMessage.includes(keyword))) {
                const response = data.responses[Math.floor(Math.random() * data.responses.length)];
                return {
                    text: response,
                    actions: this.getQuickActions(category)
                };
            }
        }

        // Default response
        return {
            text: "I'm here to help with your health and fitness questions! You can ask me about nutrition, exercise, wellness, or I can connect you with one of our specialists for personalized guidance.",
            actions: [
                { label: 'View Specialists', action: 'specialists' }
            ]
        };
    }

    getQuickActions(category) {
        const actions = {
            nutrition: [
                { label: 'Talk to Dietician', action: 'connect', specialist: 'dietician' }
            ],
            fitness: [
                { label: 'Talk to Trainer', action: 'connect', specialist: 'trainer' }
            ],
            sports: [
                { label: 'Talk to Sports Coach', action: 'connect', specialist: 'coach' }
            ],
            medical: [
                { label: 'Talk to Doctor', action: 'connect', specialist: 'doctor' }
            ],
            general: [
                { label: 'View All Specialists', action: 'specialists' }
            ]
        };
        return actions[category] || [];
    }

    addMessage(text, sender, actions = []) {
        const chatWindow = this.shadowRoot.getElementById('chat-window');
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message', sender);

        if (sender === 'bot') {
            messageDiv.innerHTML = `
                <div class="bot-avatar">
                    <span class="material-symbols-outlined">smart_toy</span>
                </div>
                <div>
                    <div class="message-bubble">${text}</div>
                    ${actions.length > 0 ? `
                        <div class="quick-actions">
                            ${actions.map(action => `
                                <button class="quick-action-btn" data-action="${action.action}" data-specialist="${action.specialist || ''}">
                                    <span class="material-symbols-outlined">arrow_forward</span>
                                    ${action.label}
                                </button>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            `;

            // Add event listeners to quick action buttons
            setTimeout(() => {
                messageDiv.querySelectorAll('.quick-action-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const action = e.currentTarget.dataset.action;
                        const specialist = e.currentTarget.dataset.specialist;
                        if (action === 'specialists') {
                            this.switchView('specialists');
                        } else if (action === 'connect' && specialist) {
                            this.connectSpecialist(specialist);
                        }
                    });
                });
            }, 100);
        } else {
            messageDiv.innerHTML = `<div class="message-bubble">${text}</div>`;
        }

        chatWindow.appendChild(messageDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    showTyping() {
        const chatWindow = this.shadowRoot.getElementById('chat-window');
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('chat-message', 'bot');
        typingDiv.id = 'typing-indicator-msg';
        typingDiv.innerHTML = `
            <div class="bot-avatar">
                <span class="material-symbols-outlined">smart_toy</span>
            </div>
            <div class="typing-indicator active">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        chatWindow.appendChild(typingDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    hideTyping() {
        const typing = this.shadowRoot.getElementById('typing-indicator-msg');
        if (typing) typing.remove();
    }

    connectSpecialist(specialistId) {
        const specialist = this.specialists.find(s => s.id === specialistId);
        if (!specialist) return;

        this.switchView('chat');

        setTimeout(() => {
            this.addMessage(`I'd like to schedule a consultation with ${specialist.name}.`, 'user');

            setTimeout(() => {
                this.showTyping();
                setTimeout(() => {
                    this.hideTyping();
                    this.addMessage(
                        `Great choice! ${specialist.name} (${specialist.role}) specializes in ${specialist.specialty}. They're available ${specialist.availability}. ` +
                        `I'll help you schedule an appointment. Please provide your preferred date and time, or would you like to see their next available slots?`,
                        'bot',
                        [
                            { label: 'See Available Times', action: 'schedule', specialist: specialistId },
                            { label: 'Call Directly', action: 'call', specialist: specialistId }
                        ]
                    );
                }, 1500);
            }, 500);
        }, 300);
    }
}

class PricingModal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            <style>
                .modal-overlay {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.7);
                    z-index: 10000;
                    align-items: center;
                    justify-content: center;
                    animation: fadeIn 0.3s ease;
                }
                .modal-overlay.active {
                    display: flex;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .modal-content {
                    background: var(--card-bg, #fff);
                    border-radius: 16px;
                    max-width: 1000px;
                    width: 90%;
                    max-height: 90vh;
                    overflow-y: auto;
                    position: relative;
                    animation: slideUp 0.3s ease;
                }
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .close-btn {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: none;
                    border: none;
                    font-size: 2rem;
                    cursor: pointer;
                    color: #666;
                    z-index: 1;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                }
                .close-btn:hover {
                    background: #f0f0f0;
                    color: #333;
                }
                .modal-header {
                    background: linear-gradient(135deg, var(--accent-color, #8a2be2), oklch(65% 0.3 320));
                    color: white;
                    padding: 3rem 2rem 2rem;
                    text-align: center;
                    border-radius: 16px 16px 0 0;
                }
                .modal-header h2 {
                    margin: 0 0 0.5rem 0;
                    font-size: 2.5rem;
                }
                .modal-header p {
                    margin: 0;
                    font-size: 1.1rem;
                    opacity: 0.95;
                }
                .pricing-container {
                    padding: 2rem;
                }
                .pricing-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 2rem;
                    margin-bottom: 2rem;
                }
                .pricing-card {
                    background: white;
                    border: 2px solid var(--border-color, #eee);
                    border-radius: 12px;
                    padding: 2rem;
                    transition: all 0.3s ease;
                    position: relative;
                }
                .pricing-card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 10px 30px var(--shadow-color, rgba(0,0,0,0.15));
                }
                .pricing-card.popular {
                    border-color: var(--accent-color, #8a2be2);
                    box-shadow: 0 8px 25px var(--shadow-color, rgba(138, 43, 226, 0.2));
                }
                .popular-badge {
                    position: absolute;
                    top: -12px;
                    right: 20px;
                    background: linear-gradient(135deg, #FFD700, #FFA500);
                    color: #333;
                    padding: 0.3rem 1rem;
                    border-radius: 20px;
                    font-weight: 700;
                    font-size: 0.85rem;
                    text-transform: uppercase;
                }
                .plan-name {
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin: 0 0 0.5rem 0;
                    color: var(--text-color, #333);
                }
                .plan-price {
                    font-size: 3rem;
                    font-weight: 700;
                    color: var(--accent-color, #8a2be2);
                    margin: 1rem 0;
                }
                .plan-price span {
                    font-size: 1.2rem;
                    color: #666;
                }
                .plan-description {
                    color: #666;
                    margin-bottom: 1.5rem;
                    line-height: 1.5;
                }
                .features-list {
                    list-style: none;
                    padding: 0;
                    margin: 0 0 2rem 0;
                }
                .features-list li {
                    padding: 0.7rem 0;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    border-bottom: 1px solid var(--border-color, #eee);
                }
                .features-list li:last-child {
                    border-bottom: none;
                }
                .feature-icon {
                    color: #51cf66;
                    font-size: 20px;
                }
                .feature-icon.disabled {
                    color: #ccc;
                }
                .subscribe-btn {
                    width: 100%;
                    padding: 1rem;
                    border: none;
                    border-radius: 8px;
                    font-size: 1.1rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                }
                .subscribe-btn.free {
                    background: #f0f0f0;
                    color: #666;
                }
                .subscribe-btn.premium {
                    background: var(--accent-color, #8a2be2);
                    color: white;
                }
                .subscribe-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px var(--shadow-color, rgba(0,0,0,0.2));
                }
                .features-comparison {
                    margin-top: 3rem;
                    padding: 2rem;
                    background: var(--primary-color, #f9f9f9);
                    border-radius: 12px;
                }
                .features-comparison h3 {
                    text-align: center;
                    color: var(--accent-color, #8a2be2);
                    margin-bottom: 1.5rem;
                }
                .comparison-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 1.5rem;
                }
                .feature-category {
                    background: white;
                    padding: 1.5rem;
                    border-radius: 8px;
                }
                .feature-category h4 {
                    margin: 0 0 1rem 0;
                    color: var(--text-color, #333);
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
            </style>

            <div class="modal-overlay" id="modal-overlay">
                <div class="modal-content">
                    <button class="close-btn" id="close-btn">
                        <span class="material-symbols-outlined">close</span>
                    </button>

                    <div class="modal-header">
                        <h2>
                            <span class="material-symbols-outlined" style="font-size: 3rem; vertical-align: middle;">workspace_premium</span>
                            Upgrade to Premium
                        </h2>
                        <p>Unlock AI Health Chat and premium features to supercharge your fitness journey</p>
                    </div>

                    <div class="pricing-container">
                        <div class="pricing-grid">
                            <div class="pricing-card">
                                <h3 class="plan-name">Free</h3>
                                <div class="plan-price">$0<span>/month</span></div>
                                <p class="plan-description">Perfect for getting started with basic tracking</p>
                                <ul class="features-list">
                                    <li>
                                        <span class="material-symbols-outlined feature-icon">check_circle</span>
                                        Dashboard tracking
                                    </li>
                                    <li>
                                        <span class="material-symbols-outlined feature-icon">check_circle</span>
                                        Nutrition tracking
                                    </li>
                                    <li>
                                        <span class="material-symbols-outlined feature-icon">check_circle</span>
                                        Basic fitness goals
                                    </li>
                                    <li>
                                        <span class="material-symbols-outlined feature-icon">check_circle</span>
                                        Community access
                                    </li>
                                    <li>
                                        <span class="material-symbols-outlined feature-icon disabled">cancel</span>
                                        <span style="color: #999;">AI Health Chat</span>
                                    </li>
                                    <li>
                                        <span class="material-symbols-outlined feature-icon disabled">cancel</span>
                                        <span style="color: #999;">Specialist connections</span>
                                    </li>
                                </ul>
                                <button class="subscribe-btn free" disabled>Current Plan</button>
                            </div>

                            <div class="pricing-card popular">
                                <div class="popular-badge">Most Popular</div>
                                <h3 class="plan-name">Premium</h3>
                                <div class="plan-price">$9.99<span>/month</span></div>
                                <p class="plan-description">Everything you need for optimal health and fitness</p>
                                <ul class="features-list">
                                    <li>
                                        <span class="material-symbols-outlined feature-icon">check_circle</span>
                                        All Free features
                                    </li>
                                    <li>
                                        <span class="material-symbols-outlined feature-icon">check_circle</span>
                                        AI Health Assistant 24/7
                                    </li>
                                    <li>
                                        <span class="material-symbols-outlined feature-icon">check_circle</span>
                                        Connect with specialists
                                    </li>
                                    <li>
                                        <span class="material-symbols-outlined feature-icon">check_circle</span>
                                        Advanced marathon plans
                                    </li>
                                    <li>
                                        <span class="material-symbols-outlined feature-icon">check_circle</span>
                                        Personalized insights
                                    </li>
                                    <li>
                                        <span class="material-symbols-outlined feature-icon">check_circle</span>
                                        Priority support
                                    </li>
                                </ul>
                                <button class="subscribe-btn premium" id="subscribe-premium">
                                    <span class="material-symbols-outlined">workspace_premium</span>
                                    Upgrade to Premium
                                </button>
                            </div>

                            <div class="pricing-card">
                                <h3 class="plan-name">Pro</h3>
                                <div class="plan-price">$19.99<span>/month</span></div>
                                <p class="plan-description">For serious athletes and fitness enthusiasts</p>
                                <ul class="features-list">
                                    <li>
                                        <span class="material-symbols-outlined feature-icon">check_circle</span>
                                        All Premium features
                                    </li>
                                    <li>
                                        <span class="material-symbols-outlined feature-icon">check_circle</span>
                                        Unlimited specialist consultations
                                    </li>
                                    <li>
                                        <span class="material-symbols-outlined feature-icon">check_circle</span>
                                        Custom workout programs
                                    </li>
                                    <li>
                                        <span class="material-symbols-outlined feature-icon">check_circle</span>
                                        Meal planning service
                                    </li>
                                    <li>
                                        <span class="material-symbols-outlined feature-icon">check_circle</span>
                                        Biometric integration
                                    </li>
                                    <li>
                                        <span class="material-symbols-outlined feature-icon">check_circle</span>
                                        1-on-1 coaching sessions
                                    </li>
                                </ul>
                                <button class="subscribe-btn premium" id="subscribe-pro">
                                    <span class="material-symbols-outlined">auto_awesome</span>
                                    Upgrade to Pro
                                </button>
                            </div>
                        </div>

                        <div class="features-comparison">
                            <h3>Why Upgrade?</h3>
                            <div class="comparison-grid">
                                <div class="feature-category">
                                    <h4>
                                        <span class="material-symbols-outlined" style="color: var(--accent-color);">smart_toy</span>
                                        AI Health Assistant
                                    </h4>
                                    <p>Get instant answers to health and fitness questions from our intelligent AI assistant available 24/7.</p>
                                </div>
                                <div class="feature-category">
                                    <h4>
                                        <span class="material-symbols-outlined" style="color: var(--accent-color);">people</span>
                                        Expert Connections
                                    </h4>
                                    <p>Connect directly with doctors, trainers, coaches, and dieticians for professional guidance.</p>
                                </div>
                                <div class="feature-category">
                                    <h4>
                                        <span class="material-symbols-outlined" style="color: var(--accent-color);">analytics</span>
                                        Advanced Analytics
                                    </h4>
                                    <p>Track your progress with detailed insights and personalized recommendations.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        const overlay = this.shadowRoot.getElementById('modal-overlay');
        const closeBtn = this.shadowRoot.getElementById('close-btn');
        const premiumBtn = this.shadowRoot.getElementById('subscribe-premium');
        const proBtn = this.shadowRoot.getElementById('subscribe-pro');

        closeBtn.addEventListener('click', () => this.hide());
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) this.hide();
        });

        premiumBtn.addEventListener('click', () => this.handleUpgrade('premium'));
        proBtn.addEventListener('click', () => this.handleUpgrade('pro'));
    }

    show() {
        this.shadowRoot.getElementById('modal-overlay').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    hide() {
        this.shadowRoot.getElementById('modal-overlay').classList.remove('active');
        document.body.style.overflow = '';
    }

    handleUpgrade(plan) {
        // In a real app, this would integrate with a payment processor
        if (confirm(`Upgrade to ${plan.charAt(0).toUpperCase() + plan.slice(1)} plan?\n\nFor demo purposes, this will activate premium features locally.`)) {
            window.FuelFlexApp.isPremium = true;
            localStorage.setItem('ff_premium', 'true');

            // Reload to update navigation
            window.location.reload();
        }
    }
}

class PremiumGate extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            <style>
                .premium-gate {
                    background: linear-gradient(135deg, rgba(138, 43, 226, 0.05), rgba(138, 43, 226, 0.1));
                    border: 2px solid var(--accent-color, #8a2be2);
                    border-radius: 16px;
                    padding: 3rem;
                    text-align: center;
                    max-width: 600px;
                    margin: 2rem auto;
                }
                .lock-icon {
                    font-size: 80px;
                    color: var(--accent-color, #8a2be2);
                    margin-bottom: 1rem;
                }
                h2 {
                    color: var(--text-color, #333);
                    margin: 0 0 1rem 0;
                }
                p {
                    color: #666;
                    font-size: 1.1rem;
                    line-height: 1.6;
                    margin-bottom: 2rem;
                }
                .features-preview {
                    background: white;
                    border-radius: 12px;
                    padding: 1.5rem;
                    margin-bottom: 2rem;
                    text-align: left;
                }
                .features-preview h3 {
                    margin: 0 0 1rem 0;
                    color: var(--accent-color, #8a2be2);
                    text-align: center;
                }
                .feature-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-bottom: 0.8rem;
                    padding: 0.5rem;
                }
                .feature-icon {
                    color: #51cf66;
                    font-size: 24px;
                }
                .upgrade-btn {
                    background: linear-gradient(135deg, var(--accent-color, #8a2be2), oklch(65% 0.3 320));
                    color: white;
                    border: none;
                    padding: 1rem 2.5rem;
                    border-radius: 8px;
                    font-size: 1.2rem;
                    font-weight: 700;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    transition: all 0.3s ease;
                }
                .upgrade-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 10px 25px var(--shadow-color, rgba(138, 43, 226, 0.3));
                }
            </style>

            <div class="premium-gate">
                <span class="material-symbols-outlined lock-icon">lock</span>
                <h2>Premium Feature</h2>
                <p>Upgrade to Premium to unlock the AI Health Assistant and connect with healthcare professionals</p>

                <div class="features-preview">
                    <h3>What You'll Get:</h3>
                    <div class="feature-item">
                        <span class="material-symbols-outlined feature-icon">check_circle</span>
                        <span>24/7 AI Health Assistant with intelligent responses</span>
                    </div>
                    <div class="feature-item">
                        <span class="material-symbols-outlined feature-icon">check_circle</span>
                        <span>Connect with Family Doctors, Trainers, and Dieticians</span>
                    </div>
                    <div class="feature-item">
                        <span class="material-symbols-outlined feature-icon">check_circle</span>
                        <span>Personalized health insights and recommendations</span>
                    </div>
                    <div class="feature-item">
                        <span class="material-symbols-outlined feature-icon">check_circle</span>
                        <span>Priority support and advanced features</span>
                    </div>
                </div>

                <button class="upgrade-btn" id="upgrade-btn">
                    <span class="material-symbols-outlined">workspace_premium</span>
                    Upgrade to Premium
                </button>
            </div>
        `;
    }

    connectedCallback() {
        this.shadowRoot.getElementById('upgrade-btn').addEventListener('click', () => {
            const modal = document.querySelector('pricing-modal');
            if (modal) {
                modal.show();
            }
        });
    }
}

class LocalServicesMap extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.userLocation = null;
        this.selectedCategory = 'all';

        // Mock business data with sponsored partnerships (Singapore-based)
        this.businesses = [
            {
                id: 1,
                name: 'True Fitness Orchard',
                type: 'gym',
                sponsored: true,
                rating: 4.8,
                distance: 0.8,
                address: '313 Orchard Road, #04-01, Singapore 238895',
                phone: '+65 6736 1113',
                description: 'Premium gym with state-of-the-art equipment in Orchard',
                lat: 1.3048,
                lng: 103.8318,
                features: ['24/7 Access', 'Personal Training', 'Group Classes']
            },
            {
                id: 2,
                name: 'Raffles Medical Clinic',
                type: 'medical',
                sponsored: true,
                rating: 4.9,
                distance: 1.2,
                address: '585 North Bridge Road, Singapore 188770',
                phone: '+65 6311 1111',
                description: 'Comprehensive healthcare services and family medicine',
                lat: 1.3000,
                lng: 103.8583,
                features: ['General Practice', 'Sports Medicine', 'Physical Therapy']
            },
            {
                id: 3,
                name: 'Pure Yoga Singapore',
                type: 'gym',
                sponsored: false,
                rating: 4.7,
                distance: 1.5,
                address: '501 Orchard Road, Wheelock Place, Singapore 238880',
                phone: '+65 6738 7811',
                description: 'Peaceful yoga and meditation classes with expert instructors',
                lat: 1.3052,
                lng: 103.8303,
                features: ['Yoga', 'Meditation', 'Pilates']
            },
            {
                id: 4,
                name: 'Core Concepts Physiotherapy',
                type: 'physical-therapy',
                sponsored: true,
                rating: 4.9,
                distance: 0.5,
                address: '1 Raffles Place, #04-49, Singapore 048616',
                phone: '+65 6224 4321',
                description: 'Expert physical therapy and sports rehabilitation',
                lat: 1.2844,
                lng: 103.8510,
                features: ['Sports Injury', 'Rehabilitation', 'Massage Therapy']
            },
            {
                id: 5,
                name: 'NutriHub Wellness Centre',
                type: 'nutrition',
                sponsored: false,
                rating: 4.6,
                distance: 2.1,
                address: '100 Tras Street, #03-01, Singapore 079027',
                phone: '+65 6222 0123',
                description: 'Professional nutritionist consultations and personalized meal planning',
                lat: 1.2757,
                lng: 103.8437,
                features: ['Nutrition Counseling', 'Meal Plans', 'Weight Management']
            },
            {
                id: 6,
                name: 'Fitness First Marina Bay',
                type: 'gym',
                sponsored: false,
                rating: 4.5,
                distance: 1.8,
                address: '10 Bayfront Avenue, #02-01, Singapore 018956',
                phone: '+65 6688 7000',
                description: 'Premium fitness club with Olympic weightlifting facilities',
                lat: 1.2836,
                lng: 103.8607,
                features: ['Weightlifting', 'Powerlifting', 'CrossFit']
            }
        ];

        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
            <style>
                :host {
                    display: block;
                }

                .services-map-container {
                    background: var(--card-bg, #fff);
                    border-radius: 12px;
                    padding: 1.5rem;
                    margin: 2rem 0;
                    box-shadow: 0 4px 10px var(--shadow-color, rgba(0,0,0,0.1));
                }

                .services-map-container * {
                    pointer-events: auto;
                }
                .services-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.5rem;
                    flex-wrap: wrap;
                    gap: 1rem;
                }
                .services-header h3 {
                    margin: 0;
                    color: var(--accent-color, #8a2be2);
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .category-filters {
                    display: flex;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                }
                .filter-btn {
                    background: var(--primary-color, #f0f0f0);
                    border: 1px solid var(--border-color, #ccc);
                    padding: 0.5rem 1rem;
                    border-radius: 20px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 0.9rem;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 0.3rem;
                }
                .filter-btn:hover {
                    background: var(--accent-color, #8a2be2);
                    color: white;
                    border-color: var(--accent-color, #8a2be2);
                }
                .filter-btn.active {
                    background: var(--accent-color, #8a2be2);
                    color: white;
                    border-color: var(--accent-color, #8a2be2);
                }
                #map {
                    width: 100% !important;
                    height: 400px !important;
                    border-radius: 12px;
                    margin-bottom: 1.5rem;
                    position: relative;
                    overflow: hidden;
                    z-index: 1;
                    display: block;
                    box-sizing: border-box;
                    background: #f0f0f0;
                }

                /* Ensure Leaflet elements render properly */
                #map * {
                    box-sizing: border-box;
                }

                #map .leaflet-pane,
                #map .leaflet-tile,
                #map .leaflet-marker-icon,
                #map .leaflet-marker-shadow,
                #map .leaflet-tile-container,
                #map .leaflet-zoom-animated {
                    position: absolute;
                    left: 0;
                    top: 0;
                }

                #map .leaflet-tile {
                    width: 256px;
                    height: 256px;
                }

                #map .leaflet-tile-pane {
                    z-index: 2;
                }

                #map .leaflet-overlay-pane {
                    z-index: 4;
                }

                #map .leaflet-shadow-pane {
                    z-index: 5;
                }

                #map .leaflet-marker-pane {
                    z-index: 6;
                }

                #map .leaflet-tooltip-pane {
                    z-index: 7;
                }

                #map .leaflet-popup-pane {
                    z-index: 8;
                }

                #map .leaflet-control {
                    z-index: 9;
                }

                /* Fix for disappearing tiles on hover */
                #map:hover .leaflet-tile,
                #map:hover .leaflet-marker-icon {
                    opacity: 1 !important;
                    visibility: visible !important;
                }
                .map-placeholder {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-radius: 12px;
                    height: 400px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 1.5rem;
                    position: relative;
                    overflow: hidden;
                }
                .map-placeholder::before {
                    content: '';
                    position: absolute;
                    width: 200%;
                    height: 200%;
                    background: repeating-linear-gradient(
                        45deg,
                        transparent,
                        transparent 10px,
                        rgba(255,255,255,0.05) 10px,
                        rgba(255,255,255,0.05) 20px
                    );
                    animation: mapMove 20s linear infinite;
                }
                @keyframes mapMove {
                    0% { transform: translate(0, 0); }
                    100% { transform: translate(50px, 50px); }
                }
                .map-overlay {
                    position: relative;
                    z-index: 1;
                    color: white;
                    text-align: center;
                }
                .map-overlay .icon {
                    font-size: 64px;
                    margin-bottom: 1rem;
                }
                .businesses-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 1.5rem;
                }
                .business-card {
                    background: white;
                    border: 1px solid var(--border-color, #eee);
                    border-radius: 12px;
                    padding: 1.5rem;
                    transition: all 0.3s ease;
                    cursor: pointer;
                    position: relative;
                }
                .business-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 20px var(--shadow-color, rgba(0,0,0,0.15));
                }
                .business-card.sponsored {
                    border: 2px solid #FFD700;
                    background: linear-gradient(135deg, #fff 0%, #fffaf0 100%);
                }
                .sponsored-badge {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: linear-gradient(135deg, #FFD700, #FFA500);
                    color: #333;
                    padding: 0.3rem 0.7rem;
                    border-radius: 12px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    text-transform: uppercase;
                }
                .business-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: start;
                    margin-bottom: 0.8rem;
                }
                .business-name {
                    font-size: 1.2rem;
                    font-weight: 700;
                    color: var(--text-color, #333);
                    margin: 0;
                }
                .business-type {
                    display: inline-block;
                    background: var(--accent-color, #8a2be2);
                    color: white;
                    padding: 0.2rem 0.6rem;
                    border-radius: 12px;
                    font-size: 0.75rem;
                    margin-top: 0.3rem;
                    text-transform: capitalize;
                }
                .rating-distance {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 0.8rem;
                }
                .rating {
                    display: flex;
                    align-items: center;
                    gap: 0.3rem;
                    font-weight: 600;
                }
                .rating .icon {
                    color: #FFA500;
                    font-size: 18px;
                }
                .distance {
                    color: #666;
                    font-size: 0.9rem;
                }
                .business-description {
                    color: #666;
                    margin: 0.8rem 0;
                    line-height: 1.5;
                }
                .business-features {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin: 0.8rem 0;
                }
                .feature-tag {
                    background: var(--primary-color, #f0f0f0);
                    padding: 0.3rem 0.6rem;
                    border-radius: 8px;
                    font-size: 0.8rem;
                    color: #666;
                }
                .business-actions {
                    display: flex;
                    gap: 0.8rem;
                    margin-top: 1rem;
                }
                .action-btn {
                    flex: 1;
                    padding: 0.7rem;
                    border: none;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.3rem;
                }
                .action-btn.primary {
                    background: var(--accent-color, #8a2be2);
                    color: white;
                }
                .action-btn.secondary {
                    background: white;
                    color: var(--accent-color, #8a2be2);
                    border: 1px solid var(--accent-color, #8a2be2);
                }
                .action-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 10px var(--shadow-color, rgba(0,0,0,0.2));
                }
                .location-prompt {
                    background: var(--primary-color, #f9f9f9);
                    padding: 1rem;
                    border-radius: 8px;
                    margin-bottom: 1.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 1rem;
                }
                .location-btn {
                    background: var(--accent-color, #8a2be2);
                    color: white;
                    border: none;
                    padding: 0.7rem 1.2rem;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    transition: all 0.3s ease;
                }
                .location-btn:hover {
                    box-shadow: 0 0 15px var(--accent-glow, #8a2be280);
                }

                @media (max-width: 768px) {
                    .services-map-container {
                        padding: 1rem;
                    }
                    #map {
                        height: 300px;
                    }
                    .map-placeholder {
                        height: 300px;
                    }
                    .businesses-grid {
                        grid-template-columns: 1fr;
                    }
                    .category-filters {
                        width: 100%;
                        overflow-x: auto;
                    }
                    .filter-btn {
                        flex: 1;
                        justify-content: center;
                        min-width: 100px;
                    }
                }
            </style>

            <div class="services-map-container">
                <div class="services-header">
                    <h3>
                        <span class="material-symbols-outlined">location_on</span>
                        Local Health & Fitness Services
                    </h3>
                </div>

                <div class="location-prompt">
                    <span>📍 Enable location to find services near you</span>
                    <button class="location-btn" id="location-btn">
                        <span class="material-symbols-outlined">my_location</span>
                        Get Location
                    </button>
                </div>

                <div class="category-filters">
                    <button class="filter-btn active" data-category="all">
                        <span class="material-symbols-outlined">grid_view</span>
                        All
                    </button>
                    <button class="filter-btn" data-category="gym">
                        <span class="material-symbols-outlined">fitness_center</span>
                        Gyms
                    </button>
                    <button class="filter-btn" data-category="medical">
                        <span class="material-symbols-outlined">local_hospital</span>
                        Medical
                    </button>
                    <button class="filter-btn" data-category="physical-therapy">
                        <span class="material-symbols-outlined">healing</span>
                        Physical Therapy
                    </button>
                    <button class="filter-btn" data-category="nutrition">
                        <span class="material-symbols-outlined">restaurant</span>
                        Nutrition
                    </button>
                </div>

                <div id="map"></div>

                <div class="businesses-grid" id="businesses-grid"></div>
            </div>
        `;

        this.renderBusinesses();
    }

    connectedCallback() {
        // Category filter buttons
        this.shadowRoot.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectedCategory = e.currentTarget.dataset.category;
                this.shadowRoot.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.renderBusinesses();
            });
        });

        // Location button
        this.shadowRoot.getElementById('location-btn').addEventListener('click', () => {
            this.requestLocation();
        });

        // Initialize map
        this.initMap();

        // Watch for when component becomes visible to fix map rendering
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && this.map) {
                    // Component is now visible, resize the map
                    setTimeout(() => {
                        this.map.invalidateSize();
                    }, 100);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(this);
    }

    initMap() {
        // Load Leaflet.js library (CSS is loaded in Shadow DOM via <link> tag)
        if (!window.L) {
            // Load Leaflet JS
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
            script.onload = () => this.createMap();
            document.head.appendChild(script);
        } else {
            this.createMap();
        }
    }

    createMap() {
        const mapDiv = this.shadowRoot.getElementById('map');
        if (!mapDiv) return;

        try {
            // Default center (Singapore - Marina Bay)
            const center = [1.3521, 103.8198];

            // Create map
            this.map = L.map(mapDiv).setView(center, 13);

            // Add OpenStreetMap tiles (free!)
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                maxZoom: 19
            }).addTo(this.map);

            // Ensure map renders properly after container is ready
            setTimeout(() => {
                if (this.map) {
                    this.map.invalidateSize();
                }
            }, 100);

            // Additional resize check with longer delay for visibility changes
            setTimeout(() => {
                if (this.map) {
                    this.map.invalidateSize();
                }
            }, 500);

            // Custom icon for sponsored businesses
            const sponsoredIcon = L.divIcon({
                className: 'custom-marker',
                html: `<div style="background: #FFD700; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
                iconSize: [24, 24],
                iconAnchor: [12, 12]
            });

            // Custom icon for regular businesses
            const regularIcon = L.divIcon({
                className: 'custom-marker',
                html: `<div style="background: #8a2be2; width: 18px; height: 18px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
                iconSize: [18, 18],
                iconAnchor: [9, 9]
            });

            // Custom icon for user location
            const userIcon = L.divIcon({
                className: 'custom-marker',
                html: `<div style="background: #4285F4; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
                iconSize: [20, 20],
                iconAnchor: [10, 10]
            });

            // Add markers for each business
            this.businesses.forEach(business => {
                const marker = L.marker(
                    [business.lat, business.lng],
                    { icon: business.sponsored ? sponsoredIcon : regularIcon }
                ).addTo(this.map);

                // Create popup content
                const popupContent = `
                    <div style="min-width: 200px;">
                        <h3 style="margin: 0 0 8px 0; color: #8a2be2; font-size: 1.1rem;">${business.name}</h3>
                        ${business.sponsored ? '<span style="background: linear-gradient(135deg, #FFD700, #FFA500); color: #333; padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 700; display: inline-block; margin-bottom: 8px;">⭐ SPONSORED</span><br/>' : ''}
                        <p style="margin: 8px 0; color: #666; font-size: 0.9rem;">${business.description}</p>
                        <p style="margin: 8px 0; font-weight: 600;"><strong>⭐ ${business.rating}</strong> • ${business.distance} km away</p>
                        <div style="margin-top: 10px; display: flex; gap: 10px;">
                            <a href="tel:${business.phone}" style="color: #8a2be2; text-decoration: none; font-weight: 600;">📞 Call</a>
                            <a href="https://maps.google.com/?q=${encodeURIComponent(business.address)}" target="_blank" style="color: #8a2be2; text-decoration: none; font-weight: 600;">🧭 Directions</a>
                        </div>
                    </div>
                `;

                marker.bindPopup(popupContent);
            });

            // Try to get user location
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const userPos = [position.coords.latitude, position.coords.longitude];

                        // Add user location marker
                        this.userMarker = L.marker(userPos, { icon: userIcon }).addTo(this.map);
                        this.userMarker.bindPopup('<strong>📍 Your Location</strong>');

                        // Center map on user location
                        this.map.setView(userPos, 14);

                        // Ensure map resizes properly after location is set
                        setTimeout(() => {
                            if (this.map) {
                                this.map.invalidateSize();
                            }
                        }, 100);
                    },
                    () => {
                        console.log('Geolocation failed, using default location');
                    }
                );
            }
        } catch (error) {
            console.error('Error creating map:', error);
            mapDiv.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; color: white; text-align: center; padding: 2rem;">
                    <div>
                        <p style="font-size: 1.2rem; margin-bottom: 1rem;">📍 Interactive Map</p>
                        <p style="font-size: 0.9rem; opacity: 0.9;">Unable to load map. Please refresh the page.</p>
                    </div>
                </div>
            `;
        }
    }

    requestLocation() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userPos = [position.coords.latitude, position.coords.longitude];

                    // Update map if it exists
                    if (this.map) {
                        // Center map on user location (Leaflet API)
                        this.map.setView(userPos, 14);

                        // Add user location marker if not already added
                        if (!this.userMarker) {
                            const userIcon = L.divIcon({
                                className: 'custom-marker',
                                html: `<div style="background: #4285F4; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
                                iconSize: [20, 20],
                                iconAnchor: [10, 10]
                            });
                            this.userMarker = L.marker(userPos, { icon: userIcon }).addTo(this.map);
                            this.userMarker.bindPopup('<strong>📍 Your Location</strong>');
                        } else {
                            // Update existing marker position (Leaflet API)
                            this.userMarker.setLatLng(userPos);
                        }
                    }

                    alert('Location enabled! The map is now centered on your location.');
                },
                (error) => {
                    alert('Unable to get your location. Please enable location services in your browser.');
                }
            );
        } else {
            alert('Geolocation is not supported by your browser.');
        }
    }

    renderBusinesses() {
        const container = this.shadowRoot.getElementById('businesses-grid');
        const filteredBusinesses = this.selectedCategory === 'all'
            ? this.businesses
            : this.businesses.filter(b => b.type === this.selectedCategory);

        // Sort sponsored businesses first
        filteredBusinesses.sort((a, b) => (b.sponsored ? 1 : 0) - (a.sponsored ? 1 : 0));

        container.innerHTML = filteredBusinesses.map(business => `
            <div class="business-card ${business.sponsored ? 'sponsored' : ''}">
                ${business.sponsored ? '<div class="sponsored-badge">⭐ Sponsored Partner</div>' : ''}
                <div class="business-header">
                    <div>
                        <h4 class="business-name">${business.name}</h4>
                        <span class="business-type">${business.type.replace('-', ' ')}</span>
                    </div>
                </div>
                <div class="rating-distance">
                    <div class="rating">
                        <span class="material-symbols-outlined icon">star</span>
                        ${business.rating}
                    </div>
                    <div class="distance">📍 ${business.distance} km away</div>
                </div>
                <p class="business-description">${business.description}</p>
                <div class="business-features">
                    ${business.features.map(f => `<span class="feature-tag">${f}</span>`).join('')}
                </div>
                <div class="business-actions">
                    <button class="action-btn primary" onclick="window.location.href='tel:${business.phone}'">
                        <span class="material-symbols-outlined">call</span>
                        Call
                    </button>
                    <button class="action-btn secondary" onclick="window.open('https://maps.google.com/?q=${encodeURIComponent(business.address)}', '_blank')">
                        <span class="material-symbols-outlined">directions</span>
                        Directions
                    </button>
                </div>
            </div>
        `).join('');
    }
}

customElements.define('main-navigation', MainNavigation);
customElements.define('feature-section', FeatureSection);
customElements.define('nutrition-tracker', NutritionTracker);
customElements.define('dashboard-view', DashboardView);
customElements.define('goal-planner', GoalPlanner);
customElements.define('community-board', CommunityBoard);
customElements.define('post-card', PostCard);
customElements.define('feature-voting', FeatureVoting);
customElements.define('about-me', AboutMe);
customElements.define('ai-health-chat', AIHealthChat);
customElements.define('pricing-modal', PricingModal);
customElements.define('premium-gate', PremiumGate);
customElements.define('local-services-map', LocalServicesMap);
