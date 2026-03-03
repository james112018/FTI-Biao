import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LayoutDashboard, FileText, Play, Calendar, Users, Heart, Settings, LogOut, MessageSquare, DollarSign, ChevronRight, Menu, X, Eye, Trash2, Plus } from 'lucide-react';
import { cn, formatDate } from '../lib/utils';
import { MOCK_POSTS, MOCK_SERMONS, MOCK_EVENTS, MOCK_MINISTRIES, MOCK_SUBMISSIONS } from '../mockData';
import { Modal } from '../components/Modal';
import { ContentForm } from './components/ContentForm';
import { Submission } from '../types';

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [sermons, setSermons] = useState(MOCK_SERMONS);
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [ministries, setMinistries] = useState(MOCK_MINISTRIES);
  const [submissions, setSubmissions] = useState(MOCK_SUBMISSIONS);

  // Modal states
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [contentModalType, setContentModalType] = useState<'posts' | 'sermons' | 'events' | 'ministries'>('posts');
  const [editingItem, setEditingItem] = useState<any>(null);

  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  const navigate = useNavigate();

  const menuItems = [
    { id: 'overview', name: 'Overview', icon: <LayoutDashboard size={20} /> },
    { id: 'posts', name: 'Blog Posts', icon: <FileText size={20} /> },
    { id: 'sermons', name: 'Sermons', icon: <Play size={20} /> },
    { id: 'events', name: 'Events', icon: <Calendar size={20} /> },
    { id: 'ministries', name: 'Ministries', icon: <Users size={20} /> },
    { id: 'submissions', name: 'Submissions', icon: <MessageSquare size={20} /> },
    { id: 'donations', name: 'Donations', icon: <DollarSign size={20} /> },
    { id: 'settings', name: 'Settings', icon: <Settings size={20} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/');
  };

  const handleAddContent = (type: any) => {
    setContentModalType(type);
    setEditingItem(null);
    setIsContentModalOpen(true);
  };

  const handleEditContent = (type: any, item: any) => {
    setContentModalType(type);
    setEditingItem(item);
    setIsContentModalOpen(true);
  };

  const handleDeleteContent = (type: string, id: number) => {
    // Simplified delete for better reliability in preview
    switch (type) {
      case 'posts': setPosts(posts.filter(p => p.id !== id)); break;
      case 'sermons': setSermons(sermons.filter(s => s.id !== id)); break;
      case 'events': setEvents(events.filter(e => e.id !== id)); break;
      case 'ministries': setMinistries(ministries.filter(m => m.id !== id)); break;
    }
  };

  const handleSaveContent = (data: any) => {
    if (editingItem) {
      // Update existing
      const updatedData = { ...editingItem, ...data };
      switch (contentModalType) {
        case 'posts': setPosts(posts.map(p => p.id === editingItem.id ? updatedData : p)); break;
        case 'sermons': setSermons(sermons.map(s => s.id === editingItem.id ? updatedData : s)); break;
        case 'events': setEvents(events.map(e => e.id === editingItem.id ? updatedData : e)); break;
        case 'ministries': setMinistries(ministries.map(m => m.id === editingItem.id ? updatedData : m)); break;
      }
    } else {
      // Add new
      const newItem = { ...data, id: Date.now(), created_at: new Date().toISOString() };
      switch (contentModalType) {
        case 'posts': setPosts([newItem, ...posts]); break;
        case 'sermons': setSermons([newItem, ...sermons]); break;
        case 'events': setEvents([newItem, ...events]); break;
        case 'ministries': setMinistries([newItem, ...ministries]); break;
      }
    }
    setIsContentModalOpen(false);
  };

  const handleViewSubmission = (submission: Submission) => {
    setSelectedSubmission(submission);
    setIsSubmissionModalOpen(true);
    // Mark as read
    setSubmissions(submissions.map(s => s.id === submission.id ? { ...s, status: 'read' as const } : s));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={cn(
        "bg-blue-950 text-white transition-all duration-300 flex flex-col fixed inset-y-0 left-0 z-50",
        isSidebarOpen ? "w-64" : "w-20"
      )}>
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white text-blue-900 flex items-center justify-center font-bold">F</div>
              <span className="font-serif font-bold">Admin Panel</span>
            </div>
          )}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-blue-900 rounded-lg">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-grow px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all",
                activeTab === item.id ? "bg-yellow-500 text-blue-950 font-bold" : "hover:bg-blue-900 text-blue-100"
              )}
            >
              <span className="shrink-0">{item.icon}</span>
              {isSidebarOpen && <span>{item.name}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-blue-900">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "flex-grow transition-all duration-300 p-8",
        isSidebarOpen ? "ml-64" : "ml-20"
      )}>
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-serif font-bold text-blue-900">
              {menuItems.find(i => i.id === activeTab)?.name}
            </h1>
            <p className="text-gray-500">Manage your church content and community.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="px-4 py-2 text-sm font-bold text-blue-900 hover:underline">View Live Site</Link>
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-900 font-bold">A</div>
          </div>
        </header>

        {/* Content Area */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          {activeTab === 'overview' && <Overview submissions={submissions} events={events} setActiveTab={setActiveTab} />}
          {activeTab === 'posts' && <ContentTable type="posts" items={posts} onAdd={() => handleAddContent('posts')} onEdit={(item) => handleEditContent('posts', item)} onDelete={(id) => handleDeleteContent('posts', id)} />}
          {activeTab === 'sermons' && <ContentTable type="sermons" items={sermons} onAdd={() => handleAddContent('sermons')} onEdit={(item) => handleEditContent('sermons', item)} onDelete={(id) => handleDeleteContent('sermons', id)} />}
          {activeTab === 'events' && <ContentTable type="events" items={events} onAdd={() => handleAddContent('events')} onEdit={(item) => handleEditContent('events', item)} onDelete={(id) => handleDeleteContent('events', id)} />}
          {activeTab === 'ministries' && <ContentTable type="ministries" items={ministries} onAdd={() => handleAddContent('ministries')} onEdit={(item) => handleEditContent('ministries', item)} onDelete={(id) => handleDeleteContent('ministries', id)} />}
          {activeTab === 'submissions' && <SubmissionsTable submissions={submissions} onView={handleViewSubmission} />}
          {activeTab === 'donations' && <DonationsTable />}
          {activeTab === 'settings' && <SettingsForm />}
        </div>
      </main>

      {/* Content Modal */}
      <Modal 
        isOpen={isContentModalOpen} 
        onClose={() => setIsContentModalOpen(false)} 
        title={`${editingItem ? 'Edit' : 'Add New'} ${contentModalType.slice(0, -1)}`}
        size="lg"
      >
        <ContentForm 
          type={contentModalType} 
          initialData={editingItem} 
          onSave={handleSaveContent} 
          onCancel={() => setIsContentModalOpen(false)} 
        />
      </Modal>

      {/* Submission Detail Modal */}
      <Modal
        isOpen={isSubmissionModalOpen}
        onClose={() => setIsSubmissionModalOpen(false)}
        title="Submission Details"
      >
        {selectedSubmission && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">From</p>
                <p className="text-blue-900 font-bold">{selectedSubmission.name}</p>
                <p className="text-sm text-gray-500">{selectedSubmission.email}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">Date</p>
                <p className="text-blue-900 font-bold">{formatDate(selectedSubmission.date)}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">Type</p>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase rounded-md">
                  {selectedSubmission.type}
                </span>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase mb-2">Message</p>
              <div className="p-4 bg-gray-50 rounded-xl text-gray-700 whitespace-pre-wrap">
                {selectedSubmission.message}
              </div>
            </div>
            <div className="flex justify-end">
              <button 
                onClick={() => setIsSubmissionModalOpen(false)}
                className="px-6 py-2 bg-blue-900 text-white font-bold rounded-xl hover:bg-blue-800 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

const Overview = ({ submissions, events, setActiveTab }: { submissions: any[], events: any[], setActiveTab: (tab: string) => void }) => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { label: "Total Members", value: "452", change: "+12%", icon: <Users className="text-blue-500" /> },
        { label: "Monthly Giving", value: "$12,450", change: "+5%", icon: <DollarSign className="text-green-500" /> },
        { label: "New Visitors", value: "24", change: "+8%", icon: <Heart className="text-red-500" /> },
        { label: "Active Events", value: events.length.toString(), change: "0%", icon: <Calendar className="text-yellow-500" /> },
      ].map((stat, idx) => (
        <div key={idx} className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-white rounded-xl shadow-sm">{stat.icon}</div>
            <span className="text-xs font-bold text-green-500">{stat.change}</span>
          </div>
          <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
          <p className="text-2xl font-bold text-blue-900">{stat.value}</p>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="p-6 rounded-2xl border border-gray-100">
        <h3 className="font-bold text-blue-900 mb-6 flex items-center justify-between">
          Recent Submissions
          <button onClick={() => setActiveTab('submissions')} className="text-xs text-blue-500 hover:underline">View All</button>
        </h3>
        <div className="space-y-4">
          {submissions.slice(0, 3).map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-900 font-bold">
                  {item.name[0]}
                </div>
                <div>
                  <p className="text-sm font-bold text-blue-900">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.type}</p>
                </div>
              </div>
              <span className="text-xs text-gray-400">{formatDate(item.date)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 rounded-2xl border border-gray-100">
        <h3 className="font-bold text-blue-900 mb-6 flex items-center justify-between">
          Upcoming Events
          <button onClick={() => setActiveTab('events')} className="text-xs text-blue-500 hover:underline">View All</button>
        </h3>
        <div className="space-y-4">
          {events.slice(0, 3).map((event, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center text-yellow-700 font-bold">
                  <Calendar size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-blue-900">{event.title}</p>
                  <p className="text-xs text-gray-500">{formatDate(event.date)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-blue-900">45</p>
                <p className="text-[10px] text-gray-400 uppercase font-bold">Registered</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const ContentTable = ({ type, items, onAdd, onEdit, onDelete }: { 
  type: string, 
  items: any[], 
  onAdd: () => void,
  onEdit: (item: any) => void,
  onDelete: (id: number) => void
}) => {
  const getDisplayData = (item: any) => {
    switch (type) {
      case 'posts': return { title: item.title, author: item.author, date: item.created_at, status: 'Published' };
      case 'sermons': return { title: item.title, author: item.speaker, date: item.date, status: 'Published' };
      case 'events': return { title: item.title, author: 'Church Office', date: item.date, status: 'Upcoming' };
      case 'ministries': return { title: item.name, author: item.leader, date: 'N/A', status: 'Active' };
      default: return { title: '', author: '', date: '', status: '' };
    }
  };

  const getTypeName = (t: string) => {
    if (t === 'ministries') return 'Ministry';
    return t.charAt(0).toUpperCase() + t.slice(1, -1);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-blue-900 capitalize">Manage {type}</h3>
        <button 
          onClick={onAdd}
          className="px-4 py-2 bg-blue-900 text-white text-sm font-bold rounded-lg hover:bg-blue-800 transition-all flex items-center gap-2"
        >
          <Plus size={16} />
          Add New {getTypeName(type)}
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="pb-4 font-bold text-sm text-gray-400">Title</th>
              <th className="pb-4 font-bold text-sm text-gray-400">{type === 'sermons' ? 'Speaker' : type === 'ministries' ? 'Leader' : 'Author'}</th>
              <th className="pb-4 font-bold text-sm text-gray-400">Date</th>
              <th className="pb-4 font-bold text-sm text-gray-400">Status</th>
              <th className="pb-4 font-bold text-sm text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {items.map((item) => {
              const display = getDisplayData(item);
              return (
                <tr key={item.id} className="group hover:bg-gray-50 transition-colors">
                  <td className="py-4">
                    <p className="text-sm font-bold text-blue-900">{display.title}</p>
                    <p className="text-xs text-gray-400">ID: {item.id}</p>
                  </td>
                  <td className="py-4 text-sm text-gray-600">{display.author}</td>
                  <td className="py-4 text-sm text-gray-600">{display.date !== 'N/A' ? formatDate(display.date) : 'N/A'}</td>
                  <td className="py-4">
                    <span className={cn(
                      "px-2 py-1 text-[10px] font-bold uppercase rounded-md",
                      display.status === 'Published' || display.status === 'Active' ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                    )}>
                      {display.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => onEdit(item)}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"
                      >
                        <FileText size={16} />
                      </button>
                      <button 
                        onClick={() => onDelete(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const SubmissionsTable = ({ submissions, onView }: { submissions: Submission[], onView: (s: Submission) => void }) => (
  <div className="space-y-6">
    <h3 className="font-bold text-blue-900">Form Submissions</h3>
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="pb-4 font-bold text-sm text-gray-400">Name</th>
            <th className="pb-4 font-bold text-sm text-gray-400">Type</th>
            <th className="pb-4 font-bold text-sm text-gray-400">Date</th>
            <th className="pb-4 font-bold text-sm text-gray-400">Status</th>
            <th className="pb-4 font-bold text-sm text-gray-400">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {submissions.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
              <td className="py-4">
                <p className="text-sm font-bold text-blue-900">{item.name}</p>
                <p className="text-xs text-gray-400">{item.email}</p>
              </td>
              <td className="py-4 text-sm text-gray-600">{item.type}</td>
              <td className="py-4 text-sm text-gray-600">{formatDate(item.date)}</td>
              <td className="py-4">
                <span className={cn(
                  "px-2 py-1 text-[10px] font-bold uppercase rounded-md",
                  item.status === 'new' ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"
                )}>
                  {item.status}
                </span>
              </td>
              <td className="py-4">
                <button 
                  onClick={() => onView(item)}
                  className="px-4 py-2 text-xs font-bold text-blue-900 border border-blue-900 rounded-lg hover:bg-blue-900 hover:text-white transition-all flex items-center gap-2"
                >
                  <Eye size={14} />
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const DonationsTable = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h3 className="font-bold text-blue-900">Giving Records</h3>
      <button className="px-4 py-2 bg-green-600 text-white text-sm font-bold rounded-lg hover:bg-green-700 transition-all">
        Export Report
      </button>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="pb-4 font-bold text-sm text-gray-400">Donor</th>
            <th className="pb-4 font-bold text-sm text-gray-400">Amount</th>
            <th className="pb-4 font-bold text-sm text-gray-400">Category</th>
            <th className="pb-4 font-bold text-sm text-gray-400">Date</th>
            <th className="pb-4 font-bold text-sm text-gray-400">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {[1, 2, 3].map((i) => (
            <tr key={i} className="hover:bg-gray-50 transition-colors">
              <td className="py-4">
                <p className="text-sm font-bold text-blue-900">Donor Name {i}</p>
                <p className="text-xs text-gray-400">donor{i}@example.com</p>
              </td>
              <td className="py-4 font-bold text-blue-900">$100.00</td>
              <td className="py-4 text-sm text-gray-600">Tithes</td>
              <td className="py-4 text-sm text-gray-600">Mar 01, 2024</td>
              <td className="py-4">
                <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded-md">Completed</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const SettingsForm = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [settings, setSettings] = useState({
    churchName: "Faith Tabernacle Inc. (Biao)",
    tagline: "Rooted in Faith. Growing in Love.",
    primaryColor: "#1e3a8a",
    email: "info@faithtabernaclebiao.org",
    phone: "+1 (555) 123-4567"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
      {showSuccess && (
        <div className="p-4 bg-green-100 text-green-700 rounded-xl font-bold text-sm animate-in fade-in slide-in-from-top-4">
          Settings saved successfully!
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">Church Name</label>
          <input 
            type="text" 
            name="churchName"
            value={settings.churchName}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">Tagline</label>
          <input 
            type="text" 
            name="tagline"
            value={settings.tagline}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900" 
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700">Primary Color</label>
        <div className="flex gap-4">
          <input 
            type="color" 
            name="primaryColor"
            value={settings.primaryColor}
            onChange={handleChange}
            className="w-12 h-12 rounded-lg border border-gray-200" 
          />
          <input 
            type="text" 
            name="primaryColor"
            value={settings.primaryColor}
            onChange={handleChange}
            className="flex-grow px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900" 
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">Email Address</label>
          <input 
            type="email" 
            name="email"
            value={settings.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">Phone Number</label>
          <input 
            type="text" 
            name="phone"
            value={settings.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900" 
          />
        </div>
      </div>
      <button 
        disabled={isSaving}
        className={cn(
          "px-8 py-4 bg-blue-900 text-white font-bold rounded-xl hover:bg-blue-800 transition-all shadow-lg flex items-center gap-2",
          isSaving && "opacity-50 cursor-not-allowed"
        )}
      >
        {isSaving ? 'Saving...' : 'Save Site Settings'}
      </button>
    </form>
  );
};
