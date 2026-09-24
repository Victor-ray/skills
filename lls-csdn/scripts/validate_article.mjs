#!/usr/bin/env node

import { readFile } from 'node:fs/promises';
import process from 'node:process';

const articlePath = process.argv[2];

if (!articlePath) {
  console.error('Usage: node validate_article.mjs <article.md>');
  process.exit(2);
}

let markdown;
try {
  markdown = await readFile(articlePath, 'utf8');
} catch (error) {
  console.error(`ERROR: 无法读取文章：${error.message}`);
  process.exit(2);
}

const errors = [];
const warnings = [];
const requireMatch = (pattern, message) => {
  if (!pattern.test(markdown)) errors.push(message);
};

const h1Count = (markdown.match(/^# (?!#).+$/gm) || []).length;
if (h1Count !== 1) errors.push(`H1 数量必须为 1，当前为 ${h1Count}`);

requireMatch(/^## .*30 秒看懂/m, '缺少“30 秒看懂”章节');
requireMatch(/^## 参考资料\s*$/m, '缺少“参考资料”章节');
requireMatch(/^### 官方资料\s*$/m, '参考资料缺少“官方资料”分类');
requireMatch(/^### 补充资料\s*$/m, '参考资料缺少“补充资料”分类');
requireMatch(/CSDN 摘要：/, 'HTML 注释缺少 CSDN 摘要');
requireMatch(/CSDN 标签：/, 'HTML 注释缺少 CSDN 标签');
requireMatch(/调研日期：\d{4}年\d{1,2}月\d{1,2}日/, '缺少具体调研日期');
requireMatch(/事实边界：/, 'HTML 注释缺少事实边界');

const evidenceKinds = ['官方声明', '源码可见', '社区反馈', '作者分析', '未验证'];
const evidenceCount = evidenceKinds.filter((kind) => markdown.includes(`[${kind}]`)).length;
if (evidenceCount < 2) errors.push('信息可信度标识不足，至少使用两类证据标识');

const emojiCount = (markdown.match(/\p{Extended_Pictographic}/gu) || []).length;
if (emojiCount < 4 || emojiCount > 8) {
  errors.push(`Emoji 数量应为 4 至 8 个，当前为 ${emojiCount}`);
}

const hypeTerms = ['颠覆', '封神', '神器', '必须学', '震惊', '史上最强'];
const foundHype = hypeTerms.filter((term) => markdown.includes(term));
if (foundHype.length) errors.push(`发现无证据夸张词：${foundHype.join('、')}`);

if (/\b(?:TODO|TBD)\b|\{\{[^}]+\}\}|待补充|TODO\.png/i.test(markdown)) {
  errors.push('存在未解决的占位内容');
}

if (/我(?:实测|测试|运行|跑通|复现)/.test(markdown)) {
  errors.push('存在未经允许的第一人称运行验证表述');
}

const codeFenceCount = (markdown.match(/^```/gm) || []).length;
if (codeFenceCount > 0 && !/未运行验证/.test(markdown)) {
  errors.push('包含代码示例，但没有注明本文未运行验证');
}

const imageCount = (markdown.match(/!\[[^\]]*\]\([^)]+\)/g) || []).length;
if (imageCount < 2) errors.push(`图片数量过少，当前为 ${imageCount}`);
else if (imageCount < 3) warnings.push('标准文章建议包含封面、官方截图和架构图');

if (/!\[[^\]]*\]\((?:\.\.?[\\/]|[A-Za-z]:[\\/])/.test(markdown)) {
  warnings.push('仍有本地图片链接，请确认上传状态或保留图片待上传注释');
}

if (/(?:GitHub\s*)?Stars?|星标数/i.test(markdown) && !/截至\s*\d{4}年\d{1,2}月\d{1,2}日|调研日期：\d{4}年/.test(markdown)) {
  errors.push('动态热度数据缺少具体查询日期');
}

for (const warning of warnings) console.log(`WARN: ${warning}`);
for (const error of errors) console.error(`ERROR: ${error}`);

if (errors.length) {
  console.error(`FAIL: ${errors.length} 个错误，${warnings.length} 个警告`);
  process.exit(1);
}

console.log(`PASS: 文章校验通过，${warnings.length} 个警告`);
