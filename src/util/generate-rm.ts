export const generateRekamMedis = () => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;

    return randomNumber.toString().padStart(5, '0');
};