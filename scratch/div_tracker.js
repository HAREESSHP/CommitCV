const fs = require('fs');
const content = fs.readFileSync('client/src/App.jsx', 'utf8');
const lines = content.split('\n');

let divStack = [];

for (let i = 1937; i < 2615; i++) {
  const lineNum = i + 1;
  const line = lines[i];
  
  const regex = /<\/?div(\s|>)/g;
  let match;
  while ((match = regex.exec(line)) !== null) {
    const full = match[0];
    if (full.startsWith('</div')) {
      if (divStack.length === 0) {
        console.log(`Line ${lineNum}: Unexpected extra </div>`);
      } else {
        const top = divStack.pop();
        // console.log(`Line ${lineNum}: Closed div from Line ${top.line}`);
      }
    } else {
      divStack.push({ line: lineNum, text: line.trim() });
    }
  }
}

console.log('Unclosed divs count:', divStack.length);
divStack.forEach(d => console.log(`Opened at Line ${d.line}: ${d.text}`));
