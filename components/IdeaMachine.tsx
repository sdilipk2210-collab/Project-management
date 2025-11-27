import React from 'react';
import { Lightbulb, ArrowRight } from 'lucide-react';

export const IdeaMachine = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
        
        {/* Header */}
        <div>
            <h2 className="text-xl font-bold text-slate-800 flex items-center">
                <span className="text-yellow-400 mr-2"><Lightbulb /></span> Idea Machine
            </h2>
            <p className="text-slate-500 text-sm mt-1">Brain dump → validation → implementation, across all companies.</p>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Brain Dump */}
            <div className="bg-fuchsia-50 rounded-2xl border border-fuchsia-100 p-4 h-full">
                <div className="flex items-center space-x-2 mb-3">
                    <span className="text-lg">🧠</span>
                    <h3 className="font-bold text-fuchsia-900 text-sm">Brain Dump</h3>
                </div>
                <p className="text-[10px] text-fuchsia-700 mb-4 opacity-70">Use this column to quickly log raw ideas without judging them.</p>
                
                <div className="space-y-3">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-fuchsia-100 hover:shadow-md transition-shadow cursor-pointer">
                        <h4 className="font-semibold text-slate-800 text-sm">Magnetic hardware sample kit</h4>
                        <div className="flex justify-between items-center mt-3">
                             <span className="text-[10px] text-slate-500 font-bold">DE</span>
                             <span className="text-[10px] text-fuchsia-500">Impact: Medium</span>
                        </div>
                    </div>
                     <div className="bg-white p-4 rounded-xl shadow-sm border border-fuchsia-100 hover:shadow-md transition-shadow cursor-pointer">
                        <h4 className="font-semibold text-slate-800 text-sm">Modular cupholder for chairs</h4>
                        <div className="flex justify-between items-center mt-3">
                             <span className="text-[10px] text-slate-500 font-bold">DK</span>
                             <span className="text-[10px] text-slate-400">Impact: Low</span>
                        </div>
                    </div>
                </div>
            </div>

             {/* Validation */}
            <div className="bg-amber-50 rounded-2xl border border-amber-100 p-4 h-full">
                <div className="flex items-center space-x-2 mb-3">
                    <span className="text-lg">🧪</span>
                    <h3 className="font-bold text-amber-900 text-sm">Under Validation</h3>
                </div>
                <p className="text-[10px] text-amber-700 mb-4 opacity-70">Check feasibility, cost, impact, and link to a Project if it passes.</p>
                
                <div className="space-y-3">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-amber-200 ring-2 ring-amber-100 hover:shadow-md transition-shadow cursor-pointer">
                        <h4 className="font-semibold text-slate-800 text-sm">Quick-assemble auditorium base frame</h4>
                        <div className="flex justify-between items-center mt-3">
                             <span className="text-[10px] text-slate-500 font-bold">DK</span>
                             <span className="text-[10px] text-amber-600 font-bold">Impact: High</span>
                        </div>
                    </div>
                </div>
            </div>

             {/* Implementation */}
            <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-4 h-full">
                <div className="flex items-center space-x-2 mb-3">
                    <span className="text-lg">🚀</span>
                    <h3 className="font-bold text-emerald-900 text-sm">In Project / Implemented</h3>
                </div>
                <p className="text-[10px] text-emerald-700 mb-4 opacity-70">These should always be tied to real Projects and Tasks.</p>
                
                <div className="space-y-3">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-emerald-100 hover:shadow-md transition-shadow cursor-pointer">
                        <h4 className="font-semibold text-slate-800 text-sm">3D printed lumbar prototype</h4>
                        <div className="flex justify-between items-center mt-3">
                             <span className="text-[10px] text-slate-500 font-bold">Maktune</span>
                             <span className="text-[10px] text-emerald-600 font-bold">Impact: High</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
  );
};
