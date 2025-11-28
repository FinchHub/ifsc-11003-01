// Copied this, I didn't write it by myself. Not confident with JavaScript.
async function populateLatestProjects() {
  const target = document.getElementById('latest-projects-list');
  if (!target) return;

  let html = '';
  try {
    const res = await fetch('/assets/partials/projects-latest.html', { cache: 'no-cache' });
    if (!res.ok) throw new Error('Partial not found');
    html = await res.text();
  } catch (e) {
    console.error('Failed to load latest-projects partial:', e);
    return;
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const anchors = Array.from(doc.querySelectorAll('a.latest'));

  anchors.slice(0, 3).forEach(a => {
    const li = document.createElement('li');
    const link = document.createElement('a');

    link.href = a.getAttribute('href');
    link.textContent = a.textContent;

    li.appendChild(link);
    target.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', populateLatestProjects);

