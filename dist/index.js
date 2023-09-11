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
const getWordList = (src) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(src);
    return ((yield response.text()).split("\n"));
});
getWordList("../res/answer-list.txt").then(res => {
    console.log(res);
});
getWordList("../res/guess-list.txt").then(res => {
    console.log(res);
});
