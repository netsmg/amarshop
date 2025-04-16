<script>
    import { onMount } from 'svelte';
    import { db } from '$lib/firebase';
    import { collection, getDocs } from 'firebase/firestore';
    import { Book, Clock } from '$lib/icons';
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
    <h1>Exam Challenges</h1>
    
    {#if loading}
        <div class="loading-spinner">
            <div class="spinner"></div>
        </div>
    {:else if error}
        <div class="error-message">
            ⚠️ {error}
        </div>
    {:else}
        <div class="exam-grid">
            {#each exams as exam}
                <a href={`/test/${exam.examTag}`} class="exam-card">
                    <div class="card-header">
                        <h3>{exam.examName}</h3>
                        <div class="difficulty-badge">Intermediate</div>
                    </div>
                    <p class="exam-description">{exam.description}</p>
                    <div class="exam-meta">
                        <div class="meta-item">
                            <span class="icon"> <Book /> </span>
                            {exam.totalQuestions} Questions
                        </div>
                        <div class="meta-item">
                            <span class="icon"> <Clock /> </span>
                            {exam.duration} mins
                        </div>
                    </div>
                    <div class="hover-indicator"></div>
                </a>
            {/each}
        </div>
    {/if}
</div>

<style>
      .exams-container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 4rem 2rem; 
       background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        min-height: 100vh;
    }

    h1 {
        text-align: center;
        margin-bottom: 3rem;
        font-size: 2.5rem;
        background: linear-gradient(45deg, #6366f1, #3b82f6);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        font-weight: 700;
        letter-spacing: -0.05em;
    }

    .exam-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 2rem;
        padding: 1rem;
    }

    .exam-card {
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

    .exam-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 40px rgba(0,0,0,0.15);
    }

    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
    }

    h3 {
        margin: 0;
        font-size: 1.5rem;
        font-weight: 600;
        color: #1f2937;
    }

    .difficulty-badge {
        background: #3b82f6;
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 999px;
        font-size: 0.875rem;
        font-weight: 500;
    }

    .exam-description {
        color: #4b5563;
        line-height: 1.6;
        min-height: 72px;
        margin-bottom: 1.5rem;
    }

    .exam-meta {
        display: flex;
        gap: 1rem;
        margin-top: auto;
    }

    .meta-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: rgba(59, 130, 246, 0.1);
        padding: 0.5rem 1rem;
        border-radius: 8px;
        font-weight: 500;
        color: #3b82f6;
    }

    .hover-indicator {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(45deg, rgba(59,130,246,0.1) 0%, transparent 50%);
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .exam-card:hover .hover-indicator {
        opacity: 1;
    }

    .loading-spinner {
        display: flex;
        justify-content: center;
        padding: 4rem;
    }

    .spinner {
        width: 50px;
        height: 50px;
        border: 4px solid #e5e7eb;
        border-top-color: #3b82f6;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    .error-message {
        background: #fee2e2;
        color: #dc2626;
        padding: 1.5rem;
        border-radius: 12px;
        text-align: center;
        font-weight: 500;
        margin: 2rem auto;
        max-width: 500px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    @media (max-width: 640px) {
        .exams-container {
            padding: 2rem 1rem;
        }
        
        h1 {
            font-size: 2rem;
        }
    }
</style>
