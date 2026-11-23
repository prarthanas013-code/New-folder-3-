import React, { useState } from 'react';
import { 
  X, 
  Calculator, 
  Sparkles, 
  CheckCircle, 
  AlertTriangle, 
  Target, 
  BarChart3, 
  BookOpen, 
  ArrowRight,
  ShieldCheck 
} from 'lucide-react';

const BLOOMS_TAXONOMY = [
  { level: 1, name: 'Remember', verbs: 'Define, List, Recall, State, Identify' },
  { level: 2, name: 'Understand', verbs: 'Explain, Describe, Summarize, Classify' },
  { level: 3, name: 'Apply', verbs: 'Implement, Solve, Demonstrate, Execute' },
  { level: 4, name: 'Analyze', verbs: 'Compare, Differentiate, Examine, Investigate' },
  { level: 5, name: 'Evaluate', verbs: 'Justify, Critique, Assess, Validate' },
  { level: 6, name: 'Create', verbs: 'Design, Develop, Construct, Formulate' },
];

export default function OutcomeEngineModal({ isOpen, onClose, apiHealth }) {
  const [selectedBloom, setSelectedBloom] = useState(BLOOMS_TAXONOMY[2]); // Apply
  const [obtainedMarks, setObtainedMarks] = useState(38);
  const [maxMarks, setMaxMarks] = useState(50);
  const [targetPercentage, setTargetPercentage] = useState(70);

  if (!isOpen) return null;

  const attainment = maxMarks > 0 ? ((obtainedMarks / maxMarks) * 100).toFixed(1) : 0;
  
  // Classification Rules
  let threshold = { label: 'Not Achieved', color: 'bg-rose-100 text-rose-800 border-rose-300' };
  if (attainment >= 85) {
    threshold = { label: 'Excellent', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
  } else if (attainment >= 70) {
    threshold = { label: 'Achieved', color: 'bg-blue-100 text-blue-800 border-blue-300' };
  } else if (attainment >= 50) {
    threshold = { label: 'Needs Improvement', color: 'bg-amber-100 text-amber-800 border-amber-300' };
  }

  const isLagging = parseFloat(attainment) < targetPercentage;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl border border-[#9edaa7] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#181a18] text-white p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#42aa55] flex items-center justify-center text-white shadow-md">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Learning Outcome Analysis Engine</h3>
              <p className="text-xs text-white/60">Bloom's Taxonomy & Attainment Calculation Service</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Diagnostic Status from Backend API */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#f2fbf4] border border-[#b2e5bc] text-xs">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
              <span className="font-semibold text-slate-800">
                Backend API Status: {apiHealth?.status === 'healthy' ? 'Connected & Healthy (200 OK)' : 'Online Local Mock Mode'}
              </span>
            </div>
            <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
              Python 3.14 • Flask CORS
            </span>
          </div>

          {/* Interactive Calculation Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <label className="text-xs font-bold text-slate-700 block">
                Marks Obtained (CLO Questions)
              </label>
              <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-800">
                <span>{obtainedMarks} Marks</span>
                <span className="text-slate-400">/ {maxMarks}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max={maxMarks} 
                value={obtainedMarks} 
                onChange={e => setObtainedMarks(Number(e.target.value))}
                className="w-full accent-[#42aa55]"
              />

              <div className="pt-2">
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Target Attainment Benchmark
                </label>
                <div className="flex justify-between text-xs font-mono font-bold text-slate-800">
                  <span>{targetPercentage}%</span>
                </div>
                <input 
                  type="range" 
                  min="40" 
                  max="90" 
                  value={targetPercentage} 
                  onChange={e => setTargetPercentage(Number(e.target.value))}
                  className="w-full accent-slate-800"
                />
              </div>
            </div>

            {/* Calculated Results Card */}
            <div className="p-4 rounded-2xl bg-white border border-[#9edaa7] flex flex-col justify-between shadow-sm">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-500">Calculated Attainment</span>
                <div className="text-4xl font-light text-[#162719]">
                  {attainment}%
                </div>
                <span className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${threshold.color} mt-1`}>
                  {threshold.label}
                </span>
              </div>

              <div className="text-xs pt-3 border-t border-slate-100 space-y-1">
                <div className="flex justify-between text-slate-600">
                  <span>Benchmark Status:</span>
                  <span className={isLagging ? "text-rose-600 font-bold" : "text-emerald-700 font-bold"}>
                    {isLagging ? `Deficit (-${(targetPercentage - attainment).toFixed(1)}%)` : `Attained (+${(attainment - targetPercentage).toFixed(1)}%)`}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Bloom's Level Selector */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">
              Select Bloom's Taxonomy Cognitive Level
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {BLOOMS_TAXONOMY.map(b => (
                <button
                  key={b.level}
                  onClick={() => setSelectedBloom(b)}
                  className={`p-2.5 rounded-xl border text-left text-xs transition ${
                    selectedBloom.level === b.level
                      ? 'border-[#42aa55] bg-[#f2fbf4] text-emerald-900 font-bold'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="text-[10px] text-slate-400">Level {b.level}</div>
                  <div>{b.name}</div>
                </button>
              ))}
            </div>
            <div className="mt-2 p-2.5 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-200">
              <strong>Action Verbs for {selectedBloom.name}:</strong> {selectedBloom.verbs}
            </div>
          </div>

          {/* AI Remedial Recommendation Output */}
          <div className="p-4 rounded-2xl bg-[#181a18] text-white space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>AI Remedial Action Generator (Gemini Integration)</span>
            </div>
            {isLagging ? (
              <p className="text-xs text-white/80 leading-relaxed">
                Objective fell below target. Recommended remedial activity: <em>"Assign comparative state machine walkthroughs and 3 debugging exercises mapped to Level {selectedBloom.level} ({selectedBloom.name})."</em>
              </p>
            ) : (
              <p className="text-xs text-white/80 leading-relaxed">
                Student demonstrated mastery of Level {selectedBloom.level} ({selectedBloom.name}). Ready for higher-order cognitive evaluation.
              </p>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#181a18] text-white font-bold text-xs hover:bg-[#2b302c] transition"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
