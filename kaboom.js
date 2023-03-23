//import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";
import kaboom from "https://unpkg.com/kaboom@2000.2.10/dist/kaboom.js";

//initialize kaboom
export const K = kaboom({
    width: document.querySelector("body").width,
    height:document.querySelector("body").height,
    scale: 1
})

export default K;
