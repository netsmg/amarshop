<script>
  import PageTitle from '$lib/components/PageTitle.svelte';
  import { fade } from 'svelte/transition';
  let currentQuestion = 0;
  let userAnswers = [];
  let timeLeft = 600; // 10 minutes in seconds
  let isExamMode = false;

  const questions = [
    {
      question: "What is Svelte?",
      options: [
        "A JavaScript framework",
        "A compiler",
        "A programming language",
        "A database"
      ],
      correct: 1
    },
    // Add more questions...
  ];

  const handleAnswer = (optionIndex) => {
    userAnswers[currentQuestion] = optionIndex;
    if (!isExamMode) {
      currentQuestion = Math.min(currentQuestion + 1, questions.length - 1);
    }
  };

  const progress = () => (currentQuestion / (questions.length - 1)) * 100;
</script>

 <svelte:head>
	<title>Dashboard | AmarShop</title>
	<meta name="description" content="Amar Shop dashboard" />
</svelte:head>

<PageTitle pageTitle="Dashboard" />


<div class="container">
  <header class="header">
    {#if isExamMode}
      <div class="timer">
        Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
      </div>
    {/if}
    <progress value={progress()} max="100" />
  </header>

  <main class="question-container">
    {#key currentQuestion}
    <div transition:fade class="question-card">
      <h2 class="question-text">{questions[currentQuestion].question}</h2>
      <div class="options-grid">
        {#each questions[currentQuestion].options as option, index (index)}
          <button
            class="option-button"
            class:selected={userAnswers[currentQuestion] === index}
            on:click={() => handleAnswer(index)}
          >
            {option}
          </button>
        {/each}
      </div>
    </div>
    {/key}

    <div class="navigation">
      <button
        class="nav-button"
        on:click={() => currentQuestion--}
        disabled={currentQuestion === 0}
      >
        Previous
      </button>
      <button
        class="nav-button"
        on:click={() => currentQuestion++}
        disabled={currentQuestion === questions.length - 1}
      >
        Next
      </button>
    </div>
  </main>
</div>
<style global lang="postcss">
  :root {
    --color-primary: #3b82f6;
    --color-primary-dark: #2563eb;
    --color-secondary: #e2e8f0;
    --color-secondary-dark: #cbd5e1;
    --color-text: #1e293b;
  }

  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    min-height: 100vh;
  }

  .header {
    margin-bottom: 2rem;
  }

  .header progress {
    width: 100%;
    height: 0.5rem;
    border-radius: 0.25rem;
  }

  .question-container {
    background: white;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  }

  .question-text {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    color: var(--color-text);
  }

  .options-grid {
    display: grid;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  @media (min-width: 640px) {
    .options-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .option-button {
    background-color: var(--color-secondary);
    color: var(--color-text);
    border: none;
    border-radius: 0.5rem;
    padding: 1rem;
    cursor: pointer;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    transition: background-color 0.3s;
  }

  .option-button:hover {
    background-color: var(--color-secondary-dark);
  }

  .option-button.selected {
    background-color: var(--color-primary);
    color: white;
  }

  .navigation {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  .nav-button {
    background-color: var(--color-primary);
    color: white;
    border: none;
    border-radius: 0.5rem;
    padding: 0.75rem 1.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .nav-button:hover {
    background-color: var(--color-primary-dark);
  }

  .timer {
    background-color: var(--color-secondary);
    color: var(--color-text);
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    font-weight: 500;
    margin-bottom: 1rem;
    text-align: center;
  }
</style>

