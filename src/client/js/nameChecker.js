function checkForUserInput(inputText, setErrorMessage = true) {
    console.log('Check for user text', inputText);
    //user input is not empty
    if(!inputText) {
        if(setErrorMessage) {
            handleInputError('Please Enter Something');
        }
        return false;
    }
    return true;
} 

export {checkForUserInput }