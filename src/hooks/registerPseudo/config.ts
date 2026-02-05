export const EMPTY_ERROR_MESSAGE = "Veuillez rentrer un pseudo !";
export const TOO_LONG_ERROR_MESSAGE = "Pseudo trop long !";
export const TOO_SHORT_ERROR_MESSAGE = "Pseudo trop court !";
export const ALREADY_TAKEN_PSEUDO = "Ce pseudo existe déjà";
export const INVALID_ERROR_MESSAGE = "Le pseudo rentré ne doit contenir que des chiffres et des lettres !";
export const MAX_LENGTH_PSEUDO = 50;
export const MIN_LENGTH_PSEUDO = 2;

const ALLOWED_CHARS = "a-zA-ZÀ-ÿ0-9 '\\-";
export const REGEX_PSEUDO = new RegExp(`^[${ALLOWED_CHARS}]+$`);
export const ANTI_REGEX_PSEUDO = new RegExp(`[^${ALLOWED_CHARS}]`, 'g');