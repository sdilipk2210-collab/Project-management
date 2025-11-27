import React from 'react';
import { FlaskConical, Printer, PenTool, Pause, Play, AlertTriangle, Settings } from 'lucide-react';
import { Company } from '../types';

export const ProductLab = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 flex items-center">
            <span className="text-lime-500 mr-2"><FlaskConical /></span> Product Dev + 3D Lab
        </h2>
        <p className="text-slate-500 text-sm mt-1">From CAD sketch → 3D print → production-ready component.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Dev Projects */}
          <div className="lg:col-span-8 space-y-6">
              
              <div className="bg-purple-50 rounded-2xl border border-purple-100 p-6">
                   <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-purple-900 flex items-center">
                            <span className="mr-2">📁</span> Active Product Dev Projects
                        </h3>
                        <span className="text-xs bg-white px-3 py-1 rounded-full border border-purple-200 text-purple-700 shadow-sm">3 mocked</span>
                   </div>
                   <p className="text-xs text-purple-700/60 mb-4">Hook this to your real "Projects" DB where project type = Product Development.</p>

                   <div className="space-y-3">
                       {/* Project 1 */}
                       <div className="bg-white p-4 rounded-xl border border-purple-100 shadow-sm flex justify-between items-center">
                           <div>
                               <h4 className="font-semibold text-slate-800 text-sm">3D Printed Lumbar Support – V2</h4>
                               <div className="text-xs text-slate-400 mt-1">Maktune · Office chair upgrade</div>
                           </div>
                           <span className="text-xs font-semibold bg-lime-50 text-lime-700 border border-lime-200 px-3 py-1 rounded-full">In Testing</span>
                       </div>

                       {/* Project 2 */}
                       <div className="bg-white p-4 rounded-xl border border-purple-100 shadow-sm flex justify-between items-center ring-1 ring-purple-200">
                           <div>
                               <h4 className="font-semibold text-slate-800 text-sm">Quick-release armrest hardware</h4>
                               <div className="text-xs text-slate-400 mt-1">DE · Hardware</div>
                           </div>
                           <span className="text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full">Design</span>
                       </div>
                   </div>
              </div>

              {/* Print Queue */}
              <div className="bg-blue-50/50 rounded-2xl border border-blue-100 p-6">
                   <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-slate-700 flex items-center">
                            <span className="mr-2 text-slate-400"><Printer size={18} /></span> 3D Print Queue (Mocked)
                        </h3>
                        <span className="text-[10px] text-slate-400 bg-white px-2 py-1 rounded border border-slate-200">Use with `3D Printing Jobs` DB</span>
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

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
              
              {/* Printer Readiness */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <h3 className="font-bold text-slate-800 flex items-center mb-1">
                      <span className="mr-2 text-slate-800"><Settings size={18} /></span> Printer Readiness
                  </h3>
                  <p className="text-xs text-slate-400 mb-4">Mirror of `3D Printers & Maintenance` DB.</p>

                  <div className="space-y-3">
                      <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-lg flex justify-between items-center">
                          <div>
                              <div className="font-bold text-emerald-900 text-sm">Ender-3</div>
                              <div className="text-[10px] text-emerald-700 opacity-80">Ready · Last maintenance: 7 days ago</div>
                          </div>
                          <span className="bg-white text-emerald-700 text-[10px] font-bold px-2 py-1 rounded shadow-sm">Ready</span>
                      </div>

                      <div className="bg-amber-50 border border-amber-100 p-3 rounded-lg flex justify-between items-center">
                          <div>
                              <div className="font-bold text-amber-900 text-sm">Anycubic Kobra</div>
                              <div className="text-[10px] text-amber-700 opacity-80">Needs nozzle check</div>
                          </div>
                          <span className="bg-white text-amber-700 text-[10px] font-bold px-2 py-1 rounded shadow-sm">Check</span>
                      </div>
                  </div>
              </div>

              {/* Links */}
               <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <h3 className="font-bold text-slate-800 flex items-center mb-1">
                      <span className="mr-2 text-pink-400">🧠</span> Learning Links
                  </h3>
                  <p className="text-xs text-slate-400 mb-4">Hook to `Learning & Skills` for lab-related topics.</p>
                  
                  <ul className="space-y-2 text-xs font-medium text-slate-600">
                      <li className="flex items-start"><span className="mr-2 text-slate-400">•</span> Injection molding – cooling time optimisation</li>
                      <li className="flex items-start"><span className="mr-2 text-slate-400">•</span> CAD constraints for plastic parts</li>
                      <li className="flex items-start"><span className="mr-2 text-slate-400">•</span> 3D printing tolerance tuning</li>
                  </ul>
              </div>

          </div>

      </div>
    </div>
  );
};