import styled from "styled-components";
import { categories } from "@/lib/data";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

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

const Headline = styled.h3`
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

const initialFormData = {
  firstName: "",
  lastName: "",
  skills: "",
  needs: "",
  email: "",
  phone: "",
  city: "",
  district: "",
  postalCode: "",
  category: "",
  subcategory: "",
};

export default function CreateServiceCardForm({}) {
  const [formData, setFormData] = useState(initialFormData);
  const router = useRouter();
  const { data: session, status } = useSession();

  const { mutate } = useSWR("/api/providers/");

  if (status === "unauthenticated") {
    router.push("/");
    return null;
  }
  console.log(status);
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
console.log(initialFormData);
  const handleAddServiceCards = async (formData) => {
    const response = await fetch("/api/providers/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      mutate();

      alert(
        `The Service Card is created and you can find it in the assigned subcategory: ${formData.subcategory}`
      );
    } else {
      throw new Error(`Error: ${response.statusText}`);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await handleAddServiceCards(formData);
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error:", error.message);
    }
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
          maxLength={50}
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
          maxLength={50}
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

        <label htmlFor="city">City: </label>
        <InputField
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={(event) => handleChange(event)}
          required
        />

        <label htmlFor="district">District: </label>
        <InputField
          type="text"
          id="district"
          name="district"
          value={formData.district}
          onChange={(event) => handleChange(event)}
          required
        />

        <label htmlFor="postalCode">Postal Code: </label>
        <InputField
          type="text"
          id="postalCode"
          name="postalCode"
          value={formData.postalCode}
          onChange={(event) => handleChange(event)}
          minLength={4}
          maxLength={5}
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
