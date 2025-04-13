<script>
    import { onMount } from 'svelte';
    import { db } from '$lib/firebase';
    import { query, collection, getDocs, where } from 'firebase/firestore';
    import McqCard from '$lib/components/mcq/TestCard.svelte';
    import PageTitle from '$lib/components/PageTitle.svelte';
    
    export let data;
    
    let loading = true;
    let error = null;
    let questions = [];
    let examDetails = null;

    onMount(async () => {
        try {
            // Get exam details
            const examSnapshot = await getDocs(
                query(collection(db, 'exams'), where("examTag", "==", data.tag))
            );
            
            if (examSnapshot.empty) {
                throw new Error('Exam not found');
            }
            
            examDetails = examSnapshot.docs[0].data();
            
            // Get questions
            const questionsSnapshot = await getDocs(
                query(collection(db, 'mcqQuestions'), where("questionTag", "==", data.tag))
            );
            
            questions = questionsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            
            if (questions.length === 0) {
                throw new Error('No questions found for this exam');
            }
            
        } catch (err) {
            error = err.message;
        } finally {
            loading = false;
        }
    });
</script>

<svelte:head>
    <title>{examDetails?.examName || 'Exam'} | Amar Shop</title>
</svelte:head>

{#if examDetails}
    <PageTitle pageTitle={examDetails.examName} />
    <div class="exam-header">
        <p>{examDetails.description}</p>
        <div class="exam-stats">
            <span>Total Questions: {examDetails.totalQuestions}</span>
            <span>Duration: {examDetails.duration} minutes</span>
        </div>
    </div>
{/if}

{#if loading}
    <div class="loading">Loading exam...</div>
{:else if error}
    <div class="error">{error}</div>
{:else}
    <section class="contact">
        {#each questions as question (question.id)}
            <McqCard
                question={question.question}
                questionNumber={question.questionNumber}
                questionTag={question.questionTag}
                options={question.options}
                correctAnswer={question.correctAnswer}
                explanation={question.explanation}
            />
        {/each}
    </section>
{/if}

<style>
    .exam-header {
        text-align: center;
        margin-bottom: 2rem;
    }

    .exam-stats {
        display: flex;
        justify-content: center;
        gap: 2rem;
        margin-top: 1rem;
        color: #666;
    }
</style>
