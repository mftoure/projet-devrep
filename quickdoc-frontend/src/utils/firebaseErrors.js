export const errorMessages = new Map();

errorMessages.set("auth/email-already-exists","L'adresse email est déja utilisée.");
errorMessages.set("auth/weak-password","Le mot de passe est trop faible, il doit contenir au moins 6 caractères.");
errorMessages.set("auth/unverified-email","L'adresse email n'est pas vérifiée.");
errorMessages.set("auth/account-exists-with-different-credential","Un compte Google est déjà associé à cette adresse email, essayez de vous connecter avec Google.");
errorMessages.set("auth/wrong-password","Le mot de passe est incorrect");
errorMessages.set("auth/user-not-found","Aucun compte n'est associé à cette adresse email.");
errorMessages.set("auth/invalid-email", "L'adresse email est invalide.");
errorMessages.set("auth/popup-close-by-user", "Fenêtre fermée par l'utilisateur.");
errorMessages.set("auth/email-already-in-use", "Cette adresse email est déja utilisée.");
errorMessages.set("auth/expired-action-code", "Lien expiré.");


