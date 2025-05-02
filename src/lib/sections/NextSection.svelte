<script>
    import { borderAnimation, decodeAnimation, revealAnimation } from '$lib/actions/animation';
    import { Book, Clock, Search, AutoFlash, ArrowRight } from '$lib/icons';
    import { fade, fly } from 'svelte/transition';

    let testimonials = [
        {
            name: "Sarah Johnson",
            role: "Med Student",
            text: "Boosted my exam scores by 40%! The interactive quizzes are game-changers.",
            avatar: "/avatars/testimonial-02.jpg"
        },
        {
            name: "Mike Chen",
            role: "Developer",
            text: "Best way to keep skills sharp. Love the instant explanations!",
            avatar: "/avatars/testimonial-01.jpg"
        },
        {
            name: "Emma Wilson",
            role: "Teacher",
            text: "My students adore the quiz challenges. Engagement skyrocketed!",
            avatar: "/avatars/social-proof03.jpg"
        }
    ];

    let trendingQuizzes = [
        {
            title: "JavaScript Mastery",
            category: "Programming",
            questions: 25,
            difficulty: "Advanced",
            attempts: "1.2K",
            link: "/quizzes/javascript-master"
        },
        {
            title: "Human Anatomy",
            category: "Biology",
            questions: 30,
            difficulty: "Intermediate",
            attempts: "890",
 link: "/quizzes/human-anatomy"

        },
        {
            title: "World Capitals",
            category: "Geography",
            questions: 50,
            difficulty: "Easy",
            attempts: "2.4K",
link: "/quizzes/world-capitals"
        }
    ];
</script>



