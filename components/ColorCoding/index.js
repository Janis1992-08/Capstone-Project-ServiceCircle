const subcategoryColors = {
    "Web Development": "white",
    
  };
  
  export const getColorForSubcategory = (subcategory) => {
    return subcategoryColors[subcategory] || "#cccccc";
  };