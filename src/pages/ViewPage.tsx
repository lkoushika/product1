import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { getApologyPage } from '../lib/supabase';
import type { ApologyPage } from '../lib/supabase';
import ApologyPageView from '../components/ApologyPageView';

interface ViewPageProps {
  slug: string;
}

export default function ViewPage({ slug }: ViewPageProps) {
  const [page, setPage] = useState<ApologyPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await getApologyPage(slug);
      if (data) {
        setPage(data);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    })();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-rose-50 flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-8 h-8 text-rose-300 fill-rose-200 mx-auto mb-3 animate-pulse" />
          <p className="font-sans text-rose-400 text-sm">Opening your message...</p>
        </div>
      </div>
    );
  }

  if (notFound || !page) {
    return (
      <div className="min-h-screen bg-rose-50 flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <Heart className="w-10 h-10 text-rose-200 fill-rose-100 mx-auto mb-4" />
          <h2 className="font-serif text-2xl text-rose-700 mb-3">Page not found</h2>
          <p className="font-sans text-rose-400/70 text-sm leading-relaxed">
            This link may have expired or the page doesn't exist. Ask the sender for a new link.
          </p>
        </div>
      </div>
    );
  }

  return <ApologyPageView page={page} />;
}
