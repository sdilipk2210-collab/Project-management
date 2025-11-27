import React from 'react';
import { FlaskConical, Lightbulb, Printer, Settings } from 'lucide-react';
import { Idea } from '../types';

interface ProductIdeaLabProps {
  ideas: Idea[];
  onEditIdea: (idea: Idea) => void;
}

export const ProductIdeaLab = ({ ideas, onEditIdea }: ProductIdeaLabProps) => {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 flex items-center">
            <span className="text-fuchsia-500 mr-2"><FlaskConical /></span> Innovation Center
        </h2>
        <p className="text-slate-500 text-sm mt-1">Idea Pipeline + 3D Product Development Lab.</p>
      </div>

      {/* SECTION 1: IDEA MACHINE */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
            <span className="text-yellow-400"><Lightbulb /></span>
            <h3 className="text-lg font-bold text-slate-700">Idea Machine</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Brain Dump */}
            <div className="bg-fuchsia-50 rounded-2xl border border-fuchsia-100 p-4 h-full">
                <div className="flex items-center space-x-2 mb-3">
                    <span className="text-lg">🧠</span>
                    <h3 className="font-bold text-fuchsia-900 text-sm">Brain Dump</h3>
                </div>
                <div className="space-y-3">
                    {ideas.filter(i => i.stage === 'Brain Dump').length === 0 && <p className="text-[10px] text-fuchsia-400 italic">No raw ideas.</p>}
                    {ideas.filter(i => i.stage === 'Brain Dump').map(idea => (
                        <div key={idea.id} onClick={() => onEditIdea(idea)} className="bg-white p-4 rounded-xl shadow-sm border border-fuchsia-100 hover:shadow-md transition-shadow cursor-pointer">
                            <h4 className="font-semibold text-slate-800 text-sm">{idea.title}</h4>
                            <div className="flex justify-between items-center mt-3">
                                <span className="text-[10px] text-slate-500 font-bold">{idea.company}</span>
                                <span className="text-[10px] text-fuchsia-500">Impact: {idea.impact}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

             {/* Validation */}
            <div className="bg-amber-50 rounded-2xl border border-amber-100 p-4 h-full">
                <div className="flex items-center space-x-2 mb-3">
                    <span className="text-lg">🧪</span>
                    <h3 className="font-bold text-amber-900 text-sm">Under Validation</h3>
                </div>
                <div className="space-y-3">
                    {ideas.filter(i => i.stage === 'Under Validation').length === 0 && <p className="text-[10px] text-amber-400 italic">No ideas in validation.</p>}
                    {ideas.filter(i => i.stage === 'Under Validation').map(idea => (
                        <div key={idea.id} onClick={() => onEditIdea(idea)} className="bg-white p-4 rounded-xl shadow-sm border border-amber-200 ring-2 ring-amber-100 hover:shadow-md transition-shadow cursor-pointer">
                            <h4 className="font-semibold text-slate-800 text-sm">{idea.title}</h4>
                            <div className="flex justify-between items-center mt-3">
                                <span className="text-[10px] text-slate-500 font-bold">{idea.company}</span>
                                <span className="text-[10px] text-amber-600 font-bold">Impact: {idea.impact}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

             {/* Implementation */}
            <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-4 h-full">
                <div className="flex items-center space-x-2 mb-3">
                    <span className="text-lg">🚀</span>
                    <h3 className="font-bold text-emerald-900 text-sm">In Project / Implemented</h3>
                </div>
                <div className="space-y-3">
                     {ideas.filter(i => i.stage === 'In Project' || i.stage === 'Implemented').length === 0 && <p className="text-[10px] text-emerald-400 italic">Nothing in works.</p>}
                     {ideas.filter(i => i.stage === 'In Project' || i.stage === 'Implemented').map(idea => (
                        <div key={idea.id} onClick={() => onEditIdea(idea)} className="bg-white p-4 rounded-xl shadow-sm border border-emerald-100 hover:shadow-md transition-shadow cursor-pointer">
                            <h4 className="font-semibold text-slate-800 text-sm">{idea.title}</h4>
                            <div className="flex justify-between items-center mt-3">
                                <span className="text-[10px] text-slate-500 font-bold">{idea.company}</span>
                                <span className="text-[10px] text-emerald-600 font-bold">Impact: {idea.impact}</span>
                            </div>
                        </div>
                     ))}
                </div>
            </div>
        </div>
      </div>

      <hr className="border-slate-200" />

      {/* SECTION 2: PRODUCT LAB (3D Printing) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center space-x-2 mb-1">
                 <span className="text-lime-500"><Printer /></span>
                 <h3 className="text-lg font-bold text-slate-700">3D Lab & Prototyping</h3>
              </div>
              
              {/* Print Queue */}
              <div className="bg-blue-50/50 rounded-2xl border border-blue-100 p-6">
                   <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-slate-700 flex items-center">
                            <span className="mr-2 text-slate-400"><Printer size={18} /></span> 3D Print Queue (Mocked)
                        </h3>
                   </div>

                   <div className="space-y-3">
                        <div className="bg-white p-4 rounded-xl border border-blue-100 flex justify-between items-center">
                            <div>
                                <h4 className="font-semibold text-slate-800 text-sm">Lumbar Support – V2</h4>
                                <div className="text-[10px] text-slate-400 mt-1">PLA · 7h 20m · Ender-3</div>
                            </div>
                            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-3 py-1 rounded border border-emerald-100">Printing</span>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-blue-100 flex justify-between items-center">
                            <div>
                                <h4 className="font-semibold text-slate-800 text-sm">Chair Knob Prototype</h4>
                                <div className="text-[10px] text-slate-400 mt-1">PETG · 3h 10m · Anycubic</div>
                            </div>
                            <span className="text-[10px] font-bold bg-slate-50 text-slate-500 px-3 py-1 rounded border border-slate-200">Queued</span>
                        </div>
                   </div>
              </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
              {/* Printer Readiness */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm h-full">
                  <h3 className="font-bold text-slate-800 flex items-center mb-4">
                      <span className="mr-2 text-slate-800"><Settings size={18} /></span> Printer Readiness
                  </h3>
                  <div className="space-y-3">
                      <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-lg flex justify-between items-center">
                          <div>
                              <div className="font-bold text-emerald-900 text-sm">Ender-3</div>
                              <div className="text-[10px] text-emerald-700 opacity-80">Ready</div>
                          </div>
                          <span className="bg-white text-emerald-700 text-[10px] font-bold px-2 py-1 rounded shadow-sm">Ready</span>
                      </div>
                      <div className="bg-amber-50 border border-amber-100 p-3 rounded-lg flex justify-between items-center">
                          <div>
                              <div className="font-bold text-amber-900 text-sm">Anycubic Kobra</div>
                              <div className="text-[10px] text-amber-700 opacity-80">Check Nozzle</div>
                          </div>
                          <span className="bg-white text-amber-700 text-[10px] font-bold px-2 py-1 rounded shadow-sm">Check</span>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};