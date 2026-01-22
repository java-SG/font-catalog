import { useEffect, useState } from "react";
import { fonts } from "./Fonts.tsx";
import { styles } from "./Styles.tsx"

function getFontFormat(path: string) {
  if (path.endsWith(".ttf")) return "truetype";
  if (path.endsWith(".otf")) return "opentype";
  if (path.endsWith(".woff")) return "woff";
  if (path.endsWith(".woff2")) return "woff2";
  return undefined
}

export default function App() {

  useEffect(() => {
    let customFontCSS = "";

    Object.entries(fonts).forEach(([path, module]) => {
      const fileURL = module.default;
      const fileName = path.split("/").pop()?.replace(/\.\w+$/, "");

      customFontCSS += `
        @font-face {
          font-family: '${fileName}';
          src: url('${fileURL}') format('${getFontFormat(path)}');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
      `;
    });

    const style = document.createElement("style");
    style.innerHTML = customFontCSS;
    document.head.appendChild(style);

    return () => { document.head.removeChild(style) };
  }, []);

  const [sampleText, setSampleText] = useState<string>("Sample text here")
  const [filter, setFilter] = useState<string | null>(null)
  const listOfFilters = ["None", ...Array.from(
    new Set(
      Object.keys(fonts)
        /* Split path prefix starting at fonts/, then split suffix at first next subfolder to get each font folder tag to filter from */
        .map(path => path.split("fonts/")[1]?.split("/")[0])
        .filter(Boolean) /* Remove any falsies, shouldnt be neccesary but it would ruin the dropdown list if it had any */
    ))]; /* Adding None with a shallow copy of the initializing listOfFilters */

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <select className={styles.info} value={filter ?? ""} onChange={(event) => {
          const value = event.target.value;
          setFilter(value === "" || value === "None" ? null : value);
        }} >
          <option value="" disabled hidden>
            Select Filter
          </option>
          {listOfFilters.map((filterName) => (
            <option key={filterName} value={filterName}>
              {filterName}
            </option>
          ))}
        </select>
        <div className={styles.info}>Sample text:</div>
        <input className={styles.sample} value={sampleText} onChange={(input) => setSampleText(input.target.value)} />
      </div>
      <div className={styles.list}>
        {Object
          .keys(fonts)
          /* Filters now dynamically based of listOfFilters, so any new parent folders added for fonts will scale along */
          .filter(path => !filter ? true : path.includes(`/${filter}/`))
          .map((path, index) => {
            const fontName = path.split("/").pop()!.replace(/\.\w+$/, "");
            return (
              <div className={styles.card} key={index}>
                <div className={styles.info} style={{ fontFamily: "Arial" }}>{fontName}</div>
                <div className={styles.info} style={{ fontFamily: fontName }}>{fontName}</div>
                <div className={styles.sample} style={{ fontFamily: fontName }}>{sampleText}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
}