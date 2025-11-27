
import React from 'react';
import { Cog, Truck, Archive, Lightbulb, Users } from 'lucide-react';
import { Company, Task, Project } from '../types';

interface DEDashboardProps {
  tasks: Task[];
  projects: Project[];
  onEditTask: (t: Task) => void;
  onEditProject: (p: Project) => void;
  onToggleTask: (t: Task) => void;
}

export const DEDashboard = ({ tasks, projects, onEditTask, onEditProject, onToggleTask }: DEDashboardProps) => {
  
  const myTasks = tasks.filter(t => t.company === Company.DE && t.status !== 'Done');
  const myProjects = projects.filter(p => p.company === Company.DE);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center shadow-sm">
          <div className="flex items-center space-x-4">
              <div className="p-3 bg-orange-500 rounded-xl text-white shadow-lg shadow-orange-200">
                  <Cog size={24} />
              </div>
              <div>
                  <h2 className="text-xl font-bold text-slate-800 tracking-tight">DE HQ</h2>
                  <p className="text-slate-500 text-sm">Office chair hardware, gas lifts, bases, and metal components.</p>
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

      {/* Task Queue Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-4">
            <h3 className="font-bold text-slate-700 flex items-center"><span className="mr-2">📋</span> Tasks <span className="ml-2 text-xs font-normal text-slate-400">Inventory & Dispatch queue.</span></h3>
            <div className="bg-white rounded-2xl border border-slate-200 p-1 shadow-sm min-h-[100px]">
                {myTasks.length === 0 ? <p className="p-4 text-xs text-slate-400">No open tasks.</p> : myTasks.map(task => (
                    <div key={task.id} onClick={() => onEditTask(task)} className="p-4 border-b last:border-0 border-slate-50 hover:bg-slate-50 flex justify-between items-center group cursor-pointer transition-colors">
                        <div>
                            <h4 className="font-semibold text-slate-800 text-sm">{task.title}</h4>
                            <div className="flex items-center space-x-2 mt-1">
                                <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500">DE · {task.tag}</span>
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

      {/* Dispatch & Inventory OS */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
            <span className="text-2xl text-orange-500"><Archive size={24} /></span>
            <h2 className="text-xl font-bold text-slate-800">Dispatch & Inventory</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Col: Dispatch + Inventory */}
            <div className="lg:col-span-8 space-y-6">
                {/* Dispatch Status */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                     <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center text-slate-800 font-bold">
                            <Truck size={18} className="mr-2 text-slate-400" /> Active Dispatches
                        </div>
                     </div>

                     <div className="space-y-3">
                         <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex justify-between items-center">
                             <div>
                                 <h4 className="font-bold text-slate-700 text-sm">Invoice #9902</h4>
                                 <div className="text-xs text-slate-400 mt-1">Destination: Bangalore · 12 cartons</div>
                             </div>
                             <span className="text-[10px] bg-sky-50 text-sky-600 px-2 py-1 rounded border border-sky-100 font-bold">In Transit</span>
                         </div>
                         <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex justify-between items-center">
                             <div>
                                 <h4 className="font-bold text-slate-700 text-sm">Invoice #9903</h4>
                                 <div className="text-xs text-slate-400 mt-1">Destination: Mumbai · 8 cartons</div>
                             </div>
                             <span className="text-[10px] bg-yellow-50 text-yellow-600 px-2 py-1 rounded border border-yellow-100 font-bold">Packing</span>
                         </div>
                     </div>
                </div>

                {/* Hardware Inventory */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <div className="flex items-center space-x-2 mb-4 text-slate-800 font-bold">
                        <Archive size={18} className="mr-2 text-slate-400" /> Hardware Stock
                    </div>
                    
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <span className="text-sm font-medium text-slate-700">Class 4 Gas Lifts</span>
                            <div className="text-xs font-bold text-emerald-600">850 units</div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <span className="text-sm font-medium text-slate-700">Nylon Bases (350mm)</span>
                            <div className="text-xs font-bold text-amber-600">42 units (Low)</div>
                        </div>
                         <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <span className="text-sm font-medium text-slate-700">PU Wheels (Set of 5)</span>
                            <div className="text-xs font-bold text-emerald-600">200 sets</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Col: Improvement & Vendors */}
            <div className="lg:col-span-4 space-y-6">
                
                {/* R&D Pipeline */}
                <div className="bg-orange-50 rounded-2xl border border-orange-100 p-5">
                    <div className="flex items-center space-x-2 mb-3">
                        <Lightbulb size={18} className="text-orange-600"/>
                        <h3 className="font-bold text-slate-800">R&D & Improvement</h3>
                    </div>
                    <p className="text-xs text-orange-800 mb-4 opacity-80">New hardware samples and quality checks.</p>
                    
                    <ul className="space-y-2">
                         <li className="text-xs text-orange-900 font-medium flex items-start">
                            <span className="mr-2">•</span> Magnetic hardware sample kit testing
                        </li>
                        <li className="text-xs text-orange-900 font-medium flex items-start">
                            <span className="mr-2">•</span> BIFMA certification for new gas lifts
                        </li>
                    </ul>
                </div>

                {/* Supplier Watchlist */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                    <div className="flex items-center space-x-2 mb-2">
                         <div className="bg-blue-100 text-blue-600 p-1 rounded">
                             <Users size={16} />
                         </div>
                        <h3 className="font-bold text-slate-800">Supplier Watchlist</h3>
                    </div>
                    <p className="text-xs text-slate-400 mb-4">Vendors for upcoming orders.</p>
                    
                    <div className="space-y-3">
                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                            <div className="text-xs font-bold text-slate-700">Anji Seating (China)</div>
                            <div className="text-[10px] text-slate-400 mt-1">Pending quote for 500 bases</div>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                            <div className="text-xs font-bold text-slate-700">Raj Industries (Local)</div>
                            <div className="text-[10px] text-slate-400 mt-1">Mechanism delivery expected tomorrow</div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
      </div>
    </div>
  );
};
