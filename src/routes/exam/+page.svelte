<script>
	import { onMount } from 'svelte';
	import { db } from '$lib/firebase';
	import { collection, getDocs } from 'firebase/firestore';
	import PageTitle from '$lib/components/PageTitle.svelte';
	import McqCard from '$lib/components/mcq/TestCard.svelte';

	let loading = true;
	let error = null;
	let questions = [];
	let selectedTag = 'All'; // Default selection
	let uniqueTags = [];

	// Reactive statement to get unique tags
	$: {
		if (questions.length) {
			const tags = questions.map(q => q.questionTag);
			uniqueTags = ['All', ...new Set(tags)].sort();
		}
	}

	// Filter questions based on selected tag
	$: filteredQuestions = selectedTag === 'All' 
		? questions 
		: questions.filter(q => q.questionTag === selectedTag);

	onMount(async () => {
		try {
			const querySnapshot = await getDocs(collection(db, 'mcqQuestions'));
			questions = querySnapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data()
			}));
		} catch (err) {
			error = err.message;
			console.error('Error fetching questions:', err);
		} finally {
			loading = false;
		}
	});
</script>

<svelte:head>
	<title>Exam | Amar Shop</title>
	<meta name="description" content="Give mcq" />
</svelte:head>

<PageTitle pageTitle="Exam" />

{#if loading}
	<div class="loading">Loading questions...</div>
{:else if error}
	<div class="error">Error: {error}</div>
{:else}
	<div class="controls">
		<div class="tag-filter">
			<label>Filter by Category:</label>
			<select bind:value={selectedTag}>
				{#each uniqueTags as tag}
					<option value={tag}>{tag}</option>
				{/each}
			</select>
		</div>
		
		<div class="question-count">
			Showing {filteredQuestions.length} questions
		</div>
	</div>

	<section class="questions-container">
		{#each filteredQuestions as question (question.id)}
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
	.controls {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
		padding: 0 1rem;
	}

	.tag-filter {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.tag-filter select {
		padding: 0.5rem 1rem;
		border-radius: 4px;
		border: 1px solid #ddd;
		min-width: 200px;
	}

	.question-count {
		color: #666;
		font-size: 0.9rem;
	}

	.questions-container {
		display: grid;
		gap: 1.5rem; 
padding: var(--space-l) var(--space-m);
	
	}

	@media (max-width: 768px) {
		.controls {
			flex-direction: column;
			gap: 1rem;
			align-items: stretch;
		}
	} 

		

</style>
