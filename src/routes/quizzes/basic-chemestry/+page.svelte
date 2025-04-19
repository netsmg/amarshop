<script>
	import PageTitle from '$lib/components/PageTitle.svelte';
	import McqCard from '$lib/components/mcq/TestCard.svelte';
</script>

<svelte:head>
	<title> Basic chemetry| Mcq Store</title>
	<meta name="description" content="Mcq Store basic chemestry" />
</svelte:head>

<PageTitle pageTitle="Basic chemestry" />

<section class="contact">
   
<McqCard 
 question="রাসায়নিক বিক্রিয়া কাকে বলে?"
 questionNumber=1 
 questionTag="রাসায়নিক বিক্রিয়া"
 options={["পদার্থের ভৌত অবস্থার পরিবর্তন", "পদার্থের রাসায়নিক গঠনের পরিবর্তন", "পদার্থের আয়তনের পরিবর্তন", "পদার্থের রঙের পরিবর্তন"]}
 correctAnswer={1}
 explanation="রাসায়নিক বিক্রিয়া হলো এমন একটি প্রক্রিয়া যেখানে পদার্থের রাসায়নিক গঠন পরিবর্তিত হয় এবং নতুন পদার্থ সৃষ্টি হয়।"
/>
<McqCard 
 question="নিচের কোনটি একটি রাসায়নিক বিক্রিয়ার উদাহরণ?"
 questionNumber=2 
 questionTag="রাসায়নিক বিক্রিয়া"
 options={["পানির বাষ্পীভবন", "লোহার মরিচা পড়া", "কাচের গলন", "চিনির দ্রবীভবন"]}
 correctAnswer={1}
 explanation="লোহার মরিচা পড়া একটি রাসায়নিক বিক্রিয়া, কারণ এতে লোহা অক্সিজেনের সাথে বিক্রিয়া করে নতুন পদার্থ (আয়রন অক্সাইড) তৈরি করে।"
/>
<McqCard 
 question="পর্যায় সারণীতে মোট কয়টি মৌল রয়েছে?"
 questionNumber=3 
 questionTag="পর্যায় সারণী"
 options={["108", "112", "118", "120"]}
 correctAnswer={2}
 explanation="বর্তমানে পর্যায় সারণীতে 118টি মৌল পরিচিত, যার মধ্যে প্রাকৃতিক এবং কৃত্রিম মৌল রয়েছে।"
/>
<McqCard 
 question="সংযোজন বিক্রিয়া কী?"
 questionNumber=4 
 questionTag="রাসায়নিক বিক্রিয়া"
 options={["দুটি পদার্থ মিলে একটি পদার্থ তৈরি করে", "একটি পদার্থ ভেঙে দুটি পদার্থ তৈরি হয়", "একটি পদার্থ অন্য পদার্থে রূপান্তরিত হয়", "কোনো পদার্থের গঠন পরিবর্তন হয় না"]}
 correctAnswer={0}
 explanation="সংযোজন বিক্রিয়ায় দুই বা ততোধিক পদার্থ মিলিত হয়ে একটি নতুন পদার্থ তৈরি করে। উদাহরণ: 2H₂ + O₂ → 2H₂O।"
/>
<McqCard 
 question="পর্যায় সারণীতে গ্রুপ 1-এর মৌলগুলো কী নামে পরিচিত?"
 questionNumber=5 
 questionTag="পর্যায় সারণী"
 options={["নোবেল গ্যাস", "ক্ষার ধাতু", "হ্যালোজেন", "ট্রানজিশন ধাতু"]}
 correctAnswer={1}
 explanation="গ্রুপ 1-এর মৌলগুলো (যেমন, সোডিয়াম, পটাশিয়াম) ক্ষার ধাতু নামে পরিচিত কারণ এরা পানির সাথে বিক্রিয়া করে ক্ষার তৈরি করে।"
