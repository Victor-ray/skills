---
name: lls-csdn
description: Use when creating, researching, reviewing, or preparing a Chinese CSDN popular-science article about an emerging technology, GitHub project, AI/Agent tool, framework, or technical trend, especially when the user supplies only a topic or project name. Do not use for ordinary technical Q&A or non-CSDN writing.
---

# LLS CSDN

Produce a publication-ready Chinese CSDN explainer that combines approachable teaching, defensible technical detail, and consistent visuals. Default to one-shot completion; ask only when the topic name or intended subject is genuinely ambiguous.

用于撰写中文 CSDN 新兴技术科普、GitHub 热门项目解读和 AI/Agent 工具介绍。

## Workflow

1. Read [research-and-evidence.md](references/research-and-evidence.md), then establish a dated fact ledger from primary sources.
2. Decide whether the evidence supports calling the topic a hotspot. Downgrade to a normal project introduction when it does not.
3. Read [article-structure.md](references/article-structure.md) and choose the smallest useful set of optional sections.
4. Read [visual-system.md](references/visual-system.md), create the cover and supporting visuals, and preserve source attribution.
5. Draft and edit with [chinese-writing-style.md](references/chinese-writing-style.md). Keep facts, inference, and opinion visibly separate.
6. Save the article under `E:\雷大帅的博客文章`, then run:

   ```powershell
   node <skill-root>\scripts\validate_article.mjs <article.md>
   ```

7. If a logged-in CSDN browser is available, follow [csdn-workflow.md](references/csdn-workflow.md) to upload original images, replace links, and place the article in the draft box.

## Non-Negotiables

- Research is static only. Do not clone repositories, install dependencies, execute project code, or describe source inspection as a successful test.
- Never invent metrics, dates, quotations, user stories, implementation details, personal experience, or causality.
- Use specific dates for changing facts and state when an important claim was not independently verified.
- Image upload and CSDN draft filling are pre-authorized for this personal Skill; do not request confirmation each time.
- Never click publish, edit an already published article, delete remote content, or request/store CSDN credentials.
- Deliver one final Markdown file. Working images may remain under `.lls-csdn-work/<slug>/` when upload is unavailable.

Invoke explicitly with `$lls-csdn`, or let it trigger automatically for matching Chinese CSDN article requests.
