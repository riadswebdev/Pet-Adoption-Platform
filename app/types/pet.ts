export interface Pet {
  _id: string;
  petName: string;
  breed: string;
  category: string;
  age: string;
  gender: string;
  weight: string;
  color: string;
  location: string;
  adoptionFee: number;
  adoptionStatus: "Available" | "Pending" | "Adopted";
  vaccinated: boolean;
  neutered: boolean;
  healthCondition: string;
  userName: string;
  userEmail: string;
  shortDescription: string;
  description: string;
  images: string[];
  createdAt: string;
}
