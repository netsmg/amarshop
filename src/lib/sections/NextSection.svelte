<script>
    import { borderAnimation, decodeAnimation, revealAnimation } from '$lib/actions/animation';
    import { Book, Clock, Search, AutoFlash, ArrowRight } from '$lib/icons';
    import { fade, fly } from 'svelte/transition';

    let testimonials = [
        {
            name: "Sarah Johnson",
            role: "Med Student",
            text: "Boosted my exam scores by 40%! The interactive quizzes are game-changers.",
            avatar: "/avatars/testimonial-01.jpg"
        },
        {
            name: "Mike Chen",
            role: "Developer",
            text: "Best way to keep skills sharp. Love the instant explanations!",
            avatar: "/avatars/testimonial-02.jpg"
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
            attempts: "1.2K"
        },
        {
            title: "Human Anatomy",
            category: "Biology",
            questions: 30,
            difficulty: "Intermediate",
            attempts: "890"
        },
        {
            title: "World Capitals",
            category: "Geography",
            questions: 50,
            difficulty: "Easy",
            attempts: "2.4K"
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
                    <div class="feature-card" in:fly={{ delay: i * 100 }}>
                        <feature.icon class="feature-icon" />
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
                    <div class="testimonial-card" transition:fly={{ y: 30 }}>
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
    /* Base Styles */
    :global(:root) {
            --primary: #6366f1;
            --secondary: #818cf8;
            --accent: #f472b6;
            --background: #0f172a;
            --text-primary: #f8fafc;
            --glass-bg: rgba(255, 255, 255, 0.05);
            --glass-border: rgba(255, 255, 255, 0.1);
        }
    
  .hero {
        background: var(--background);
        color: var(--text-primary);
        font-family: 'Inter', system-ui, sans-serif;
        line-height: 1.6;
    }

    .hero {
        padding: 6rem 1rem 10rem;
        background: linear-gradient(135deg, var(--background) 0%, #1e293b 100%);
        position: relative;
        overflow: hidden;
    }

    .hero-content {
        max-width: 1440px;
        margin: 0 auto;
        position: relative;
        z-index: 2;
    }

    /* Header Group */
    .header-group {
        max-width: 800px;
        margin: 0 auto 4rem;
        text-align: center;
    }

    .hero-title {
        font-size: 3.5rem;
        margin-bottom: 2rem;
        line-height: 1.1;
        letter-spacing: -0.03em;
    }

    .gradient-text {
        background: linear-gradient(45deg, var(--secondary), var(--accent));
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
    }

    
    /* Stats Grid */
    .stats-grid {
        display: flex;
        justify-content: center;
        gap: 4rem;
        margin-top: 3rem;
    }

    .stat-item {
        text-align: center;
    }

    .stat-number {
        font-size: 2.5rem;
        font-weight: 700;
        background: linear-gradient(var(--secondary), var(--primary));
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
    }

    .stat-label {
        color: #94a3b8;
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
    }

    /* Carousel Section */
    .carousel-section {
        margin: 6rem 0;
    }

    .carousel-container {
        display: grid;
        grid-auto-flow: column;
        gap: 2rem;
        overflow-x: auto;
        padding: 2rem 0;
        scroll-snap-type: x mandatory;
    }

    .quiz-card {
        min-width: 320px;
        background: var(--glass-bg);
        border-radius: 1.5rem;
        overflow: hidden;
        scroll-snap-align: start;
        transition: all 0.3s ease;
        border: 1px solid var(--glass-border);
    }

    .quiz-thumbnail {
        height: 180px;
        background: linear-gradient(45deg, var(--primary), var(--accent));
        position: relative;
        padding: 1rem;
    }

    .quiz-category {
        background: rgba(0, 0, 0, 0.3);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 2rem;
        position: absolute;
        top: 1rem;
        right: 1rem;
        font-size: 0.9rem;
    }

    .quiz-content {
        padding: 1.5rem;
    }

    .quiz-meta {
        display: flex;
        justify-content: space-between;
        color: #94a3b8;
        font-size: 0.9rem;
        margin: 1rem 0;
    }

    .quiz-stats {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 1.5rem;
    }

    /* Features Grid */
    .features-section {
        margin: 6rem 0;
    }

    .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 2rem;
        padding: 0 2rem;
    }

    .feature-card {
        background: var(--glass-bg);
        padding: 2.5rem;
        border-radius: 1.5rem;
        text-align: center;
        transition: all 0.3s ease;
        border: 1px solid var(--glass-border);
    }

    .feature-card:hover {
        background: rgba(255, 255, 255, 0.1);
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

    /* Testimonials */
    .testimonials-section {
        margin: 8rem 0 4rem;
    }

    .testimonials-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
    }

    .testimonial-card {
        background: var(--glass-bg);
        padding: 2rem;
        border-radius: 1.5rem;
        text-align: center;
        border: 1px solid var(--glass-border);
    }

    .user-avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        overflow: hidden;
        margin: -4rem auto 1.5rem;
        border: 3px solid var(--primary);
    }

    .user-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .testimonial-text {
        font-size: 1.1rem;
        margin-bottom: 1rem;
        min-height: 100px;
    }

    .user-info {
        border-top: 1px solid var(--glass-border);
        padding-top: 1rem;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .hero-title {
            font-size: 2.5rem;
        }

        .search-container {
            flex-direction: column;
            background: transparent;
            padding: 0;
            gap: 1rem;
        }

        .search-icon {
            margin-left: 0;
        }

        .search-button {
            width: 100%;
            border-radius: 1rem;
        }

        .stats-grid {
            gap: 2rem;
        }

        .stat-number {
            font-size: 2rem;
        }
    }

    @media (max-width: 480px) {
        .hero-title {
            font-size: 2rem;
        }

        .section-title {
            font-size: 1.8rem;
        }

        .features-grid,
        .testimonials-grid {
            grid-template-columns: 1fr;
        }
    }

    /* Utility Classes */
    .section-title {
        text-align: center;
        font-size: 2.5rem;
        margin-bottom: 3rem;
        position: relative;
    }

    .quiz-start {
        background: var(--primary);
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .quiz-start:hover {
        background: #4f46e5;
        transform: scale(1.05);
    }
</style>
