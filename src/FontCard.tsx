import React from "react";
import { styles } from "./Styles.tsx";

interface FontCardProps {
  fontName: string;
  sampleText: string;
}

export const FontCard: React.FC<FontCardProps> = ({ fontName, sampleText }) => {
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

  return (
    <div className={styles.card}>
      <div className={styles.info} style={{ fontFamily: "Arial" }}>
        {fontName}
      </div>
      <div className={styles.info} style={{ fontFamily: fontName }}>
        {fontName}
      </div>
      <div className={`${styles.sample} cursor-pointer hover:text-white`} style={{ fontFamily: fontName }} onClick={Copy}>
        <p className="px-[3vh] py-[1.5vh]">{sampleText}</p>
      </div>
    </div>
  );
};