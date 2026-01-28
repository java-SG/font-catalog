import { useState, useEffect } from "react";
import Fonts from "./Fonts.tsx";
import { fonts } from "./Imports.tsx"
import { styles } from "./Styles.tsx"
import Filter from "./Filter.tsx"
import { ListOfFonts } from "./ListOfFonts.tsx"
import { useMetadata } from "./Metadata.tsx"
import { Neon } from "./Neon.tsx"

export default function App() {

  const metadata = useMetadata();
  const [sampleText, setSampleText] = useState<string>("")
  const [filter, setFilter] = useState<string | null>(null)
  const listOfFilters = ["None", ...Array.from(
    new Set(
      Object.keys(fonts)
        /* Split path prefix starting at fonts/, then split suffix at first next subfolder to get each font folder tag to filter from */
        .map(path => path.split("fonts/")[1]?.split("/")[0])
        .filter(Boolean) /* Remove any falsies, shouldnt be neccesary but it would ruin the dropdown list if it had any */
    ))]; /* Adding None with a shallow copy of the initializing listOfFilters */
  const [neon, setNeon] = useState(true);
  console.log(neon)

  const getOrientation = () => window.innerWidth > window.innerHeight ? "landscape" : "portrait";
  const [orientation, setOrientation] = useState<"landscape" | "portrait">(getOrientation());
  useEffect(() => {
    const updateResolution = () => setOrientation(getOrientation());
    window.addEventListener("resize", updateResolution);
    return () => window.removeEventListener("resize", updateResolution);
  }, []);

  return (
    <>
      <Fonts /> {/* Inject fonts */}
      <div data-neon={neon ? "on" : "off"} className={styles.page}>
        <div className={styles.header}>
          <div className={`${styles.card} ${styles.neon_outer}`}>
            <div className={styles.cardblock}>
              <Filter listOfFilters={listOfFilters} filter={filter} setFilter={setFilter} />
              <div className={styles.info}>Sample text:</div>
            </div>
            <input className={styles.sample} value={sampleText} onChange={(input) => setSampleText(input.target.value)} placeholder="Sample text here" />
          </div>
        </div>
        <div className="flex landscape:flex-row portrait:flex-col justify-center items-center w-full text-white">
          {orientation === "landscape" ? <div className="landscape:flex-9 flex justify-center items-center portrait:text-center portrait:px-[5vh] portrait:pb-[2vh]">Click the previewed sample text to copy it as .png</div> : null}
          <div className="landscape:flex-5 flex justify-center items-center">
            <p className="pr-[1vh]">Neon:</p>
            <Neon neon={neon} setNeon={setNeon} />
          </div>
        </div>
        <div className={`${styles.list} relative overflow-y-auto [mask-image:linear-gradient(to_bottom,transparent_0%,transparent_2.5%,black_7.5%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,transparent_2.5%,black_7.5%)]`}>
          {/* <div className="flex justify-center items-center w-full sticky top-0 left-[5vh] z-10 bg-red-300 text-white portrait:[mask-image:linear-gradient(to_bottom,white_0%,white_50%,transparent_100%)] portrait:[-webkit-mask-image:linear-gradient(to_bottom,white_0%,white_50%,transparent_100%)]">Test</div> */}
          <ListOfFonts sampleText={sampleText} filter={filter} metadata={metadata} />
        </div>
      </div>
    </>
  );
}