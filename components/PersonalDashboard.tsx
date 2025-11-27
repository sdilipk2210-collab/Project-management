
import React from 'react';
import { Pill, Home, CheckSquare } from 'lucide-react';
import { Task, Company, Project } from '../types';
import { LearningView } from './LearningView';

interface PersonalDashboardProps {
  tasks: Task[];
  projects?: Project[];
  onEditTask: (t: Task) => void;
  onEditProject?: (p: Project) => void;
  onToggleTask: (t: Task) => void;
}

export const PersonalDashboard = ({ tasks, projects, onEditTask, onEditProject, onToggleTask }: PersonalDashboardProps) => {
  const personalTasks = tasks.filter(t => t.company === Company.PERSONAL && t.status !== 'Done');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center shadow-sm">
          <div className="flex items-center space-x-4">
              <div className="p-3 bg-emerald-500 rounded-xl text-white shadow-lg shadow-emerald-200">
                  <Home size={24} />
              </div>
              <div>
                  <h2 className="text-xl font-bold text-slate-800 tracking-tight">Personal HQ</h2>
                  <p className="text-slate-500 text-sm">Growth, health, errands, and finances.</p>
              </div>
          </div>
          <div className="mt-4 md:mt-0 px-4 py-2 bg-white rounded-lg shadow-sm border border-slate-200 text-xs font-semibold text-slate-600">
              Open Tasks: {personalTasks.length}
          </div>
      </div>

      {/* Row 1: Tasks & Medicine */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Personal Tasks */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
             <h3 className="font-bold text-slate-800 flex items-center mb-4">
                 <span className="mr-2 text-emerald-500"><CheckSquare size={20} /></span> Personal & Errands
             </h3>
             <div className="space-y-2">
                 {personalTasks.length === 0 ? <p className="text-xs text-slate-400 italic">No personal tasks pending.</p> : personalTasks.map(task => (
                     <div key={task.id} onClick={() => onEditTask(task)} className="p-3 border border-slate-100 rounded-xl hover:bg-slate-50 flex justify-between items-center cursor-pointer">
                         <div className="flex items-center space-x-3">
                            <div 
                                onClick={(e) => { e.stopPropagation(); onToggleTask(task); }}
                                className="w-5 h-5 rounded border border-slate-300 hover:border-emerald-400 cursor-pointer"
                            ></div>
                            <div>
                                <div className="text-sm font-medium text-slate-700">{task.title}</div>
                                <div className="text-[10px] text-slate-400">{task.tag} · {task.date}</div>
                            </div>
                         </div>
                         <span className={`text-[10px] px-2 py-0.5 rounded border ${task.priority === 'P1' ? 'bg-rose-50 border-rose-100 text-rose-500' : 'bg-slate-50 border-slate-100 text-slate-500'}`}>{task.priority}</span>
                     </div>
                 ))}
             </div>
          </div>

          {/* Medicine & Habits */}
          <div className="bg-sky-50 rounded-2xl border border-sky-100 p-6">
             <h3 className="font-bold text-slate-800 flex items-center mb-4">
                 <span className="mr-2 text-sky-500"><Pill size={20} /></span> Medicine & Habits
             </h3>
             <div className="space-y-3">
                 <div className="bg-white p-3 rounded-xl border border-sky-100 flex justify-between items-center">
                     <div>
                         <div className="font-bold text-slate-700 text-sm">Vitamin D (60k IU)</div>
                         <div className="text-[10px] text-slate-400">Weekly · After Dinner</div>
                     </div>
                     <span className="text-[10px] bg-sky-100 text-sky-700 px-2 py-1 rounded font-bold">Take Today</span>
                 </div>
                 <div className="bg-white p-3 rounded-xl border border-sky-100 flex justify-between items-center opacity-70">
                     <div>
                         <div className="font-bold text-slate-700 text-sm">Morning Stretch</div>
                         <div className="text-[10px] text-slate-400">Daily · 15 mins</div>
                     </div>
                     <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded font-bold">Done</span>
                 </div>
             </div>
          </div>

      </div>

      <hr className="border-slate-200" />

      {/* Row 2: Learning View */}
      <LearningView 
        projects={projects}
        tasks={tasks}
        onEditProject={onEditProject}
        onEditTask={onEditTask}
      />

    </div>
  );
};
