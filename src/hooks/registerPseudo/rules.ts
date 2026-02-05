import { ANTI_REGEX_PSEUDO, EMPTY_ERROR_MESSAGE, INVALID_ERROR_MESSAGE, MAX_LENGTH_PSEUDO, MIN_LENGTH_PSEUDO, REGEX_PSEUDO, TOO_LONG_ERROR_MESSAGE, TOO_SHORT_ERROR_MESSAGE } from "./config";

/**
 * Nettoie une entrée utilisateur pour éviter les injections.
 * - Supprime les caractères non autorisés
 * - Normalise les espaces multiples
 * - Tronque à 50 caractères
 *
 * @param value - Valeur brute
 * @returns Valeur nettoyée
 */
export function sanitizeInput(value: string){
    return value
    .replace(ANTI_REGEX_PSEUDO, "")
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, MAX_LENGTH_PSEUDO);
}

/**
 * Vérifie qu'un pseudo respecte les règles métier.
 *
 * @param value - Pseudo déjà sanitizé
 * @returns Objet { isValid, message, value }
 */
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