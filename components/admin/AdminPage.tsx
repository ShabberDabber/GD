
import React, { useState, useEffect, useRef } from 'react';
import { useContent } from '../../context/ContentContext';
import { CaseStudyProject, AboutMeData } from '../../types';
import { auth } from '../../lib/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

// Simple Input Component
const InputField: React.FC<{ label: string; value: string; onChange: (v: string) => void; multiline?: boolean; placeholder?: string }> = ({ label, value, onChange, multiline, placeholder }) => (
  <div className="mb-4">
    <label className="block text-sm font-bold text-gray-700 mb-1">{label}</label>
    {multiline ? (
      <textarea 
        value={value} 
        onChange={e => onChange(e.target.value)} 
        placeholder={placeholder}
        className="w-full p-2 border rounded text-slate-900 bg-gray-50 h-24 focus:ring-2 focus:ring-brand-primary outline-none transition-all"
      />
    ) : (
      <input 
        type="text" 
        value={value} 
        onChange={e => onChange(e.target.value)} 
        placeholder={placeholder}
        className="w-full p-2 border rounded text-slate-900 bg-gray-50 focus:ring-2 focus:ring-brand-primary outline-none transition-all"
      />
    )}
  </div>
);

// Helper for complex data types
const HelperText: React.FC<{ children: React.ReactNode}> = ({ children }) => (
    <div className="p-3 bg-blue-50 text-blue-800 text-xs rounded mb-3">{children}</div>
);

