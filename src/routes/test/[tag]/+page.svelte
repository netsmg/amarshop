<script>
    import { onMount, onDestroy } from 'svelte';
    import { db, auth } from '$lib/firebase';
    import { query, collection, getDocs, where, addDoc } from 'firebase/firestore';
    import { writable } from 'svelte/store';
    import McqCard from '$lib/components/mcq/TestCard.svelte';
    import PageTitle from '$lib/components/PageTitle.svelte';
    import { redirect } from '@sveltejs/kit';

    export let data;

    let loading = true;
    let error = null;
    let questions = [];
    let examDetails = null;
    let userAnswers = [];
    let currentQuestion = 0;
    let examStarted = false;
    let examEnded = false;
    let score = 0;
    
    // Timer implementation
    const initialTime = writable(0);
    let timerInterval;
    
    // Authentication check
    if (!auth.currentUser) {
        throw redirect(302, '/login');
    }

    onMount(async () => {
        try {
            // Get exam details
            const examSnapshot = await getDocs(
                query(collection(db, 'exams'), where("examTag", "==", data.tag))
            );
            
            if (examSnapshot.empty) throw new Error('Exam not found');
            examDetails = examSnapshot.docs[0].data();
            initialTime.set(examDetails.duration * 60);
            
            // Get questions
            const questionsSnapshot = await getDocs(
                query(collection(db, 'mcqQuestions'), where("questionTag", "==", data.tag))
            );
            
            questions = questionsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            
            userAnswers = new Array(questions.length).fill(null);
            
            if (questions.length === 0) throw new Error('No questions found');
            
        } catch (err) {
            error = err.message;
        } finally {
            loading = false;
        }
    });

    const startExam = () => {
        examStarted = true;
        timerInterval = setInterval(() => {
            initialTime.update(t => {
                if (t <= 1) {
                    clearInterval(timerInterval);
                    submitExam();
                    return 0;
                }
                return t - 1;
            });
        }, 1000);
    };

    const submitExam = async () => {
        clearInterval(timerInterval);
        examEnded = true;
        score = questions.reduce((acc, q, idx) => 
            q.correctAnswer === userAnswers[idx] ? acc + 1 : acc, 0);
        
        // Save result to Firestore
        await addDoc(collection(db, 'examResults'), {
            userId: auth.currentUser.uid,
            examTag: data.tag,
            score,
            total: questions.length,
            timestamp: new Date()
        });
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    onDestroy(() => clearInterval(timerInterval));
</script>

<svelte:head>
    <title>{examDetails?.examName || 'Exam'} | Amar Shop</title>
</svelte:head>

{#if !examStarted && !loading && !error}
    <div class="exam-instructions">
        <PageTitle pageTitle="Exam Guidelines" />
        <h2>Important Instructions</h2>
        <ul>
            <li>Total time: {examDetails.duration} minutes</li>
            <li>No backtracking allowed</li>
            <li>All questions are mandatory</li>
            <li>Timer starts when you click Begin Exam</li>
        </ul>
        <button on:click={startExam}>Begin Exam</button>
    </div>
{:else if examEnded}
    <div class="exam-results">
        <h2>Exam Results</h2>
        <p>Your Score: {score}/{questions.length}</p>
        <p>Percentage: {(score/questions.length*100).toFixed(1)}%</p>
    </div>
{:else if examDetails}
    <PageTitle pageTitle={examDetails.examName} />
    <div class="exam-header">
        <div class="exam-controls">
            <div class="timer">{$initialTime | formatTime}</div>
            <progress value={currentQuestion + 1} max={questions.length} />
            <div class="navigation">
                <button 
                    disabled={currentQuestion === 0}
                    on:click={() => currentQuestion--}>Previous
                </button>
                <button 
                    disabled={currentQuestion === questions.length - 1}
                    on:click={() => currentQuestion++}>Next
                </button>
                <button on:click={submitExam}>Submit Exam</button>
            </div>
        </div>
        
        <div class="question-list">
            {#each questions as _, i}
                <div 
                    class="question-indicator {i === currentQuestion ? 'active' : ''} 
                    {userAnswers[i] ? 'answered' : ''}
                    on:click={() => currentQuestion = i}
                >
                    {i + 1}
                </div>
            {/each}
        </div>
    </div>

    <section class="contact">
        <McqCard
            question={questions[currentQuestion].question}
            questionNumber={currentQuestion + 1}
            category={questions[currentQuestion].category}
            options={questions[currentQuestion].options}
            bind:selectedAnswer={userAnswers[currentQuestion]}
        />
    </section>
{/if}

<style>
    .exam-controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
    }

    .timer {
        font-size: 1.5rem;
        font-weight: bold;
        color: #2c3e50;
    }

    .question-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(40px, 1fr));
        gap: 0.5rem;
        margin: 1rem 0;
    }

    .question-indicator {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #ccc;
        border-radius: 50%;
        cursor: pointer;
    }

    .question-indicator.active {
        border-color: #3498db;
    }

    .question-indicator.answered {
        background-color: #2ecc71;
        color: white;
    }

    .navigation {
        display: flex;
        gap: 1rem;
    }

    .exam-results {
        text-align: center;
        padding: 2rem;
    }

    .exam-instructions {
        max-width: 600px;
        margin: 0 auto;
        padding: 2rem;
    }
</style>
