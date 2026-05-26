# 🏥 MediFlow
### *Intelligent Medication Management Dashboard*

![Version](https://img.shields.io/badge/version-1.2.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Platform](https://img.shields.io/badge/platform-Web-orange.svg)

**MediFlow** is a streamlined, clinical-grade web application designed to help users organize and track medication routines. It features a unique **Multi-User Registry** system, allowing different individuals to maintain private prescription logs on a single device.

---

## 🚀 Live Demo
> **Note:** This is a client-side application. Your data is stored locally in your browser and never sent to a server, ensuring 100% privacy.

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| **User Registry** | Restore data by simply entering your name; unique IDs prevent data overlap. |
| **Smart Scheduling** | Handles Daily, Alternate Days, Weekly, and custom intervals (e.g., Every 3 Days). |
| **Quantity Tracking** | Record specific dosages like "2 Capsules" or "10ml" per entry. |
| **Auto-Archiving** | Finished courses move automatically from 'Today' to 'Medical History'. |
| **Input Protection** | Strict validation prevents fractional/decimal errors in treatment duration. |
| **Modern UI** | A responsive, glassmorphism-based dashboard with a medical aesthetic. |

---

## 🛠️ Technical Overview

### 🧩 Logic Flow
The application utilizes a **Modulo-Based Scheduling Algorithm**. The visibility of a medication is calculated by:

1. **Calculating Days Elapsed:** $$DaysPassed = \text{Current Date} - \text{Start Date}$$
2. **Frequency Check:** The medication appears on the dashboard only if:
   $$(DaysPassed \pmod{Interval}) \equiv 0$$
3. **Lifecycle Check:** Once $DaysPassed \geq TotalDuration$, the record is migrated to the History vault.

---

## 📂 Project Structure

```text
├── index.html   # Single Page Application (SPA) structure & routing
├── style.css    # Responsive Sidebar layout & Glassmorphism effects
├── script.js    # Multi-user registry logic & Data persistence
└── README.md    # Documentation⚙️ Installation & Setup
Clone the repository

Bash
git clone [https://github.com/YOUR_USERNAME/mediflow.git](https://github.com/YOUR_USERNAME/mediflow.git)
Launch the app
Simply open index.html in any modern browser (Chrome, Safari, Edge, or Firefox).

Deployment
This project is ready for GitHub Pages. Simply go to Settings > Pages in your repo and select the main branch to host it for free.

🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create.

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request
