//import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";
//import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.js";
import kaboom from "https://unpkg.com/kaboom@2000.2.10/dist/kaboom.mjs";

//initialize kaboom
export const K = kaboom({
    width: document.querySelector("body").width,
    height:document.querySelector("body").height,
    scale: 1
})

export default K;
