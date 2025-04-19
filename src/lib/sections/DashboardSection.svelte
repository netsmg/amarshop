<script>
    
   import { Book,
  Clock, AutoFlash, Cross, Checkmark } from '$lib/icons';
  
    export let user = {
        name: "Alex Chen",
        avatar: "/avatars/testimonial-01.jpg",
        stats: {
            totalQuizzes: 24,
            averageScore: 82,
            successRate: 91
        }
    };

    let performanceData = [
        { date: 'Mon', score: 75 },
        { date: 'Tue', score: 82 },
        { date: 'Wed', score: 78 },
        { date: 'Thu', score: 89 },
        { date: 'Fri', score: 95 },
        { date: 'Sat', score: 88 },
        { date: 'Sun', score: 91 }
    ];

    const recentAttempts = [
        { quiz: "Web Fundamentals", date: "2024-03-15", score: 92, passed: true },
        { quiz: "React Advanced", date: "2024-03-14", score: 78, passed: true },
        { quiz: "Database Design", date: "2024-03-13", score: 65, passed: false }
    ];

    const availableQuizzes = [
        { title: "JavaScript ES6+", questions: 15, topic: "Programming", progress: 60 },
        { title: "UI/UX Principles", questions: 20, topic: "Design", progress: 30 },
        { title: "Cloud Basics", questions: 18, topic: "DevOps", progress: 45 }
    ];
</script>

