import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Code,
  Trophy,
  Users,
  Calendar,
  ArrowRight,
  Star,
  Play,
  Terminal,
  Zap,
  Brain,
  GitBranch,
  Coffee,
  Rocket,
} from "lucide-react";
import { challengeService } from "../service/api";

const Homee = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [typedText, setTypedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [activeChallenges, setActiveChallenges] = useState([]);
  const [error, setError] = useState(null);

  const codeWords = [
    "React",
    "Python",
    "TypeScript",
    "JavaScript",
    "Go",
    "Rust",
  ];

  // Charger les challenges depuis l'API
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await challengeService.getAll();
        if (response.success && response.data) {
          // Mapper les challenges de l'API au format attendu par le composant
          const mappedChallenges = response.data.map((challenge) => ({
            id: challenge._id,
            title: challenge.title,
            description: challenge.description,
            difficulty: challenge.difficulty,
            participants: Math.floor(Math.random() * 200) + 50, // Temporaire
            timeLeft: calculateTimeLeft(challenge.endDate),
            featured: challenge.status === 'active',
            tags: challenge.technologies || [],
            prize: "À définir", // Temporaire
            language: determineChallengeType(challenge.technologies),
          }));
          setActiveChallenges(mappedChallenges);
        }
      } catch (err) {
        console.error('Erreur lors du chargement des challenges:', err);
        setError(err.message);
        // Fallback sur des données par défaut en cas d'erreur
        setActiveChallenges(getDefaultChallenges());
      } finally {
        setIsLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  // Fonction helper pour calculer le temps restant
  const calculateTimeLeft = (endDate) => {
    const end = new Date(endDate);
    const now = new Date();
    const diff = end - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? `${days}d` : 'Terminé';
  };

  // Fonction helper pour déterminer le type de challenge
  const determineChallengeType = (technologies) => {
    if (!technologies || technologies.length === 0) return 'Full-Stack';
    const tech = technologies.join(' ').toLowerCase();
    if (tech.includes('react') || tech.includes('vue') || tech.includes('angular')) return 'Frontend';
    if (tech.includes('node') || tech.includes('express') || tech.includes('django')) return 'Backend';
    if (tech.includes('rust') || tech.includes('go') || tech.includes('c++')) return 'Systems';
    return 'Full-Stack';
  };

  // Challenges par défaut en cas d'erreur API
  const getDefaultChallenges = () => [
    {
      id: 1,
      title: "Real-time Chat App",
      description:
        "WebSocket + React. Créez Slack mais en mieux. Multi-room, file sharing, typing indicators.",
      difficulty: "Expert",
      participants: 89,
      timeLeft: "8d",
      featured: true,
      tags: ["WebSocket", "React", "Node.js", "Redis"],
      prize: "2500€",
      language: "Full-Stack",
    },
    {
      id: 2,
      title: "CLI Tool Builder",
      description:
        "Rust ou Go. Un outil CLI qui simplifie le workflow dev. Think 'git' mais pour votre domaine.",
      difficulty: "Expert",
      participants: 67,
      timeLeft: "12d",
      featured: true,
      tags: ["Rust", "Go", "CLI", "DevOps"],
      prize: "2000€",
      language: "Systems",
    },
    {
      id: 3,
      title: "API Rate Limiter",
      description:
        "Middleware intelligent. Redis + algorithms. Gère 100k req/s sans broncher.",
      difficulty: "Intermediate",
      participants: 124,
      timeLeft: "15d",
      featured: false,
      tags: ["Node.js", "Redis", "Docker"],
      prize: "1000€",
      language: "Backend",
    },
    {
      id: 4,
      title: "React Hook Library",
      description:
        "Custom hooks réutilisables. TypeScript strict. Tests unitaires requis.",
      difficulty: "Beginner",
      participants: 203,
      timeLeft: "20d",
      featured: false,
      tags: ["React", "TypeScript", "Jest"],
      prize: "500€",
      language: "Frontend",
    },
  ];

  // Animation de typing pour le hero
  useEffect(() => {
    const word = codeWords[currentWordIndex];
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= word.length) {
        setTypedText(word.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setCurrentWordIndex((prev) => (prev + 1) % codeWords.length);
        }, 2000);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, [currentWordIndex]);

  const newsSlides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop",
      title: "Challenge Full-Stack Winners",
      description:
        "3 devs ont créé des apps révolutionnaires avec des stacks modernes. Découvrez leurs solutions créatives.",
      date: "2 days ago",
      category: "Winners",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=1200&h=600&fit=crop",
      title: "New: AI/ML Challenge",
      description:
        "Construisez un modèle d'IA qui prédit les tendances tech. TensorFlow, PyTorch, toutes les libs autorisées.",
      date: "5 days ago",
      category: "New Challenge",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&h=600&fit=crop",
      title: "Dev Meetup: Code Review",
      description:
        "Session live avec nos senior devs. Code review, tips, et Q&A sur vos projets de challenge.",
      date: "1 week ago",
      category: "Community",
    },
  ];

  const teamMembers = [
    {
      name: "Alex Chen",
      role: "Tech Lead",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      specialty: "Rust • Go • Distributed Systems",
      github: "@alexchen",
    },
    {
      name: "Maya Rodriguez",
      role: "Senior Frontend",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      specialty: "React • TypeScript • Design Systems",
      github: "@mayarod",
    },
    {
      name: "Kai Nakamura",
      role: "DevOps Expert",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      specialty: "Kubernetes • AWS • Terraform",
      github: "@kainaka",
    },
    {
      name: "Sarah Kim",
      role: "AI/ML Engineer",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      specialty: "Python • TensorFlow • MLOps",
      github: "@sarahkim",
    },
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Expert":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      case "Intermediate":
      case "Moyen":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "Beginner":
      case "Facile":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  const getLanguageIcon = (lang) => {
    switch (lang) {
      case "Frontend":
        return <Code className="w-4 h-4" />;
      case "Backend":
        return <Terminal className="w-4 h-4" />;
      case "Full-Stack":
        return <Zap className="w-4 h-4" />;
      case "Systems":
        return <GitBranch className="w-4 h-4" />;
      default:
        return <Code className="w-4 h-4" />;
    }
  };

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % newsSlides.length);
  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + newsSlides.length) % newsSlides.length
    );

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <Terminal className="w-8 h-8 text-blue-400 animate-pulse" />
            <span className="text-2xl font-mono text-white">DevChallenge</span>
          </div>
          <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  const featuredChallenges = activeChallenges.filter((c) => c.featured);
  const regularChallenges = activeChallenges.filter((c) => !c.featured);
 
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden py-16 lg:py-0 top-0">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300D9FF' fill-opacity='1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-teal-900/20" />

        {/* Content (Le conteneur de tout le contenu) */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* NOUVEAU: Grid pour la disposition Gauche/Droite */}
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8 items-center text-center lg:text-left">
            {/* Colonne de Gauche (Le Contenu Principal existant) */}
            <div className="lg:pr-8">
              <div className="mb-6">
                <div className="inline-flex lg:self-start lg:mx-0 items-center gap-3 px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full mb-6 mx-auto">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm text-gray-300 font-mono">
                    Live challenges running
                  </span>
                </div>

                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
                    Code.
                  </span>
                  <br className="lg:hidden" />
                  <span className="bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Compete.
                  </span>
                  <br />
                  <span className="text-white">Conquer.</span>
                </h1>

                <div className="text-xl sm:text-2xl text-gray-400 mb-6 font-mono">
                  <span>Master </span>
                  <span className="text-blue-400 font-bold">
                    {typedText}
                    <span className="animate-pulse">|</span>
                  </span>
                  <span> challenges</span>
                </div>
              </div>

              <p className="text-lg text-gray-300 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Rejoignez la communauté de développeurs la plus active. Relevez
                des challenges techniques, montrez vos skills, et gagnez des
                prix.
              </p>

              {/* J'ai ajusté la justification pour la version Desktop (lg:justify-start) */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                <button className="group px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center gap-2">
                  <Rocket className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Start Coding
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
                  <Terminal className="w-4 h-4" />
                  Explore Challenges
                </button>
              </div>

              {/* Stats - J'ai retiré le max-w-2xl pour qu'il s'étende plus facilement dans la colonne */}
              <div className="grid grid-cols-3 gap-4 lg:gap-8 mx-auto w-full">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    1.2k+
                  </div>
                  <div className="text-gray-400 text-sm font-mono">
                    Active Developers
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">
                    80+
                  </div>
                  <div className="text-gray-400 text-sm font-mono">
                    Challenges Solved
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-400 mb-2">
                    45k€
                  </div>
                  <div className="text-gray-400 text-sm font-mono">
                    Total Rewards
                  </div>
                </div>
              </div>
            </div>

            {/* Colonne de Droite (Vide, prête à accueillir un élément visuel) */}
            <div className="hidden lg:flex justify-center items-center h-full">
              {/*
          *** C'est là que vous pouvez mettre une image, une illustration SVG, une vidéo, etc. ***
          Exemple : <img src="/votre-image.svg" alt="Illustration" className="w-full max-w-md" />
          Ou un simple espace pour l'instant :
        */}
              <div className="w-full h-80 bg-gray-800/50 rounded-xl border border-gray-700 flex items-center justify-center">
                <span className="text-gray-500">
                  Espace pour l'Image / Illustration
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Carousel */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Latest Updates
            </h2>
            <p className="text-gray-400">Stay updated with the dev community</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-2xl bg-gray-800 border border-gray-700">
              {newsSlides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`transition-all duration-700 ${
                    index === currentSlide ? "block" : "hidden"
                  }`}
                >
                  <div className="md:flex">
                    <div className="md:w-1/2">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-64 md:h-80 object-cover"
                      />
                    </div>
                    <div className="md:w-1/2 p-8 flex flex-col justify-center">
                      <div className="inline-flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-mono rounded-full border border-blue-500/30">
                          {slide.category}
                        </span>
                        <span className="text-gray-500 text-sm font-mono">
                          {slide.date}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{slide.title}</h3>
                      <p className="text-gray-400 mb-6 leading-relaxed">
                        {slide.description}
                      </p>
                      <button className="self-start px-6 py-2 text-blue-400 hover:text-blue-300 font-medium transition-colors flex items-center gap-2">
                        Read more <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-gray-800/90 border border-gray-600 text-gray-300 rounded-full hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-gray-800/90 border border-gray-600 text-gray-300 rounded-full hover:text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {newsSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide ? "bg-blue-400 w-8" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Challenges */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Featured Challenges
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Premium challenges with bigger rewards and real-world impact
            </p>
          </div>

          {/* Featured Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {featuredChallenges.map((challenge) => (
              <div
                key={challenge.id}
                className="group relative bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-2xl p-8 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
                        {getLanguageIcon(challenge.language)}
                      </div>
                      <div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-mono border ${getDifficultyColor(
                            challenge.difficulty
                          )}`}
                        >
                          {challenge.difficulty}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-mono">Featured</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4">{challenge.title}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {challenge.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {challenge.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-800/50 text-gray-300 rounded-full text-sm font-mono border border-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-6 text-sm">
                    <div className="flex items-center gap-4 text-gray-400">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span className="font-mono">
                          {challenge.participants}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span className="font-mono">{challenge.timeLeft}</span>
                      </div>
                    </div>
                    <div className="text-green-400 font-bold font-mono">
                      {challenge.prize}
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2">
                    <Play className="w-5 h-5" />
                    Accept Challenge
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Regular Challenges */}
          <div className="grid md:grid-cols-2 gap-6">
            {regularChallenges.map((challenge) => (
              <div
                key={challenge.id}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-gray-800 rounded-md border border-gray-700">
                      {getLanguageIcon(challenge.language)}
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-mono border ${getDifficultyColor(
                        challenge.difficulty
                      )}`}
                    >
                      {challenge.difficulty}
                    </span>
                  </div>
                  <div className="text-green-400 font-bold text-sm font-mono">
                    {challenge.prize}
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3">{challenge.title}</h3>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                  {challenge.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {challenge.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-800 text-gray-300 rounded-md text-xs font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span className="font-mono">
                        {challenge.participants}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span className="font-mono">{challenge.timeLeft}</span>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm">
                    Join
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-teal-900/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_50%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-full mb-8">
              <Coffee className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-300 font-mono">
                Fueled by coffee & code
              </span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-bold mb-8">
              Ready to{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                level up
              </span>
              ?
            </h2>

            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Join thousands of developers pushing their limits. Learn, compete,
              win.
              <br />
              No fluff, just pure coding challenges.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="group px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center gap-3">
                <Brain className="w-6 h-6 group-hover:scale-110 transition-transform" />
                Start Your Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-10 py-5 border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 font-bold text-lg rounded-lg transition-all duration-300">
                Browse Challenges
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Core Team</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Senior engineers who review your code and guide the community
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="group text-center">
                <div className="relative mb-6">
                  <div className="relative overflow-hidden rounded-2xl w-48 h-48 mx-auto bg-gray-800 border border-gray-700 group-hover:border-blue-500/50 transition-all duration-300">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="text-xs font-mono text-blue-400 mb-1">
                        {member.github}
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-blue-400 font-medium mb-2">{member.role}</p>
                <p className="text-gray-400 text-sm font-mono">
                  {member.specialty}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homee;
