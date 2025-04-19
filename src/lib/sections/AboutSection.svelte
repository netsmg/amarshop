<script>
    import PageTitle from '$lib/components/PageTitle.svelte';
    import { revealAnimation } from '$lib/actions/animation';
    import { Book, Clock, AutoFlash } from '$lib/icons';
    import { fly } from 'svelte/transition';

    const team = [
        { name: "Muhammad Al-amin", role: "Founder & CEO", bio: "Education technology expert with 10+ years experience", photo: "/images/about-1.png" },
        { name: "Jane Smith", role: "Content Director", bio: "Curriculum development specialist", photo: "/images/about-1.png" },
        { name: "Mike Johnson", role: "Tech Lead", bio: "Full-stack developer & learning platform architect", photo: "/images/about-1.png" }
    ];

    const stats = [
      { value: "50K+", label: "Active Users", icon: Book },
        { value: "100K+", label: "Questions Available", icon: Clock },
      { value: "95%", label: "Satisfaction Rate", icon: AutoFlash }
    ];
</script>

<svelte:head>
    <title>About Us | Mcq Store</title>
</svelte:head>

<PageTitle pageTitle="About" />

<section class="about-section">
    <!-- Hero Section -->
    <div class="hero" use:revealAnimation>
        <div class="hero-content">
            <h1 class="hero-title">Democratizing Quality Education</h1>
            <p class="hero-text">
                We believe in making high-quality learning resources accessible to everyone, 
                everywhere. Our platform combines cutting-edge technology with pedagogical 
                expertise to create effective learning experiences.
            </p>
        </div>
    </div>

    <!-- Stats Grid -->
    <div class="stats-grid">
        {#each stats as item, i}
            <div class="stat-card" transition:fly={{ y: 20, delay: i * 100 }} use:revealAnimation={'left'}>
               <center> <item.icon class="stat-icon" /> </center>
                <div class="stat-value">{item.value}</div>
                <div class="stat-label">{item.label}</div>
            </div>
        {/each}
    </div>

    <!-- Mission Section -->
    <section class="mission-section">
        <div class="mission-content" use:revealAnimation={'right'}>
           <center> <Book class="section-icon" /> </center>
            <h2 class="section-title">Our Core Mission</h2>
            <p class="section-text">
                To empower learners worldwide through accessible, engaging, and 
                scientifically-backed educational resources. We're committed to breaking 
                down barriers in education through technology.
            </p>
        </div>
    </section>

    <!-- Team Section -->
    <section class="team-section">
        <h2 class="section-title">Meet Our Team</h2>
        <div class="team-grid">
            {#each team as member, i}
                <div class="team-card" transition:fly={{ y: 20, delay: i * 100 }} use:revealAnimation={'top'}>
                    <img src={member.photo} alt={member.name} class="team-photo" />
                    <h3 class="team-name">{member.name}</h3>
                    <div class="team-role">{member.role}</div>
                    <p class="team-bio">{member.bio}</p>
                </div>
            {/each}
        </div>
    </section>

    <!-- CTA Section -->
    <div class="cta-section" use:revealAnimation>
        <center><Book class="cta-icon" /></center>
        <h2 class="cta-title">Join Our Learning Community</h2>
        <p class="cta-text">Start your learning journey today with access to thousands of resources</p>
        <button class="cta-button">
            Get Started
        </button>
    </div>
</section>

<style>
    /* Consistent with previous variables */
    :global(:root) {
        --primary: #4f46e5;
        --accent: #ec4899;
        --background: #ffffff;
        --text-primary: #1e293b;
        --border-color: #e2e8f0;
    }

    .about-section {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem 1rem;
    }

    .hero {
        text-align: center;
        padding: 4rem 1rem;
        background: linear-gradient(45deg, var(--primary), var(--accent));
        border-radius: 1rem;
        color: white;
        margin-bottom: 3rem;
    }

    .hero-title {
        font-size: 2.5rem;
        margin-bottom: 1.5rem;
        line-height: 1.2;
    }

    .hero-text {
        font-size: 1.1rem;
        max-width: 800px;
        margin: 0 auto;
        opacity: 0.9;
    }

    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        margin: 3rem 0;
    }

    .stat-card {
        background: var(--background);
        border: 1px solid var(--border-color);
        border-radius: 1rem;
        padding: 2rem;
        text-align: center;
        transition: transform 0.3s ease;
    }

    .stat-card:hover {
        transform: translateY(-5px);
    }

    .stat-icon {
        width: 2.5rem;
        height: 2.5rem;
        margin: 0 auto 1rem;
        color: var(--primary);
    }

    .stat-value {
        font-size: 2rem;
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: 0.5rem;
    }

    .stat-label {
        color: #64748b;
        font-size: 0.95rem;
    }

    .mission-section {
        padding: 4rem 1rem;
        background: #f8fafc;
        border-radius: 1rem;
        margin: 3rem 0;
        text-align: center;
    }

    .section-icon {
        width: 3rem;
        height: 3rem;
        color: var(--primary);
        margin-bottom: 1.5rem;
    }

    .section-title {
        font-size: 2rem;
        color: var(--text-primary);
        margin-bottom: 1.5rem;
    }

    .section-text {
        color: #64748b;
        max-width: 800px;
        margin: 0 auto;
        line-height: 1.7;
    }

    .team-section {
        margin: 4rem 0;
    }

    .team-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
    }

    .team-card {
        background: var(--background);
        border: 1px solid var(--border-color);
        border-radius: 1rem;
        padding: 2rem;
        text-align: center;
    }

    .team-photo {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        object-fit: cover;
        margin: 0 auto 1.5rem;
        border: 3px solid var(--primary);
    }

    .team-name {
        font-size: 1.25rem;
        color: var(--text-primary);
        margin-bottom: 0.5rem;
    }

    .team-role {
        color: var(--primary);
        font-weight: 500;
        margin-bottom: 1rem;
    }

    .team-bio {
        color: #64748b;
        font-size: 0.95rem;
    }

    .cta-section {
        text-align: center;
        padding: 4rem 1rem;
        background: var(--primary);
        border-radius: 1rem;
        color: white;
        margin-top: 3rem;
    }

    .cta-icon {
        width: 3rem;
        height: 3rem;
        margin: 0 auto 1.5rem;
    }

    .cta-title {
        font-size: 2rem;
        margin-bottom: 1rem;
    }

    .cta-text {
        opacity: 0.9;
        margin-bottom: 2rem;
    }

    .cta-button {
        background: white;
        color: var(--primary);
        padding: 1rem 2rem;
        border-radius: 0.75rem;
        font-weight: 600;
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .cta-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 768px) {
        .hero-title {
            font-size: 2rem;
        }

        .section-title {
            font-size: 1.75rem;
        }

        .team-grid {
            grid-template-columns: 1fr;
        }
    }

    @media (max-width: 480px) {
        .hero {
            padding: 2rem 1rem;
        }

        .hero-title {
            font-size: 1.75rem;
        }

        .cta-section {
            padding: 2rem 1rem;
        }

        .cta-title {
            font-size: 1.5rem;
        }
    }
</style>
