export const serviceProviders = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    skills: "HTML, CSS, JavaScript",
    needs: "UI/UX Design",
    email: "john@example.com",
    phone: "123-456-7890",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    skills: "React, Node.js, MongoDB",
    needs: "API Integration",
    email: "jane@example.com",
    phone: "987-654-3210",
  },
  {
    id: 3,
    firstName: "Mike",
    lastName: "Johnson",
    skills: "Angular, TypeScript, Firebase",
    needs: "Performance Optimization",
    email: "mike@example.com",
    phone: "555-123-4567",
  },
  {
    id: 4,
    firstName: "Sarah",
    lastName: "Williams",
    skills: "Vue.js, SASS, GraphQL",
    needs: "Responsive Design",
    email: "sarah@example.com",
    phone: "222-333-4444",
  },
  {
    id: 5,
    firstName: "David",
    lastName: "Brown",
    skills: "Python, Django, PostgreSQL",
    needs: "Database Architecture",
    email: "david@example.com",
    phone: "666-999-7777",
  },
];

/* export const categories = [
  {
    id: 1,
    name: "Technology & IT",
    subcategories: ["Web Development", "Graphic Design", "Coding Assistance"],
  },
  {
    id: 2,
    name: "Home Services",
    subcategories: ["Plumbing", "Electrical", "Cleaning"],
  },
  {
    id: 3,
    name: "Language Exchange",
    subcategories: ["English", "Spanish", "French"],
  },
];

export const subcategories = [
  { id: 1, name: "Web Development", providers: [] },
  { id: 2, name: "Graphic Design", providers: [] },
  { id: 3, name: "Coding Assistance", providers: [] },
]; */

export const categories = [
  {
    id: 1,
    name: "Technology & IT",
    subcategories: [
      { id: "1", name: "Web Development", providers: [] },
      { id: "2", name: "Graphic Design", providers: [] },
      { id: "3", name: "Coding Assistance", providers: [] },
    ],
  },
  {
    id: 2,
    name: "Home Services",
    subcategories: [
      { id: "4", name: "Plumbing", providers: [] },
      { id: "5", name: "Electrical", providers: [] },
      { id: "6", name: "Cleaning", providers: [] },
    ],
  },
  {
    id: 3,
    name: "Language Exchange",
    subcategories: [
      { id: "7", name: "English", providers: [] },
      { id: "8", name: "Spanish", providers: [] },
      { id: "9", name: "French", providers: [] },
    ],
  },
];
