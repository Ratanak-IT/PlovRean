"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';
import { CheckCircle, XCircle, Trophy, RotateCcw, ArrowRight, Code, Sparkles } from 'lucide-react';

// Quiz data for different topics
const quizData = {
  html: {
    title: 'HTML Fundamentals Quiz',
    description: 'Test your knowledge of HTML basics and advanced concepts',
    color: 'from-orange-400 to-red-500',
    questions: [
      {
        question: 'What does HTML stand for?',
        options: [
          'Hyper Text Markup Language',
          'High Tech Modern Language',
          'Home Tool Markup Language',
          'Hyperlinks and Text Markup Language'
        ],
        correctAnswer: 0
      },
      {
        question: 'Which HTML tag is used for the largest heading?',
        options: ['<heading>', '<h6>', '<h1>', '<head>'],
        correctAnswer: 2
      },
      {
        question: 'Which attribute is used to provide a unique identifier for an HTML element?',
        options: ['class', 'id', 'name', 'key'],
        correctAnswer: 1
      },
      {
        question: 'What is the correct HTML element for inserting a line break?',
        options: ['<break>', '<lb>', '<br>', '<newline>'],
        correctAnswer: 2
      },
      {
        question: 'Which HTML tag is used to define an internal style sheet?',
        options: ['<css>', '<script>', '<style>', '<styles>'],
        correctAnswer: 2
      },
      {
        question: 'What is the correct HTML for creating a hyperlink?',
        options: [
          '<a url="http://example.com">Link</a>',
          '<a href="http://example.com">Link</a>',
          '<a>http://example.com</a>',
          '<link>http://example.com</link>'
        ],
        correctAnswer: 1
      },
      {
        question: 'Which HTML element is used to specify a footer for a document?',
        options: ['<bottom>', '<section>', '<footer>', '<end>'],
        correctAnswer: 2
      },
      {
        question: 'What is the correct HTML for making a text input field?',
        options: [
          '<input type="text">',
          '<textfield>',
          '<input type="textfield">',
          '<textinput>'
        ],
        correctAnswer: 0
      },
      {
        question: 'Which HTML attribute specifies an alternate text for an image?',
        options: ['title', 'alt', 'src', 'caption'],
        correctAnswer: 1
      },
      {
        question: 'What is the correct HTML element for the document title?',
        options: ['<head>', '<title>', '<meta>', '<header>'],
        correctAnswer: 1
      }
    ]
  },
  css: {
    title: 'CSS Styling Quiz',
    description: 'Master your CSS skills with these challenging questions',
    color: 'from-blue-400 to-indigo-500',
    questions: [
      {
        question: 'What does CSS stand for?',
        options: [
          'Creative Style Sheets',
          'Cascading Style Sheets',
          'Computer Style Sheets',
          'Colorful Style Sheets'
        ],
        correctAnswer: 1
      },
      {
        question: 'Which CSS property is used to change the text color?',
        options: ['text-color', 'font-color', 'color', 'text-style'],
        correctAnswer: 2
      },
      {
        question: 'How do you add a background color in CSS?',
        options: [
          'background-color: blue;',
          'bg-color: blue;',
          'color-background: blue;',
          'background: color(blue);'
        ],
        correctAnswer: 0
      },
      {
        question: 'Which property is used to change the font of an element?',
        options: ['font-family', 'font-style', 'text-font', 'typeface'],
        correctAnswer: 0
      },
      {
        question: 'How do you make text bold in CSS?',
        options: [
          'font-weight: bold;',
          'text-style: bold;',
          'font: bold;',
          'text-weight: bold;'
        ],
        correctAnswer: 0
      },
      {
        question: 'Which CSS property controls the spacing between elements?',
        options: ['spacing', 'padding', 'margin', 'Both padding and margin'],
        correctAnswer: 3
      },
      {
        question: 'What is the correct CSS syntax for making all <p> elements bold?',
        options: [
          'p {font-weight: bold;}',
          '<p style="font-weight: bold;">',
          'p.bold',
          'p {text-size: bold;}'
        ],
        correctAnswer: 0
      },
      {
        question: 'How do you display a border like this: top border = 10px, bottom border = 5px, left = 20px, right = 1px?',
        options: [
          'border-width: 10px 1px 5px 20px;',
          'border-width: 10px 20px 5px 1px;',
          'border-width: 5px 20px 10px 1px;',
          'border-width: 20px 10px 1px 5px;'
        ],
        correctAnswer: 0
      },
      {
        question: 'Which property is used to change the left margin of an element?',
        options: ['margin-left', 'padding-left', 'indent', 'left-margin'],
        correctAnswer: 0
      },
      {
        question: 'What is the default value of the position property?',
        options: ['relative', 'fixed', 'absolute', 'static'],
        correctAnswer: 3
      }
    ]
  },
  javascript: {
    title: 'JavaScript Programming Quiz',
    description: 'Challenge yourself with JavaScript fundamentals and concepts',
    color: 'from-yellow-400 to-orange-500',
    questions: [
      {
        question: 'Which company developed JavaScript?',
        options: ['Microsoft', 'Netscape', 'Google', 'Mozilla'],
        correctAnswer: 1
      },
      {
        question: 'Which symbol is used for single line comments in JavaScript?',
        options: ['//', '/* */', '#', '--'],
        correctAnswer: 0
      },
      {
        question: 'Which operator is used to assign a value to a variable?',
        options: ['*', '=', '-', 'x'],
        correctAnswer: 1
      },
      {
        question: 'What will "typeof null" return?',
        options: ['null', 'undefined', 'object', 'number'],
        correctAnswer: 2
      },
      {
        question: 'Which method is used to parse a string to an integer?',
        options: ['parseInt()', 'parseFloat()', 'toInteger()', 'Number()'],
        correctAnswer: 0
      },
      {
        question: 'What is the correct syntax for a for loop?',
        options: [
          'for (i = 0; i < 5; i++)',
          'for i = 1 to 5',
          'for (i <= 5; i++)',
          'for (i = 0; i < 5)'
        ],
        correctAnswer: 0
      },
      {
        question: 'Which method adds an element to the end of an array?',
        options: ['push()', 'pop()', 'shift()', 'unshift()'],
        correctAnswer: 0
      },
      {
        question: 'What does DOM stand for?',
        options: [
          'Document Object Model',
          'Data Object Model',
          'Document Oriented Model',
          'Digital Object Model'
        ],
        correctAnswer: 0
      },
      {
        question: 'Which keyword is used to declare a constant in JavaScript?',
        options: ['var', 'let', 'const', 'constant'],
        correctAnswer: 2
      },
      {
        question: 'What is the result of "2" + 2 in JavaScript?',
        options: ['4', '"22"', '22', 'NaN'],
        correctAnswer: 1
      }
    ]
  },
  react: {
    title: 'React Framework Quiz',
    description: 'Test your React knowledge from basics to advanced',
    color: 'from-cyan-400 to-blue-500',
    questions: [
      {
        question: 'What is React?',
        options: [
          'A JavaScript library for building user interfaces',
          'A database management system',
          'A programming language',
          'A CSS framework'
        ],
        correctAnswer: 0
      },
      {
        question: 'Which company developed React?',
        options: ['Google', 'Facebook', 'Microsoft', 'Twitter'],
        correctAnswer: 1
      },
      {
        question: 'What is JSX?',
        options: [
          'A JavaScript extension',
          'JavaScript XML',
          'Java Syntax Extension',
          'JSON Extension'
        ],
        correctAnswer: 1
      },
      {
        question: 'Which method is used to update state in a React component?',
        options: ['updateState()', 'setState()', 'changeState()', 'modifyState()'],
        correctAnswer: 1
      },
      {
        question: 'What is the purpose of props in React?',
        options: [
          'To pass data from parent to child components',
          'To store component state',
          'To style components',
          'To handle events'
        ],
        correctAnswer: 0
      },
      {
        question: 'Which hook is used to manage state in functional components?',
        options: ['useEffect', 'useState', 'useContext', 'useReducer'],
        correctAnswer: 1
      },
      {
        question: 'What is the virtual DOM?',
        options: [
          'A real DOM element',
          'A lightweight copy of the actual DOM',
          'A database',
          'A CSS framework'
        ],
        correctAnswer: 1
      },
      {
        question: 'What does useEffect hook do?',
        options: [
          'Manages state',
          'Handles side effects',
          'Creates components',
          'Styles components'
        ],
        correctAnswer: 1
      },
      {
        question: 'What is the correct way to create a component in React?',
        options: [
          'function MyComponent() { return <div>Hello</div> }',
          'component MyComponent() { return <div>Hello</div> }',
          'create MyComponent() { return <div>Hello</div> }',
          'def MyComponent() { return <div>Hello</div> }'
        ],
        correctAnswer: 0
      },
      {
        question: 'What is the key prop used for in React lists?',
        options: [
          'To style list items',
          'To help React identify which items have changed',
          'To sort the list',
          'To filter the list'
        ],
        correctAnswer: 1
      }
    ]
  },
  python: {
    title: 'Python Programming Quiz',
    description: 'Evaluate your Python programming expertise',
    color: 'from-green-400 to-emerald-500',
    questions: [
      {
        question: 'What is Python?',
        options: [
          'A high-level programming language',
          'A type of snake',
          'A database',
          'A web browser'
        ],
        correctAnswer: 0
      },
      {
        question: 'Which keyword is used to define a function in Python?',
        options: ['function', 'def', 'func', 'define'],
        correctAnswer: 1
      },
      {
        question: 'What is the correct file extension for Python files?',
        options: ['.python', '.pt', '.py', '.pyt'],
        correctAnswer: 2
      },
      {
        question: 'Which operator is used for exponentiation in Python?',
        options: ['^', '**', 'exp', 'pow'],
        correctAnswer: 1
      },
      {
        question: 'How do you create a variable with the numeric value 5?',
        options: ['x = 5', 'int x = 5', 'x := 5', 'var x = 5'],
        correctAnswer: 0
      },
      {
        question: 'Which collection is ordered and changeable?',
        options: ['Tuple', 'Set', 'List', 'Dictionary'],
        correctAnswer: 2
      },
      {
        question: 'What does the len() function do?',
        options: [
          'Returns the length of an object',
          'Returns the type of an object',
          'Returns the value of an object',
          'Returns the name of an object'
        ],
        correctAnswer: 0
      },
      {
        question: 'How do you insert COMMENTS in Python code?',
        options: ['// This is a comment', '# This is a comment', '/* This is a comment */', '-- This is a comment'],
        correctAnswer: 1
      },
      {
        question: 'Which statement is used to stop a loop?',
        options: ['stop', 'exit', 'break', 'end'],
        correctAnswer: 2
      },
      {
        question: 'What is the output of print(2 ** 3)?',
        options: ['6', '8', '9', '5'],
        correctAnswer: 1
      }
    ]
  }
};

