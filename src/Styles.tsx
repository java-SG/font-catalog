/* Not ideal for larger projects, but to keep the code beneath easier to read, since styling isnt very important here anyway */
export const styles = {
    page: "h-screen w-full text-[4vh] bg-colour-fade flex justify-start items-center flex-col gap-[5vh] p-[5vh]",
    list: "overflow-y-auto w-full flex flex-col gap-[2vh] hide-scrollbar",
    card: "flex portrait:flex-col portrait:[&>*]:w-full justify-center items-center text-center bg-black [&>*]:bg-gray-300 w-full gap-[1vh] p-[1vh] border-[0.25vh] rounded-[2.5vh] [&>*]:rounded-[1.5vh] [&>*]:border-[0.25vh] [&>*]:h-full [&>*]:p-[1vh]",
    info: "landscape:flex-1 flex justify-center items-center text-center capitalize",
    sample: "landscape:flex-3 flex justify-center items-center text-center",
};