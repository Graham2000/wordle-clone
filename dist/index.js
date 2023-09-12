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
    var _a, _b, _c;
    let elemTarget = e.target;
    let prevInput;
    let nextInput;
    if (elemTarget.previousElementSibling) {
        prevInput = elemTarget.previousElementSibling;
    }
    if (elemTarget.nextElementSibling) {
        nextInput = elemTarget.nextElementSibling;
    }
    let nextRow;
    let currBox;
    if ((_a = elemTarget.parentElement) === null || _a === void 0 ? void 0 : _a.nextElementSibling) {
        nextRow = elemTarget.parentElement.nextElementSibling;
    }
    if ((_c = (_b = elemTarget.parentElement) === null || _b === void 0 ? void 0 : _b.nextElementSibling) === null || _c === void 0 ? void 0 : _c.firstElementChild) {
        currBox = elemTarget.parentElement.nextElementSibling.firstElementChild;
    }
    setTimeout(() => {
        if (e.keyCode === ENTER_KEY_CODE) {
            elemTarget.disabled = true;
            newGuess(currBox, nextRow);
        }
        else if (e.keyCode == BACKSPACE_KEY_CODE) {
            prevInput && configInput(elemTarget, true);
        }
        else if (isLetter(elemTarget.value)) {
            nextInput && configInput(elemTarget, false);
        }
        else {
            elemTarget.value = "";
        }
    });
};
