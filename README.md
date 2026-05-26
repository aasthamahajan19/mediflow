<div align="center">
  <img src="https://img.icons8.com/fluency/96/pill.png" alt="MediFlow Logo" width="80" />
  <h1>MediFlow</h1>
  <p><b>Precision Healthcare Management & Prescription Tracking</b></p>

  <p>
    <a href="#-key-features">Features</a> •
    <a href="#-technical-overview">Logic</a> •
    <a href="#-installation">Setup</a> •
    <a href="#-license">License</a>
  </p>

  

  ---
</div>

## 📖 Overview
**MediFlow** is a clinical-grade medication management dashboard built for users who value privacy and organization. Unlike generic trackers, MediFlow employs a **User Registry System**, enabling multiple users to store private health data on a single local device without data cross-contamination.

---

## ✨ Key Features

#### 🔐 Multi-User Registry
Restore your unique profile by simply entering your name. The system generates and maps a specific **Health ID** to your session, isolating your records from other users on the same browser.

#### 🕒 Smart Interval Scheduling
Beyond daily reminders, MediFlow handles complex medical patterns:
* **Alternate Days:** Automatic modulo-based filtering.
* **Custom Gaps:** Support for "Every 3 Days" or "Weekly" routines.
* **Time Dosing:** Presets for "Every 8 Hours" and "Twice Daily".

#### 📊 Automatic Archiving
Once a treatment duration (Days/Weeks/Months) is reached, the system performs a **State Migration**, moving the record from your active dashboard to your permanent **Medical History**.

#### 🚫 Strict Data Integrity
MediFlow prevents "Logic Drift" by enforcing **Integer-Only Validation**. Fractions and decimals are blocked to ensure treatment cycles remain medically accurate.

---

## 🛠️ Technical Overview

### The Logic Engine
MediFlow calculates visibility in real-time based on your specific start date and interval choice:

> **The Visibility Formula:**
> A medication is rendered in the "Today" view only if:
> 1. `Current Date - Start Date < Total Duration`
> 2. `(Current Date - Start Date) % Repeat Interval == 0`

---

## 📂 Project Architecture

| File | Responsibility |
| :--- | :--- |
| **index.html** | Handles the Single Page Application (SPA) container and view routing. |
| **style.css** | Manages Glassmorphism effects, sidebar flexbox, and responsive cards. |
| **script.js** | Core engine: User Registry, LocalStorage scoping, and Date math. |

---

## ⚙️ Installation

1. **Clone & Enter**
   ```bash
   git clone [https://github.com/YOUR_USERNAME/mediflow.git](https://github.com/YOUR_USERNAME/mediflow.git)
   cd mediflowExecute
Simply open index.html in your browser. No server setup required.

🔒 Privacy Assurance
Zero Server Communication: All data stays in your browser's localStorage.

Encrypted Feel: Unique ID mapping ensures your data remains your own.

No Tracking: No cookies or external analytics are used.
