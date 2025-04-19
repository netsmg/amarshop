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





<style>
    /* Base Styles */
    :global(:root) {
            --primary: #6366f1;
            --accent: #f472b6;
            --background: #0f172a;
            --text-primary: #f8fafc;
            --glass-bg: rgba(255, 255, 255, 0.05);
            --glass-border: rgba(255, 255, 255, 0.1);
        }
    
  
   .quize-section{
        background: var(--background);
        color: var(--text-primary);
        line-height: 1.6;
}
    
    .quiz-card {
        min-width: 320px;
        background: var(--glass-bg);
        border-radius: 1.5rem;
        overflow: hidden;
        scroll-snap-align: start;
        transition: all 0.3s ease;
        border: 1px solid var(--glass-border);
        padding: 15px;
        margin: 1rem;
    }


  


@media (min-width: 640px) {
  .quize-card {
    margin: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .quize-card {
    margin: 2rem;
  }
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

<svelte:head>
    <title>Quizzes | Mcq Store</title>
    </svelte:head> 
<PageTitle pageTitle="Quizzes" />
<article class="quize-section">
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
</article>
                    
