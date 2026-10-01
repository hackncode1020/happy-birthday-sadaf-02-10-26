import React, { useState, useEffect } from 'react';
import { Camera, Maximize2, RefreshCw, Sparkles, Check, Upload, Loader2, FolderHeart, Info } from 'lucide-react';
import { PhotoItem } from '../types';
import { LightboxModal } from './LightboxModal';
import heic2any from 'heic2any';

const DEFAULT_PHOTOS: PhotoItem[] = [
  {
    id: 'photo-1',
    src: '/photos/sadaf-1.jpg',
    alt: 'Sadaf in Golden Silk Saree',
    caption: 'Golden Royalty ✨',
    subcaption: 'Looking like absolute elegance in golden silk',
  },
  {
    id: 'photo-2',
    src: '/photos/sadaf-2.jpg',
    alt: 'Sadaf in Misty Mountain Hoodie',
    caption: 'Misty Mountain Laughs 🌲',
    subcaption: 'That cute, contagious laugh in the foggy hills',
  },
  {
    id: 'photo-3',
    src: '/photos/sadaf-3.jpg',
    alt: 'Sadaf in Aesthetic Cafe',
    caption: 'Grace & Serenity 🌸',
    subcaption: 'Quiet, thoughtful elegance & heartwarming smile',
  },
];

const STORAGE_KEY = 'sadaf_custom_photos_v5';

