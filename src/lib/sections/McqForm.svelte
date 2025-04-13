<script>
    import { borderAnimation } from '$lib/actions/animation';
    import { ArrowLeft, ArrowRight } from '$lib/icons';
    
    let currentQuestion = 0;
    let selectedAnswer = null;
    let score = 0;
    let submitted = false;

    const mcqs = [
        {
            question: "What is the capital of France?",
            options: ["London", "Berlin", "Paris", "Madrid"],
            correct: 2,
            explanation: "Paris is the capital and most populous city of France."
        },
        {
            question: "Which language runs in a web browser?",
            options: ["Java", "C", "Python", "JavaScript"],
            correct: 3,
            explanation: "JavaScript is the programming language of the Web."
        },
        // Add more questions here
    ];

    const handleNext = () => {
        if (currentQuestion < mcqs.length - 1) {
            currentQuestion++;
            selectedAnswer = null;
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            currentQuestion--;
            selectedAnswer = null;
        }
    };

    const submitQuiz = () => {
        submitted = true;
        score = mcqs.reduce((acc, question, idx) => 
            acc + (selectedAnswers[idx] === question.correct ? 1 : 0), 0);
    };
</script>

<section class="mcq-container">
    {#if !submitted}
        <div class="progress">
            Question {currentQuestion + 1} of {mcqs.length}
        </div>

        <div class="question-card">
            <h2>{mcqs[currentQuestion].question}</h2>
            
            <div class="options-container">
                {#each mcqs[currentQuestion].options as option, index (index)}
                    <label 
                        class="option {selectedAnswer === index ? 'selected' : ''}"
                        use:borderAnimation
                    >
                        <input 
                            type="radio" 
                            name="mcq-option" 
                            value={index} 
                            bind:group={selectedAnswer}
                        />
                        <span class="option-text">{option}</span>
                    </label>
                {/each}
            </div>

            <div class="navigation-controls">
                <button
                    class="btn {currentQuestion === 0 ? 'disabled' : ''}"
                    on:click={handlePrevious}
                    disabled={currentQuestion === 0}
                >
                    <ArrowLeft />
                    Previous
                </button>

                {#if currentQuestion === mcqs.length - 1}
                    <button class="btn submit-btn" on:click={submitQuiz}>
                        Submit
                    </button>
                {:else}
                    <button 
                        class="btn {!selectedAnswer ? 'disabled' : ''}"
                        on:click={handleNext}
                        disabled={!selectedAnswer}
                    >
                        Next
                        <ArrowRight />
                    </button>
                {/if}
            </div>
        </div>
    {:else}
        <div class="results">
            <h2>Your Score: {score}/{mcqs.length}</h2>
            
            {#each mcqs as question, index}
                <div class="result-item">
                    <h3>Q{index + 1}: {question.question}</h3>
                    <p class="correct-answer">Correct answer: {question.options[question.correct]}</p>
                    {#if selectedAnswers[index] !== question.correct}
                        <p class="user-answer">Your answer: {question.options[selectedAnswers[index]]}</p>
                    {/if}
                    <p class="explanation">{question.explanation}</p>
                </div>
            {/each}

            <button class="btn retry-btn" on:click={() => location.reload()}>
                Try Again
            </button>
        </div>
    {/if}
</section>

<style>
    .mcq-container {
        max-width: 800px;
        margin: 0 auto;
        padding: var(--space-l);
    }

    .progress {
        text-align: right;
        color: var(--primary-500);
        margin-bottom: var(--space-s);
    }

    .question-card {
        background: var(--background-100);
        padding: var(--space-l);
        border-radius: 8px;
        box-shadow: var(--shadow-md);
    }

    .options-container {
        display: grid;
        gap: var(--space-s);
        margin: var(--space-m) 0;
    }

    .option {
        display: flex;
        align-items: center;
        padding: var(--space-s);
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s ease;
        border: 2px solid var(--background-300);
    }

    .option:hover {
        background: var(--background-200);
        transform: translateY(-2px);
    }

    .option.selected {
        border-color: var(--primary-500);
        background: var(--primary-100);
    }

    .option input {
        margin-right: var(--space-s);
    }

    .navigation-controls {
        display: flex;
        justify-content: space-between;
        margin-top: var(--space-l);
    }

    .results {
        background: var(--background-100);
        padding: var(--space-l);
        border-radius: 8px;
    }

    .result-item {
        margin: var(--space-l) 0;
        padding: var(--space-s);
        border-left: 4px solid var(--primary-500);
    }

    .correct-answer {
        color: var(--success-500);
        font-weight: bold;
    }

    .user-answer {
        color: var(--error-500);
    }

    .explanation {
        color: var(--text-300);
        font-size: var(--step--1);
    }

    .disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .submit-btn {
        background: var(--success-500);
    }

    .retry-btn {
        background: var(--primary-500);
        margin-top: var(--space-l);
    }
</style>
