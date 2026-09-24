# Skills

这是我的个人 Codex Skills 仓库。目前收录 `lls-csdn`：一个面向中文技术科普写作的 Skill，用于把新兴技术、GitHub 项目、AI/Agent 工具或框架整理成有证据、易理解、带配图的 CSDN 文章。它是一套给 AI 助手执行的写作流程与约束，不是自动发布器，也不是被介绍项目的运行测试工具。

## lls-csdn 适合做什么

- 只提供一个项目名或技术主题时，先确认写作对象和官方来源，再开展调研。
- 给计算机专业学生、初级开发者和感兴趣的读者写中文科普：先解释实际问题，再介绍机制、适用范围和局限。
- 区分官方声明、公开源码可见内容、社区反馈、作者分析和未验证信息；动态数据标注查询日期。
- 规划封面、官方界面或仓库截图、必要的架构示意图，并保留图片来源和可编辑的 Mermaid 源码。
- 生成一份 Markdown 文章，运行内置校验器；有现成 CSDN 登录会话时，可协助上传原创图片并填写**新文章草稿**，但不会发布。

不适用于普通技术问答、非 CSDN 写作，或需要实际部署、跑分、复现实验的任务。若项目身份或关键能力无法从可靠来源确认，Skill 会停止编造完整文章，说明缺失的证据。

## 使用方法

将仓库中的 [`lls-csdn/`](lls-csdn/) 目录安装到 Codex 的 Skills 目录（通常为 `~/.codex/skills/lls-csdn/`），保持 `SKILL.md`、`references/`、`assets/`、`agents/` 和 `scripts/` 的相对位置不变。重启或刷新 Codex 会话后，可以明确调用：

```text
$lls-csdn 请介绍一个具体的 GitHub 项目，写成适合 CSDN 的中文科普文章。
```

匹配的中文 CSDN 科普写作请求也可以自动触发。此 Skill 的个人默认文章目录是 `E:\雷大帅的博客文章`；其他电脑使用前应将 [`SKILL.md`](lls-csdn/SKILL.md) 和 [`csdn-workflow.md`](lls-csdn/references/csdn-workflow.md)、[`visual-system.md`](lls-csdn/references/visual-system.md) 中的该路径改为自己的文章目录，或在请求中明确指定输出位置。封面 HTML 模板的浏览器渲染、图片制作及草稿操作取决于当前环境可用的工具和登录状态。

文章写好后，使用 Node.js 运行校验器：

```powershell
node .\lls-csdn\scripts\validate_article.mjs <文章文件.md>
```

校验器检查文章结构、调研日期、证据标识、图片引用、占位内容、夸张用语及部分未经验证的表述。**通过校验不等于事实已核实，更不等于项目已运行验证**；事实仍须人工核对原始来源。

## 工作流程

1. **确定对象与证据**：优先查看官方仓库、文档、Release、论文和公开源码；建立带日期的事实清单。同名项目先消歧，无法证明“热门”时改写为普通项目介绍。
2. **组织文章**：使用唯一标题、封面、“30 秒看懂”、问题与机制、局限与风险、总结和分组参考资料；按主题增加必要的对比或名词解释，不为凑篇幅填充章节。
3. **制作视觉内容**：标准封面为 1280 × 720；架构图只在组件与数据流有证据时制作。非官方归纳图明确标为概念示意，并保存 Mermaid 源码。
4. **编辑与校验**：使用通俗但克制的中文，区分事实与判断；输出一份 Markdown 并运行 `validate_article.mjs`。
5. **可选草稿流程**：有可用的 CSDN 登录会话时，上传原创图片、核对链接和预览，停留在草稿。上传不可用时保留本地图片及“待上传”标记，不谎称已经发布或托管。

## 文件结构

| 路径 | 作用 |
| --- | --- |
| [`lls-csdn/SKILL.md`](lls-csdn/SKILL.md) | 入口、适用条件、总体流程及不可越过的边界 |
| [`lls-csdn/agents/openai.yaml`](lls-csdn/agents/openai.yaml) | 显示名称、简介和默认提示词 |
| [`lls-csdn/references/research-and-evidence.md`](lls-csdn/references/research-and-evidence.md) | 来源优先级、证据标签和热点判断 |
| [`lls-csdn/references/article-structure.md`](lls-csdn/references/article-structure.md) | 文章结构、发布辅助信息和引用规范 |
| [`lls-csdn/references/chinese-writing-style.md`](lls-csdn/references/chinese-writing-style.md) | 面向读者的中文科普文风与措辞约束 |
| [`lls-csdn/references/visual-system.md`](lls-csdn/references/visual-system.md) | 封面、截图、架构图与来源标注 |
| [`lls-csdn/references/csdn-workflow.md`](lls-csdn/references/csdn-workflow.md) | 本地交付、图片上传和草稿处理边界 |
| [`lls-csdn/assets/comic-cover-template.html`](lls-csdn/assets/comic-cover-template.html) | 图像生成不可用时的可编辑封面模板 |
| [`lls-csdn/scripts/validate_article.mjs`](lls-csdn/scripts/validate_article.mjs) | Markdown 文章静态校验脚本 |

## 重要边界

- 调研只阅读公开材料：不克隆、安装或运行被介绍的项目，不将源码阅读表述为实测。
- 不捏造性能、Star 增长、发布日期、引述、个人经历或因果关系；不能核实的重要信息标明未验证。
- 仅在已有登录会话可用时处理 CSDN 图片与新文章草稿；**不发布、不改已发布文章、不删除远端内容、不索取或保存账号凭据**。
- 仓库中的绝对路径与草稿授权属于原作者的个人配置；其他使用者需要按自己的环境和授权范围调整。
