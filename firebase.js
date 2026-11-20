rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // מנהל מחובר ב-Firebase Auth מקבל גישה מלאה להכל
    function isAdmin() {
      return request.auth != null;
    }

    // הגדרות העגלה והתפריט: פתוח לקריאה לכולם, עריכה רק למנהל
    match /config/{document=**} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // קודי אימות OTP (מנוהלים ע"י השרת והאימות)
    match /coffee_otps/{email} {
      allow read, write: if true;
    }

    // פרופילי לקוחות
    match /coffee_users/{email} {
      allow read, write: if true;
    }

    // רשימת חסומים: קריאה ללקוח לבדיקת BanGuard, עריכה רק למנהל
    match /blocked_users/{userId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // הזמנות והתראות הגעה
    match /orders/{orderId} {
      allow read, create, update: if true;
      allow delete: if isAdmin();
    }

    match /arrival_alerts/{alertId} {
      allow read, create: if true;
      allow delete: if isAdmin();
    }
  }
}