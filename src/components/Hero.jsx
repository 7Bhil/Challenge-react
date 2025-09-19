const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">ChallengeHub</h1>
        <p className="text-xl mb-10 opacity-90">
          La plateforme ultime pour les développeurs qui aiment relever des défis techniques
        </p>
        
        <div className="flex justify-center gap-10 mb-10">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold">42</span>
            <span className="text-sm opacity-80">Challenges</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold">256</span>
            <span className="text-sm opacity-80">Participants</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold">15</span>
          </div>
        </div>
        
        <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-full transition duration-300 transform hover:-translate-y-1">
          Voir les défis en cours
        </button>
      </div>
    </section>
  );
};

export default Hero;