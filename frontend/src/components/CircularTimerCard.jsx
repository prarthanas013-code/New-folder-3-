import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Play, Pause, RotateCcw, Clock } from 'lucide-react';

export default function CircularTimerCard() {
  const [secondsLeft, setSecondsLeft] = useState(155); // 02:35 default
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer = null;
    if (isRunning && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, secondsLeft]);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const maxSeconds = 300; // 5 mins total
  const progressPercent = ((maxSeconds - secondsLeft) / maxSeconds) * 100;
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * progressPercent) / 100;

  return (
    <div className="rounded-[32px] bg-white/85 p-6 border border-[#b2e5bc] shadow-sm flex flex-col justify-between relative overflow-hidden">
      
      {/* Top Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm font-semibold text-slate-800">Time tracker</div>
        </div>

        <button 
          onClick={() => {
            setIsRunning(false);
            setSecondsLeft(155);
          }}
          className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 border border-[#b2e5bc] flex items-center justify-center text-slate-700 shadow-sm transition"
          title="Reset Timer"
        >
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* Circular Progress Meter */}
      <div className="my-auto py-2 flex items-center justify-center relative">
        <div className="relative w-36 h-36 flex items-center justify-center">
          
          {/* SVG Ring with tick marks effect */}
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 120 120">
            {/* Background Track with subtle dashes */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="transparent"
              stroke="#d4f1db"
              strokeWidth="6"
              strokeDasharray="2 3"
            />
            {/* Active Vibrant Green Progress Arc */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="transparent"
              stroke="#38a14b"
              strokeWidth="7"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-300 ease-linear"
            />
          </svg>

          {/* Center Text (matching "02:35 Work Time" from screenshot) */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-light text-[#162719] tracking-tight">
              {formatTime(secondsLeft)}
            </span>
            <span className="text-[10px] font-medium text-slate-500">
              Work Time
            </span>
          </div>

        </div>
      </div>

      {/* Bottom Controls Bar (matching screenshot: play button, pause button, clock pill) */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center space-x-2">
          
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 border border-[#b2e5bc] flex items-center justify-center text-slate-700 shadow-sm transition"
            title={isRunning ? "Pause" : "Start"}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" />}
          </button>

          <button
            onClick={() => setSecondsLeft(prev => Math.min(maxSeconds, prev + 30))}
            className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 border border-[#b2e5bc] flex items-center justify-center text-slate-700 shadow-sm transition"
            title="+30 Seconds"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

        </div>

        {/* Right Alarm / Clock button */}
        <button 
          className="w-8 h-8 rounded-full bg-[#181a18] text-white flex items-center justify-center shadow-sm hover:bg-[#2e3630] transition"
          title="Active Assessment Timer"
        >
          <Clock className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
