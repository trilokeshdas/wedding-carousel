# 💍 Wedding Carousel Setup Guide

Your beautiful wedding carousel is ready! Follow these simple steps to add your own photos.

## 📸 Step 1: Add Your Wedding Photos

1. Open the `public/photos/` folder
2. Add your wedding photos there
3. Name them: `wedding-1.jpg`, `wedding-2.jpg`, `wedding-3.jpg`, `wedding-4.jpg`, `wedding-5.jpg`

**Recommended Photo Details:**
- Size: 1200+ pixels wide for best quality
- Format: JPG, PNG, or WebP
- Total: At least 4 photos (5 if you want a custom story image)

## ✏️ Step 2: Customize Captions (Optional)

Open `src/App.jsx` and update the titles and subtitles for each photo:

```javascript
const photos = [
  {
    image: '/photos/wedding-1.jpg',
    title: 'Getting Ready',        // ← Change this
    subtitle: 'The morning prep',  // ← And this
  },
  // ... more photos
];
```

## 🚀 Step 3: Run Your Carousel

1. Open terminal in the `wedding-carousel` folder
2. Run: `npm install` (only needed first time)
3. Run: `npm run dev`
4. Open: http://localhost:5173

That's it! Your carousel will auto-rotate every 4.5 seconds. 

## 💡 Features

✨ **Auto-rotating Carousel** - Photos change automatically  
🖱️ **Manual Navigation** - Click dots at the bottom to jump to any photo  
📱 **Responsive Design** - Looks great on mobile & desktop  
🎨 **Elegant Styling** - Professional wedding aesthetic  

## 🎯 Pro Tips

- The carousel zooms out slightly on non-active slides for a nice effect
- Hover over gallery images to see a zoom animation
- You can add more photos by adding more objects to the array and naming them accordingly
- Edit the story section subtitle on line 128 of App.jsx to tell your wedding story

## ❓ Troubleshooting

**Images not showing?**
- Make sure photo names match exactly (e.g., `wedding-1.jpg` not `wedding 1.jpg`)
- Check that photos are in the `public/photos/` folder
- Refresh the browser (Ctrl+Shift+R)

**Need more photos?**
- Just add more objects to the array with image paths
- The carousel will work with any number of photos

---

Enjoy your beautiful wedding carousel! 💕✨
