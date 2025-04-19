<script>
	import PageTitle from '$lib/components/PageTitle.svelte';
	import McqCard from '$lib/components/mcq/TestCard.svelte';
</script>

<svelte:head>
	<title> World capitals | Mcq Store</title>
	<meta name="description" content="Mcq Store world capitals" />
</svelte:head>

<PageTitle pageTitle="World capitals" />

<section class="contact">
	

   <McqCard 
    question="What is the capital of Canada?" 
    questionNumber=1 
    questionTag="North America"
    options={["Toronto", "Vancouver", "Ottawa", "Montreal"]}
    correctAnswer={2}
    explanation="Ottawa became Canada's capital in 1857, chosen by Queen Victoria."
/>

<McqCard 
    question="Which city serves as the administrative capital of South Africa?" 
    questionNumber=2 
    questionTag="Africa"
    options={["Cape Town", "Johannesburg", "Pretoria", "Durban"]}
    correctAnswer={2}
    explanation="South Africa has 3 capitals: Pretoria (administrative), Cape Town (legislative), Bloemfontein (judicial)."
/>

<McqCard 
    question="What is the capital of Turkey?" 
    questionNumber=3 
    questionTag="Asia"
    options={["Istanbul", "Ankara", "Izmir", "Antalya"]}
    correctAnswer={1}
    explanation="Ankara became capital in 1923, replacing Istanbul after the Ottoman Empire fell."
/>

<McqCard 
    question="Which is the capital of Australia?" 
    questionNumber=4 
    questionTag="Oceania"
    options={["Sydney", "Melbourne", "Canberra", "Perth"]}
    correctAnswer={2}
    explanation="Canberra was purpose-built as capital in 1913 to resolve Sydney-Melbourne rivalry."
/>

<McqCard 
    question="What is the capital of Brazil?" 
    questionNumber=5 
    questionTag="South America"
    options={["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"]}
    correctAnswer={2}
    explanation="Brasília became capital in 1960 to promote development of the interior."
/>

<McqCard 
    question="Which city is the capital of Switzerland?" 
    questionNumber=6 
    questionTag="Europe"
    options={["Zurich", "Geneva", "Bern", "Lucerne"]}
    correctAnswer={2}
    explanation="Bern has been the federal capital since 1848, though Switzerland has no official capital."
/>

<McqCard 
    question="What is the capital of Myanmar?" 
    questionNumber=7 
    questionTag="Asia"
    options={["Yangon", "Mandalay", "Naypyidaw", "Bagan"]}
    correctAnswer={2}
    explanation="Military government moved capital to Naypyidaw from Yangon in 2005."
/>

<McqCard 
    question="Capital of New Zealand?" 
    questionNumber=8 
    questionTag="Oceania"
    options={["Auckland", "Christchurch", "Wellington", "Queenstown"]}
    correctAnswer={2}
    explanation="Wellington became capital in 1865, southernmost capital in the world."
/>

<McqCard 
    question="Which city is the capital of Morocco?" 
    questionNumber=9 
    questionTag="Africa"
    options={["Casablanca", "Marrakech", "Rabat", "Fes"]}
    correctAnswer={2}
    explanation="Rabat has been capital since 1912 under French protectorate."
/>

<McqCard 
    question="What is the capital of Argentina?" 
    questionNumber=10 
    questionTag="South America"
    options={["Buenos Aires", "Córdoba", "Rosario", "Mendoza"]}
    correctAnswer={0}
    explanation="Buenos Aires is both capital and largest city of Argentina."
/>

<McqCard 
    question="Capital of Saudi Arabia?" 
    questionNumber=11 
    questionTag="Asia"
    options={["Mecca", "Medina", "Riyadh", "Jeddah"]}
    correctAnswer={2}
    explanation="Riyadh has been capital since Saudi state formation in 1932."
/>

<McqCard 
    question="Which city is the capital of Germany?" 
    questionNumber=12 
    questionTag="Europe"
    options={["Frankfurt", "Munich", "Berlin", "Hamburg"]}
    correctAnswer={2}
    explanation="Berlin became capital again in 1990 after German reunification."
