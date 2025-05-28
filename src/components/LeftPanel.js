import React, { useEffect, useRef } from 'react';
import { Building2, Home, LineChart, Users } from 'lucide-react';

const LeftPanel = () => {
  const panelRef = useRef(null);

  // Parallax effect for buildings
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!panelRef.current) return;
      
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      const buildings = panelRef.current.querySelectorAll('.parallax-building');
      const clouds = panelRef.current.querySelectorAll('.parallax-cloud');
      
      buildings.forEach((building, index) => {
        const speed = 1 + index * 0.5;
        const buildingEl = building;
        buildingEl.style.transform = `translateX(${x * speed * 10}px) translateY(${y * speed * 5}px)`;
      });
      
      clouds.forEach((cloud, index) => {
        const speed = 2 + index * 0.8;
        const cloudEl = cloud;
        cloudEl.style.transform = `translateX(${x * speed * 20}px) translateY(${y * speed * 10}px)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={panelRef}
      className="hidden md:block w-[70%] relative bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 animate-gradient-shift"></div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 bg-[#503691]">
        <div className="parallax-cloud absolute top-[15%] left-[20%] text-white/10">
          <Home size={48} />
        </div>
        <div className="parallax-cloud absolute top-[30%] right-[25%] text-white/10">
          <Building2 size={64} />
        </div>
        <div className="parallax-cloud absolute bottom-[35%] left-[10%] text-white/10">
          <LineChart size={40} />
        </div>
        <div className="parallax-cloud absolute bottom-[20%] right-[15%] text-white/10">
          <Users size={52} />
        </div>
      </div>
      
      {/* City skyline silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-[30%]">
        <div className="parallax-building absolute bottom-0 left-[10%] w-[5%] h-[70%] bg-purple-950/30 rounded-t-sm"></div>
        <div className="parallax-building absolute bottom-0 left-[18%] w-[7%] h-[90%] bg-purple-950/30 rounded-t-sm"></div>
        <div className="parallax-building absolute bottom-0 left-[28%] w-[10%] h-[60%] bg-purple-950/30 rounded-t-md"></div>
        <div className="parallax-building absolute bottom-0 left-[40%] w-[8%] h-[80%] bg-purple-950/30 rounded-t-sm"></div>
        <div className="parallax-building absolute bottom-0 left-[50%] w-[12%] h-[100%] bg-purple-950/30 rounded-t-md"></div>
        <div className="parallax-building absolute bottom-0 left-[65%] w-[6%] h-[75%] bg-purple-950/30 rounded-t-sm"></div>
        <div className="parallax-building absolute bottom-0 left-[74%] w-[9%] h-[65%] bg-purple-950/30 rounded-t-sm"></div>
        <div className="parallax-building absolute bottom-0 left-[85%] w-[8%] h-[85%] bg-purple-950/30 rounded-t-md"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full px-12 text-white">
        <div className="mb-8 flex items-center space-x-3">
          <Building2 size={40} className="text-white" />
          <h1 className="text-4xl font-bold">PRObroker</h1>
        </div>
        
        <h2 className="text-3xl font-bold text-center mb-6">
          Your Ultimate Property Solution
        </h2>
        
        <p className="text-xl text-center mb-12 text-purple-100">
          Connecting agents with properties across west Ahmedabad
        </p>
        
        <div className="grid grid-cols-2 gap-6 w-full max-w-md">
          <FeatureCard icon={<Home />} title="Property Management" />
          <FeatureCard icon={<Users />} title="200+ Active Users" />
          <FeatureCard icon={<LineChart />} title="50+ Areas Covered" />
          <FeatureCard icon={<Building2 />} title="15,000+ Properties" />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title }) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
      <div className="text-white mb-2">{icon}</div>
      <h3 className="text-sm font-medium text-white">{title}</h3>
    </div>
  );
};

export default LeftPanel;
