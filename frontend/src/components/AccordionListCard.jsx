import React, { useState } from 'react';
import { ChevronDown, Laptop, MoreVertical, FileText, CheckCircle2 } from 'lucide-react';

export default function AccordionListCard() {
  const [expandedIndex, setExpandedIndex] = useState(1); // "Devices" open by default matching screenshot

  const accordionItems = [
    {
      id: 0,
      title: 'Pension contributions',
      content: 'Configured at 12% institutional OBE contribution with matching faculty research endowment allowance.'
    },
    {
      id: 1,
      title: 'Devices',
      isDeviceCard: true,
      deviceName: 'MacBook Air',
      deviceVersion: 'Version M1',
      deviceImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=300'
    },
    {
      id: 2,
      title: 'Compensation Summary',
      content: 'CLO attainment weighting: Direct internal assessments (40%), Semester examination (60%).'
    },
    {
      id: 3,
      title: 'Employee Benefits',
      content: 'Academic development grants, AI moderation tool access, automated grade audit exports.'
    }
  ];

  return (
    <div className="rounded-[32px] bg-white/85 p-6 border border-[#b2e5bc] shadow-sm space-y-4">
      {accordionItems.map((item, idx) => {
        const isExpanded = expandedIndex === idx;

        return (
          <div key={item.id} className="border-b border-[#cdecd3] last:border-0 pb-3 last:pb-0">
            <button
              onClick={() => setExpandedIndex(isExpanded ? null : idx)}
              className="w-full flex items-center justify-between text-left group"
            >
              <span className="text-xs font-semibold text-slate-800 group-hover:text-black">
                {item.title}
              </span>
              <ChevronDown 
                className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${
                  isExpanded ? 'rotate-180 text-emerald-700' : ''
                }`} 
              />
            </button>

            {/* Expanded Content */}
            {isExpanded && (
              <div className="pt-3 animate-fade-in">
                {item.isDeviceCard ? (
                  /* Device Item Matching Screenshot ("MacBook Air Version M1") */
                  <div className="flex items-center justify-between p-2 rounded-2xl bg-white/60 border border-[#b2e5bc]/80">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-10 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
                        <img 
                          src={item.deviceImage} 
                          alt="MacBook Air" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">{item.deviceName}</div>
                        <div className="text-[10px] text-slate-500 font-medium">{item.deviceVersion}</div>
                      </div>
                    </div>
                    <button className="p-1 text-slate-400 hover:text-slate-700">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-600 leading-relaxed pl-1">
                    {item.content}
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
