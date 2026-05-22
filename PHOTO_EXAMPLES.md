# Example Photo Configuration

This shows exactly how to format your photos in `src/App.jsx`

## Current Format (Using Local Files)

```javascript
const photos = [
  {
    image: '/photos/wedding-1.jpg',
    title: 'Forever Begins Here',
    subtitle: 'A celebration of love, laughter & memories',
  },
  {
    image: '/photos/wedding-2.jpg',
    title: 'Two Souls, One Story',
    subtitle: 'Captured moments that last a lifetime',
  },
  {
    image: '/photos/wedding-3.jpg',
    title: 'Elegance In Every Frame',
    subtitle: 'A dreamy wedding gallery experience',
  },
  {
    image: '/photos/wedding-4.jpg',
    title: 'Made With Love',
    subtitle: 'Cherishing every magical second together',
  },
];
```

## How to Customize

### Change Titles & Subtitles
```javascript
{
  image: '/photos/wedding-1.jpg',
  title: 'Getting Ready',           // ← Your title
  subtitle: 'The morning of our big day',  // ← Your description
}
```

### Add More Photos
Just add another object to the array:
```javascript
{
  image: '/photos/wedding-5.jpg',
  title: 'The Reception',
  subtitle: 'Dancing the night away',
}
```

### Use Different File Names
If your files are named differently (e.g., `img_001.jpg`), update the paths:
```javascript
{
  image: '/photos/img_001.jpg',  // ← Match your actual filenames
  title: 'Custom Title',
  subtitle: 'Custom Description',
}
```

## File Naming Tips

✅ **Works:**
- `wedding-1.jpg`
- `img_001.png`
- `photo.webp`
- `ceremony.jpeg`

❌ **Won't work:**
- `wedding 1.jpg` (space in filename)
- `wedding 1 (1).jpg` (parentheses)
- `/photos/../image.jpg` (relative paths)

## Story Section Image

There's also a featured image in the "Our Story" section. Update it on line ~209:

```javascript
<img
  src="/photos/wedding-5.jpg"  // ← Change this path
  alt="Wedding"
  className="rounded-[2rem] shadow-2xl object-cover h-[600px] w-full"
/>
```

---

That's all you need to know! Happy customizing! 💕
