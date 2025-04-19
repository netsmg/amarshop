<script>
	import PageTitle from '$lib/components/PageTitle.svelte';
	import McqCard from '$lib/components/mcq/TestCard.svelte';
</script>

<svelte:head>
	<title>Human Anatomy| Mcq Store</title>
	<meta name="description" content="Mcq Store human anatomy" />
</svelte:head>

<PageTitle pageTitle="Human Anatomy" />

<section class="contact">
	<McqCard 
    question="How many bones are in the adult human body?" 
    questionNumber=1 
    questionTag="Skeletal System"
    options={["206", "300", "150", "250"]}
    correctAnswer={0}
    explanation="Adults have 206 bones that fuse together from about 300 at birth."
/>

<McqCard 
    question="Which type of muscle makes up the heart?" 
    questionNumber=2 
    questionTag="Muscular System"
    options={["Smooth muscle", "Cardiac muscle", "Skeletal muscle", "Striated muscle"]}
    correctAnswer={1}
    explanation="Cardiac muscle is exclusively found in the heart walls."
/>

<McqCard 
    question="What is the largest artery in the human body?" 
    questionNumber=3 
    questionTag="Circulatory System"
    options={["Aorta", "Vena Cava", "Pulmonary Artery", "Carotid Artery"]}
    correctAnswer={0}
    explanation="The aorta carries oxygenated blood from the heart to the body."
/>

<McqCard 
    question="What transmits signals between neurons?" 
    questionNumber=4 
    questionTag="Nervous System"
    options={["Neurotransmitters", "Hormones", "Blood Cells", "Synapses"]}
    correctAnswer={0}
    explanation="Neurotransmitters are chemical messengers between nerve cells."
/>

<McqCard 
    question="Where does gas exchange occur in the lungs?" 
    questionNumber=5 
    questionTag="Respiratory System"
    options={["Bronchi", "Alveoli", "Trachea", "Larynx"]}
    correctAnswer={1}
    explanation="Alveoli are tiny air sacs where oxygen and CO₂ exchange happens."
/>

<McqCard 
    question="Where does most nutrient absorption occur?" 
    questionNumber=6 
    questionTag="Digestive System"
    options={["Stomach", "Liver", "Small Intestine", "Large Intestine"]}
    correctAnswer={2}
    explanation="The small intestine has villi that maximize nutrient absorption."
/>

<McqCard 
    question="Which gland produces insulin?" 
    questionNumber=7 
    questionTag="Endocrine System"
    options={["Liver", "Pancreas", "Thyroid", "Adrenal"]}
    correctAnswer={1}
    explanation="Pancreatic beta cells produce insulin to regulate blood sugar."
/>

<McqCard 
    question="Which organs filter blood?" 
    questionNumber=8 
    questionTag="Urinary System"
    options={["Ureters", "Bladder", "Kidneys", "Urethra"]}
    correctAnswer={2}
    explanation="Kidneys remove waste and excess fluid through nephrons."
/>

<McqCard 
    question="Where are eggs produced?" 
    questionNumber=9 
    questionTag="Reproductive System"
    options={["Ovaries", "Uterus", "Fallopian Tubes", "Cervix"]}
    correctAnswer={0}
    explanation="Ovaries release eggs during ovulation."
/>

<McqCard 
    question="What is the outermost skin layer?" 
    questionNumber=10 
    questionTag="Integumentary"
    options={["Dermis", "Epidermis", "Hypodermis", "Subcutaneous"]}
    correctAnswer={1}
    explanation="Epidermis provides waterproof barrier and skin tone."
/>

<McqCard 
    question="Which is part of the lymphatic system?" 
    questionNumber=11 
    questionTag="Lymphatic"
    options={["Spleen", "Liver", "Pancreas", "Gallbladder"]}
    correctAnswer={0}
    explanation="Spleen filters blood and stores platelets/white blood cells."
/>

<McqCard 
    question="What detects light in eyes?" 
    questionNumber=12 
    questionTag="Sensory Organs"
    options={["Cornea", "Retina", "Lens", "Optic Nerve"]}
    correctAnswer={1}
    explanation="Retina contains photoreceptors (rods and cones)."
