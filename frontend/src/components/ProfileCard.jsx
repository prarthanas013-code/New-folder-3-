import React from 'react';

export default function ProfileCard({ currentRole }) {
  const profile = {
    faculty: {
      name: 'Elena Vance',
      role: 'Lead Faculty & OBE Head',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
      tag: '94.2% Attain'
    },
    student: {
      name: 'Lora Peterson',
      role: 'UX / OBE Student',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
      tag: '$1,200'
    },
    admin: {
      name: 'Dean Sterling',
      role: 'Academic Director',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
      tag: '12 Courses'
    }
  }[currentRole] || {
    name: 'Lora Peterson',
    role: 'UX/UI Designer',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    tag: '$1,200'
  };

  return (
    <div className="relative rounded-[32px] overflow-hidden bg-white/90 border border-[#b2e5bc] shadow-sm aspect-[4/3] group">
      
      {/* Background Image */}
      <img 
        src={profile.photo} 
        alt={profile.name}
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
      />

      {/* Subtle bottom gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

      {/* Info Overlay at Bottom */}
      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
        <div>
          <h3 className="font-bold text-base tracking-tight leading-tight drop-shadow-sm">
            {profile.name}
          </h3>
          <p className="text-[11px] text-white/80 font-medium drop-shadow-sm">
            {profile.role}
          </p>
        </div>

        {/* Pill Badge matching "$1,200" from screenshot */}
        <div className="px-3.5 py-1.5 rounded-full bg-white/25 backdrop-blur-md border border-white/40 text-xs font-bold text-white shadow-sm">
          {profile.tag}
        </div>
      </div>

    </div>
  );
}
