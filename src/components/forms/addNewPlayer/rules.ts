import { EMPTY_ERROR_MESSAGE, INVALID_ERROR_MESSAGE, MAX_LENGTH_PSEUDO, MIN_LENGTH_PSEUDO, REGEX_CHAR_PSEUDO, REGEX_PSEUDO, TOO_LONG_ERROR_MESSAGE, TOO_SHORT_ERROR_MESSAGE } from "./config";

export function checkInputValue(value: string){
    let response = {
        isValid: false,
        message: "",
        value: value
    };

    if(!value){
        response.message = EMPTY_ERROR_MESSAGE;
        return response;
    }

    if(value.length > MAX_LENGTH_PSEUDO){
        response.message = TOO_LONG_ERROR_MESSAGE;
        return response;
    }

    if(value.length < MIN_LENGTH_PSEUDO){
        response.message = TOO_SHORT_ERROR_MESSAGE;
        return response;
    }

    if(REGEX_PSEUDO.test(value) === false || typeof value !== "string"){
        response.message = INVALID_ERROR_MESSAGE;
        return response;
    }

    response.isValid = true;
    return response;
}

export function sanitizeInput(value: string){
    return value
    .trim()
    .split("")
    .filter(char => REGEX_CHAR_PSEUDO.test(char))
    .join("")
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, MAX_LENGTH_PSEUDO);
}