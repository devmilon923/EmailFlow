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
  emailsArray: string[]; // This is now the single source of truth for audience
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

  // --- CSV Parsing Logic ---
  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsParsing(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      const text = event.target?.result as string;
      // Regex finds all valid email patterns globally in the file
      const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
      const foundEmails = text.match(emailRegex) || [];

      // Filter out duplicates and merge with existing list
      const uniqueNewEmails = Array.from(new Set(foundEmails)).map((e) =>
        e.toLowerCase()
      );
      const mergedEmails = Array.from(
        new Set([...formData.emailsArray, ...uniqueNewEmails])
      );

      setFormData((prev) => ({ ...prev, emailsArray: mergedEmails }));
      setIsParsing(false);
      if (fileInputRef.current) fileInputRef.current.value = ''; // Reset input
    };

    reader.readAsText(file);
  };

  // --- Tag Input Logic ---
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

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addEmailTag();
    }
  };

  const removeEmailTag = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      emailsArray: prev.emailsArray.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Unified Request Body
    const requestBody = {
      subject: formData.subject,
      content: {
        type: formData.bodyType,
        templateId:
          formData.bodyType === 'template' ? formData.templateId : null,
        body: formData.bodyType === 'plain' ? formData.plainBody : null,
      },
      recipients: formData.emailsArray, // Same format for both manual and CSV
    };

    console.log('--- Campaign Final Payload ---', requestBody);
    alert(
      `Ready to send to ${formData.emailsArray.length} recipients. Check console for payload.`
    );
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF9F6] text-[#433F39] flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-275 w-full p-4 md:p-10 space-y-10"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E9E4DB] pb-8">
          <div>
            <h2 className="text-3xl font-serif italic">New Campaign</h2>
            <p className="text-[#8C867A] text-sm mt-1">
              Combine manual entry and CSV uploads seamlessly.
            </p>
          </div>
          <button
            type="submit"
            disabled={formData.emailsArray.length === 0 || !formData.subject}
            className="bg-[#433F39] disabled:opacity-30 text-[#FAF9F6] px-10 py-4 rounded-full font-medium hover:bg-[#2D2A26] transition-all flex items-center gap-3 shadow-lg"
          >
            Launch Campaign <Send size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
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

            {/* Combined Audience Section */}
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
                        className="hover:text-red-500 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
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
                  <div className="flex items-center gap-3">
                    <p className="text-[10px] font-bold text-[#BAB3A9] uppercase tracking-wider flex items-center gap-1.5">
                      <MailPlus size={12} /> {formData.emailsArray.length}{' '}
                      Recipients
                    </p>
                    {formData.emailsArray.length > 0 && (
                      <div className="flex items-center gap-1 text-[10px] text-green-600 font-bold uppercase tracking-wider">
                        <FileCheck size={12} /> Ready to send
                      </div>
                    )}
                  </div>
                  {formData.emailsArray.length > 0 && (
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, emailsArray: [] })
                      }
                      className="text-[10px] font-bold text-red-400 hover:text-red-600 uppercase tracking-wider"
                    >
                      Clear All
                    </button>
                  )}
                </div>
              </div>

              <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 flex gap-3 text-blue-800">
                <Info size={16} className="shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed italic">
                  CSV files are processed locally. Emails found in the file will
                  automatically appear as tags above.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="lg:col-span-5">
            <div
              className={`bg-white border border-[#E9E4DB] rounded-[2.5rem] p-8 shadow-sm transition-all duration-300 ${formData.bodyType === 'plain' ? 'opacity-40 grayscale pointer-events-none scale-[0.98]' : 'opacity-100'}`}
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
                      <p className="text-[10px] text-[#BAB3A9] mt-1 font-mono">
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
      </form>
    </div>
  );
}
