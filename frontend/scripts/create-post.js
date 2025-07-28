#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function generatePostSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function createPostTemplate(title, category, excerpt, tags) {
  const slug = generatePostSlug(title)
  const today = new Date().toISOString().split('T')[0]
  const tagsArray = tags.split(',').map(tag => `"${tag.trim()}"`).join(', ')
  
  return `---
title: "${title}"
excerpt: "${excerpt}"
date: "${today}"
author: "Lloyd Dela Cruz"
category: "${category}"
tags: [${tagsArray}]
readTime: "5 min read"
featured: false
image: "/images/blog/${slug}.jpg"
video: false
interactive: false
gradient: "from-blue-600 via-purple-600 to-indigo-800"
published: true
---

# ${title}

${excerpt}

## Introduction

Write your introduction here...

## Main Content

### Subheading

Write your content here. You can include:

#### Code Blocks

\`\`\`javascript
function example() {
  console.log("Hello, World!");
}
\`\`\`

#### Images

![Alt text](/images/blog/${slug}-example.jpg)

#### Lists

- Item 1
- Item 2
- Item 3

### Another Section

More content here...

#### Interactive Elements

You can add custom React components here if needed.

#### Videos

Embed videos using HTML:

\`\`\`html
<video controls width="100%">
  <source src="/videos/${slug}.mp4" type="video/mp4">
</video>
\`\`\`

## Conclusion

Wrap up your post here...

---

*Want to learn more? Check out our other articles on [healthcare technology](/blog?category=healthcare) and [development](/blog?category=development).*
`
}

async function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer)
    })
  })
}

async function main() {
  console.log('🚀 Blog Post Creator')
  console.log('===================\n')
  
  try {
    const title = await askQuestion('Post title: ')
    if (!title.trim()) {
      console.log('❌ Title is required!')
      process.exit(1)
    }
    
    const excerpt = await askQuestion('Brief excerpt: ')
    if (!excerpt.trim()) {
      console.log('❌ Excerpt is required!')
      process.exit(1)
    }
    
    console.log('\nAvailable categories: healthcare, development, data-science, ai')
    const category = await askQuestion('Category: ')
    if (!category.trim()) {
      console.log('❌ Category is required!')
      process.exit(1)
    }
    
    const tags = await askQuestion('Tags (comma-separated): ')
    if (!tags.trim()) {
      console.log('❌ Tags are required!')
      process.exit(1)
    }
    
    const slug = generatePostSlug(title)
    const contentDir = path.join(__dirname, '../content/blog')
    const filePath = path.join(contentDir, `${slug}.md`)
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(contentDir)) {
      fs.mkdirSync(contentDir, { recursive: true })
    }
    
    // Check if file already exists
    if (fs.existsSync(filePath)) {
      console.log(`❌ A post with slug "${slug}" already exists!`)
      process.exit(1)
    }
    
    // Import the template function from blog-server
    const { createPostTemplate } = require('../src/lib/blog-server')
    
    // Create the post file
    const content = createPostTemplate(title, category)
    fs.writeFileSync(filePath, content, 'utf8')
    
    console.log(`\n✅ Blog post created successfully!`)
    console.log(`📁 File: ${filePath}`)
    console.log(`🔗 URL: /blog/${slug}`)
    console.log(`\n📝 Next steps:`)
    console.log(`1. Edit the markdown file: ${filePath}`)
    console.log(`2. Add images to: /public/images/blog/`)
    console.log(`3. Add videos to: /public/videos/`)
    console.log(`4. Update the content and save`)
    console.log(`5. Your post will be live immediately!`)
    
  } catch (error) {
    console.error('❌ Error creating post:', error.message)
    process.exit(1)
  } finally {
    rl.close()
  }
}

main()