import React, { useState, useEffect } from 'react';
import HeaderNav from '../components/HeaderNav';
import TopHeroStats from '../components/TopHeroStats';
import ProfileCard from '../components/ProfileCard';
import ProgressBarCard from '../components/ProgressBarCard';
import CircularTimerCard from '../components/CircularTimerCard';
import OnboardingDarkCard from '../components/OnboardingDarkCard';
import AccordionListCard from '../components/AccordionListCard';
import ScheduleTimelineCard from '../components/ScheduleTimelineCard';
import OutcomeEngineModal from '../components/OutcomeEngineModal';
import { getHealthStatus } from '../services/api';

export default function DashboardView() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentRole, setCurrentRole] = useState('faculty');
  const [isEngineOpen, setIsEngineOpen] = useState(false);
  const [apiHealth, setApiHealth] = useState(null);

  useEffect(() => {
    getHealthStatus().then(data => setApiHealth(data));
  }, []);

  return (
    <div className="min-h-screen bg-[#8ecf9c] p-3 sm:p-6 lg:p-8 flex items-center justify-center font-sans">
      
      {/* Outer App Frame (matching the curved pastel-green canvas from the reference UI) */}
      <div className="w-full max-w-[1400px] bg-[#c3e8ca] rounded-[36px] sm:rounded-[48px] p-4 sm:p-7 border border-[#a2dcab] shadow-2xl space-y-6">
        
        {/* Top Header Navigation */}
        <HeaderNav 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          currentRole={currentRole}
          setCurrentRole={setCurrentRole}
          onOpenEngine={() => setIsEngineOpen(true)}
        />

        {/* Hero Area: "Welcome in," + Progress Strip + 3 Large Numbers */}
        <TopHeroStats 
          currentRole={currentRole}
          onOpenEngine={() => setIsEngineOpen(true)}
        />

        {/* Bento Grid (Matching exactly the uploaded screenshot layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* Left Column Group: Profile Card (top) + Accordions (bottom) */}
          <div className="lg:col-span-3 space-y-5">
            <ProfileCard currentRole={currentRole} />
            <AccordionListCard />
          </div>

          {/* Center Column Group: Progress Chart + Circular Timer (top) + Schedule (bottom) */}
          <div className="lg:col-span-6 space-y-5">
            
            {/* Top Row: Progress Bar Card & Circular Timer Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <ProgressBarCard onOpenEngine={() => setIsEngineOpen(true)} />
              <CircularTimerCard />
            </div>

            {/* Bottom Row: Schedule & Timeline Card */}
            <ScheduleTimelineCard />

          </div>

          {/* Right Column Group: Onboarding Dark Card (Stacked layers) */}
          <div className="lg:col-span-3">
            <OnboardingDarkCard />
          </div>

        </div>

      </div>

      {/* Outcome Engine Modal */}
      <OutcomeEngineModal 
        isOpen={isEngineOpen} 
        onClose={() => setIsEngineOpen(false)}
        apiHealth={apiHealth}
      />

    </div>
  );
}
