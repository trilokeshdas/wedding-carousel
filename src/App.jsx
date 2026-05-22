import React, { useEffect, useRef, useState } from 'react';

const rawGalleryPhotos = [
  { image: '/photos/engagement-optimized/AYS04955.Edit.jpg' },
  { image: '/photos/engagement-optimized/AYS04964.Edit.jpg' },
  { image: '/photos/engagement-optimized/AYS04972.Edit.jpg' },
  { image: '/photos/engagement-optimized/AYS04994.Edit.jpg' },
  { image: '/photos/engagement-optimized/AYS04996.Edit.jpg' },
  { image: '/photos/engagement-optimized/AYS05000.Edit.jpg' },
  { image: '/photos/engagement-optimized/AYS05004.Edit.jpg' },
  { image: '/photos/engagement-optimized/AYS05042.Edit.jpg' },
  { image: '/photos/engagement-optimized/AYS05049.Edit.jpg' },
  { image: '/photos/engagement-optimized/AYS05053.Edit.jpg' },
  { image: '/photos/engagement-optimized/AYS05056.Edit.jpg' },
  { image: '/photos/engagement-optimized/AYS05068.Edit.jpg' },
  { image: '/photos/engagement-optimized/AYS05102.Edit.jpg' },
  { image: '/photos/engagement-optimized/AYS05113.Edit.jpg' },
  { image: '/photos/engagement-optimized/AYS05190.Edit.jpg' },
  { image: '/photos/engagement-optimized/AYS05254.Edit.jpg' },
  { image: '/photos/engagement-optimized/AYS05349.Edit.jpg' },
  { image: '/photos/engagement-optimized/AYS05357.Edit.jpg' },
  { image: '/photos/engagement-optimized/AYS05362.Edit.jpg' },
  { image: '/photos/engagement-optimized/AYS05366.Edit.jpg' },
  { image: '/photos/engagement-optimized/AYS05381.Edit.jpg' },
  { image: '/photos/engagement-optimized/AYS05382.Edit.jpg' },
  { image: '/photos/engagement-optimized/AYS05392.Edit.jpg' },
  { image: '/photos/engagement-optimized/AYS05396.Edit.jpg' },
  { image: '/photos/engagement-optimized/AYS05402.Edit.jpg' },
  { image: '/photos/engagement-optimized/AYS05420.Edit.jpg' },
  { image: '/photos/engagement-optimized/AYS05426.Edit.jpg' },
  { image: '/photos/engagement-optimized/AYS05430.Edit.jpg' },
  { image: '/photos/engagement-optimized/AYS05444.Edit.jpg' },
  { image: '/photos/engagement-optimized/DSC_1716.Edit.jpg' },
  { image: '/photos/engagement-optimized/DSC_1725.Edit.jpg' },
  { image: '/photos/engagement-optimized/DSC_1739.Edit.jpg' },
  { image: '/photos/engagement-optimized/DSC_1773.Edit.jpg' },
  { image: '/photos/engagement-optimized/DSC_1781.Edit.jpg' },
  { image: '/photos/engagement-optimized/DSC_1789.Edit.jpg' },
  { image: '/photos/engagement-optimized/DSC_1799.Edit.jpg' },
  { image: '/photos/engagement-optimized/DSC_1805.Edit.jpg' },
];

const rawFeaturedPortraits = [
  { image: '/photos/featured-optimized/collage-1.jpg' },
  { image: '/photos/featured-optimized/collage-2.jpg' },
  { image: '/photos/featured-optimized/collage-3.jpg' },
  { image: '/photos/featured-optimized/collage-4.jpg' },
  { image: '/photos/featured-optimized/collage-5.jpg' },
  { image: '/photos/featured-optimized/collage-6.jpg' },
  { image: '/photos/featured-optimized/collage-7.jpg' },
  { image: '/photos/featured-optimized/collage-8.jpg' },
  { image: '/photos/featured-optimized/collage-9.jpg' },
];

