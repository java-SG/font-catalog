/* 
The idea here was ambitious, 
a little off point for this tool but a fun test to bind styles into a single source, 
but it is not very maintainable with my current setup 
*/

export const styles = {
    header: "#header p-[5vh] w-full",
    content: "#content w-full",
    filter: "#filter bg-black text-white rounded-[1.5vh] py-[2vh] flex justify-center items-center relative",
    page: "#page h-screen w-full text-[4vh] bg-black flex justify-start items-center flex-col",
    list: "#list p-[5vh] overflow-y-auto w-full flex flex-col gap-[2vh] hide-scrollbar",
    card: "#card flex break-normal landscape:h-full portrait:flex-col portrait:[&>*]:w-full justify-center items-center text-center bg-black [&>*]:bg-gray-300 w-full gap-[1vh] p-[1vh] border-white rounded-[2.5vh] border-[0.25vh] [&>*]:rounded-[1.5vh] [&>*]:h-full [&>*]:p-[1vh] overflow-visible",
    cardblock: "#cardblock flex flex-col flex-3",
    info: "#info landscape:flex-2 flex justify-center items-center text-center capitalize",
    sample: "#sample landscape:flex-4 flex justify-center items-center text-center",
    preview: "#preview relative bg-black text-white rounded-[1.5vh] py-[2vh] text-[5vh] overflow-hidden",
    metadata: "#metadata overflow-y-auto hide-scrollbar bg-black text-white rounded-[1.5vh]",
    neon_inner: "neon-inner",
    neon_outer: "neon-outer",
};