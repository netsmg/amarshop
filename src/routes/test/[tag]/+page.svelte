
<svelte:head>
    <title>{examDetails?.examName || 'Exam'} | Amar Shop</title>
</svelte:head>

{#if examDetails}
    <PageTitle pageTitle={examDetails.examName} />
{/if}

<section class="exam-container">
    {#if loading}
        <div class="loading-state">
            <div class="spinner"></div>
            <p>Loading exam...</p>
        </div>
    {:else if error}
        <div class="error-state">
            <div class="error-icon">⚠️</div>
            <h3>Error loading exam</h3>
            <p>{error}</p>
        </div>
    {:else if !examStarted}
        <!-- Exam Instructions -->
        <div class="instructions-card">
            <h2 class="instructions-title">Exam Guidelines</h2>
            <div class="instructions-content">
                <div class="exam-meta">
                    <div class="meta-item">
                        <span class="meta-label">Total Questions:</span>
                        <span class="meta-value">{examDetails.totalQuestions}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Duration:</span>
                        <span class="meta-value">{examDetails.duration} minutes</span>
                    </div>
                </div>
                <ul class="guidelines-list">
                    <li>Each question has only one correct answer</li>
                    <li>You can't go back to previous questions</li>
                    <li>The exam will auto-submit when time expires</li>
                    <li>Don't refresh the page during the exam</li>
                </ul>
            </div>
            <button class="start-button" on:click={() => {
                examStarted = true;
                startTimer();
            }}>
                Start Exam
            </button>
        </div>
    {:else if showResults}
        <!-- Results Display -->
        <div class="results-card">
            <div class="results-header">
                <h2>Exam Results</h2>
                <div class="score-circle {score === questions.length ? 'perfect' : ''}">
                    {Math.round((score/questions.length)*100)}%
                </div>
            </div>
            <div class="results-details">
                <p class="score-text">You scored {score} out of {questions.length}</p>
                {#if isSubmitting}
                    <div class="submission-loading">
                        <div class="spinner small"></div>
                        <p>Saving results...</p>
                    </div>
                {:else if submitError}
                    <div class="submission-error">
                        ⚠️ Error saving results: {submitError}
                    </div>
                {:else}
                    <div class="submission-success">
                        ✔️ Results saved successfully!
                    </div>
                {/if}
            </div>
        </div>
    {:else}
        <!-- Exam Interface -->
        <div class="exam-interface">
            <div class="exam-header">
                <div class="timer {timeLeft <= 300 ? 'warning' : ''}">
                    ⏳ {formatTime(timeLeft)}
                </div>
                <button class="submit-button" on:click={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit Exam'}
                </button>
            </div>

            <div class="questions-container">
                {#each questions as question (question.id)}
                    <McqCard
                         
question={question.question}
				questionNumber={question.questionNumber}
				questionTag={question.questionTag}
				options={question.options}
				correctAnswer={question.correctAnswer}
				explanation={question.explanation}
                        selectedAnswer={userAnswers[question.id]}
                        on:select={(e) => userAnswers[question.id] = e.detail}
                    />
                {/each}
            </div>
        </div>
    {/if}
</section>

<style>
    :global(:root) {
        --primary-color: #2563eb;
        --success-color: #22c55e;
        --error-color: #dc2626;
        --warning-color: #eab308;
        --text-color: #1f2937;
        --bg-color: #f8fafc;
        --card-bg: #ffffff;
        --radius: 12px;
        --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .exam-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem 1rem;
        min-height: 80vh;
    }

    /* Loading State */
    .loading-state {
        text-align: center;
        padding: 4rem 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    .spinner {
        width: 3rem;
        height: 3rem;
        border: 3px solid var(--primary-color);
        border-radius: 50%;
        border-top-color: transparent;
        animation: spin 1s linear infinite;
    }

    /* Error State */
    .error-state {
        background: #fee2e2;
        padding: 2rem;
        border-radius: var(--radius);
        text-align: center;
        max-width: 600px;
        margin: 2rem auto;
    }

    .error-icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
    }

    /* Instructions Card */
    .instructions-card {
        background: var(--card-bg);
        border-radius: var(--radius);
        box-shadow: var(--shadow);
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
    }

    .instructions-title {
        text-align: center;
        margin-bottom: 1.5rem;
        color: var(--text-color);
    }

    .exam-meta {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        margin-bottom: 2rem;
    }

    .meta-item {
        background: var(--bg-color);
        padding: 1rem;
        border-radius: 8px;
        text-align: center;
    }

    .meta-label {
        display: block;
        font-weight: 500;
        color: #64748b;
    }

    .meta-value {
        display: block;
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--text-color);
    }

    .guidelines-list {
        list-style: none;
        padding: 0;
        margin: 2rem 0;
    }

    .guidelines-list li {
        padding: 0.75rem 1rem;
        margin: 0.5rem 0;
        background: var(--bg-color);
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .guidelines-list li::before {
        content: "•";
        color: var(--primary-color);
        font-weight: bold;
    }

    .start-button {
        width: 100%;
        padding: 1rem;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 1.1rem;
        cursor: pointer;
        transition: transform 0.1s ease;
    }

    .start-button:hover {
        transform: translateY(-1px);
    }

    /* Exam Interface */
    .exam-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .timer {
        background: var(--card-bg);
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        font-weight: 600;
        box-shadow: var(--shadow);
    }

    .timer.warning {
        color: var(--warning-color);
        animation: pulse 1.5s infinite;
    }

    .submit-button {
        background: var(--success-color);
        color: white;
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: opacity 0.2s ease;
    }

    .submit-button:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    .questions-container {
        display: grid;
        gap: 1.5rem;
    }

    /* Results Card */
    .results-card {
        background: var(--card-bg);
        max-width: 600px;
        margin: 2rem auto;
        padding: 2rem;
        border-radius: var(--radius);
        box-shadow: var(--shadow);
    }

    .results-header {
        text-align: center;
        margin-bottom: 2rem;
    }

    .score-circle {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        font-size: 2rem;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 1rem auto;
    }

    .score-circle.perfect {
        background: var(--success-color);
    }

    .submission-loading,
    .submission-success,
    .submission-error {
        padding: 1rem;
        border-radius: 8px;
        margin-top: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    }

    .submission-success {
        background: #dcfce7;
        color: #166534;
    }

    .submission-error {
        background: #fee2e2;
        color: #991b1b;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }

    @media (max-width: 768px) {
        .exam-meta {
            grid-template-columns: 1fr;
        }

        .exam-header {
            flex-direction: column;
        }

        .timer, .submit-button {
            width: 100%;
            text-align: center;
        }
    }
</style>




<script>
    import { onMount, onDestroy } from 'svelte';
    import { db, auth } from '$lib/firebase';
    import { query, collection, getDocs, where, addDoc } from 'firebase/firestore';
    import McqCard from '$lib/components/mcq/TestCard.svelte';
    import PageTitle from '$lib/components/PageTitle.svelte';

    export let data;

    let loading = true;
    let error = null;
    let questions = [];
    let examDetails = null;
    let examStarted = false;
    let timeLeft = 0;
    let userAnswers = {};
    let showResults = false;
    let score = 0;
    let isSubmitting = false;
    let submitError = null;

    // Timer functionality
    let timerInterval;
    const startTimer = () => {
        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
            } else {
                clearInterval(timerInterval);
                handleSubmit();
            }
        }, 1000);
    };

    // Format time as MM:SS
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Calculate score and save results
    const handleSubmit = async () => {
        isSubmitting = true;
        submitError = null;
        
        try {
            // Calculate score
            score = questions.reduce((acc, question) => {
                return acc + (userAnswers[question.id] === question.correctAnswer ? 1 : 0);
            }, 0);

            // Save exam results
            const user = auth.currentUser;
            if (user) {
                await addDoc(collection(db, 'examResults'), {
                    userId: user.uid,
                    examTag: data.tag,
                    score,
                    totalQuestions: questions.length,
                    timestamp: new Date(),
                    answers: userAnswers
                });
            }

            showResults = true;
        } catch (err) {
            submitError = err.message;
        } finally {
            isSubmitting = false;
        }
    };

    onMount(async () => {
        try {
            // Get exam details
            const examSnapshot = await getDocs(
                query(collection(db, 'exams'), where("examTag", "==", data.tag))
            );
            
            if (examSnapshot.empty) throw new Error('Exam not found');
            examDetails = examSnapshot.docs[0].data();
            timeLeft = examDetails.duration * 60;

            // Get questions
            const questionsSnapshot = await getDocs(
                query(collection(db, 'mcqQuestions'), where("questionTag", "==", data.tag))
            );
            
            questions = questionsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            
            if (questions.length === 0) throw new Error('No questions found');
            
        } catch (err) {
            error = err.message;
        } finally {
            loading = false;
        }
    });

    onDestroy(() => {
        clearInterval(timerInterval);
    });
</script>