/>
<McqCard 
 question="নিচের কোনটি একটি বিশ্লেষণ বিক্রিয়া?"
 questionNumber=6 
 questionTag="রাসায়নিক বিক্রিয়া"
 options={["CaCO₃ → CaO + CO₂", "2H₂ + O₂ → 2H₂O", "Na + Cl → NaCl", "H₂O + CO₂ → H₂CO₃"]}
 correctAnswer={0}
 explanation="বিশ্লেষণ বিক্রিয়ায় একটি যৌগ ভেঙে দুই বা ততোধিক পদার্থে বিভক্ত হয়। উদাহরণ: CaCO₃ → CaO + CO₂।"
/>
<McqCard 
 question="পর্যায় সারণীতে গ্রুপ 18-এর মৌলগুলো কী নামে পরিচিত?"
 questionNumber=7 
 questionTag="পর্যায় সারণী"
 options={["ক্ষার ধাতু", "হ্যালোজেন", "নোবেল গ্যাস", "অ্যাকটিনাইড"]}
 correctAnswer={2}
 explanation="গ্রুপ 18-এর মৌলগুলো (যেমন, হিলিয়াম, নিয়ন) নোবেল গ্যাস নামে পরিচিত কারণ এরা সাধারণত বিক্রিয়াহীন।"
/>
<McqCard 
 question="অক্সিডেশন বিক্রিয়ায় কী ঘটে?"
 questionNumber=8 
 questionTag="রাসায়নিক বিক্রিয়া"
 options={["ইলেকট্রন গ্রহণ", "ইলেকট্রন হ্রাস", "ইলেকট্রন ত্যাগ", "কোনো পরিবর্তন হয় না"]}
 correctAnswer={2}
 explanation="অক্সিডেশনে পদার্থ ইলেকট্রন ত্যাগ করে এবং অক্সিজেনের সাথে মিলিত হয় বা অক্সিডেশন সংখ্যা বৃদ্ধি পায়।"
/>
<McqCard 
 question="পর্যায় সারণীতে হ্যালোজেন মৌলগুলো কোন গ্রুপে অবস্থিত?"
 questionNumber=9 
 questionTag="পর্যায় সারণী"
 options={["গ্রুপ 1", "গ্রুপ 2", "গ্রুপ 17", "গ্রুপ 18"]}
 correctAnswer={2}
 explanation="হ্যালোজেন মৌলগুলো (যেমন, ফ্লোরিন, ক্লোরিন) পর্যায় সারণীর গ্রুপ 17-এ অবস্থিত।"
