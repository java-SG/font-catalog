import { useState } from "react";
import Fonts from "./Fonts.tsx";
import { fonts } from "./Imports.tsx"
import { styles } from "./Styles.tsx"
import Filter from "./Filter.tsx"
import { ListOfFonts } from "./ListOfFonts.tsx"

export default function App() {

  const [sampleText, setSampleText] = useState<string>("")
  const [filter, setFilter] = useState<string | null>(null)
  const listOfFilters = ["None", ...Array.from(
    new Set(
      Object.keys(fonts)
        /* Split path prefix starting at fonts/, then split suffix at first next subfolder to get each font folder tag to filter from */
        .map(path => path.split("fonts/")[1]?.split("/")[0])
        .filter(Boolean) /* Remove any falsies, shouldnt be neccesary but it would ruin the dropdown list if it had any */
    ))]; /* Adding None with a shallow copy of the initializing listOfFilters */

  return (
    <>
      <Fonts /> {/* Inject fonts */}
      <div className={styles.page}>
        <div className={styles.card}>
          <Filter listOfFilters={listOfFilters} filter={filter} setFilter={setFilter} />
          <div className={styles.info}>Sample text:</div>
          <input className={styles.sample} value={sampleText} onChange={(input) => setSampleText(input.target.value)} placeholder="Sample text here" />
        </div>
        <div className={styles.list}>
          <ListOfFonts sampleText={sampleText} filter={filter} />
        </div>
      </div>
    </>
  );
}