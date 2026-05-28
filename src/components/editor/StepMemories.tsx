import { useState, useRef } from 'react';
import { Plus, Trash2, Image } from 'lucide-react';
import type { EditorData } from '../../pages/Editor';
import type { Photo } from '../../lib/supabase';

interface Props {
  data: EditorData;
  onChange: (partial: Partial<EditorData>) => void;
}

export default function StepMemories({ data, onChange }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addPhoto = (file: File) => {
    if (data.photos.length >= 5) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      onChange({ photos: [...data.photos, { url, caption: '' }] });
    };
    reader.readAsDataURL(file);
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const remaining = 5 - data.photos.length;
    Array.from(files).slice(0, remaining).forEach(f => {
      if (f.type.startsWith('image/')) addPhoto(f);
    });
  };

  const updateCaption = (index: number, caption: string) => {
    const updated = data.photos.map((p, i) => i === index ? { ...p, caption } : p);
    onChange({ photos: updated });
  };

  const removePhoto = (index: number) => {
    onChange({ photos: data.photos.filter((_, i) => i !== index) });
  };

  if (!data.show_memories) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="font-sans text-sm">Memories section is turned off. Enable it in Step 1 to add photos.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5 max-w-xl">
      <p className="font-sans text-sm text-gray-500">
        Add up to 5 photos. Each can have a short caption. These become the heart of your memory section.
      </p>

      {/* Drop zone */}
      {data.photos.length < 5 && (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={e => {
            e.preventDefault();
            setIsDragging(false);
            handleFiles(e.dataTransfer.files);
          }}
          className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
            isDragging ? 'border-rose-300 bg-rose-50' : 'border-gray-200 hover:border-rose-200 hover:bg-rose-50/30'
          }`}
        >
          <Image className="w-8 h-8 text-gray-300 mx-auto mb-3" />
          <p className="font-sans text-sm text-gray-500">Drop photos here or <span className="text-rose-400">click to upload</span></p>
          <p className="font-sans text-xs text-gray-300 mt-1">{5 - data.photos.length} photo{5 - data.photos.length !== 1 ? 's' : ''} remaining</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={e => handleFiles(e.target.files)}
          />
        </div>
      )}

      {/* Photo list */}
      <div className="space-y-4">
        {data.photos.map((photo, i) => (
          <div key={i} className="flex gap-4 bg-gray-50 rounded-2xl p-4">
            <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
              <img src={photo.url} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="font-sans text-xs text-gray-400">Photo {i + 1}</p>
                <button
                  onClick={() => removePhoto(i)}
                  className="text-gray-300 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <input
                type="text"
                value={photo.caption}
                onChange={e => updateCaption(i, e.target.value)}
                placeholder="Add a short caption..."
                className="w-full text-sm font-sans text-gray-700 bg-white border border-gray-200 rounded-lg px-3 py-2 focus:border-rose-300 focus:ring-1 focus:ring-rose-100 outline-none placeholder:text-gray-300"
              />
            </div>
          </div>
        ))}
      </div>

      {data.photos.length === 0 && (
        <p className="font-sans text-xs text-center text-gray-300">No photos added yet. This section is optional.</p>
      )}
    </div>
  );
}
