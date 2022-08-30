import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";

//initialize kaboom
export const K = kaboom({
    width: document.querySelector("body").width,
    height:document.querySelector("body").height,
    scale: 1,
})


export default K;