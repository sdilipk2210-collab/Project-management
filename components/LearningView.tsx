
import React from 'react';
import { BookOpen, CheckCircle, Circle, Plus } from 'lucide-react';
import { Project, Task } from '../types';

interface LearningViewProps {
  projects?: Project[];
  tasks?: Task[];
  onEditProject?: (project: Project) => void;
  onEditTask?: (task: Task) => void;
}

export const LearningView = ({ projects = [], tasks = [], onEditProject, onEditTask }: LearningViewProps) => {
  
  // Filter for projects marked as Learning
  const learningProjects = projects.filter(p => p.subTag === 'Learning');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
        
        {/* Header */}
        <div>
            <h2 className="text-xl font-bold text-slate-800 flex items-center">
                <span className="text-pink-500 mr-2">🧠</span> Learning HQ
            </h2>
            <p className="text-slate-500 text-sm mt-1">
                Active learning streams. Assign tasks to these projects to track progress.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Main Content - Dynamic Learning Streams */}
            <div className="lg:col-span-8 space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center text-slate-700 font-bold">
                             <span className="mr-2 text-pink-400"><BookOpen size={20}/></span> Active Streams
                        </div>
                    </div>

                    <div className="space-y-6">
                        {learningProjects.length === 0 ? (
                            <div className="text-center p-8 text-slate-400 italic bg-slate-50 rounded-xl border border-slate-100 border-dashed">
                                No learning streams found.<br/>Create a new Project and set Category to "Learning".
                            </div>
                        ) : (
                            learningProjects.map(proj => {
                                const projTasks = tasks.filter(t => t.projectId === proj.id);
                                const totalTasks = projTasks.length;
                                const completedTasks = projTasks.filter(t => t.status === 'Done').length;
                                const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

                                return (
                                    <div key={proj.id} className="border border-slate-100 rounded-xl p-4 bg-slate-50/50 hover:shadow-md transition-all group">
                                        
                                        {/* Project Header (Clickable) */}
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 
                                                onClick={() => onEditProject && onEditProject(proj)}
                                                className="font-bold text-slate-800 text-sm hover:text-pink-600 transition-colors cursor-pointer"
                                            >
                                                {proj.title}
                                            </h4>
                                            <span className={`text-[10px] border px-2 py-0.5 rounded-full bg-white ${proj.status === 'Completed' ? 'border-emerald-200 text-emerald-600' : 'border-slate-200 text-slate-500'}`}>
                                                {proj.status}
                                            </span>
                                        </div>
                                        
                                        <div className="text-xs text-slate-400 mb-3">{proj.description || "No description provided."}</div>
                                        
                                        {/* Progress Bar */}
                                        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden mb-4">
                                            <div 
                                                className="bg-pink-400 h-full rounded-full transition-all duration-500"
                                                style={{ width: `${progress}%` }}
                                            ></div>
                                        </div>

                                        {/* Associated Learning Tasks */}
                                        <div className="space-y-1.5 mt-2">
                                            <div className="flex justify-between items-center">
                                                <h5 className="text-[10px] font-bold text-slate-500 uppercase">Modules / Tasks</h5>
                                            </div>
                                            
                                            {projTasks.length === 0 ? (
                                                <div className="text-[10px] text-slate-400 italic py-1">No modules assigned yet. Assign a task to this project.</div>
                                            ) : (
                                                projTasks.map(task => (
                                                    <div 
                                                        key={task.id} 
                                                        onClick={() => onEditTask && onEditTask(task)}
                                                        className="flex items-center space-x-2 text-xs p-2 bg-white border border-slate-100 rounded-lg hover:border-pink-200 cursor-pointer transition-colors"
                                                    >
                                                        {task.status === 'Done' ? <CheckCircle size={14} className="text-emerald-500" /> : <Circle size={14} className="text-slate-300" />}
                                                        <span className={`${task.status === 'Done' ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                                                            {task.title}
                                                        </span>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
                
                {/* Focus Card */}
                <div className="bg-pink-50 rounded-2xl border border-pink-100 p-6">
                    <h3 className="font-bold text-pink-900 flex items-center mb-2">
                        <span className="text-xl mr-2">🎯</span> Weekly Focus
                    </h3>
                    <p className="text-xs text-pink-700 mb-4 opacity-80">Prioritize your learning.</p>

                    <ul className="space-y-3 text-xs text-pink-900 font-medium">
                        <li className="flex items-start"><span className="mr-2 text-pink-500">•</span> Complete injection molding module 2</li>
                        <li className="flex items-start"><span className="mr-2 text-pink-500">•</span> Do 1 CAD assembly mini-project</li>
                    </ul>
                </div>

                 {/* Review Card */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <h3 className="font-bold text-slate-800 flex items-center mb-2">
                        <span className="text-xl mr-2">📑</span> Reflection
                    </h3>
                    <p className="text-xs text-slate-400 mb-4">Reuse as a weekly review template.</p>

                    <ul className="space-y-2 text-xs text-slate-500">
                        <li className="flex items-start"><span className="mr-2">•</span> What did I actually learn this week?</li>
                        <li className="flex items-start"><span className="mr-2">•</span> Where did I get stuck?</li>
                        <li className="flex items-start"><span className="mr-2">•</span> What real project can I apply this to?</li>
                    </ul>
                </div>

            </div>

        </div>
    </div>
  );
};
