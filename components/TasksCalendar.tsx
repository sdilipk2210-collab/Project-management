
import React, { useState } from 'react';
import { Company, Task } from '../types';
import { Calendar as CalendarIcon, CheckSquare, Plus, ChevronDown, ChevronUp } from 'lucide-react';

interface TasksCalendarProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onToggleTask: (task: Task) => void;
}

export const TasksCalendar = ({ tasks, onEditTask, onToggleTask }: TasksCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<number | null>(new Date().getDate());

  const renderCalendar = () => {
    const days = [];
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Header
    const headers = weekDays.map(d => (
      <div key={d} className="text-center text-[10px] uppercase font-bold text-slate-400 py-2">
        {d}
      </div>
    ));

    // Days (Simple mock of current month view)
    // We'll just render 35 days, starting a bit before today to look full
    const today = new Date().getDate();
    const startDay = today - 5 > 0 ? today - 5 : 1;
    
    for (let i = 0; i < 35; i++) {
        const displayDay = (startDay + i) % 31 || 31; // Wrap around for demo visual
        const isCurrentMonth = i < 30; // Just visual mock
        const isSelected = displayDay === selectedDate && isCurrentMonth;

        // Check for tasks on this day (very simple string matching for demo)
        const hasTasks = tasks.some(t => t.date.endsWith(`-${displayDay < 10 ? '0' + displayDay : displayDay}`));

        days.push(
            <div 
                key={i} 
                onClick={() => isCurrentMonth && setSelectedDate(displayDay)}
                className={`
                    h-12 border border-slate-50 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all
                    ${isCurrentMonth ? 'bg-white hover:border-slate-300' : 'bg-slate-50 text-slate-300'}
                    ${isSelected ? 'ring-2 ring-sky-400 shadow-md z-10' : ''}
                `}
            >
                <span className={`text-sm font-medium ${isSelected ? 'text-sky-600' : 'text-slate-600'}`}>{displayDay}</span>
                {/* Dots for tasks */}
                {isCurrentMonth && hasTasks && (
                    <div className="flex space-x-0.5 mt-1">
                        <div className="w-1 h-1 rounded-full bg-emerald-400"></div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-7 gap-1">
            {headers}
            {days}
        </div>
    );
  };

  const selectedDayTasks = tasks.filter(t => 
    t.date.endsWith(`-${selectedDate && selectedDate < 10 ? '0' + selectedDate : selectedDate}`)
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in slide-in-from-bottom-4 duration-500">
      
      {/* Left Column: List */}
      <div className="lg:col-span-7 space-y-6">
        
        {/* Task List */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[400px]">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <span className="text-2xl mr-2">📋</span>
                    <h3 className="text-lg font-bold text-slate-800">All Open Tasks</h3>
                </div>
                <span className="text-xs text-slate-400">Click a task to edit or mark done.</span>
            </div>

            <div className="space-y-3">
                {tasks.length === 0 ? <p className="text-slate-400 text-sm">No tasks found.</p> : tasks.map((task) => (
                    <div key={task.id} onClick={() => onEditTask(task)} className="group border border-slate-100 rounded-xl p-4 hover:border-sky-200 hover:shadow-sm transition-all bg-slate-50/50 hover:bg-white flex items-start justify-between cursor-pointer">
                        <div className="flex items-start space-x-3">
                            <div 
                                onClick={(e) => {e.stopPropagation(); onToggleTask(task);}}
                                className={`mt-1 transition-colors hover:text-emerald-500 ${task.status === 'Done' ? 'text-emerald-500' : 'text-slate-300'}`}
                            >
                                <CheckSquare size={18} />
                            </div>
                            <div>
                                <p className={`text-sm font-semibold text-slate-800 ${task.status === 'Done' ? 'line-through opacity-50' : ''}`}>{task.title}</p>
                                <div className="flex items-center space-x-2 mt-1.5">
                                    <span className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded-full text-slate-600 font-medium">{task.company}</span>
                                    <span className="text-[10px] text-slate-400 flex items-center">🗓️ {task.date}</span>
                                    <span className="text-[10px] text-amber-500 flex items-center">🏷️ {task.tag}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </div>

      {/* Right Column: Calendar */}
      <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
               <div className="flex items-center mb-4">
                    <span className="text-blue-500 mr-2"><CalendarIcon size={24} /></span>
                    <div>
                        <h3 className="font-bold text-slate-700">Calendar</h3>
                        <p className="text-xs text-slate-400">Tap a date to see tasks for that day.</p>
                    </div>
                </div>
                
                {renderCalendar()}
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[200px]">
                <div className="flex items-center mb-4">
                    <span className="text-rose-500 mr-2">📌</span>
                    <h3 className="font-bold text-slate-700">Tasks on Selected Day</h3>
                </div>
                <p className="text-sm text-slate-500 font-medium mb-3">Day {selectedDate}</p>
                
                <div className="space-y-2">
                     {selectedDayTasks.length === 0 ? <p className="text-xs text-slate-400 italic">No tasks for this day.</p> : selectedDayTasks.map(t => (
                        <div key={t.id} onClick={() => onEditTask(t)} className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex justify-between items-center cursor-pointer hover:bg-slate-100">
                             <div>
                                 <div className={`text-sm font-medium text-slate-800 ${t.status === 'Done' ? 'line-through opacity-50' : ''}`}>{t.title}</div>
                                 <div className="text-xs text-slate-400 mt-1 flex items-center">
                                     <span className={`w-2 h-2 rounded-full mr-1.5 bg-slate-400`}></span> {t.tag}
                                 </div>
                             </div>
                             <span className="text-[10px] bg-white border border-slate-200 px-2 py-1 rounded text-slate-500">{t.company}</span>
                         </div>
                     ))}
                </div>
          </div>
      </div>

    </div>
  );
};
