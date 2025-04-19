<script>
    import { borderAnimation } from '$lib/actions/animation';
    import { ArrowLeft, ArrowRight, Checkmark, Cross } from '$lib/icons';
    
    let currentSet = 0;
    const QUESTIONS_PER_PAGE = 10;
    let selectedAnswers = [];
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
        },
        {
            question: "Which of the following is a NoSQL database?",
            options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"],
            correct: 2,
            explanation: "MongoDB is a popular NoSQL database."
        },
        {
            question: "Which HTTP method is used to update a resource?",
            options: ["GET", "POST", "PUT", "DELETE"],
            correct: 2,
            explanation: "PUT is used to update an existing resource."
        },
        {
            question: "What is the default port for HTTP?",
            options: ["21", "80", "443", "3306"],
            correct: 1,
            explanation: "Port 80 is the default for HTTP."
        },
        {
            question: "Which of the following is a JavaScript framework?",
            options: ["Django", "Laravel", "Vue.js", "Flask"],
            correct: 2,
            explanation: "Vue.js is a progressive JavaScript framework."
        },
        {
            question: "What does CSS stand for?",
            options: [
                "Cascading Style Sheets",
                "Creative Style System",
                "Computer Style Syntax",
                "Colorful Style Sheets"
            ],
            correct: 0,
            explanation: "CSS stands for Cascading Style Sheets."
        },
        {
            question: "What does API stand for?",
            options: [
                "Application Programming Interface",
                "Advanced Programming Integration",
                "Application Processing Interface",
                "Applied Program Internet"
            ],
            correct: 0,
            explanation: "API stands for Application Programming Interface."
        }
    ];

    const handleNext = () => {
        if ((currentSet + 1) * QUESTIONS_PER_PAGE < mcqs.length) {
            currentSet++;
        }
    };

    const handlePrevious = () => {
        if (currentSet > 0) {
            currentSet--;
        }
    };

    const handleSubmit = () => {
        submitted = true;
        score = mcqs.reduce((acc, question, idx) =>
            acc + (selectedAnswers[idx] === question.correct ? 1 : 0), 0);
    };

    const handleOptionSelect = (questionIndex, optionIndex) => {
        selectedAnswers[questionIndex] = optionIndex;
    };

    // Display current 10 questions
    $: visibleQuestions = mcqs.slice(
        currentSet * QUESTIONS_PER_PAGE,
        (currentSet + 1) * QUESTIONS_PER_PAGE
    );
</script>



<section class="mcq-container">
    {#if !submitted}
        <div class="progress-bar">
            <div 
                class="progress-fill" 
                style={`width: ${(currentSet + 1) / Math.ceil(mcqs.length / QUESTIONS_PER_PAGE) * 100}%`}
            ></div>
        </div>

        {#each visibleQuestions as question, i}
            <div class="question-card">
                <h2>Q{currentSet * QUESTIONS_PER_PAGE + i + 1}: {question.question}</h2>
                
                <div class="options-container">
                    {#each question.options as option, optionIndex}
                        <label
                            class="option {selectedAnswers[currentSet * QUESTIONS_PER_PAGE + i] === optionIndex ? 'selected' : ''}"
                            use:borderAnimation
                        >
                            <input
                                type="radio"
                                name={`mcq-option-${currentSet * QUESTIONS_PER_PAGE + i}`}
                                value={optionIndex}
                                checked={selectedAnswers[currentSet * QUESTIONS_PER_PAGE + i] === optionIndex}
                                on:change={() => handleOptionSelect(currentSet * QUESTIONS_PER_PAGE + i, optionIndex)}
                            />
                            <span class="option-text">{option}</span>
                        </label>
                    {/each}
                </div>
            </div>
        {/each}

        <div class="navigation-controls">
            <button
                class="btn {currentSet === 0 ? 'disabled' : ''}"
                on:click={handlePrevious}
                disabled={currentSet === 0}
            >
                <ArrowLeft />
                <span class="btn-text">Previous</span>
            </button>

            <div class="progress-text">
                Page {currentSet + 1} of {Math.ceil(mcqs.length / QUESTIONS_PER_PAGE)}
            </div>

            {#if (currentSet + 1) * QUESTIONS_PER_PAGE >= mcqs.length}
                <button 
                    class="btn submit-btn"
                    on:click={handleSubmit}
                    disabled={visibleQuestions.some((_, i) => selectedAnswers[currentSet * QUESTIONS_PER_PAGE + i] === undefined)}
                >
                    <span class="btn-text">Submit</span>
                    <ArrowRight />
                </button>
            {:else}
                <button 
                    class="btn"
                    on:click={handleNext}
                    disabled={visibleQuestions.some((_, i) => selectedAnswers[currentSet * QUESTIONS_PER_PAGE + i] === undefined)}
                >
                    <span class="btn-text">Next</span>
                    <ArrowRight />
                </button>
            {/if}
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
                currentSet = 0;
                selectedAnswers = [];
                submitted = false;
                score = 0;
            }}>
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

    
    .progress-bar {
        height: 8px;
        background: var(--background-300);
        border-radius: 4px;
        margin-bottom: var(--space-l);
        overflow: hidden;
    }

    .progress-fill {
        height: 100%;
        background: var(--primary-500);
        transition: width 0.3s ease;
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

    .icon-check {
        color: var(--success-500);
        width: 24px;
        height: 24px;
    }

    .icon-cross {
        color: var(--error-500);
        width: 24px;
        height: 24px;
    }

    @media (max-width: 768px) {
        .mcq-container {
            padding: var(--space-s);
        }

        .question-card {
            padding: var(--space-m);
        }

        .navigation-controls {
            flex-direction: column;
            gap: var(--space-s);
        }

        .progress-text {
            text-align: center;
            order: -1;
        }

        .result-item {
            flex-direction: column;
            gap: var(--space-s);
        }

        .result-status {
            width: 100%;
            justify-content: flex-start;
        }

        .score-circle {
            width: 120px;
            height: 120px;
        }

        .score-text {
            font-size: 20px;
        }
    }

    @media (max-width: 480px) {
        .option {
            padding: var(--space-s) var(--space-xs);
        }

        .btn-text {
            display: none;
        }

        .progress-text {
            font-size: var(--step--1);
        }
    }
</style>
