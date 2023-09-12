//let answerList: string[] = [];
//let guessList: string[] = [];

// Init entry and add event listeners
window.onload = () => {
    let boxes: any = document.getElementsByClassName("box");

    // Entry box
    boxes[0].disabled = false;
    boxes[0].focus();

    let overlay: any = document.getElementById("overlay");

    overlay.addEventListener("click", () => {
        for(let i = 0; i < boxes.length; i++) {
            if (boxes[i].disabled === false) {
                boxes[i].focus();
            }
    
        }
    });

}

const ANSWER_SRC: string = "../res/answer-list.txt";
const GUESS_SRC: string = "../res/guess-list.txt";

const getWordList = async (src: string): Promise<string[]> => {
    const list = await fetch(src);
    return ((await list.text()).split("\n"));
}

getWordList(ANSWER_SRC).then(answerList => {
    console.log(answerList);
});

getWordList(GUESS_SRC).then(guessList => {
    console.log(guessList);
});

///////////////////////////////
// Generate random word of day from answer list







////////////////////////////////

const moveToPrev = (input: any): void => {
    input.value = "";
    input.previousElementSibling.disabled = false;
    input.previousElementSibling.focus();
    input.disabled = true;
}

const moveToNext = (input: any): void => {
    input.nextElementSibling.disabled = false;
    input.nextElementSibling.focus();
    input.disabled = true
}

// New row
const newGuess = (currBox: any, nextRow: any): void => {
    if (nextRow) {
        currBox.disabled = false;
        currBox.focus();
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

const handleKeyPress = (e: any) => {
    let prevInput: HTMLElement = e.target.previousElementSibling;
    let nextInput: HTMLElement = e.target.nextElementSibling;

    let nextRow: HTMLElement;
    let currBox: HTMLElement;

    if (e.target.parentElement.nextElementSibling && 
        e.target.parentElement.nextElementSibling.firstElementChild) {
        nextRow = e.target.parentElement.nextElementSibling;
        currBox = e.target.parentElement.nextElementSibling.firstElementChild;
    }

    setTimeout(() => {
        
        if (e.keyCode === ENTER_KEY_CODE) {
            // If last box in row
                // Check if word is valid guess or answer

            e.target.disabled = true;
            newGuess(currBox, nextRow);
            
        } else if (e.keyCode == BACKSPACE_KEY_CODE) {

            prevInput && moveToPrev(e.target);

        } else if (isLetter(e.target.value)) {    

            nextInput && moveToNext(e.target);

        } else {
            e.target.value = "";
        }
        
    });
}