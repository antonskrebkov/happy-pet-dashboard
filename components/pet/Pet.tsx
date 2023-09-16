"use client";

import { FC, useState } from "react";
import styles from "./Pet.module.scss";
import Image from "next/image";
import { IFriend } from "@/interfaces/IFriend";
import { useRouter } from "next/navigation";
import trash from "/public/trash.svg";
import edit from "/public/edit.svg";
import editActive from "/public/edit-active.svg";
import { friendsAPI } from "@/services/Friends.service";
import { IApplication } from "@/interfaces/IApplication";
import { ICategory } from "@/interfaces/ICategory";
import { capitalize, capitalizeInPlural } from "@/utils/categories";
import DotsLoader from "@/components/dots-loader/DotsLoader";
import { validateImageURL } from "@/utils/validation";
import { useSession } from "next-auth/react";

interface PetProps {
  pet: IFriend;
  applications: IApplication[];
  categories: ICategory[];
}

interface IApplicant {
  name: string;
  email: string;
  phone: string;
  city: string;
  age: string;
  date: string;
}

const Pet: FC<PetProps> = ({ pet, applications, categories }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [deletePet] = friendsAPI.useDeleteFriendMutation();
  const [updatePet, { isLoading }] = friendsAPI.useUpdateFriendMutation();

  const applicants: IApplicant[] = [];

  const [updatedPet, setUpdatedPet] = useState<IFriend>(pet);
  const [refactorMode, setRefactorMode] = useState<boolean>(false);
  const [imageInput, setImageInput] = useState("");
  const [imageLinks, setImageLinks] = useState<string[]>([
    ...updatedPet.images,
  ]);
  const [isLinkWrong, setIsLinkWrong] = useState<boolean>(false);

  for (let i = 0; i < applications.length; i++) {
    const friends = applications[i].friends;
    for (let j = 0; j < friends.length; j++) {
      if (friends[j].id === pet.id) {
        applicants.push({
          name: `${applications[i].firstName} ${applications[i].surname}`,
          email: applications[i].email,
          phone: applications[i].phone,
          city: applications[i].city,
          age: applications[i].age,
          date: applications[i].date,
        });
      }
    }
  }

  const handleAddImageLink = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateImageURL(imageInput)) {
      setIsLinkWrong(false);
      setImageLinks([...imageLinks, imageInput]);
      setImageInput("");
    } else {
      setIsLinkWrong(true);
    }
  };

  const handleDeleteImageLink = (index: number) => {
    setImageLinks((prevArray) => prevArray.filter((_, i) => i !== index));
  };

  const handleSelectChange = (e: any) => {
    categories.forEach((category) => {
      if (category.titleEN === e.target.value) {
        setUpdatedPet({
          ...updatedPet,
          category: e.target.value,
          categoryUA: category.titleUA,
        });
      }
    });
  };

  const handleDeletePet = () => {
    deletePet(pet);
    router.back();
  };

  const handleUpdatePet = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await updatePet({
      ...updatedPet,
      ageStatus: updatedPet.age >= 12 ? "adult" : "kid",
      sexUA: updatedPet.sex === "male" ? "він" : "вона",
      images: imageLinks,
    });
    router.refresh();
  };

  return (
    <div className={styles.main}>
      <div className={styles.handlers}>
        <button className={styles.back} onClick={() => router.back()}>
          Back to list
        </button>
        {session?.user?.name === "Admin" && (
          <div className={styles.handlersWrapper}>
            <button
              className={
                refactorMode
                  ? `${styles.handler} ${styles.active}`
                  : styles.handler
              }
              onClick={() => {
                setRefactorMode(!refactorMode);
              }}
            >
              <Image src={refactorMode ? editActive : edit} alt="" />
            </button>
            <button className={styles.handler} onClick={handleDeletePet}>
              <Image src={trash} alt="" />
            </button>
          </div>
        )}
      </div>
      <div className={styles.pet}>
        {pet &&
          (refactorMode ? (
            <>
              <h1 className={styles.petTitle}>Edit pet</h1>
              <form className={styles.form}>
                <input
                  className={styles.formInput}
                  type="text"
                  placeholder="Name"
                  value={updatedPet.name}
                  onChange={(e) =>
                    setUpdatedPet({ ...updatedPet, name: e.target.value })
                  }
                />
                <input
                  className={styles.formInput}
                  type="text"
                  placeholder="Name UA"
                  value={updatedPet.nameUA}
                  onChange={(e) =>
                    setUpdatedPet({ ...updatedPet, nameUA: e.target.value })
                  }
                />
                <select
                  className={styles.formSelect}
                  placeholder="Category"
                  value={updatedPet.category}
                  onChange={(e) => handleSelectChange(e)}
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  {categories &&
                    categories.map((category) => (
                      <option value={category.titleEN} key={category.id}>
                        {capitalizeInPlural(category.titleEN)}
                      </option>
                    ))}
                </select>
                <input
                  className={styles.formInput}
                  type="text"
                  disabled
                  placeholder="Category UA"
                  value={capitalize(updatedPet.categoryUA)}
                />
                <label>
                  <span>Age (month): </span>
                  <input
                    className={styles.formInput}
                    type="number"
                    placeholder="Age"
                    value={updatedPet.age}
                    onChange={(e) =>
                      setUpdatedPet({ ...updatedPet, age: +e.target.value })
                    }
                  />
                </label>
                <select
                  className={styles.formSelect}
                  placeholder="Sex"
                  value={updatedPet.sex}
                  onChange={(e) =>
                    setUpdatedPet({ ...updatedPet, sex: e.target.value })
                  }
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <textarea
                  className={styles.formText}
                  placeholder="Short description"
                  value={updatedPet.shortDescription}
                  onChange={(e) =>
                    setUpdatedPet({
                      ...updatedPet,
                      shortDescription: e.target.value,
                    })
                  }
                />
                <textarea
                  className={styles.formText}
                  placeholder="Short description UA"
                  value={updatedPet.shortDescriptionUA}
                  onChange={(e) =>
                    setUpdatedPet({
                      ...updatedPet,
                      shortDescriptionUA: e.target.value,
                    })
                  }
                />
                <textarea
                  className={styles.formText}
                  placeholder="Description"
                  value={updatedPet.description}
                  onChange={(e) =>
                    setUpdatedPet({
                      ...updatedPet,
                      description: e.target.value,
                    })
                  }
                />
                <textarea
                  className={styles.formText}
                  placeholder="Description UA"
                  value={updatedPet.descriptionUA}
                  onChange={(e) =>
                    setUpdatedPet({
                      ...updatedPet,
                      descriptionUA: e.target.value,
                    })
                  }
                />
                <label>
                  <span>Price (UAH): </span>
                  <input
                    className={styles.formInput}
                    type="number"
                    placeholder="Price (UAH)"
                    value={updatedPet.price}
                    onChange={(e) =>
                      setUpdatedPet({ ...updatedPet, price: +e.target.value })
                    }
                  />
                </label>
                <label className={styles.formLabelCheckbox}>
                  <input
                    className={styles.formCheckbox}
                    type="checkbox"
                    checked={updatedPet.wc}
                    onChange={() =>
                      setUpdatedPet({ ...updatedPet, wc: !updatedPet.wc })
                    }
                  />
                  <span>WC</span>
                </label>
                <div className={styles.formImageLinksBox}>
                  <input
                    className={
                      isLinkWrong
                        ? `${styles.formInput} ${styles.error}`
                        : styles.formInput
                    }
                    type="text"
                    placeholder="Image link (imgur)"
                    value={imageInput}
                    onChange={(e) => setImageInput(e.target.value)}
                  />
                  <button
                    className={
                      isLinkWrong
                        ? `${styles.formAddLink} ${styles.error}`
                        : styles.formAddLink
                    }
                    onClick={(e) => handleAddImageLink(e)}
                  >
                    Add
                  </button>
                </div>
                {imageLinks.length ? (
                  <ul className={styles.formImageList}>
                    {imageLinks.map((image, index) => (
                      <li className={styles.formImageItem} key={image}>
                        <div>{image}</div>
                        <button
                          className={styles.formDeleteLink}
                          onClick={() => handleDeleteImageLink(index)}
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  ""
                )}
                <button
                  onClick={handleUpdatePet}
                  className={
                    isLoading
                      ? `${styles.formCreate} ${styles.loading}`
                      : styles.formCreate
                  }
                >
                  {isLoading ? <DotsLoader /> : "Update"}
                </button>
              </form>
            </>
          ) : (
            <>
              <h1 className={styles.petTitle}>{pet.name}</h1>
              <ul className={styles.petItems}>
                <li className={styles.petItem}>
                  <span>Category: </span>
                  {pet.category}
                </li>
                <li className={styles.petItem}>
                  <span>Age: </span>
                  {pet.age}
                </li>
                <li className={styles.petItem}>
                  <span>Description: </span>
                  {pet.description}
                </li>
                <li className={styles.petItem}>
                  <span>Price: </span>
                  {pet.price}
                </li>
                <li className={styles.petItem}>
                  <span>Sex: </span>
                  {pet.sex}
                </li>
                <li className={styles.petItem}>
                  <span>WC: </span>
                  {pet.wc ? "Yes" : "No"}
                </li>
              </ul>
              <div>
                <h2 className={styles.petGallery}>Gallery</h2>
                <ul className={styles.petGalleryItems}>
                  {pet.images.map((image) => (
                    <li key={image} className={styles.petGalleryItem}>
                      <img
                        className={styles.petGalleryImg}
                        src={image}
                        alt=""
                      />
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className={styles.petApplicants}>Applicants</h2>
                <ul className={styles.petApplicantsItems}>
                  {applicants.length
                    ? applicants.map((applicant, index) => (
                        <li className={styles.petApplicantsItem} key={index}>
                          <p className={styles.petApplicantsText}>
                            <span>{applicant.name}</span> ({applicant.age})
                          </p>
                          <a
                            href={"mailto:" + applicant.email}
                            className={styles.petApplicantsLink}
                          >
                            {applicant.email}
                          </a>
                          <a
                            href={"tel:" + applicant.phone}
                            className={styles.petApplicantsLink}
                          >
                            {applicant.phone}
                          </a>
                          <p className={styles.petApplicantsText}>
                            {applicant.city}
                          </p>
                          <p className={styles.petApplicantsDate}>
                            {applicant.date}
                          </p>
                        </li>
                      ))
                    : "Applicants list is empty"}
                </ul>
              </div>
            </>
          ))}
      </div>
    </div>
  );
};

export default Pet;
