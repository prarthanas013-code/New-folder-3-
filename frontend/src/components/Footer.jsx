import React from 'react';
import { GraduationCap, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center space-x-2 text-white font-bold text-lg">
              <GraduationCap className="w-6 h-6 text-blue-400" />
              <span>Course<span className="text-blue-400">Connect</span></span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              AI-Powered Course Learning Outcome Analysis Platform. Transforming higher education with Outcome-Based Education (OBE) and Bloom's Taxonomy analytics.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Core Pillars</h4>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-slate-200 cursor-pointer">What Students Learn</li>
              <li className="hover:text-slate-200 cursor-pointer">Attainment Measurement</li>
              <li className="hover:text-slate-200 cursor-pointer">AI Remedial Actions</li>
              <li className="hover:text-slate-200 cursor-pointer">Bloom's Cognitive Mapping</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Roles & Portals</h4>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-slate-200 cursor-pointer">Administrator Portal</li>
              <li className="hover:text-slate-200 cursor-pointer">Faculty Course Studio</li>
              <li className="hover:text-slate-200 cursor-pointer">Student Learning Hub</li>
              <li className="hover:text-slate-200 cursor-pointer">Accreditation (NBA/NAAC)</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Technology</h4>
            <p className="text-xs leading-relaxed text-slate-400">
              Built on React, Python Flask, Supabase PostgreSQL, and Google Gemini AI. Fully open-source and deployable.
            </p>
            <div className="mt-3 flex items-center space-x-2 text-emerald-400 text-xs font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Row-Level Security Enabled</span>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} CourseConnect Platform. Academic Engineering Project.</p>
          <p className="mt-2 sm:mt-0 flex items-center">
            Designed for institutional excellence in Outcome-Based Education.
          </p>
        </div>
      </div>
    </footer>
  );
}
