import React from 'react';
import { Package, Truck, ShoppingBag, Globe, Search } from 'lucide-react';
import { Company, Task, Project } from '../types';

interface MaktuneDashboardProps {
  tasks: Task[];
  projects: Project[];
  onEditTask: (t: Task) => void;
  onEditProject: (p: Project) => void;
  onToggleTask: (t: Task) => void;
}

export const MaktuneDashboard = ({ tasks, projects, onEditTask, onEditProject, onToggleTask }: MaktuneDashboardProps) => {
  
  const myTasks = tasks.filter(t => t.company === Company.MAKTUNE && t.status !== 'Done');
  const myProjects = projects.filter(p => p.company === Company.MAKTUNE);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center shadow-sm">
        <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-500 rounded-xl text-white shadow-lg shadow-blue-200">
                <ShoppingBag size={24} />
            </div>
            <div>
                <h2 className="text-xl font-bold text-slate-800 tracking-tight">MAKTUNE HQ</h2>
                <p className="text-slate-500 text-sm">Amazon FBA, Direct Sales, and SEO.</p>
            </div>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
            <div className="px-4 py-2 bg-white rounded-lg shadow-sm border border-slate-200 text-xs font-semibold text-slate-600">
                Projects: {myProjects.length}
            </div>
            <div className="px-4 py-2 bg-white rounded-lg shadow-sm border border-slate-200 text-xs font-semibold text-slate-600">
                Open Tasks: {myTasks.length}
            </div>
        </div>
      </div>

      {/* Tasks & Projects Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-4">
            <h3 className="font-bold text-slate-700 flex items-center"><span className="mr-2">📋</span> Tasks</h3>
            <div className="bg-white rounded-2xl border border-slate-200 p-1 shadow-sm min-h-[100px]">
                {myTasks.length === 0 ? <p className="p-4 text-xs text-slate-400">No open tasks.</p> : myTasks.map(task => (
                    <div key={task.id} onClick={() => onEditTask(task)} className="p-4 border-b last:border-0 border-slate-50 hover:bg-slate-50 flex justify-between items-center group cursor-pointer transition-colors">
                        <div>
                            <h4 className="font-semibold text-slate-800 text-sm">{task.title}</h4>
                            <div className="flex items-center space-x-2 mt-1">
                                <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500">Maktune · {task.tag}</span>
                                <span className="text-[10px] text-slate-400">📅 {task.date}</span>
                            </div>
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded border ${task.priority === 'P1' ? 'text-rose-500 bg-rose-50 border-rose-100' : 'text-slate-500 bg-slate-50 border-slate-100'}`}>{task.priority}</span>
                    </div>
                ))}
            </div>
         </div>
         <div className="space-y-4">
             <h3 className="font-bold text-slate-700 flex items-center"><span className="mr-2">📂</span> Projects</h3>
             <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
                 {myProjects.length === 0 ? <p className="text-xs text-slate-400">No active projects.</p> : myProjects.map(proj => (
                    <div key={proj.id} onClick={() => onEditProject(proj)} className="border border-slate-100 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-sm font-semibold text-slate-800">{proj.title}</span>
                            <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">{proj.status}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-200">{proj.subTag}</span>
                    </div>
                 ))}
             </div>
         </div>
      </div>

      {/* Website & SEO Section */}
      <div className="bg-indigo-50 rounded-2xl border border-indigo-100 p-6">
        <div className="flex items-center justify-between mb-4">
             <h3 className="text-lg font-bold text-indigo-900 flex items-center">
                 <span className="mr-2"><Globe size={20} /></span> Website & SEO
             </h3>
             <button className="text-[10px] bg-white text-indigo-600 px-3 py-1 rounded border border-indigo-200 shadow-sm">View Analytics</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm">
                <div className="flex items-center space-x-2 mb-2 text-indigo-800 font-bold text-sm">
                    <Search size={16} /> <span>SEO Keywords</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    <span className="text-[10px] bg-slate-100 px-2 py-1 rounded">ergonomic chair</span>
                    <span className="text-[10px] bg-slate-100 px-2 py-1 rounded">lumbar support</span>
                    <span className="text-[10px] bg-slate-100 px-2 py-1 rounded">home office</span>
                </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm">
                <div className="flex items-center space-x-2 mb-2 text-indigo-800 font-bold text-sm">
                    <Globe size={16} /> <span>Site Health</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-3">
                    <div className="bg-emerald-400 h-full w-[85%] rounded-full"></div>
                </div>
                <div className="text-[10px] text-slate-400 mt-1 text-right">85/100</div>
            </div>
        </div>
      </div>

      {/* FBA Section */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
            <span className="text-2xl">📦</span>
            <h2 className="text-xl font-bold text-slate-800">Amazon FBA Ops</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-6">
                <div className="bg-sky-50 rounded-2xl border border-sky-100 p-6">
                     <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center text-sky-900 font-bold">
                            <Truck size={18} className="mr-2" /> Shipments
                        </div>
                     </div>
                     <div className="space-y-3">
                         <div className="bg-white rounded-xl p-4 shadow-sm border border-sky-100 flex justify-between items-center">
                             <div>
                                 <h4 className="font-bold text-slate-700 text-sm uppercase">FBA – BATCH 010</h4>
                                 <div className="flex items-center space-x-3 mt-1.5">
                                     <span className="text-xs text-slate-500 flex items-center">📅 27 Nov</span>
                                     <span className="text-xs text-amber-600 flex items-center">📦 18 cartons</span>
                                 </div>
                             </div>
                             <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-3 py-1 rounded-full border border-slate-200">Receiving</span>
                         </div>
                     </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <div className="flex items-center space-x-2 mb-2 text-amber-700">
                        <Package size={20} />
                        <h3 className="font-bold text-lg text-slate-800">Packaging Materials</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <h4 className="font-semibold text-slate-700 text-sm">5-ply carton 18x12x8</h4>
                            <div className="flex justify-between mt-2">
                                <span className="text-xs text-slate-500">Stock: 120 pcs</span>
                                <span className="text-[10px] text-slate-400">Reorder @ 80</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
                <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-5">
                    <div className="flex items-center space-x-2 mb-3">
                        <span className="text-lg">🚀</span>
                        <h3 className="font-bold text-slate-800">Improvement Roadmap</h3>
                    </div>
                    <ul className="space-y-2">
                        <li className="text-xs text-emerald-900 font-medium flex items-start">
                            <span className="mr-2">•</span> Audit top 10 SKUs
                        </li>
                        <li className="text-xs text-emerald-900 font-medium flex items-start">
                            <span className="mr-2">•</span> FBA Automation
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      </div>

    </div>
  );
};