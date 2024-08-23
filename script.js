// Constantes globales para encriptación/desencriptación
const arrayCode = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"]
];

// Funciones de transformación
const encrypt = (inputText) => {
    let transformedText = inputText.toLowerCase();
    for (let i = 0; i < arrayCode.length; i++) {
        transformedText = transformedText.replaceAll(arrayCode[i][0], arrayCode[i][1]);
    }
    return transformedText;
};

const decrypt = (stringDesencriptada) => {
    stringDesencriptada = stringDesencriptada.toLowerCase();
    for (let i = 0; i < arrayCode.length; i++) {
        if (stringDesencriptada.includes(arrayCode[i][1])) {
            stringDesencriptada = stringDesencriptada.replaceAll(arrayCode[i][1], arrayCode[i][0]);
        }
    }
    return stringDesencriptada;
};

// Funciones de interacción con la UI
const updateMessageArea = (text) => {
    const message = document.querySelector(".output-area");
    message.value = text;
    message.style.backgroundImage = "none";
};

const clearInputArea = () => {
    const textArea = document.querySelector(".input-area");
    textArea.value = "";
};

const validateInput = (inputText) => {
    return inputText.trim() !== "";
};

// Eventos de botones
const btnEncrypt = () => {
    const textArea = document.querySelector(".input-area");
    const inputText = textArea.value;

    if (!validateInput(inputText)) {
        alert("Por favor, ingrese un texto para encriptar.");
        return;
    }

    const encryptedText = encrypt(inputText);
    updateMessageArea(encryptedText);
    clearInputArea();
};

const btnDecrypt = () => {
    const textArea = document.querySelector(".input-area");
    const message = document.querySelector(".output-area");
    const inputText = textArea.value;

    if (!validateInput(inputText)) {
        alert("Por favor, ingrese un texto para desencriptar.");
        return;
    }

    const decryptedText = decrypt(inputText);
    message.value = decryptedText;
    clearInputArea();
};

// Función de copiar texto al portapapeles y vaciar el área de salida
const btnCopy = () => {
    const message = document.querySelector(".output-area");
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(message.value)
            .then(() => {
                alert("Texto copiado al portapapeles");
                message.value = "";  // Vaciar el textarea después de copiar
            })
            .catch(err => {
                console.error("Error al copiar el texto: ", err);
                alert("Hubo un error al copiar el texto.");
            });
    } else {
        alert("Lo siento, tu navegador no soporta la API de Portapapeles.");
    }
};

// Agregando eventos a los botones
document.querySelector(".btn-encrypt").addEventListener("click", btnEncrypt);
document.querySelector(".btn-decrypt").addEventListener("click", btnDecrypt);
document.querySelector(".btn-copy").addEventListener("click", btnCopy);
