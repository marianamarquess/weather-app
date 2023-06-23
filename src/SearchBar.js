import { IonIcon } from "@ionic/react";
import { searchOutline } from "ionicons/icons";
import { useState } from "react";

export default function SearchBar({ setQuery }) {
  const [tempQuery, setTempQuery] = useState("");

  function handleSearch(e) {
    e.preventDefault();

    if (tempQuery.length >= 3) setQuery(tempQuery);
  }

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <button>
        <IonIcon icon={searchOutline} className="search-icon"></IonIcon>
      </button>
      <input
        type="text"
        placeholder="Search query"
        value={tempQuery}
        onChange={(e) => setTempQuery(e.target.value)}
      ></input>
    </form>
  );
}
