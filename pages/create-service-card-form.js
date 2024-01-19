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

const Header = styled.header`
  background-color: #f0f0f0;
  padding: 10px;
  text-align: flex-start;
  border-bottom: 1px solid #ccc;
  margin-left: -10px;
  margin-right: -30px;
  margin-top: -10px;
`;

const Headline = styled.p`
  display: inline-block;
  border-radius: 5px;
  font-size: 1.5rem;
  font-weight: bold;
  color: black;
  text-decoration: none;
  margin-left: 0;
  margin-bottom: 20px;
  margin-top: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0077dd;
  }
`;

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

export default function CreateServiceCardForm({}) {
  const [formData, setFormData] = useState(initialFormData);
  const router = useRouter();
  const { data: session, status } = useSession();

  const { mutate } = useSWR("/api/providers/");

  if (status === "unauthenticated") {
    router.push("/");
    return null;
  }

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

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
      <Header>
        <Link href="/">
          <Headline>&larr; Back to Categories</Headline>
        </Link>
      </Header>

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
