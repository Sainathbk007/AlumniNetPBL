import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedEvents from '../components/home/FeaturedEvents';
import FeaturedNews from '../components/home/FeaturedNews';
import Statistics from '../components/home/Statistics';

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <Statistics />
      <FeaturedEvents />
      <FeaturedNews />
    </div>
  );
};

export default HomePage;