<div class="dashboard-container">
    <!-- Header Section -->
    <header class="dashboard-header">
        <div class="header-left">
            <h1>Quiz Dashboard</h1>
            <div class="user-greeting">
                <img src={user.avatar} alt="User avatar" />
                <p>Good morning, <strong>{user.name}</strong></p>
            </div>
        </div>
        
        <div class="header-stats">
            <div class="stat-card">
                <span class="stat-value">{user.stats.totalQuizzes}</span>
                <span class="stat-label">Total Quizzes</span>
            </div>
            <div class="stat-card">
                <span class="stat-value">{user.stats.averageScore}%</span>
                <span class="stat-label">Avg. Score</span>
            </div>
            <div class="stat-card">
                <span class="stat-value">{user.stats.successRate}%</span>
                <span class="stat-label">Success Rate</span>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main class="dashboard-main">
        <!-- Performance Chart -->
        <div class="card performance-card">
            <h2>Weekly Performance</h2>
            <div class="chart-container">
                <svg viewBox="0 0 500 200">
                    {#each performanceData as point, i (i)}
                        <path d="M {i * 70} {200 - point.score * 2} 
                               L {(i + 1) * 70} {200 - performanceData[i + 1]?.score * 2 || 200 - point.score * 2}"
                              class="chart-line" />
                        <circle cx={i * 70} cy={200 - point.score * 2} r="4" class="chart-point" />
                    {/each}
                </svg>
            </div>
        </div>

        <!-- Recent Activity -->
        <div class="card recent-activity">
            <h2>Recent Attempts</h2>
            <div class="attempts-list">
                {#each recentAttempts as attempt}
                    <div class="attempt-item {attempt.passed ? 'passed' : 'failed'}">
                        <div class="attempt-icon">
                            {#if attempt.passed}
                                <Checkmark />
                            {:else}
                                <Cross />
                            {/if}
                        </div>
                        <div class="attempt-info">
                            <h3>{attempt.quiz}</h3>
                            <p>{attempt.date} • Score: {attempt.score}%</p>
                        </div>
                        <div class="attempt-time">45m</div>
                    </div>
                {/each}
            </div>
        </div>

        <!-- Available Quizzes -->
        <div class="card quizzes-list">
            <h2>Continue Learning</h2>
            <div class="quiz-grid">
                {#each availableQuizzes as quiz}
                    <div class="quiz-card">
                        <div class="quiz-header">
                            <h3>{quiz.title}</h3>
                            <span class="questions-count">{quiz.questions} questions</span>
                        </div>
                        <div class="quiz-meta">
                            <span class="topic-badge">{quiz.topic}</span>
                            <div class="progress-bar">
                                <div class="progress-fill" style={`width: ${quiz.progress}%`} />
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>

        <!-- Quick Actions -->
        <div class="card quick-actions">
            <h2>Quick Actions</h2>
            <div class="actions-grid">
                <button class="action-btn">
                    <div class="icon-wrapper">
                        <Clock />
                    </div>
                    <span>New Quiz</span>
                </button>
                <button class="action-btn">
                    <div class="icon-wrapper">
                        <Book />
                    </div>
                    <span>Import Questions</span>
                </button>
                <button class="action-btn">
                    <div class="icon-wrapper">
                        <AutoFlash />
                    </div>
                    <span>View Analytics</span>
                </button>
                <button class="action-btn">
                    <div class="icon-wrapper">
                        <Book />
                    </div>
                    <span>Preferences</span>
                </button>
            </div>
        </div>
    </main>
</div>

<style>
    :global(body) {
        --dashboard-bg: #f5f7fa;
        --card-bg: #ffffff;
        --primary-500: #6366f1;
        --success-500: #22c55e;
        --error-500: #ef4444;
        --text-100: #1f2937;
        --text-200: #4b5563;
        --text-300: #6b7280;
    }

    .dashboard-container {
        max-width: 1440px;
        margin: 0 auto;
        padding: 2rem;
        background: var(--dashboard-bg);
        min-height: 100vh;
    }

    .dashboard-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
    }

    .user-greeting {
        display: flex;
        align-items: center;
        gap: 1rem;
        
        img {
            width: 45px;
            height: 45px;
            border-radius: 50%;
        }
        
        p {
            font-size: 1.25rem;
            color: var(--text-200);
        }
    }

    .header-stats {
        display: flex;
        gap: 1.5rem;
    }

    .stat-card {
        background: var(--card-bg);
        padding: 1.5rem;
        border-radius: 12px;
        text-align: center;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        min-width: 120px;
        
        .stat-value {
            display: block;
            font-size: 1.75rem;
            font-weight: 600;
            color: var(--primary-500);
        }
        
        .stat-label {
            color: var(--text-300);
            font-size: 0.9rem;
        }
    }

    .dashboard-main {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
    }

    .card {
        background: var(--card-bg);
        border-radius: 16px;
        padding: 1.5rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        
        h2 {
            margin: 0 0 1.5rem 0;
            font-size: 1.25rem;
            color: var(--text-100);
        }
    }

    .performance-card {
        grid-column: span 2;
        
        .chart-container {
            height: 300px;
            
            svg {
                width: 100%;
                height: 100%;
            }
            
            .chart-line {
                stroke: var(--primary-500);
                stroke-width: 2;
                fill: none;
            }
            
            .chart-point {
                fill: var(--primary-500);
            }
        }
    }

    .attempt-item {
        display: flex;
        align-items: center;
        padding: 1rem;
        margin-bottom: 1rem;
        border-radius: 8px;
        background: var(--dashboard-bg);
        
        &.passed {
            border-left: 4px solid var(--success-500);
        }
        
        &.failed {
            border-left: 4px solid var(--error-500);
        }
        
        .attempt-icon {
            margin-right: 1rem;
            
            svg {
                width: 24px;
                height: 24px;
            }
        }
        
        .attempt-info {
            flex-grow: 1;
            
            h3 {
                margin: 0 0 0.25rem 0;
                font-size: 1rem;
            }
            
            p {
                margin: 0;
                color: var(--text-300);
                font-size: 0.9rem;
            }
        }
        
        .attempt-time {
            color: var(--text-300);
            font-size: 0.9rem;
        }
    }

    .quiz-card {
        padding: 1rem;
        border-radius: 8px;
        background: var(--dashboard-bg);
        transition: transform 0.2s ease;
        
        &:hover {
            transform: translateY(-2px);
        }
        
        .quiz-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.5rem;
            
            h3 {
                margin: 0;
                font-size: 1rem;
            }
            
            .questions-count {
                font-size: 0.8rem;
                color: var(--text-300);
            }
        }
        
        .topic-badge {
            background: var(--primary-500);
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.8rem;
        }
        
        .progress-bar {
            height: 6px;
            background: rgba(0,0,0,0.1);
            border-radius: 3px;
            margin-top: 1rem;
            
            .progress-fill {
                height: 100%;
                background: var(--primary-500);
                border-radius: 3px;
                transition: width 0.3s ease;
            }
        }
    }

    .actions-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 1rem;
        
        .action-btn {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 1.5rem;
            background: var(--dashboard-bg);
            border: none;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.2s ease;
            
            &:hover {
                background: var(--primary-500);
                color: white;
                
                .icon-wrapper {
                    background: rgba(255,255,255,0.2);
                }
            }
            
            .icon-wrapper {
                width: 48px;
                height: 48px;
                background: var(--card-bg);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 1rem;
                
                svg {
                    width: 24px;
                    height: 24px;
                }
            }
        }
    }

    @media (max-width: 768px) {
        .dashboard-header {
            flex-direction: column;
            gap: 1.5rem;
            align-items: flex-start;
        }
        
        .performance-card {
            grid-column: span 1;
        }
    }
</style>
