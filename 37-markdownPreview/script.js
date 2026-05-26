const esc = s => s.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]);

function md(s) {
  s = esc(s);
  s = s.replace(/```([\s\S]*?)```/g, (m, c) => '<pre><code>' + c + '</code></pre>');
  s = s.replace(/^### (.*)$/gm, '<h3>$1</h3>')
       .replace(/^## (.*)$/gm, '<h2>$1</h2>')
       .replace(/^# (.*)$/gm, '<h1>$1</h1>');
  s = s.replace(/^&gt; (.*)$/gm, '<blockquote>$1</blockquote>');
  s = s.replace(/^\s*[-*] (.*)$/gm, '<li>$1</li>').replace(/(<li>.*<\/li>\n?)+/g, m => '<ul>' + m + '</ul>');
  s = s.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\*(.+?)\*/g, '<i>$1</i>');
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  s = s.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank">$1</a>');
  s = s.replace(/\n\n/g, '<br><br>');
  return s;
}

const src = document.getElementById('src'), out = document.getElementById('out');
const upd = () => out.innerHTML = md(src.value);
src.oninput = upd; upd();