const publicBase = import.meta.env.BASE_URL;
const galleryPhotos = rawGalleryPhotos.map((photo) => ({
  ...photo,
  image: `${publicBase}${photo.image.startsWith('/') ? photo.image.slice(1) : photo.image}`,
}));
const featuredPortraits = rawFeaturedPortraits.map((photo) => ({
  ...photo,
  image: `${publicBase}${photo.image.startsWith('/') ? photo.image.slice(1) : photo.image}`,
}));

const futureEvents = [
  { id: 'pre-wedding', label: 'Pre Wedding', date: 'Coming soon', note: 'A dreamy outdoor album space for the couple portraits.' },
  { id: 'haldi', label: 'Haldi', date: '3 July 2026', note: 'A warm yellow celebration gallery for the joyful rituals.' },
  { id: 'sangeet', label: 'Sangeet', date: '2 July 2026', note: 'A lively night gallery for dance, music, and family moments.' },
  { id: 'wedding', label: 'Wedding', date: '3 July 2026', note: 'The main ceremony album for sacred rituals and portraits.' },
  { id: 'reception', label: 'Reception', date: '5 July 2026', note: 'An elegant evening album for stage, guests, and celebrations.' },
];

const navLinks = [
  { href: '#portraits', label: 'Portraits' },
  { href: '#gallery', label: 'Engagement' },
  ...futureEvents.map((event) => ({ href: `#${event.id}`, label: event.label })),
  { href: '#footer', label: 'Forever' },
];

