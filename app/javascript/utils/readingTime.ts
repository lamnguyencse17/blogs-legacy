const calculateReadingTime = (text: string) => {
    const WORDS_PER_MINUTE = 200;
    const regex = /\w+/g;
    const numberOfWords = text.split(regex).length;
    const time = Math.ceil(numberOfWords / WORDS_PER_MINUTE);
    return time > 0 ? time : 1;
};

export default calculateReadingTime;
