# Blog System Troubleshooting Guide

## Common Issues and Solutions

### ❌ Back Button 404 Error

**Problem**: Clicking "Back to Blog" shows `404 (Not Found)` error

**Cause**: Multiple Next.js processes running on different ports

**Solution**:
```bash
# 1. Kill all Next.js processes
pkill -f "next"

# 2. Start the development server
cd frontend
npm run dev

# 3. Always use the port shown in terminal (usually 3001)
```

**Prevention**: The development server is now configured to always use port 3001 via:
- `package.json`: `"dev": "next dev -p 3001"`
- `.env.local`: `PORT=3001`

### ❌ Hydration Errors

**Problem**: Console shows hydration mismatch errors

**Cause**: Server-side and client-side rendering differences

**Solution**: 
- ✅ **Already Fixed**: File system operations moved to server-only utilities
- Blog system now properly separates server and client code

### ❌ Blog Posts Not Showing

**Problem**: Blog page is empty or shows no posts

**Solutions**:
1. **Check file location**: Posts must be in `frontend/content/blog/`
2. **Check frontmatter**: Must include required fields:
   ```markdown
   ---
   title: "Your Title"
   excerpt: "Description"
   date: "2024-07-28"
   category: "healthcare"
   published: true
   ---
   ```
3. **Check file extension**: Use `.md` or `.mdx`
4. **Restart dev server**: `npm run dev`

### ❌ Images Not Loading

**Problem**: Blog post images show broken links

**Solutions**:
1. **Correct path**: Images go in `frontend/public/images/blog/`
2. **Correct reference**: Use `/images/blog/filename.jpg` (starts with `/`)
3. **File permissions**: Ensure files are readable

### ❌ Create Post Script Errors

**Problem**: `npm run create-post` fails

**Solutions**:
1. **Check script permissions**: 
   ```bash
   chmod +x scripts/create-post.js
   ```
2. **Run from correct directory**: Must be in `frontend/` folder
3. **Check dependencies**: Ensure all npm packages installed

### ❌ TypeScript Errors

**Problem**: Type errors in blog components

**Solutions**:
1. **Run type check**: `npm run type-check`
2. **Check imports**: Ensure correct import paths
3. **Restart TypeScript**: In VS Code: Cmd+Shift+P → "TypeScript: Restart TS Server"

### ❌ Styling Issues

**Problem**: Blog content not styled correctly

**Solutions**:
1. **Check CSS classes**: Blog content uses `.blog-content` class
2. **Tailwind build**: Ensure Tailwind is processing correctly
3. **Clear cache**: 
   ```bash
   rm -rf .next
   npm run dev
   ```

## Development Workflow

### Starting Development
```bash
cd frontend
npm run dev
# Server starts on http://localhost:3001
```

### Creating New Posts
```bash
cd frontend
npm run create-post
# Follow interactive prompts
```

### Adding Images
```bash
# 1. Add image to public directory
cp your-image.jpg frontend/public/images/blog/

# 2. Reference in post
![Alt text](/images/blog/your-image.jpg)
```

### Checking for Errors
```bash
cd frontend
npm run type-check  # TypeScript errors
npm run lint        # Code style issues
npm run build       # Production build test
```

## Port Configuration

**Default Port**: 3001 (configured in package.json and .env.local)

**If port conflicts occur**:
1. Kill existing processes: `pkill -f "next"`
2. Change port in `package.json`: `"dev": "next dev -p 3002"`
3. Update `.env.local`: `PORT=3002`

## File Structure Quick Reference

```
frontend/
├── content/blog/           # Blog post files (.md/.mdx)
├── public/images/blog/     # Blog images
├── public/videos/          # Blog videos
├── src/
│   ├── app/blog/          # Blog pages
│   └── lib/
│       ├── blog.ts        # Client-safe utilities
│       └── blog-server.ts # Server-only file operations
└── scripts/
    └── create-post.js     # Post creation script
```

## Getting Help

1. **Check console**: Browser dev tools for client errors
2. **Check terminal**: Server terminal for build errors
3. **Clear cache**: `rm -rf .next && npm run dev`
4. **Restart everything**: Kill processes and restart dev server

## Current Status

✅ **Blog system fully operational**  
✅ **Development server on port 3001**  
✅ **File-driven content management**  
✅ **No hydration errors**  
✅ **All navigation working correctly**

Your blog is ready for content creation! 🚀