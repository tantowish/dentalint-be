import moment from "moment-timezone";

export const generateRekamMedis = () => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;

    return randomNumber.toString().padStart(5, '0');
};

export const generateNoAntrian = () => {
    const datePart = moment().format("DDMMYY");
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    const formattedNumber = randomNumber.toString().padStart(3, '0');

    return `${datePart}-${formattedNumber}`;
};
