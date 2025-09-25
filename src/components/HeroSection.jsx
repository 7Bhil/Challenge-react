import React from "react";

// Données mockées pour le carrousel d'actualités
const newsSlides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&h=300&fit=crop",
    title: "Challenge React Avancé : Gagnant Annoncé !",
    description:
      "Découvrez qui a remporté le challenge React avec une solution innovante utilisant les dernières features.",
    date: "Il y a 2 jours",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=300&fit-crop",
    title: "Nouveau Challenge: API GraphQL",
    description:
      "Un nouveau défi passionnant vous attend ! Créez une API GraphQL complète en 7 jours.",
    date: "Il y a 5 jours",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&h=300&fit-crop",
    title: "Meetup Dev: Retours sur les Challenges",
    description:
      "Rejoignez-nous pour un meetup exclusif avec les participants et les gagnants des derniers challenges.",
    date: "Il y a 1 semaine",
  },
];

const StoryHero = () => {
  return (
    <section className="relative w-full h-screen-1/2 bg-gray-100 overflow-hidden">
      <div className="flex w-full h-full overflow-x-scroll snap-x snap-mandatory">
        {newsSlides.map((slide, index) => (
          <div
            key={slide.id}
            className="flex-shrink-0 w-full h-full snap-start scroll-ml-6 relative"
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>

            {/* Contenu de la story */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h1 className="text-3xl font-bold mb-2">{slide.title}</h1>
              <p className="text-sm text-white/90 mb-4">{slide.description}</p>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <span>{slide.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StoryHero;
