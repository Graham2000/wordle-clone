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
    let firstInput = boxes[0];
    firstInput.disabled = false;
    firstInput.focus();
    firstInput.style.borderColor = "#555555";
    let overlay = document.getElementById("overlay");
    if (overlay !== null) {
        overlay.addEventListener("click", () => {
            for (let i = 0; i < boxes.length; i++) {
                let box = boxes[i];
                if (box.disabled === false) {
                    box.focus();
                }
            }
        });
    }
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener("input", (e) => {
            let elemTarget = e.target;
            if (elemTarget.value.length !== 0) {
                elemTarget.style.borderColor = "#555555";
            }
            else {
                elemTarget.style.borderColor = "#3a2e2e";
            }
        });
    }
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
const configInput = (currInput, prev) => {
    let elem;
    if (prev) {
        elem = currInput.previousElementSibling;
        currInput.value = "";
    }
    else {
        elem = currInput.nextElementSibling;
    }
    currInput.disabled = true;
    elem.disabled = false;
    elem.focus();
};
const moveToNext = (currInput) => {
    let elem;
    if (currInput.value.length !== 0) {
        currInput.disabled = true;
        elem = currInput.nextElementSibling;
        elem.style.borderColor = "#555555";
        elem.disabled = false;
        elem.focus();
    }
    currInput.style.borderColor = "#555555";
};
const moveToPrev = (currInput) => {
    let elem;
    if (currInput.value.length === 0) {
        currInput.disabled = true;
        elem = currInput.previousElementSibling;
        elem.style.borderColor = "#3a2e2e";
        elem.disabled = false;
        elem.focus();
    }
    else {
        currInput.value = "";
    }
    currInput.style.borderColor = "#3a2e2e";
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
    var _a, _b;
    let elemTarget = e.target;
    if (e.keyCode === ENTER_KEY_CODE) {
        elemTarget.disabled = true;
        if ((_b = (_a = elemTarget.parentElement) === null || _a === void 0 ? void 0 : _a.nextElementSibling) === null || _b === void 0 ? void 0 : _b.firstElementChild) {
            newGuess(elemTarget.parentElement.nextElementSibling.firstElementChild, elemTarget.parentElement.nextElementSibling);
        }
    }
    else if (e.keyCode == BACKSPACE_KEY_CODE) {
        elemTarget.previousElementSibling && moveToPrev(elemTarget);
    }
    else if (isLetter(elemTarget.value)) {
        elemTarget.nextElementSibling && moveToNext(elemTarget);
    }
    else {
        elemTarget.value = "";
    }
};
