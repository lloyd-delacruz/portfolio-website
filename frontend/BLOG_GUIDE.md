# Blog Management Guide

## Overview

Your blog system has been redesigned to use **Markdown files** with **frontmatter metadata**, making it incredibly easy to add new posts without touching any code. The system supports:

✅ **Rich Markdown content** with syntax highlighting  
✅ **Images and videos** with automatic optimization  
✅ **Interactive code blocks** with multiple languages  
✅ **Categories and tags** for organization  
✅ **Search functionality** built-in  
✅ **Responsive design** that matches your portfolio  
✅ **SEO optimization** with metadata  

## Quick Start

### Creating a New Blog Post

**Option 1: Use the CLI tool (Recommended)**
```bash
cd frontend
npm run create-post
```

**Option 2: Manual creation**
1. Create a new `.md` file in `content/blog/`
2. Add frontmatter metadata (see template below)
3. Write your content in Markdown

### Post Template

```markdown
---
title: "Your Post Title"
excerpt: "A brief description that appears in previews"
date: "2025-01-28"
author: "Lloyd Dela Cruz"
category: "healthcare"  # healthcare, development, data-science, ai
tags: ["AI", "Healthcare", "Innovation"]
readTime: "8 min read"
featured: false  # Set to true for featured posts
image: "/images/blog/your-post-slug.jpg"
video: false    # Set to true if post contains video
interactive: true  # Set to true for interactive content
gradient: "from-blue-600 via-purple-600 to-indigo-800"
published: true  # Set to false to save as draft
---

# Your Post Title

Your content goes here using standard Markdown syntax...
```

## Directory Structure

```
frontend/
├── content/blog/           # All your blog posts (.md files)
├── public/images/blog/     # Blog post images
├── public/videos/          # Video files
├── scripts/create-post.js  # CLI tool for creating posts
└── src/lib/blog.ts        # Blog processing utilities
```

## Writing Content

### Basic Markdown

```markdown
# Main Heading
## Section Heading
### Subsection

**Bold text** and *italic text*

- Bullet points
- Another point

1. Numbered lists
2. Second item

[Link text](https://example.com)
```

### Code Blocks

````markdown
```javascript
function greetUser(name) {
  console.log(`Hello, ${name}!`);
}
```

```python
def analyze_data(dataset):
    return dataset.groupby('category').mean()
```

```bash
npm install
npm run dev
```
````

### Images

```markdown
![Alt text](/images/blog/my-image.jpg)

# Or with custom sizing
<img src="/images/blog/my-image.jpg" alt="Description" width="500" />
```

### Videos

```markdown
<video controls width="100%" style="border-radius: 8px;">
  <source src="/videos/my-video.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
```

### Tables

```markdown
| Feature | Supported | Notes |
|---------|-----------|--------|
| Markdown | ✅ | Full GFM support |
| Code highlighting | ✅ | 20+ languages |
| Images | ✅ | Auto-optimized |
| Videos | ✅ | MP4, WebM |
```

### Interactive Elements

You can embed interactive content:

```markdown
<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px; color: white; margin: 20px 0;">
  <h3>💡 Pro Tip</h3>
  <p>This is a custom styled callout box!</p>
</div>
```

## Managing Posts

### CLI Commands

```bash
# Create a new post interactively
npm run create-post

# List all posts  
npm run list-posts

# Preview post frontmatter
npm run preview-posts
```

### Post Categories

Use these standard categories:
- `healthcare` - Healthcare technology, medical AI, EHR systems
- `development` - Programming, frameworks, tools
- `data-science` - Analytics, visualization, ML
- `ai` - Artificial intelligence, machine learning

### Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | ✅ | Post title (used in SEO) |
| `excerpt` | ✅ | Brief description for previews |
| `date` | ✅ | Publication date (YYYY-MM-DD) |
| `category` | ✅ | One of the standard categories |
| `tags` | ✅ | Array of tags for searchability |
| `author` | ❌ | Defaults to "Lloyd Dela Cruz" |
| `readTime` | ❌ | Auto-calculated if not provided |
| `featured` | ❌ | Show in featured posts (default: false) |
| `image` | ❌ | Header image path |
| `video` | ❌ | Contains video content (default: false) |
| `interactive` | ❌ | Interactive elements (default: false) |
| `gradient` | ❌ | Custom gradient for post card |
| `published` | ❌ | Publish immediately (default: true) |

## Adding Media

### Images

1. Add images to `public/images/blog/`
2. Reference them in your markdown: `![Alt text](/images/blog/filename.jpg)`
3. Use descriptive filenames: `healthcare-ai-dashboard.jpg`

**Recommended image formats:**
- `.jpg` for photos
- `.png` for screenshots/graphics with transparency  
- `.webp` for optimized loading

### Videos

1. Add videos to `public/videos/`
2. Use MP4 format for best compatibility
3. Keep file sizes reasonable (<50MB)
4. Reference in markdown:

```html
<video controls width="100%">
  <source src="/videos/demo.mp4" type="video/mp4">
</video>
```

## Best Practices

### SEO Optimization

1. **Use descriptive titles** (50-60 characters)
2. **Write compelling excerpts** (150-160 characters)  
3. **Include relevant tags** (3-5 tags per post)
4. **Add alt text to images**
5. **Use proper heading structure** (H1 → H2 → H3)

### Content Structure

1. **Start with a hook** - Grab attention in the first paragraph
2. **Use subheadings** - Break content into scannable sections
3. **Include code examples** - Practical demonstrations
4. **Add visuals** - Images, diagrams, videos
5. **End with action** - What should readers do next?

### Performance

1. **Optimize images** - Use appropriate sizes and formats
2. **Keep videos short** - Under 2-3 minutes when possible
3. **Use code blocks sparingly** - Only include relevant code
4. **Test on mobile** - Ensure responsive design works

## Troubleshooting

### Common Issues

**Post not showing up?**
- Check `published: true` in frontmatter
- Verify date is not in the future
- Ensure file has `.md` extension

**Styling looks wrong?**
- Check markdown syntax
- Verify HTML tags are properly closed
- Test in development: `npm run dev`

**Images not loading?**
- Check file path starts with `/images/blog/`
- Verify image exists in `public/images/blog/`
- Use forward slashes `/` not backslashes `\`

**Code highlighting not working?**
- Specify language: \`\`\`javascript
- Check for typos in language name
- Ensure closing \`\`\` is on its own line

### Development Workflow

1. **Create post**: `npm run create-post`  
2. **Edit content**: Use your favorite markdown editor
3. **Add media**: Place files in appropriate public folders
4. **Preview**: `npm run dev` and visit your blog
5. **Test**: Check different devices and browsers
6. **Publish**: Set `published: true` and save

## Advanced Features

### Custom Styling

Add custom styles within your markdown:

```html
<div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg text-white my-6">
  <h3>Custom Styled Box</h3>
  <p>This content has custom styling applied.</p>
</div>
```

### Embedded Components

You can include HTML for rich interactions:

```html
<details>
  <summary>Click to expand</summary>
  <p>Hidden content here!</p>
</details>
```

### Syntax Highlighting Languages

Supported languages include:
- `javascript`, `typescript`, `jsx`, `tsx`
- `python`, `java`, `c`, `cpp`, `csharp`
- `html`, `css`, `scss`, `json`
- `bash`, `shell`, `sql`, `yaml`
- `markdown`, `diff`, `dockerfile`

## Support

If you encounter any issues:

1. Check this guide first
2. Look at existing posts for examples
3. Test in development mode: `npm run dev`
4. Verify file permissions and paths

---

**Happy blogging! 🚀** Your new system makes it incredibly easy to share your expertise in healthcare technology, development, and data science.