/>

<McqCard 
    question="Which bone is in the upper arm?" 
    questionNumber=13 
    questionTag="Skeletal"
    options={["Femur", "Humerus", "Tibia", "Radius"]}
    correctAnswer={1}
    explanation="Humerus connects shoulder to elbow."
/>

<McqCard 
    question="Voluntary muscles are:" 
    questionNumber=14 
    questionTag="Muscular"
    options={["Smooth", "Cardiac", "Skeletal", "Involuntary"]}
    correctAnswer={2}
    explanation="Skeletal muscles are consciously controlled."
/>

<McqCard 
    question="What carries oxygen in blood?" 
    questionNumber=15 
    questionTag="Circulatory"
    options={["Hemoglobin", "Platelets", "Plasma", "White Blood Cells"]}
    correctAnswer={0}
    explanation="Hemoglobin in red blood cells binds oxygen."
/>

<McqCard 
    question="Central nervous system includes:" 
    questionNumber=16 
    questionTag="Nervous"
    options={["Brain & Spinal Cord", "Nerves", "Sensory Organs", "Heart"]}
    correctAnswer={0}
    explanation="CNS consists of brain and spinal cord."
/>

<McqCard 
    question="Enzyme in saliva?" 
    questionNumber=17 
    questionTag="Digestive"
    options={["Pepsin", "Amylase", "Lipase", "Trypsin"]}
    correctAnswer={1}
    explanation="Amylase breaks down carbohydrates."
/>

<McqCard 
    question="Regulates metabolism?" 
    questionNumber=18 
    questionTag="Endocrine"
    options={["Thyroid", "Adrenal", "Pituitary", "Pancreas"]}
    correctAnswer={0}
    explanation="Thyroid hormones control metabolic rate."
/>

<McqCard 
    question="Kidney's functional unit?" 
    questionNumber=19 
    questionTag="Urinary"
    options={["Neuron", "Nephron", "Alveolus", "Villi"]}
    correctAnswer={1}
    explanation="Nephrons filter blood and form urine."
/>

<McqCard 
    question="Male sex hormone?" 
    questionNumber=20 
    questionTag="Reproductive"
    options={["Estrogen", "Progesterone", "Testosterone", "Insulin"]}
    correctAnswer={2}
    explanation="Testosterone drives male characteristics."
/>

<McqCard 
    question="Produces skin pigment?" 
    questionNumber=21 
    questionTag="Integumentary"
    options={["Keratinocytes", "Melanocytes", "Langerhans", "Fibroblasts"]}
    correctAnswer={1}
    explanation="Melanocytes produce melanin for UV protection."
/>

<McqCard 
    question="Filters lymph?" 
    questionNumber=22 
    questionTag="Lymphatic"
    options={["Spleen", "Thymus", "Lymph Nodes", "Tonsils"]}
    correctAnswer={2}
    explanation="Lymph nodes trap pathogens and debris."
/>

<McqCard 
    question="Eardrum is called:" 
    questionNumber=23 
    questionTag="Sensory"
    options={["Cochlea", "Tympanic Membrane", "Ossicles", "Pinna"]}
    correctAnswer={1}
    explanation="Tympanic membrane vibrates from sound waves."
/>

<McqCard 
    question="Largest human muscle?" 
    questionNumber=24 
    questionTag="Muscular"
    options={["Biceps", "Gluteus Maximus", "Heart", "Sartorius"]}
    correctAnswer={1}
    explanation="Gluteus maximus in buttocks enables hip extension."
/>

<McqCard 
    question="Bone marrow produces:" 
    questionNumber=25 
    questionTag="Skeletal"
    options={["Bile", "Insulin", "Blood Cells", "Urine"]}
    correctAnswer={2}
    explanation="Bone marrow creates red/white blood cells and platelets."
/>
   
    
    
	

</section>

<style>
	.contact {
		padding: var(--space-l) var(--space-m);
	}
</style>
