import React from 'react';
import { Armchair, Factory, Truck, Wrench, Lightbulb, Calendar, Globe, Image, Search } from 'lucide-react';
import { Company, Task, Project } from '../types';

interface DKDashboardProps {
  tasks: Task[];
  projects: Project[];
  onEditTask: (t: Task) => void;
  onEditProject: (p: Project) => void;
  onToggleTask: (t: Task) => void;
}

export const DKDashboard = ({ tasks, projects, onEditTask, onEditProject, onToggleTask }: DKDashboardProps) => {
  
  const myTasks = tasks.filter(t => t.company === Company.DK && t.status !== 'Done');
  const myProjects = projects.filter(p => p.company === Company.DK);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-100 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center shadow-sm">
          <div className="flex items-center space-x-4">
              <div className="p-3 bg-rose-500 rounded-xl text-white shadow-lg shadow-rose-200">
                  <Armchair size={24} />
              </div>
              <div>
                  <h2 className="text-xl font-bold text-slate-800 tracking-tight">DK HQ</h2>
                  <p className="text-slate-500 text-sm">Auditorium chairs, assembly lines, and large-scale installation projects.</p>
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
            <h3 className="font-bold text-slate-700 flex items-center"><span className="mr-2">📋</span> Tasks</h3>
            <div className="bg-white rounded-2xl border border-slate-200 p-1 shadow-sm min-h-[100px]">
                {myTasks.length === 0 ? <p className="p-4 text-xs text-slate-400">No open tasks.</p> : myTasks.map(task => (
                    <div key={task.id} onClick={() => onEditTask(task)} className="p-4 border-b last:border-0 border-slate-50 hover:bg-slate-50 flex justify-between items-center group cursor-pointer transition-colors">
                        <div>
                            <h4 className="font-semibold text-slate-800 text-sm">{task.title}</h4>
                            <div className="flex items-center space-x-2 mt-1">
                                <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500">DK · {task.tag}</span>
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

       {/* Website & Portfolio Section */}
      <div className="bg-slate-100 rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
             <h3 className="text-lg font-bold text-slate-800 flex items-center">
                 <span className="mr-2 text-rose-500"><Globe size={20} /></span> Website & Portfolio
             </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center space-x-2 mb-2 text-slate-700 font-bold text-sm">
                    <Image size={16} /> <span>Recent Project Uploads</span>
                </div>
                <div className="text-xs text-slate-500">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                        <span>City Hall Auditorium</span>
                        <span className="text-emerald-500 font-bold">Live</span>
                    </div>
                    <div className="flex justify-between py-1 pt-2">
                        <span>PVR Cinema Renovation</span>
                        <span className="text-amber-500 font-bold">Pending</span>
                    </div>
                </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                 <div className="flex items-center space-x-2 mb-2 text-slate-700 font-bold text-sm">
                    <Search size={16} /> <span>SEO Focus</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    <span className="text-[10px] bg-rose-50 text-rose-700 px-2 py-1 rounded">auditorium seating india</span>
                    <span className="text-[10px] bg-rose-50 text-rose-700 px-2 py-1 rounded">cinema chairs manufacturer</span>
                </div>
            </div>
        </div>
      </div>

      {/* Production & Dispatch OS */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
            <span className="text-2xl text-rose-500"><Factory size={24} /></span>
            <h2 className="text-xl font-bold text-slate-800">Production & Assembly</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Col: Pipeline + Inventory */}
            <div className="lg:col-span-8 space-y-6">
                
                {/* Assembly Pipeline */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                     <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center text-slate-800 font-bold">
                            <Wrench size={18} className="mr-2 text-slate-400" /> Assembly Pipeline
                        </div>
                     </div>

                     <div className="space-y-3">
                         <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                             <h4 className="font-bold text-slate-700 text-sm">Omega – Order #402</h4>
                             <div className="mt-2 w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                                 <div className="bg-rose-400 h-full w-3/4 rounded-full"></div>
                             </div>
                             <div className="flex justify-between mt-2 text-xs text-slate-500">
                                 <span>150/200 Assembled</span>
                                 <span className="text-rose-500 font-medium">Delayed</span>
                             </div>
                         </div>
                     </div>
                </div>

                {/* Inventory Status */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <div className="flex items-center space-x-2 mb-4 text-slate-800 font-bold">
                        <Truck size={18} className="mr-2 text-slate-400" /> Inventory
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-rose-50 p-4 rounded-xl border border-rose-100">
                            <h4 className="font-semibold text-rose-900 text-sm">Red Velvet Fabric</h4>
                            <div className="flex justify-between mt-2">
                                <span className="text-xs text-rose-700">Stock: 400m</span>
                                <span className="text-[10px] text-rose-500 font-bold">OK</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Col: Improvement & Installation */}
            <div className="lg:col-span-4 space-y-6">
                <div className="bg-yellow-50 rounded-2xl border border-yellow-100 p-5">
                    <div className="flex items-center space-x-2 mb-3">
                        <Lightbulb size={18} className="text-yellow-600"/>
                        <h3 className="font-bold text-slate-800">Improvement & Design</h3>
                    </div>
                    <ul className="space-y-2">
                        <li className="text-xs text-yellow-900 font-medium flex items-start">
                            <span className="mr-2">•</span> Modular cupholder prototype
                        </li>
                    </ul>
                </div>
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                    <div className="flex items-center space-x-2 mb-2">
                         <div className="bg-rose-100 text-rose-600 p-1 rounded">
                             <Calendar size={16} />
                         </div>
                        <h3 className="font-bold text-slate-800">Installation Calendar</h3>
                    </div>
                    <div className="space-y-3">
                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                            <div className="text-xs font-bold text-slate-700">School Auditorium (Pune)</div>
                            <div className="text-[10px] text-slate-400 mt-1">Dec 12 - Dec 15</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};