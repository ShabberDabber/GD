import React, { useState, useEffect, useRef } from 'react';
import { useContent, useContentDispatch } from '../../context/ContentContext';

// --- Reusable Components ---
const Input = ({ label, value, onChange, type = "text", rows = 3 }: any) => {
  const InputComponent = type === 'textarea' ? 'textarea' : 'input';
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <InputComponent
        type={type}
        value={value}
        onChange={onChange}
        rows={rows}
        className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
      />
    </div>
  );
};

const ColorInput = ({ label, value, onChange }: any) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="flex items-center">
      <input type="text" value={value} onChange={onChange} className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary" />
      <div className="w-8 h-8 ml-2 rounded border" style={{ backgroundColor: value }} />
    </div>
  </div>
);

// --- Editor Sub-Components ---

const ProfileEditor = () => {
  const content = useContent();
  const { updateContent } = useContentDispatch();
  const [aboutMe, setAboutMe] = useState(content.aboutMe);

  const handleAboutChange = (field: string, value: string) => {
    setAboutMe((prev: any) => ({ ...prev, [field]: value }));
  };

  const saveChanges = () => {
    updateContent({ ...content, aboutMe });
    alert("Profile changes saved!");
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Home Page & About Me</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="Name" value={aboutMe.name} onChange={(e: any) => handleAboutChange('name', e.target.value)} />
        <Input label="Title" value={aboutMe.title} onChange={(e: any) => handleAboutChange('title', e.target.value)} />
        <Input label="Email" value={aboutMe.email} onChange={(e: any) => handleAboutChange('email', e.target.value)} />
        <Input label="Phone" value={aboutMe.phone} onChange={(e: any) => handleAboutChange('phone', e.target.value)} />
      </div>
      <div className="mt-6">
        <Input label="About Page Heading" value={aboutMe.aboutPage.heading} onChange={(e: any) => setAboutMe((p:any) => ({...p, aboutPage: {...p.aboutPage, heading: e.target.value}}))} />
        <Input label="Intro Paragraph" type="textarea" value={aboutMe.aboutPage.intro} onChange={(e: any) => setAboutMe((p:any) => ({...p, aboutPage: {...p.aboutPage, intro: e.target.value}}))} />
      </div>
      <button onClick={saveChanges} className="mt-6 bg-brand-primary text-white font-bold py-2 px-4 rounded hover:bg-cyan-700">Save Profile</button>
    </div>
  );
};

const ThemeEditor = () => {
  const content = useContent();
  const { updateContent } = useContentDispatch();
  const [theme, setTheme] = useState(content.aboutMe.theme);

  const handleColorChange = (key: string, value: string) => {
    setTheme((prev: any) => ({ ...prev, colors: { ...prev.colors, [key]: value } }));
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Theme Settings</h2>
      <div className="mb-6">
        <Input label="Header Logo Text" value={theme.headerLogoText} onChange={(e: any) => setTheme((p:any) => ({...p, headerLogoText: e.target.value}))} />
        <Input label="Header Icon URL" value={theme.headerIconUrl} onChange={(e: any) => setTheme((p:any) => ({...p, headerIconUrl: e.target.value}))} />
      </div>
      <h3 className="font-bold mb-2">Color Palette</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(theme.colors).map(([key, value]) => (
          <ColorInput key={key} label={key.replace(/-/g, ' ')} value={value} onChange={(e: any) => handleColorChange(key, e.target.value)} />
        ))}
      </div>
      <button onClick={() => { updateContent({ ...content, aboutMe: { ...content.aboutMe, theme } }); alert("Theme Saved"); }} className="mt-6 bg-brand-primary text-white font-bold py-2 px-4 rounded">Save Theme</button>
    </div>
  );
};

const ProjectDetailEditor = ({ project, onBack, onSave }: any) => {
  const [edited, setEdited] = useState(project);

  const handleField = (f: string, v: any) => setEdited((p:any) => ({...p, [f]: v}));
  const handleImage = (f: string, sub: string, v: any) => setEdited((p:any) => ({...p, [f]: {...p[f], [sub]: v}}));

  return (
    <div>
      <button onClick={onBack} className="mb-4 text-gray-500">← Back</button>
      <h3 className="text-xl font-bold mb-4">Editing: {edited.title}</h3>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <Input label="Title" value={edited.title} onChange={(e:any) => handleField('title', e.target.value)} />
        <Input label="Client" value={edited.client} onChange={(e:any) => handleField('client', e.target.value)} />
        <Input label="Tags (comma sep)" value={edited.tags.join(', ')} onChange={(e:any) => handleField('tags', e.target.value.split(',').map((t:string)=>t.trim()))} />
      </div>
      <div className="border p-4 mb-6 rounded">
        <h4 className="font-bold mb-2">Homepage Image</h4>
        <Input label="URL" value={edited.homePageImage?.url} onChange={(e:any) => handleImage('homePageImage', 'url', e.target.value)} />
      </div>

      <h4 className="font-bold text-lg mb-2">Content Blocks</h4>
      <p className="text-gray-500 mb-4">Manage the layout of the case study page.</p>
      {edited.contentBlocks.map((block: any, i: number) => (
        <div key={i} className="border p-3 mb-2 rounded flex justify-between items-center bg-gray-50">
          <span className="capitalize font-semibold">{block.type}</span>
          <div className="space-x-2">
            <button className="text-blue-600 text-sm" onClick={() => {
              const newData = prompt("Edit Block Data (JSON)", JSON.stringify(block.data));
              if (newData) {
                try {
                  const parsed = JSON.parse(newData);
                  const newBlocks = [...edited.contentBlocks];
                  newBlocks[i].data = parsed;
                  setEdited({...edited, contentBlocks: newBlocks});
                } catch(e) {
                  alert("Invalid JSON");
                }
              }
            }}>Edit JSON</button>
            <button className="text-red-600 text-sm" onClick={() => {
              const newBlocks = edited.contentBlocks.filter((_:any, idx:number) => idx !== i);
              setEdited({...edited, contentBlocks: newBlocks});
            }}>Delete</button>
          </div>
        </div>
      ))}

      <div className="mt-4 flex gap-2">
        <select className="border p-2 rounded" onChange={(e) => {
          if (e.target.value) {
            setEdited({...edited, contentBlocks: [...edited.contentBlocks, { type: e.target.value, data: {} }]});
            e.target.value = "";
          }
        }}>
          <option value="">+ Add Block...</option>
          <option value="hero">Hero Image</option>
          <option value="text">Text Block</option>
          <option value="textWithImages">Text + Images</option>
          <option value="pano">Pano Image</option>
          <option value="carousel">Carousel</option>
          <option value="stats">Stats</option>
          <option value="quote">Quote</option>
        </select>
      </div>

      <button onClick={() => onSave(edited)} className="mt-8 bg-green-600 text-white font-bold py-2 px-6 rounded">Save Project</button>
    </div>
  );
};

