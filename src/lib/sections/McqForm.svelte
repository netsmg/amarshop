<script>
    import { borderAnimation } from '$lib/actions/animation';
    import { Checkmark, Cross } from '$lib/icons';
    
    let selectedAnswers = Array(mcqs.length).fill(undefined);
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
    {
        question: "Which company developed the React library?",
        options: ["Google", "Facebook", "Microsoft", "Amazon"],
        correct: 1,
        explanation: "React was developed by Facebook in 2013."
    },
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Trainer Marking Language",
            "Hyper Text Marketing Language",
            "Hyper Text Markup Language",
            "Hyper Tool Multi Language"
        ],
        correct: 2,
        explanation: "HTML stands for Hyper Text Markup Language."
    }
    ];
    const handleSubmit = () => {
        submitted = true;
        score = mcqs.reduce((acc, question, idx) => 
            acc + (selectedAnswers[idx] === question.correct ? 1 : 0), 0);
    };

    const handleOptionSelect = (questionIndex, optionIndex) => {
        selectedAnswers[questionIndex] = optionIndex;
        selectedAnswers = selectedAnswers; // trigger update
    };
</script>

<section class="mcq-container">
    {#if !submitted}
        <div class="header">
            <h1>Tech Knowledge Quiz</h1>
            <div class="progress-indicator">
                Answered {selectedAnswers.filter(a => a !== undefined).length}/{mcqs.length}
            </div>
        </div>

        <div class="questions-grid">
            {#each mcqs as question, questionIndex (questionIndex)}
                <div class="question-card">
                    <div class="question-header">
                        <h3>Question {questionIndex + 1}</h3>
                        {#if selectedAnswers[questionIndex] !== undefined}
                            <span class="status-dot completed"></span>
                        {:else}
                            <span class="status-dot"></span>
                        {/if}
                    </div>
                    
                    <p class="question-text">{question.question}</p>
                    
                    <div class="options-grid">
                        {#each question.options as option, optionIndex (optionIndex)}
                            <label
                                class="option {selectedAnswers[questionIndex] === optionIndex ? 'selected' : ''}"
                                use:borderAnimation
                            >
                                <input
                                    type="radio"
                                    name="mcq-option-{questionIndex}"
                                    value={optionIndex}
                                    checked={selectedAnswers[questionIndex] === optionIndex}
                                    on:change={() => handleOptionSelect(questionIndex, optionIndex)}
                                />
                                <span class="option-content">
                                    <span class="option-letter">
                                        {String.fromCharCode(65 + optionIndex)}
                                    </span>
                                    <span class="option-text">{option}</span>
                                </span>
                            </label>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>

        <div class="footer-controls">
            <button
                class="submit-btn"
                on:click={handleSubmit}
                disabled={selectedAnswers.some(a => a === undefined)}
            >
                Submit Answers
            </button>
        </div>
    {:else}
    <div class="results">
            <div class="score-card">
                <div class="score-circle">
                    <svg viewBox="0 0 100 100">
                        <circle class="score-bg" cx="50" cy="50" r="45" />
                        <circle 
                            class="score-progress"
                            cx="50" 
                            cy="50" 
                            r="45"
                            stroke-dasharray={`${(score / mcqs.length) * 283} 283`}
                        />
                        <text x="50" y="55" class="score-text">
                            {score}/{mcqs.length}
                        </text>
                    </svg>
                </div>
                <h2>Quiz Completed!</h2>
            </div>
            <div class="results-breakdown">
                {#each mcqs as question, index}
                    <div class="result-item {selectedAnswers[index] === question.correct ? 'correct' : 'incorrect'}">
                        <div class="result-status">
                            {#if selectedAnswers[index] === question.correct}
                                <Checkmark class="icon-check" />
                            {:else}
                                <Cross class="icon-cross" />
                            {/if}
                        </div>
                        <div class="result-content">
                            <h3>Q{index + 1}: {question.question}</h3>
                            <p class="correct-answer">Correct: {question.options[question.correct]}</p>
                            {#if selectedAnswers[index] !== question.correct}
                                <p class="user-answer">Your answer: {question.options[selectedAnswers[index]]}</p>
                            {/if}
                            <p class="explanation">{question.explanation}</p>
                        </div>
                    </div>
                {/each}
            </div>

            <button class="btn retry-btn" on:click={() => {
                currentQuestion = 0;
                selectedAnswers = [];
                submitted = false;
                score = 0;
            }}>
                Try Again
            </button>
        </div>
    {/if}
        <!-- Results section remains similar with updated styling -->
</section>

<style>
    :global(body) {
        background: var(--background-100);
    }

    .mcq-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
    }

    .header {
        text-align: center;
        margin-bottom: 3rem;
    }

    h1 {
        font-size: 2.5rem;
        color: var(--text-100);
        margin-bottom: 1rem;
    }

    .progress-indicator {
        font-size: 1.1rem;
        color: var(--text-300);
        padding: 0.5rem 1rem;
        background: var(--background-200);
        border-radius: 2rem;
        display: inline-block;
    }

    .questions-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 2rem;
        margin-bottom: 3rem;
    }

    .question-card {
        background: var(--background-200);
        padding: 1.5rem;
        border-radius: 12px;
        box-shadow: var(--shadow-md);
        transition: transform 0.2s ease;
    }

    .question-card:hover {
        transform: translateY(-2px);
    }

    .question-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }

    .question-header h3 {
        font-size: 1.1rem;
        color: var(--text-200);
    }

    .status-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: var(--background-300);
    }

    .status-dot.completed {
        background: var(--primary-500);
        box-shadow: 0 0 8px rgba(var(--primary-500-rgb), 0.3);
    }

    .question-text {
        font-size: 1.2rem;
        color: var(--text-100);
        margin-bottom: 1.5rem;
        line-height: 1.4;
    }

    .options-grid {
        display: grid;
        gap: 0.75rem;
    }

    .option {
        display: block;
        padding: 1rem;
        border-radius: 8px;
        background: var(--background-300);
        cursor: pointer;
        transition: all 0.2s ease;
        border: 2px solid transparent;
    }

    .option:hover {
        background: var(--background-350);
    }

    .option.selected {
        border-color: var(--primary-500);
        background: var(--primary-100);
    }

    .option input {
        opacity: 0;
        position: absolute;
    }

    .option-content {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .option-letter {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: var(--background-400);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        color: var(--text-300);
    }

    .option.selected .option-letter {
        background: var(--primary-500);
        color: white;
    }

    .footer-controls {
        text-align: center;
        margin-top: 3rem;
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

    
    .progress-bar {
        height: 8px;
        background: var(--background-300);
        border-radius: 4px;
        margin-bottom: var(--space-l);
        overflow: hidden;
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
   .score-card {
        text-align: center;
        margin-bottom: var(--space-xl);
    }

    .score-circle {
        width: 150px;
        height: 150px;
        margin: 0 auto var(--space-m);
        position: relative;
    }

    .score-circle svg {
        width: 100%;
        height: 100%;
    }

    .score-bg {
        fill: none;
        stroke: var(--background-300);
        stroke-width: 8;
    }

    .score-progress {
        fill: none;
        stroke: var(--primary-500);
        stroke-width: 8;
        stroke-linecap: round;
        transform: rotate(-90deg);
        transform-origin: center;
        transition: stroke-dasharray 0.8s ease;
    }
   .score-text {
        font-size: 24px;
        font-weight: bold;
        dominant-baseline: middle;
        text-anchor: middle;
        fill: var(--text-100);
    }

    .result-item {
        display: flex;
        gap: var(--space-m);
        padding: var(--space-m);
        margin-bottom: var(--space-m);
        border-radius: 8px;
        background: var(--background-200);
    }

    .result-item.correct {
        border-left: 4px solid var(--success-500);
    }

    .result-item.incorrect {
        border-left: 4px solid var(--error-500);
    }

    .result-status {
        flex-shrink: 0;
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    }


    .submit-btn {
        background: var(--primary-500);
        color: white;
        padding: 1rem 3rem;
        border-radius: 2rem;
        font-size: 1.1rem;
        transition: all 0.2s ease;
        border: none;
        cursor: pointer;
    }

    .submit-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 15px rgba(var(--primary-500-rgb), 0.3);
    }

    .submit-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
    }

    /* Updated results styling */
    .results {
        background: var(--background-200);
        padding: 2rem;
        border-radius: 12px;
    }

    .score-card {
        text-align: center;
        margin-bottom: 3rem;
    }

    .score-circle {
        width: 200px;
        height: 200px;
        margin: 0 auto 2rem;
    }

    /* ... rest of results styling remains similar ... */

    @media (max-width: 768px) {
        .questions-grid {
            grid-template-columns: 1fr;
        }
        
        .question-card {
            padding: 1rem;
        }
    }
</style>
