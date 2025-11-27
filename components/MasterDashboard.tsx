
import React, { useState } from 'react';
import { 
  Building2, 
  Home, 
  Pill, 
  ListTodo, 
  MoreHorizontal,
  FolderOpen,
  Check,
  BookOpen
} from 'lucide-react';
import { Company, Task, Project, Idea } from '../types';

interface MasterDashboardProps {
  tasks: Task[];
  projects: Project[];
  ideas: Idea[];
  onEditTask: (task: Task) => void;
  onEditProject: (project: Project) => void;
  onEditIdea: (idea: Idea) => void;
  onToggleTask: (task: Task) => void;
}

// Components
const StatCard = ({ title, count, subtitle, colorClass, icon }: any) => (
  <div className={`p-5 rounded-2xl border bg-white shadow-sm flex flex-col justify-between h-32 relative overflow-hidden group hover:shadow-md transition-shadow`}>
    <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${colorClass}`}>
        {icon}
    </div>
    <div>
      <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase">{title}</h3>
      <div className="mt-2 text-4xl font-bold text-slate-800">{count}</div>
    </div>
    {subtitle && <div className="text-xs text-slate-400 font-medium">{subtitle}</div>}
    <div className={`absolute bottom-0 left-0 w-full h-1 ${colorClass.replace('text-', 'bg-').split(' ')[0]}`}></div>
  </div>
);

const TaskItem: React.FC<{ task: Task, onClick: () => void, onToggle: (t: Task) => void }> = ({ task, onClick, onToggle }) => {
  const getBadgeColor = (c: string) => {
    switch (c) {
      case Company.MAKTUNE: return 'bg-blue-100 text-blue-700 border-blue-200';
      case Company.DK: return 'bg-rose-100 text-rose-700 border-rose-200';
      case Company.DE: return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getPriorityColor = (p: string) => {
    if (p === 'P1') return 'text-rose-600 bg-rose-50 border-rose-100';
    if (p === 'P2') return 'text-orange-600 bg-orange-50 border-orange-100';
    return 'text-green-600 bg-green-50 border-green-100';
  };

  const isDone = task.status === 'Done';

  return (
    <div 
        onClick={onClick}
        className="flex items-center justify-between p-3 mb-2 bg-white border border-slate-100 rounded-xl hover:border-slate-300 transition-colors group cursor-pointer shadow-sm hover:shadow"
    >
      <div className="flex items-center space-x-3">
        {/* Tick Box */}
        <div 
            onClick={(e) => { e.stopPropagation(); onToggle(task); }}
            className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all cursor-pointer z-10 
              ${isDone ? 'bg-emerald-400 border-emerald-400 text-white' : 'border-slate-200 bg-slate-50 hover:border-emerald-300'}`}
        >
            {isDone && <Check size={14} strokeWidth={3} />}
        </div>

        <div className={`transition-opacity duration-300 ${isDone ? 'opacity-50' : 'opacity-100'}`}>
          <h4 className={`text-sm font-semibold text-slate-800 transition-all ${isDone ? 'line-through text-slate-400' : ''}`}>
              {task.title}
          </h4>
          <div className="flex items-center space-x-2 mt-1">
            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getBadgeColor(task.company)}`}>
              {task.company} · {task.tag}
            </span>
            <span className="text-[10px] text-slate-400 flex items-center">
              📅 {task.date}
            </span>
          </div>
        </div>
      </div>
      <span className={`text-xs font-bold px-2 py-1 rounded-md border ${getPriorityColor(task.priority)}`}>
        {task.priority}
      </span>
    </div>
  );
};

const ProjectCard: React.FC<{ project: Project, onClick: () => void }> = ({ project, onClick }) => {
  const getCompanyColor = (c: string) => {
    switch (c) {
        case Company.MAKTUNE: return 'bg-blue-500';
        case Company.DK: return 'bg-rose-500';
        case Company.DE: return 'bg-orange-500';
        default: return 'bg-slate-400';
    }
  };
  
  const getStatusColor = (s: string) => {
      if (s === 'In Progress') return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      if (s === 'Planning') return 'bg-sky-100 text-sky-700 border-sky-200';
      if (s === 'Completed') return 'bg-slate-100 text-slate-500 border-slate-200';
      return 'bg-slate-100 text-slate-700';
  };

  // Subtask calculation
  const totalSubtasks = project.subtasks?.length || 0;
  const completedSubtasks = project.subtasks?.filter(s => s.isCompleted).length || 0;
  const progressPercent = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

  return (
    <div onClick={onClick} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow mb-3 cursor-pointer">
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-sm font-bold text-slate-800 flex-1 pr-2">{project.title}</h4>
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getStatusColor(project.status)}`}>
            {project.status}
        </span>
      </div>
      
      {/* Subtask Progress Bar (only if subtasks exist) */}
      {totalSubtasks > 0 && (
          <div className="mb-2">
              <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                  <span>Progress</span>
                  <span>{completedSubtasks}/{totalSubtasks}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${completedSubtasks === totalSubtasks ? 'bg-emerald-400' : 'bg-blue-400'}`} 
                    style={{ width: `${progressPercent}%` }}
                  ></div>
              </div>
          </div>
      )}

      <div className="flex items-center space-x-2">
         <span className={`text-[10px] px-2 py-0.5 rounded-full bg-slate-50 border border-slate-200 text-slate-500 flex items-center`}>
            <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${getCompanyColor(project.company)}`}></div>
            {project.company}
         </span>
         <span className="text-[10px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-200">
             {project.subTag}
         </span>
      </div>
    </div>
  );
};

