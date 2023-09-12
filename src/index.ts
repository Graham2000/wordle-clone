//let answerList: string[] = [];
//let guessList: string[] = [];

// Init entry and add event listeners
window.onload = () => {
    let boxes = document.getElementsByClassName("box");

    // Entry box
    let firstInput = boxes[0] as HTMLInputElement;
    firstInput.disabled = false;
    firstInput.focus();

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

const configInput = (currInput: HTMLInputElement, prev: boolean): void => {
    let elem: HTMLInputElement;

    // Move to next block
    if (prev) {
        elem = <HTMLInputElement>currInput.previousElementSibling;
        currInput.value = "";
    } else {
        elem = <HTMLInputElement>currInput.nextElementSibling;
    }

    currInput.disabled = true;
    elem.disabled = false;
    elem.focus();
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

    let prevInput: Element;
    let nextInput: Element;

    if (elemTarget.previousElementSibling) {
        prevInput = elemTarget.previousElementSibling;
    }

    if (elemTarget.nextElementSibling) {
        nextInput = elemTarget.nextElementSibling;
    }

    let nextRow: Element;
    let currBox: Element;

    if (elemTarget.parentElement?.nextElementSibling) {
        nextRow = elemTarget.parentElement.nextElementSibling;
    }

    if (elemTarget.parentElement?.nextElementSibling?.firstElementChild) {
        currBox = elemTarget.parentElement.nextElementSibling.firstElementChild;
    }

    setTimeout(() => {
        
        if (e.keyCode === ENTER_KEY_CODE) {
            // If last box in row
                // Check if word is valid guess or answer

            elemTarget.disabled = true;
            newGuess(currBox, nextRow);
            
        } else if (e.keyCode == BACKSPACE_KEY_CODE) {

            prevInput && configInput(elemTarget, true);

        } else if (isLetter(elemTarget.value)) {    

            nextInput && configInput(elemTarget, false)

        } else {
            elemTarget.value = "";
        }
        
    });

}