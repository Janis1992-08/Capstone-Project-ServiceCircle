import GlobalStyle from '../styles';
import useLocalStorageState from "use-local-storage-state"; 
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; 

export default function MyApp({ Component, pageProps }) {

  

  const initialFormData = {
    firstName: '',
    lastName: '',
    skills: '',
    needs: '',
    email: '',
    phone: '',
    category: '',
    subcategory: '',
  };

  const [formData, setFormData] = useState({ ...initialFormData }); 
  const [serviceCards, setServiceCards] = useLocalStorageState("serviceCards", { defaultValue: [] });

  const handleChange = (event) => {
    const { name, value } = event.target; 
    setFormData({ ...formData, [name]: value }); 
  };

  useEffect(() => {
    const newServiceCard = { ...formData, id: uuidv4() };
    setServiceCards((prevServiceCards) => [...prevServiceCards, newServiceCard]);
  }, [formData, setServiceCards]);

  const resetForm = () => {
    setFormData({ ...initialFormData });
  };
  
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} serviceCards={serviceCards} handleChange={handleChange} formData={formData} resetForm={resetForm} />
    </>
  );
}
