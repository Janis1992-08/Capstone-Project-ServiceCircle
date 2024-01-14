const subcategoryColors = {
    "Web Development": "#ff6666", // أحمر
    "Graphic Design": "#3498db", // أخضر
    "Coding-Assistance": "#2ecc71", // أزرق
    "Plumbing": "#9b59b6", // مغنتا
    "Electrical": "#f1c40f", // سماوي
    "Cleaning": "#e67e22", // أصفر
    "English": "#1abc9c", // لون أخضر سماوي لفئة English
  "Spanish": "#ecf0f1", // لون برتقالي لفئة Spanish
  "French": "#95a5a6", // لون برتقالي غامق لفئة French
  "Fitness Training": "#16a085", // لون أزرق لفئة Fitness Training
  "Nutrition Consultation": "#27ae60", // لون أخضر فاتح لفئة Nutrition Consultation
  "Mental Health Support": "#2980b9", // لون بنفسجي لفئة Mental Health Support
  "Music Lessons": "#8e44ad", // لون أخضر سماوي لفئة Music Lessons
  "Art Classes": "#d35400", // لون برتقالي لفئة Art Classes
  "Photography Services": "#c0392b",
  };
  
  export const getColorForSubcategory = (subcategory) => {
    return subcategoryColors[subcategory] || "#cccccc";
  };