/>

<McqCard 
    question="Capital of Afghanistan?" 
    questionNumber=13 
    questionTag="Asia"
    options={["Kandahar", "Herat", "Mazar-i-Sharif", "Kabul"]}
    correctAnswer={3}
    explanation="Kabul has been Afghanistan's capital since 1776."
/>

<McqCard 
    question="What is the capital of Iceland?" 
    questionNumber=14 
    questionTag="Europe"
    options={["Reykjavík", "Akureyri", "Kópavogur", "Hafnarfjörður"]}
    correctAnswer={0}
    explanation="Reykjavík is world's northernmost national capital."
/>

<McqCard 
    question="Capital of Bolivia?" 
    questionNumber=15 
    questionTag="South America"
    options={["La Paz", "Sucre", "Santa Cruz", "Cochabamba"]}
    correctAnswer={1}
    explanation="Sucre is constitutional capital, while La Paz is administrative capital."
/>

<McqCard 
    question="Which is the capital of Nigeria?" 
    questionNumber=16 
    questionTag="Africa"
    options={["Lagos", "Abuja", "Kano", "Ibadan"]}
    correctAnswer={1}
    explanation="Abuja became capital in 1991 replacing Lagos."
/>

<McqCard 
    question="Capital of Vietnam?" 
    questionNumber=17 
    questionTag="Asia"
    options={["Ho Chi Minh City", "Da Nang", "Hanoi", "Hai Phong"]}
    correctAnswer={2}
    explanation="Hanoi has been capital since reunification in 1976."
/>

<McqCard 
    question="What is the capital of Sweden?" 
    questionNumber=18 
    questionTag="Europe"
    options={["Gothenburg", "Malmö", "Stockholm", "Uppsala"]}
    correctAnswer={2}
    explanation="Stockholm has been Sweden's capital since 1523."
/>

<McqCard 
    question="Capital of Egypt?" 
    questionNumber=19 
    questionTag="Africa"
    options={["Alexandria", "Giza", "Cairo", "Luxor"]}
    correctAnswer={2}
    explanation="Cairo has been Egypt's capital since 969 AD."
/>

<McqCard 
    question="Which city is the capital of Japan?" 
    questionNumber=20 
    questionTag="Asia"
    options={["Osaka", "Kyoto", "Tokyo", "Hiroshima"]}
    correctAnswer={2}
    explanation="Tokyo became capital in 1868 after Emperor Meiji's restoration."
/>

<McqCard 
    question="Capital of Peru?" 
    questionNumber=21 
    questionTag="South America"
    options={["Lima", "Cusco", "Arequipa", "Trujillo"]}
    correctAnswer={0}
    explanation="Lima has been capital since Spanish colonial times (1535)."
/>

<McqCard 
    question="What is the capital of Finland?" 
    questionNumber=22 
    questionTag="Europe"
    options={["Helsinki", "Espoo", "Tampere", "Turku"]}
    correctAnswer={0}
    explanation="Helsinki became capital in 1812 under Russian rule."
/>

<McqCard 
    question="Capital of North Korea?" 
    questionNumber=23 
    questionTag="Asia"
    options={["Kaesong", "Pyongyang", "Hamhung", "Chongjin"]}
    correctAnswer={1}
    explanation="Pyongyang has been capital since North Korea's 1948 establishment."
/>

<McqCard 
    question="Which is the capital of Jamaica?" 
    questionNumber=24 
    questionTag="North America"
    options={["Montego Bay", "Kingston", "Portmore", "Spanish Town"]}
    correctAnswer={1}
    explanation="Kingston became capital in 1872 after major earthquake."
/>

<McqCard 
    question="Capital of Uzbekistan?" 
    questionNumber=25 
    questionTag="Asia"
    options={["Samarkand", "Bukhara", "Tashkent", "Khiva"]}
    correctAnswer={2}
    explanation="Tashkent became capital in 1930 under Soviet rule."
/>
</section>

<style>
	.contact {
		padding: var(--space-l) var(--space-m);
	}
</style>
