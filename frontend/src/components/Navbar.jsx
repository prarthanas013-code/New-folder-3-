import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Layers, 
  Users, 
  Activity, 
  ShieldCheck, 
  ArrowRight,
  Menu,
  X
} from 'lucide-react';
import { getHealthStatus } from '../services/api';

export default function Navbar({ onOpenAuthModal }) {
  const [backendStatus, setBackendStatus] = useState('checking');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function check() {
      const data = await getHealthStatus();
      if (mounted) {
        if (data && data.status === 'healthy') {
          setBackendStatus('online');
        } else {
          setBackendStatus('offline');
        }
      }
    }
    check();
    const interval = setInterval(check, 30000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white font-bold text-xl">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Course<span className="text-blue-400">Connect</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] tracking-wider uppercase font-semibold px-2 py-0.5 bg-blue-950/80 text-blue-300 border border-blue-800/60 rounded-full">
                OBE & Bloom's Platform
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <a href="#three-questions" className="hover:text-white transition-colors">Core Model</a>
            <a href="#blooms" className="hover:text-white transition-colors">Bloom's Taxonomy</a>
            <a href="#roles" className="hover:text-white transition-colors">User Roles</a>
            <a href="#engine" className="hover:text-white transition-colors">Outcome Engine</a>
          </nav>

          {/* Right Action & Live Health Indicator */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-xs px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-slate-300">
              <span className={`w-2 h-2 rounded-full ${
                backendStatus === 'online' ? 'bg-emerald-400 animate-pulse' : 
                backendStatus === 'checking' ? 'bg-amber-400' : 'bg-rose-500'
              }`} />
              <span>{backendStatus === 'online' ? 'Engine Online' : backendStatus === 'checking' ? 'Checking API...' : 'API Standby'}</span>
            </div>

            <button 
              onClick={() => onOpenAuthModal('student')}
              className="text-xs font-semibold px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              Sign In
            </button>
            <button 
              onClick={() => onOpenAuthModal('faculty')}
              className="text-xs font-semibold px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-blue-600/20 transition flex items-center space-x-1"
            >
              <span>Faculty Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-3">
          <a 
            href="#three-questions" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-300 hover:text-white text-sm"
          >
            Core Model
          </a>
          <a 
            href="#blooms" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-300 hover:text-white text-sm"
          >
            Bloom's Taxonomy
          </a>
          <a 
            href="#roles" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-300 hover:text-white text-sm"
          >
            User Roles
          </a>
          <a 
            href="#engine" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-300 hover:text-white text-sm"
          >
            Outcome Engine
          </a>
          <div className="pt-4 flex flex-col space-y-2">
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenAuthModal('student'); }}
              className="w-full text-center py-2 text-sm font-semibold rounded-lg bg-slate-800 text-slate-200"
            >
              Sign In
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenAuthModal('faculty'); }}
              className="w-full text-center py-2 text-sm font-semibold rounded-lg bg-blue-600 text-white"
            >
              Faculty Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
