import { IonIcon } from "@ionic/react";
import { searchOutline } from "ionicons/icons";
import { useRef, useState } from "react";

export default function SearchBar({ setQuery }) {
  const [tempQuery, setTempQuery] = useState("");
  const inputRef = useRef(null);

  function handleSearch(e) {
    e.preventDefault();

    if (tempQuery.length >= 3) setQuery(tempQuery);

    setTempQuery("");
    inputRef.current.blur();
  }

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <button>
        <IonIcon icon={searchOutline} className="search-icon"></IonIcon>
      </button>
      <input
        type="text"
        placeholder="Search city..."
        value={tempQuery}
        onChange={(e) => setTempQuery(e.target.value)}
        ref={inputRef}
      ></input>
    </form>
  );
}
