# 💍 Wedding Collage Carousel - Setup Guide

Your carousel is now optimized for **wedding collages** with built-in captions and text overlays!

## 📁 Where to Store Your Collages

Place all your wedding collage images here:
```
wedding-carousel/
  └── public/
       └── photos/
            ├── collage-1.jpg
            ├── collage-2.jpg
            ├── collage-3.jpg
            └── collage-4.jpg
```

## 📝 How to Name Your Collages

Name them simply:
- `collage-1.jpg`
- `collage-2.jpg`
- `collage-3.jpg`
- `collage-4.jpg`
- etc.

## ✏️ How to Update App.jsx

In `src/App.jsx`, update the collages array to match your filenames:

**Current setup (4 collages):**
```javascript
const collages = [
  { image: '/photos/collage-1.jpg' },
  { image: '/photos/collage-2.jpg' },
  { image: '/photos/collage-3.jpg' },
  { image: '/photos/collage-4.jpg' },
];
```

**If you have 5 collages:**
```javascript
const collages = [
  { image: '/photos/collage-1.jpg' },
  { image: '/photos/collage-2.jpg' },
  { image: '/photos/collage-3.jpg' },
  { image: '/photos/collage-4.jpg' },
  { image: '/photos/collage-5.jpg' },
];
```

## 🎨 Design Tips for Your Collages

Since your collages have built-in captions and details:
- **No overlay text** - The carousel displays your collage as-is, so all your design work is visible
- **Responsive display** - Your collage will resize perfectly on mobile & desktop
- **Keep text readable** - Make sure text in your collages is visible and clear
- **Consistent sizing** - Try to keep all collages similar dimensions for smooth transitions

## 🚀 How It Works

1. **Auto-rotating** - Collages change every 5 seconds
2. **Manual navigation** - Click the dots (•) at the bottom to jump to any collage
3. **Arrow buttons** - Use ❮ ❯ arrows on the sides to go previous/next
4. **Gallery section** - All collages displayed below in a 2-column grid

## 📦 File Formats

Supported image formats:
- `.jpg` / `.jpeg` ✅
- `.png` ✅
- `.webp` ✅
- `.gif` ✅

## ⚡ Quick Start

1. **Save your collages** → `public/photos/collage-1.jpg`, `collage-2.jpg`, etc.
2. **Update App.jsx** → Add matching filenames to the `collages` array
3. **Refresh browser** → http://localhost:5174 (or your port)
4. **Done!** Your carousel is live!

## 🎯 Example

If you have a collage like this:
```
Your-Wedding-Collage-1.jpg
```

1. **Rename it:** `collage-1.jpg`
2. **Save it:** `public/photos/collage-1.jpg`
3. **Add to App.jsx:**
   ```javascript
   { image: '/photos/collage-1.jpg' }
   ```
4. **That's it!** It will appear in your carousel.

---

**Your carousel is already running!** Just add your collages and refresh the browser. 💕
