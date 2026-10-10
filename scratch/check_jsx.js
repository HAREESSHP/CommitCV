const fs = require('fs');
const code = fs.readFileSync('client/src/App.jsx', 'utf8');

const lines = code.split('\n');
let stack = [];

for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
  const line = lines[lineIdx];
  // Strip string literals to avoid false tag matching inside strings
  let cleanLine = line.replace(/(["']).*?\1/g, '""').replace(/\{\/\*.*?\*\/\}/g, '');
  
  const regex = /<\/?([a-zA-Z0-9\._]+)(\s+[^>]*)?>/g;
  let match;
  while ((match = regex.exec(cleanLine)) !== null) {
    const full = match[0];
    const tag = match[1];
    
    if (full.endsWith('/>')) continue;
    if (['img', 'input', 'br', 'hr', 'meta', 'link', 'source'].includes(tag)) continue;
    
    if (full.startsWith('</')) {
      if (stack.length === 0) {
        console.log(`Extra closing tag </${tag}> at line ${lineIdx + 1}`);
      } else {
        const top = stack.pop();
        if (top.tag !== tag) {
          console.log(`Mismatch at line ${lineIdx + 1}: expected </${top.tag}> (opened at line ${top.line}), got </${tag}>`);
        }
      }
    } else {
      stack.push({ tag, line: lineIdx + 1 });
    }
  }
}

console.log('Unclosed tags remaining count:', stack.length);
if (stack.length > 0) {
  console.log('Unclosed tags:', stack);
}
