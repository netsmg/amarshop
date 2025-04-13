<script>
	import { onMount } from 'svelte';
	import { db } from '$lib/firebase';
	import { collection, getDocs } from 'firebase/firestore';
	import PageTitle from '$lib/components/PageTitle.svelte';
	import McqCard from '$lib/components/mcq/TestCard.svelte';

	let loading = true;
	let error = null;
	let questions = [];

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
	<title>Test | Amar Shop</title>
	<meta name="description" content="Give mcq" />
</svelte:head>

<PageTitle pageTitle="Exam" />

{#if loading}
	<div class="loading">Loading questions...</div>
{:else if error}
	<div class="error">Error: {error}</div>
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
	.loading, .error {
		text-align: center;
		padding: 2rem;
		font-size: 1.2rem;
	}
	.error {
		color: #ff4444;
	}

	.contact {
		padding: var(--space-l) var(--space-m);
	}
</style>
