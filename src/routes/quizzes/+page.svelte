<script>
    import PageTitle from '$lib/components/PageTitle.svelte';
    import { borderAnimation, decodeAnimation, revealAnimation } from '$lib/actions/animation';
    import { Book, AutoFlash, Clock, ArrowRight, Cross } from '$lib/icons';
    import { fly } from 'svelte/transition';

    
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



<svelte:head>
    <title>Quizzes | Mcq Store</title>
</svelte:head>

<PageTitle pageTitle="Quizzes" />

<article class="quiz-section">
    <div class="quiz-grid">
        {#each trendingQuizzes as quiz}
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
        {/each}
    </div>
</article>

<style>
    /* Updated Styles */
    .quiz-section {
        padding: 2rem 1rem;
        max-width: 1500px;
        margin: 0 auto;
    }

    .quiz-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        padding: 0 1rem;
    }

    .quiz-card {
        background: var(--glass-bg);
        border-radius: 1.5rem;
        border: 1px solid var(--glass-border);
        overflow: hidden;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        backdrop-filter: blur(12px);
    }

    .quiz-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }

    .quiz-thumbnail {
        height: 200px;
        background: linear-gradient(45deg, var(--primary), var(--accent));
        position: relative;
        padding: 1rem;
    }

    .quiz-category {
        background: rgba(0, 0, 0, 0.3);
        color: white;
        padding: 0.5rem 1.25rem;
        border-radius: 2rem;
        position: absolute;
        top: 1rem;
        right: 1rem;
        font-size: 0.85rem;
        font-weight: 500;
        backdrop-filter: blur(5px);
    }

    .quiz-content {
        padding: 1.5rem;
    }

    .quiz-title {
        font-size: 1.4rem;
        margin: 0 0 1rem;
        line-height: 1.3;
        min-height: 3.5rem;
    }

    .quiz-meta {
        display: flex;
        gap: 1rem;
        margin-bottom: 1.5rem;
    }

    .meta-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9rem;
        color: #94a3b8;
    }

    .meta-icon {
        width: 1.1rem;
        height: 1.1rem;
    }

    .quiz-stats {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 1rem;
        border-top: 1px solid var(--glass-border);
    }

    .stat-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9rem;
        color: #94a3b8;
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
        font-weight: 500;
    }

    .quiz-start:hover {
        background: #4f46e5;
        transform: translateX(3px);
    }

    .arrow-icon {
        transition: transform 0.3s ease;
    }

    .quiz-start:hover .arrow-icon {
        transform: translateX(2px);
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
            font-size: 1.3rem;
            min-height: auto;
        }

        .quiz-meta {
            flex-direction: column;
            gap: 0.75rem;
        }

        .quiz-start {
            width: 100%;
            justify-content: center;
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
            padding: 0.75rem;
        }
    }
</style>




    
