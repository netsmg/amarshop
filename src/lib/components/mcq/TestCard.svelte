<script lang="ts">
    import { borderAnimation, decodeAnimation } from '$lib/actions/animation';
    import { Checkmark, Cross } from '$lib/icons';

    export let questionNumber: number;
    export let question: string;
    export let questionTag: string | undefined;  // Fixed optional prop syntax
    export let options: Array<{ text: string; tag?: string }>;
    export let correctAnswer: number;
    export let explanation: string;
    
    let selectedAnswer: number | null = null;
    let showFeedback = false;

    const handleSelect = (index: number) => {
        selectedAnswer = index;
        showFeedback = true;
    };

    $: isCorrect = selectedAnswer === correctAnswer;
    $: getLetter = (index: number) => String.fromCharCode(65 + index);
</script>

<article class="mcq-card" use:borderAnimation>
    <div class="mcq__header">
        <div class="question-meta">
            <span class="question-number">Question {questionNumber}</span>
            {#if questionTag}
                <span class="question-tag">{questionTag}</span>
            {/if}
        </div>
        <h2 use:decodeAnimation>{question}</h2>
    </div>

    <!-- Rest of the template remains the same -->


    <div class="mcq__options">
        {#each options as option, index (index)}
            <button
                class="option {selectedAnswer === index ? 'selected' : ''}
                       {showFeedback ? (index === correctAnswer ? 'correct' : 'incorrect') : ''}"
                on:click={() => handleSelect(index)}
                disabled={showFeedback}
            >
                <div class="option-left">
                    <span class="option-number">{getLetter(index)}.</span>
                    <span class="option-text">{option}</span>
                </div>
                <div class="option-right">
                    {#if option.tag}
                        <span class="option-tag">{option.tag}</span>
                    {/if}
                    {#if showFeedback && index === correctAnswer}
                        <Checkmark class="feedback-icon" />
                    {:else if showFeedback && selectedAnswer === index}
                        <Cross class="feedback-icon" />
                    {/if}
                </div>
            </button>
        {/each}
    </div>

    {#if showFeedback}
        <div class="mcq__feedback">
            <p class:correct={isCorrect} class:incorrect={!isCorrect}>
                {isCorrect ? 'Correct!' : 'Incorrect!'}
            </p>
            <p class="explanation">{explanation}</p>
        </div>
    {/if}
</article>

<style>
    .mcq-card {
        border: var(--brand-border);
        padding: var(--space-m);
        display: grid;
        gap: var(--space-m);
        transition: var(--transition-bounce);
        background: var(--background-100);
    }

    .question-meta {
        display: flex;
        align-items: center;
        gap: var(--space-s);
        margin-bottom: var(--space-xs);
    }

    .question-number {
        font-weight: 600;
        color: var(--primary-500);
        font-size: var(--step--1);
    }

    .question-tag {
        background: var(--primary-100);
        color: var(--primary-500);
        padding: var(--space-3xs) var(--space-xs);
        border-radius: 1rem;
        font-size: var(--step--2);
        line-height: 1;
    }

    .mcq__header h2 {
        font-family: var(--font-fancy);
        font-size: var(--step-2);
        margin-bottom: var(--space-s);
    }

    .mcq__options {
        display: grid;
        gap: var(--space-xs);
    }

    .option {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--space-s) var(--space-m);
        border: var(--brand-border);
        background: var(--background-200);
        transition: var(--transition-bounce);
        text-align: left;
        
        &:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: var(--shadow-sm);
        }

        &.selected {
            border-color: var(--primary-500);
            background: var(--primary-100);
        }

        &.correct {
            border-color: var(--success-500);
            background: var(--success-100);
        }

        &.incorrect {
            border-color: var(--error-500);
            background: var(--error-100);
        }
    }

    .option-left {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
    }

    .option-number {
        font-weight: 600;
        color: var(--primary-500);
    }

    .option-right {
        display: flex;
        align-items: center;
        gap: var(--space-s);
    }

    .option-tag {
        background: var(--background-300);
        color: var(--text-300);
        padding: var(--space-3xs) var(--space-2xs);
        border-radius: 1rem;
        font-size: var(--step--2);
        line-height: 1;
    }

    .feedback-icon {
        width: 1.5rem;
        height: 1.5rem;
    }

    .mcq__feedback {
        padding-top: var(--space-m);
        border-top: var(--brand-border);
        
        .correct {
            color: var(--success-500);
        }

        .incorrect {
            color: var(--error-500);
        }

        .explanation {
            color: var(--background-300);
            font-size: var(--step--1);
            margin-top: var(--space-xs);
        }
    }

    @media (min-width: 768px) {
        .mcq-card {
            padding: var(--space-l);
            gap: var(--space-l);
        }

        .mcq__options {
            grid-template-columns: repeat(2, 1fr);
        }

        .mcq__header h2 {
            font-size: var(--step-3);
        }
    }
</style>
