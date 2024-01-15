import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  body: '#FFF',
  text: '#363537',
  headerColor: '#333',
  
  subcategoryColors: {
  "Web Development": "#987654",
  "Graphic Design": "#8B4513", 
  "Coding-Assistance": "#A52A2A", 
  "Plumbing": "#228B22", 
  "Electrical": "#32CD32",
  "Cleaning": "#008000", 
  "English": "#87CEEB", 
  "Spanish": "#4169E1", 
  "French": "#004880",
  "Fitness Training": "#DC143C", 
  "Nutrition Consultation": "#FF4500", 
  "Mental Health Support": "#FF0000", 
  "Music Lessons": "#FFA500", 
  "Art Classes": "#FF8C00", 
  "Photography Services": "#FFD700",
}};

export const darkTheme = {
  body: '#363537',
  text: '#FAFAFA',
  headerColor: '#333',
  subcategoryColors: {
  "Web Development": "#987654", 
  "Graphic Design": "#8B4513", 
  "Coding-Assistance": "#A52A2A", 
  "Plumbing": "#228B22", 
  "Electrical": "#32CD32",
  "Cleaning": "#008000", 
  "English": "#87CEEB", 
  "Spanish": "#4169E1", 
  "French": "#004880",
  "Fitness Training": "#DC143C", 
  "Nutrition Consultation": "#FF4500", 
  "Mental Health Support": "#FF0000", 
  "Music Lessons": "#FFA500", 
  "Art Classes": "#FF8C00", 
  "Photography Services": "#FFD700",
}};

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
  }

   h2 {
    color: ${(props) => props.theme.headerColor};
  }
`;