export default function WeddingCarouselWebsite() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPortrait, setCurrentPortrait] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [showAllEngagement, setShowAllEngagement] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const audioRef = useRef(null);
  const lightboxPhotos = selectedImage?.collection === 'featured' ? featuredPortraits : galleryPhotos;
  const visibleGalleryPhotos = showAllEngagement ? galleryPhotos : galleryPhotos.slice(0, 9);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
        setMobileMenuOpen(false);
        return;
      }

      if (selectedImage === null) return;

      if (e.key === 'ArrowRight') {
        showNextImage();
      } else if (e.key === 'ArrowLeft') {
        showPreviousImage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, lightboxPhotos.length]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.45;
      audioRef.current
        .play()
        .then(() => setMusicPlaying(true))
        .catch(() => setMusicPlaying(false));
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (musicPlaying) {
      audioRef.current.pause();
      setMusicPlaying(false);
    } else {
      audioRef.current.volume = 0.45;
      audioRef.current
        .play()
        .then(() => setMusicPlaying(true))
        .catch(() => setMusicPlaying(false));
    }
  };

  const showNextImage = () => {
    setSelectedImage((current) => ({
      ...current,
      index: (current.index + 1) % lightboxPhotos.length,
    }));
  };

  const showPreviousImage = () => {
    setSelectedImage((current) => ({
      ...current,
      index: (current.index - 1 + lightboxPhotos.length) % lightboxPhotos.length,
    }));
  };

  const showNextPortrait = () => {
    setCurrentPortrait((current) => (current + 1) % featuredPortraits.length);
  };

  const showPreviousPortrait = () => {
    setCurrentPortrait((current) => (current - 1 + featuredPortraits.length) % featuredPortraits.length);
  };

  return (
    <div className="min-h-screen bg-[#fbf8f4] text-gray-900 overflow-x-hidden">
      <audio ref={audioRef} src={`${publicBase}music/song.mp3`} loop preload="auto" autoPlay />

      <header className="fixed inset-x-0 top-0 z-40 px-3 py-3 sm:px-8 sm:py-4">
        <div className="mx-auto max-w-7xl rounded-3xl border border-white/20 bg-black/25 px-4 py-3 text-white/80 shadow-2xl backdrop-blur-md sm:rounded-full sm:px-5">
          <div className="flex items-center justify-between gap-3">
          <a href="#" className="shrink-0 font-wedding text-3xl leading-none text-white/85">
            S & R
          </a>
          <nav className="nav-scroll hidden items-center gap-5 overflow-x-auto whitespace-nowrap px-6 py-1 text-[10px] font-light uppercase tracking-[0.22em] md:flex md:max-w-[62vw] lg:max-w-[68vw]">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="transition hover:text-white">
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={toggleMusic}
              className="rounded-full border border-white/35 px-4 py-2 text-[10px] font-light uppercase tracking-[0.2em] transition hover:bg-white/15"
            >
              {musicPlaying ? 'Pause' : 'Music'}
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="rounded-full border border-white/35 px-4 py-2 text-[10px] font-light uppercase tracking-[0.2em] transition hover:bg-white/15 md:hidden"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
          </div>

        </div>
      </header>

      <div
        className={`fixed inset-0 z-50 bg-black/55 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <aside
          id="mobile-navigation"
          className={`absolute right-0 top-0 flex h-full w-[82vw] max-w-sm flex-col bg-[#120d0f] px-6 py-6 text-white shadow-2xl transition-transform duration-300 ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-10 flex items-center justify-between">
            <p className="font-wedding text-4xl leading-none text-white/90">S & R</p>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-full border border-white/20 px-4 py-2 text-[10px] font-light uppercase tracking-[0.2em] text-white/70"
            >
              Close
            </button>
          </div>

          <nav className="flex flex-col gap-3 text-sm font-light uppercase tracking-[0.22em]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="border-b border-white/10 py-4 text-white/75 transition hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-auto border-t border-white/10 pt-6 text-xs font-light leading-6 text-white/45">
            <p>Marriage - 3 July 2026</p>
            <p>Reception - 5 July 2026</p>
          </div>
        </aside>
      </div>

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
        <img
          src={`${publicBase}photos/swapnil-ritisnigdha-optimized.jpg`}
          alt="Swapnil and Ritisnigdha engagement portrait"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-80"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.18),rgba(0,0,0,0.52))]"></div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent"></div>

        <div className="absolute inset-x-6 bottom-8 z-10 hidden justify-between text-[11px] uppercase tracking-[0.3em] text-white/45 md:flex">
          <span>Engagement</span>
          <span>Memories in Motion</span>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 pt-24 text-center animate-heroReveal">
          <p className="mb-6 text-[11px] font-light uppercase tracking-[0.48em] text-white/70 sm:text-xs">
            Engagement Ceremony
          </p>
          <h1 className="font-wedding text-[3.4rem] font-thin leading-[0.95] text-white/70 sm:text-[5.6rem] md:text-[8rem] lg:text-[9.5rem]">
            Swapnil & Ritisnigdha
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-sm font-light uppercase tracking-[0.35em] text-white/65 sm:text-base">
            8 May 2026 - A story begins
          </p>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 lg:px-24 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="mb-5 text-xs font-light uppercase tracking-[0.4em] text-rose-400">
              Save the Date
            </p>
            <h2 className="max-w-4xl text-4xl font-light leading-tight text-gray-950 sm:text-6xl">
              A quiet promise, a beautiful beginning, and the moments we will keep forever.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-3 text-center sm:grid-cols-3">
            {['Swapnil', '&', 'Ritisnigdha'].map((item) => (
              <div key={item} className="border border-rose-100 bg-white/70 px-4 py-7 shadow-sm">
                <p className="font-wedding text-4xl text-rose-400">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="portraits" className="bg-[#111111] px-4 py-16 text-white sm:px-8 lg:px-20 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="mb-4 text-xs font-light uppercase tracking-[0.35em] text-white/45">
              Portrait Carousel
            </p>
            <h2 className="text-4xl font-light sm:text-6xl">
              Featured Portraits
            </h2>
          </div>

          <div className="relative mx-auto flex min-h-[78vh] max-w-5xl items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-[#080808] shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
            {featuredPortraits.map((photo, index) => (
              <button
                key={photo.image}
                type="button"
                className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
                  currentPortrait === index
                    ? 'z-10 opacity-100 scale-100'
                    : 'z-0 opacity-0 scale-95'
                }`}
                onClick={() => setSelectedImage({ collection: 'featured', index })}
              >
                <img
                  src={photo.image}
                  alt="Portrait from the album"
                  className="max-h-full max-w-full object-contain"
                  loading={currentPortrait === index ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </button>
            ))}

            <button
              type="button"
              onClick={showPreviousPortrait}
              className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-3xl text-white/85 backdrop-blur transition hover:border-rose-300/60 hover:text-rose-200"
              aria-label="Previous portrait"
            >
              {'<'}
            </button>

            <button
              type="button"
              onClick={showNextPortrait}
              className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-3xl text-white/85 backdrop-blur transition hover:border-rose-300/60 hover:text-rose-200"
              aria-label="Next portrait"
            >
              {'>'}
            </button>

            <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
              {featuredPortraits.map((photo, index) => (
                <button
                  key={photo.image}
                  type="button"
                  onClick={() => setCurrentPortrait(index)}
                  className={`rounded-full transition ${
                    currentPortrait === index
                      ? 'h-2 w-8 bg-white'
                      : 'h-2 w-2 bg-white/35 hover:bg-white/60'
                  }`}
                  aria-label={`Go to portrait ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="bg-white px-6 py-20 md:px-16 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <p className="mb-6 text-xs font-light uppercase tracking-[0.3em] text-gray-400">
              Gallery
            </p>
            <h2 className="mb-6 text-5xl font-light text-gray-950 md:text-7xl">
              All Moments
            </h2>
            <div className="mx-auto h-1 w-12 rounded-full bg-gradient-to-r from-rose-400 to-pink-400"></div>
          </div>

          <div className="mb-10">
            <div>
              <p className="mb-3 text-xs font-light uppercase tracking-[0.35em] text-gray-400">
                Full Set
              </p>
              <h3 className="text-4xl font-light text-gray-950 sm:text-5xl">
                Engagement Gallery
              </h3>
            </div>
          </div>

          <div className="columns-1 gap-6 md:columns-2 lg:columns-3">
            {visibleGalleryPhotos.map((photo, index) => (
              <button
                key={photo.image}
                type="button"
                className="group mb-6 block w-full break-inside-avoid overflow-hidden rounded-[1.5rem] bg-[#f0e7df] shadow-lg transition duration-500 hover:-translate-y-2 hover:shadow-2xl"
                onClick={() => setSelectedImage({ collection: 'gallery', index })}
              >
                <img
                  src={photo.image}
                  alt="Engagement gallery photograph"
                  className={`w-full object-contain transition duration-700 group-hover:scale-[1.03] ${
                    index % 5 === 0
                      ? 'h-[520px] sm:h-[620px] md:h-[680px]'
                      : index % 3 === 0
                      ? 'h-[460px] sm:h-[560px] md:h-[600px]'
                      : 'h-[420px] sm:h-[500px] md:h-[500px]'
                  }`}
                  loading="lazy"
                  decoding="async"
                />
              </button>
            ))}
          </div>

          <div className="mt-14 text-center">
            <button
              type="button"
              onClick={() => setShowAllEngagement((current) => !current)}
              className="border border-gray-950 px-10 py-4 text-xs font-light uppercase tracking-[0.3em] text-gray-950 transition hover:bg-gray-950 hover:text-white"
            >
              {showAllEngagement ? 'Show less' : `Show more (${galleryPhotos.length - visibleGalleryPhotos.length})`}
            </button>
          </div>
        </div>
      </section>

      <section className="bg-[#fbf8f4] px-6 py-20 sm:px-10 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="mb-5 text-xs font-light uppercase tracking-[0.4em] text-rose-400">
              Coming Albums
            </p>
            <h2 className="text-4xl font-light text-gray-950 sm:text-6xl">
              More celebrations will bloom here
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {futureEvents.map((event, index) => (
              <section
                id={event.id}
                key={event.id}
                className="group scroll-mt-28 border border-rose-100 bg-white/80 p-6 shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-xl"
              >
                <p className="mb-8 text-xs font-light uppercase tracking-[0.35em] text-gray-400">
                  0{index + 1}
                </p>
                <h3 className="mb-5 text-3xl font-light text-gray-950">
                  {event.label}
                </h3>
                <p className="mb-5 text-sm font-light uppercase tracking-[0.24em] text-rose-400">
                  {event.date}
                </p>
                <div className="mb-6 h-px w-12 bg-rose-300 transition group-hover:w-20"></div>
                <p className="text-sm font-light leading-6 text-gray-500">
                  {event.note}
                </p>
                <p className="mt-8 text-[11px] font-light uppercase tracking-[0.28em] text-rose-300">
                  Photos coming soon
                </p>
              </section>
            ))}
          </div>
        </div>
      </section>

      <footer id="footer" className="relative overflow-hidden bg-[#120d0f] px-6 py-20 text-white sm:px-10 lg:px-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,114,182,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.12),transparent_30%)]"></div>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-200/40 to-transparent"></div>

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-12 border-y border-white/10 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="mb-5 text-xs font-light uppercase tracking-[0.42em] text-rose-200/70">
                Forever begins here
              </p>
              <h2 className="font-wedding text-7xl leading-none text-white/85 sm:text-8xl lg:text-9xl">
                Swapnil & Ritisnigdha
              </h2>
              <p className="mt-7 max-w-2xl text-lg font-light leading-8 text-white/58">
                A chapter of laughter, rituals, quiet glances, and the kind of memories that only grow warmer with time.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="border border-rose-200/25 bg-white/[0.06] p-6 text-center shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur">
                <p className="mb-4 text-[11px] uppercase tracking-[0.32em] text-rose-200/70">
                  Marriage
                </p>
                <div className="flex items-end justify-center gap-3">
                  <span className="font-wedding text-7xl leading-none text-white">3</span>
                  <div className="pb-3 text-left">
                    <p className="text-lg font-light uppercase tracking-[0.24em] text-white/85">July</p>
                    <p className="text-sm font-light tracking-[0.3em] text-white/45">2026</p>
                  </div>
                </div>
              </div>

              <div className="border border-rose-200/25 bg-white/[0.06] p-6 text-center shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur">
                <p className="mb-4 text-[11px] uppercase tracking-[0.32em] text-rose-200/70">
                  Reception
                </p>
                <div className="flex items-end justify-center gap-3">
                  <span className="font-wedding text-7xl leading-none text-white">5</span>
                  <div className="pb-3 text-left">
                    <p className="text-lg font-light uppercase tracking-[0.24em] text-white/85">July</p>
                    <p className="text-sm font-light tracking-[0.3em] text-white/45">2026</p>
                  </div>
                </div>
              </div>
              <a
                href="#"
                className="inline-flex items-center justify-center border border-white/25 px-6 py-3 text-xs uppercase tracking-[0.28em] text-white/70 transition hover:bg-white hover:text-[#120d0f] sm:col-span-2"
              >
                Back to top
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-6 py-8 text-sm font-light text-white/38 sm:flex-row sm:items-center sm:justify-between">
            <p>Captured moments, endless memories - {new Date().getFullYear()}</p>
            <div className="flex gap-5">
              <a href="#portraits" className="transition hover:text-white/80">Portraits</a>
              <a href="#gallery" className="transition hover:text-white/80">Gallery</a>
              <button type="button" onClick={toggleMusic} className="transition hover:text-white/80">
                {musicPlaying ? 'Pause Music' : 'Play Music'}
              </button>
            </div>
          </div>
        </div>
      </footer>

      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute right-6 top-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 text-3xl leading-none text-white transition-colors duration-300 hover:border-rose-400/50 hover:bg-black/70 hover:text-rose-400"
            aria-label="Close"
            type="button"
          >
            x
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              showPreviousImage();
            }}
            className="absolute left-4 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-3xl text-white transition hover:border-rose-400/50 hover:bg-black/70 hover:text-rose-400"
            aria-label="Previous image"
            type="button"
          >
            {'<'}
          </button>

          <div
            className="relative flex h-full w-full items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxPhotos[selectedImage.index].image}
              alt="Full view"
              className="max-h-[90vh] max-w-full rounded-lg object-contain"
            />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              showNextImage();
            }}
            className="absolute right-4 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-3xl text-white transition hover:border-rose-400/50 hover:bg-black/70 hover:text-rose-400"
            aria-label="Next image"
            type="button"
          >
            {'>'}
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm font-light text-white/70">
            {selectedImage.index + 1} / {lightboxPhotos.length}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes heroReveal {
          from {
            opacity: 0;
            transform: translateY(22px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-heroReveal {
          animation: heroReveal 1.4s ease-out both;
        }
      `}</style>
    </div>
  );
}
