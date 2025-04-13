<script>
  import PageTitle from '$lib/components/PageTitle.svelte';
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
    <div  class="question-card">
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
  
  /* Rest of your styles */
  .option-button {
    @mixin button secondary;
    text-align: left;
    justify-content: flex-start;
    padding: 1rem;

    &.selected {
      @mixin button primary;
    }
  }
</style>