// --- Draggable Logo Grid ---
const DraggableLogoGrid: React.FC<{
  title: string;
  logos: string[];
  onUpdate: (logos: string[]) => void;
}> = ({ title, logos, onUpdate }) => {
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const dragOverIndex = useRef<number | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggingIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    dragOverIndex.current = index;
    // Optional: add visual feedback for drag over
    e.currentTarget.style.border = '2px dashed #0891b2'; 
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      e.currentTarget.style.border = '1px solid #e5e7eb';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.style.border = '1px solid #e5e7eb';
    if (draggingIndex === null || dragOverIndex.current === null || draggingIndex === dragOverIndex.current) {
      setDraggingIndex(null);
      return;
    }

    const reorderedLogos = [...logos];
    const draggedItem = reorderedLogos.splice(draggingIndex, 1)[0];
    reorderedLogos.splice(dragOverIndex.current, 0, draggedItem);
    
    onUpdate(reorderedLogos);
    setDraggingIndex(null);
    dragOverIndex.current = null;
  };

  const handleDragEnd = () => {
    setDraggingIndex(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {logos.map((logo, index) => (
          <div
            key={`${logo}-${index}`}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onDragEnd={handleDragEnd}
            className={`group relative cursor-move transition-all ${draggingIndex === index ? 'opacity-50 scale-95' : 'opacity-100'}`}
          >
            <div className="absolute -top-2 -left-2 w-5 h-5 bg-slate-800 text-white text-xs font-bold flex items-center justify-center rounded-full z-10">
              {index + 1}
            </div>
            <div className="w-full h-16 flex justify-center items-center p-2 border border-gray-200 rounded-md bg-slate-50">
              <img src={logo} alt={`Logo ${index + 1}`} className="max-w-full max-h-full object-contain" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


// --- EDITORS ---

const ProjectEditor: React.FC<{ project: CaseStudyProject; onSave: (p: CaseStudyProject) => void; onCancel: () => void }> = ({ project, onSave, onCancel }) => {
  const [formData, setFormData] = useState<CaseStudyProject>({ ...project });

  const handleChange = (field: keyof CaseStudyProject, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: 'processImages' | 'galleryImages' | 'footerImages' | 'tags', value: string) => {
    const arr = value.split(',').map(s => s.trim()).filter(s => s !== '');
    setFormData(prev => ({ ...prev, [field]: arr }));
  };

  return (
    <div className="bg-white p-6 rounded shadow-xl border border-gray-200 my-4 animate-fade-in-up">
      <h3 className="text-xl font-black text-slate-800 mb-4 pb-2 border-b">Editing: {formData.title}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <InputField label="Project Title" value={formData.title} onChange={v => handleChange('title', v)} />
          <InputField label="Subtitle (List View)" value={formData.subtitle} onChange={v => handleChange('subtitle', v)} />
          <InputField label="Client Name" value={formData.client || ''} onChange={v => handleChange('client', v)} />
          
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-1">Layout Template</label>
            <select 
                value={formData.layout || '2'} 
                onChange={e => handleChange('layout', e.target.value)}
                className="w-full p-2 border rounded text-slate-900 bg-gray-50 focus:ring-2 focus:ring-brand-primary outline-none"
            >
                <option value="1">Layout 1 (Vertical Focus)</option>
                <option value="2">Layout 2 (Standard Case Study)</option>
                <option value="3">Layout 3 (Editorial Grid)</option>
            </select>
          </div>
          
          <HelperText>Recommended: 1200x800px JPG/PNG for best results.</HelperText>
          <InputField label="Hero Image URL" value={formData.heroImage} onChange={v => handleChange('heroImage', v)} />
          <InputField label="Tags (comma separated)" value={formData.tags?.join(', ') || ''} onChange={v => handleArrayChange('tags', v)} multiline/>
        </div>
        
        <div>
          <InputField label="Challenge Content" value={formData.challenge} onChange={v => handleChange('challenge', v)} multiline />
          <InputField label="Strategy Content" value={formData.strategy} onChange={v => handleChange('strategy', v)} multiline />
          <InputField label="Impact Content" value={formData.impact} onChange={v => handleChange('impact', v)} multiline />
          <InputField label="Extra Description" value={formData.description2 || ''} onChange={v => handleChange('description2', v)} multiline />
        </div>
      </div>

      <div className="mt-4 bg-slate-50 p-4 rounded">
        <h4 className="font-bold text-slate-900 mb-4">Custom Section Headings (Optional)</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField 
              label="Challenge Heading" 
              value={formData.challengeHeading || ''} 
              onChange={v => handleChange('challengeHeading', v)} 
              placeholder="Default: The Challenge"
            />
            <InputField 
              label="Strategy Heading" 
              value={formData.strategyHeading || ''} 
              onChange={v => handleChange('strategyHeading', v)} 
              placeholder="Default: Strategy / Strategy & Execution"
            />
            <InputField 
              label="Impact Heading" 
              value={formData.impactHeading || ''} 
              onChange={v => handleChange('impactHeading', v)} 
              placeholder="Default: Impact"
            />
        </div>
      </div>

      <div className="mt-4 bg-slate-50 p-4 rounded">
        <h4 className="font-bold text-slate-900 mb-2">Media Collections (Enter URLs)</h4>
        <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-1">Gallery Image Count</label>
            <HelperText>Specify the number of images to show in carousels. Leave blank to show all.</HelperText>
            <input 
                type="number" 
                value={formData.galleryImageCount || ''} 
                onChange={e => handleChange('galleryImageCount', e.target.value ? parseInt(e.target.value, 10) : undefined)} 
                placeholder="Leave blank to show all"
                className="w-full p-2 border rounded text-slate-900 bg-gray-50 focus:ring-2 focus:ring-brand-primary outline-none transition-all"
            />
        </div>
        <HelperText>Recommended: 600x400px JPG/PNG. Used in sidebars or smaller grids.</HelperText>
        <InputField label="Process Images (Small side images)" value={formData.processImages.join(', ')} onChange={v => handleArrayChange('processImages', v)} multiline />
        
        <HelperText>Recommended: 1200x800px JPG/PNG for carousels and large displays.</HelperText>
        <InputField label="Gallery Images (Carousel)" value={formData.galleryImages?.join(', ') || ''} onChange={v => handleArrayChange('galleryImages', v)} multiline />
        
        <HelperText>Recommended: Vertical images (e.g., 9:16) or standard horizontal (16:9) depending on the layout.</HelperText>
        <InputField label="Footer Images (Bottom Grid)" value={formData.footerImages?.join(', ') || ''} onChange={v => handleArrayChange('footerImages', v)} multiline />
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <button onClick={onCancel} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded font-medium">Cancel</button>
        <button onClick={() => onSave(formData)} className="px-6 py-2 bg-brand-primary text-white font-bold rounded hover:opacity-90">Save Project</button>
      </div>
    </div>
  );
};

// Component to fix textarea newline issue
const TextAreaListEditor: React.FC<{
  label: string;
  helperText: string;
  value: string[];
  onSave: (text: string) => void;
}> = ({ label, helperText, value, onSave }) => {
  const [text, setText] = useState(value.join('\n'));
  
  useEffect(() => {
    // Sync with external changes
    setText(value.join('\n'));
  }, [value]);

  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-1">{label}</label>
      <HelperText>{helperText}</HelperText>
      <textarea
        className="w-full h-48 p-3 border border-gray-300 bg-slate-50 rounded text-xs focus:ring-2 focus:ring-brand-primary outline-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => onSave(text)}
      />
    </div>
  );
};


export const AdminPage: React.FC = () => {
  const { 
    heroProjects, updateHeroProjects, 
    aboutMe, updateAboutMe,
    clientLogos, updateClientLogos,
    brandLogos, updateBrandLogos,
    resetToDefaults
  } = useContent();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [editingProject, setEditingProject] = useState<CaseStudyProject | null>(null);
  const [jsonErrors, setJsonErrors] = useState<Record<string, string | null>>({});

  // Local state for textareas to prevent cursor jumping
  const [clientLogosText, setClientLogosText] = useState(clientLogos.join('\n'));
  const [brandLogosText, setBrandLogosText] = useState(brandLogos.join('\n'));

  useEffect(() => {
    // Sync local state if global context changes
    setClientLogosText(clientLogos.join('\n'));
  }, [clientLogos]);

  useEffect(() => {
    // Sync local state if global context changes
    setBrandLogosText(brandLogos.join('\n'));
  }, [brandLogos]);

  useEffect(() => {
      // Firebase Auth Listener
      if (auth) {
          const unsubscribe = onAuthStateChanged(auth, (user) => {
              if (user) setIsAuthenticated(true);
              else setIsAuthenticated(false);
          });
          return () => unsubscribe();
      }
  }, []);
  
  const TABS: Record<string, string> = {
    home: 'HOME',
    projects: 'PROJECTS',
    brands: 'BRANDS',
    profile: 'PROFILE'
  };

  const handleJsonChange = (field: keyof AboutMeData, value: string) => {
    try {
        const parsed = JSON.parse(value);
        updateAboutMe({ ...aboutMe, [field]: parsed });
        setJsonErrors(prev => ({ ...prev, [field]: null }));
    } catch (e) {
        setJsonErrors(prev => ({ ...prev, [field]: 'Invalid JSON format.' }));
    }
  };

  const handleStringArrayChange = (field: keyof AboutMeData, value: string, separator: string | RegExp = '\n') => {
      const arr = value.split(separator).map(s => s.trim()).filter(Boolean);
      updateAboutMe({ ...aboutMe, [field]: arr });
  };


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (auth) {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err: any) {
            setErrorMsg(err.message);
        }
    } else {
        // Fallback for demo/localStorage mode without Firebase config
        if (email === 'admin' && password === 'password') {
            setIsAuthenticated(true);
        } else {
            setErrorMsg('Invalid demo credentials (use admin/password)');
        }
    }
  };

  const handleLogout = () => {
      if (auth) signOut(auth);
      setIsAuthenticated(false);
  }

  const handleViewSite = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = '#/';
  };

  const handleAddProject = () => {
    const newProject: CaseStudyProject = {
      id: `project-${Date.now()}`,
      title: 'New Project',
      subtitle: 'Case Study',
      heroImage: 'https://picsum.photos/seed/new/1200/800',
      challenge: 'Describe the challenge...',
      strategy: 'Describe the strategy...',
      impact: 'Describe the impact...',
      processImages: [],
      client: 'Client Name',
      layout: '2'
    };
    updateHeroProjects([...heroProjects, newProject]);
    setEditingProject(newProject);
  };

  const handleSaveProject = (updatedProject: CaseStudyProject) => {
    const exists = heroProjects.find(p => p.id === updatedProject.id);
    let newProjects;
    if (exists) {
        newProjects = heroProjects.map(p => p.id === updatedProject.id ? updatedProject : p);
    } else {
        newProjects = [...heroProjects, updatedProject];
    }
    updateHeroProjects(newProjects);
    setEditingProject(null);
  };

  const handleDeleteProject = (id: string) => {
      if (confirm('Are you sure you want to delete this project?')) {
          updateHeroProjects(heroProjects.filter(p => p.id !== id));
      }
  };

  const handleLogosUpdate = (type: 'client' | 'brand', text: string) => {
    const urls = text.split('\n').map(s => s.trim()).filter(s => s !== '');
    if (type === 'client') updateClientLogos(urls);
    else updateBrandLogos(urls);
  };

  const siteColors = [
    { name: 'Default', value: '' },
    { name: 'Brand Primary (Teal)', value: '#0891b2' },
    { name: 'Text Primary (White)', value: '#f8fafc' },
    { name: 'Text Secondary (Light Gray)', value: '#cbd5e1' },
    { name: 'Text Tertiary (Gray)', value: '#94a3b8' },
    { name: 'Base Dark (Slate)', value: '#0f172a' },
    { name: 'Base Medium (Slate)', value: '#1e293b' },
  ];

  const ColorSelector: React.FC<{ label: string; value: string; onChange: (v: string) => void }> = ({ label, value, onChange }) => (
    <div className="mb-4">
      <label className="block text-sm font-bold text-gray-700 mb-1">{label}</label>
      <select value={value || ''} onChange={e => onChange(e.target.value)} className="w-full p-2 border rounded text-slate-900 bg-gray-50 focus:ring-2 focus:ring-brand-primary outline-none">
        {siteColors.map(c => <option key={c.name} value={c.value}>{c.name}</option>)}
      </select>
    </div>
  );

  // Styles to override global cursor:none for admin pages
  const restoreCursorStyles = (
    <style>{`
      body, html, a, button, [role="button"], input, textarea, select {
        cursor: auto !important;
      }
    `}</style>
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-dark bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-blend-overlay">
        {restoreCursorStyles}
        <div className="bg-base-medium/95 backdrop-blur-sm p-8 rounded-lg shadow-2xl w-96 border border-base-light">
          <h1 className="text-2xl font-black text-white mb-2">Admin Access</h1>
          <p className="text-sm text-gray-400 mb-6">Enter your credentials to manage content.</p>
          
          {errorMsg && <div className="mb-4 p-2 bg-red-900/50 text-red-200 border border-red-800 text-sm rounded">{errorMsg}</div>}

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-1 text-gray-300">Email / Username</label>
              <input 
                type="text" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                className="w-full p-2 border border-base-light rounded text-white bg-base-dark focus:ring-2 focus:ring-brand-primary outline-none" 
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-bold mb-1 text-gray-300">Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                className="w-full p-2 border border-base-light rounded text-white bg-base-dark focus:ring-2 focus:ring-brand-primary outline-none" 
              />
            </div>
            <button type="submit" className="w-full bg-brand-primary text-white font-bold py-2 rounded hover:opacity-90 transition-opacity">Login</button>
          </form>
          <div className="mt-4 text-xs text-center text-gray-500">
            {!auth && "(Demo Mode: use admin/password)"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 pb-20">
      {restoreCursorStyles}
      {/* Admin Header */}
      <div className="bg-base-dark text-white sticky top-0 z-50 shadow-lg border-b border-slate-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
                <h1 className="text-xl font-black tracking-tight">CMS<span className="text-brand-primary">.</span></h1>
                <a 
                  href="#/" 
                  onClick={handleViewSite}
                  className="text-sm text-gray-400 hover:text-white flex items-center gap-1"
                >
                   View Site &rarr;
                </a>
            </div>
            <div className="flex gap-4 items-center">
                <button onClick={resetToDefaults} className="text-xs text-red-400 hover:text-red-300 border border-red-900/50 px-2 py-1 rounded bg-red-900/20">
                    Reset Data
                </button>
                <button onClick={handleLogout} className="text-sm font-bold bg-white text-base-dark px-4 py-1.5 rounded hover:bg-gray-200 transition-colors">
                    Logout
                </button>
            </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Tabs */}
        <div className="flex overflow-x-auto gap-2 md:gap-4 border-b border-slate-300 mb-8 pb-1">
          {Object.entries(TABS).map(([key, value]) => (
            <button 
              key={key}
              onClick={() => { setActiveTab(key); setEditingProject(null); }}
              className={`px-4 md:px-6 py-3 font-bold transition-all whitespace-nowrap ${
                activeTab === key 
                  ? 'text-brand-primary border-b-4 border-brand-primary bg-white rounded-t-lg' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-white/50 rounded-t-lg'
              }`}
            >
              {value}
            </button>
          ))}
        </div>

        {/* HOME TAB */}
        {activeTab === 'home' && (
             <div className="bg-white p-8 rounded-lg shadow-sm animate-fade-in-up space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Homepage Hero Section</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                    <div>
                      <InputField label="Hero Title" value={aboutMe.name} onChange={v => updateAboutMe({...aboutMe, name: v})} />
                      <InputField label="Hero Subtitle" value={aboutMe.title} onChange={v => updateAboutMe({...aboutMe, title: v})} />
                      <InputField 
                          label="Hero Introduction Text" 
                          value={aboutMe.heroIntro} 
                          onChange={v => updateAboutMe({...aboutMe, heroIntro: v})} 
                          multiline 
                      />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-2">Hero Colors</h3>
                        <ColorSelector label="Background Color" value={aboutMe.heroBackgroundColor || ''} onChange={v => updateAboutMe({...aboutMe, heroBackgroundColor: v})} />
                        <ColorSelector label="Title Color" value={aboutMe.heroTitleColor || ''} onChange={v => updateAboutMe({...aboutMe, heroTitleColor: v})} />
                        <ColorSelector label="Subtitle Color" value={aboutMe.heroSubtitleColor || ''} onChange={v => updateAboutMe({...aboutMe, heroSubtitleColor: v})} />
                        <ColorSelector label="Intro Text Color" value={aboutMe.heroIntroColor || ''} onChange={v => updateAboutMe({...aboutMe, heroIntroColor: v})} />
                    </div>
                  </div>
                </div>
             </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <div className="bg-white p-8 rounded-lg shadow-sm animate-fade-in-up space-y-8">
            <div>
                <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Contact &amp; Global Info</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Email Address" value={aboutMe.email} onChange={v => updateAboutMe({...aboutMe, email: v})} />
                    <InputField label="Phone Number" value={aboutMe.phone} onChange={v => updateAboutMe({...aboutMe, phone: v})} />
                    <InputField label="LinkedIn URL" value={aboutMe.linkedInUrl} onChange={v => updateAboutMe({...aboutMe, linkedInUrl: v})} />
                    <InputField label="Resume URL" value={aboutMe.resumeUrl} onChange={v => updateAboutMe({...aboutMe, resumeUrl: v})} />
                </div>
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-6 pb-2 border-b">About Page Content</h2>
                <InputField label="About Page Intro Statement" value={aboutMe.introStatement} onChange={v => updateAboutMe({...aboutMe, introStatement: v})} multiline />
                <HelperText>Recommended: 1200x800px or larger. Will be displayed with a dark overlay.</HelperText>
                <InputField label="About Page Hero Image URL" value={aboutMe.heroImage} onChange={v => updateAboutMe({...aboutMe, heroImage: v})} />
                <HelperText>Recommended: Wide aspect ratio, e.g., 2000x600px.</HelperText>
                <InputField label="Panorama Image URL" value={aboutMe.panoramaImage} onChange={v => updateAboutMe({...aboutMe, panoramaImage: v})} />
                
                <div className="mt-6">
                    <label className="block text-sm font-bold text-gray-700 mb-1">Philosophy Section</label>
                    <HelperText>Edit the content below using JSON format. Each item should have a "title" and a "text".</HelperText>
                    <textarea value={JSON.stringify(aboutMe.philosophy, null, 2)} onChange={e => handleJsonChange('philosophy', e.target.value)} className={`w-full p-2 border rounded text-slate-900 bg-gray-50 h-48 focus:ring-2 outline-none font-mono text-xs ${jsonErrors.philosophy ? 'border-red-500 ring-red-500' : 'focus:ring-brand-primary'}`} />
                    {jsonErrors.philosophy && <p className="text-red-500 text-xs mt-1">{jsonErrors.philosophy}</p>}
                </div>

                 <div className="mt-6">
                    <TextAreaListEditor
                      label="Inspiration Grid Images"
                      helperText="Recommended: 16:9 aspect ratio, e.g., 1200x675px. Enter one image URL per line."
                      value={aboutMe.inspirationGrid}
                      onSave={(text) => handleStringArrayChange('inspirationGrid', text)}
                    />
                </div>
            </div>
             <div>
                <h2 className="text-2xl font-bold mb-6 pb-2 border-b">About Page Lists</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <TextAreaListEditor
                        label="Obsessions"
                        helperText="One item per line."
                        value={aboutMe.obsessions}
                        onSave={(text) => handleStringArrayChange('obsessions', text)}
                    />
                    <TextAreaListEditor
                        label="Bucket List (Travel)"
                        helperText="One item per line."
                        value={aboutMe.travelLog}
                        onSave={(text) => handleStringArrayChange('travelLog', text)}
                    />
                </div>
                 <div className="mt-6">
                    <label className="block text-sm font-bold text-gray-700 mb-1">Media Diet (Favorites)</label>
                    <HelperText>Edit as JSON. Keys are "movies", "shows", "podcasts", "audiobooks".</HelperText>
                    <textarea value={JSON.stringify(aboutMe.favorites, null, 2)} onChange={e => handleJsonChange('favorites', e.target.value)} className={`w-full p-2 border rounded text-slate-900 bg-gray-50 h-48 focus:ring-2 outline-none font-mono text-xs ${jsonErrors.favorites ? 'border-red-500 ring-red-500' : 'focus:ring-brand-primary'}`} />
                    {jsonErrors.favorites && <p className="text-red-500 text-xs mt-1">{jsonErrors.favorites}</p>}
                </div>
            </div>
          </div>
        )}

        {/* PROJECTS TAB */}
        {activeTab === 'projects' && (
          <div className="space-y-6 animate-fade-in-up">
            {!editingProject ? (
              <>
                <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-sm">
                    <div>
                        <h2 className="text-2xl font-bold">PROJECTS</h2>
                        <p className="text-sm text-gray-500">Manage your main portfolio projects.</p>
                    </div>
                    <button onClick={handleAddProject} className="bg-brand-primary text-white px-4 py-2 rounded font-bold shadow hover:bg-opacity-90 flex items-center gap-2">
                        <span className="text-xl leading-none">+</span> Add Project
                    </button>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                    {heroProjects.map((project, index) => (
                        <div key={project.id} className="bg-white p-4 rounded shadow-sm border border-transparent hover:border-gray-200 transition-all flex justify-between items-center group">
                            <div className="flex items-center gap-4">
                                <span className="font-bold text-gray-400 text-lg w-6 text-center">{index + 1}.</span>
                                <div className="w-16 h-16 rounded overflow-hidden bg-gray-200 flex-shrink-0">
                                    <img src={project.heroImage} className="w-full h-full object-cover" alt="thumb"/>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-800">{project.title}</h3>
                                    <div className="flex gap-2 mt-1">
                                        <span className="text-xs bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded uppercase font-semibold">{project.layout ? `Layout ${project.layout}` : 'Layout 2'}</span>
                                        {project.client && <span className="text-xs text-gray-500 border px-2 py-0.5 rounded">{project.client}</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => setEditingProject(project)} className="text-brand-primary font-bold px-4 py-2 hover:bg-brand-primary/10 rounded transition-colors">Edit</button>
                                <button onClick={() => handleDeleteProject(project.id)} className="text-red-500 font-bold px-4 py-2 hover:bg-red-50 rounded transition-colors">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
              </>
            ) : (
              <ProjectEditor 
                project={editingProject} 
                onSave={handleSaveProject} 
                onCancel={() => setEditingProject(null)} 
              />
            )}
          </div>
        )}

        {/* BRANDS TAB */}
        {activeTab === 'brands' && (
          <div className="space-y-8 animate-fade-in-up">
            <div>
              <h2 className="text-2xl font-bold mb-4">Logo Organization</h2>
              <p className="text-sm text-gray-500 mb-6">Drag and drop logos to reorder them for the homepage carousel. Use the text boxes below to add or remove logos from the lists.</p>
              <div className="space-y-8">
                <DraggableLogoGrid title="Client Logos" logos={clientLogos} onUpdate={updateClientLogos} />
                <DraggableLogoGrid title="Brand Logos" logos={brandLogos} onUpdate={updateBrandLogos} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t">
              <div className="bg-white p-6 rounded shadow-sm h-full">
                 <div className="flex justify-between items-end mb-4">
                     <h3 className="text-xl font-bold">Client Logos List</h3>
                     <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500">{clientLogos.length} items</span>
                 </div>
                 <HelperText>
                     <strong>Instructions:</strong> Enter one image URL per line. Use SVG or transparent PNGs with a max height of 32px for best results.
                 </HelperText>
                 <textarea 
                   className="w-full h-96 p-3 border border-gray-300 bg-slate-50 rounded text-xs font-mono focus:ring-2 focus:ring-brand-primary outline-none leading-relaxed"
                   value={clientLogosText}
                   onChange={e => setClientLogosText(e.target.value)}
                   onBlur={e => handleLogosUpdate('client', e.target.value)}
                   placeholder="https://..."
                 />
              </div>
              
              <div className="bg-white p-6 rounded shadow-sm h-full">
                 <div className="flex justify-between items-end mb-4">
                     <h3 className="text-xl font-bold">Brand Logos List</h3>
                     <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500">{brandLogos.length} items</span>
                 </div>
                 <HelperText>
                     <strong>Instructions:</strong> Enter one image URL per line. These appear in the second marquee row.
                 </HelperText>
                 <textarea 
                   className="w-full h-96 p-3 border border-gray-300 bg-slate-50 rounded text-xs font-mono focus:ring-2 focus:ring-brand-primary outline-none leading-relaxed"
                   value={brandLogosText}
                   onChange={e => setBrandLogosText(e.target.value)}
                   onBlur={e => handleLogosUpdate('brand', e.target.value)}
                   placeholder="https://..."
                 />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};