<section class="hero">
    <div class="hero-content">
        <!-- Main Header -->
        <div class="header-group" in:fly={{ y: 50, duration: 500 }}>
            
               <div class="stats-grid">
                <div class="stat-item">
                    <span class="stat-number">500K+</span>
                    <span class="stat-label">Daily Challenges</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">98%</span>
                    <span class="stat-label">Success Rate</span>
                </div>
            </div>
        </div>

        <!-- Trending Section -->
        <div class="carousel-section" in:fade>
            <h2 class="section-title">Trending in Your Field</h2>
            <div class="carousel-container">
                {#each trendingQuizzes as quiz}
<a href={quiz.link}>
                    <div class="quiz-card" use:revealAnimation transition:fly={{ y: 20 }}>
                        <div class="quiz-thumbnail">
                            <div class="quiz-category">{quiz.category}</div>
                        </div>
                        <div class="quiz-content">
                            <h3>{quiz.title}</h3>
                            <div class="quiz-meta">
                                <span><Book /> {quiz.questions} Questions</span>
                                <span> <AutoFlash /> {quiz.difficulty}</span>
                            </div>
                            <div class="quiz-stats">
                                <span> <Clock /> {quiz.attempts} attempts</span>
                                <button class="quiz-start">
                                    Start Now <ArrowRight />
                                </button>
                            </div>
                        </div>
                    </div>
</a>
                {/each}
            </div>
        </div>

        <!-- Features Grid -->
        <div class="features-section">
            <h2 class="section-title">Why Learners Choose Us</h2>
            <div class="features-grid">
                {#each [
                    { icon: Book, title: 'Comprehensive Library', text: 'Daily updated questions across all subjects' },
                    { icon: AutoFlash, title: 'AI Analysis', text: 'Detailed performance breakdowns' },
                    { icon: Clock, title: 'Timed Drills', text: 'Simulate real exam conditions' },
                    { icon: Book, title: 'Global Ranking', text: 'Compete with learners worldwide' },
                    { icon: Clock, title: 'Progress Tracking', text: 'Visual learning journey mapping' }
                ] as feature, i}
                    <div class="feature-card" in:fly={{ delay: i * 100 }} use:revealAnimation>
                       <center> <feature.icon class="feature-icon" /> </center>
                        <h3>{feature.title}</h3>
                        <p>{feature.text}</p>
                    </div>
                {/each}
            </div>
        </div>

        <!-- Testimonials -->
        <div class="testimonials-section">
            <h2 class="section-title">Success Stories</h2>
            <div class="testimonials-grid">
                {#each testimonials as testimonial}
                    <div class="testimonial-card" transition:fly={{ y: 30 }} use:revealAnimation>
                        <div class="user-avatar">
                            <img src={testimonial.avatar} alt={testimonial.name} />
                        </div>
                        <p class="testimonial-text">"{testimonial.text}"</p>
                        <div class="user-info">
                            <strong>{testimonial.name}</strong>
                            <span>{testimonial.role}</span>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</section>
<style>
  /* Stats Grid */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
  }

  .stat-item {
    background: var(--glass-background);
    backdrop-filter: var(--backdrop-blur);
    border: 1px solid var(--glass-border);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    text-align: center;
  }

  .stat-number {
    font-size: 2.5rem;
    font-weight: 700;
    background: linear-gradient(45deg, var(--primary-500), var(--accent-500));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .stat-label {
    color: var(--text-600);
    font-size: 0.9rem;
    display: block;
    margin-top: 0.5rem;
  }

  /* Trending Section */
  .carousel-section {
    margin: 4rem 0;
  }

  .section-title {
    color: var(--text-900);
    font-size: 2rem;
    margin-bottom: 2rem;
    position: relative;
    padding-left: 1rem;
  }

  .section-title::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 80%;
    width: 4px;
    background: var(--primary-500);
    border-radius: 4px;
  }

  .carousel-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .quiz-card {
    background: var(--glass-background);
    backdrop-filter: var(--backdrop-blur);
    border: 1px solid var(--glass-border);
    border-radius: var(--border-radius);
    overflow: hidden;
    transition: var(--transition);
  }

  .quiz-card:hover {
    transform: translateY(-5px);
  }

  .quiz-thumbnail {
    height: 150px;
    background: linear-gradient(45deg, var(--primary-500), var(--primary-600));
    padding: 1rem;
    position: relative;
  }

  .quiz-category {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background: var(--primary-900);
    color: var(--text-50);
    padding: 0.25rem 1rem;
    border-radius: 999px;
    font-size: 0.875rem;
  }

  .quiz-content {
    padding: 1.5rem;
  }

  .quiz-content h3 {
    color: var(--text-900);
    margin-bottom: 1rem;
  }

  .quiz-meta {
    display: flex;
    gap: 1rem;
    color: var(--text-600);
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .quiz-stats {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--text-600);
  }

  .quiz-start {
    background: var(--primary-500);
    color: var(--text-50);
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: var(--transition);
  }

  /* Features Section */
  .features-section {
    margin: 4rem 0;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem;
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
    padding: 0.75rem;
    background: var(--primary-500);
    border-radius: 50%;
    margin: 0 auto 1rem;
    color: var(--text-50);
  }

  .feature-card h3 {
    color: var(--text-900);
    margin-bottom: 0.75rem;
  }

  .feature-card p {
    color: var(--text-600);
    line-height: 1.6;
  }

  /* Testimonials */
  .testimonials-section {
    margin: 4rem 0;
  }

  .testimonials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .testimonial-card {
    background: var(--glass-background);
    backdrop-filter: var(--backdrop-blur);
    border: 1px solid var(--glass-border);
    border-radius: var(--border-radius);
    padding: 2rem;
    position: relative;
  }

  .user-avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto 1rem;
    border: 2px solid var(--primary-500);
  }

  .user-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .testimonial-text {
    color: var(--text-700);
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .user-info {
    text-align: center;
  }

  .user-info strong {
    color: var(--text-900);
    display: block;
  }

  .user-info span {
    color: var(--text-600);
    font-size: 0.9rem;
  }
</style>

