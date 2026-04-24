
  // 카운트, 맥스값만 수정하면 됩니다.입문/베리에이션/브루잉 교육은 사업 계획대로 200명 목표로 잡았습니다. 
  // 커핑 초급 교육은 26년 커핑 초급 대상자 인원입니다.
  // 점장/세컨 교육은 인원 대신 횟수로 적었습니다.
  const courses = [
  { name: '신규 입사자 입문 교육', count: 64,  max: 200, unit: '명' },
  { name: '커피 베리에이션 교육', count: 51,  max: 200, unit: '명' },
  { name: '브루잉 교육',          count: 28,  max: 200, unit: '명' },
  { name: '커핑 초급 교육',       count: 51,  max: 160, unit: '명' },
  { name: '점장/세컨 교육',       count: 5,  max: 13,  unit: '회' },
];

const grid = document.getElementById('statGrid');
grid.innerHTML = '';

courses.forEach((c, i) => {
  const pct = Math.round(c.count / c.max * 100);
  const card = document.createElement('div');
card.className = 'stat-card' + (c.unit === '회' ? ' stat-card--navy' : '');

  card.innerHTML = `
    <div class="stat-top">
      <div class="stat-name">${c.name}</div>
      <div class="stat-count">
        <div class="stat-num">${c.count}<span class="stat-unit"> ${c.unit}</span></div>
        <div class="stat-pct" style="text-align:right">${c.unit === '회' ? '진행 완료 (누계)' : '수료 완료 (누계)'}</div>
      </div>
    </div>
    <div class="stat-bar-bg"><div class="stat-bar-fill" data-pct="${pct}" style="width:0%"></div></div>
    <div class="stat-pct">${pct}% (연 계획 ${c.unit === '회' ? '횟수' : '인원'} ${c.max}${c.unit})</div>
  `;
  grid.appendChild(card);
});


  /* Animate bars on scroll */
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      const bars = e.target.querySelectorAll('.stat-bar-fill');
      
      if (e.isIntersecting) {
        bars.forEach(b => {
          b.style.width = b.dataset.pct + '%';
        });
      } else {
        bars.forEach(b => {
          b.style.width = '0%';
        });
      }
    });
  }, { threshold: 0.2 }); 
  obs.observe(grid);


  /* ── ARCHIVE ── */
  function toggleArchive() {
    document.getElementById('archivePanel').classList.toggle('open');
  }
  document.addEventListener('click', e => {
    if (!e.target.closest('.archive-btn') && !e.target.closest('.archive-panel'))
      document.getElementById('archivePanel').classList.remove('open');
  });
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.getElementById('archivePanel').classList.remove('open');
  }

  /* ── NAV ── */
  function scrollToSection(id, el) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    el.classList.add('active');
  }
  window.addEventListener('scroll', () => {
    ['article','report','calendar'].forEach((id, i) => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 140) {
        document.querySelectorAll('.nav-item').forEach((n,j) => n.classList.toggle('active', j===i));
      }
    });
  });

  /* ── CALENDAR ── */
  let cy = 2026, cm = 5; 
  const MN = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];
  function updateCal() {
    document.getElementById('calMonthLabel').textContent = `${cy}년 ${MN[cm-1]}`;
    const p = n => String(n).padStart(2,'0');
    const ld = new Date(cy, cm, 0).getDate();
    document.getElementById('calIframe').src =
      `https://calendar.google.com/calendar/embed?src=terarosaeducation%40gmail.com&ctz=Asia%2FSeoul&mode=MONTH&dates=${cy}${p(cm)}01%2F${cy}${p(cm)}${ld}`;
  }

  function changeMonth(d) {
    cm += d;
    if (cm > 12) { cm = 1; cy++; }
    if (cm < 1)  { cm = 12; cy--; }
    updateCal();
  }

/* ── TOP BUTTON ── */
const topBtn = document.getElementById('topBtn');
window.addEventListener('scroll', () => {
  topBtn.classList.toggle('visible', window.scrollY > 300);
});
