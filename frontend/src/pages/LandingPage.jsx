import React, { useState, useEffect } from 'react';
import { 
  BrainCircuit, 
  Target, 
  TrendingUp, 
  Sparkles, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  BarChart3, 
  ArrowRight, 
  ShieldAlert, 
  Sliders, 
  UserCheck, 
  Lightbulb, 
  FileText,
  FileSpreadsheet,
  Check,
  ChevronRight,
  Calculator,
  RefreshCw
} from 'lucide-react';
import { getHealthStatus } from '../services/api';

const BLOOMS_LEVELS = [
  {
    level: 1,
    name: 'Remember',
    color: 'from-sky-500 to-blue-600',
    badge: 'bg-sky-100 text-sky-800 border-sky-300',
    verbs: ['Define', 'List', 'Identify', 'State', 'Recall'],
    description: 'Retrieving relevant knowledge from long-term memory. Formulates foundational concepts and definitions.',
    example: 'Define the ACID properties of relational database management systems.'
  },
  {
    level: 2,
    name: 'Understand',
    color: 'from-blue-600 to-indigo-600',
    badge: 'bg-blue-100 text-blue-800 border-blue-300',
    verbs: ['Explain', 'Describe', 'Summarize', 'Classify'],
    description: 'Constructing meaning from instructional messages including oral, written, and graphic communication.',
    example: 'Explain the difference between supervised and unsupervised machine learning algorithms.'
  },
  {
    level: 3,
    name: 'Apply',
    color: 'from-indigo-600 to-purple-600',
    badge: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    verbs: ['Implement', 'Solve', 'Demonstrate', 'Execute'],
    description: 'Carrying out or using a procedure in a given situation to solve practical problems.',
    example: 'Implement Dijkstra\'s shortest path algorithm for a weighted cyclic graph.'
  },
  {
    level: 4,
    name: 'Analyze',
    color: 'from-purple-600 to-fuchsia-600',
    badge: 'bg-purple-100 text-purple-800 border-purple-300',
    verbs: ['Compare', 'Differentiate', 'Examine', 'Investigate'],
    description: 'Breaking material into constituent parts and detecting how the parts relate to one another.',
    example: 'Differentiate between monolithic and microservice architectures under high-concurrency loads.'
  },
  {
    level: 5,
    name: 'Evaluate',
    color: 'from-fuchsia-600 to-rose-600',
    badge: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-300',
    verbs: ['Justify', 'Critique', 'Assess', 'Validate'],
    description: 'Making judgments based on criteria and standards, checking consistency and efficiency.',
    example: 'Critique the security posture of JWT versus opaque server-side session cookies.'
  },
  {
    level: 6,
    name: 'Create',
    color: 'from-rose-600 to-amber-600',
    badge: 'bg-rose-100 text-rose-800 border-rose-300',
    verbs: ['Design', 'Develop', 'Construct', 'Formulate'],
    description: 'Putting elements together to form a novel, coherent whole or make an original product.',
    example: 'Design a distributed fault-tolerant pub/sub messaging queue using consensus protocols.'
  }
];

