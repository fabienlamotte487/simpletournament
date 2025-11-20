import { checkInputValue, sanitizeInput } from "./rules";

export const registerPseudo = (pseudo: string) => {
    let sanitizedPseudo = sanitizeInput(pseudo); // Nettoyage de la valeur du pseudo entré
    const response = checkInputValue(sanitizedPseudo); // Check du respect métier de la valeur entrée
    return response;
}