import React, { useState } from "react";
import { styles } from "./Styles.tsx";
import type { FontMetadata } from "./Metadata.tsx";

interface FontCardProps {
  fontName: string;
  sampleText: string;
  metadata: FontMetadata | null;
}

export const FontCard: React.FC<FontCardProps> = ({ fontName, sampleText, metadata }) => {
  const Copy = async () => {
    if (!sampleText) return;

    const fontSize = 48, padding = 20;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d")!;
    context.font = `${fontSize}px "${fontName}"`;

    const { width } = context.measureText(sampleText);
    canvas.width = width + padding * 2;
    canvas.height = fontSize + padding * 2;

    Object.assign(context, {
      font: `${fontSize}px "${fontName}"`,
      fillStyle: "white",
      textAlign: "center",
      textBaseline: "middle"
    });

    context.fillText(sampleText, canvas.width / 2, canvas.height / 2);
    canvas.toBlob(blob => blob && navigator.clipboard.write([new ClipboardItem({ "image/png": blob })])
      .then(() => console.log(`Copied "${sampleText}" in font ${fontName}`))
      .catch(console.error)
    );
  };

  const [displayAllMeta, setDisplayAllMeta] = useState<Boolean>(false);

  return (
    <div className={`${styles.card} ${styles.neon_outer}`}>
      <div className={styles.cardblock}>
        <div className={styles.info} style={{ fontFamily: "Arial" }}>{fontName}</div>
        <div className={`${styles.preview} ${styles.neon_inner}`}><div className={styles.info} style={{ fontFamily: fontName }}>{fontName}</div></div>
        <div className={styles.info} style={{ fontFamily: "Arial" }}>
          <p className="flex-1">Author: </p>
          <p className="flex-1">{metadata?.author ? metadata?.author : "Unknown"}</p>
        </div>
        {displayAllMeta ?
          <div className={`${styles.metadata} relative`}>
            <div className={`${styles.neon_inner} sticky top-0 z-999 p-[2vh]`}>
              {metadata?.copyright ? <div>{metadata.copyright}</div> : null}
              {metadata?.license ? <div>{metadata.license}</div> : null}
              {metadata?.version ? <div>{metadata.version}</div> : null}
            </div>
          </div> : null}
      </div>
      {sampleText ? <div className={`${styles.sample} cursor-pointer hover:text-blue-700 overflow-x-auto scroll-smooth`} style={{ fontFamily: fontName }} onClick={() => {
        Copy();
        setDisplayAllMeta(true);
      }}>
        <p className="px-[3vh] py-[1.5vh] landscape:text-[10vh]">{sampleText}</p>
      </div> : null}
    </div>
  );
};