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

<svelte:head>
    <title>{examDetails?.examName || 'Exam'} | Amar Shop</title>
</svelte:head>

{#if examDetails}
    <PageTitle pageTitle={examDetails.examName} />
{/if}

{#if loading}
    <div class="loading">Loading exam...</div>
{:else if error}
    <div class="error">{error}</div>
{:else if !examStarted}
    <!-- Exam Instructions -->
    <div class="card">
        <h2>Exam Guidelines</h2>
        <ul>
            <li>Total Questions: {examDetails.totalQuestions}</li>
            <li>Duration: {examDetails.duration} minutes</li>
            <li>Each question has only one correct answer</li>
            <li>You can't go back to previous questions</li>
            <li>The exam will auto-submit when time expires</li>
        </ul>
        <button on:click={() => {
            examStarted = true;
            startTimer();
        }}>Start Exam</button>
    </div>
{:else if showResults}
    <!-- Results Display -->
    <div class="exam-results">
        <h2>Exam Results</h2>
        <p>Score: {score}/{questions.length}</p>
        <p>Percentage: {Math.round((score/questions.length)*100)}%</p>
        {#if isSubmitting}
            <p>Saving results...</p>
        {:else if submitError}
            <p class="error">Error saving results: {submitError}</p>
        {:else}
            <p>Results saved successfully!</p>
        {/if}
    </div>
{:else}
    <!-- Exam Interface -->
    <div class="exam-interface">
        <div class="exam-header">
            <div class="timer">Time Remaining: {formatTime(timeLeft)}</div>
            <button on:click={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Exam'}
            </button>
        </div>

        <section class="contact">
            {#each questions as question (question.id)}
                <McqCard
                    {question}
                    selectedAnswer={userAnswers[question.id]}
                    on:select={(e) => userAnswers[question.id] = e.detail}
                />
            {/each}
        </section>
    </div>
{/if}

<style>
    

.card {
        position: relative;
        background: rgba(255, 255, 255, 0.85);
        backdrop-filter: blur(10px);
        border-radius: 16px;
        padding: 2rem;
        box-shadow: 0 4px 30px rgba(0,0,0,0.1);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        text-decoration: none;
        color: #1f2937;
        overflow: hidden;
        border: 1px solid rgba(255,255,255,0.3);
    }
    .exam-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
    }

    .timer {
        font-weight: bold;
        color: #dc3545;
    }

    .exam-results {
        text-align: center;
        margin: 2rem auto;
        padding: 2rem;
        max-width: 600px;
        border: 1px solid #eee;
    }

    .error {
        color: #dc3545;
    }

    .loading {
        text-align: center;
        padding: 2rem;
    }
</style>
