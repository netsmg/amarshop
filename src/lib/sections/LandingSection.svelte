<script>
import { borderAnimation,decodeAnimation } from '$lib/actions/animation';
import { Book,
  Clock,
  Search,
  AutoFlash } from '$lib/icons';
</script>
<section class="hero">
    <div class="hero-content">
        <div class="header-group">
            <h1 class="hero-title" use:borderAnimation>Master Your Knowledge with Free MCQ Quizzes</h1>
            <p class="hero-subtitle" use:decodeAnimation>Test your skills, learn new concepts, and ace your exams with our interactive quizzes – anytime, anywhere!</p>
            
            <div class="search-container"  use:decodeAnimation>
                <input type="text" placeholder="Search quizzes by subject or topic..." class="search-input">
                <button class="search-button"> <Search /> </button>
            </div>
            
            <a href="/quizzes" class="cta-button" use:borderAnimation>
                Start Quiz Now
                <svg class="cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
            </a>
        </div>

        <div class="quiz-highlight">
            <div class="quiz-of-day">
                <div class="quiz-badge">Quiz of the Day</div>
                <h3>World History Challenge</h3>
                <p>20 Questions | Medium Difficulty | 4.8★ Rating</p>
                <button class="quiz-start">Take This Quiz →</button>
            </div>
        </div>

        <div class="features-grid">
            <div class="feature-card">
                <div class="feature-icon"> <Book /> </div>
                <h4>Wide Range of Topics</h4>
                <p>Explore 50+ subjects from science to literature</p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon"> <AutoFlash /> </div>
                <h4>Instant Feedback</h4>
                <p>Detailed explanations with every answer</p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon"> <Clock /> </div>
                <h4>Mobile-Friendly</h4>
                <p>Seamless experience on any device</p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">🎯</div>
                <h4>Free & Unlimited</h4>
                <p>Complete access with zero restrictions</p>
            </div>
        </div>
    </div>
</section>

<style>
.hero {
    padding: 4rem 1rem;
    background: linear-gradient(135deg, #f0f9ff 0%, #ebf8ff 100%);
}

.hero-content {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
}

.header-group {
    max-width: 800px;
    margin: 0 auto 3rem;
}

.hero-title {
    font-size: 2.75rem;
    color: #1e3a8a;
    margin-bottom: 1.5rem;
    line-height: 1.2;
}

.hero-subtitle {
    font-size: 1.25rem;
    color: #4b5563;
    margin-bottom: 2rem;
}

.search-container {
    max-width: 600px;
    margin: 2rem auto;
    position: relative;
}

.search-input {
    width: 100%;
    padding: 1rem 2rem;
    border: 2px solid #bfdbfe;
    border-radius: 50px;
    font-size: 1rem;
    transition: all 0.3s ease;
}

.search-input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.search-button {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    color: #64748b;
}

.cta-button {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 2.5rem;
    background: #3b82f6;
    color: white;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
    margin: 1rem 0;
}

.cta-button:hover {
    background: #2563eb;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);
}

.cta-icon {
    width: 20px;
    height: 20px;
}

.quiz-highlight {
    margin: 3rem 0;
}

.quiz-of-day {
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    position: relative;
    max-width: 600px;
    margin: 0 auto;
}

.quiz-badge {
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    background: #f59e0b;
    color: white;
    padding: 0.5rem 1.5rem;
    border-radius: 25px;
    font-weight: 600;
    font-size: 0.9rem;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
}

.feature-card {
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    transition: transform 0.3s ease;
}

.feature-card:hover {
    transform: translateY(-5px);
}

.feature-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto; /* center horizontally */
}
    

@media (max-width: 768px) {
    .hero-title {
        font-size: 2rem;
    }
    
    .hero-subtitle {
        font-size: 1.1rem;
    }
    
    .features-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 480px) {
    .hero {
        padding: 2rem 1rem;
    }
    
    .cta-button {
        width: 100%;
        justify-content: center;
    }
    
    .quiz-of-day {
        padding: 1.5rem;
    }
}
.quiz-start {
    background-color: #4f46e5; /* Indigo-600 */
    color: #fff;
    border: none;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.quiz-start:hover {
    background-color: #4338ca; /* Indigo-700 */
    transform: scale(1.03);
}

.quiz-start:active {
    background-color: #3730a3; /* Indigo-800 */
    transform: scale(0.98);
}
</style>
