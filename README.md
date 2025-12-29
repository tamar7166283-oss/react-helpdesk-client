# 🎫 מערכת Helpdesk לניהול טיקטים

אפליקציה מתקדמת לניהול פניות במערכת Helpdesk, המאפשרת למשתמשים לפתוח טיקטים, למזכירים לטפל בהם ולמנהלים לנהל את כל המערכת.

## 📋 תיאור הפרויקט

מערכת Helpdesk מלאה הכוללת:
- **משתמש (Customer)** - פותח פניות ועוקב אחרי הטיפול בהן
- **מזכיר (Agent)** - מטפל בפניות שהוקצו אליו ומעדכן סטטוסים
- **מנהל (Admin)** - מנתב פניות, מנהל משתמשים ומקצה משימות

## 👥 תפקידי משתמשים והרשאות

### 🔵 Customer (לקוח)
- ✅ רואה **רק** את הטיקטים שהוא יצר
- ✅ יכול לפתוח טיקט חדש
- ✅ יכול להוסיף תגובות בטיקטים שלו
- ❌ לא יכול לשנות סטטוס או להקצות

### 🟢 Agent (מזכיר/טכנאי)
- ✅ רואה **רק** טיקטים שהוקצו אליו
- ✅ יכול לעדכן סטטוס טיקט
- ✅ יכול להוסיף תגובות
- ❌ לא יכול להקצות טיקטים למזכירים אחרים

### 🔴 Admin (מנהל)
- ✅ רואה את **כל** הטיקטים במערכת
- ✅ יכול לשנות סטטוסים
- ✅ יכול להקצות טיקטים ל־Agent ספציפי
- ✅ יכול ליצור משתמשים חדשים
- ✅ גישה מלאה לכל פעולות המערכת

## 🗺️ ניתובים (Routes)

| נתיב | תיאור | הרשאות נדרשות |
|------|-------|----------------|
| `/login` | מסך התחברות | כולם (לא מחובר) |
| `/signup` | מסך הרשמה | כולם (לא מחובר) |
| `/dashboard` | דף בית מותאם אישית | משתמש מחובר |
| `/tickets` | רשימת טיקטים | משתמש מחובר |
| `/tickets/new` | פתיחת טיקט חדש | **Customer בלבד** |
| `/tickets/:id` | פרטי טיקט + תגובות | משתמש מחובר |
| `/users` | ניהול משתמשים | **Admin בלבד** |
| `/*` | דף 404 | כולם |

### 🔒 Route Guards (הגנה על ניתובים)
- משתמש לא מחובר → הפניה אוטומטית ל־`/login`
- גישה למסכים מוגבלת לפי **role** (תפקיד)
- חסימה בצד הלקוח (React) + אימות בצד השרת

## 🛠️ טכנולוגיות

### Frontend
- **React 18** + **TypeScript**
- **Redux Toolkit** - ניהול State גלובלי
- **React Router v6** - ניתוב
- **Axios** - תקשורת עם השרת
- **SweetAlert2** - הודעות משתמש
- **Vite** - כלי Build מהיר

