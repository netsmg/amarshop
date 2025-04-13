<script>
    import { onMount } from 'svelte';
    import { db } from '$lib/firebase';
    import { collection, getDocs } from 'firebase/firestore';
    
    let exams = [];
    let loading = true;
    let error = null;

    onMount(async () => {
        try {
            const snapshot = await getDocs(collection(db, 'exams'));
            exams = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (err) {
            error = err.message;
        } finally {
            loading = false;
        }
    });
</script>

<svelte:head>
    <title>Exams | Amar Shop</title>
</svelte:head>

<div class="exams-container">
    <h1>Available Exams</h1>
    
    {#if loading}
        <div class="loading">Loading exams...</div>
    {:else if error}
        <div class="error">{error}</div>
    {:else}
        <div class="exam-grid">
            {#each exams as exam}
                <a href={`/test/${exam.examTag}`} class="exam-card">
                    <h3>{exam.examName}</h3>
                    <p>{exam.description}</p>
                    <div class="exam-meta">
                        <span>Questions: {exam.totalQuestions}</span>
                        <span>Duration: {exam.duration} mins</span>
                    </div>
                </a>
            {/each}
        </div>
    {/if}
</div>

<style>
    .exams-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
    }

    h1 {
        text-align: center;
        margin-bottom: 2rem;
    }

    .exam-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 2rem;
    }

    .exam-card {
        background: #fff;
        border-radius: 8px;
        padding: 1.5rem;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        transition: transform 0.2s;
        text-decoration: none;
        color: inherit;
    }

    .exam-card:hover {
        transform: translateY(-2px);
    }

    .exam-card h3 {
        margin: 0 0 1rem 0;
        color: #1a73e8;
    }

    .exam-meta {
        display: flex;
        justify-content: space-between;
        margin-top: 1rem;
        font-size: 0.9rem;
        color: #666;
    }

    .loading, .error {
        text-align: center;
        padding: 2rem;
        font-size: 1.2rem;
    }

    .error {
        color: #ff4444;
    }
</style>
