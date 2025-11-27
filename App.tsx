
import React, { useState } from 'react';
import { 
  LayoutGrid, 
  CheckSquare, 
  Circle, 
  FlaskConical,
  Package,
  Plus,
  Home
} from 'lucide-react';

import { MasterDashboard } from './components/MasterDashboard';
import { TasksCalendar } from './components/TasksCalendar';
import { MaktuneDashboard } from './components/MaktuneDashboard';
import { DKDashboard } from './components/DKDashboard';
import { DEDashboard } from './components/DEDashboard';
import { ProductIdeaLab } from './components/ProductIdeaLab';
import { PersonalDashboard } from './components/PersonalDashboard';
import { EditModal } from './components/EditModal';
import { Company, Task, Project, Idea, ItemType } from './types';

// Helper for dynamic dates
const getToday = () => new Date().toISOString().split('T')[0];
const getFutureDate = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
};

// Initial Mock Data
const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Plan FBA Shipment – Batch 12', company: Company.MAKTUNE, tag: 'FBA', date: getToday(), priority: 'P1', status: 'Todo', description: 'Calculate required carton count for the holiday season stock. Ensure labels are printed correctly.', projectId: '1' },
  { id: '2', title: 'Mark drilling grid for DK auditorium', company: Company.DK, tag: 'Assembly', date: getToday(), priority: 'P1', status: 'Todo', description: 'Review the CAD drawings for the new auditorium layout and mark the floor for drilling.', projectId: '2' },
  { id: '3', title: 'Update DE hardware inventory', company: Company.DE, tag: 'Inventory', date: getFutureDate(1), priority: 'P2', status: 'Todo', description: 'Count physical stock of Gas Lifts and Nylon Bases. Update the spreadsheet.' },
  { id: '4', title: 'Buy grocery & restock fruits', company: Company.PERSONAL, tag: 'Errands', date: getToday(), priority: 'P3', status: 'Todo', description: 'Get apples, bananas, and milk. Also check for coffee beans.' },
  { id: '5', title: 'Night medicine – Vitamin D', company: Company.PERSONAL, tag: 'Medicine', date: getToday(), priority: 'P1', status: 'Todo', description: 'Take 60k IU supplement after dinner.' },
  { id: '6', title: '30-min walk + stretch', company: Company.PERSONAL, tag: 'Health', date: getToday(), priority: 'P2', status: 'Todo', description: 'Evening walk in the park. Focus on lower back stretches.' },
  { id: '7', title: 'Weld support frames for Omega', company: Company.DK, tag: 'Production', date: getFutureDate(2), priority: 'P2', status: 'Todo', description: 'Complete welding for the first 50 units of the Omega series.', projectId: '2' },
  { id: '8', title: 'Count gas lift stock', company: Company.DE, tag: 'Inventory', date: getFutureDate(2), priority: 'P3', status: 'Todo', description: 'Double check the Class 4 gas lift inventory.' },
  // Learning Tasks linked to Project 7 and 8
  { id: 'l1', title: 'Injection Molding Module 1', company: Company.PERSONAL, tag: 'Learning', date: getToday(), priority: 'P2', status: 'Done', projectId: '7' },
  { id: 'l2', title: 'Injection Molding Module 2', company: Company.PERSONAL, tag: 'Learning', date: getToday(), priority: 'P2', status: 'In Progress', projectId: '7' },
  { id: 'l3', title: 'Design a simple box in Fusion360', company: Company.PERSONAL, tag: 'Learning', date: getFutureDate(2), priority: 'P2', status: 'Todo', projectId: '8' },
];

