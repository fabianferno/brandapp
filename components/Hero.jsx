import React from 'react';

const Hero = () => (
  <div className="  my-5 text-center" data-testid="hero">
    <img style={{ height: '200px' }} src="/images/the-racoon-app-logo.png" alt="Logo" srcSet="" />
    <h1 style={{ fontSize: '5rem' }} className="text-primary mt-4 font-weight-bold">
      the racoon app
    </h1>

    <p className="text-dark h6 font-weight-normal " data-testid="hero-lead">
      An Issue/Project Tracker ⏱️ that helps ease software delivery 🚛. Submit, Track & Resolve bugs in a flash ⚡
    </p>
  </div>
);

export default Hero;