const ProjectEditor = () => {
  const content = useContent();
  const { updateContent } = useContentDispatch();
  const [projects, setProjects] = useState(content.heroProjects || []);
  const [editingProject, setEditingProject] = useState<any>(null);

  const dragItem = useRef<any>(null);
  const dragOverItem = useRef<any>(null);

  const handleDragStart = (index: number) => { dragItem.current = index; };
  const handleDragEnter = (index: number) => { dragOverItem.current = index; };
  const handleDragEnd = () => {
    const newProjects = [...projects];
    const draggedItemContent = newProjects.splice(dragItem.current, 1)[0];
    newProjects.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setProjects(newProjects);
    updateContent({ ...content, heroProjects: newProjects });
  };

  const handleDuplicate = (projectId: string) => {
    const p = projects.find((x: any) => x.id === projectId);
    if (p) {
      const newP = { ...JSON.parse(JSON.stringify(p)), id: `project-${Date.now()}`, title: `${p.title} (Copy)` };
      const updated = [...projects, newP];
      setProjects(updated);
      updateContent({ ...content, heroProjects: updated });
    }
  };

  if (editingProject) {
    return <ProjectDetailEditor project={editingProject} onBack={() => setEditingProject(null)} onSave={(p: any) => {
      const updated = projects.map((x: any) => x.id === p.id ? p : x);
      setProjects(updated);
      updateContent({ ...content, heroProjects: updated });
      setEditingProject(null);
    }} />;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Projects</h2>
      <p className="text-sm text-gray-500 mb-4">Drag to reorder.</p>
      {projects.map((project: any, index: number) => (
        <div key={project.id} className="flex items-center justify-between p-4 mb-2 border rounded bg-gray-50" draggable onDragStart={() => handleDragStart(index)} onDragEnter={() => handleDragEnter(index)} onDragEnd={handleDragEnd} onDragOver={e => e.preventDefault()}>
          <span className="font-semibold">{project.title}</span>
          <div className="space-x-2">
            <button onClick={() => handleDuplicate(project.id)} className="text-blue-600 text-sm">Duplicate</button>
            <button onClick={() => setEditingProject(project)} className="text-brand-primary text-sm font-bold">Edit</button>
            <button onClick={() => { if(confirm("Delete?")) { const updated = projects.filter((p:any) => p.id !== project.id); setProjects(updated); updateContent({...content, heroProjects: updated}); }}} className="text-red-600 text-sm">Delete</button>
          </div>
        </div>
      ))}
      <button onClick={() => {
        const newP = { id: `p-${Date.now()}`, title: 'New Project', client: 'Client', tags: [], homePageTitle: 'New', homePageImage: { url: '', alt: '' }, contentBlocks: [] };
        const updated = [...projects, newP];
        setProjects(updated);
        updateContent({ ...content, heroProjects: updated });
        setEditingProject(newP);
      }} className="mt-4 bg-green-600 text-white py-2 px-4 rounded">Add New Project</button>
    </div>
  );
};

export const AdminPage = () => {
  const [tab, setTab] = useState('profile');
  return (
    <div className="min-h-screen bg-gray-100 p-8 pt-32 text-slate-900">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6">
        <h1 className="text-3xl font-bold mb-8">Portfolio Admin</h1>
        <div className="flex border-b mb-6">
          <button className={`px-4 py-2 ${tab === 'profile' ? 'border-b-2 border-brand-primary font-bold' : ''}`} onClick={() => setTab('profile')}>Profile</button>
          <button className={`px-4 py-2 ${tab === 'projects' ? 'border-b-2 border-brand-primary font-bold' : ''}`} onClick={() => setTab('projects')}>Projects</button>
          <button className={`px-4 py-2 ${tab === 'theme' ? 'border-b-2 border-brand-primary font-bold' : ''}`} onClick={() => setTab('theme')}>Theme</button>
        </div>
        {tab === 'profile' && <ProfileEditor />}
        {tab === 'projects' && <ProjectEditor />}
        {tab === 'theme' && <ThemeEditor />}
      </div>
    </div>
  );
};