import React, { useState, useEffect } from 'react';
import { Post, Sermon, Event, Ministry } from '../../types';

interface ContentFormProps {
  type: 'posts' | 'sermons' | 'events' | 'ministries';
  initialData?: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}

export const ContentForm = ({ type, initialData, onSave, onCancel }: ContentFormProps) => {
  const [formData, setFormData] = useState<any>(initialData || {});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({});
    }
  }, [initialData, type]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const renderFields = () => {
    switch (type) {
      case 'posts':
        return (
          <>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Title</label>
              <input name="title" value={formData.title || ''} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Slug</label>
              <input name="slug" value={formData.slug || ''} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Author</label>
              <input name="author" value={formData.author || ''} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Category</label>
              <select name="category" value={formData.category || ''} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none">
                <option value="Devotionals">Devotionals</option>
                <option value="Church Life">Church Life</option>
                <option value="News">News</option>
              </select>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-gray-700">Excerpt</label>
              <textarea name="excerpt" value={formData.excerpt || ''} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none h-20" required />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-gray-700">Content</label>
              <textarea name="content" value={formData.content || ''} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none h-40" required />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-gray-700">Featured Image URL</label>
              <input name="featured_image" value={formData.featured_image || ''} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none" placeholder="https://picsum.photos/seed/..." />
            </div>
          </>
        );
      case 'sermons':
        return (
          <>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Sermon Title</label>
              <input name="title" value={formData.title || ''} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Speaker</label>
              <input name="speaker" value={formData.speaker || ''} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Date</label>
              <input type="date" name="date" value={formData.date || ''} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Scripture</label>
              <input name="scripture" value={formData.scripture || ''} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Series</label>
              <input name="series" value={formData.series || ''} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Video URL (YouTube Embed)</label>
              <input name="video_url" value={formData.video_url || ''} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-gray-700">Sermon Notes</label>
              <textarea name="notes" value={formData.notes || ''} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none h-32" />
            </div>
          </>
        );
      case 'events':
        return (
          <>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-gray-700">Event Title</label>
              <input name="title" value={formData.title || ''} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Date</label>
              <input type="date" name="date" value={formData.date || ''} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Time</label>
              <input type="text" name="time" value={formData.time || ''} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none" placeholder="e.g. 09:00 AM" required />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-gray-700">Location</label>
              <input name="location" value={formData.location || ''} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none" required />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-gray-700">Description</label>
              <textarea name="description" value={formData.description || ''} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none h-32" required />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-gray-700">Featured Image URL</label>
              <input name="featured_image" value={formData.featured_image || ''} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none" />
            </div>
          </>
        );
      case 'ministries':
        return (
          <>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Ministry Name</label>
              <input name="name" value={formData.name || ''} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Leader</label>
              <input name="leader" value={formData.leader || ''} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none" required />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-gray-700">Schedule</label>
              <input name="schedule" value={formData.schedule || ''} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none" placeholder="e.g. Sundays at 9:00 AM" required />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-gray-700">Description</label>
              <textarea name="description" value={formData.description || ''} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none h-32" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Icon Name (Lucide)</label>
              <input name="icon" value={formData.icon || ''} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none" placeholder="e.g. Heart, Users, Baby" />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderFields()}
      </div>
      <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
        <button type="button" onClick={onCancel} className="px-6 py-3 text-sm font-bold text-gray-500 hover:text-blue-900 transition-colors">
          Cancel
        </button>
        <button type="submit" className="px-8 py-3 bg-blue-900 text-white font-bold rounded-xl hover:bg-blue-800 transition-all shadow-lg">
          {initialData ? 'Update' : 'Create'} {type.slice(0, -1)}
        </button>
      </div>
    </form>
  );
};