const INITIAL_PROJECTS: Project[] = [
  { 
    id: '1', 
    title: 'Maktune – FBA Optimization Q1', 
    company: Company.MAKTUNE, 
    subTag: 'Amazon FBA', 
    status: 'In Progress', 
    description: 'Overall overhaul of FBA logistics to reduce storage fees.',
    subtasks: [
      { id: 'p1-1', title: 'Audit current storage fees', isCompleted: true },
      { id: 'p1-2', title: 'Identify slow-moving SKUs', isCompleted: true },
      { id: 'p1-3', title: 'Create removal order', isCompleted: false },
      { id: 'p1-4', title: 'Update shipment workflow', isCompleted: false }
    ]
  },
  { 
    id: '2', 
    title: 'DK – Auditorium Omega', 
    company: Company.DK, 
    subTag: 'Production', 
    status: 'In Progress', 
    description: 'Production of 200 seats for the City Hall auditorium.',
    subtasks: [
      { id: 'p2-1', title: 'Order fabric and foam', isCompleted: true },
      { id: 'p2-2', title: 'Weld base frames', isCompleted: false },
      { id: 'p2-3', title: 'Powder coating', isCompleted: false }
    ]
  },
  { 
    id: '3', 
    title: 'DE – Hardware Dispatch System', 
    company: Company.DE, 
    subTag: 'Ops Improvement', 
    status: 'Planning', 
    description: 'Implementing a barcode scanning system for dispatches.',
    subtasks: [
      { id: 'p3-1', title: 'Select barcode scanner model', isCompleted: false },
      { id: 'p3-2', title: 'Design label template', isCompleted: false }
    ]
  },
  { 
    id: '4', 
    title: 'Maktune – Ecomm Website', 
    company: Company.MAKTUNE, 
    subTag: 'Website', 
    status: 'In Progress', 
    description: 'Building the new Shopify store for direct sales.',
    subtasks: []
  },
  { 
    id: '5', 
    title: 'DK – Website Gallery Update', 
    company: Company.DK, 
    subTag: 'Website', 
    status: 'Completed', 
    description: 'Uploaded recent project photos to the portfolio page.',
    subtasks: [
      { id: 'p5-1', title: 'Collect photos from site', isCompleted: true },
      { id: 'p5-2', title: 'Resize for web', isCompleted: true },
      { id: 'p5-3', title: 'Upload to CMS', isCompleted: true }
    ]
  },
  { 
    id: '6', 
    title: 'DE – New Vendor Sourcing', 
    company: Company.DE, 
    subTag: 'Supply Chain', 
    status: 'In Progress', 
    description: 'Finding alternative suppliers for caster wheels.',
    subtasks: []
  },
  // Learning Projects
  {
    id: '7',
    title: 'Injection Molding Fundamentals',
    company: Company.PERSONAL,
    subTag: 'Learning',
    status: 'In Progress',
    description: 'Mastering the basics of plastic injection molding for Maktune products.',
    subtasks: []
  },
  {
    id: '8',
    title: 'CAD Mastery (Fusion 360)',
    company: Company.PERSONAL,
    subTag: 'Learning',
    status: 'In Progress',
    description: 'Advanced assembly features and rendering.',
    subtasks: []
  }
];

const INITIAL_IDEAS: Idea[] = [
  { id: '1', title: 'Magnetic hardware sample kit', company: Company.DE, stage: 'Brain Dump', impact: 'Medium', description: 'Create a premium sample box with magnetic closures for architects.' },
  { id: '2', title: 'Quick-assemble auditorium base frame', company: Company.DK, stage: 'Under Validation', impact: 'High', description: 'Redesign the base frame to reduce installation time by 40%.' },
  { id: '3', title: '3D printed lumbar prototype', company: Company.MAKTUNE, stage: 'In Project', impact: 'High', description: 'Testing a new lattice structure for breathable lumbar support.' },
  { id: '4', title: 'Modular cupholder for chairs', company: Company.DK, stage: 'Brain Dump', impact: 'Low', description: 'Add-on cupholder that clamps to existing armrests.' },
];

