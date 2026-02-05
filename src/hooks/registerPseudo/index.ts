import { checkInputValue, sanitizeInput } from "./rules";

/**
 * Valide et sanitize un pseudo de joueur.
 *
 * Règles :
 * - 2 à 50 caractères
 * - Lettres (avec accents), chiffres, espaces, tirets, apostrophes
 * - Supprime les caractères dangereux (XSS)
 *
 * @param pseudo - Pseudo brut entré par l'utilisateur
 * @returns Objet { isValid, message, value } avec pseudo nettoyé
 *
 * @example
 * registerPseudo("  Dark Vador  ") // { isValid: true, value: "Dark Vador" }
 * registerPseudo("<script>") // { isValid: false, message: "..." }
 */
export const registerPseudo = (pseudo: string) => {
    let sanitizedPseudo = sanitizeInput(pseudo); // Nettoyage de la valeur du pseudo entré
    const response = checkInputValue(sanitizedPseudo); // Check du respect métier de la valeur entrée
    return response;
}