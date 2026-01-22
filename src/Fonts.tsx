import { useEffect } from 'react';
import { fonts } from './Imports.tsx'

function getFontFormat(path: string) {
    if (path.endsWith(".ttf")) return "truetype";
    if (path.endsWith(".otf")) return "opentype";
    if (path.endsWith(".woff")) return "woff";
    if (path.endsWith(".woff2")) return "woff2";
    return undefined
}

export default function Fonts() {

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

    return null;
}