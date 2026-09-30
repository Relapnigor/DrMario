
/**
* @var
*
* The number of viruses placed on the board at the start of a
* stage. Also resets the remaining-virus count and the score in
* localStorage as soon as this module loads, so every new game
* starts from a clean slate.
*/
let viruses: number = 4
localStorage.setItem("viruses", viruses.toString())
localStorage.setItem("score", "0")

export default viruses