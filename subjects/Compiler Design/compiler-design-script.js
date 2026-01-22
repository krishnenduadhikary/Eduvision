fetch("compiler-design-topics.json")
  .then(response => response.json())
  .then(data => {
    document.getElementById("main-title").textContent = data.title;
    document.getElementById("subtitle").textContent = data.subtitle;

    const container = document.getElementById("topics-container");

    data.topics.forEach((topic, index) => {
      const card = document.createElement("div");
      card.className = "topic-card";

      card.innerHTML = `
        <div class="topic-title">${topic.title}</div>
        <div class="topic-desc">${topic.description}</div>
        <div class="resource-buttons">
          ${topic.resources.map(resource => `<button>${resource}</button>`).join("")}
          <button onclick="location.href='Topics/topic-${index + 1}.html'">Explore</button>
        </div>
      `;

      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Error loading Compiler Design topics:", error);
  });

(function(){
  const TOPICS_URL = 'compiler-design-topics.json';
  const container = document.getElementById('topics-container');
  const mainTitle = document.getElementById('main-title');
  const subtitle = document.getElementById('subtitle');

  let topics = [];
  let completed = JSON.parse(localStorage.getItem('cd_completed')||'{}');

  function buildSidebar(topics){
    const sidebar = document.createElement('aside');
    sidebar.className = 'sidebar';

    const brand = document.createElement('div');
    brand.className = 'brand';
    brand.innerHTML = `<div class="logo"></div><div style="font-weight:700">Compiler Design</div>`;
    sidebar.appendChild(brand);

    const nav = document.createElement('nav');
    nav.className = 'nav';

    topics.forEach((t, idx)=>{
      const btn = document.createElement('button');
      btn.textContent = t.title;
      btn.addEventListener('click', ()=>{
        document.querySelectorAll('.topic-card')[idx].scrollIntoView({behavior:'smooth',block:'center'});
        // open card
        toggleCard(document.querySelectorAll('.topic-card')[idx], true);
        document.querySelectorAll('.nav button').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
      });
      nav.appendChild(btn);
    });

    sidebar.appendChild(nav);
    // insert before main container
    const appWrap = document.createElement('div');
    appWrap.className = 'app-wrap';
    const main = document.createElement('div');
    main.className = 'main';

    // controls: progress
    const controls = document.createElement('div');
    controls.className = 'controls';
    const progWrap = document.createElement('div');
    progWrap.className = 'progress-wrap';
    progWrap.innerHTML = `<div style="font-size:13px;color:var(--muted)">Course Progress</div><div class="progress" title="progress"><i></i></div>`;
    controls.appendChild(progWrap);

    const search = document.createElement('input');
    search.placeholder = 'Filter topics...';
    search.style.padding = '8px 10px';
    search.style.borderRadius = '8px';
    search.style.border = '1px solid rgba(255,255,255,0.04)';
    search.style.background = 'transparent';
    search.style.color = 'var(--muted)';
    search.addEventListener('input', ()=>{
      const q = search.value.toLowerCase();
      document.querySelectorAll('.topic-card').forEach(card=>{
        const t = card.dataset.title.toLowerCase();
        card.style.display = t.includes(q)?'block':'none';
      });
    });

    controls.appendChild(search);

    main.appendChild(controls);

    // move existing section content into main
    const overview = document.querySelector('.overview');
    main.appendChild(overview);

    appWrap.appendChild(sidebar);
    appWrap.appendChild(main);

    document.body.insertBefore(appWrap, document.querySelector('script'));
    updateProgress();
  }

  function updateProgress(){
    const total = topics.length;
    const done = Object.keys(completed).filter(k=>completed[k]).length;
    const pct = total?Math.round(done/total*100):0;
    const bar = document.querySelector('.progress > i');
    if(bar) bar.style.width = pct+'%';
  }

  function toggleCard(card, open){
    if(open===undefined) card.classList.toggle('open');
    else if(open) card.classList.add('open');
    else card.classList.remove('open');
  }

  function renderTopics(data){
    topics = data.topics || [];
    mainTitle.textContent = data.title || 'Compiler Design';
    subtitle.textContent = data.subtitle || '';

    // clear container
    container.innerHTML = '';

    topics.forEach((topic, index)=>{
      const card = document.createElement('article');
      card.className = 'topic-card';
      card.dataset.index = index;
      card.dataset.title = topic.title;

      const icon = `<div class="icon-wrap">${topic.icon||'📘'}</div>`;

      const done = !!completed[topic.title];

      card.innerHTML = `
        <div class="topic-header">
          ${icon}
          <div style="flex:1">
            <div class="topic-title">${topic.title}</div>
            <div class="topic-desc">${topic.description.split(',').slice(0,3).join(', ')}${topic.description.split(',').length>3?'...':''}</div>
          </div>
          <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-end">
            <button class="btn toggle">${done? 'Completed' : 'Explore'}</button>
            <div class="kv">${topic.icon}</div>
          </div>
        </div>
        <div class="details">
          <div style="color:var(--muted);margin-top:8px">${topic.details}</div>
          <div class="actions">
            <button class="btn view">Open Topic</button>
            <button class="btn secondary mark">${done? 'Mark Incomplete' : 'Mark Complete'}</button>
          </div>
        </div>
      `;

      // events
      card.querySelector('.toggle').addEventListener('click', ()=>{
        toggleCard(card);
      });
      card.querySelector('.view').addEventListener('click', ()=>{
        // placeholder: navigate to subpage if present
        const url = `Topics/topic-${index+1}.html`;
        window.location.href = url;
      });
      card.querySelector('.mark').addEventListener('click', (e)=>{
        completed[topic.title] = !completed[topic.title];
        localStorage.setItem('cd_completed', JSON.stringify(completed));
        card.querySelector('.mark').textContent = completed[topic.title]? 'Mark Incomplete' : 'Mark Complete';
        card.querySelector('.toggle').textContent = completed[topic.title]? 'Completed' : 'Explore';
        updateProgress();
      });

      // hover subtle neon outline
      card.addEventListener('mouseenter', ()=>{
        card.style.boxShadow = '0 28px 80px rgba(8,12,30,0.85), 0 0 30px rgba(0,183,255,0.06)';
      });
      card.addEventListener('mouseleave', ()=>{
        card.style.boxShadow = '';
      });

      container.appendChild(card);
    });

    // build sidebar now
    buildSidebar(topics);

    // create subtle floating snippets
    createBackgroundSnippets();
    updateProgress();
  }

  function createBackgroundSnippets(){
    if(document.querySelector('.bg-anim')) return;
    const bg = document.createElement('div');
    bg.className = 'bg-anim';
    const samples = [
      "int main() { return 0; }",
      "TOKEN -> IDENTIFIER",
      "a := b + c * d;",
      "S -> aSb | \u03B5",
      "if (cond) goto L1;",
      "while (i < n) i++;"
    ];
    samples.forEach((s,i)=>{
      const sp = document.createElement('div');
      sp.className = 'snippet '+(i%3===0?'small':i%3===1?'mid':'large');
      sp.textContent = s;
      sp.style.top = (10 + i*14) + '%';
      sp.style.left = (-20 - i*10) + '%';
      sp.style.opacity = (0.04 + i*0.02);
      bg.appendChild(sp);
    });
    document.body.appendChild(bg);
  }

  // fetch data
  fetch(TOPICS_URL).then(r=>r.json()).then(renderTopics).catch(err=>{
    console.error('Failed to load topics', err);
  });

})();
