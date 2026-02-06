class MainNavigation extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
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
                    justify-content: center;
                    align-items: center; /* Vertically center items */
                    gap: 1rem;
                    box-shadow: 0 2px 5px var(--shadow-color, rgba(0,0,0,0.1));
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
                }
                button:hover, a:hover, button.active {
                    background-color: var(--accent-color, #8a2be2);
                    color: white;
                    /* Glow effect */
                    box-shadow: 0 0 15px var(--accent-glow, #8a2be280);
                }
                .icon {
                  font-variation-settings:
                  'FILL' 0,
                  'wght' 400,
                  'GRAD' 0,
                  'opsz' 24
                }
            </style>
            <nav>
                <a href="index.html">Home</a>
                <button data-target="dashboard" class="active">Dashboard</button>
                <button data-target="about-me">About Me</button>
                <button data-target="nutrition-tracking">Nutrition Tracking</button>
                <button data-target="fitness-goals">Fitness Goal Planning</button>
                <button data-target="community">Community</button>
                <button data-target="ai-health-chat">
                    <span class="material-symbols-outlined icon">smart_toy</span>
                    AI Health Chat
                </button>
                <a href="admin.html">Admin</a>
            </nav>
        `;
    }

    connectedCallback() {
        this.shadowRoot.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', () => this.handleNavigation(button));
        });
    }

    handleNavigation(button) {
        const targetId = button.dataset.target;

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

            alert(`Food detected: ${mockData.name}\nCalories: ${mockData.calories} kcal\n\nPlease review and adjust the details if needed, then click "Add Meal".`);
        }, 2000);
    }

    generateMockNutrition() {
        const foods = [
            { name: 'Grilled Chicken Salad', calories: 350, protein: 40, carbs: 20, fat: 10 },
            { name: 'Salmon with Vegetables', calories: 450, protein: 35, carbs: 25, fat: 20 },
            { name: 'Pasta Carbonara', calories: 650, protein: 25, carbs: 70, fat: 28 },
            { name: 'Fruit Smoothie Bowl', calories: 280, protein: 8, carbs: 55, fat: 5 },
            { name: 'Beef Burger with Fries', calories: 780, protein: 30, carbs: 65, fat: 42 }
        ];
        return foods[Math.floor(Math.random() * foods.length)];
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
                }
                .bar-container {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.5rem;
                }
                .bar {
                    width: 100%;
                    background: linear-gradient(180deg, var(--accent-color, #8a2be2), oklch(65% 0.3 320));
                    border-radius: 8px 8px 0 0;
                    transition: height 0.5s ease-in-out;
                    position: relative;
                }
                .bar-label {
                    font-size: 0.8rem;
                    font-weight: 600;
                    color: var(--text-color, #333);
                }
                .bar-value {
                    font-size: 0.7rem;
                    color: white;
                    font-weight: 600;
                    position: absolute;
                    top: -20px;
                    left: 50%;
                    transform: translateX(-50%);
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
        this.shadowRoot.innerHTML = `
            <style>
                .goal-selection {
                    margin-bottom: 2rem;
                    text-align: center;
                }
                select {
                    font-size: 1rem;
                    padding: 0.8rem;
                    border-radius: 8px;
                    border: 1px solid var(--border-color, #ccc);
                }
                .plan {
                    background: var(--primary-color, #f9f9f9);
                    padding: 1.5rem;
                    border-radius: 12px;
                    box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
                }
            </style>
            <div class="goal-selection">
                <label for="goal-select">Select Your Goal: </label>
                <select id="goal-select">
                    <option value="">--Choose a Goal--</option>
                    <option value="weight-loss">Weight Loss</option>
                    <option value="muscle-gain">Muscle Gain</option>
                    <option value="marathon-training">Marathon Training</option>
                </select>
            </div>
            <div class="plan" style="display: none;">
                <h3>Your Personalized Plan</h3>
                <ul id="plan-steps"></ul>
            </div>
        `;
    }

    connectedCallback() {
        this.shadowRoot.getElementById('goal-select').addEventListener('change', (event) => this.generatePlan(event));
    }

    generatePlan(event) {
        const goal = event.target.value;
        const planContainer = this.shadowRoot.querySelector('.plan');
        const planSteps = this.shadowRoot.getElementById('plan-steps');
        if (!goal) {
            planContainer.style.display = 'none';
            return;
        }

        let steps = [];
        if (goal === 'weight-loss') {
            steps = [
                'Consume a 500-calorie deficit each day.',
                'Engage in 30 minutes of cardio, 5 days a week.',
                'Incorporate strength training 3 days a week.',
            ];
        } else if (goal === 'muscle-gain') {
            steps = [
                'Consume a 500-calorie surplus each day.',
                'Lift heavy weights 4-5 days a week.',
                'Ensure adequate protein intake (1.6g per kg of body weight).'
            ];
        } else if (goal === 'marathon-training') {
            steps = [
                'Follow a structured running plan with long runs, tempo runs, and recovery days.',
                'Incorporate cross-training to prevent injuries.',
                'Focus on proper nutrition and hydration.',
            ];
        }

        planSteps.innerHTML = steps.map(step => `<li>${step}</li>`).join('');
        planContainer.style.display = 'block';
    }
}

class CommunityBoard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <h3>Community Forum</h3>
            <div id="post-form">
                <input type="text" id="post-title" placeholder="Post title"/>
                <textarea id="post-content" placeholder="Share your thoughts..."></textarea>
                <button id="add-post-btn">Add Post</button>
            </div>
            <div id="posts-container"></div>
            <feature-voting></feature-voting>
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
        this.shadowRoot.getElementById('add-post-btn').addEventListener('click', () => {
            const title = this.shadowRoot.getElementById('post-title').value;
            const content = this.shadowRoot.getElementById('post-content').value;
            if (title && content) {
                this.addPost(title, content);
                this.shadowRoot.getElementById('post-title').value = '';
                this.shadowRoot.getElementById('post-content').value = '';
            }
        });

        // Listen for delete-post events from post-card
        this.shadowRoot.addEventListener('delete-post', (event) => {
            this.deletePost(event.detail.postId);
        });

        // Listen for update-post events from post-card
        this.shadowRoot.addEventListener('update-post', (event) => {
            const { postId, newTitle, newContent } = event.detail;
            this.updatePost(postId, newTitle, newContent);
        });
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
        this.shadowRoot.innerHTML = `
            <style>
                .form-group {
                    margin-bottom: 1rem;
                }
                label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 600;
                }
                input {
                    width: 100%;
                    padding: 0.8rem;
                    border: 1px solid var(--border-color, #ccc);
                    border-radius: 8px;
                    font-size: 1rem;
                }
                .calculate-btn {
                    background-color: var(--accent-color, #8a2be2);
                    color: white;
                    padding: 0.8rem 1.5rem;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 1rem;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }
                .calculate-btn:hover {
                     box-shadow: 0 0 15px var(--accent-glow, #8a2be280);
                     transform: translateY(-2px);
                }
                .bmi-result {
                    margin-top: 1.5rem;
                    text-align: center;
                    font-size: 1.2rem;
                    font-weight: 600;
                }
            </style>
            <div class="form-group">
                <label for="height">Height (cm)</label>
                <input type="number" id="height" placeholder="Enter your height">
            </div>
            <div class="form-group">
                <label for="weight">Weight (kg)</label>
                <input type="number" id="weight" placeholder="Enter your weight">
            </div>
            <button class="calculate-btn">Calculate BMI</button>
            <div class="bmi-result" style="display: none;">
                <h3>Your BMI: <span id="bmi-value"></span></h3>
                <p id="bmi-category"></p>
            </div>
        `;
    }

    connectedCallback() {
        this.shadowRoot.querySelector('.calculate-btn').addEventListener('click', () => this.calculateBmi());
    }

    calculateBmi() {
        const height = this.shadowRoot.getElementById('height').value;
        const weight = this.shadowRoot.getElementById('weight').value;

        if (!height || !weight) {
            return;
        }

        const heightInMeters = height / 100;
        const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);

        const bmiValue = this.shadowRoot.getElementById('bmi-value');
        const bmiCategory = this.shadowRoot.getElementById('bmi-category');
        const bmiResult = this.shadowRoot.querySelector('.bmi-result');

        bmiValue.textContent = bmi;

        if (bmi < 18.5) {
            bmiCategory.textContent = 'Underweight';
        } else if (bmi >= 18.5 && bmi < 25) {
            bmiCategory.textContent = 'Normal weight';
        } else if (bmi >= 25 && bmi < 30) {
            bmiCategory.textContent = 'Overweight';
        } else {
            bmiCategory.textContent = 'Obesity';
        }

        bmiResult.style.display = 'block';
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
                name: 'Dr. Sarah Johnson',
                role: 'Family Doctor',
                icon: 'medical_services',
                specialty: 'General Medicine & Preventive Care',
                availability: 'Mon-Fri, 9 AM - 5 PM',
                description: 'Board-certified family physician with 15 years of experience in primary care and preventive medicine.',
                color: '#ff6b6b'
            },
            {
                id: 'trainer',
                name: 'Mike Rodriguez',
                role: 'Fitness Trainer',
                icon: 'fitness_center',
                specialty: 'Strength & Conditioning',
                availability: 'Mon-Sat, 6 AM - 8 PM',
                description: 'Certified personal trainer specializing in strength training, weight loss, and body transformation.',
                color: '#51cf66'
            },
            {
                id: 'coach',
                name: 'Alex Thompson',
                role: 'Sports Coach',
                icon: 'sports_soccer',
                specialty: 'Athletic Performance',
                availability: 'Tue-Sun, 7 AM - 7 PM',
                description: 'Professional sports coach with expertise in performance optimization and sports-specific training.',
                color: '#339af0'
            },
            {
                id: 'dietician',
                name: 'Emily Chen',
                role: 'Registered Dietician',
                icon: 'restaurant',
                specialty: 'Nutrition & Meal Planning',
                availability: 'Mon-Fri, 8 AM - 6 PM',
                description: 'Licensed dietician specializing in personalized meal plans, weight management, and sports nutrition.',
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
