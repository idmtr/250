export const articleTemplates = {
  'case-study': {
    title: 'Customer Success Story: [Company Name]',
    excerpt: 'Learn how [Company] achieved [result] using our solution.',
    content: `# Customer Success Story: [Company Name]

## The Challenge
[Describe the problem or challenge the customer faced]

## The Solution
[Explain how your solution addressed their needs]

## The Results
[Share specific metrics and outcomes]

## Key Takeaways
- [Point 1]
- [Point 2]
- [Point 3]`,
    tags: ['case-study', 'success-story']
  },
  'how-to': {
    title: 'How to [Accomplish Task]',
    excerpt: 'A step-by-step guide to [task description].',
    content: `# How to [Accomplish Task]

## Prerequisites
- [Requirement 1]
- [Requirement 2]

## Step 1: [First Step]
[Detailed explanation]

## Step 2: [Second Step]
[Detailed explanation]

## Common Issues and Solutions
### Problem 1
[Solution]

### Problem 2
[Solution]

## Next Steps
[What to do after completing this guide]`,
    tags: ['tutorial', 'guide', 'how-to']
  }
} as const