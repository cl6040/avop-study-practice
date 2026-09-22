import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const findings = [];

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function report(file, message) {
  findings.push(`${path.relative(root, file)}: ${message}`);
}

const textFiles = [
  ...walk(path.join(root, "dist")).filter((file) => /\.(?:html|js|css|json|svg|txt)$/i.test(file)),
  ...walk(path.join(root, ".github", "workflows")).filter((file) => /\.ya?ml$/i.test(file)),
];

const secretPatterns = [
  /sk-(?:proj-)?[A-Za-z0-9_-]{20,}/,
  /AKIA[0-9A-Z]{16}/,
  /gh[pousr]_[A-Za-z0-9]{20,}/,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /postgres(?:ql)?:\/\/[^\s:]+:[^\s@]+@/i,
];
const dangerousDom = /\b(?:innerHTML|outerHTML|insertAdjacentHTML|document\.write|eval)\b|new\s+Function\s*\(/;

for (const file of textFiles) {
  const content = fs.readFileSync(file, "utf8");
  if (secretPatterns.some((pattern) => pattern.test(content))) report(file, "possible committed credential or private key");
  if (file.endsWith(".js") && dangerousDom.test(content)) report(file, "dangerous DOM or code-execution sink");
  if (/https?:\/\//i.test(content) && /<(?:script|link)\b[^>]+(?:src|href)=["']https?:\/\//i.test(content)) {
    report(file, "remote runtime script or stylesheet");
  }
  if (/http:\/\//i.test(content.replaceAll("http://www.w3.org/2000/svg", ""))) report(file, "insecure HTTP reference");
}

const htmlPath = path.join(root, "dist", "index.html");
const html = fs.readFileSync(htmlPath, "utf8");
const requiredCsp = ["default-src 'self'", "base-uri 'none'", "object-src 'none'", "script-src 'self'", "connect-src 'none'"];
for (const directive of requiredCsp) {
  if (!html.includes(directive)) report(htmlPath, `missing CSP directive: ${directive}`);
}
for (const tag of html.match(/<a\b[^>]*target=["']_blank["'][^>]*>/gi) || []) {
  if (!/rel=["'][^"']*noopener[^"']*noreferrer[^"']*["']/i.test(tag)) report(htmlPath, "target=_blank link lacks noopener and noreferrer");
}

for (const workflow of walk(path.join(root, ".github", "workflows")).filter((file) => /\.ya?ml$/i.test(file))) {
  const content = fs.readFileSync(workflow, "utf8");
  for (const match of content.matchAll(/uses:\s*([^\s#]+)/g)) {
    if (!/@[0-9a-f]{40}$/i.test(match[1])) report(workflow, `action is not pinned to a full commit SHA: ${match[1]}`);
  }
}

const forbiddenFiles = walk(root).filter((file) => {
  const relative = path.relative(root, file).replaceAll("\\", "/");
  if (relative.startsWith(".git/") || relative.startsWith("tmp/")) return false;
  return /(^|\/)\.env(?:\.|$)|\.(?:pem|key|p12|pfx)$/i.test(relative) && !relative.endsWith(".env.example");
});
for (const file of forbiddenFiles) report(file, "sensitive file type must not be committed");

if (findings.length) {
  console.error("Security checks failed:\n" + findings.map((finding) => `- ${finding}`).join("\n"));
  process.exit(1);
}

console.log(`Security checks passed for ${textFiles.length} deployed/configuration files.`);
