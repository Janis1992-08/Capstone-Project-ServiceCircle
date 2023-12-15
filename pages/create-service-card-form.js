import { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid'; 
import { categories } from '@/lib/data';
import ServiceProvider from '../components/ServiceCard/index';
import Link from 'next/link';

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 20px;
`;

const InputField = styled.input`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const SelectField = styled.select`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 8px 15px;
  border-radius: 5px;
  border: none;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
`;

const BackLink = styled.a`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  margin-bottom: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;


export default function CreateServiceCardForm() {
  
  // Initalisieren des anfänglichen Zustandes des Formulars bzw. der einzelnen Eingabefelder.
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

  const [formData, setFormData] = useState({ ...initialFormData }); // Zustand des Formulars ist hiermit leer.
  const [serviceCards, setServiceCards] = useState([]); // Hier werden die ServiceCards gespeichert. Alte + Neue.
  

  const handleChange = (event) => {
    const { name, value } = event.target; // name z.B. firstName und der tatsächlich eingegebene Value wie z.b. Joe werden hier destrukturiert auf das Ereignis "Eingabe".
    setFormData({ ...formData, [name]: value }); // Kopie der bestehenden Eingaben + neuer Value im nächsten name InputField führt zu dem neuen formData Zustand.
  };


  const handleSubmit = (event) => {
  event.preventDefault();
  
  const newServiceCard = { ...formData, id: uuidv4() };
  setServiceCards([...serviceCards, newServiceCard]);
  setFormData({ ...initialFormData });
  
  const toastMessage = `The Service Card is created and you can find it in the assigned subcategory: ${formData.subcategory}`;
  alert(toastMessage);
};


  return (
    <>
    <Link href="/">
        <BackLink>&larr; Back to Categories</BackLink>
      </Link>
      
    <FormWrapper onSubmit={handleSubmit}>
      
        <label htmlFor="firstName">First Name: </label>
        <InputField
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <label htmlFor="lastName">Last Name: </label>
        <InputField
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <label htmlFor="skills">Skills: </label>
        <InputField
          type="text"
          id="skills"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          required
        />
      
  
        <label htmlFor="needs">Needs: </label>
        <InputField
          type="text"
          id="needs"
          name="needs"
          value={formData.needs}
          onChange={handleChange}
          required
        />
      
        <label htmlFor="email">Email: </label>
        <InputField
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      
        <label htmlFor="phone">Phone: </label>
        <InputField
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      
      <SelectField name="category" onChange={handleChange} required>
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </SelectField>

      <SelectField name="subcategory" onChange={handleChange} required>
        <option value="">Select Subcategory</option>
        {formData.category &&
          categories
            .find((cat) => cat.id === parseInt(formData.category))
            ?.subcategories.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.name}>
                {subcategory.name}
              </option>
            ))}
      </SelectField>

      <Button type="submit"> Create Service Card</Button>

      {serviceCards.map((card) => (
        <ServiceProvider
          key={card.id}
          firstName={card.firstName}
          lastName={card.lastName}
          skills={card.skills}
          needs={card.needs}
          email={card.email}
          phone={card.phone}
        />
      ))}
      
    </FormWrapper>
    </>
  );
}