export const PhotoSection: React.FC = () => {
  const [photos, setPhotos] = useState<PhotoItem[]>(DEFAULT_PHOTOS);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [hasCustomPhotos, setHasCustomPhotos] = useState(false);
  const [uploadSuccessIndex, setUploadSuccessIndex] = useState<number | null>(null);
  const [isConvertingIndex, setIsConvertingIndex] = useState<number | null>(null);
  const [isBatchUploading, setIsBatchUploading] = useState(false);
  const [showFolderInfo, setShowFolderInfo] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 3) {
          setPhotos(parsed);
          setHasCustomPhotos(true);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const convertFileIfNeeded = async (file: File): Promise<string> => {
    let processBlob: Blob = file;
    const fileName = file.name.toLowerCase();

    if (fileName.endsWith('.heic') || file.type.includes('heic')) {
      try {
        const conversionResult = await heic2any({
          blob: file,
          toType: 'image/jpeg',
          quality: 0.9,
        });
        processBlob = Array.isArray(conversionResult) ? conversionResult[0] : conversionResult;
      } catch (e) {
        console.warn('HEIC conversion warning, falling back to original blob', e);
      }
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target?.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(processBlob);
    });
  };

  const handlePhotoUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsConvertingIndex(index);

    try {
      const base64 = await convertFileIfNeeded(file);
      if (!base64) {
        setIsConvertingIndex(null);
        return;
      }

      const updated = [...photos];
      updated[index] = { ...updated[index], src: base64 };
      setPhotos(updated);
      setHasCustomPhotos(true);
      setIsConvertingIndex(null);
      setUploadSuccessIndex(index);
      setTimeout(() => setUploadSuccessIndex(null), 3000);

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
    } catch (err) {
      console.error('Error processing photo:', err);
      setIsConvertingIndex(null);
    }
  };

  // Upload all 3 photos at once directly from device
  const handleBatchUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsBatchUploading(true);

    try {
      const updated = [...photos];
      const count = Math.min(files.length, 3);

      for (let i = 0; i < count; i++) {
        const base64 = await convertFileIfNeeded(files[i]);
        if (base64) {
          updated[i] = { ...updated[i], src: base64 };
        }
      }

      setPhotos(updated);
      setHasCustomPhotos(true);
      setIsBatchUploading(false);

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
    } catch (err) {
      console.error('Batch upload error:', err);
      setIsBatchUploading(false);
    }
  };

  const handleResetPhotos = () => {
    setPhotos(DEFAULT_PHOTOS);
    setHasCustomPhotos(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <section id="memories" className="py-16 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>Cherished Gallery</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#831843] mb-4">
            Three little memories... 📸
          </h2>
          <p className="text-sm sm:text-base text-pink-900/70 font-normal mb-5">
            Moments captured, cherished, and kept close to heart forever.
          </p>

          {/* Connected Folder Info & Batch Upload Bar */}
          <div className="flex flex-col items-center gap-3">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-white/95 border border-pink-200/90 text-pink-900 text-xs sm:text-sm font-medium shadow-md shadow-pink-500/5">
              <FolderHeart className="w-4 h-4 text-emerald-600" />
              <span>
                Connected Folder: <code className="bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded font-mono font-bold">public/photos/</code>
              </span>
              <button
                onClick={() => setShowFolderInfo(!showFolderInfo)}
                className="text-pink-500 hover:text-pink-700 transition-colors p-1"
                aria-label="Folder info"
              >
                <Info className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Batch Upload 3 Photos Button */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <label
                htmlFor="batch-upload-photos"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-pink-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                {isBatchUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Adding 3 Photos...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 text-white" />
                    <span>Upload All 3 Photos at Once 📸</span>
                  </>
                )}
              </label>
              <input
                id="batch-upload-photos"
                type="file"
                multiple
                accept="image/*,.heic,.HEIC"
                className="hidden"
                onChange={handleBatchUpload}
              />

              {hasCustomPhotos && (
                <button
                  onClick={handleResetPhotos}
                  className="inline-flex items-center gap-1.5 text-xs text-pink-500 hover:text-pink-700 underline cursor-pointer px-2 py-1"
                >
                  <RefreshCw className="w-3 h-3" /> Reload from public/photos/
                </button>
              )}
            </div>

            {/* Helper Dropdown Popup */}
            {showFolderInfo && (
              <div className="p-4 rounded-2xl bg-white/95 border border-pink-200 text-left text-xs text-pink-900 shadow-xl max-w-md animate-fadeIn mt-2">
                <p className="font-bold text-emerald-800 mb-1 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  હા, બરાબર આ જ ફોલ્ડરમાં ફોટા મુકાશે:
                </p>
                <p className="mb-2 leading-relaxed">
                  તમે ફાઇલ સિસ્ટમમાં <code className="bg-pink-100 px-1 py-0.5 rounded font-mono font-bold">public/photos/</code> ફોલ્ડરમાં આ ૩ ફાઈલો રિપ્લેસ/ચેન્જ કરશો એટલે આપોઆપ વેબસાઇટ પર લાઈવ થઈ જશે:
                </p>
                <ul className="list-disc list-inside space-y-1 font-mono text-[11px] text-pink-700">
                  <li><code>public/photos/sadaf-1.jpg</code> (ગોલ્ડન સાડી વાળો ફોટો)</li>
                  <li><code>public/photos/sadaf-2.jpg</code> (હૂડી અને પહાડો વાળો ફોટો)</li>
                  <li><code>public/photos/sadaf-3.jpg</code> (કાફે અને ફ્લાવર વાળો ફોટો)</li>
                </ul>
                <p className="mt-2 text-[11px] text-pink-600">
                  આ ઉપરાંત તમે ઉપર આપેલા <b>&ldquo;Upload All 3 Photos at Once 📸&rdquo;</b> બટનથી પણ તમારા મોબાઈલમાંથી સીધા ૩ ફોટા સિલેક્ટ કરી શકો છો!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Gallery Showcase with 3 Unique Reveal Styles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-stretch">
          {/* PHOTO 1: POLAROID STYLE (Golden Saree) */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-sm bg-white p-4 sm:p-5 pb-6 rounded-2xl shadow-xl shadow-pink-500/10 border border-pink-100 transform -rotate-1 hover:rotate-0 transition-transform duration-300 relative group flex flex-col justify-between">
              <div>
                {/* Tape Accent */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-pink-100/80 backdrop-blur-xs rounded-sm border border-pink-200/50 shadow-xs rotate-1" />

                {/* Photo Viewport */}
                <div
                  onClick={() => setSelectedPhoto(photos[0])}
                  className="relative aspect-[4/5] w-full rounded-lg overflow-hidden bg-pink-50 cursor-pointer"
                >
                  <img
                    src={photos[0].src}
                    alt={photos[0].alt}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const cur = e.currentTarget.src;
                      if (cur.endsWith('.jpg')) {
                        e.currentTarget.src = '/photos/sadaf-1.png';
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-pink-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <div className="p-2 rounded-full bg-white/30 backdrop-blur-md">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Polaroid Handwritten Caption */}
                <div className="pt-4 text-center">
                  <h3 className="font-handwriting text-3xl text-[#831843] font-bold">
                    {photos[0].caption}
                  </h3>
                  <p className="text-xs text-pink-900/60 mt-1 font-sans">
                    {photos[0].subcaption}
                  </p>
                </div>
              </div>

              {/* Upload Action Button */}
              <div className="mt-5 flex justify-center">
                <label
                  htmlFor="upload-photo-0"
                  className="px-5 py-2.5 rounded-full bg-pink-100 hover:bg-pink-200 text-[#831843] font-bold text-xs cursor-pointer inline-flex items-center gap-1.5 shadow-sm hover:scale-105 active:scale-95 transition-all"
                >
                  {isConvertingIndex === 0 ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-pink-600" />
                      <span>Loading...</span>
                    </>
                  ) : uploadSuccessIndex === 0 ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Photo 1 Added! ✓</span>
                    </>
                  ) : (
                    <>
                      <Camera className="w-3.5 h-3.5 text-pink-600" />
                      <span>Upload Photo 1 (Saree) 📸</span>
                    </>
                  )}
                </label>
                <input
                  id="upload-photo-0"
                  type="file"
                  accept="image/*,.heic,.HEIC"
                  className="hidden"
                  onChange={(e) => handlePhotoUpload(0, e)}
                />
              </div>
            </div>
          </div>

          {/* PHOTO 2: SCRAPBOOK / CARD STYLE (Misty Mountains) */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-sm bg-gradient-to-b from-[#FFFDF9] to-[#FFF0F4] p-5 pb-6 rounded-3xl shadow-xl shadow-pink-500/10 border-2 border-rose-200/80 transform hover:scale-[1.02] transition-all duration-300 relative group flex flex-col justify-between">
              <div>
                {/* Photo Corner Mounts */}
                <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-rose-400 pointer-events-none" />
                <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-rose-400 pointer-events-none" />

                {/* Photo Viewport */}
                <div
                  onClick={() => setSelectedPhoto(photos[1])}
                  className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-rose-50 cursor-pointer shadow-inner"
                >
                  <img
                    src={photos[1].src}
                    alt={photos[1].alt}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const cur = e.currentTarget.src;
                      if (cur.endsWith('.jpg')) {
                        e.currentTarget.src = '/photos/sadaf-2.png';
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-rose-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <div className="p-2 rounded-full bg-white/30 backdrop-blur-md">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Scrapbook Caption */}
                <div className="pt-4 text-center">
                  <h3 className="font-handwriting text-3xl text-rose-800 font-bold">
                    {photos[1].caption}
                  </h3>
                  <p className="text-xs text-pink-900/60 mt-1 font-sans">
                    {photos[1].subcaption}
                  </p>
                </div>
              </div>

              {/* Upload Action Button */}
              <div className="mt-5 flex justify-center">
                <label
                  htmlFor="upload-photo-1"
                  className="px-5 py-2.5 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-900 font-bold text-xs cursor-pointer inline-flex items-center gap-1.5 shadow-sm hover:scale-105 active:scale-95 transition-all"
                >
                  {isConvertingIndex === 1 ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-rose-600" />
                      <span>Loading...</span>
                    </>
                  ) : uploadSuccessIndex === 1 ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Photo 2 Added! ✓</span>
                    </>
                  ) : (
                    <>
                      <Camera className="w-3.5 h-3.5 text-rose-600" />
                      <span>Upload Photo 2 (Hoodie) 📸</span>
                    </>
                  )}
                </label>
                <input
                  id="upload-photo-1"
                  type="file"
                  accept="image/*,.heic,.HEIC"
                  className="hidden"
                  onChange={(e) => handlePhotoUpload(1, e)}
                />
              </div>
            </div>
          </div>

          {/* PHOTO 3: CINEMATIC SHOWCASE STYLE (Cafe & Flower) */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-sm glass-panel p-4 sm:p-5 pb-6 rounded-3xl shadow-xl shadow-pink-500/10 border border-pink-300/60 transform rotate-1 hover:rotate-0 transition-transform duration-300 relative group flex flex-col justify-between">
              <div>
                {/* Photo Viewport */}
                <div
                  onClick={() => setSelectedPhoto(photos[2])}
                  className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-pink-50 cursor-pointer shadow-md"
                >
                  <img
                    src={photos[2].src}
                    alt={photos[2].alt}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const cur = e.currentTarget.src;
                      if (cur.endsWith('.jpg')) {
                        e.currentTarget.src = '/photos/sadaf-3.png';
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-pink-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <div className="p-2 rounded-full bg-white/30 backdrop-blur-md">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Showcase Caption */}
                <div className="pt-4 text-center">
                  <h3 className="font-handwriting text-3xl text-[#831843] font-bold">
                    {photos[2].caption}
                  </h3>
                  <p className="text-xs text-pink-900/60 mt-1 font-sans">
                    {photos[2].subcaption}
                  </p>
                </div>
              </div>

              {/* Upload Action Button */}
              <div className="mt-5 flex justify-center">
                <label
                  htmlFor="upload-photo-2"
                  className="px-5 py-2.5 rounded-full bg-pink-100 hover:bg-pink-200 text-[#831843] font-bold text-xs cursor-pointer inline-flex items-center gap-1.5 shadow-sm hover:scale-105 active:scale-95 transition-all"
                >
                  {isConvertingIndex === 2 ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-pink-600" />
                      <span>Loading...</span>
                    </>
                  ) : uploadSuccessIndex === 2 ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Photo 3 Added! ✓</span>
                    </>
                  ) : (
                    <>
                      <Camera className="w-3.5 h-3.5 text-pink-600" />
                      <span>Upload Photo 3 (Cafe) 📸</span>
                    </>
                  )}
                </label>
                <input
                  id="upload-photo-2"
                  type="file"
                  accept="image/*,.heic,.HEIC"
                  className="hidden"
                  onChange={(e) => handlePhotoUpload(2, e)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <LightboxModal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
    </section>
  );
};
