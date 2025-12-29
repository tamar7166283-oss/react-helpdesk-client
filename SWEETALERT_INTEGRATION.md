# SweetAlert2 Integration - תיעוד שילוב

## סקירה כללית
שולבה ספריית SweetAlert2 במערכת למטרות שיפור חווית המשתמש (UX).
הספרייה מספקת חלונות דו-שיח ויזואליים והודעות Toast מעוצבות.

## התקנה
```bash
npm install sweetalert2
```

## שילובים במערכת

### 1. **LoginPage** (`src/pages/LoginPage.tsx`)
**מה נוסף:** Alert של שגיאה בהתחברות

**מתי מופיע:**
- כשההתחברות נכשלת (שם משתמש/סיסמה שגויים)
- בשגיאת שרת

**עיצוב:**
- אייקון: ❌ error
- צבע כפתור אישור: #667eea (הכחול של המערכת)
- כיוון טקסט: RTL (עברית)

**קוד לדוגמה:**
```typescript
Swal.fire({
    icon: 'error',
    title: 'שגיאת התחברות',
    text: errorMessage,
    confirmButtonText: 'נסה שוב',
    confirmButtonColor: '#667eea',
    backdrop: true,
    customClass: {
        popup: 'swal-rtl'
    }
});
```

---

### 2. **SignupPage** (`src/pages/SignupPage.tsx`)
**מה נוסף:** 
- Alert הצלחה בהרשמה
- Alert שגיאה בהרשמה

**מתי מופיע:**
- הרשמה מוצלחת - מציג הודעת ברכה ואז מעביר לדף ראשי
- הרשמה נכשלת - מציג את הסיבה לכישלון

**עיצוב:**
- הצלחה: אייקון ✅ success, כפתור ירוק #2e7d32
- שגיאה: אייקון ❌ error, כפתור כחול #667eea

---

### 3. **CreateTicketPage** (`src/pages/CreateTicketPage.tsx`)
**מה נוסף:** Alert הצלחה אחרי יצירת טיקט

**מתי מופיע:**
- לאחר שליחת טופס יצירת פניה בהצלחה

**תכונות מיוחדות:**
- כפתור "עבור לרשימת הפניות" שמעביר אוטומטית לעמוד הטיקטים
- עיצוב בצבע הצלחה ירוק

**קוד לדוגמה:**
```typescript
Swal.fire({
    icon: 'success',
    title: 'פניה נשלחה בהצלחה!',
    text: 'הפניה שלך התקבלה ותטופל בהקדם',
    confirmButtonText: 'עבור לרשימת הפניות',
    confirmButtonColor: '#2e7d32',
    backdrop: true,
    customClass: {
        popup: 'swal-rtl'
    }
}).then((result) => {
    if (result.isConfirmed) {
        navigate("/tickets");
    }
});
```

---

### 4. **ChangeStatus Component** (`src/components/ChangeStatus.tsx`)
**מה נוסף:** Toast notification עבור שינוי סטטוס ל-"Closed"

**מתי מופיע:**
- כאשר משנים את סטטוס הטיקט ל-"Closed" (סגור)

**תכונות מיוחדות:**
- **Toast** = הודעה קטנה בפינת המסך
- מיקום: פינה ימנית עליונה (`top-end`)
- נעלם אוטומטית אחרי 3 שניות
- יש פס התקדמות (timer progress bar)
- ניתן להשהות על ידי מעבר עם העכבר

**קוד לדוגמה:**
```typescript
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: {
        popup: 'swal-rtl-toast'
    },
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

Toast.fire({
    icon: 'success',
    title: 'הסטטוס עודכן',
    text: 'הטיקט סומן כסגור בהצלחה'
});
```

---

### 5. **AddComment Component** (`src/components/AddComment.tsx`)
**מה נוסף:** Toast notification להוספת תגובה

**מתי מופיע:**
- אחרי הוספת תגובה בהצלחה
- בשגיאה בהוספת תגובה (Alert מלא)

**תכונות:**
- הצלחה: Toast קטן בפינה
- שגיאה: Alert מלא במרכז המסך

---

### 6. **TicketDetailsPage** (`src/pages/TicketDetailsPage.tsx`)
**מה נוסף:** Alert של הרשאה (403/401) והעברה לדף 404

**מתי מופיע:**
- כשמנסים לגשת לטיקט ללא הרשאה
- כשטיקט לא קיים

**עיצוב:**
- אייקון error אדום
- כפתור "חזור לטיקטים"

---

## עיצוב מותאם אישית (CSS)

נוסף ל-`src/index.css` סגנון מותאם:

### RTL Support
```css
.swal-rtl {
  font-family: 'Roboto', 'Segoe UI', 'Arial', sans-serif !important;
  direction: rtl !important;
  text-align: right !important;
}
```

### כפתורים
```css
.swal-rtl .swal2-confirm {
  border-radius: 8px !important;
  padding: 10px 24px !important;
  font-weight: 600 !important;
  transition: all 0.3s ease !important;
}

.swal-rtl .swal2-confirm:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3) !important;
}
```

### Toast Styles
```css
.swal-rtl-toast {
  border-radius: 12px !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12) !important;
}

.swal2-timer-progress-bar {
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%) !important;
}
```

---

## התאמה לצבעי המערכת

כל ה-Alerts משתמשים בצבעי המערכת מ-`:root`:

- **Primary:** `#667eea` (כחול סגול)
- **Success:** `#2e7d32` (ירוק)
- **Error:** `#d32f2f` (אדום)
- **Warning:** `#ed6c02` (כתום)
- **Gradient:** `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`

---

## דוגמאות שימוש

### Alert רגיל
```typescript
Swal.fire({
    icon: 'success', // או 'error', 'warning', 'info', 'question'
    title: 'כותרת',
    text: 'תוכן ההודעה',
    confirmButtonText: 'אישור',
    confirmButtonColor: '#667eea',
    customClass: {
        popup: 'swal-rtl'
    }
});
```

### Alert עם אישור
```typescript
Swal.fire({
    title: 'האם אתה בטוח?',
    text: "לא תוכל לבטל פעולה זו!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'כן, מחק!',
    cancelButtonText: 'ביטול',
    confirmButtonColor: '#d32f2f',
    cancelButtonColor: '#718096',
    customClass: {
        popup: 'swal-rtl'
    }
}).then((result) => {
    if (result.isConfirmed) {
        // ביצוע הפעולה
    }
});
```

### Toast הודעה
```typescript
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: {
        popup: 'swal-rtl-toast'
    }
});

Toast.fire({
    icon: 'success',
    title: 'פעולה בוצעה בהצלחה'
});
```

---

## טיפים לשימוש

1. **תמיד השתמש ב-`customClass: { popup: 'swal-rtl' }`** לתמיכה בעברית
2. **Toast** מתאים להודעות מהירות שלא דורשות תשומת לב מלאה
3. **Alert מלא** מתאים לפעולות קריטיות או שדורשות החלטת משתמש
4. **צבעים:** התאם את `confirmButtonColor` לסוג ההודעה (הצלחה=ירוק, שגיאה=אדום)
5. **backdrop: true** יוצר רקע כהה מאחורי ה-Alert

---

## קישורים שימושיים

- [תיעוד רשמי של SweetAlert2](https://sweetalert2.github.io/)
- [דוגמאות](https://sweetalert2.github.io/#examples)
- [אפשרויות התצורה](https://sweetalert2.github.io/#configuration)
