<script>
    import { db } from '$lib/firebase';
    import { addDoc, collection } from 'firebase/firestore';
    import { page } from '$app/stores';
    
    // Form fields
    let question = '';
    let options = '';
    let correctAnswer = 0;
    let explanation = '';
    let questionNumber = '';
    let questionTag = 'General';
    let loading = false;
    let successMessage = '';
    let errorMessage = '';

    const resetForm = () => {
        question = '';
        options = '';
        correctAnswer = 0;
        explanation = '';
        questionNumber = '';
        questionTag = 'General';
    };

    const submitQuestion = async (e) => {
        e.preventDefault();
        loading = true;
        errorMessage = '';
        successMessage = '';

        try {
            // Convert options string to array
            const optionsArray = options.split('\n').filter(opt => opt.trim() !== '');

            await addDoc(collection(db, 'mcqQuestions'), {
                question: question.trim(),
                options: optionsArray,
                correctAnswer: Number(correctAnswer),
                explanation: explanation.trim(),
                questionNumber: Number(questionNumber),
                questionTag: questionTag.trim(),
                createdAt: new Date()
            });

            successMessage = 'Question added successfully!';
            resetForm();
        } catch (err) {
            console.error('Error adding question:', err);
            errorMessage = `Failed to add question: ${err.message}`;
        } finally {
            loading = false;
        }
    };
</script>

<svelte:head>
    <title>Add MCQ | Amar Shop</title>
</svelte:head>

<div class="container">
    <h1>Add New MCQ Question</h1>
    
    {#if successMessage}
        <div class="success-message">{successMessage}</div>
    {:else if errorMessage}
        <div class="error-message">{errorMessage}</div>
    {/if}

    <form on:submit={submitQuestion}>
        <div class="form-group">
            <label for="question">Question:</label>
            <textarea
                id="question"
                bind:value={question}
                required
                rows="3"
            />
        </div>

        <div class="form-group">
            <label for="options">Options (one per line):</label>
            <textarea
                id="options"
                bind:value={options}
                required
                rows="4"
            />
        </div>

        <div class="form-group">
            <label for="correctAnswer">Correct Answer (option index):</label>
            <select
                id="correctAnswer"
                bind:value={correctAnswer}
                required
            >
                {#each options.split('\n').filter(Boolean) as _, i}
                    <option value={i}>Option {i + 1}</option>
                {/each}
            </select>
        </div>

        <div class="form-group">
            <label for="explanation">Explanation:</label>
            <textarea
                id="explanation"
                bind:value={explanation}
                required
                rows="2"
            />
        </div>

        <div class="form-row">
            <div class="form-group">
                <label for="questionNumber">Question Number:</label>
                <input
                    type="number"
                    id="questionNumber"
                    bind:value={questionNumber}
                    required
                    min="1"
                />
            </div>

            <div class="form-group">
                <label for="questionTag">Category Tag:</label>
                <input
                    type="text"
                    id="questionTag"
                    bind:value={questionTag}
                    required
                />
            </div>
        </div>

        <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Add Question'}
        </button>
    </form>
</div>

<style>
    .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
    }

    h1 {
        text-align: center;
        margin-bottom: 2rem;
    }

    form {
        background: #f5f5f5;
        padding: 2rem;
        border-radius: 8px;
    }

    .form-group {
        margin-bottom: 1.5rem;
    }

    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }

    label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
    }

    input, textarea, select {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1rem;
    }

    textarea {
        resize: vertical;
    }

    button {
        background: #007bff;
        color: white;
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1rem;
        width: 100%;
    }

    button:disabled {
        background: #6c757d;
        cursor: not-allowed;
    }

    .success-message {
        color: #28a745;
        margin-bottom: 1rem;
        text-align: center;
    }

    .error-message {
        color: #dc3545;
        margin-bottom: 1rem;
        text-align: center;
    }

</style>
