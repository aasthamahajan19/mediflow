# 🏥 MediFlow | Medication Management Dashboard

**MediFlow** is a streamlined web application designed to help users organize and track their medication routines. Built with a focus on simplicity and medical accuracy, it automatically manages the lifecycle of a prescription from the first dose to the final day of the course.



---

## ✨ Features

- **Dashboard Experience**: A desktop-first dashboard designed for a professional and organized feel.
- **Smart Duration Parsing**: Add medicines using natural timeframes like **2 Weeks** or **3 Months**.
- **Automated Lifecycle**: 
    - **Today's Schedule**: Displays active medications based on the start date and duration.
    - **Medical History**: Automatically archives medications once the prescribed duration has passed.
- **Data Persistence**: Uses Browser `localStorage` to ensure your data remains available even after refreshing or closing the browser.
- **Modern UI**: Clean typography, glassmorphism effects, and a medical-themed backdrop.

---

## 🛠️ How It Works (The Logic)

The application uses JavaScript's `Date` object to track your progress. When you add a medicine, the app stores the **Start Date**. It then performs a real-time calculation:

1. **Calculate Elapsed Time**:
   $$DaysPassed = \frac{CurrentDate - StartDate}{1000 \times 60 \times 60 \times 24}$$
2. **Determine Status**:
   - If $DaysPassed < PrescribedDuration$, the medicine is marked as **Active**.
   - If $DaysPassed \geq PrescribedDuration$, the medicine is moved to **History**.

---

## 📂 Project Structure

```text
├── index.html   # Defines the Sidebar and SPA page structure
├── style.css    # Layout styling, Glassmorphism, and Animations
├── script.js    # Data management, LocalStorage, and Date math
└── README.md    # Project documentation