interface QuizPageProps {
  onNavigate?: (page: string) => void;
}

export default function QuizPage({ }: QuizPageProps) {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);

  const topics = [
    { id: 'html', name: 'HTML', icon: '🌐', color: 'from-orange-400 to-red-500' },
    { id: 'css', name: 'CSS', icon: '🎨', color: 'from-blue-400 to-indigo-500' },
    { id: 'javascript', name: 'JavaScript', icon: '⚡', color: 'from-yellow-400 to-orange-500' },
    { id: 'react', name: 'React', icon: '⚛️', color: 'from-cyan-400 to-blue-500' },
    { id: 'python', name: 'Python', icon: '🐍', color: 'from-green-400 to-emerald-500' },
  ];

  const startQuiz = (topicId: string) => {
    setSelectedTopic(topicId);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions(new Array(10).fill(false));
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (answeredQuestions[currentQuestion]) return; // Already answered
    
    setSelectedAnswer(answerIndex);
    const currentQuiz = quizData[selectedTopic as keyof typeof quizData];
    const isCorrect = answerIndex === currentQuiz.questions[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
    }

    // Mark question as answered
    const newAnswered = [...answeredQuestions];
    newAnswered[currentQuestion] = true;
    setAnsweredQuestions(newAnswered);
  };

  const handleNextQuestion = () => {
    const currentQuiz = quizData[selectedTopic as keyof typeof quizData];
    
    if (currentQuestion < currentQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setSelectedTopic(null);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions([]);
  };

  const retryQuiz = () => {
    if (selectedTopic) {
      startQuiz(selectedTopic);
    }
  };

  if (!selectedTopic) {
    return (
      <div className="min-h-screen bg-[#E7E9ED] dark:bg-gray-900 pt-20">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 text-center overflow-hidden bg-gray-100 dark:bg-gray-900">
  {/* Background Floating Orbs */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -top-32 -left-32 w-72 h-72 bg-emerald-400/20 dark:bg-emerald-500/20 rounded-full blur-3xl animate-float-slow" />
    <div
      className="absolute top-16 right-16 w-64 h-64 bg-cyan-400/20 dark:bg-cyan-500/20 rounded-full blur-3xl animate-float"
      style={{ animationDelay: "2s" }}
    />
    <div
      className="absolute bottom-8 left-1/3 w-56 h-56 bg-purple-400/20 dark:bg-purple-500/20 rounded-full blur-3xl animate-float"
      style={{ animationDelay: "4s" }}
    />
  </div>

  {/* Hero Content */}
  <div className="relative z-10 px-4 sm:px-6 lg:px-8">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center gap-4 max-w-3xl mx-auto"
    >
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
        <div className="w-14 h-14 bg-white/20 dark:bg-gray-800 rounded-xl flex items-center justify-center">
          <Sparkles className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
          AI-Powered Quiz Challenge
        </h1>
      </div>
      <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
        Test your coding knowledge with our AI-generated quizzes. Choose a topic and challenge yourself!
      </p>
    </motion.div>
  </div>
</section>



        {/* Topic Selection */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-gray-900 dark:text-white mb-4">Choose Your Quiz Topic</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Select a topic to start your 10-question challenge
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {topics.map((topic, index) => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <button
                    onClick={() => startQuiz(topic.id)}
                    className="w-full p-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 group"
                  >
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-3xl">{topic.icon}</span>
                    </div>
                    <h3 className="text-gray-900 dark:text-white mb-2 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
                      {topic.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      10 Questions
                    </p>
                    <div className="flex items-center justify-center gap-2 text-indigo-500 dark:text-indigo-400">
                      <span>Start Quiz</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  const currentQuiz = quizData[selectedTopic as keyof typeof quizData];
  const currentQuestionData = currentQuiz.questions[currentQuestion];

  if (showResult) {
    const percentage = (score / currentQuiz.questions.length) * 100;
    const passed = percentage >= 70;

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl w-full"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 text-center">
            <div className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br ${passed ? 'from-green-400 to-emerald-500' : 'from-orange-400 to-red-500'} flex items-center justify-center`}>
              {passed ? (
                <Trophy className="w-12 h-12 text-white" />
              ) : (
                <RotateCcw className="w-12 h-12 text-white" />
              )}
            </div>

            <h1 className="text-gray-900 dark:text-white mb-4">
              {passed ? 'Congratulations! 🎉' : 'Keep Practicing!'}
            </h1>
            
            <div className="mb-8">
              <div className="text-6xl font-bold text-gray-900 dark:text-white mb-2">
                {score}/{currentQuiz.questions.length}
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {percentage.toFixed(0)}% Correct
              </p>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg">
              {passed 
                ? "Excellent work! You've mastered this topic." 
                : "Don't give up! Review the material and try again."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={retryQuiz}
                className="px-8 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Try Again
              </button>
              <button
                onClick={resetQuiz}
                className="px-8 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                Choose Another Topic
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={resetQuiz}
            className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 mb-4 flex items-center gap-2"
          >
            ← Back to Topics
          </button>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-gray-900 dark:text-white">{currentQuiz.title}</h1>
            <div className="text-gray-600 dark:text-gray-400">
              Question {currentQuestion + 1} of {currentQuiz.questions.length}
            </div>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full bg-gradient-to-r ${currentQuiz.color} transition-all duration-300`}
              style={{ width: `${((currentQuestion + 1) / currentQuiz.questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-6"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className={`w-12 h-12 flex-shrink-0 rounded-xl bg-gradient-to-br ${currentQuiz.color} flex items-center justify-center`}>
              <Code className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-gray-900 dark:text-white flex-1">
              {currentQuestionData.question}
            </h2>
          </div>

          <div className="space-y-3">
            {currentQuestionData.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentQuestionData.correctAnswer;
              const showFeedback = answeredQuestions[currentQuestion];

              let bgColor = 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600';
              let borderColor = 'border-gray-200 dark:border-gray-600';
              let textColor = 'text-gray-900 dark:text-white';

              if (showFeedback) {
                if (isCorrect) {
                  bgColor = 'bg-green-50 dark:bg-green-900/20';
                  borderColor = 'border-green-500';
                  textColor = 'text-green-700 dark:text-green-400';
                } else if (isSelected && !isCorrect) {
                  bgColor = 'bg-red-50 dark:bg-red-900/20';
                  borderColor = 'border-red-500';
                  textColor = 'text-red-700 dark:text-red-400';
                }
              } else if (isSelected) {
                bgColor = 'bg-indigo-50 dark:bg-indigo-900/20';
                borderColor = 'border-indigo-500';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={answeredQuestions[currentQuestion]}
                  className={`w-full p-4 rounded-xl border-2 ${borderColor} ${bgColor} ${textColor} text-left transition-all duration-200 flex items-center justify-between group ${
                    !answeredQuestions[currentQuestion] ? 'cursor-pointer' : 'cursor-default'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      showFeedback && isCorrect
                        ? 'border-green-500 bg-green-500'
                        : showFeedback && isSelected && !isCorrect
                        ? 'border-red-500 bg-red-500'
                        : isSelected
                        ? 'border-indigo-500 bg-indigo-500'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}>
                      {showFeedback && isCorrect && (
                        <CheckCircle className="w-5 h-5 text-white" />
                      )}
                      {showFeedback && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-white" />
                      )}
                      {!showFeedback && (
                        <span className={isSelected ? 'text-white' : 'text-gray-500 dark:text-gray-400'}>
                          {String.fromCharCode(65 + index)}
                        </span>
                      )}
                    </span>
                    <span>{option}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <div className="text-gray-600 dark:text-gray-400">
            Score: <span className="text-gray-900 dark:text-white font-semibold">{score}</span>
          </div>
          <button
            onClick={handleNextQuestion}
            disabled={!answeredQuestions[currentQuestion]}
            className={`px-8 py-3 rounded-lg transition-all flex items-center gap-2 ${
              answeredQuestions[currentQuestion]
                ? 'bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed'
            }`}
          >
            {currentQuestion === currentQuiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
