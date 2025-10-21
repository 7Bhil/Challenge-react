import Hero from '../../components/Hero';
import ChallengesList from '../../components/ChallengesList';
import Rankings from '../../components/Rankings';

function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
  <Hero />
        <ChallengesList />
      <Rankings />
    </div>
  );
}

export default Home;