// Tab Configuration - Updated with Consolidated Views
const TABS = [
  { id: 'master', label: 'Master', icon: <LayoutGrid size={16} />, color: 'bg-amber-100 text-amber-700' },
  { id: 'tasks', label: 'Tasks', icon: <CheckSquare size={16} />, color: 'bg-green-100 text-green-700' },
  { id: 'personal', label: 'Personal', icon: <Home size={16} />, color: 'bg-emerald-100 text-emerald-700' },
  { id: 'maktune', label: 'Maktune', icon: <Circle size={16} className="fill-blue-500 text-blue-500" />, color: 'bg-blue-100 text-blue-700' },
  { id: 'dk', label: 'DK', icon: <Circle size={16} className="fill-rose-500 text-rose-500" />, color: 'bg-rose-100 text-rose-700' },
  { id: 'de', label: 'DE', icon: <Circle size={16} className="fill-orange-500 text-orange-500" />, color: 'bg-orange-100 text-orange-700' },
  { id: 'innovation', label: 'Product & Ideas', icon: <FlaskConical size={16} />, color: 'bg-fuchsia-100 text-fuchsia-700' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('master');
  const [companyFilter, setCompanyFilter] = useState('All');
  
  // Data State
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [ideas, setIdeas] = useState<Idea[]>(INITIAL_IDEAS);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [itemType, setItemType] = useState<ItemType>('task');
  const [currentItem, setCurrentItem] = useState<any>(null);

  // Helper: Filter data based on selected Company Filter
  const filterData = <T extends { company: string | Company }>(data: T[]) => {
    if (companyFilter === 'All') return data;
    return data.filter(item => item.company === companyFilter);
  };

  // CRUD Handlers
  const handleSave = (data: any) => {
    if (itemType === 'task') {
      setTasks(prev => modalMode === 'create' ? [...prev, data] : prev.map(t => t.id === data.id ? data : t));
    } else if (itemType === 'project') {
      setProjects(prev => modalMode === 'create' ? [...prev, data] : prev.map(p => p.id === data.id ? data : p));
    } else if (itemType === 'idea') {
      setIdeas(prev => modalMode === 'create' ? [...prev, data] : prev.map(i => i.id === data.id ? data : i));
    }
  };

  const handleDelete = (id: string) => {
     if (itemType === 'task') setTasks(prev => prev.filter(t => t.id !== id));
     else if (itemType === 'project') setProjects(prev => prev.filter(p => p.id !== id));
     else if (itemType === 'idea') setIdeas(prev => prev.filter(i => i.id !== id));
  };

  const handleToggleTask = (task: Task) => {
    setTasks(prev => prev.map(t => {
      if (t.id === task.id) {
        return { ...t, status: t.status === 'Done' ? 'Todo' : 'Done' };
      }
      return t;
    }));
  };

  const openCreateModal = (type: ItemType) => {
    setModalMode('create');
    setItemType(type);
    const defaultCompany = companyFilter !== 'All' ? companyFilter : 'Maktune';
    setCurrentItem({ company: defaultCompany });
    setIsModalOpen(true);
  };

  const openEditModal = (item: any, type: ItemType) => {
    setModalMode('edit');
    setItemType(type);
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'master': 
        return <MasterDashboard 
                  tasks={filterData(tasks)} 
                  projects={filterData(projects)} 
                  ideas={filterData(ideas)} 
                  onEditTask={(t) => openEditModal(t, 'task')}
                  onEditProject={(p) => openEditModal(p, 'project')}
                  onEditIdea={(i) => openEditModal(i, 'idea')}
                  onToggleTask={handleToggleTask}
               />;
      case 'tasks': 
        return <TasksCalendar 
                  tasks={filterData(tasks)} 
                  onEditTask={(t) => openEditModal(t, 'task')}
                  onToggleTask={handleToggleTask}
               />;
      case 'personal': 
        return <PersonalDashboard 
                  tasks={tasks}
                  projects={projects}
                  onEditTask={(t) => openEditModal(t, 'task')} 
                  onEditProject={(p) => openEditModal(p, 'project')}
                  onToggleTask={handleToggleTask} 
               />;
      case 'maktune': 
        return <MaktuneDashboard 
                  tasks={tasks} 
                  projects={projects}
                  onEditTask={(t) => openEditModal(t, 'task')}
                  onEditProject={(p) => openEditModal(p, 'project')}
                  onToggleTask={handleToggleTask}
               />;
      case 'dk': 
        return <DKDashboard 
                  tasks={tasks}
                  projects={projects}
                  onEditTask={(t) => openEditModal(t, 'task')}
                  onEditProject={(p) => openEditModal(p, 'project')}
                  onToggleTask={handleToggleTask}
               />;
      case 'de': 
        return <DEDashboard 
                  tasks={tasks}
                  projects={projects}
                  onEditTask={(t) => openEditModal(t, 'task')}
                  onEditProject={(p) => openEditModal(p, 'project')}
                  onToggleTask={handleToggleTask}
               />;
      case 'innovation': 
        return <ProductIdeaLab 
                  ideas={filterData(ideas)} 
                  onEditIdea={(i) => openEditModal(i, 'idea')}
               />;
      default: return (
        <div className="flex flex-col items-center justify-center h-96 text-slate-400">
          <Package size={64} className="mb-4 opacity-50" />
          <h2 className="text-xl font-medium">Coming Soon</h2>
          <p>The {TABS.find(t => t.id === activeTab)?.label} dashboard is under construction.</p>
        </div>
      );
    }
  };

  const FilterButton = ({ label, filterKey }: any) => {
    const isActive = companyFilter === filterKey;
    return (
      <button 
        onClick={() => setCompanyFilter(filterKey)}
        className={`px-3 py-1 rounded-full shadow-sm flex items-center transition-all ${isActive ? 'bg-emerald-400 text-white ring-2 ring-emerald-200' : 'bg-transparent text-slate-600 hover:bg-slate-200'}`}
      >
         {label}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-[#F6F8FA] text-slate-800 font-sans pb-20">
      
      {/* Modal */}
      <EditModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        type={itemType}
        initialData={currentItem}
        onSave={handleSave}
        onDelete={handleDelete}
        projects={projects} 
      />

      {/* Top Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3 mb-4">
            <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full border border-emerald-200 font-medium">
              Storm HQ — Life + Maktune + DK + DE
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                Multi-Company OS <span className="text-emerald-500 font-medium text-2xl">· CEO + Life View</span>
              </h1>
              <p className="text-slate-500 text-sm mt-1 max-w-2xl">
                One colorful, light-themed cockpit for your personal life, errands, medicine, Amazon FBA, auditorium chairs, hardware, 3D lab and more.
              </p>
            </div>
            
            <div className="flex flex-col items-end space-y-3 mt-4 md:mt-0">
                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                    <button 
                        onClick={() => openCreateModal('idea')}
                        className="bg-yellow-50 text-yellow-700 border border-yellow-200 hover:bg-yellow-100 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center transition-colors"
                    >
                       <Plus size={14} className="mr-1" /> Create Idea
                    </button>
                    <button 
                         onClick={() => openCreateModal('task')}
                         className="bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center transition-colors"
                    >
                       <Plus size={14} className="mr-1" /> Create Task
                    </button>
                    <button 
                         onClick={() => openCreateModal('project')}
                         className="bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center transition-colors"
                    >
                       <Plus size={14} className="mr-1" /> Create Project
                    </button>
                </div>

                {/* Global Stats Filter */}
                <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-full text-xs font-medium">
                  <FilterButton label="All" filterKey="All" />
                  <FilterButton label={<><div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div> Maktune</>} filterKey="Maktune" />
                  <FilterButton label={<><div className="w-2 h-2 rounded-full bg-rose-500 mr-1"></div> DK</>} filterKey="DK" />
                  <FilterButton label={<><div className="w-2 h-2 rounded-full bg-orange-500 mr-1"></div> DE</>} filterKey="DE" />
                  <FilterButton label={<><div className="w-2 h-2 rounded-full bg-emerald-400 mr-1"></div> Personal</>} filterKey="Personal" />
                </div>
            </div>
          </div>
        </div>

        {/* Navigation Scroll */}
        <div className="border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto no-scrollbar space-x-2 py-3">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all duration-200
                    ${activeTab === tab.id 
                      ? `${tab.color} shadow-sm ring-1 ring-black/5 font-semibold` 
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
}