### Backend (מוכן מראש)
- **.NET Core API**
- **JWT Authentication**
- **Swagger** - תיעוד API
- [קישור לשרת](https://github.com/sarataber/helpdesk-api)

## 📦 התקנה והרצה

### שלב 1: שיבוט הפרויקט
```bash
git clone <repository-url>
cd react-project
```

### שלב 2: התקנת תלויות
```bash
npm install
```

### שלב 3: הרצת השרת (Backend)
```bash
# שיבוט השרת
git clone https://github.com/sarataber/helpdesk-api
cd helpdesk-api

# עקוב אחרי ההוראות בקובץ README של השרת
# השרת ירוץ כברירת מחדל על http://localhost:5000
```

### שלב 4: הרצת האפליקציה (Frontend)
```bash
npm run dev
```

האפליקציה תרוץ על: `http://localhost:5173`

## 🔐 משתמשי בדיקה

לאחר הרצת השרת, ניתן להשתמש במשתמשים הבאים (אם קיימים):

```
Customer:
Email: customer@test.com
Password: Customer123!

Agent:
Email: agent@test.com
Password: Agent123!

Admin:
Email: admin@test.com
Password: Admin123!
```

**או:** הירשם דרך מסך ההרשמה ובחר את התפקיד המתאים.

## 📂 מבנה הפרויקט

```
src/
├── components/          # קומפוננטות רכיבים
│   ├── AppRouter.tsx    # ניתובים
│   ├── ProtectedRoute.tsx  # הגנה על נתיבים
│   ├── Header.tsx       # כותרת עליונה
│   ├── TicketCard.tsx   # כרטיס טיקט
│   └── ...
├── pages/              # דפי האפליקציה
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx
│   ├── TicketsListPage.tsx
│   ├── TicketDetailsPage.tsx
│   ├── CreateTicketPage.tsx
│   ├── UsersPage.tsx
│   └── NotFoundPage.tsx
├── store/              # Redux Store
│   ├── store.ts
│   ├── authSlice.ts    # ניהול אימות
│   ├── ticketsSlice.ts # ניהול טיקטים
│   ├── usersSlice.ts   # ניהול משתמשים
│   └── commentsSlice.ts # ניהול תגובות
├── services/           # שירותי API
│   ├── api.ts          # Axios instance
│   ├── auth.service.ts
│   ├── tickets.service.ts
│   └── ...
├── types/              # הגדרות TypeScript
└── App.tsx             # קומפוננטת שורש
```

## 🎯 תכונות עיקריות

### ✨ ניהול אימות
- [x] התחברות עם JWT Token
- [x] הרשמה למערכת
- [x] התנתקות
- [x] שמירת Token ב-localStorage
- [x] Interceptor אוטומטי לכל בקשות ה-API

### 📊 ניהול טיקטים
- [x] יצירת טיקט חדש (Customer)
- [x] צפייה ברשימת טיקטים (לפי הרשאות)
- [x] פרטי טיקט מלאים
- [x] הוספת תגובות
- [x] עדכון סטטוס (Agent/Admin)
- [x] הקצאת טיקט ל-Agent (Admin)

### 👤 ניהול משתמשים
- [x] רשימת משתמשים (Admin)
- [x] יצירת משתמש חדש (Admin)
- [x] צפייה בפרטי משתמש

### 🔄 State Management
- [x] Redux Toolkit
- [x] ניהול מצב גלובלי: auth, tickets, users, comments
- [x] Async Thunks לפעולות אסינכרוניות

### 🎨 UX/UI
- [x] מצבי טעינה (Loading)
- [x] טיפול בשגיאות
- [x] הודעות "אין נתונים"
- [x] Route Guards
- [x] דף 404

## 🔄 תהליך עבודה טיפוסי

### כלקוח (Customer):
1. התחבר למערכת
2. לחץ על "טיקט חדש"
3. מלא את פרטי הבעיה
4. שלח טיקט
5. עקוב אחרי הסטטוס במסך הטיקטים שלך

### כמזכיר (Agent):
1. התחבר למערכת
2. צפה בטיקטים שהוקצו אליך
3. לחץ על טיקט לפרטים
4. עדכן סטטוס (בטיפול, נפתר וכו')
5. הוסף תגובה ללקוח

### כמנהל (Admin):
1. התחבר למערכת
2. צפה בכל הטיקטים
3. הקצה טיקט למזכיר מתאים
4. עקוב אחרי הביצועים
5. צור משתמשים חדשים במערכת

## 🚀 Scripts זמינים

```bash
npm run dev          # הרצה במצב פיתוח
npm run build        # בנייה לייצור
npm run preview      # תצוגה מקדימה של Build
npm run lint         # בדיקת קוד
```

## 📝 הערות חשובות

- **אין לשנות את השרת** - השרת ניתן מוכן והוא לא חלק מהפרויקט
- **JWT Token** - נשמר ב-localStorage ונשלח בכל בקשה
- **TypeScript** - כל הקוד כתוב עם typing מלא
- **Responsive** - המערכת מותאמת למובייל וטאבלט

## 🐛 בעיות נפוצות

### השרת לא מגיב
- ודא שהשרת רץ על `http://localhost:5000`
- בדוק ב-Swagger: `http://localhost:5000/swagger`

### Token expired
- התנתק והתחבר מחדש
- הסר את ה-localStorage: `localStorage.clear()`

### CORS Errors
- ודא שהשרת מאפשר requests מ-`http://localhost:5173`

## 👨‍💻 מפתחת

**שם:** [השם שלך]  
**מייל:** [המייל שלך]  
**GitHub:** [הלינק שלך]

## 📄 רישיון

פרויקט לימודי - React Course

---

**בהצלחה! 🚀**

לכל שאלה או בעיה, פתחו Issue ב-GitHub