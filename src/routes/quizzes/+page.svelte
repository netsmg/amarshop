<script>
    import PageTitle from '$lib/components/PageTitle.svelte';
    import { borderAnimation, decodeAnimation, revealAnimation } from '$lib/actions/animation';
    import { Book, AutoFlash, Clock, ArrowRight, Cross } from '$lib/icons';
    import { fly } from 'svelte/transition';

    
    let trendingQuizzes = [ 
{
            title: "Basic chemestry",
            category: "Chemestry",
            questions: 25,
            difficulty: "Easy",
            attempts: "1.87K",
            link:"quizzes/basic-chemestry"
        },
        {
            title: "Newtonian Mechanics",
            category: "Physics",
            questions: 25,
            difficulty: "Easy",
            attempts: "1.9K",
            link:"quizzes/newtonian-mechanics"
        },
        {
            title: "JavaScript Mastery",
            category: "Programming",
            questions: 26,
            difficulty: "Advanced",
            attempts: "1.2K",
            link:"quizzes/javascript-master"
        },
        {
            title: "Human Anatomy",
            category: "Biology",
            questions: 25,
            difficulty: "Intermediate",
            attempts: "890",
            link:"quizzes/human-anatomy"
        },
        {
            title: "World Capitals",
            category: "Geography",
            questions: 25,
            difficulty: "Easy",
            attempts: "2.4K",
            link:"quizzes/world-capitals"
        }
    ];
</script>


<svelte:head>
    <title>Quizzes | Mcq Store</title>
</svelte:head>

<PageTitle pageTitle="Quizzes" />

<article class="quiz-section">
    <div class="quiz-grid">
        {#each trendingQuizzes as quiz}
<a href={quiz.link}>
            <div class="quiz-card" 
                 use:revealAnimation 
                 transition:fly={{ y: 20, duration: 300 }}>
                <div class="quiz-thumbnail">
                    <div class="quiz-category">{quiz.category}</div>
                </div>
                <div class="quiz-content">
                    <h3 class="quiz-title">{quiz.title}</h3>
                    <div class="quiz-meta">
                        <div class="meta-item">
                            <Book class="meta-icon" />
                            <span>{quiz.questions} Questions</span>
                        </div>
                        <div class="meta-item">
                            <AutoFlash class="meta-icon" />
                            <span>{quiz.difficulty}</span>
                        </div>
                    </div>
                    <div class="quiz-stats">
                        <div class="stat-item">
                            <Clock class="stat-icon" />
                            <span>{quiz.attempts} attempts</span>
                        </div>
                        <button class="quiz-start">
                            Start Now <ArrowRight class="arrow-icon" />
                        </button>
                    </div>
                </div>
            </div>
</a>
        {/each}
    </div>
</article>

<style>
    :global(:root) {
        --primary: #4f46e5;
        --accent: #ec4899;
        --background: #ffffff;
        --text-primary: #1e293b;
        --card-bg: #ffffff;
        --border-color: #e2e8f0;
    }

    .quiz-section {
        padding: 2rem 1rem;
        max-width: 1500px;
        margin: 0 auto;
        background: var(--background);
    }

    .quiz-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        padding: 0 1rem;
    }

    .quiz-card {
        background: var(--card-bg);
        border-radius: 1rem;
        border: 1px solid var(--border-color);
        overflow: hidden;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }

    .quiz-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    }

    .quiz-thumbnail {
        height: 180px;
        background: linear-gradient(45deg, var(--primary), var(--accent));
        position: relative;
        padding: 1rem;
    }

    .quiz-category {
        background: rgba(255, 255, 255, 0.9);
        color: var(--primary);
        padding: 0.5rem 1.25rem;
        border-radius: 2rem;
        position: absolute;
        top: 1rem;
        right: 1rem;
        font-size: 0.85rem;
        font-weight: 600;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    }

    .quiz-content {
        padding: 1.5rem;
    }

    .quiz-title {
        font-size: 1.3rem;
        margin: 0 0 1rem;
        color: var(--text-primary);
        line-height: 1.4;
    }

    .quiz-meta {
        display: flex;
        gap: 1rem;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
    }

    .meta-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9rem;
        color: #64748b;
        background: #f8fafc;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
    }

    .meta-icon {
        width: 1rem;
        height: 1rem;
        color: #94a3b8;
    }

    .quiz-stats {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 1rem;
        border-top: 1px solid var(--border-color);
    }

    .stat-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9rem;
        color: #64748b;
    }

    .quiz-start {
        background: var(--primary);
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 0.75rem;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        transition: all 0.3s ease;
        font-weight: 600;
    }

    .quiz-start:hover {
        background: #4338ca;
        transform: translateY(-1px);
        box-shadow: 0 3px 12px rgba(79, 70, 229, 0.2);
    }

    .arrow-icon {
        transition: transform 0.3s ease;
    }

    .quiz-start:hover .arrow-icon {
        transform: translateX(3px);
    }

    @media (max-width: 768px) {
        .quiz-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }

        .quiz-card {
            margin: 0;
        }

        .quiz-title {
            font-size: 1.2rem;
        }

        .meta-item {
            padding: 0.5rem 0.75rem;
        }
    }

    @media (max-width: 480px) {
        .quiz-section {
            padding: 1rem 0.5rem;
        }

        .quiz-content {
            padding: 1.25rem;
        }

        .quiz-start {
            padding: 0.75rem 1rem;
        }
    }
</style>
