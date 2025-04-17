<script>
    import { borderAnimation, decodeAnimation, revealAnimation } from '$lib/actions/animation';
    import { Book, Clock, Search, AutoFlash } from '$lib/icons';
    import { fade, fly } from 'svelte/transition';
</script>

<section class="hero">
    <div class="hero-content">
        <!-- Main Header -->
        <div class="header-group" in:fly={{ y: 50, duration: 500 }}>
            <h1 class="hero-title" use:borderAnimation>
                <span class="gradient-text">Elevate Your Learning</span> with Smart Quizzes
            </h1>
            
            <div class="search-container" use:revealAnimation>
                <Search class="search-icon" />
                <input type="text" placeholder="Explore 1000+ quizzes across 50+ subjects..." class="search-input">
                <button class="search-button">Go</button>
            </div>

            <div class="stats-grid">
                <div class="stat-item">
                    <span class="stat-number">250K+</span>
                    <span class="stat-label">Active Learners</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">10K+</span>
                    <span class="stat-label">Daily Quizzes</span>
                </div>
            </div>
        </div>

        <!-- Trending Quizzes Carousel -->
        <div class="carousel-section" in:fade>
            <h2 class="section-title">Trending Now</h2>
            <div class="carousel-container">
                {#each [1,2,3] as item}
                    <div class="quiz-card" use:hover3D transition:fly={{ y: 20 }}>
                        <div class="quiz-thumbnail"></div>
                        <h3>Modern JavaScript Basics</h3>
                        <div class="quiz-meta">
                            <span>🔥 1.2k attempts</span>
                            <span>⭐ 4.8</span>
                        </div>
                    </div>
                {/each}
            </div>
        </div>

        <!-- Features Grid -->
        <div class="features-section">
            <h2 class="section-title">Why Choose QuizMaster?</h2>
            <div class="features-grid">
                {#each [
                    { icon: Book, title: 'Comprehensive Library', text: 'Updated daily with new questions' },
                    { icon: AutoFlash, title: 'AI-Powered Analysis', text: 'Detailed performance insights' },
                    { icon: Clock, title: 'Time Challenges', text: 'Beat the clock mode' },
                    { icon: Clock, title: 'Community Ranks', text: 'Compete globally' },
                    { icon: Book, title: 'Progress Tracking', text: 'Visualize your growth' }
                ] as feature, i}
                    <div class="feature-card" in:fly={{ delay: i * 100 }}>
                        <feature.icon class="feature-icon" />
                        <h3>{feature.title}</h3>
                        <p>{feature.text}</p>
                    </div>
                {/each}
            </div>
        </div>

        <!-- Testimonials Section -->
        <div class="testimonials-section">
            <h2 class="section-title">What Learners Say</h2>
            <div class="testimonials-grid">
                {#each [1,2,3] as item}
                    <div class="testimonial-card" transition:fly={{ y: 30 }}>
                        <div class="user-avatar"></div>
                        <p>"Improved my exam scores dramatically!"</p>
                        <div class="user-info">
                            <strong>Sarah Johnson</strong>
                            <span>Computer Science Student</span>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</section>

<style>
    :global(body) {
        --primary: #4f46e5;
        --secondary: #818cf8;
        --accent: #f472b6;
        --background: #0f172a;
        --text-primary: #f8fafc;
    }

    .hero {
        padding: 6rem 1rem 8rem;
        position: relative;
        overflow: hidden;
    }

    .hero-content {
        max-width: 1440px;
        margin: 0 auto;
        position: relative;
        z-index: 2;
    }

    .header-group {
        max-width: 800px;
        margin: 0 auto 4rem;
        text-align: center;
    }

    .hero-title {
        font-size: 3.5rem;
        margin-bottom: 2rem;
        line-height: 1.1;
    }

    .gradient-text {
        background: linear-gradient(45deg, var(--secondary), var(--accent));
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
    }

    .search-container {
        max-width: 700px;
        margin: 3rem auto;
        display: flex;
        gap: 1rem;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(12px);
        border-radius: 2rem;
        padding: 0.5rem;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .search-input {
        flex: 1;
        background: transparent;
        border: none;
        padding: 1.5rem;
        color: var(--text-primary);
        font-size: 1.1rem;
    }

    .search-button {
        background: var(--primary);
        color: white;
        border: none;
        padding: 1rem 2.5rem;
        border-radius: 1.5rem;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.2s ease;
    }

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

    .section-title {
        text-align: center;
        font-size: 2.5rem;
        margin-bottom: 3rem;
        position: relative;
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
        min-width: 300px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 1.5rem;
        padding: 1.5rem;
        scroll-snap-align: start;
        transition: all 0.3s ease;
    }

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
        background: rgba(255, 255, 255, 0.05);
        padding: 2.5rem;
        border-radius: 1.5rem;
        text-align: center;
        transition: all 0.3s ease;
    }

    .feature-card:hover {
        background: rgba(255, 255, 255, 0.1);
        transform: translateY(-5px);
    }

    .feature-icon {
        width: 60px;
        height: 60px;
        margin: 0 auto 1.5rem;
        color: var(--secondary);
    }

    .testimonials-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
    }

    .testimonial-card {
        background: rgba(255, 255, 255, 0.05);
        padding: 2rem;
        border-radius: 1.5rem;
        text-align: center;
    }

    @media (max-width: 768px) {
        .hero-title {
            font-size: 2.5rem;
        }

        .search-container {
            flex-direction: column;
            background: transparent;
            padding: 0;
        }

        .search-button {
            width: 100%;
        }
    }
</style>
