import React from 'react';

const Hero = () => {
  return (
    <section className="relative bg-gray-900 text-white py-24 px-4 overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 via-gray-900 to-gray-900 opacity-90"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(rgba(255,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,0,0.05) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}></div>

      {/* Glowing orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-red-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-gray-700 rounded-full blur-3xl opacity-10"></div>

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Flex container for two columns with increased spacing */}
        <div className="flex flex-col md:flex-row items-center gap-32 mb-12">
          {/* Left column: Text content */}
          <div className="w-full md:w-1/2 text-center md:text-left md:pr-8">
            <div className="inline-block mb-6">
              <span className="text-xs font-mono text-red-500 bg-red-950 px-3 py-1 rounded-full border border-red-800">
                {'<coding-challenges />'}
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
              Bhil<span className='text-7xl md:text-8xl text-red-600 drop-shadow-[0_0_25px_rgba(220,38,38,0.5)]'>$</span>
            </h1>
            <p className="text-2xl md:text-3xl mb-4 text-gray-200 font-light">
              Codez. Défiez. Gagnez.
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto md:mx-0 mb-12">
              La plateforme compétitive où les meilleurs développeurs s'affrontent sur des challenges techniques réels.
              Prouvez votre expertise et décrochez des récompenses.
            </p>
          </div>

          {/* Right column: Code preview */}
          <div className="w-full md:w-1/2 md:pl-8">
            <div className="relative rounded-2xl bg-gradient-to-br from-gray-800/80 to-purple-900/40 border border-gray-700/50 backdrop-blur-xl p-8 overflow-hidden">
              {/* Code snippet */}
              <div className="space-y-3 font-mono text-sm mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-gray-500">1</span>
                  <span className="text-purple-400">function</span>
                  <span className="text-cyan-400">solveChallenge</span>
                  <span className="text-gray-300">() {"{"}</span>
                </div>
                <div className="flex items-start gap-3 ml-6">
                  <span className="text-gray-500">2</span>
                  <span className="text-gray-400">const</span>
                  <span className="text-cyan-400">result</span>
                  <span className="text-gray-400">= await</span>
                  <span className="text-yellow-400">execute</span>
                  <span className="text-gray-400">();</span>
                </div>
                <div className="flex items-start gap-3 ml-6">
                  <span className="text-gray-500">3</span>
                  <span className="text-pink-400">return</span>
                  <span className="text-cyan-400">result</span>
                  <span className="text-gray-400">;</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gray-500">4</span>
                  <span className="text-gray-300">{"}"}</span>
                </div>
              </div>

              {/* Badges */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 bg-green-500/20 border border-green-500/50 rounded-lg px-3 py-2 backdrop-blur-sm">
                  <span className="text-green-400 text-xs font-semibold">✓ Tests passed</span>
                </div>
                <div className="flex gap-3">
                  <div className="flex items-center gap-2 bg-orange-500/20 border border-orange-500/50 rounded-lg px-3 py-2 backdrop-blur-sm">
                    <span className="text-orange-400 text-xs font-semibold">🏆 +50 XP</span>
                  </div>
                  <div className="flex items-center gap-2 bg-purple-500/20 border border-purple-500/50 rounded-lg px-3 py-2 backdrop-blur-sm">
                    <span className="text-purple-400 text-xs font-semibold">⚡ Streak: 7</span>
                  </div>
                </div>
              </div>

              {/* Glow effects */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-500 rounded-full blur-3xl opacity-20"></div>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 hover:border-red-600 transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.3)] hover:scale-105">
            <div className="text-4xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent mb-2">42</div>
            <div className="text-xs uppercase tracking-wider text-gray-400 font-mono">Challenges</div>
          </div>
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 hover:border-red-600 transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.3)] hover:scale-105">
            <div className="text-4xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent mb-2">256</div>
            <div className="text-xs uppercase tracking-wider text-gray-400 font-mono">Devs actifs</div>
          </div>
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 hover:border-red-600 transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.3)] hover:scale-105">
            <div className="text-4xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent mb-2">15K€</div>
            <div className="text-xs uppercase tracking-wider text-gray-400 font-mono">Prize pool</div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mb-12">
          <button className="group relative bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-10 rounded-lg transition-all duration-300 hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] hover:scale-105">
            <span className="relative z-10">Commencer maintenant</span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>

        {/* Feature badges */}
        <div className="grid md:grid-cols-3 gap-4 text-center text-sm">
          <div className="flex items-center justify-center gap-2 bg-green-500/10 border border-green-500/30 rounded-lg px-4 py-2 backdrop-blur-sm">
            <span className="text-green-500 font-bold">✓</span>
            <span className="text-green-400">Challenges quotidiens</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-green-500/10 border border-green-500/30 rounded-lg px-4 py-2 backdrop-blur-sm">
            <span className="text-green-500 font-bold">✓</span>
            <span className="text-green-400">Classement en temps réel</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-green-500/10 border border-green-500/30 rounded-lg px-4 py-2 backdrop-blur-sm">
            <span className="text-green-500 font-bold">✓</span>
            <span className="text-green-400">Récompenses garanties</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
