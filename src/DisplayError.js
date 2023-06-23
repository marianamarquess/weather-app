import { IonIcon } from "@ionic/react";
import { searchOutline } from "ionicons/icons";

export default function DisplayError({ error }) {
  return (
    <div className="error">
      <IonIcon icon={searchOutline} className="search-icon"></IonIcon>
      <h4>No results</h4>
      <p>{error}</p>
    </div>
  );
}