/>
<McqCard 
question="নিচের কোনটি একটি রেডক্স বিক্রিয়া?"
questionNumber=10 
questionTag="রাসায়নিক বিক্রিয়া"
options={["NaCl + AgNO₃ → AgCl + NaNO₃", "Cu + 2AgNO₃ → Cu(NO₃)₂ + 2Ag", "HCl + NaOH → NaCl + H₂O", "CaCO₃ → CaO + CO₂"]}
correctAnswer={1}
explanation="রেডক্স বিক্রিয়ায় অক্সিডেশন এবং রিডাকশন একসাথে ঘটে। Cu + 2AgNO₃ বিক্রিয়ায় Cu অক্সিডাইজড এবং Ag রিডিউসড হয়।"
/>
<McqCard 
question="পর্যায় সারণীতে মৌলগুলো কীভাবে সাজানো হয়?"
questionNumber=11 
questionTag="পর্যায় সারণী"
options={["পরমাণু ভর অনুসারে", "পরমাণু সংখ্যা অনুসারে", "ঘনত্ব অনুসারে", "গলনাঙ্ক অনুসারে"]}
correctAnswer={1}
explanation="পর্যায় সারণীতে মৌলগুলো তাদের পরমাণু সংখ্যা (প্রোটন সংখ্যা) এর ক্রমানুসারে সাজানো হয়।"
/>
<McqCard 
question="একটি বিক্রিয়ায় তাপ নির্গত হলে তাকে কী বলে?"
questionNumber=12 
questionTag="রাসায়নিক বিক্রিয়া"
options={["তাপগ্রাহী", "তাপদায়ী", "বিশ্লেষণ", "সংযোজন"]}
correctAnswer={1}
explanation="তাপদায়ী বিক্রিয়ায় তাপ নির্গত হয়, যেমন দহন বিক্রিয়া।"
/>
<McqCard 
question="পর্যায় সারণীর প্রথম মৌল কোনটি?"
questionNumber=13 
questionTag="পর্যায় সারণী"
options={["হিলিয়াম", "হাইড্রোজেন", "লিথিয়াম", "বেরিলিয়াম"]}
correctAnswer={1}
explanation="হাইড্রোজেন (পরমাণু সংখ্যা 1) পর্যায় সারণীর প্রথম মৌল।"
/>
<McqCard 
question="নিচের কোনটি একটি তাপগ্রাহী বিক্রিয়া?"
questionNumber=14 
questionTag="রাসায়নিক বিক্রিয়া"
options={["C + O₂ → CO₂", "N₂ + 3H₂ → 2NH₃", "CH₄ + 2O₂ → CO₂ + 2H₂O", "2H₂ + O₂ → 2H₂O"]}
correctAnswer={1}
explanation="তাপগ্রাহী বিক্রিয়ায় তাপ শোষিত হয়। N₂ + 3H₂ → 2NH₃ বিক্রিয়ায় তাপ শোষণের প্রয়োজন হয়।"
/>
<McqCard 
question="পর্যায় সারণীতে ট্রানজিশন ধাতুগুলো কোথায় অবস্থিত?"
questionNumber=15 
questionTag="পর্যায় সারণী"
options={["গ্রুপ 1-2", "গ্রুপ 3-12", "গ্রুপ 13-18", "পিরিয়ড 1-2"]}
correctAnswer={1}
explanation="ট্রানজিশন ধাতুগুলো (যেমন, আয়রন, কপার) পর্যায় সারণীর গ্রুপ 3 থেকে 12-এ অবস্থিত।"
/>
<McqCard 
question="নিচের কোন বিক্রিয়ায় প্রবল উৎপাদ তৈরি হয়?"
questionNumber=16 
questionTag="রাসায়নিক বিক্রিয়া"
options={["HCl + NaOH → NaCl + H₂O", "NaCl + AgNO₃ → AgCl + NaNO₃", "CaCO₃ → CaO + CO₂", "2H₂ + O₂ → 2H₂O"]}
correctAnswer={1}
explanation="NaCl + AgNO₃ → AgCl + NaNO₃ বিক্রিয়ায় AgCl একটি অদ্রবণীয় প্রবল উৎপাদ তৈরি করে।"
/>
<McqCard 
question="পর্যায় সারণীর পিরিয়ড সংখ্যা কী নির্দেশ করে?"
questionNumber=17 
questionTag="পর্যায় সারণী"
options={["ইলেকট্রন শেলের সংখ্যা", "প্রোটন সংখ্যা", "নিউট্রন সংখ্যা", "ভ্যালেন্স ইলেকট্রন"]}
correctAnswer={0}
explanation="পিরিয়ড সংখ্যা মৌলের পরমাণুর ইলেকট্রন শেলের সংখ্যা নির্দেশ করে।"
/>
<McqCard 
question="নিচের কোনটি একটি দ্বি-বিস্থাপন বিক্রিয়া?"
questionNumber=18 
questionTag="রাসায়নিক বিক্রিয়া"
options={["2H₂ + O₂ → 2H₂O", "NaCl + AgNO₃ → AgCl + NaNO₃", "CaCO₃ → CaO + CO₂", "C + O₂ → CO₂"]}
correctAnswer={1}
explanation="দ্বি-বিস্থাপন বিক্রিয়ায় দুটি যৌগের মধ্যে আয়ন বিনিময় হয়। উদাহরণ: NaCl + AgNO₃ → AgCl + NaNO₃।"
/>
<McqCard 
question="পর্যায় সারণীতে কোন মৌলটি ধাতু এবং অধাতুর মধ্যবর্তী বৈশিষ্ট্য প্রদর্শন করে?"
questionNumber=19 
questionTag="পর্যায় সারণী"
options={["সোডিয়াম", "ক্লোরিন", "সিলিকন", "অক্সিজেন"]}
correctAnswer={2}
explanation="সিলিকন একটি ধাতুকল্প মৌল, যা ধাতু এবং অধাতুর মধ্যবর্তী বৈশিষ্ট্য প্রদর্শন করে।"
/>
<McqCard 
question="একটি বিক্রিয়ার হার বৃদ্ধি পায় কোন কারণে?"
questionNumber=20 
questionTag="রাসায়নিক বিক্রিয়া"
options={["তাপমাত্রা হ্রাস", "ঘনত্ব হ্রাস", "উৎপ্রেরক ব্যবহার", "পৃষ্ঠের ক্ষেত্রফল হ্রাস"]}
correctAnswer={2}
explanation="উৎপ্রেরক বিক্রিয়ার হার বৃদ্ধি করে কারণ এটি সক্রিয়ণ শক্তি কমায়।"
/>
<McqCard 
question="পর্যায় সারণীতে কোন গ্রুপের মৌলগুলো সবচেয়ে বেশি বিক্রিয়াশীল?"
questionNumber=21 
questionTag="পর্যায় সারণী"
options={["গ্রুপ 1", "গ্রুপ 2", "গ্রুপ 17", "গ্রুপ 18"]}
correctAnswer={0}
explanation="গ্রুপ 1-এর ক্ষার ধাতুগুলো (যেমন, সোডিয়াম) সবচেয়ে বেশি বিক্রিয়াশীল কারণ এদের একটি ভ্যালেন্স ইলেকট্রন সহজে ত্যাগ করে।"
/>
<McqCard 
question="নিচের কোনটি একটি দহন বিক্রিয়া?"
questionNumber=22 
questionTag="রাসায়নিক বিক্রিয়া"
options={["CH₄ + 2O₂ → CO₂ + 2H₂O", "HCl + NaOH → NaCl + H₂O", "CaCO₃ → CaO + CO₂", "Na + Cl → NaCl"]}
correctAnswer={0}
explanation="দহন বিক্রিয়ায় পদার্থ অক্সিজেনের সাথে বিক্রিয়া করে তাপ ও আলো নির্গত করে। উদাহরণ: CH₄ + 2O₂ → CO₂ + 2H₂O।"
/>
<McqCard 
question="পর্যায় সারণীতে মৌলের পরমাণু ব্যাসার্ধ কীভাবে পরিবর্তিত হয়?"
questionNumber=23 
questionTag="পর্যায় সারণী"
options={["বাম থেকে ডানে বৃদ্ধি পায়", "বাম থেকে ডানে হ্রাস পায়", "উপর থেকে নিচে হ্রাস পায়", "কোনো পরিবর্তন হয় না"]}
correctAnswer={1}
explanation="পিরিয়ডে বাম থেকে ডানে গেলে পরমাণু ব্যাসার্ধ হ্রাস পায় কারণ পারমাণবিক আকর্ষণ বৃদ্ধি পায়।"
/>
<McqCard 
question="নিচের কোনটি রাসায়নিক সমীকরণের ভারসাম্য রক্ষার জন্য প্রয়োজনীয়?"
questionNumber=24 
questionTag="রাসায়নিক বিক্রিয়া"
options={["পরমাণুর সংখ্যা সমান রাখা", "তাপমাত্রা নিয়ন্ত্রণ", "উৎপ্রেরক ব্যবহার", "ঘনত্ব বৃদ্ধি"]}
correctAnswer={0}
explanation="রাসায়নিক সমীকরণের ভারসাম্য রক্ষার জন্য বিক্রিয়ক এবং উৎপাদের পরমাণুর সংখ্যা সমান রাখতে হয়।"
/>
<McqCard 
question="পর্যায় সারণীতে ল্যান্থানাইড এবং অ্যাকটিনাইড মৌলগুলো কোথায় অবস্থিত?"
questionNumber=25 
questionTag="পর্যায় সারণী"
options={["পিরিয়ড 1-2", "পিরিয়ড 6-7", "গ্রুপ 1-2", "গ্রুপ 17-18"]}
correctAnswer={1}
explanation="ল্যান্থানাইড এবং অ্যাকটিনাইড মৌলগুলো পর্যায় সারণীর পিরিয়ড 6 এবং 7-এ পৃথকভাবে তালিকাভুক্ত।"
/>
 
  </section>

<style>
	.contact {
		padding: var(--space-l) var(--space-m);
	}
</style>
