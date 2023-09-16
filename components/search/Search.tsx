import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./Search.module.scss";
import search from "public/search.svg";
import Image from "next/image";
import DotsLoader from "../dots-loader/DotsLoader";
import useDebounce from "@/hooks/useDebounce";

interface SearchProps {
  searchFunction: any;
  setFunction: Dispatch<SetStateAction<any[]>>;
  isLoading: boolean;
}

const Search: FC<SearchProps> = ({
  searchFunction,
  setFunction,
  isLoading,
}) => {
  const [searchField, setSearchField] = useState<string>("");

  const [isSearchFieldActive, setIsSearchFieldActive] =
    useState<boolean>(false);

  const debouncedSearchFriends = useDebounce(searchFunction, 800, setFunction);

  const handleSearchFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchField(e.target.value);
    debouncedSearchFriends(e.target.value);
  };

  const searchRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (e: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
      setIsSearchFieldActive(false);
    }
  };

  useEffect(() => {
    if (isSearchFieldActive) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isSearchFieldActive]);

  return (
    <div className={styles.search} ref={searchRef}>
      <input
        className={
          isSearchFieldActive
            ? `${styles.searchField} ${styles.active}`
            : styles.searchField
        }
        value={searchField}
        onChange={handleSearchFieldChange}
        type="text"
      />
      <Image
        className={styles.searchImage}
        onClick={() => setIsSearchFieldActive(!isSearchFieldActive)}
        src={search}
        alt="search"
      />
      {isLoading ? (
        <div className={styles.searchLoader}>
          <DotsLoader />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Search;
