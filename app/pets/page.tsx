import { FC } from "react";
import Pets from "@/components/pets/Pets";
import { getCategories, getPets } from "@/services/getData.service";

const PetsPage: FC = async () => {
  const pets = await getPets();
  const categories = await getCategories();

  return <Pets data={pets.reverse()} categories={categories} />;
};
export default PetsPage;
