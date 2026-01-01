let medications = JSON.parse(localStorage.getItem('fullScreenMeds')) || [];

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-menu button').forEach(b => b.classList.remove('active'));
    
    document.getElementById(pageId).classList.add('active');
    document.getElementById('btn-' + pageId).classList.add('active');
    
    const titles = { 'today': 'Daily Schedule', 'add': 'Add New Medicine', 'history': 'Past History' };
    document.getElementById('page-title').innerText = titles[pageId];

    if(pageId === 'today') renderToday();
    if(pageId === 'history') renderHistory();
}

function saveMedicine() {
    const name = document.getElementById('medName').value;
    const freq = document.getElementById('medFreq').value;
    const val = parseInt(document.getElementById('durVal').value);
    const unit = document.getElementById('durUnit').value;

    if(!name || isNaN(val)) return alert("Please complete the form");

    let totalDays = val;
    if(unit === 'weeks') totalDays = val * 7;
    if(unit === 'months') totalDays = val * 30;

    const newMed = {
        id: Date.now(),
        name,
        freq,
        durationDisplay: `${val} ${unit}`,
        totalDays,
        startDate: new Date().toISOString()
    };

    medications.push(newMed);
    localStorage.setItem('fullScreenMeds', JSON.stringify(medications));
    
    document.getElementById('medName').value = '';
    showPage('today');
}

function renderToday() {
    const list = document.getElementById('today-list');
    const now = new Date();
    
    const active = medications.filter(m => {
        const diff = Math.floor((now - new Date(m.startDate)) / (1000 * 60 * 60 * 24));
        return diff < m.totalDays;
    });

    list.innerHTML = active.map(m => `
        <div class="med-card">
            <h3>${m.name}</h3>
            <p><strong>Timing:</strong> ${m.freq}</p>
            <p><small>Course Duration: ${m.durationDisplay}</small></p>
            <div style="margin-top:15px; color:#27ae60; font-weight:bold;">Active Routine</div>
        </div>
    `).join('') || '<p>No medicines scheduled. Click "Add New" to start.</p>';
}

function renderHistory() {
    const list = document.getElementById('history-list');
    const now = new Date();
    
    const past = medications.filter(m => {
        const diff = Math.floor((now - new Date(m.startDate)) / (1000 * 60 * 60 * 24));
        return diff >= m.totalDays;
    });

    list.innerHTML = past.map(m => `
        <div class="med-card" style="border-color:#95a5a6; opacity:0.8;">
            <h3>${m.name}</h3>
            <p>Course Completed</p>
            <p><small>Was taken for ${m.durationDisplay}</small></p>
        </div>
    `).join('') || '<p>No history found.</p>';
}

// Start on Today page
showPage('today');