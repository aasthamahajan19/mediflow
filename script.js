// 1. DATA INITIALIZATION
let medications = []; 
let userProfile = JSON.parse(localStorage.getItem('mediflow_user')) || null;
let userRegistry = JSON.parse(localStorage.getItem('mediflow_registry')) || {};

window.onload = function() {
    const dateBox = document.getElementById('date-display');
    if(dateBox) {
        dateBox.innerText = new Date().toLocaleDateString('en-US', { 
            weekday: 'long', month: 'long', day: 'numeric' 
        });
    }

    if (userProfile) {
        loadUserData(); 
        showMainApp();
    } else {
        document.getElementById('welcome-screen').style.display = 'flex';
        document.getElementById('main-app').style.display = 'none';
    }
};

// 2. DATA PERSISTENCE
function loadUserData() {
    if (userProfile && userProfile.id) {
        const storageKey = `meds_${userProfile.id}`;
        medications = JSON.parse(localStorage.getItem(storageKey)) || [];
    }
}

function saveUserData() {
    if (userProfile && userProfile.id) {
        const storageKey = `meds_${userProfile.id}`;
        localStorage.setItem(storageKey, JSON.stringify(medications));
    }
}

// 3. USER MANAGEMENT (Fixed to connect with button)
function handleUserEntry() {
    const nameInput = document.getElementById('userNameInput');
    const name = nameInput.value.trim();

    if (!name) {
        alert("Please enter your name.");
        return;
    }

    if (userRegistry[name]) {
        userProfile = { name: name, id: userRegistry[name] };
    } else {
        const newID = `MF-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        userProfile = { name: name, id: newID };
        userRegistry[name] = newID;
        localStorage.setItem('mediflow_registry', JSON.stringify(userRegistry));
    }

    localStorage.setItem('mediflow_user', JSON.stringify(userProfile));
    loadUserData(); 
    showMainApp();
}

function showMainApp() {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('main-app').style.display = 'flex';
    document.getElementById('display-welcome').innerText = `Welcome, ${userProfile.name}`;
    showPage('today');
}

function logout() {
    if (confirm("Logout? Data is saved to your name.")) {
        localStorage.removeItem('mediflow_user');
        userProfile = null;
        medications = [];
        document.getElementById('userNameInput').value = '';
        document.getElementById('main-app').style.display = 'none';
        document.getElementById('welcome-screen').style.display = 'flex';
    }
}

// 4. NAVIGATION
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-menu button').forEach(b => b.classList.remove('active'));
    
    document.getElementById(pageId).classList.add('active');
    const navBtn = document.getElementById('btn-' + pageId);
    if(navBtn) navBtn.classList.add('active');
    
    if(pageId === 'today') renderToday();
    if(pageId === 'history') renderHistory();
}

// 5. MEDICATION LOGIC
function saveMedicine() {
    const name = document.getElementById('medName').value;
    const qty = document.getElementById('medQty').value;
    const interval = parseInt(document.getElementById('medFreq').value);
    const unit = document.getElementById('durUnit').value;
    const freqLabel = document.getElementById('medFreq').options[document.getElementById('medFreq').selectedIndex].text;
    const durInput = document.getElementById('durVal').value;
    const val = Number(durInput);

    if (!name || !qty || durInput === "" || val <= 0 || !Number.isInteger(val)) {
        alert("Invalid Details! Please enter a valid whole number for duration.");
        return;
    }

    let totalDays = val;
    if(unit === 'weeks') totalDays = val * 7;
    if(unit === 'months') totalDays = val * 30;

    const newMed = {
        id: Date.now(),
        name,
        qty,
        freqLabel,
        interval,
        totalDays,
        startDate: new Date().setHours(0,0,0,0)
    };

    medications.push(newMed);
    saveUserData(); 
    
    document.getElementById('medName').value = '';
    document.getElementById('medQty').value = '';
    document.getElementById('durVal').value = '';
    showPage('today');
}

function deleteMed(id) {
    if(confirm("Remove medication?")) {
        medications = medications.filter(m => m.id !== id);
        saveUserData(); 
        renderToday();
        renderHistory();
    }
}

// 6. RENDER LOGIC
function renderToday() {
    const list = document.getElementById('today-list');
    const today = new Date().setHours(0,0,0,0);
    
    const active = medications.filter(m => {
        const diff = Math.floor((today - m.startDate) / (1000 * 60 * 60 * 24));
        return (diff >= 0 && diff < m.totalDays) && (diff % m.interval === 0);
    });

    list.innerHTML = active.map(m => `
        <div class="med-card">
            <button class="delete-btn" onclick="deleteMed(${m.id})">✕</button>
            <h3 style="margin:0;">${m.name}</h3>
            <p><strong>Quantity:</strong> ${m.qty}</p>
            <p><strong>Timing:</strong> ${m.freqLabel}</p>
            <p><small>Total Course: ${m.totalDays} days</small></p>
            <div class="active-text">Active Routine</div>
        </div>
    `).join('') || '<p>No medications for today.</p>';
}

function renderHistory() {
    const list = document.getElementById('history-list');
    const today = new Date().setHours(0,0,0,0);
    
    const past = medications.filter(m => {
        const diff = Math.floor((today - m.startDate) / (1000 * 60 * 60 * 24));
        return diff >= m.totalDays;
    });

    list.innerHTML = past.map(m => `
        <div class="med-card" style="border-color:#95a5a6; opacity:0.8;">
            <button class="delete-btn" onclick="deleteMed(${m.id})">✕</button>
            <h3 style="margin:0;">${m.name}</h3>
            <p>Completed Routine</p>
            <p><small>Quantity was: ${m.qty}</small></p>
        </div>
    `).join('') || '<p>No history found.</p>';
}
