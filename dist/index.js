"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
window.onload = () => {
    let boxes = document.getElementsByClassName("box");
    boxes[0].disabled = false;
    boxes[0].focus();
    let overlay = document.getElementById("overlay");
    overlay.addEventListener("click", () => {
        for (let i = 0; i < boxes.length; i++) {
            if (boxes[i].disabled === false) {
                boxes[i].focus();
            }
        }
    });
};
const ANSWER_SRC = "../res/answer-list.txt";
const GUESS_SRC = "../res/guess-list.txt";
const getWordList = (src) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield fetch(src);
    return ((yield list.text()).split("\n"));
});
getWordList(ANSWER_SRC).then(answerList => {
    console.log(answerList);
});
getWordList(GUESS_SRC).then(guessList => {
    console.log(guessList);
});
const moveToPrev = (input) => {
    input.value = "";
    input.previousElementSibling.disabled = false;
    input.previousElementSibling.focus();
    input.disabled = true;
};
const moveToNext = (input) => {
    input.nextElementSibling.disabled = false;
    input.nextElementSibling.focus();
    input.disabled = true;
};
const newGuess = (currBox, nextRow) => {
    if (nextRow) {
        currBox.disabled = false;
        currBox.focus();
    }
    else {
        alert("You are out of guesses! The answer was: wod");
    }
};
const isLetter = (c) => {
    return c.toLowerCase() != c.toUpperCase();
};
const ENTER_KEY_CODE = 13;
const BACKSPACE_KEY_CODE = 8;
const handleKeyPress = (e) => {
    let prevInput = e.target.previousElementSibling;
    let nextInput = e.target.nextElementSibling;
    let nextRow;
    let currBox;
    if (e.target.parentElement.nextElementSibling &&
        e.target.parentElement.nextElementSibling.firstElementChild) {
        nextRow = e.target.parentElement.nextElementSibling;
        currBox = e.target.parentElement.nextElementSibling.firstElementChild;
    }
    setTimeout(() => {
        if (e.keyCode === ENTER_KEY_CODE) {
            e.target.disabled = true;
            newGuess(currBox, nextRow);
        }
        else if (e.keyCode == BACKSPACE_KEY_CODE) {
            prevInput && moveToPrev(e.target);
        }
        else if (isLetter(e.target.value)) {
            nextInput && moveToNext(e.target);
        }
        else {
            e.target.value = "";
        }
    });
};
