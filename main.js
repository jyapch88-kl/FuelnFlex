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
        this.shadowRoot.innerHTML = `
            <style>
                .upload-area {
                    text-align: center;
                    padding: 2rem;
                    border: 2px dashed var(--border-color, #ccc);
                    border-radius: 12px;
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
                }
                .upload-btn:hover {
                     box-shadow: 0 0 15px var(--accent-glow, #8a2be280);
                     transform: translateY(-2px);
                }
                .loading, .results {
                    margin-top: 1.5rem;
                    text-align: center;
                    font-size: 1.1rem;
                }
                 .results h3 {
                     color: var(--accent-color, #8a2be2);
                 }
            </style>
            <div class="upload-area">
                <label for="file-input" class="upload-btn">Upload a Photo</label>
                <input type="file" id="file-input" accept="image/*">
            </div>
            <div class="loading" style="display: none;">Calculating...</div>
            <div class="results" style="display: none;">
                <h3>Estimated Nutrition: <span id="nutrition"></span></h3>
                <h4>Suggestions:</h4>
                <p id="suggestions"></p>
            </div>
        `;
    }

    connectedCallback() {
        this.shadowRoot.getElementById('file-input').addEventListener('change', (event) => this.handleFileUpload(event));
    }

    handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        const loading = this.shadowRoot.querySelector('.loading');
        const results = this.shadowRoot.querySelector('.results');

        loading.style.display = 'block';
        results.style.display = 'none';

        setTimeout(() => {
            loading.style.display = 'none';
            results.style.display = 'block';
            this.shadowRoot.getElementById('nutrition').textContent = '450 kcal';
            this.shadowRoot.getElementById('suggestions').textContent = 'This seems like a balanced meal! To make it even healthier, consider adding a side of steamed vegetables.';
        }, 2000);
    }
}

class DashboardView extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .dashboard-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                }
                .dashboard-card {
                    background: var(--card-bg, #fff);
                    padding: 1.5rem;
                    border-radius: 12px;
                    box-shadow: 0 4px 10px var(--shadow-color, rgba(0,0,0,0.1));
                    border: 1px solid var(--border-color, #eee);
                }
                h3 {
                    margin-top: 0;
                    font-weight: 600;
                    color: var(--accent-color, #8a2be2);
                }
                .progress-bar {
                    width: 100%;
                    background-color: var(--primary-color, #f0f0f0);
                    border-radius: 8px;
                    overflow: hidden;
                    height: 24px;
                }
                .progress {
                    background-color: var(--accent-color, #8a2be2);
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 600;
                    transition: width 0.5s ease-in-out;
                }
            </style>
            <div class="dashboard-grid">
                <div class="dashboard-card">
                    <h3>Nutrition Goal</h3>
                    <p>1500 / 2500 kcal</p>
                    <div class="progress-bar">
                        <div class="progress" style="width: 60%;">60%</div>
                    </div>
                </div>
                <div class="dashboard-card">
                    <h3>Fitness Goal</h3>
                    <p>3 / 5 workouts this week</p>
                    <div class="progress-bar">
                        <div class="progress" style="width: 60%;">60%</div>
                    </div>
                </div>
            </div>
        `;
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
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            <style>
                .chat-container {
                    max-width: 800px;
                    margin: 0 auto;
                    border-radius: 12px;
                    overflow: hidden;
                    border: 1px solid var(--border-color, #eee);
                    box-shadow: 0 4px 10px var(--shadow-color, rgba(0,0,0,0.1));
                }
                .chat-window {
                    height: 400px;
                    padding: 1rem;
                    overflow-y: auto;
                    background-color: var(--card-bg, #fff);
                }
                .chat-message {
                    margin-bottom: 1rem;
                }
                .chat-message.user {
                    text-align: right;
                }
                .message-bubble {
                    display: inline-block;
                    padding: 0.8rem 1.2rem;
                    border-radius: 18px;
                    max-width: 80%;
                }
                .chat-message.user .message-bubble {
                    background-color: var(--accent-color, #8a2be2);
                    color: white;
                }
                .chat-message.bot .message-bubble {
                    background-color: var(--primary-color, #f0f0f0);
                }
                .chat-input {
                    display: flex;
                    padding: 1rem;
                    border-top: 1px solid var(--border-color, #eee);
                    align-items: center;
                }
                .chat-input input {
                    flex-grow: 1;
                    border: 1px solid var(--border-color, #ccc);
                    border-radius: 8px;
                    padding: 0.8rem;
                    font-size: 1rem;
                    margin-right: 1rem;
                }
                .specialist-buttons button {
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 0.5rem;
                }
                 .specialist-buttons .icon {
                    font-size: 28px;
                    color: var(--text-color, #333);
                 }
            </style>
            <div class="chat-container">
                <div class="chat-window">
                     <div class="chat-message bot">
                        <div class="message-bubble">Hello! I'm your AI Health Assistant. How can I help you today?</div>
                    </div>
                </div>
                <div class="chat-input">
                    <input type="text" placeholder="Type your message...">
                    <div class="specialist-buttons">
                        <button data-role="Doctor" title="Talk to a Doctor"><span class="material-symbols-outlined icon">medical_services</span></button>
                        <button data-role="Coach" title="Talk to a Coach"><span class="material-symbols-outlined icon">fitness_center</span></button>
                        <button data-role="Dietitian" title="Talk to a Dietitian"><span class="material-symbols-outlined icon">restaurant</span></button>
                    </div>
                    <button id="send-btn">Send</button>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        const chatInput = this.shadowRoot.querySelector('.chat-input input');
        const sendButton = this.shadowRoot.getElementById('send-btn');
        const chatWindow = this.shadowRoot.querySelector('.chat-window');

        sendButton.addEventListener('click', () => {
            this.sendMessage(chatInput, chatWindow);
        });

        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage(chatInput, chatWindow);
            }
        });

        this.shadowRoot.querySelectorAll('.specialist-buttons button').forEach(button => {
            button.addEventListener('click', () => {
                const role = button.dataset.role;
                this.addMessage(`You have requested to speak with a ${role}. A specialist will be with you shortly.`, 'bot', chatWindow);
            });
        });
    }

    sendMessage(chatInput, chatWindow) {
        const message = chatInput.value.trim();
        if (!message) return;

        this.addMessage(message, 'user', chatWindow);
        chatInput.value = '';

        // Mock bot response
        setTimeout(() => {
            this.addMessage("I'm sorry, I'm just a demo, so I can't really help with that. But I can connect you with a specialist!", 'bot', chatWindow);
        }, 1000);
    }

    addMessage(message, sender, chatWindow) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', sender);
        messageElement.innerHTML = `<div class="message-bubble">${message}</div>`;
        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight;
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
