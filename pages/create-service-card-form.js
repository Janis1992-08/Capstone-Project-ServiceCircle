import styled from "styled-components";
import { categories } from "@/lib/data";
import Link from "next/link";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 20px;
`;

const InputField = styled.input`
  display: flex;
  flex-direction: column;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  overflow: hidden;
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

const Headline = styled.a`
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

export default function CreateServiceCardForm({ onAddServiceCard }) {
  const initialFormData = {
    firstName: "",
    lastName: "",
    skills: "",
    needs: "",
    email: "",
    phone: "",
    category: "",
    subcategory: "",
  };

  const [formData, setFormData] = useState({ ...initialFormData });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newServiceCard = { ...formData, id: uuidv4() };
    onAddServiceCard(newServiceCard);

    const toastMessage = `The Service Card is created and you can find it in the assigned subcategory: ${formData.subcategory}`;
    alert(toastMessage);

    resetForm();
  };

  const resetForm = () => {
    setFormData({ ...initialFormData });
  };

  return (
    <>
      <Link href="/">
        <Headline>&larr; Back to Categories</Headline>
      </Link>

      <FormWrapper onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name: </label>
        <InputField
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={(event) => handleChange(event)}
          required
          minLength={3}
          maxLength={15}
        />
        <label htmlFor="lastName">Last Name: </label>
        <InputField
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={(event) => handleChange(event)}
          required
          minLength={3}
          maxLength={15}
        />
        <label htmlFor="skills">Skills: </label>
        <InputField
          type="text"
          id="skills"
          name="skills"
          value={formData.skills}
          onChange={(event) => handleChange(event)}
          required
          minLength={3}
          maxLength={15}
        />

        <label htmlFor="needs">Needs: </label>
        <InputField
          type="text"
          id="needs"
          name="needs"
          value={formData.needs}
          onChange={(event) => handleChange(event)}
          required
          minLength={3}
          maxLength={15}
        />

        <label htmlFor="email">Email: </label>
        <InputField
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={(event) => handleChange(event)}
          required
        />

        <label htmlFor="phone">Phone: </label>
        <InputField
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={(event) => handleChange(event)}
          required
        />

        <SelectField
          name="category"
          onChange={(event) => handleChange(event)}
          required
          value={formData.category}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </SelectField>

        <SelectField
          name="subcategory"
          onChange={(event) => handleChange(event)}
          required
        >
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
      </FormWrapper>
    </>
  );
}