export default function LandingPage({ onSelectRole }) {
  const [activeBloom, setActiveBloom] = useState(BLOOMS_LEVELS[2]); // Default to "Apply"
  const [apiData, setApiData] = useState(null);
  
  // Interactive Simulator State
  const [simObtained, setSimObtained] = useState(34);
  const [simMax, setSimMax] = useState(50);
  const [simTarget, setSimTarget] = useState(70);

  useEffect(() => {
    getHealthStatus().then(data => setApiData(data));
  }, []);

  // Simulator Calculations
  const attainmentPercentage = simMax > 0 ? ((simObtained / simMax) * 100).toFixed(1) : 0;
  let statusBadge = { label: 'Not Achieved', color: 'bg-rose-100 text-rose-800 border-rose-300' };
  if (attainmentPercentage >= 85) {
    statusBadge = { label: 'Excellent', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
  } else if (attainmentPercentage >= 70) {
    statusBadge = { label: 'Achieved', color: 'bg-blue-100 text-blue-800 border-blue-300' };
  } else if (attainmentPercentage >= 50) {
    statusBadge = { label: 'Needs Improvement', color: 'bg-amber-100 text-amber-800 border-amber-300' };
  }

  const isBelowTarget = parseFloat(attainmentPercentage) < simTarget;

  return (
    <div className="space-y-24 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-900 text-white pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-900/60 border border-blue-700/60 text-blue-300 text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
              <span>Outcome-Based Education Powered by AI</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Measure, Analyze & Improve <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                Student Learning Outcomes
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              CourseConnect empowers faculty to define syllabus objectives with Bloom's Taxonomy, conduct AI & manual assessments, and automatically diagnose learning gaps with personalized remedial roadmaps.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button 
                onClick={() => onSelectRole('faculty')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/25 transition flex items-center justify-center space-x-2"
              >
                <span>Launch Faculty Course Studio</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button 
                onClick={() => onSelectRole('student')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center justify-center space-x-2"
              >
                <span>Student Assessment Hub</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Live System Diagnostics Pill */}
            {apiData && (
              <div className="pt-6 inline-flex items-center space-x-3 text-xs bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700/60 text-slate-300 shadow">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Backend Engine: <strong>{apiData.status.toUpperCase()}</strong> (v{apiData.version})</span>
                <span className="text-slate-500">|</span>
                <span>Python {apiData.platform?.python_version}</span>
                <span className="text-slate-500">|</span>
                <span className="text-blue-300 font-mono">/api/health [200 OK]</span>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* THREE CORE QUESTIONS SECTION */}
      <section id="three-questions" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest font-bold text-blue-600 mb-2">Architectural Foundation</h2>
          <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">The Three Critical Questions</h3>
          <p className="text-sm text-slate-600 mt-2">Every feature in CourseConnect is directly anchored to answering these three core institutional questions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg">
              <Target className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">Question 1</span>
            <h4 className="text-xl font-bold text-slate-900">What are students expected to learn?</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Faculty define granular Course Learning Objectives (CLOs) from syllabi, map them to Bloom's 6 cognitive levels with specific action verbs, and set target attainment thresholds.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-lg">
              <TrendingUp className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-100 text-purple-800">Question 2</span>
            <h4 className="text-xl font-bold text-slate-900">How effectively have they achieved it?</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Assessments link questions directly to CLOs. The analysis engine calculates student-level and cohort-level attainment percentages with Bloom radar profiling and threshold grading.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">Question 3</span>
            <h4 className="text-xl font-bold text-slate-900">What should they do to improve?</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Deterministic rules flag lagging objectives below target, feeding student performance data into the Gemini AI engine to generate highly specific, non-generic remedial study plans.
            </p>
          </div>

        </div>
      </section>

      {/* BLOOM'S TAXONOMY INTERACTIVE SHOWCASE */}
      <section id="blooms" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs uppercase tracking-widest font-bold text-purple-600 mb-2">Cognitive Hierarchy</h2>
          <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">Bloom's Taxonomy Implementation</h3>
          <p className="text-sm text-slate-600 mt-2">All 6 cognitive levels are embedded natively into CLO creation, question banks, and attainment analytics.</p>
        </div>

        {/* Level Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
          {BLOOMS_LEVELS.map(lvl => (
            <button
              key={lvl.level}
              onClick={() => setActiveBloom(lvl)}
              className={`p-3 rounded-xl border text-center transition-all ${
                activeBloom.level === lvl.level
                  ? 'border-blue-600 bg-blue-50/80 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="text-xs font-medium text-slate-500">Level {lvl.level}</div>
              <div className="text-sm font-bold text-slate-900">{lvl.name}</div>
            </button>
          ))}
        </div>

        {/* Active Bloom Detail Card */}
        <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center space-x-3">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${activeBloom.badge}`}>
                  Level {activeBloom.level}
                </span>
                <h4 className="text-2xl font-extrabold text-slate-900">{activeBloom.name}</h4>
              </div>
              
              <p className="text-sm text-slate-700 leading-relaxed">
                {activeBloom.description}
              </p>

              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Prescribed Action Verbs</h5>
                <div className="flex flex-wrap gap-2">
                  {activeBloom.verbs.map(v => (
                    <span key={v} className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200">
                      {v}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Example Syllabus Learning Objective</h5>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 italic">
                  "{activeBloom.example}"
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 text-white space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Assessment Mapping</span>
                <span className="font-mono text-blue-400">CLO-BL-{activeBloom.level}</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Cognitive Weight</span>
                  <span className="text-white font-bold">{activeBloom.level * 16}% Target</span>
                </div>
                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-500 h-full transition-all duration-500" 
                    style={{ width: `${activeBloom.level * 16}%` }} 
                  />
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Questions tagged with <strong>{activeBloom.name}</strong> automatically compute Bloom-level attainment on student radar charts and faculty accreditation exports.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* INTERACTIVE OUTCOME ANALYSIS ENGINE SIMULATOR */}
      <section id="engine" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Simulator</span>
          </div>
          <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">Learning Outcome Analysis Engine</h3>
          <p className="text-sm text-slate-600 mt-2">Test how marks translate into CLO attainment, achievement thresholds, and AI remediation triggers.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h4 className="font-bold text-base text-slate-900 flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-blue-600" />
              <span>Attainment Formula Inputs</span>
            </h4>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Marks Obtained (CLO Questions)</span>
                <span className="font-mono text-blue-600 font-bold">{simObtained} Marks</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max={simMax} 
                value={simObtained} 
                onChange={e => setSimObtained(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer accent-blue-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Maximum Allocated Marks</span>
                <span className="font-mono text-slate-800 font-bold">{simMax} Marks</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="100" 
                value={simMax} 
                onChange={e => {
                  const val = Number(e.target.value);
                  setSimMax(val);
                  if (simObtained > val) setSimObtained(val);
                }}
                className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer accent-indigo-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Faculty Target Threshold</span>
                <span className="font-mono text-slate-800 font-bold">{simTarget}% Target</span>
              </div>
              <input 
                type="range" 
                min="40" 
                max="90" 
                value={simTarget} 
                onChange={e => setSimTarget(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer accent-purple-600"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 font-mono">
              <strong>Formula:</strong> (Obtained / Max) × 100 <br />
              = ({simObtained} / {simMax}) × 100 = <strong>{attainmentPercentage}%</strong>
            </div>
          </div>

          {/* Engine Output & AI Recommendation Preview */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-base text-slate-900 flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-purple-600" />
                <span>Engine Diagnostic Output</span>
              </h4>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${statusBadge.color}`}>
                {statusBadge.label}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-500">Calculated Attainment</span>
                <div className="text-2xl font-extrabold text-slate-900 mt-1">{attainmentPercentage}%</div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="bg-blue-600 h-full transition-all duration-300" 
                    style={{ width: `${Math.min(100, Math.max(0, attainmentPercentage))}%` }} 
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-500">Target Attainment Status</span>
                <div className="text-sm font-bold text-slate-900 mt-2 flex items-center space-x-1.5">
                  {isBelowTarget ? (
                    <span className="text-rose-600 flex items-center space-x-1">
                      <ShieldAlert className="w-4 h-4" />
                      <span>Gap: -{(simTarget - attainmentPercentage).toFixed(1)}%</span>
                    </span>
                  ) : (
                    <span className="text-emerald-600 flex items-center space-x-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Target Achieved (+{(attainmentPercentage - simTarget).toFixed(1)}%)</span>
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">Benchmark: {simTarget}%</div>
              </div>
            </div>

            {/* AI Recommendation Generator Trigger */}
            <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-900 flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>AI Remedial Recommendation Engine</span>
                </span>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-indigo-200 text-indigo-800">
                  {isBelowTarget ? 'Remediation Triggered' : 'Mastery Confirmed'}
                </span>
              </div>

              {isBelowTarget ? (
                <div className="space-y-2 text-xs text-slate-700">
                  <p className="font-semibold text-rose-700">
                    ⚠ Warning: Student is below the {simTarget}% target threshold for this CLO.
                  </p>
                  <div className="p-3 rounded-lg bg-white border border-indigo-200 text-xs text-slate-800 space-y-1.5">
                    <div><strong>Actionable Activity:</strong> Solve 5 step-by-step trace exercises on algorithmic state transitions.</div>
                    <div><strong>Practice Task:</strong> Attempt supplementary MCQ & descriptive drill mapped specifically to this cognitive level.</div>
                    <div><strong>Recommended Material:</strong> Review Course Module 3 (Slides 14–22).</div>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-slate-700 p-3 rounded-lg bg-white border border-emerald-200">
                  <p className="font-semibold text-emerald-700 flex items-center space-x-1">
                    <Check className="w-4 h-4" />
                    <span>Learning Objective successfully attained! Eligible for advanced cognitive assessments.</span>
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* USER ROLES SECTION */}
      <section id="roles" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest font-bold text-blue-600 mb-2">Role-Based Access</h2>
          <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dedicated Portals for Every Stakeholder</h3>
          <p className="text-sm text-slate-600 mt-2">Strict Row Level Security (RLS) ensures absolute data privacy across all three roles.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Administrator */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
                <UserCheck className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Administrator</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Institutional oversight: manage faculty/student accounts, approve instructor credentials, configure institutional attainment targets, and monitor platform health.
              </p>
              <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-blue-600" />
                  <span>Faculty & Student Provisioning</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-blue-600" />
                  <span>Platform-wide Attainment Thresholds</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-blue-600" />
                  <span>Accreditation-Ready Audits</span>
                </li>
              </ul>
            </div>
            <button 
              onClick={() => onSelectRole('admin')}
              className="mt-6 w-full py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition text-center"
            >
              Admin Portal
            </button>
          </div>

          {/* Faculty */}
          <div className="p-6 rounded-2xl bg-white border-2 border-blue-600 shadow-md flex flex-col justify-between relative">
            <div className="absolute -top-3 right-4 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Core Engine
            </div>
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Faculty</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Course creation, syllabus extraction, Bloom-mapped CLO authoring, AI/manual assessment generation, rubric evaluation, and real-time class analytics.
              </p>
              <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-blue-600" />
                  <span>AI Assessment & Rubric Builder</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-blue-600" />
                  <span>CLO Attainment Heatmaps & Radars</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-blue-600" />
                  <span>Study Material Distribution</span>
                </li>
              </ul>
            </div>
            <button 
              onClick={() => onSelectRole('faculty')}
              className="mt-6 w-full py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition text-center"
            >
              Faculty Portal
            </button>
          </div>

          {/* Student */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Student</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Join courses via codes, download published resources, take timed MCQ and descriptive assessments, review performance breakdowns, and receive AI remediation.
              </p>
              <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-purple-600" />
                  <span>Personalized Bloom radar analysis</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-purple-600" />
                  <span>AI-generated study directives</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-purple-600" />
                  <span>Timed assessment engine</span>
                </li>
              </ul>
            </div>
            <button 
              onClick={() => onSelectRole('student')}
              className="mt-6 w-full py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition text-center"
            >
              Student Portal
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
