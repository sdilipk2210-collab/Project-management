
import React, { useState, useEffect } from 'react';
import { X, Check, Trash2, Search, Plus, Square, CheckSquare } from 'lucide-react';
import { Company, Task, Project, Idea, ItemType, Subtask } from '../types';

interface EditModalProps {
  isOpen: boolean;
  mode: 'create' | 'edit';
  type: ItemType;
  initialData?: any;
  onClose: () => void;
  onSave: (data: any) => void;
  onDelete?: (id: string) => void;
  projects?: Project[];
}

export const EditModal = ({ isOpen, mode, type, initialData, onClose, onSave, onDelete, projects }: EditModalProps) => {
  const [formData, setFormData] = useState<any>({});
  
  // Task - Project Assignment State
  const [projectSearch, setProjectSearch] = useState('');
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);

  // Project - Subtask State
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');

  useEffect(() => {
    if (isOpen) {
        if (mode === 'edit' && initialData) {
            setFormData({ ...initialData, subtasks: initialData.subtasks || [] });
            // Pre-fill search if a project is linked
            if (initialData.projectId && projects) {
                const linkedProject = projects.find(p => p.id === initialData.projectId);
                if (linkedProject) setProjectSearch(linkedProject.title);
            } else {
                setProjectSearch('');
            }
        } else {
            // Creation Mode
            setFormData({
                id: Math.random().toString(36).substr(2, 9),
                title: '',
                description: '',
                // Use passed initialData.company if available (smart default), otherwise Maktune
                company: initialData?.company || 'Maktune',
                priority: 'P2',
                status: 'Todo',
                date: new Date().toISOString().split('T')[0],
                tag: 'General',
                stage: 'Brain Dump',
                impact: 'Medium',
                subTag: 'General',
                subtasks: []
            });
            setProjectSearch('');
        }
    }
  }, [isOpen, initialData, mode, type, projects]);

  if (!isOpen) return null;

  const handleChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  // --- Task Specific Handlers ---
  const handleProjectSelect = (project: Project) => {
      setFormData((prev: any) => ({
          ...prev,
          projectId: project.id,
          projectTitle: project.title,
          company: project.company, // Smart fill company from project
          tag: project.subTag // Smart fill tag from project subTag
      }));
      setProjectSearch(project.title);
      setIsProjectDropdownOpen(false);
  };

  const filteredProjects = projects?.filter(p => 
      p.title.toLowerCase().includes(projectSearch.toLowerCase())
  ) || [];

  // --- Project Specific Handlers (Subtasks) ---
  const handleAddSubtask = () => {
      if (!newSubtaskTitle.trim()) return;
      const newSubtask: Subtask = {
          id: Math.random().toString(36).substr(2, 9),
          title: newSubtaskTitle,
          isCompleted: false
      };
      setFormData((prev: any) => ({
          ...prev,
          subtasks: [...(prev.subtasks || []), newSubtask]
      }));
      setNewSubtaskTitle('');
  };

  const handleToggleSubtask = (subtaskId: string) => {
      setFormData((prev: any) => ({
          ...prev,
          subtasks: prev.subtasks.map((st: Subtask) => 
              st.id === subtaskId ? { ...st, isCompleted: !st.isCompleted } : st
          )
      }));
  };

  const handleDeleteSubtask = (subtaskId: string) => {
      setFormData((prev: any) => ({
          ...prev,
          subtasks: prev.subtasks.filter((st: Subtask) => st.id !== subtaskId)
      }));
  };


  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 flex-shrink-0">
          <h3 className="text-lg font-bold text-slate-800 capitalize">
            {mode} {type}
          </h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-200 text-slate-500 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Title</label>
            <input 
              required
              type="text" 
              value={formData.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-400 focus:outline-none"
              placeholder={`Enter ${type} title...`}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Description</label>
            <textarea 
              rows={3}
              value={formData.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-400 focus:outline-none resize-none"
              placeholder={`What is this ${type} about?`}
            />
          </div>

          {/* Company & Status Row */}
          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Company</label>
                <select 
                  value={formData.company || 'Maktune'}
                  onChange={(e) => handleChange('company', e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white"
                >
                    <option value="Maktune">Maktune</option>
                    <option value="DK">DK</option>
                    <option value="DE">DE</option>
                    <option value="Personal">Personal</option>
                </select>
             </div>

             {/* Type Specific Fields */}
             {type === 'task' && (
               <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Priority</label>
                  <select 
                    value={formData.priority || 'P2'}
                    onChange={(e) => handleChange('priority', e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white"
                  >
                      <option value="P1">P1 - Urgent</option>
                      <option value="P2">P2 - Important</option>
                      <option value="P3">P3 - Later</option>
                  </select>
               </div>
             )}
             {type === 'idea' && (
               <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Impact</label>
                  <select 
                    value={formData.impact || 'Medium'}
                    onChange={(e) => handleChange('impact', e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white"
                  >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                  </select>
               </div>
             )}
             {type === 'project' && (
               <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Status</label>
                  <select 
                    value={formData.status || 'Planning'}
                    onChange={(e) => handleChange('status', e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white"
                  >
                      <option value="Planning">Planning</option>
                      <option value="In Progress">In Progress</option>
                      <option value="In Testing">In Testing</option>
                      <option value="Completed">Completed</option>
                  </select>
               </div>
             )}
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-4">
             {type === 'task' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Due Date</label>
                    <input 
                      type="date" 
                      value={formData.date || ''}
                      onChange={(e) => handleChange('date', e.target.value)}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white"
                    />
                  </div>
                   <div className="relative">
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Assign Project</label>
                    <div className="relative">
                        <input 
                            type="text" 
                            value={projectSearch}
                            onChange={(e) => {
                                setProjectSearch(e.target.value);
                                setIsProjectDropdownOpen(true);
                                if (e.target.value === '') {
                                    handleChange('projectId', '');
                                }
                            }}
                            onFocus={() => setIsProjectDropdownOpen(true)}
                            className="w-full border border-slate-200 rounded-lg pl-8 pr-3 py-2 text-sm"
                            placeholder="Search projects..."
                        />
                        <Search size={14} className="absolute left-2.5 top-2.5 text-slate-400" />
                        
                        {isProjectDropdownOpen && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto">
                                {filteredProjects.length === 0 ? (
                                    <div className="p-3 text-xs text-slate-400 italic">No projects found.</div>
                                ) : (
                                    filteredProjects.map(p => (
                                        <div 
                                            key={p.id}
                                            onClick={() => handleProjectSelect(p)}
                                            className="px-3 py-2 hover:bg-slate-50 cursor-pointer border-b border-slate-50 last:border-0"
                                        >
                                            <div className="text-sm font-medium text-slate-800">{p.title}</div>
                                            <div className="text-[10px] text-slate-400">{p.company} · {p.subTag}</div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                  </div>
                </>
             )}

             {type === 'project' && (
                <div className="col-span-2">
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Sub-Tag / Category</label>
                    <input 
                      type="text" 
                      value={formData.subTag || ''}
                      onChange={(e) => handleChange('subTag', e.target.value)}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
                      placeholder="e.g. Website, Production"
                    />
                </div>
             )}

             {type === 'idea' && (
                <div className="col-span-2">
                   <label className="block text-xs font-semibold text-slate-500 mb-1">Stage</label>
                   <select 
                      value={formData.stage || 'Brain Dump'}
                      onChange={(e) => handleChange('stage', e.target.value)}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white"
                    >
                        <option value="Brain Dump">Brain Dump</option>
                        <option value="Under Validation">Under Validation</option>
                        <option value="In Project">In Project</option>
                    </select>
                </div>
             )}
          </div>

          {/* PROJECT SUBTASKS SECTION */}
          {type === 'project' && (
              <div className="border-t border-slate-100 pt-4">
                   <label className="block text-xs font-semibold text-slate-500 mb-2">Project Subtasks</label>
                   
                   {/* Subtask List */}
                   <div className="space-y-2 mb-3">
                       {(!formData.subtasks || formData.subtasks.length === 0) && (
                           <div className="text-xs text-slate-400 italic">No subtasks yet.</div>
                       )}
                       {formData.subtasks?.map((subtask: Subtask) => (
                           <div key={subtask.id} className="flex items-center justify-between group">
                               <div 
                                  onClick={() => handleToggleSubtask(subtask.id)}
                                  className="flex items-center space-x-2 cursor-pointer"
                                >
                                   <div className={`text-slate-400 hover:text-emerald-500 transition-colors ${subtask.isCompleted ? 'text-emerald-500' : ''}`}>
                                       {subtask.isCompleted ? <CheckSquare size={16} /> : <Square size={16} />}
                                   </div>
                                   <span className={`text-sm text-slate-700 ${subtask.isCompleted ? 'line-through opacity-50' : ''}`}>{subtask.title}</span>
                               </div>
                               <button 
                                  type="button"
                                  onClick={() => handleDeleteSubtask(subtask.id)}
                                  className="text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
                               >
                                   <Trash2 size={14} />
                               </button>
                           </div>
                       ))}
                   </div>

                   {/* Add Subtask Input */}
                   <div className="flex space-x-2">
                       <input 
                          type="text"
                          value={newSubtaskTitle}
                          onChange={(e) => setNewSubtaskTitle(e.target.value)}
                          onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                  e.preventDefault();
                                  handleAddSubtask();
                              }
                          }}
                          className="flex-1 border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:ring-1 focus:ring-emerald-400 outline-none"
                          placeholder="Add a new subtask..."
                       />
                       <button 
                          type="button"
                          onClick={handleAddSubtask}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg px-3 py-1.5 transition-colors"
                       >
                           <Plus size={16} />
                       </button>
                   </div>
              </div>
          )}

          <div className="pt-4 flex items-center justify-between mt-auto">
             {mode === 'edit' && onDelete && (
                <button 
                  type="button" 
                  onClick={() => { onDelete(formData.id); onClose(); }}
                  className="text-rose-500 p-2 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
             )}
             <div className="flex space-x-3 ml-auto">
                <button 
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg shadow-sm flex items-center transition-colors"
                >
                  <Check size={16} className="mr-2" /> Save {type}
                </button>
             </div>
          </div>

        </form>
      </div>
    </div>
  );
};
