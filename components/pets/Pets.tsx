"use client";

import { FC, useEffect, useRef, useState } from "react";
import styles from "./Pets.module.scss";
import Link from "next/link";
import { IFriend } from "@/interfaces/IFriend";
import { formatPrice } from "@/utils/price";
import { friendsAPI } from "@/services/Friends.service";
import DotsLoader from "@/components/dots-loader/DotsLoader";
import { ICategory } from "@/interfaces/ICategory";
import { capitalize, capitalizeInPlural } from "@/utils/categories";
import { validateImageURL } from "@/utils/validation";
import Search from "@/components/search/Search";

interface PetsProps {
  data: IFriend[];
  categories: ICategory[];
}

const Pets: FC<PetsProps> = ({ data, categories }) => {
  const [pets, setPets] = useState<IFriend[]>(data);

  const [searchFriends, { isLoading: isSearchLoading }] =
    friendsAPI.useSearchFriendMutation();

  const [listActive, setListActive] = useState<boolean>(true);

  const [imageInput, setImageInput] = useState("");
  const [imageLinks, setImageLinks] = useState<string[]>([]);
  const [newPet, setNewPet] = useState<IFriend>({
    age: 0,
    nameUA: "",
    name: "",
    shortDescriptionUA: "",
    shortDescription: "",
    descriptionUA: "",
    description: "",
    categoryUA: "",
    category: "",
    price: 0,
    sex: "male",
    wc: false,
  } as IFriend);

  const [isLinkWrong, setIsLinkWrong] = useState<boolean>(false);

  const [addFriend, { isLoading }] = friendsAPI.useAddFriendMutation();

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

  const handleCreateFriend = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await addFriend({
      ...newPet,
      ageStatus: newPet.age >= 12 ? "adult" : "kid",
      sexUA: newPet.sex === "male" ? "він" : "вона",
      images: imageLinks,
    });

    setNewPet({
      age: 0,
      nameUA: "",
      name: "",
      shortDescriptionUA: "",
      shortDescription: "",
      descriptionUA: "",
      description: "",
      categoryUA: "",
      category: "",
      price: 0,
      sex: "male",
      wc: false,
    } as IFriend);
    setImageLinks([]);
  };

  const handleSelectChange = (e: any) => {
    categories.forEach((category) => {
      if (category.titleEN === e.target.value) {
        setNewPet({
          ...newPet,
          category: e.target.value,
          categoryUA: category.titleUA,
        });
      }
    });
  };

  return (
    <div className={styles.main}>
      <div className={styles.tabs}>
        <div
          className={listActive ? `${styles.tab} ${styles.active}` : styles.tab}
          onClick={() => setListActive(true)}
        >
          List
        </div>
        <div
          className={
            !listActive ? `${styles.tab} ${styles.active}` : styles.tab
          }
          onClick={() => setListActive(false)}
        >
          Create
        </div>
      </div>
      <div className={styles.pets}>
        {listActive ? (
          <div className={styles.petsWrapper}>
            <h1 className={styles.title}>Pets</h1>
            <Search
              searchFunction={searchFriends}
              setFunction={setPets}
              isLoading={isSearchLoading}
            />
            <ul className={styles.items}>
              {pets &&
                pets.map((pet) => (
                  <Link
                    href={"pets/" + pet.id}
                    key={pet.id}
                    className={styles.item}
                  >
                    <div className={styles.itemName}>{pet.name}</div>
                    <div className={styles.itemCategory}>
                      <span>Category:</span> {pet.category}
                    </div>
                    <div className={styles.itemPrice}>
                      {formatPrice(pet.price, "en")}
                    </div>
                  </Link>
                ))}
            </ul>
          </div>
        ) : (
          <div className={styles.petCreate}>
            <form className={styles.form}>
              <input
                className={styles.formInput}
                type="text"
                placeholder="Name"
                value={newPet.name}
                onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
              />
              <input
                className={styles.formInput}
                type="text"
                placeholder="Name UA"
                value={newPet.nameUA}
                onChange={(e) =>
                  setNewPet({ ...newPet, nameUA: e.target.value })
                }
              />
              <select
                className={styles.formSelect}
                placeholder="Category"
                value={newPet.category}
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
                value={capitalize(newPet.categoryUA)}
              />
              <label>
                <span>Age (month): </span>
                <input
                  className={styles.formInput}
                  type="number"
                  placeholder="Age"
                  value={newPet.age}
                  onChange={(e) =>
                    setNewPet({ ...newPet, age: +e.target.value })
                  }
                />
              </label>
              <select
                className={styles.formSelect}
                placeholder="Sex"
                value={newPet.sex}
                onChange={(e) => setNewPet({ ...newPet, sex: e.target.value })}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <textarea
                className={styles.formText}
                placeholder="Short description"
                value={newPet.shortDescription}
                onChange={(e) =>
                  setNewPet({ ...newPet, shortDescription: e.target.value })
                }
              />
              <textarea
                className={styles.formText}
                placeholder="Short description UA"
                value={newPet.shortDescriptionUA}
                onChange={(e) =>
                  setNewPet({ ...newPet, shortDescriptionUA: e.target.value })
                }
              />
              <textarea
                className={styles.formText}
                placeholder="Description"
                value={newPet.description}
                onChange={(e) =>
                  setNewPet({ ...newPet, description: e.target.value })
                }
              />
              <textarea
                className={styles.formText}
                placeholder="Description UA"
                value={newPet.descriptionUA}
                onChange={(e) =>
                  setNewPet({ ...newPet, descriptionUA: e.target.value })
                }
              />
              <label>
                <span>Price (UAH): </span>
                <input
                  className={styles.formInput}
                  type="number"
                  placeholder="Price (UAH)"
                  value={newPet.price}
                  onChange={(e) =>
                    setNewPet({ ...newPet, price: +e.target.value })
                  }
                />
              </label>
              <label className={styles.formLabelCheckbox}>
                <input
                  className={styles.formCheckbox}
                  type="checkbox"
                  checked={newPet.wc}
                  onChange={() => setNewPet({ ...newPet, wc: !newPet.wc })}
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
                onClick={handleCreateFriend}
                className={
                  isLoading
                    ? `${styles.formCreate} ${styles.loading}`
                    : styles.formCreate
                }
              >
                {isLoading ? <DotsLoader /> : "Create"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pets;
