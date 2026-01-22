import React from "react";
import { fonts } from "./Imports.tsx";
import { FontCard } from "./FontCard.tsx";

interface ListOfFontsProps {
    sampleText: string;
    filter: string | null;
}

export const ListOfFonts: React.FC<ListOfFontsProps> = ({ sampleText, filter }) => {
    const displayFonts = Object.keys(fonts).filter(path =>
        !filter ? true : path.includes(`/${filter}/`)
    );

    return (
        <>
            {displayFonts.map((path, index) => {
                const fontName = path.split("/").pop()!.replace(/\.\w+$/, "");
                return <FontCard key={index} fontName={fontName} sampleText={sampleText} />;
            })}
        </>
    );
};