export const Neon = (
    { neon, setNeon }: { neon: boolean; setNeon: React.Dispatch<React.SetStateAction<boolean>>; }
) => {
    return (
        <div
            onClick={() => setNeon(n => !n)}
            className={`${neon ? "border-green-700" : "border-red-700"}
                select-none cursor-pointer flex flex-row justify-center items-center
                landscape:w-[10vw] portrait:w-[30vw] rounded-[1.5vh] overflow-hidden border-[0.25vh]`}>
            <div className={`flex-1 text-center ${neon ? "bg-green-500" : ""}`}>
                ON
            </div>
            <div className={`flex-1 text-center ${!neon ? "bg-red-500" : ""}`}>
                OFF
            </div>
        </div>
    );
};
