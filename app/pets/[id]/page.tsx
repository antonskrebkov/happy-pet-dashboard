import { FC } from "react";
import Pet from "@/components/pet/Pet";
import {
  getApplications,
  getCategories,
  getPetById,
  getPets,
} from "@/services/getData.service";
import { IFriend } from "@/interfaces/IFriend";

interface PetPageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  const pets: IFriend[] = await getPets();

  return pets.map((pet) => ({
    slug: pet.id,
  }));
}

const PetPage: FC<PetPageProps> = async ({ params: { id } }) => {
  const pet = await getPetById(id);
  const applications = await getApplications();
  const categories = await getCategories();

  return (
    <Pet
      pet={pet}
      applications={applications.reverse()}
      categories={categories.reverse()}
    />
  );
};
export default PetPage;
