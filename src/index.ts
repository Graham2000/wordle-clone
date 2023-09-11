//let answerList: string[] = [];
//let guessList: string[] = [];

const getWordList = async (src: string): Promise<string[]> => {
    const response = await fetch(src);
    return ((await response.text()).split("\n"));
}

getWordList("../res/answer-list.txt").then(res => {
    console.log(res);
});

getWordList("../res/guess-list.txt").then(res => {
    console.log(res);
});

