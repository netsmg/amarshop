<script>
    import { fly, fade } from 'svelte/transition';
    import { revealAnimation } from '$lib/actions/animation';
    import { Book, Clock, AutoFlash } from '$lib/icons';

    const features = [
        { title: "Extensive Question Bank", description: "Access over 100,000+ practice questions across various subjects.", icon: Book },
        { title: "Smart Learning Analytics", description: "Track your progress with personalized insights and recommendations.", icon: Clock },
        { title: "Interactive Experience", description: "Engage with dynamic quizzes and real-time feedback.", icon: AutoFlash }
    ];

    const testimonials = [
        { quote: "Mcq Store transformed my study routine with its vast question bank!", name: "Sarah K.", role: "Student" },
        { quote: "The analytics helped me focus on my weak areas effectively.", name: "James L.", role: "Learner" },
        { quote: "An intuitive platform that makes learning fun and engaging.", name: "Emily R.", role: "Educator" }
    ];
</script>

<svelte:head>
    <title>Mcq Store | Your Learning Journey Starts Here</title>
    <meta name="description" content="Join Mcq Store to access thousands of practice questions and smart learning tools designed to empower your education." />
</svelte:head>

<section class="landing-section">
    <!-- Hero Section -->
    <div class="hero" in:fade={{ duration: 800 }} use:revealAnimation>
        <div class="hero-content">
            <h1 class="hero-title" in:fly={{ y: 20, duration: 600, delay: 200 }}>
                Empower Your Learning Journey
            </h1>
            <p class="hero-text" in:fly={{ y: 20, duration: 600, delay: 300 }}>
                Discover a world of knowledge with Mcq Store's extensive question bank and smart learning tools.
            </p>
            <div class="hero-cta" in:fly={{ y: 20, duration: 600, delay: 400 }}>
                <button class="cta-button primary">Get Started Now</button>
                <button class="cta-button secondary">Explore Features</button>
            </div>
        </div>
        <div class="hero-image" in:fly={{ x: 50, duration: 800, delay: 500 }}>
            <img src="/images/horo-illustration.png" alt="Learning Illustration" />
        </div>
    </div>

    <!-- Features Section -->
    <section class="features-section" in:fade={{ duration: 800, delay: 200 }}>
        <h2 class="section-title" use:revealAnimation={'top'}>Why Choose Mcq Store?</h2>
        <div class="features-grid">
            {#each features as feature, i}
                <div 
                    class="feature-card" 
                    transition:fly={{ y: 30, duration: 600, delay: i * 100 }} 
                    use:revealAnimation={'left'}
                >
                  <center>  <feature.icon class="feature-icon" /> </center>
                    <h3 class="feature-title">{feature.title}</h3>
                    <p class="feature-description">{feature.description}</p>
                </div>
            {/each}
        </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials-section" in:fade={{ duration: 800, delay: 200 }}>
        <h2 class="section-title" use:revealAnimation={'top'}>What Our Users Say</h2>
        <div class="testimonials-grid">
            {#each testimonials as testimonial, i}
                <div 
                    class="testimonial-card" 
                    transition:fly={{ y: 30, duration: 600, delay: i * 100 }} 
                    use:revealAnimation={'right'}
                >
                    <p class="testimonial-quote">"{testimonial.quote}"</p>
                    <div class="testimonial-author">
                        <span class="testimonial-name">{testimonial.name}</span>
                        <span class="testimonial-role">{testimonial.role}</span>
                    </div>
                </div>
            {/each}
        </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section" in:fade={{ duration: 800 }} use:revealAnimation>
        <h2 class="cta-title">Ready to Start Learning?</h2>
        <p class="cta-text">Join thousands of learners worldwide and take control of your education today.</p>
        <button class="cta-button primary">Sign Up Free</button>
    </section>

    
    
</section>

<style>
    :global(:root) {
        --primary: #6366f1;
        --accent: #f43f5e;
        --background: #f9fafb;
        --text-primary: #111827;
        --text-secondary: #6b7280;
        --card-bg: #ffffff;
        --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .landing-section {
        max-width: 1400px;
        margin: 0 auto;
        padding: 2rem 1rem;
        background: var(--background);
    }

    /* Hero Section */
    .hero {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 6rem 2rem;
        background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
        border-radius: 1.5rem;
        color: white;
        margin-bottom: 4rem;
        overflow: hidden;
    }

    .hero-content {
        max-width: 50%;
    }

    .hero-title {
        font-size: 3.5rem;
        font-weight: 800;
        line-height: 1.2;
        margin-bottom: 1.5rem;
    }

    .hero-text {
        font-size: 1.25rem;
        opacity: 0.9;
        margin-bottom: 2rem;
        line-height: 1.6;
    }

    .hero-cta {
        display: flex;
        gap: 1rem;
    }

    .cta-button {
        padding: 1rem 2rem;
        border-radius: 0.75rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        border: none;
    }

    .cta-button.primary {
        background: white;
        color: var(--primary);
    }

    .cta-button.secondary {
        background: transparent;
        border: 2px solid white;
        color: white;
    }

    .cta-button:hover {
        transform: translateY(-3px);
        box-shadow: var(--shadow);
    }

    .hero-image img {
        max-width: 500px;
        height: auto;
    }

    /* Features Section */
    .features-section {
        padding: 4rem 1rem;
        text-align: center;
    }

    .section-title {
        font-size: 2.5rem;
        color: var(--text-primary);
        margin-bottom: 3rem;
        font-weight: 700;
    }

    .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
    }

    .feature-card {
        background: var(--card-bg);
        border-radius: 1rem;
        padding: 2rem;
        box-shadow: var(--shadow);
        transition: transform 0.3s ease;
        text-align: center;
    }

    .feature-card:hover {
        transform: translateY(-5px);
    }

    .feature-icon {
        width: 3rem;
        height: 3rem;
        color: var(--primary);
        margin-bottom: 1.5rem;
    }

    .feature-title {
        font-size: 1.5rem;
        color: var(--text-primary);
        margin-bottom: 1rem;
    }

    .feature-description {
        color: var(--text-secondary);
        line-height: 1.6;
    }

    /* Testimonials Section */
    .testimonials-section {
        padding: 4rem 1rem;
        background: linear-gradient(180deg, #f3f4f6 0%, var(--background) 100%);
        border-radius: 1rem;
        text-align: center;
    }

    .testimonials-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
    }

    .testimonial-card {
        background: var(--card-bg);
        border-radius: 1rem;
        padding: 2rem;
        box-shadow: var(--shadow);
        text-align: center;
    }

    .testimonial-quote {
        font-size: 1.1rem;
        color: var(--text-primary);
        margin-bottom: 1.5rem;
        line-height: 1.6;
    }

    .testimonial-author {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    .testimonial-name {
        font-weight: 600;
        color: var(--text-primary);
    }

    .testimonial-role {
        color: var(--text-secondary);
        font-size: 0.9rem;
    }

    /* CTA Section */
    .cta-section {
        text-align: center;
        padding: 5rem 2rem;
        background: var(--primary);
        border-radius: 1rem;
        color: white;
        margin: 4rem 0;
    }

    .cta-title {
        font-size: 2.5rem;
        margin-bottom: 1.5rem;
    }

    .cta-text {
        font-size: 1.2rem;
        opacity: 0.9;
        margin-bottom: 2rem;
    }

    
    

    /* Responsive Design */
    @media (max-width: 1024px) {
        .hero {
            flex-direction: column;
            text-align: center;
        }

        .hero-content {
            max-width: 100%;
            margin-bottom: 2rem;
        }

        .hero-image img {
            max-width: 400px;
        }
    }

    @media (max-width: 768px) {
        .hero-title {
            font-size: 2.5rem;
        }

        .section-title {
            font-size: 2rem;
        }

        .hero-image img {
            max-width: 300px;
        }

        .footer-content {
            flex-direction: column;
            align-items: center;
            gap: 2rem;
        }
    }

    @media (max-width: 480px) {
        .hero {
            padding: 3rem 1rem;
        }

        .hero-title {
            font-size: 2rem;
        }

        .hero-text {
            font-size: 1rem;
        }

        .cta-button {
            padding: 0.75rem 1.5rem;
        }

        .features-grid, .testimonials-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
