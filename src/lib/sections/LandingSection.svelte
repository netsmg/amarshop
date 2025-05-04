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
            
            <a href="/exams" class="cta-button font-bold py-2 px-4 rounded" use:borderAnimation>
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
            
            <div class="feature-card w-full" use:revealAnimation>
                <div class="feature-icon"> <Book /> </div>
                <h4>Wide Range of Topics</h4>
                <p>Explore 50+ subjects from science to literature</p>
            </div>
            
            <div class="feature-card w-full" use:revealAnimation>
                <div class="feature-icon"> <AutoFlash /> </div>
                <h4>Instant Feedback</h4>
                <p>Detailed explanations with every answer</p>
            </div>
            
           
            
            <div class="feature-card w-full" use:revealAnimation>
                <div class="feature-icon"> <Clock /></div>
                <h4>Free & Unlimited</h4>
                <p>Complete access with zero restrictions</p>
            </div>
        </div>
    </div>
</section>
<style>
  .hero {
    background: var(--background-primary);
    min-height: 100vh;
    padding: 4rem 1.5rem;
  }

  .hero-content {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    gap: 3rem;
  }

  .header-group {
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
  }

  .hero-title {
    font-size: 3.5rem;
    line-height: 1.1;
    color: var(--text-900);
    margin-bottom: 1.5rem;
  }

  .gradient-text {
    background: linear-gradient(45deg, var(--primary-500), var(--primary-600));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .hero-subtitle {
    font-size: 1.25rem;
    color: var(--text-600);
    margin-bottom: 2rem;
    line-height: 1.6;
  }

  .search-container {
    display: flex;
    gap: 0.5rem;
    max-width: 600px;
    margin: 2rem auto;
    background: var(--glass-background);
    backdrop-filter: var(--backdrop-blur);
    border: 1px solid var(--glass-border);
    border-radius: var(--border-radius);
    padding: 0.75rem 1rem;
    transition: var(--transition);
  }

  .search-input {
    flex: 1;
    background: transparent;
    border: none;
    color: var(--text-900);
    font-size: 1rem;
    padding: 0.5rem;
  }

  .search-input::placeholder {
    color: var(--text-400);
  }

  .search-button {
    background: var(--primary-500);
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: var(--transition);
  }

  .cta-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--primary-500);
    color: var(--text-50);
    padding: 1rem 2rem;
    border-radius: var(--border-radius);
    text-decoration: none;
    font-weight: 600;
    transition: var(--transition);
    margin-top: 1.5rem;
  }

  .cta-button:hover {
    background: var(--primary-600);
    transform: translateY(-2px);
  }

  .quiz-highlight {
    background: var(--glass-background);
    backdrop-filter: var(--backdrop-blur);
    border: 1px solid var(--glass-border);
    border-radius: var(--border-radius);
    padding: 2rem;
    margin: 2rem 0;
    position: relative;
  }

  .quiz-badge {
    position: absolute;
    top: -0.75rem;
    left: 1.5rem;
    background: var(--primary-500);
    color: var(--text-50);
    padding: 0.25rem 1rem;
    border-radius: 999px;
    font-size: 0.875rem;
    font-weight: 600;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
  }

  .feature-card {
    background: var(--glass-background);
    backdrop-filter: var(--backdrop-blur);
    border: 1px solid var(--glass-border);
    border-radius: var(--border-radius);
    padding: 2rem;
    text-align: center;
    transition: var(--transition);
  }

  .feature-card:hover {
    transform: translateY(-5px);
  }

  .feature-icon {
    width: 3rem;
    height: 3rem;
    background: var(--primary-500);
    border-radius: 50%;
    display: grid;
    place-items: center;
    margin: 0 auto 1rem;
    color: var(--text-50);
  }

  .feature-card h4 {
    color: var(--text-900);
    margin-bottom: 0.75rem;
  }

  .feature-card p {
    color: var(--text-600);
    line-height: 1.6;
  }

  /* Base Mobile Styles */
  .hero {
    padding: 2rem 1rem;
    min-height: 90vh;
  }

  .hero-content {
    gap: 2rem;
    padding: 0 1rem;
  }

  .header-group {
    max-width: 100%;
  }

  .hero-title {
    font-size: 2rem;
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  .hero-subtitle {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }

  .search-container {
    margin: 1rem auto;
    padding: 0.5rem;
    width: 95%;
  }

  .search-input {
    font-size: 0.9rem;
  }

  .cta-button {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
    margin-top: 1rem;
  }

  .quiz-highlight {
    padding: 1.5rem;
    margin: 1.5rem 0;
  }

  .quiz-badge {
    left: 1rem;
    font-size: 0.75rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .feature-card {
    padding: 1.5rem;
  }

  .feature-icon {
    width: 2.5rem;
    height: 2.5rem;
  }

  /* Tablet Styles (768px+) */
  @media (min-width: 768px) {
    .hero {
      padding: 3rem 2rem;
    }

    .hero-title {
      font-size: 2.5rem;
    }

    .hero-subtitle {
      font-size: 1.1rem;
    }

    .search-container {
      width: 80%;
    }

    .features-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.25rem;
    }

    .cta-button {
      padding: 1rem 2rem;
    }

    .quiz-highlight {
      padding: 2rem;
    }
  }

  /* Desktop Styles (1024px+) */
  @media (min-width: 1024px) {
    .hero {
      padding: 4rem 3rem;
    }

    .hero-title {
      font-size: 3.5rem;
    }

    .hero-subtitle {
      font-size: 1.25rem;
    }

    .search-container {
      max-width: 600px;
    }

    .features-grid {
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    }

    .quiz-highlight {
      margin: 2.5rem 0;
    }
  }

  /* Large Desktop (1280px+) */
  @media (min-width: 1280px) {
    .hero-content {
      gap: 4rem;
    }

    .hero-title {
      font-size: 4rem;
    }
  }

  /* Mobile Landscape Optimization */
  @media (max-width: 768px) and (orientation: landscape) {
    .hero {
      min-height: 120vh;
      padding: 1.5rem;
    }

    .features-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  /* Touch Target Optimization */
  @media (pointer: coarse) {
    .cta-button,
    .search-button {
      min-width: 48px;
      min-height: 48px;
    }
  }

  /* Reduced Motion */
  @media (prefers-reduced-motion: reduce) {
    .feature-card,
    .quiz-card,
    .cta-button {
      transition: none;
      transform: none !important;
    }
  }
</style>
