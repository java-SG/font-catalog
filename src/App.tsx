import { useEffect } from "react";
import { fonts } from "./Fonts";

function getFontFormat(path: string) {
  if (path.endsWith(".ttf")) return "truetype";
  if (path.endsWith(".otf")) return "opentype";
  if (path.endsWith(".woff")) return "woff";
  if (path.endsWith(".woff2")) return "woff2";
}

export default function App() {

  console.log(fonts)

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

  return (
    <div className="h-screen w-full overflow-y-auto text-[4vh] bg-blue-300 flex justify-start items-center flex-col gap-[2vh] p-[5vh]">
      {Object.keys(fonts).map((path, index) => {
        const fontName = path.split("/").pop()!.replace(/\.\w+$/, "");
        return (
          <div className="flex portrait:flex-col portrait:[&>*]:w-full justify-center items-center text-center bg-black [&>*]:bg-gray-300 w-full gap-[1vh] p-[1vh] border-[0.25vh] rounded-[2.5vh] [&>*]:rounded-[1.5vh] [&>*]:border-[0.25vh] [&>*]:h-full [&>*]:p-[1vh]" key={index} style={{ fontFamily: fontName }}>
            <div className="landscape:flex-1 flex justify-center items-center" style={{ fontFamily: "Arial" }}>{fontName}</div>
            <div className="landscape:flex-1 flex justify-center items-center">{fontName}</div>
            <div className="landscape:flex-3 flex justify-center items-center">Sample text comes here</div>
          </div>
        );
      })}
    </div>
  );
}