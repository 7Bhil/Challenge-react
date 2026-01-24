import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Code,
  Trophy,
  Medal,
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
  Heart,
} from "lucide-react";
import { challengeService, userService, getRoleAvatar } from "../service/api";
import { Link } from "react-router-dom";
import { teamData } from "../data/team";

const Homee = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [topUsers, setTopUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeChallenges, setActiveChallenges] = useState([]);
  const [typedText, setTypedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [error, setError] = useState(null);
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);

  const codeWords = [
    "React",
    "Python",
    "TypeScript",
    "JavaScript",
    "Go",
    "Rust",
  ];

  // Charger les challenges et le leaderboard depuis l'API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [challengesRes, leaderboardRes] = await Promise.all([
          challengeService.getAll(),
          userService.getLeaderboard()
        ]);

        if (challengesRes.success && challengesRes.data) {
          const mappedChallenges = challengesRes.data.map((challenge) => ({
            id: challenge._id,
            title: challenge.title,
            description: challenge.description,
            difficulty: challenge.difficulty,
            participants: 0,
            timeLeft: calculateTimeLeft(challenge.endDate),
            featured: challenge.status === 'active',
            tags: challenge.technologies || [],
            prize: "Accès Premium",
            language: determineChallengeType(challenge.technologies),
          }));
          setActiveChallenges(mappedChallenges);
        }

        if (leaderboardRes.success && leaderboardRes.data) {
          setTopUsers(leaderboardRes.data.slice(0, 3));
        }
      } catch (err) {
        console.error('Erreur lors du chargement des données:', err);
        setError(err.message);
        setActiveChallenges(getDefaultChallenges());
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const newsSlides = [
    {
      id: 1,
      title: "Nouveau Défi : Maîtrise de React 19",
      description: "Plongez dans les dernières fonctionnalités de React 19 et les patterns de rendu concurrent. Prouvez votre expertise sur la toute dernière version.",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1200",
      category: "Frameworks",
      date: "24 Oct, 2024"
    },
    {
      id: 2,
      title: "Hackathon FinTech : L'Avenir des Paiements",
      description: "Rejoignez notre hackathon exclusif axé sur la création de passerelles de paiement sécurisées et l'intégration de la blockchain.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
      category: "FinTech",
      date: "02 Nov, 2024"
    }
  ];

  const teamMembers = teamData.friends;
  const creator = teamData.creator;

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % newsSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + newsSlides.length) % newsSlides.length);

  // Auto-scroll effect
  useEffect(() => {
    if (isAutoScrollPaused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoScrollPaused, newsSlides.length]);

  const calculateTimeLeft = (date) => {
    const total = Date.parse(date) - Date.parse(new Date());
    if (total < 0) return "Terminé";
    const days = Math.floor(total / (1000 *60 * 60 * 24));
    return `${days}j restants`;
  };

  const determineChallengeType = (tech) => {
    if (!tech) return "JS";
    const t = String(tech).toLowerCase();
    if (t.includes('react')) return "React";
    if (t.includes('python')) return "Python";
    if (t.includes('node')) return "Node";
    return "JS";
  };

  const getLanguageIcon = (lang) => {
    switch (lang) {
      case "React": return <Code className="w-5 h-5 text-blue-400" />;
      case "Python": return <Terminal className="w-5 h-5 text-yellow-400" />;
      default: return <Zap className="w-5 h-5 text-purple-400" />;
    }
  };

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case "Facile": return "text-green-400 border-green-400/30 bg-green-400/10";
      case "Difficile": return "text-red-400 border-red-400/30 bg-red-400/10";
      default: return "text-yellow-400 border-yellow-400/30 bg-yellow-400/10";
    }
  };

  const getDefaultChallenges = () => [
     { id: 1, title: 'Challenge Loading...', description: 'Please wait...', difficulty: 'Moyen', participants: 0, timeLeft: '...', featured: true, tags: [], prize: '...', language: 'JS' }
  ];

  if (isLoading) {
    // ... loading state unchanged ...
  }

  const featuredChallenges = activeChallenges.filter((c) => c.featured);
  const regularChallenges = activeChallenges.filter((c) => !c.featured);
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-teal-900/20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 lg:py-0">
  {/* ... Hero content unchanged ... */}
  <div className="absolute inset-0 opacity-10">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300D9FF' fill-opacity='1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}
    />
  </div>

  <div className="absolute inset-0" />

  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex items-center">
    {/* Modifié ici : Supprimé h-full de la grid, ajouté flex items-center sur le conteneur parent */}
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8 items-center text-center lg:text-left w-full">
      <div className="lg:pr-8">
        <div className="mb-6">
          <div className="inline-flex lg:self-start lg:mx-0 items-center gap-3 px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full mb-6 mx-auto">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-gray-300 font-mono">
              Codons peu, codons mieux
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
              Codez.
            </span>
            <br className="lg:hidden" />
            <span className="bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Affrontez.
            </span>
            <br />
            <span className="text-white italic">Dominez.</span>
          </h1>

          <div className="text-xl sm:text-2xl text-gray-400 mb-6 font-mono">
            <span>Maîtrisez les </span>
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-black px-2">
              {typedText}
              <span className="animate-pulse text-purple-500">|</span>
            </span>
            <span> défis</span>
          </div>
        </div>

        <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
          Propulsez votre carrière avec la plateforme de challenge technique la plus dynamique. Résolvez, apprenez, et connectez-vous avec les meilleurs.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-14">
          <Link 
            to={isAuth ? "/challenges" : "/register"}
            className="group px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black rounded-2xl transition-all duration-500 transform hover:scale-105 shadow-2xl shadow-blue-900/20 flex items-center justify-center gap-3"
          >
            <Rocket className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            Commencer l'aventure
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
          <Link 
            to="/challenges"
            className="px-10 py-5 bg-gray-900/50 border border-gray-800 text-gray-300 hover:text-white hover:bg-gray-800 hover:border-gray-700 font-bold rounded-2xl transition-all duration-300 backdrop-blur-xl flex items-center justify-center gap-3"
          >
            <Terminal className="w-5 h-5" />
            Explorer les Défis
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-8 justify-center lg:justify-start">
          <div className="space-y-1">
            <div className="text-3xl font-black text-white">1.2k+</div>
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Développeurs</div>
          </div>
          <div className="w-px h-10 bg-gray-800 hidden sm:block" />
          <div className="space-y-1">
            <div className="text-3xl font-black text-white">80+</div>
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Challenges</div>
          </div>
          <div className="w-px h-10 bg-gray-800 hidden sm:block" />
          <div className="space-y-1">
            <div className="text-3xl font-black text-white">45k€</div>
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Récompenses</div>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex justify-center items-center">
        {/* Podium Section */}
        <div className="w-full max-w-md p-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Trophy className="w-32 h-32" />
          </div>
          
          <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
            <Medal className="w-6 h-6 text-yellow-500" />
            Meilleurs Participants
          </h3>

          <div className="space-y-6">
            {topUsers.length > 0 ? topUsers.map((u, i) => (
              <Link 
                key={u._id || i} 
                to={`/profile/${u._id}`}
                className="flex items-center gap-4 group/user hover:bg-white/5 p-2 rounded-xl transition-all"
              >
                <div className="relative">
                  <img 
                    src={getRoleAvatar(u)} 
                    className={`w-12 h-12 rounded-full border-2 ${i === 0 ? 'border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.3)]' : 'border-gray-800 shadow-sm'}`}
                    alt={u.name}
                  />
                  <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-gray-900 ${i === 0 ? 'bg-yellow-500 text-black' : i === 1 ? 'bg-gray-300 text-black' : 'bg-orange-600 text-white'}`}>
                    {i + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-sm group-hover/user:text-blue-400 transition-colors">{u.name}</div>
                  <div className="text-xs text-gray-500">Lvl {u.level || 1} • {u.points || 0} pts</div>
                </div>
                <div className="text-xs font-mono text-gray-400">
                  Top {(i + 1) * 1}%
                </div>
              </Link>
            )) : (
              <div className="text-center py-10 text-gray-500 italic text-sm">
                Classement en cours...
              </div>
            )}
          </div>

          <Link to="/leaderboard" className="mt-8 block w-full py-3 bg-gray-800 hover:bg-gray-700 text-center rounded-xl text-sm font-semibold transition-all border border-gray-700">
            Voir le Classement
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* News Carousel */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Dernières Mises à Jour
            </h2>
            <p className="text-gray-400">Restez informé avec la communauté dev</p>
          </div>

          <div 
            className="relative max-w-4xl mx-auto"
            onMouseEnter={() => setIsAutoScrollPaused(true)}
            onMouseLeave={() => setIsAutoScrollPaused(false)}
          >
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
                      <Link 
                        to="/challenges"
                        className="self-start px-6 py-2 text-blue-400 hover:text-blue-300 font-medium transition-colors flex items-center gap-2"
                      >
                        Lire la suite <ArrowRight className="w-4 h-4" />
                      </Link>
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
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Défis à la Une
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Des défis premium avec des récompenses plus importantes et un impact réel
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
                      <span className="text-sm font-mono">Vedette</span>
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

                  <Link 
                    to={`/challenge/${challenge.id}`}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    <Play className="w-5 h-5" />
                    Accepter le Défi
                  </Link>
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
                  <Link 
                    to={`/challenge/${challenge.id}`}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm"
                  >
                    Rejoindre
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-full mb-8">
              <Coffee className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-300 font-mono">
                Fueled by coffee & code
              </span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-bold mb-8">
              Prêt à{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                progresser
              </span>
              ?
            </h2>

            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Rejoignez des milliers de développeurs qui repoussent leurs limites. Apprenez, concourez, gagnez.
              <br />
              Pas de chichi, juste du pur challenge technique.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                to={isAuth ? "/challenges" : "/register"}
                className="group px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center gap-3"
              >
                <Brain className="w-6 h-6 group-hover:scale-110 transition-transform" />
                Commencer l'aventure
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/challenges"
                className="px-10 py-5 border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 font-bold text-lg rounded-lg transition-all duration-300"
              >
                Parcourir les Défis
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Acknowledgements / Team Section */}
      <section className="py-24 relative overflow-hidden">
        
        <div className="max-w-7xl mx-auto px-5 relative z-10">
          <div className="text-center mb-20 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 rounded-full border border-purple-500/20 text-[10px] font-bold text-purple-400 uppercase tracking-[0.3em] mx-auto animate-bounce">
              <Heart className="w-3 h-3 fill-current" /> Nos Remerciements
            </div>
            <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter">
              Merci à ceux qui <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent underline decoration-purple-500/30 underline-offset-8">Propulsent l'Innovation</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">
              Une plateforme développée par des passionnés pour des passionnés. On salue les talents qui nous inspirent au quotidien.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={member.id} 
                className="group relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-gray-900 border border-gray-800 group-hover:border-purple-500/50 transition-all duration-500 shadow-xl group-hover:shadow-purple-500/10 group-hover:-translate-y-2">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100 grayscale hover:grayscale-0 transition-all"
                    style={{ objectPosition: member.objectPosition || 'center' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-60" />
                  
                  <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">{member.username}</div>
                    <div className="flex gap-2">
                         <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1 animate-pulse" />
                         <div className="text-xs text-gray-300 font-medium italic">{member.skill}</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-5 px-2">
                    <h3 className="text-lg font-bold group-hover:text-white transition-colors">{member.name}</h3>
                    <p className="text-sm text-gray-500 font-mono">{member.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Creator Focus */}
          <div className="mt-32 p-10 md:p-16 rounded-[4rem] bg-gradient-to-br from-gray-900 via-gray-900 to-purple-950/20 border border-gray-800 shadow-3xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                 <Rocket size={300} className="rotate-45" />
             </div>
             
             <div className="flex flex-col md:flex-row items-center gap-10 relative z-10 text-center md:text-left">
                <div className="relative">
                    <div className="w-40 h-40 md:w-48 md:h-48 rounded-[3rem] overflow-hidden border-4 border-white/5 shadow-2xl rotate-3 group hover:rotate-0 transition-transform duration-500">
                        <img src={creator.image} className="w-full h-full object-cover" alt={creator.name} />
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg border-4 border-gray-900">
                        <Code size={20} />
                    </div>
                </div>
                
                <div className="flex-1 space-y-4">
                    <h4 className="text-blue-400 font-bold uppercase tracking-[0.2em] text-xs">Propulsé par</h4>
                    <h3 className="text-4xl md:text-5xl font-black tracking-tighter italic text-white">{creator.name}</h3>
                    <p className="text-lg text-gray-400 font-medium leading-relaxed max-w-xl">
                        {creator.bio}
                    </p>
                    <div className="flex items-center gap-4 justify-center md:justify-start pt-4">
                        <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-xs font-bold text-gray-300">#OpenSource</div>
                        <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-xs font-bold text-gray-300">#WebDevelopment</div>
                    </div>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homee;
