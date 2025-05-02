<script>
    import { borderAnimation, decodeAnimation, revealAnimation } from '$lib/actions/animation';
    import { Book, Clock, Search, AutoFlash, ArrowRight } from '$lib/icons';
    import { fade, fly } from 'svelte/transition';

    let testimonials = [
        {
            name: "Sarah Johnson",
            role: "Med Student",
            text: "Boosted my exam scores by 40%! The interactive quizzes are game-changers.",
            avatar: "/avatars/sarah.jpg"
        },
        {
            name: "Mike Chen",
            role: "Developer",
            text: "Best way to keep skills sharp. Love the instant explanations!",
            avatar: "/avatars/mike.jpg"
        },
        {
            name: "Emma Wilson",
            role: "Teacher",
            text: "My students adore the quiz challenges. Engagement skyrocketed!",
            avatar: "/avatars/emma.jpg"
        }
    ];

    let trendingQuizzes = [
        {
            title: "JavaScript Mastery",
            category: "Programming",
            questions: 25,
            difficulty: "Advanced",
            attempts: "1.2K"
        },
        {
            title: "Human Anatomy",
            category: "Biology",
            questions: 30,
            difficulty: "Intermediate",
            attempts: "890"
        },
        {
            title: "World Capitals",
            category: "Geography",
            questions: 50,
            difficulty: "Easy",
            attempts: "2.4K"
        }
    ];
</script>

<section class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-slate-50 px-4 py-16 md:py-24">
    <div class="max-w-7xl mx-auto">
        <!-- Hero Section -->
        <div class="max-w-3xl mx-auto text-center mb-16">
            <h1 class="text-5xl md:text-6xl font-bold leading-tight mb-8">
                <span class="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
                    Transform Learning
                </span>
                Through Smart Practice
            </h1>

            <div class="flex items-center bg-white/5 backdrop-blur-sm rounded-full border border-white/10 transition-transform duration-300 max-w-2xl mx-auto mb-12">
                <Search class="w-6 h-6 ml-6 text-indigo-300" />
                <input 
                    type="text" 
                    placeholder="Discover 1000+ quizzes across 50+ subjects..." 
                    class="flex-1 bg-transparent px-6 py-4 text-lg placeholder:text-slate-400 focus:outline-none" 
                />
                <button class="bg-indigo-500 text-white px-8 py-3 rounded-full font-semibold m-1 hover:bg-indigo-600 transition-all">
                    Explore
                </button>
            </div>

            <div class="flex justify-center gap-16 mt-12">
                <div class="text-center">
                    <div class="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        500K+
                    </div>
                    <div class="text-sm text-slate-400 uppercase tracking-wider mt-2">
                        Daily Challenges
                    </div>
                </div>
                <div class="text-center">
                    <div class="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        98%
                    </div>
                    <div class="text-sm text-slate-400 uppercase tracking-wider mt-2">
                        Success Rate
                    </div>
                </div>
            </div>
        </div>

        <!-- Trending Quizzes -->
        <div class="my-24">
            <h2 class="text-4xl font-bold text-center mb-12">Trending in Your Field</h2>
            <div class="flex overflow-x-auto pb-8 gap-6 px-2 scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-slate-800">
                {#each trendingQuizzes as quiz}
                    <div class="min-w-[320px] bg-slate-800/50 rounded-2xl border border-slate-700/50 hover:border-indigo-400 transition-all">
                        <div class="h-48 bg-gradient-to-r from-indigo-500 to-pink-500 relative p-4">
                            <div class="absolute top-4 right-4 bg-black/30 text-white px-4 py-1 rounded-full text-sm">
                                {quiz.category}
                            </div>
                        </div>
                        <div class="p-6">
                            <h3 class="text-xl font-bold mb-4">{quiz.title}</h3>
                            <div class="flex justify-between text-slate-400 text-sm mb-4">
                                <span class="flex items-center gap-2">
                                    <Book class="w-5 h-5" />
                                    {quiz.questions} Questions
                                </span>
                                <span class="flex items-center gap-2">
                                    <AutoFlash class="w-5 h-5" />
                                    {quiz.difficulty}
                                </span>
                            </div>
                            <div class="flex justify-between items-center text-sm">
                                <span class="flex items-center gap-2 text-slate-400">
                                    <Clock class="w-5 h-5" />
                                    {quiz.attempts} attempts
                                </span>
                                <button class="bg-indigo-500 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-indigo-600 transition-transform">
                                    Start Now <ArrowRight class="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>

        <!-- Features -->
        <div class="my-24">
            <h2 class="text-4xl font-bold text-center mb-12">Why Learners Choose Us</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 px-4">
                {#each [
                    { icon: Book, title: 'Comprehensive Library', text: 'Daily updated questions across all subjects' },
                    { icon: AutoFlash, title: 'AI Analysis', text: 'Detailed performance breakdowns' },
                    { icon: Clock, title: 'Timed Drills', text: 'Simulate real exam conditions' },
                    { icon: Book, title: 'Global Ranking', text: 'Compete with learners worldwide' },
                    { icon: Clock, title: 'Progress Tracking', text: 'Visual learning journey mapping' }
                ] as feature}
                    <div class="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 text-center hover:bg-slate-700/50 transition-all">
                        <feature.icon class="w-16 h-16 mx-auto mb-6 text-indigo-400" />
                        <h3 class="text-xl font-bold mb-4">{feature.title}</h3>
                        <p class="text-slate-400">{feature.text}</p>
                    </div>
                {/each}
            </div>
        </div>

        <!-- Testimonials -->
        <div class="my-24">
            <h2 class="text-4xl font-bold text-center mb-12">Success Stories</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                {#each testimonials as testimonial}
                    <div class="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6 text-center relative pt-24">
                        <div class="absolute -top-16 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full border-4 border-indigo-500 overflow-hidden">
                            <img src={testimonial.avatar} alt={testimonial.name} class="w-full h-full object-cover" />
                        </div>
                        <p class="text-slate-300 mb-6 min-h-[120px]">"{testimonial.text}"</p>
                        <div class="border-t border-slate-700 pt-6">
                            <div class="font-bold">{testimonial.name}</div>
                            <div class="text-slate-400 text-sm">{testimonial.role}</div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</section>
