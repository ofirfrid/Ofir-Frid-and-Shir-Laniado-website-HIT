function startApp() {
// הגדרת ערך שדות הקלט והתצוגה
    const projectNameInput = document.getElementById("projectName"); // שדה הקלט של המשתמש
    const screenProjectTitle = document.getElementById("screenProjectTitle"); // התצוגה בפועל
    const devRadios = document.querySelectorAll('input[name="devType"]'); // שמירת כל ההערכים של הרדיו והגדרה שלהם כמערך, קליטה אם רוצה מחשב או טלפון
    const compBox = document.getElementById("computerScreenBox");
    const phoneBox = document.getElementById("phoneScreenBox");
    const deviceLabel = document.getElementById("deviceLabel"); // יהיה לשינוי של הטקסט של - לא נבחר מוצר
    const boxSimulatorView = document.querySelector(".boxSimulatorView");

// אלמנטים לכפתור ולסטטוס
    const btnSubmit = document.getElementById("btnSubmit");
    const statusMsg = document.getElementById("status");

// הגדרת תיבות הסימון
    const chkVideo = document.getElementById("video");
    const chkQuiz = document.getElementById("quiz");
    const chkAnimation = document.getElementById("animation");
    const chkAccess = document.getElementById("access");

// הגדרת תגיות התמונות
    const featVideo = document.getElementById("featureVideo");
    const featQuiz = document.getElementById("featureQuiz");
    const featAnim = document.getElementById("featureAnimation");
    const featAccess = document.getElementById("featureAccess");

// פונקציה להדגשה והחזרה לשקיפות חלקית בעת שינוי סימון
function toggleFeature(checkbox, element) {
    if (checkbox.checked) {
        element.classList.add("active"); // הדגשת התמונה
    } else {
        element.classList.remove("active"); // החזרה למצב שקיפות חלקית
    }
}
// פונקציה לבדיקת תקינות הטופס והפעלת הכפתור
function checkFormValidity() {
    // בדיקה אם אחד מ-4 כפתורי הרדיו נבחר
    const isDeviceSelected = document.getElementById("compCourse").checked ||
        document.getElementById("phoneCourse").checked ;

    // בדיקה שאורך שם הפרויקט גדול מ-0 (אחרי ניקוי רווחים מיותרים)
    const isNameFilled = projectNameInput.value.trim().length > 0;

    if (isDeviceSelected && isNameFilled) {
        btnSubmit.disabled = false;
        btnSubmit.classList.remove("notActive");
        statusMsg.textContent = "הטופס מוכן! אפשר לבנות את התוצר.";
    } else {
        btnSubmit.disabled = true;
        btnSubmit.classList.add("notActive");
        statusMsg.textContent = "יש למלא שם ולבחור סוג תוצר כדי להמשיך.";
    }
}
    
// עדכון טקסט השם ובדיקת אורך בזמן אמת
projectNameInput.addEventListener("input", function () {
    if (this.value.length > 14) {
        alert("שגיאה: מותר להקליד עד 14 תווים בלבד!");
        this.value = this.value.substring(0, 14);
    }
    screenProjectTitle.textContent = this.value;
    checkFormValidity(); // בדיקת תקינות בזמן הקלדה
});

// // מעבר בלולאה מה נלחץ בכל רגע - ותנאי לתוצאה - אם מחשב נלחץ שיוסתר הטלפון וההפך
// // הלולאה עוברת כפתור אחר כפתור בעזרת הקידום של i++, ומגדירה על כל כפתור רדיו בנפרד (devRadios[i]): "ברגע שהמשתמש יבחר בך ותשתנה הבחירה (change), הפעל את הפונקציה שמעדכנת ומחליפה את תמונת המסך בהתאם"
for (let i = 0; i < devRadios.length; i++) { // האופציה ההתחלתית- האופציה הראשונה, אם הבחירה נמצאת באופציה שקטנה ממספר המקומות במערך
    devRadios[i].addEventListener("change", function () { // פניה לאיבר במערך במקום i - ומחכה עד שהוא ישתנה, ברגע שמשתנה מופעלת פונקציה עם פונקציית if
        if (this.value === "comp") { // אם נבחר מחשב - תהפוך את התמונה של המחשב לshow ואת הטלפון ל- hide ותגיד שנבחר מחשב
            compBox.classList.remove("hide");
            compBox.classList.add("show");
            phoneBox.classList.remove("show");
            phoneBox.classList.add("hide");
            boxSimulatorView.classList.remove("isPhone");
            deviceLabel.innerHTML = "נבחר מסך מחשב";
        } else if (this.value === "phone") { // אם נבחר מחשב - תהפוך את התמונה של הטלפון לshow ואת המחשב ל- hide ותגיד שנבחר טלפון
            phoneBox.classList.remove("hide");
            phoneBox.classList.add("show");
            compBox.classList.remove("show");
            compBox.classList.add("hide");
            boxSimulatorView.classList.add("isPhone");
            deviceLabel.innerHTML = "נבחר מסך טלפון";
        }
        checkFormValidity();
    });
}

// בדיקה (האזנה) לתיבות הסימון של התוספות
chkVideo.addEventListener("change", function () {toggleFeature(chkVideo, featVideo);
});
chkQuiz.addEventListener("change", function () {toggleFeature(chkQuiz, featQuiz);
});
chkAnimation.addEventListener("change", function () {toggleFeature(chkAnimation, featAnim);
});
chkAccess.addEventListener("change", function () {toggleFeature(chkAccess, featAccess);
});
}

const popup = document.getElementById("message");
function openPopup() { // פונקציה לפתיחת החלונית
    const projectName = document.getElementById("projectName").value;
    let selectedDev = "לא נבחר";
    if (document.getElementById("compCourse").checked) {
        selectedDev = "לומדה למחשב";
    } else if (document.getElementById("phoneCourse").checked) {
        selectedDev = "לומדה לטלפון";

    }

// איסוף התוספות שסומנו
    let featuresList = [];
    if (document.getElementById("video").checked) {
        featuresList.push("סרטון");
    }
    if (document.getElementById("quiz").checked) {
        featuresList.push("שאלון אינטראקטיבי");
    }
    if (document.getElementById("animation").checked) {
        featuresList.push("אנימציה");
    }
    if (document.getElementById("access").checked) {
        featuresList.push("רכיבי נגישות");
    }

// בדיקה האם סומנו תוספות או לא
    let featuresText = "ללא תוספות"; // הברירת מחדל זה שאין תוספות
    if (featuresList.length > 0) { // אבל אם בסעיף הקודם משהו נבחר (זה מעל 0) אז-
        featuresText = featuresList.join(", "); // תשנה את featuresList לחיבור של כל מה שנבחר - ותפריד ביניהם עם ,
    }

// בניית המשפט והזרקתו לפסקה שבתוך החלונית
    const summaryElement = document.getElementById("summary");
    summaryElement.innerHTML = "התוצר שנבחר הוא " + selectedDev + ", בשם " + projectName + ", והוא מכיל: " + featuresText + ".";
    popup.classList.remove("hidden"); // מוחק את ההסתרה
    popup.style.display = "block"; // מציג את החלונית על המסך
}

// פונקציה לסגירת החלונית
function closePopup() {
    popup.classList.add("hidden"); // מחזיר את ההסתרה
    popup.style.display = "none"; // מעלים אותה
}
