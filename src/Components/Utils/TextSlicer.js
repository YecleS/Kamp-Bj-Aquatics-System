import React from 'react'

const TextSlicer = ({text}) => {
    //Split the text into an array of words
    const words = text.split(' ');

    //Check if the words array has lenght of more than 5
    if(words.length > 5){
        // return the first 5 words and join them with white space and add elipsis
        return words.slice(0, 10).join(' ') + ' ...';
    }

    //just return text if it it didnt satisfy the condition
    return text;
}

export default TextSlicer
