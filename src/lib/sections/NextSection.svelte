<script>
    import { borderAnimation, decodeAnimation, revealAnimation } from '$lib/actions/animation';
    import { Book, Clock, Search, AutoFlash, ArrowRight } from '$lib/icons';
    import { fade, fly, slide } from 'svelte/transition';

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
        <!-- Modern Stats Grid -->
        <div class="stats-grid" use:revealAnimation>
            {#each [
                { value: '500K+', label: 'Daily Challenges', color: 'bg-accent' },
                { value: '98%', label: 'Success Rate', color: 'bg-secondary' },
                { value: '50+', label: 'Categories', color: 'bg-primary' }
            ] as stat}
                <div class="stat-card" transition:slide|local>
                    <div class="stat-highlight {stat.color}" />
                    <div class="stat-content">
                        <span class="stat-value">{stat.value}</span>
                        <span class="stat-label">{stat.label}</span>
                    </div>
                </div>
            {/each}
        </div>

        <!-- Modern Carousel -->
        <div class="carousel-section">
            <h2 class="gradient-heading">Trending Now</h2>
            <div class="horizontal-scroll">
                {#each trendingQuizzes as quiz}
                    <a href={quiz.link} class="quiz-card-wrapper">
                        <article class="quiz-card" use:borderAnimation>
                            <div class="quiz-gradient" />
                            <div class="quiz-content">
                                <header>
                                    <span class="quiz-category">{quiz.category}</span>
                                    <h3>{quiz.title}</h3>
                                </header>
                                <div class="quiz-meta">
                                    <div class="meta-item">
                                        <Book aria-hidden="true" />
                                        <span>{quiz.questions} Questions</span>
                                    </div>
                                    <div class="meta-item">
                                        <AutoFlash aria-hidden="true" />
                                        <span>{quiz.difficulty}</span>
                                    </div>
                                </div>
                                <button class="hover-slide">
                                    Start Quiz
                                    <ArrowRight class="arrow-hover" />
                                </button>
                            </div>
                        </article>
                    </a>
                {/each}
            </div>
        </div>

        <!-- Modern Features Grid -->
        <div class="features-section">
            <h2 class="gradient-heading">Why Choose Us</h2>
            <div class="features-grid">
                {#each features as feature}
                    <div class="feature-card" in:fly={{ y: 20 }}>
                        <div class="feature-icon-wrapper">
                            <feature.icon aria-hidden="true" />
                        </div>
                        <h3>{feature.title}</h3>
                        <p>{feature.text}</p>
                        <div class="feature-hover" />
                    </div>
                {/each}
            </div>
        </div>

        <!-- Modern Testimonials -->
        <div class="testimonials-section">
            <h2 class="gradient-heading">Success Stories</h2>
            <div class="testimonials-grid">
                {#each testimonials as t}
                    <figure class="testimonial-card" use:revealAnimation>
                        <div class="avatar-container">
                            <img src={t.avatar} alt={t.name} class="avatar-image" />
                            <div class="avatar-border" />
                        </div>
                        <blockquote class="testimonial-quote">
                            "{t.text}"
                        </blockquote>
                        <figcaption class="testimonial-author">
                            <strong>{t.name}</strong>
                            <span>{t.role}</span>
                        </figcaption>
                    </figure>
                {/each}
            </div>
        </div>
    </div>
</style>

<style lang="postcss">
    /* Modern Design System */
    :global(:root) {
        --primary: 99 102 241;
        --secondary: 129 140 248;
        --accent: 244 114 182;
        --background: 15 23 42;
        --glass-bg: rgba(255, 255, 255, 0.05);
        --glass-border: rgba(255, 255, 255, 0.1);
        --gradient: linear-gradient(
            145deg,
            rgb(var(--primary)) 0%,
            rgb(var(--accent)) 100%
        );
    }

    .hero {
        @apply relative overflow-hidden py-20;
        background: radial-gradient(ellipse at 75% 30%, rgba(var(--primary), 0.15) 0%, transparent 60%);
    }

    /* Modern Stats Grid */
    .stats-grid {
        @apply grid gap-6 mb-20 md:grid-cols-3 max-w-6xl mx-auto;
        perspective: 1000px;
    }

    .stat-card {
        @apply relative p-6 rounded-2xl overflow-hidden backdrop-blur-lg;
        background: rgba(var(--primary)/0.1);
        border: 1px solid rgba(var(--primary)/0.2);
        transform-style: preserve-3d;
    }

    .stat-highlight {
        @apply absolute inset-0 opacity-20 transition-opacity;
    }

    /* Modern Carousel */
    .horizontal-scroll {
        @apply flex gap-6 pb-8 overflow-x-auto snap-x snap-mandatory;
        scrollbar-width: none;
        &::-webkit-scrollbar { @apply hidden }
    }

    .quiz-card-wrapper {
        @apply snap-center flex-shrink-0 w-[85vw] sm:w-96;
    }

    .quiz-card {
        @apply relative h-96 rounded-2xl overflow-hidden p-6;
        background: rgba(var(--primary)/0.05);
        border: 1px solid rgba(var(--primary)/0.1);
    }

    .quiz-gradient {
        @apply absolute inset-0 opacity-0 transition-opacity;
        background: var(--gradient);
    }

    /* Hover Effects */
    .quiz-card:hover {
        .quiz-gradient { @apply opacity-10 }
        .arrow-hover { @apply translate-x-1 }
    }

    /* Modern Features */
    .features-grid {
        @apply grid gap-6 md:grid-cols-3 lg:grid-cols-5 max-w-6xl mx-auto;
    }

    .feature-card {
        @apply relative p-8 rounded-2xl transition-all;
        background: rgba(var(--primary)/0.05);
        border: 1px solid rgba(var(--primary)/0.1);
        &:hover { @apply -translate-y-2 }
    }

    .feature-icon-wrapper {
        @apply mb-4 p-4 rounded-2xl inline-flex;
        background: rgba(var(--accent)/0.1);
        svg { @apply w-8 h-8 }
    }

    /* Modern Testimonials */
    .testimonials-grid {
        @apply grid gap-6 md:grid-cols-3 max-w-6xl mx-auto;
    }

    .testimonial-card {
        @apply relative p-8 rounded-2xl;
        background: rgba(var(--primary)/0.05);
        border: 1px solid rgba(var(--primary)/0.1);
    }

    .avatar-container {
        @apply w-20 h-20 mx-auto -mt-12 mb-4 relative;
    }

    .avatar-border {
        @apply absolute inset-0 rounded-full border-2;
        border-color: rgba(var(--accent)/0.4);
    }

    /* Gradient Text */
    .gradient-heading {
        @apply text-4xl font-bold text-center mb-12 bg-clip-text;
        background-image: var(--gradient);
        -webkit-text-fill-color: transparent;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .stats-grid { @apply grid-cols-1 }
        .features-grid { @apply grid-cols-2 }
        .gradient-heading { @apply text-3xl }
    }
</style>
