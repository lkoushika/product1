import { useState, useEffect } from 'react';
import Landing from './pages/Landing';
import Editor from './pages/Editor';
import SharePage from './pages/SharePage';
import ViewPage from './pages/ViewPage';
import { saveApologyPage, generateSlug } from './lib/supabase';
import type { ApologyPage } from './lib/supabase';

type AppView = 'landing' | 'editor' | 'share' | 'view';

export default function App() {
  const [view, setView] = useState<AppView>('landing');
  const [publishedPage, setPublishedPage] = useState<ApologyPage | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [viewSlug, setViewSlug] = useState<string | null>(null);

  useEffect(() => {
    const path = window.location.pathname;
    const match = path.match(/^\/page\/(.+)$/);
    if (match) {
      setViewSlug(match[1]);
      setView('view');
    }
  }, []);

  const handlePublish = async (pageData: Omit<ApologyPage, 'id' | 'created_at'>) => {
    setIsPublishing(true);
    try {
      const base = pageData.partner_name.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 12) || 'dear';
      const slug = `${base}-${generateSlug().split('-').slice(-1)[0]}-${Math.random().toString(36).slice(2, 6)}`;
      const saved = await saveApologyPage({ ...pageData, slug });
      if (saved) {
        setPublishedPage(saved);
        setView('share');
        window.history.pushState({}, '', `/page/${saved.slug}`);
      }
    } finally {
      setIsPublishing(false);
    }
  };

  const handleCreateAnother = () => {
    setPublishedPage(null);
    window.history.pushState({}, '', '/');
    setView('editor');
  };

  if (view === 'view' && viewSlug) {
    return <ViewPage slug={viewSlug} />;
  }

  if (view === 'landing') {
    return <Landing onCreateClick={() => setView('editor')} />;
  }

  if (view === 'editor') {
    return (
      <Editor
        onPublish={handlePublish}
        isPublishing={isPublishing}
      />
    );
  }

  if (view === 'share' && publishedPage) {
    return (
      <SharePage
        page={publishedPage}
        onCreateAnother={handleCreateAnother}
      />
    );
  }

  return <Landing onCreateClick={() => setView('editor')} />;
}
