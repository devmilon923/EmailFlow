'use client';
import React, { useState, KeyboardEvent, useRef } from 'react';
import {
  Type,
  Users,
  Layout,
  Upload,
  FileText,
  MousePointer2,
  CheckCircle2,
  Send,
  Info,
  Layers,
  X,
  MailPlus,
  FileCheck,
  Calendar,
  Save,
} from 'lucide-react';

// --- Types ---
interface Template {
  id: string;
  name: string;
}

interface CampaignFormData {
  subject: string;
  bodyType: 'plain' | 'template';
  templateId: string | null;
  plainBody: string;
  emailsArray: string[];
}

const DUMMY_TEMPLATES: Template[] = [
  { id: 'tmp_001', name: 'Minimalist Welcome' },
  { id: 'tmp_002', name: 'Monthly Newsletter' },
  { id: 'tmp_003', name: 'Seasonal Promotion' },
];

export default function CreateCampaign() {
  const [formData, setFormData] = useState<CampaignFormData>({
    subject: '',
    bodyType: 'plain',
    templateId: null,
    plainBody: '',
    emailsArray: [],
  });

  const [inputValue, setInputValue] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Handlers ---
  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsParsing(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
      const foundEmails = text.match(emailRegex) || [];
      const uniqueNewEmails = Array.from(new Set(foundEmails)).map((e) =>
        e.toLowerCase()
      );
      const mergedEmails = Array.from(
        new Set([...formData.emailsArray, ...uniqueNewEmails])
      );
      setFormData((prev) => ({ ...prev, emailsArray: mergedEmails }));
      setIsParsing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsText(file);
  };

  const addEmailTag = () => {
    const email = inputValue.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      email &&
      emailRegex.test(email) &&
      !formData.emailsArray.includes(email)
    ) {
      setFormData((prev) => ({
        ...prev,
        emailsArray: [...prev.emailsArray, email],
      }));
      setInputValue('');
    }
  };

  const removeEmailTag = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      emailsArray: prev.emailsArray.filter((_, i) => i !== index),
    }));
  };

  const handleAction = (status: 'launch' | 'schedule' | 'draft') => {
    const payload = {
      ...formData,
      status: status,
      timestamp: new Date().toISOString(),
    };
    console.log(`--- Campaign Action: ${status.toUpperCase()} ---`, payload);
    alert(
      `Campaign ${status === 'draft' ? 'saved as draft' : 'processed'}. Check console.`
    );
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF9F6] text-[#433F39] flex flex-col items-center">
      <div className="w-full py-4 md:py-10 space-y-10">
        {/* Header with Multi-Action Buttons */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#E9E4DB] py-8">
          <div>
            <h2 className="text-3xl font-serif italic">New Campaign</h2>
            <p className="text-[#8C867A] text-sm mt-1">
              Configure your message, audience, and delivery time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleAction('draft')}
              disabled={formData.emailsArray.length === 0 || !formData.subject}
              className="flex items-center cursor-pointer  disabled:cursor-not-allowed gap-2 px-6 py-4 rounded-full border border-[#E9E4DB] bg-white text-xs font-bold uppercase tracking-widest hover:bg-[#F3EFE7] transition-all"
            >
              <Save size={16} /> Save Draft
            </button>

            <button
              onClick={() => handleAction('launch')}
              disabled={formData.emailsArray.length === 0 || !formData.subject}
              className="bg-[#433F39] cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed text-[#FAF9F6] gap-2 px-6 py-4 rounded-full font-bold text-xs hover:bg-[#2D2A26] transition-all flex items-center  shadow-lg"
            >
              Launch Now <Send size={15} />
            </button>
          </div>
        </div>

        <div className="grid max-w-275 grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-8">
            {/* Subject & Body Section */}
            <div className="bg-white border border-[#E9E4DB] rounded-[2.5rem] p-8 shadow-sm space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#BAB3A9] flex items-center gap-2">
                  <Type size={12} /> Email Subject
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  placeholder="Enter campaign subject..."
                  className="w-full bg-[#FAF9F6] border border-[#E9E4DB] rounded-xl px-4 py-3 outline-none focus:border-[#C2BBAF] transition-all text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, bodyType: 'plain' })
                  }
                  className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${formData.bodyType === 'plain' ? 'border-[#433F39] bg-[#F3EFE7]' : 'border-[#E9E4DB] bg-white'}`}
                >
                  <FileText size={20} />{' '}
                  <span className="text-xs font-bold uppercase tracking-tighter">
                    Plain Email
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, bodyType: 'template' })
                  }
                  className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${formData.bodyType === 'template' ? 'border-[#433F39] bg-[#F3EFE7]' : 'border-[#E9E4DB] bg-white'}`}
                >
                  <Layout size={20} />{' '}
                  <span className="text-xs font-bold uppercase tracking-tighter">
                    Template
                  </span>
                </button>
              </div>

              {formData.bodyType === 'plain' ? (
                <textarea
                  value={formData.plainBody}
                  onChange={(e) =>
                    setFormData({ ...formData, plainBody: e.target.value })
                  }
                  placeholder="Write your email content..."
                  className="w-full h-40 bg-[#FAF9F6] border border-[#E9E4DB] rounded-2xl p-6 outline-none text-sm resize-none"
                />
              ) : (
                <div className="p-10 bg-[#FAF9F6] rounded-2xl border border-dashed border-[#E9E4DB] text-center text-xs text-[#8C867A]">
                  {formData.templateId
                    ? `Selected: ${DUMMY_TEMPLATES.find((t) => t.id === formData.templateId)?.name}`
                    : 'Select a template from the right sidebar.'}
                </div>
              )}
            </div>

            {/* Audience Section */}
            <div className="bg-white border border-[#E9E4DB] rounded-[2.5rem] p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#BAB3A9] flex items-center gap-2">
                  <Users size={12} /> Audience Management
                </label>
                <label className="cursor-pointer bg-[#F3EFE7] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#433F39] hover:bg-[#E9E4DB] transition-all flex items-center gap-2">
                  <Upload size={12} /> {isParsing ? 'Parsing...' : 'Import CSV'}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv"
                    className="hidden"
                    onChange={handleCSVUpload}
                  />
                </label>
              </div>

              <div className="space-y-4">
                <div className="w-full min-h-35 bg-[#FAF9F6] border border-[#E9E4DB] rounded-2xl p-4 flex flex-wrap gap-2 items-start focus-within:border-[#C2BBAF] transition-all overflow-y-auto max-h-60">
                  {formData.emailsArray.map((email, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-1.5 bg-white border border-[#E9E4DB] px-3 py-1.5 rounded-lg text-xs font-medium text-[#433F39] animate-in zoom-in-95 duration-200"
                    >
                      {email}
                      <button
                        type="button"
                        onClick={() => removeEmailTag(index)}
                        className="hover:text-red-500 transition-colors cursor-pointer"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ',') {
                        e.preventDefault();
                        addEmailTag();
                      }
                    }}
                    onBlur={addEmailTag}
                    placeholder={
                      formData.emailsArray.length === 0
                        ? 'Type email + Enter or upload CSV...'
                        : 'Add more...'
                    }
                    className="flex-1 min-w-50 bg-transparent outline-none text-sm py-1.5 placeholder-[#BAB3A9]"
                  />
                </div>
                <div className="flex justify-between items-center px-1">
                  <div className="flex items-center gap-3 text-[10px] font-bold text-[#BAB3A9] uppercase tracking-wider">
                    <MailPlus size={12} /> {formData.emailsArray.length}{' '}
                    Recipients
                    {formData.emailsArray.length > 0 && (
                      <span className="text-green-600 flex items-center gap-1">
                        <FileCheck size={12} /> Ready
                      </span>
                    )}
                  </div>
                  {formData.emailsArray.length > 0 && (
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, emailsArray: [] })
                      }
                      className="text-[10px] cursor-pointer font-bold text-red-400 hover:text-red-600 uppercase tracking-wider"
                    >
                      Clear All
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Templates Sidebar */}
          <div className="lg:col-span-5">
            <div
              className={`bg-white border border-[#E9E4DB] rounded-[2.5rem] p-8 shadow-sm transition-all duration-300 ${formData.bodyType === 'plain' ? 'hidden' : 'opacity-100'}`}
            >
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#BAB3A9] flex items-center gap-2 mb-6">
                <Layers size={12} /> Select Template
              </label>
              <div className="space-y-3">
                {DUMMY_TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, templateId: tmpl.id })
                    }
                    className={`w-full p-5 rounded-2xl border text-left transition-all flex items-center justify-between group ${formData.templateId === tmpl.id ? 'border-[#433F39] bg-[#F3EFE7]' : 'border-[#E9E4DB] bg-[#FAF9F6] hover:bg-white'}`}
                  >
                    <div>
                      <p className="text-xs font-bold text-[#433F39]">
                        {tmpl.name}
                      </p>
                      <p className="text-[10px] text-[#BAB3A9] mt-1 font-mono uppercase tracking-tighter">
                        {tmpl.id}
                      </p>
                    </div>
                    {formData.templateId === tmpl.id && (
                      <CheckCircle2 size={18} className="text-[#433F39]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
