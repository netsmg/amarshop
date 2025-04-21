<script>
import { borderAnimation,decodeAnimation, revealAnimation } from '$lib/actions/animation';
import { Book,
  Clock,
  Search,
  AutoFlash } from '$lib/icons';
</script>
<section class="hero">
    <div class="hero-content">
        <div class="header-group">
            <h1 class="hero-title">
                <span class="gradient-text">Master Your Knowledge</span> with Free MCQ Quizzes
            </h1>
            <p class="hero-subtitle" use:decodeAnimation>
                Test your skills, learn new concepts, and ace your exams with our interactive quizzes – anytime, anywhere!
            </p>
            
            <div class="search-container" use:revealAnimation>
                <input type="text" placeholder="Search quizzes by subject or topic..." class="search-input" />
                <button class="search-button"><Search /></button>
            </div>
            
            <a href="/exams" class="cta-button" use:borderAnimation>
                Start Quiz Now
                <svg class="cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
            </a>
        </div>

        <div class="quiz-highlight">
            <div class="quiz-of-day" use:revealAnimation>
                <div class="quiz-badge">Quiz of the Day</div>
                <h3>World History Challenge</h3>
                <p>20 Questions | Medium Difficulty | 4.8 ⭐ Rating</p>
            </div>
        </div>

        <div class="features-grid">
            
            <div class="feature-card" use:revealAnimation>
                <div class="feature-icon"> <Book /> </div>
                <h4>Wide Range of Topics</h4>
                <p>Explore 50+ subjects from science to literature</p>
            </div>
            
            <div class="feature-card" use:revealAnimation>
                <div class="feature-icon"> <AutoFlash /> </div>
                <h4>Instant Feedback</h4>
                <p>Detailed explanations with every answer</p>
            </div>
            
           
            
            <div class="feature-card" use:revealAnimation>
                <div class="feature-icon"> <Clock /></div>
                <h4>Free & Unlimited</h4>
                <p>Complete access with zero restrictions</p>
            </div>
        </div>
    </div>
</section>

<style>
:global(:root) {
    --hero-gradient: linear-gradient(145deg, var(--primary-300) 0%, var(--accent-500) 100%);
    --text-gradient: linear-gradient(45deg, var(--primary-500) 0%, var(--accent-500) 100%);
}

.hero {
    padding: 4rem 1rem;
    background: var(--hero-gradient);
    position: relative;
    overflow: hidden;
}

.hero:before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--glass-background);
    backdrop-filter: var(--backdrop-blur);
}

.hero-content {
    max-width: 1440px;
    margin: 0 auto;
    text-align: center;
    position: relative;
    z-index: 1;
}

.gradient-text {
    background: var(--text-gradient);
    -webkit-background-clip: text;
    background-clip: text;
}

.header-group {
    max-width: 800px;
    margin: 0 auto 3rem;
}

.hero-title {
    font-size: clamp(2rem, 5vw, 3.5rem);
    color: var(--text-900);
    margin-bottom: 1.5rem;
    line-height: 1.2;
    font-weight: 800;
}

.hero-subtitle {
    font-size: clamp(1rem, 2vw, 1.25rem);
    color: var(--text-600);
    margin-bottom: 2rem;
    max-width: 680px;
    margin-left: auto;
    margin-right: auto;
}

.search-container {
    max-width: 600px;
    margin: 2rem auto;
    position: relative;
}

.search-input {
    width: 100%;
    padding: 1.25rem 2.5rem;
    border: 2px solid var(--glass-border);
    border-radius: 50px;
    font-size: 1rem;
    background: var(--glass-background);
    backdrop-filter: var(--backdrop-blur);
    transition: var(--transition);
    color: var(--text-800);
}

.search-input:focus {
    outline: none;
    border-color: var(--primary-500);
    box-shadow: 0 0 0 3px var(--primary-100);
}

.search-button {
    position: absolute;
    right: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: var(--text-600);
    cursor: pointer;
    transition: var(--transition);
}

.search-button:hover {
    color: var(--primary-500);
}

.cta-button {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 2rem;
    background: var(--primary-500);
    color: var(--text-50);
    border-radius: 25px;
    text-decoration: none;
    font-weight: 600;
    transition: var(--transition);
    backdrop-filter: var(--backdrop-blur);
    margin: 1.5rem 0;
    font-size: 1rem;
    height: auto;
    white-space: nowrap;
}

.cta-button:hover {
    background: var(--primary-600);
    transform: translateY(-2px) scale(1.02);
    box-shadow: var(--glass-shadow);
}

/* Responsive tweaks */
@media (max-width: 768px) {
    .cta-button {
        padding: 0.75rem 1.5rem;
        font-size: 0.95rem;
    }
}


@media (max-width: 480px) {
    .cta-button {
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
    }
}

.quiz-highlight {
    margin: 4rem 0;
}

.quiz-of-day {
    background: var(--glass-background);
    padding: 2.5rem;
    border-radius: var(--border-radius);
    backdrop-filter: var(--backdrop-blur);
    border: 1px solid var(--glass-border);
    box-shadow: var(--glass-shadow);
    position: relative;
    max-width: 680px;
    margin: 0 auto;
}

.quiz-badge {
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--accent-500);
    color: var(--text-50);
    padding: 0.5rem 2rem;
    border-radius: 25px;
    font-weight: 700;
    font-size: 0.9rem;
    border: 1px solid var(--accent-600);
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-top: 4rem;
}

.feature-card {
    background: var(--glass-background);
    padding: 2.5rem;
    border-radius: var(--border-radius);
    transition: var(--transition);
    border: 1px solid var(--glass-border);
    backdrop-filter: var(--backdrop-blur);
}

.feature-card:hover {
    transform: translateY(-8px);
    background: var(--primary-50);
    border-color: var(--primary-200);
}

.feature-icon {
    font-size: 2.5rem;
    color: var(--primary-500);
    margin-bottom: 1.5rem;
    padding: 1rem;
    border-radius: 50%;
    background: var(--glass-background);
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto 1.5rem;
}

@media (max-width: 768px) {
    .hero {
        padding: 3rem 1rem;
    }
    
    .quiz-of-day {
        padding: 1.5rem;
    }
    
    .feature-card {
        padding: 1.5rem;
    }
}

@media (max-width: 480px) {
    
    
    .search-input {
        padding: 1rem 2rem;
    }
}
</style>
