//let answerList: string[] = [];
//let guessList: string[] = [];
let validList: Array<string>;
let wordOfDay: string;
let guessCount = 0;
const MAX_GUESSES = 5;

// Init entry and add event listeners
window.onload = () => {
    let boxes = document.getElementsByClassName("box");

    // Entry box
    let firstInput = boxes[0] as HTMLInputElement;
    firstInput.disabled = false;
    firstInput.focus();
    firstInput.style.borderColor = "#555555";

    let overlay = document.getElementById("overlay");

    if (overlay !== null) {
        overlay.addEventListener("click", () => {
            for(let i = 0; i < boxes.length; i++) {
                let box = boxes[i] as HTMLInputElement;
                if (box.disabled === false) {
                    box.focus();
                }

            }
        });
    }

    // Add active border
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener("input", (e) => {

            let elemTarget = e.target as HTMLInputElement;

            if (elemTarget.value.length !== 0) {
                elemTarget.style.borderColor = "#555555";
            } else {
                elemTarget.style.borderColor = "#3a2e2e";
            }
       
        });
    }

    const ANSWER_SRC: string = "../res/answer-list.txt";
    const GUESS_SRC: string = "../res/guess-list.txt";


    ///////////////////////////////
    // Generate random word of day from answer list

    const generateWOD = (answerList: Array<string>): string => {
        const index = Math.floor(Math.random() * answerList.length - 1);
        return answerList[index];
    }
    //////////////////////////////

    const getWordList = async (src: string): Promise<string[]> => {
        const list = await fetch(src);
        return ((await list.text()).split("\n"));
    }

    getWordList(ANSWER_SRC).then(answerList => {
 
        wordOfDay = generateWOD(answerList);
        console.log("Word of Day", wordOfDay);

        getWordList(GUESS_SRC).then(guessList => {

            validList = answerList.concat(guessList);
            console.log("Valid List", validList);

        });
        
    });

}






// Valid guess = guess list + answer list



const moveToNext = (currInput: HTMLInputElement) => {
    let elem: HTMLInputElement;

    if (currInput.value.length !== 0) {
        currInput.disabled = true;
        elem = <HTMLInputElement>currInput.nextElementSibling;
        elem.style.borderColor = "#555555";
        elem.disabled = false;
        elem.focus();
    }

    currInput.style.borderColor = "#555555";
}

const moveToPrev = (currInput: HTMLInputElement) => {
    let elem: HTMLInputElement;

    if (currInput.value.length === 0) {
        currInput.disabled = true;
        elem = <HTMLInputElement>currInput.previousElementSibling;
        elem.style.borderColor = "#3a2e2e";
        elem.disabled = false;
        elem.focus();

    } else {
        currInput.value = "";
    }

    currInput.style.borderColor = "#3a2e2e";
}

// New row
const newGuess = (currBox: Element, nextRow: Element): void => {
    if (nextRow) {
        (currBox as HTMLInputElement).disabled = false;
        (currBox as HTMLInputElement).focus();
    } else {
        alert("You are out of guesses! The answer was: wod");
    }
}


const isLetter = (c: string): boolean => {
    return c.toLowerCase() != c.toUpperCase();
}

// Add event listener for enter key
const ENTER_KEY_CODE: number = 13;
const BACKSPACE_KEY_CODE: number = 8;

const handleKeyPress = (e: KeyboardEvent) => {
    let elemTarget = e.target as HTMLInputElement;
        
    if (e.keyCode === ENTER_KEY_CODE && elemTarget.nextElementSibling === null) {
        // If last box in row
            // Check if word is valid guess or answer

        // Output feedback 
        let guessedWord = "";
        if (elemTarget.parentElement) {
            const row: HTMLCollection = elemTarget.parentElement.children;
            
            for (let i = 0; i < row.length; i++) {
                let box = row[i] as HTMLInputElement;
                guessedWord += box.value;

                if (wordOfDay[i] === guessedWord[i]) {
                    // Correct letter, correct pos
                    box.style.backgroundColor = "#538d4e";
                } else if (wordOfDay.includes(guessedWord[i])) {
                    // Correct letter, wrong pos
                    box.style.backgroundColor = "#b59f3b";
                } else {
                    // Wrong letter, wrong pos
                    box.style.backgroundColor = "#363636";
                }
                //box.style.borderColor = "#3a2e2e";
            }

        }

        console.log("gw", guessedWord);

        if (guessedWord === wordOfDay) {
            setTimeout(() => {
                alert("You guessed the correct word!");
                window.location.href = "./";
            });
         
        } else if (guessCount === MAX_GUESSES && validList.includes(guessedWord) ) {
            setTimeout(() => {
                alert("You are out of guesses");
                window.location.href = "./";
            });

        } else if (validList.includes(guessedWord)) {
            //alert("Valid guess");
            elemTarget.disabled = true;
            if (elemTarget.parentElement?.nextElementSibling?.firstElementChild) {
                newGuess(elemTarget.parentElement.nextElementSibling.firstElementChild, 
                         elemTarget.parentElement.nextElementSibling);
            }

            guessCount++;

        } else {
            //alert("Invalid guess");
            if (elemTarget.parentElement) {
                const row: HTMLElement = elemTarget.parentElement;
                for (let i = 0; i < row.childElementCount; i++) {
                    let box = row.children[i] as HTMLInputElement;

                    // Reset color to base
                    box.style.backgroundColor = "#000";
                    guessedWord += box.value;
                }

                row.classList.add("shakeAnimation");

                setTimeout(() => {
                    row.classList.remove("shakeAnimation");
                }, 300)
            }

        }
        
    } else if (e.keyCode == BACKSPACE_KEY_CODE) {

        elemTarget.previousElementSibling && moveToPrev(elemTarget);

    } else if (isLetter(elemTarget.value)) {    

       elemTarget.nextElementSibling && moveToNext(elemTarget);

    } else {
        elemTarget.value = "";
    }
}