
import React, { useState, useEffect } from 'react';
import { useContent } from '../../context/ContentContext';
import { CaseStudyProject, RecentWorkTheme, RecentWorkProject } from '../../types';
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

          <InputField label="Hero Image URL" value={formData.heroImage} onChange={v => handleChange('heroImage', v)} />
          <InputField label="Tags (comma separated)" value={formData.tags?.join(', ') || ''} onChange={v => handleArrayChange('tags', v)} />
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
        <InputField label="Process Images (Small side images)" value={formData.processImages.join(', ')} onChange={v => handleArrayChange('processImages', v)} multiline />
        <InputField label="Gallery Images (Carousel)" value={formData.galleryImages?.join(', ') || ''} onChange={v => handleArrayChange('galleryImages', v)} multiline />
        <InputField label="Footer Images (Bottom Grid)" value={formData.footerImages?.join(', ') || ''} onChange={v => handleArrayChange('footerImages', v)} multiline />
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <button onClick={onCancel} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded font-medium">Cancel</button>
        <button onClick={() => onSave(formData)} className="px-6 py-2 bg-brand-primary text-white font-bold rounded hover:opacity-90">Save Project</button>
      </div>
    </div>
  );
};

// Recent Work Editor
const RecentWorkEditor: React.FC<{ 
    themes: RecentWorkTheme[]; 
    onSave: (themes: RecentWorkTheme[]) => void; 
}> = ({ themes, onSave }) => {
    const [localThemes, setLocalThemes] = useState(themes);

    const updateThemeTitle = (index: number, title: string) => {
        const newThemes = [...localThemes];
        newThemes[index].theme = title;
        setLocalThemes(newThemes);
    };

    const updateProject = (themeIndex: number, projectIndex: number, field: keyof RecentWorkProject, value: string) => {
        const newThemes = [...localThemes];
        const project = newThemes[themeIndex].projects[projectIndex];
        (project as any)[field] = value;
        setLocalThemes(newThemes);
    };

    return (
        <div className="space-y-8">
            {localThemes.map((theme, tIdx) => (
                <div key={tIdx} className="bg-white p-6 rounded shadow-md">
                    <InputField label="Section Theme Title" value={theme.theme} onChange={(v) => updateThemeTitle(tIdx, v)} />
                    
                    <div className="space-y-4 mt-4">
                        {theme.projects.map((project, pIdx) => (
                            <div key={project.id} className="border p-4 rounded bg-slate-50">
                                <h4 className="text-xs font-bold uppercase text-gray-400 mb-2">Project {pIdx + 1}</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InputField label="Title" value={project.title} onChange={(v) => updateProject(tIdx, pIdx, 'title', v)} />
                                    <InputField label="Image URL" value={project.image} onChange={(v) => updateProject(tIdx, pIdx, 'image', v)} />
                                    <div className="md:col-span-2">
                                        <InputField label="Description" value={project.description} onChange={(v) => updateProject(tIdx, pIdx, 'description', v)} multiline />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <div className="flex justify-end">
                <button onClick={() => onSave(localThemes)} className="px-6 py-2 bg-brand-primary text-white font-bold rounded hover:opacity-90">
                    Save Recent Work
                </button>
            </div>
        </div>
    );
};

export const AdminPage: React.FC = () => {
  const { 
    heroProjects, updateHeroProjects, 
    recentWork, updateRecentWork,
    aboutMe, updateAboutMe,
    clientLogos, updateClientLogos,
    brandLogos, updateBrandLogos,
    resetToDefaults
  } = useContent();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'recent' | 'partners'>('profile');
  const [editingProject, setEditingProject] = useState<CaseStudyProject | null>(null);

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
          {['profile', 'projects', 'recent', 'partners'].map((tab) => (
            <button 
              key={tab}
              onClick={() => { setActiveTab(tab as any); setEditingProject(null); }}
              className={`px-4 md:px-6 py-3 font-bold capitalize transition-all whitespace-nowrap ${
                activeTab === tab 
                  ? 'text-brand-primary border-b-4 border-brand-primary bg-white rounded-t-lg' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-white/50 rounded-t-lg'
              }`}
            >
              {tab === 'recent' ? 'Recent Work' : tab}
            </button>
          ))}
        </div>

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <div className="bg-white p-8 rounded-lg shadow-sm animate-fade-in-up">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Full Name" value={aboutMe.name} onChange={v => updateAboutMe({...aboutMe, name: v})} />
              <InputField label="Job Title" value={aboutMe.title} onChange={v => updateAboutMe({...aboutMe, title: v})} />
              <InputField label="Email Address" value={aboutMe.email} onChange={v => updateAboutMe({...aboutMe, email: v})} />
              <InputField label="Phone Number" value={aboutMe.phone} onChange={v => updateAboutMe({...aboutMe, phone: v})} />
              <div className="md:col-span-2">
                <InputField label="Intro Statement (Hero)" value={aboutMe.introStatement} onChange={v => updateAboutMe({...aboutMe, introStatement: v})} multiline />
              </div>
              <InputField label="Hero Image URL" value={aboutMe.heroImage} onChange={v => updateAboutMe({...aboutMe, heroImage: v})} />
              <InputField label="Panorama Image URL" value={aboutMe.panoramaImage} onChange={v => updateAboutMe({...aboutMe, panoramaImage: v})} />
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
                        <h2 className="text-2xl font-bold">Case Studies</h2>
                        <p className="text-sm text-gray-500">Manage your main portfolio case studies.</p>
                    </div>
                    <button onClick={handleAddProject} className="bg-brand-primary text-white px-4 py-2 rounded font-bold shadow hover:bg-opacity-90 flex items-center gap-2">
                        <span className="text-xl leading-none">+</span> Add Project
                    </button>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                    {heroProjects.map(project => (
                        <div key={project.id} className="bg-white p-4 rounded shadow-sm border border-transparent hover:border-gray-200 transition-all flex justify-between items-center group">
                            <div className="flex items-center gap-4">
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

        {/* RECENT WORK TAB */}
        {activeTab === 'recent' && (
             <div className="bg-white p-8 rounded-lg shadow-sm animate-fade-in-up">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold">Recent Work Sections</h2>
                    <p className="text-sm text-gray-500">Manage the smaller project cards that appear below the case studies.</p>
                </div>
                <RecentWorkEditor themes={recentWork} onSave={updateRecentWork} />
             </div>
        )}

        {/* PARTNERS TAB */}
        {activeTab === 'partners' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in-up">
            <div className="bg-white p-6 rounded shadow-sm h-full">
               <div className="flex justify-between items-end mb-4">
                   <h3 className="text-xl font-bold">Client Logos</h3>
                   <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500">{clientLogos.length} items</span>
               </div>
               <div className="p-3 bg-blue-50 text-blue-800 text-xs rounded mb-3">
                   <strong>Instructions:</strong> Enter one image URL per line. Rearrange lines to change the order on the homepage.
               </div>
               <textarea 
                 className="w-full h-96 p-3 border border-gray-300 bg-slate-50 rounded text-xs font-mono focus:ring-2 focus:ring-brand-primary outline-none leading-relaxed"
                 value={clientLogos.join('\n')}
                 onChange={e => handleLogosUpdate('client', e.target.value)}
                 placeholder="https://..."
               />
            </div>
            
            <div className="bg-white p-6 rounded shadow-sm h-full">
               <div className="flex justify-between items-end mb-4">
                   <h3 className="text-xl font-bold">Brand Logos</h3>
                   <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500">{brandLogos.length} items</span>
               </div>
               <div className="p-3 bg-blue-50 text-blue-800 text-xs rounded mb-3">
                   <strong>Instructions:</strong> Enter one image URL per line. These appear in the second marquee row.
               </div>
               <textarea 
                 className="w-full h-96 p-3 border border-gray-300 bg-slate-50 rounded text-xs font-mono focus:ring-2 focus:ring-brand-primary outline-none leading-relaxed"
                 value={brandLogos.join('\n')}
                 onChange={e => handleLogosUpdate('brand', e.target.value)}
                 placeholder="https://..."
               />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
