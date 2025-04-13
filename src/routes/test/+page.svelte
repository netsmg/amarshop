<script>
	import PageTitle from '$lib/components/PageTitle.svelte';
	import McqCard from '$lib/components/mcq/TestCard.svelte';
</script>

<svelte:head>
	<title>Test | Amar Shop</title>
	<meta name="description" content="Give mcq" />
</svelte:head>

<PageTitle pageTitle="Test" />

<section class="contact">
	<McqCard
    question="Which language runs in a web browser?" 
   questionNumber=1 
  questionTag="General"
    options={["Java", "C", "Python", "JavaScript"]}
    correctAnswer={3}
    explanation="JavaScript is the programming language of the Web."
/>
<McqCard
    question="Which company developed the React library?"
    options={["Google", "Facebook", "Microsoft", "Amazon"]}
    correctAnswer={1}
    explanation="React was developed by Facebook in 2013."
/>
<McqCard
    question="What does HTML stand for?"
    options={[
        "Hyper Trainer Marking Language",
        "Hyper Text Marketing Language",
        "Hyper Text Markup Language",
        "Hyper Tool Multi Language"
    ]}
    correctAnswer={2}
    explanation="HTML stands for Hyper Text Markup Language."
/>
<McqCard
    question="Which of the following is a NoSQL database?"
    options={["MySQL", "PostgreSQL", "MongoDB", "Oracle"]}
    correctAnswer={2}
    explanation="MongoDB is a popular NoSQL database."
/>
<McqCard
    question="Which HTTP method is used to update a resource?"
    options={["GET", "POST", "PUT", "DELETE"]}
    correctAnswer={2}
    explanation="PUT is used to update an existing resource."
/>
<McqCard
    question="What is the default port for HTTP?"
    options={["21", "80", "443", "3306"]}
    correctAnswer={1}
    explanation="Port 80 is the default for HTTP."
/>
<McqCard
    question="Which of the following is a JavaScript framework?"
    options={["Django", "Laravel", "Vue.js", "Flask"]}
    correctAnswer={2}
    explanation="Vue.js is a progressive JavaScript framework."
/>
<McqCard
    question="What does CSS stand for?"
    options={[
        "Cascading Style Sheets",
        "Creative Style System",
        "Computer Style Syntax",
        "Colorful Style Sheets"
    ]}
    correctAnswer={0}
    explanation="CSS stands for Cascading Style Sheets."
/>
<McqCard
    question="What does API stand for?"
    options={[
        "Application Programming Interface",
        "Advanced Programming Integration",
        "Application Processing Interface",
        "Applied Program Internet"
    ]}
    correctAnswer={0}
    explanation="API stands for Application Programming Interface."
/>
<McqCard
    question="Which language is known for its snake logo?"
    options={["Java", "Python", "Ruby", "Go"]}
    correctAnswer={1}
    explanation="Python is known for its association with snakes."
/>
<McqCard
    question="What is the primary language used for iOS development?"
    options={["Swift", "Kotlin", "Java", "Objective-C"]}
    correctAnswer={0}
    explanation="Swift is the primary language used for iOS development."
/>
<McqCard
    question="What does SQL stand for?"
    options={[
        "Structured Query Language",
        "Strong Question Language",
        "Structured Query List",
        "Simple Query Language"
    ]}
    correctAnswer={0}
    explanation="SQL stands for Structured Query Language."
/>
<McqCard
    question="Which company developed the Java programming language?"
    options={["Microsoft", "Sun Microsystems", "IBM", "Google"]}
    correctAnswer={1}
    explanation="Java was developed by Sun Microsystems."
/>
<McqCard
    question="Which of the following is an example of a backend programming language?"
    options={["JavaScript", "HTML", "PHP", "CSS"]}
    correctAnswer={2}
    explanation="PHP is widely used for backend development."
/>
<McqCard
    question="Which operator is used for string concatenation in JavaScript?"
    options={["+", "-", "*", "/"]}
    correctAnswer={0}
    explanation="The '+' operator is used for string concatenation."
/>
<McqCard
    question="What does JSON stand for?"
    options={[
        "JavaScript Object Notation",
        "Java Serialized Object Notation",
        "JavaScript Online Notation",
        "Java Server Object Network"
    ]}
    correctAnswer={0}
    explanation="JSON stands for JavaScript Object Notation."
/>
<McqCard
    question="Which of these is a version control system?"
    options={["Git", "Docker", "Kubernetes", "Jenkins"]}
    correctAnswer={0}
    explanation="Git is a widely used version control system."
/>
<McqCard
    question="Which ECMAScript version introduced classes in JavaScript?"
    options={["ES5", "ES6", "ES7", "ES8"]}
    correctAnswer={1}
    explanation="ES6 introduced classes to JavaScript."
/>
<McqCard
    question="Which of the following is NOT a programming paradigm?"
    options={["Object-Oriented", "Functional", "Procedural", "Emotional"]}
    correctAnswer={3}
    explanation="Emotional is not a programming paradigm."
/>
<McqCard
    question="Which HTML tag is used to create a hyperlink?"
    options={["<a>", "<link>", "<href>", "<hyper>"]}
    correctAnswer={0}
    explanation="The <a> tag is used to define hyperlinks."
/>
<McqCard
    question="What is the purpose of the CSS box model?"
    options={[
        "Layout margins, borders, padding, and content",
        "Create media queries",
        "Define animation styles",
        "Specify the HTML structure"
    ]}
    correctAnswer={0}
    explanation="The box model is used to layout elements with margins, borders, padding, and content."
/>
<McqCard
    question="Which of the following best describes DevOps?"
    options={[
        "A programming language",
        "A software development practice",
        "A type of database",
        "A UI design methodology"
    ]}
    correctAnswer={1}
    explanation="DevOps is a set of practices that combines software development and IT operations."
/>
<McqCard
    question="Which company is known for the Android operating system?"
    options={["Apple", "Microsoft", "Google", "IBM"]}
    correctAnswer={2}
    explanation="Google is the company behind the Android OS."
/>
<McqCard
    question="What is Node.js primarily used for?"
    options={["Frontend development", "Backend development", "Database management", "Mobile app development"]}
    correctAnswer={1}
    explanation="Node.js is primarily used for backend development using JavaScript."
/>
<McqCard
    question="Which protocol is used for secure communication over the Internet?"
    options={["HTTP", "FTP", "SMTP", "HTTPS"]}
    correctAnswer={3}
    explanation="HTTPS is the secure version of HTTP."
/>
<McqCard
    question="Which programming language is used for statistical analysis and data visualization?"
    options={["R", "Python", "Java", "C++"]}
    correctAnswer={0}
    explanation="R is especially popular in statistics and data visualization."
/>

	

</section>

<style>
	.contact {
		padding: var(--space-l) var(--space-m);
	}
</style>