export const MasterDashboard = ({ tasks, projects, ideas, onEditTask, onEditProject, onEditIdea, onToggleTask }: MasterDashboardProps) => {
  const [filterMode, setFilterMode] = useState<'today' | 'week'>('today');

  const openTasksCount = tasks.filter(t => t.status !== 'Done').length;
  const businessTasksCount = tasks.filter(t => t.status !== 'Done' && t.company !== 'Personal').length;
  const personalTasksCount = tasks.filter(t => t.status !== 'Done' && t.company === 'Personal').length;
  
  // Learning Projects Logic
  const learningProjects = projects.filter(p => p.subTag === 'Learning');

  // Recent ideas logic
  const recentIdeas = ideas.slice(0, 3);

  // Filter Tasks for "Today / This Week" list
  const getFilteredTasks = () => {
      const today = new Date().toISOString().split('T')[0];
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      
      return tasks.filter(task => {
          if (filterMode === 'today') {
              return task.date === today;
          } else {
              // Check if task date is between today and next week
              const tDate = new Date(task.date);
              const now = new Date();
              // Reset times for simpler comparison
              now.setHours(0,0,0,0);
              tDate.setHours(0,0,0,0);
              
              const diffTime = tDate.getTime() - now.getTime();
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
              
              return diffDays >= 0 && diffDays <= 7;
          }
      });
  };

  const displayTasks = getFilteredTasks();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
            title="OPEN TASKS" 
            count={openTasksCount} 
            colorClass="text-rose-500" 
            icon={<ListTodo size={48} />}
        />
        <StatCard 
            title="BUSINESS TASKS" 
            count={businessTasksCount} 
            colorClass="text-blue-500"
            icon={<Building2 size={48} />}
        />
        <StatCard 
            title="PERSONAL + HEALTH" 
            count={personalTasksCount} 
            colorClass="text-emerald-500"
            icon={<Home size={48} />}
        />
        <StatCard 
            title="MEDICINE REMINDERS" 
            count="1" 
            colorClass="text-amber-500"
            icon={<Pill size={48} />}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Tasks */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-slate-800 flex items-center">
              <span className="text-rose-500 mr-2">🎯</span> {filterMode === 'today' ? 'Today' : 'This Week'}
            </h2>
            <div className="flex items-center space-x-2">
                <button 
                    onClick={() => setFilterMode('today')}
                    className={`text-xs px-3 py-1 rounded-md font-medium shadow-sm border transition-all ${filterMode === 'today' ? 'bg-white text-slate-800 border-slate-200' : 'bg-slate-100 text-slate-500 border-transparent hover:bg-slate-200'}`}
                >
                    Today
                </button>
                <button 
                     onClick={() => setFilterMode('week')}
                     className={`text-xs px-3 py-1 rounded-md font-medium shadow-sm border transition-all ${filterMode === 'week' ? 'bg-white text-slate-800 border-slate-200' : 'bg-slate-100 text-slate-500 border-transparent hover:bg-slate-200'}`}
                >
                    This Week
                </button>
            </div>
          </div>

          <div className="bg-slate-50/50 rounded-2xl p-1 min-h-[200px]">
             {displayTasks.length === 0 ? (
                 <div className="text-center p-8 flex flex-col items-center justify-center text-slate-400">
                     <div className="mb-2 opacity-50"><Check size={24} /></div>
                     <div className="text-sm font-medium">No tasks for {filterMode === 'today' ? 'today' : 'this week'}.</div>
                 </div>
             ) : (
                 displayTasks.map(task => (
                     <TaskItem 
                        key={task.id} 
                        task={task} 
                        onClick={() => onEditTask(task)} 
                        onToggle={onToggleTask}
                    />
                 ))
             )}
          </div>
          
           {/* Bottom Left: Idea Pipeline Summary */}
           <div className="mt-8 pt-4">
               <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                   <span className="text-yellow-500 mr-2">💡</span> Idea Pipeline
               </h2>
               <div className="grid grid-cols-3 gap-4">
                   {/* Brain Dump */}
                   <div className="bg-purple-50 border border-purple-100 p-4 rounded-xl flex flex-col h-full">
                       <div className="flex items-center space-x-2 mb-2 text-purple-700 text-xs font-bold uppercase">
                           <span>🧠</span> <span>Brain Dump</span>
                       </div>
                       {recentIdeas.filter(i => i.stage === 'Brain Dump').length === 0 && <div className="text-[10px] text-purple-300 italic">Empty</div>}
                       {recentIdeas.filter(i => i.stage === 'Brain Dump').slice(0,1).map(i => (
                           <div 
                                key={i.id} 
                                onClick={() => onEditIdea(i)}
                                className="bg-white p-3 rounded-lg border border-purple-100 shadow-sm text-sm font-medium text-slate-700 cursor-pointer hover:shadow-md transition-shadow hover:scale-[1.02]"
                            >
                               {i.title}
                               <div className="text-[10px] text-purple-400 mt-1">{i.company} · Impact: {i.impact}</div>
                           </div>
                       ))}
                   </div>

                   {/* Under Validation */}
                   <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl flex flex-col h-full">
                       <div className="flex items-center space-x-2 mb-2 text-amber-700 text-xs font-bold uppercase">
                           <span>🧪</span> <span>Under Validation</span>
                       </div>
                       {recentIdeas.filter(i => i.stage === 'Under Validation').length === 0 && <div className="text-[10px] text-amber-300 italic">Empty</div>}
                       {recentIdeas.filter(i => i.stage === 'Under Validation').slice(0,1).map(i => (
                           <div 
                                key={i.id} 
                                onClick={() => onEditIdea(i)}
                                className="bg-white p-3 rounded-lg border border-amber-100 shadow-sm text-sm font-medium text-slate-700 cursor-pointer hover:shadow-md transition-shadow hover:scale-[1.02]"
                            >
                               {i.title}
                               <div className="text-[10px] text-amber-400 mt-1">{i.company} · Impact: {i.impact}</div>
                           </div>
                       ))}
                   </div>

                   {/* In Project */}
                   <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex flex-col h-full">
                       <div className="flex items-center space-x-2 mb-2 text-emerald-700 text-xs font-bold uppercase">
                           <span>🚀</span> <span>In Project</span>
                       </div>
                       {recentIdeas.filter(i => i.stage === 'In Project').length === 0 && <div className="text-[10px] text-emerald-300 italic">Empty</div>}
                       {recentIdeas.filter(i => i.stage === 'In Project').slice(0,1).map(i => (
                           <div 
                                key={i.id} 
                                onClick={() => onEditIdea(i)}
                                className="bg-white p-3 rounded-lg border border-emerald-100 shadow-sm text-sm font-medium text-slate-700 cursor-pointer hover:shadow-md transition-shadow hover:scale-[1.02]"
                            >
                               {i.title}
                               <div className="text-[10px] text-emerald-400 mt-1">{i.company} · Impact: {i.impact}</div>
                           </div>
                       ))}
                   </div>
               </div>
           </div>
        </div>

        {/* Right Column: Projects & Overview */}
        <div className="lg:col-span-5 space-y-8">
            
            {/* Active Projects */}
            <div>
                 <h2 className="text-xl font-bold text-slate-800 mb-1 flex items-center">
                    <span className="text-amber-400 mr-2">📂</span> Active Projects
                </h2>
                <p className="text-slate-400 text-xs mb-4">Quarterly bets across all companies.</p>

                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm min-h-[150px]">
                    {projects.filter(p => p.subTag !== 'Learning').length === 0 ? (
                        <div className="text-center p-4 text-slate-400 text-sm">No active projects.</div>
                    ) : (
                        projects.filter(p => p.subTag !== 'Learning').map(p => (
                            <ProjectCard key={p.id} project={p} onClick={() => onEditProject(p)} />
                        ))
                    )}
                </div>
            </div>

            {/* Learning Tracker (New Section) */}
             <div>
                <h2 className="text-xl font-bold text-slate-800 mb-1 flex items-center">
                    <span className="text-pink-500 mr-2">🧠</span> Active Learning
                </h2>
                <p className="text-slate-400 text-xs mb-4">Current skills in development.</p>
                
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                    {learningProjects.length === 0 ? (
                        <div className="text-xs text-slate-400 italic">No learning streams active.</div>
                    ) : (
                        learningProjects.slice(0, 3).map(p => {
                            const pTasks = tasks.filter(t => t.projectId === p.id);
                            const done = pTasks.filter(t => t.status === 'Done').length;
                            const total = pTasks.length;
                            const pct = total > 0 ? (done / total) * 100 : 0;
                            
                            return (
                                <div key={p.id} onClick={() => onEditProject(p)} className="cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors">
                                    <div className="flex justify-between items-center mb-1">
                                        <div className="text-sm font-semibold text-slate-700">{p.title}</div>
                                        <div className="text-xs text-slate-400">{done}/{total}</div>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                        <div className="bg-pink-400 h-full rounded-full" style={{ width: `${pct}%` }}></div>
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>
            </div>

            {/* Life Overview */}
            <div>
                <h2 className="text-xl font-bold text-slate-800 mb-1 flex items-center">
                    <span className="text-sky-500 mr-2">🌈</span> Life Overview
                </h2>
                <p className="text-slate-400 text-xs mb-4">Personal, health, medicine & money in one glance.</p>
                
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                    
                    {/* Progress Items */}
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-semibold text-amber-600 flex items-center"><span className="mr-2">🧡</span> Personal & Errands</span>
                            <span className="text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-500">{personalTasksCount} tasks</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-400 w-3/4 rounded-full"></div>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-semibold text-emerald-600 flex items-center"><span className="mr-2">💚</span> Health</span>
                            <span className="text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-500">1 open habits</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-400 w-1/3 rounded-full"></div>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-semibold text-sky-600 flex items-center"><span className="mr-2">💊</span> Medicine</span>
                            <span className="text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-500">1 reminders today</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-sky-400 w-1/2 rounded-full"></div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
      </div>
    </div>
  );
};
