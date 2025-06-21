document.addEventListener("DOMContentLoaded", function() {
    const userText = document.getElementById("userText");
    const actionType = document.getElementById("actionType");
    const cipherType = document.getElementById("cipherType");
    const cipherOptionsContainer = document.getElementById("cipherOptionsContainer");
    const executeBtn = document.getElementById("executeBtn");
    const originalAlphabet = document.getElementById("originalAlphabet");
    const keyValue = document.getElementById("keyValue");
    const resultText = document.getElementById("resultText");

    cipherType.addEventListener("change", function() {
        const selectedType = cipherType.value;
        document.querySelectorAll(".cipher-select").forEach(select => select.style.display = "none");
        if (selectedType) {
            document.getElementById(selectedType + "Type").style.display = "block";
            cipherOptionsContainer.style.display = "block";
        } else {
            cipherOptionsContainer.style.display = "none";
        }
    });

    executeBtn.addEventListener("click", function() {
        const text = userText.value;
        const action = actionType.value;
        const selectedType = cipherType.value;
        const cipherOption = document.getElementById(selectedType + "Type").value;

        let result = "";
        let key = "";
        originalAlphabet.textContent = "";
        keyValue.textContent = "";

        if (selectedType === "substitution") {
            switch (cipherOption) {
                case "caesar":
                    [result, key] = caesarCipher(text, action);
                    keyValue.textContent = key ? `Shift: ${key}` : "";
                    break;
                case "mono":
                    [result, key] = monoAlphabeticCipher(text, action);
                    originalAlphabet.textContent = "Alphabet: ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                    keyValue.textContent = key ? `Key: ${key}` : "";
                    break;
                case "poly":
                    [result, key] = polyAlphabeticCipher(text, action);
                    keyValue.textContent = key ? `Key: ${key}` : "";
                    break;
                case "playfair":
                    [result, key] = playfairCipher(text, action);
                    keyValue.textContent = key ? `Key: ${key}` : "";
                    break;
                case "hill":
                    [result, key] = hillCipher(text, action);
                    keyValue.textContent = key ? `Key: ${key}` : "";
                    break;
            }
        } else if (selectedType === "transposition") {
            switch (cipherOption) {
                case "rail":
                    [result, key] = railFenceCipher(text, action);
                    keyValue.textContent = key ? `Key: ${key}` : "";
                    break;
                case "route":
                    [result, key] = routeCipher(text, action);
                    keyValue.textContent = key ? `Key: ${key}` : "";
                    break;
                case "single":
                    [result, key] = singleColumnarTranspositionCipher(text, action);
                    keyValue.textContent = key ? `Key: ${key}` : "";
                    break;
                case "double":
                    [result, key] = doubleColumnarTranspositionCipher(text, action);
                    keyValue.textContent = key ? `Keys: ${key[0]} and ${key[1]}` : "";
                    break;
                case "onetime":
                    [result, key] = oneTimePadCipher(text, action);
                    keyValue.textContent = key ? `Key: ${key}` : "";
                    break;
            }
        } else if (selectedType === "modern") {
            switch (cipherOption) {
                case "aes":
                [result, key] = aesCipher(text, action);
                keyValue.textContent = key ? `Key: ${key}` : "";
                break;
            case "des":
                [result, key] = desCipher(text, action);
                keyValue.textContent = key ? `Key: ${key}` : "";
                break;
            case "rsa":
                [result, key, privateKey] = rsaCipher(text, action); // Update this line
                keyValue.textContent = key ? `Public Key: ${key}` : "";
                privateKeyValue.textContent = privateKey ? `Private Key: ${privateKey}` : ""; // Add this line
                break;
            case "ecc":
                [result, key, privateKey] = eccCipher(text, action);
                keyValue.textContent = key ? `Public Key: ${key}` : "";
                privateKeyValue.textContent = privateKey ? `Private Key: ${privateKey}` : "";
                break;
        }
    }

        resultText.value = result;
    });

    function caesarCipher(text, action) {
        let shift = prompt("Enter shift value (leave blank for random):");
        if (!shift) {
            shift = Math.floor(Math.random() * 25) + 1; // Random shift between 1 and 25
        } else {
            shift = parseInt(shift);
            if (isNaN(shift)) {
                alert("Invalid shift value. Please enter a number.");
                return [text, 0];
            }
        }
        if (action === "decrypt") {
            shift = 26 - shift;
        }
        const result = text.split('').map(char => {
            if (char.match(/[a-z]/i)) {
                let code = char.charCodeAt();
                let base = code < 97 ? 65 : 97;
                return String.fromCharCode(((code - base + shift) % 26) + base);
            }
            return char;
        }).join('');
        return [result, shift];
    }

    function monoAlphabeticCipher(text, action, key) {
        let alphabetKey;
        let usedKey;
    
        if (action === "encrypt") {
            alphabetKey = generateRandomAlphabet();
            usedKey = alphabetKey.join('');
        } else if (action === "decrypt") {
            if (!key) {
                usedKey = prompt("Please provide the key for decryption:");
                if (!usedKey) {
                    console.log("No key provided. Exiting decryption.");
                    return;
                }
                usedKey = usedKey.toUpperCase();
                alphabetKey = usedKey.split('');
            } else {
                usedKey = key.toUpperCase();
                alphabetKey = usedKey.split('');
            }
        } else {
            return "Invalid action.";
        }
    
        const result = text.split('').map(char => {
            if (char.match(/[a-z]/i)) {
                let code = char.charCodeAt();
                let base = code < 97 ? 65 : 97;
                let index = code - base;
                return action === "encrypt" ? alphabetKey[index] : String.fromCharCode(alphabetKey.indexOf(char.toUpperCase()) + base);
            }
            return char;
        }).join('');
    
        return [result, usedKey];
    }
    
    function generateRandomAlphabet() {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        for (let i = alphabet.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [alphabet[i], alphabet[j]] = [alphabet[j], alphabet[i]];
        }
        return alphabet;
    }
    
    function polyAlphabeticCipher(text, action) {
        const keyword = prompt("Enter keyword:");
        if (!keyword) {
            alert("Keyword is required for PolyAlphabetic Cipher.");
            return [text, ""];
        }
        let result = "";
        let keyIndex = 0;
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (char.match(/[a-z]/i)) {
                const isUpperCase = char === char.toUpperCase();
                const base = isUpperCase ? 65 : 97;
                const keyChar = keyword[keyIndex % keyword.length].toLowerCase();
                const shift = keyChar.charCodeAt() - 97;
                let code = char.charCodeAt();
                code = action === "encrypt"
                    ? (code - base + shift) % 26
                    : (code - base - shift + 26) % 26;
                result += String.fromCharCode(code + base);
                keyIndex++;
            } else {
                result += char;
            }
        }
        return [result, keyword];
    }

    function playfairCipher(text, action) {
        const keyword = prompt("Enter key word:");
        if (!keyword) {
            alert("Key word is required for Playfair Cipher.");
            return [text, ""];
        }
        const matrix = createPlayfairMatrix(keyword);
        let processedText = processPlayfairText(text, action);
        let result = "";
        for (let i = 0; i < processedText.length; i += 2) {
            const [char1, char2] = [processedText[i], processedText[i + 1]];
            result += playfairEncryptDecrypt(char1, char2, matrix, action);
        }
        return [result, keyword];
    }

    function createPlayfairMatrix(keyword) {
        const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ"; // J is excluded
        keyword = keyword.toUpperCase().replace(/J/g, "I");
        let matrix = "";
        for (let char of keyword) {
            if (!matrix.includes(char) && alphabet.includes(char)) {
                matrix += char;
            }
        }
        for (let char of alphabet) {
            if (!matrix.includes(char)) {
                matrix += char;
            }
        }
        return matrix;
    }

    function processPlayfairText(text, action) {
        text = text.toUpperCase().replace(/J/g, "I").replace(/[^A-Z]/g, "");
        let processedText = "";
        for (let i = 0; i < text.length; i += 2) {
            let char1 = text[i];
            let char2 = text[i + 1];
            if (!char2 || char1 === char2) {
                char2 = "X";
                i--;
            }
            processedText += char1 + char2;
        }
        return processedText;
    }

    function playfairEncryptDecrypt(char1, char2, matrix, action) {
        const index1 = matrix.indexOf(char1);
        const index2 = matrix.indexOf(char2);
        const row1 = Math.floor(index1 / 5);
        const col1 = index1 % 5;
        const row2 = Math.floor(index2 / 5);
        const col2 = index2 % 5;
        let newChar1, newChar2;
        if (row1 === row2) {
            if (action === "encrypt") {
                newChar1 = matrix[row1 * 5 + (col1 + 1) % 5];
                newChar2 = matrix[row2 * 5 + (col2 + 1) % 5];
            } else {
                newChar1 = matrix[row1 * 5 + (col1 + 4) % 5];
                newChar2 = matrix[row2 * 5 + (col2 + 4) % 5];
            }
        } else if (col1 === col2) {
            if (action === "encrypt") {
                newChar1 = matrix[((row1 + 1) % 5) * 5 + col1];
                newChar2 = matrix[((row2 + 1) % 5) * 5 + col2];
            } else {
                newChar1 = matrix[((row1 + 4) % 5) * 5 + col1];
                newChar2 = matrix[((row2 + 4) % 5) * 5 + col2];
            }
        } else {
            newChar1 = matrix[row1 * 5 + col2];
            newChar2 = matrix[row2 * 5 + col1];
        }
        return newChar1 + newChar2;
    }

    function hillCipher(text, action) {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
        function mod(n, m) {
            return ((n % m) + m) % m;
        }
    
        function matrixModInverse(matrix, modulus) {
            const det = determinant(matrix);
            const detModInverse = modInverse(det, modulus);
    
            const adjoint = matrix.map((row, i) =>
                row.map((_, j) => {
                    const subMatrix = matrix.filter((_, k) => k !== i).map(row => row.filter((_, l) => l !== j));
                    return Math.pow(-1, i + j) * determinant(subMatrix);
                })
            );
    
            const inverse = adjoint[0].map((_, i) =>
                adjoint.map(row => mod(row[i] * detModInverse, modulus))
            );
    
            return inverse;
        }
    
        function determinant(matrix) {
            if (matrix.length === 1) {
                return matrix[0][0];
            } else if (matrix.length === 2) {
                return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
            } else {
                let det = 0;
                for (let i = 0; i < matrix[0].length; i++) {
                    const subMatrix = matrix.slice(1).map(row => row.filter((_, j) => j !== i));
                    det += Math.pow(-1, i) * matrix[0][i] * determinant(subMatrix);
                }
                return det;
            }
        }
    
        function modInverse(a, m) {
            a = mod(a, m);
            for (let x = 1; x < m; x++) {
                if ((a * x) % m === 1) {
                    return x;
                }
            }
            return 1;
        }
    
        function encrypt(key, text) {
            const plainText = text.toUpperCase().replace(/[^A-Z]/g, '');
            const paddedText = plainText.padEnd(Math.ceil(plainText.length / 3) * 3, 'X');
    
            const encryptedText = [];
            for (let i = 0; i < paddedText.length; i += 3) {
                const vector = paddedText.slice(i, i + 3).split('').map(char => alphabet.indexOf(char));
                const encryptedVector = key.map(row => mod(row.reduce((sum, val, j) => sum + val * vector[j], 0), 26));
                encryptedText.push(...encryptedVector.map(num => alphabet[num]));
            }
    
            return encryptedText.join('');
        }
    
        function decrypt(key, text) {
            const cipherText = text.toUpperCase().replace(/[^A-Z]/g, '');
            const inverseKey = matrixModInverse(key, 26);
    
            const decryptedText = [];
            for (let i = 0; i < cipherText.length; i += 3) {
                const vector = cipherText.slice(i, i + 3).split('').map(char => alphabet.indexOf(char));
                const decryptedVector = inverseKey.map(row => mod(row.reduce((sum, val, j) => sum + val * vector[j], 0), 26));
                decryptedText.push(...decryptedVector.map(num => alphabet[num]));
            }
    
            return decryptedText.join('').replace(/X*$/, '');
        }
    
        const keyword = prompt("Enter a 9-letter keyword:");
        if (!keyword || keyword.length !== 9) {
            alert("Keyword must be 9 letters.");
            return [text, ""];
        }
    
        const keyMatrix = keyword.toUpperCase().replace(/[^A-Z]/g, '').split('').map(char => alphabet.indexOf(char));
        const key = [
            keyMatrix.slice(0, 3),
            keyMatrix.slice(3, 6),
            keyMatrix.slice(6, 9)
        ];
    
        let result;
        if (action === "encrypt") {
            result = encrypt(key, text);
        } else {
            result = decrypt(key, text);
        }
    
        return [result, keyword];
    }

    function railFenceCipher(text, action) {
        const key = prompt("Enter number of rails:");
        if (!key || isNaN(key)) {
            alert("Valid number of rails is required for Rail Fence Cipher.");
            return [text, ""];
        }
        const numRails = parseInt(key);
        const result = action === "encrypt"
            ? railFenceEncrypt(text, numRails)
            : railFenceDecrypt(text, numRails);
        return [result, key];
    }

    function railFenceEncrypt(text, numRails) {
        const rails = Array.from({ length: numRails }, () => []);
        let direction = 1;
        let rail = 0;
        for (const char of text) {
            rails[rail].push(char);
            rail += direction;
            if (rail === 0 || rail === numRails - 1) direction *= -1;
        }
        return rails.flat().join('');
    }

    function railFenceDecrypt(text, numRails) {
        const length = text.length;
        const rails = Array.from({ length: numRails }, () => Array(length).fill(null));
        let direction = 1;
        let rail = 0;
        for (let i = 0; i < length; i++) {
            rails[rail][i] = true;
            rail += direction;
            if (rail === 0 || rail === numRails - 1) direction *= -1;
        }
        const result = [];
        let index = 0;
        for (let r = 0; r < numRails; r++) {
            for (let i = 0; i < length; i++) {
                if (rails[r][i] === true) {
                    rails[r][i] = text[index++];
                }
            }
        }
        rail = 0;
        direction = 1;
        for (let i = 0; i < length; i++) {
            result.push(rails[rail][i]);
            rail += direction;
            if (rail === 0 || rail === numRails - 1) direction *= -1;
        }
        return result.join('');
    }

    function routeCipher(text, action) {
        const key = prompt("Enter key (rows and columns, e.g., '3,4'):");
        if (!key) {
            alert("Key is required for Route Cipher.");
            return [text, ""];
        }
        const [rows, cols] = key.split(',').map(Number);
        if (isNaN(rows) || isNaN(cols)) {
            alert("Invalid key. Please enter rows and columns as numbers.");
            return [text, ""];
        }
        const result = action === "encrypt"
            ? routeCipherEncrypt(text, rows, cols)
            : routeCipherDecrypt(text, rows, cols);
        return [result, key];
    }

    function routeCipherEncrypt(text, rows, cols) {
        const grid = Array.from({ length: rows }, () => Array(cols).fill(''));
        for (let i = 0; i < text.length; i++) {
            grid[Math.floor(i / cols)][i % cols] = text[i];
        }
        let result = '';
        for (let col = 0; col < cols; col++) {
            for (let row = 0; row < rows; row++) {
                result += grid[row][col] || ' ';
            }
        }
        return result;
    }

    function routeCipherDecrypt(text, rows, cols) {
        const grid = Array.from({ length: rows }, () => Array(cols).fill(''));
        let index = 0;
        for (let col = 0; col < cols; col++) {
            for (let row = 0; row < rows; row++) {
                grid[row][col] = text[index++];
            }
        }
        return grid.flat().join('').trim();
    }

    function singleColumnarTranspositionCipher(text, action) {
        const key = prompt("Enter key (word):");
        if (!key) {
            alert("Key is required for Single Columnar Transposition Cipher.");
            return [text, ""];
        }
        const columnOrder = generateColumnOrder(key);
        const result = action === "encrypt"
            ? columnarTranspositionEncrypt(text, columnOrder)
            : columnarTranspositionDecrypt(text, columnOrder);
        return [result, key];
    }
    
    function generateColumnOrder(key) {
        const uniqueChars = [...new Set(key)];
        const columnOrder = new Array(key.length);
        uniqueChars.forEach((char, index) => {
            key.split('').forEach((c, i) => {
                if (c === char) {
                    columnOrder[i] = index;
                }
            });
        });
        return columnOrder;
    }
    
    function columnarTranspositionEncrypt(text, columnOrder) {
        const numCols = columnOrder.length;
        const numRows = Math.ceil(text.length / numCols);
        const grid = Array.from({ length: numRows }, () => Array(numCols).fill(''));
        for (let i = 0; i < text.length; i++) {
            grid[Math.floor(i / numCols)][i % numCols] = text[i];
        }
        const result = [];
        for (let col = 0; col < numCols; col++) {
            const actualCol = columnOrder.indexOf(col);
            for (let row = 0; row < numRows; row++) {
                result.push(grid[row][actualCol] || ' ');
            }
        }
        return result.join('');
    }
    
    function columnarTranspositionDecrypt(text, columnOrder) {
        const numCols = columnOrder.length;
        const numRows = Math.ceil(text.length / numCols);
        const grid = Array.from({ length: numRows }, () => Array(numCols).fill(''));
        const colLengths = Array(numCols).fill(Math.floor(text.length / numCols));
        for (let i = 0; i < text.length % numCols; i++) {
            colLengths[columnOrder.indexOf(i)]++;
        }
        let index = 0;
        for (let col = 0; col < numCols; col++) {
            const actualCol = columnOrder.indexOf(col);
            for (let row = 0; row < colLengths[actualCol]; row++) {
                grid[row][actualCol] = text[index++];
            }
        }
        return grid.flat().join('').trim();
    }

    function doubleColumnarTranspositionCipher(text, action) {
        const key1 = prompt("Enter first key (word):");
        const key2 = prompt("Enter second key (word):");
        if (!key1 || !key2) {
            alert("Two keys are required for Double Columnar Transposition Cipher.");
            return [text, ["", ""]];
        }
        const columnOrder1 = generateDoubleColumnOrder(key1);
        const columnOrder2 = generateDoubleColumnOrder(key2);
        let intermediate, result;
        if (action === "encrypt") {
            intermediate = doubleColumnarEncrypt(text, columnOrder1);
            result = doubleColumnarEncrypt(intermediate, columnOrder2);
        } else {
            intermediate = doubleColumnarDecrypt(text, columnOrder2);
            result = doubleColumnarDecrypt(intermediate, columnOrder1);
        }
        return [result, [key1, key2]];
    }
    
    function generateDoubleColumnOrder(key) {
        const uniqueChars = [...new Set(key)];
        const columnOrder = new Array(key.length);
        uniqueChars.forEach((char, index) => {
            key.split('').forEach((c, i) => {
                if (c === char) {
                    columnOrder[i] = index;
                }
            });
        });
        return columnOrder;
    }
    
    function doubleColumnarEncrypt(text, columnOrder) {
        const numCols = columnOrder.length;
        const numRows = Math.ceil(text.length / numCols);
        const grid = Array.from({ length: numRows }, () => Array(numCols).fill(''));
        for (let i = 0; i < text.length; i++) {
            grid[Math.floor(i / numCols)][i % numCols] = text[i];
        }
        const result = [];
        for (let col = 0; col < numCols; col++) {
            const actualCol = columnOrder.indexOf(col);
            for (let row = 0; row < numRows; row++) {
                result.push(grid[row][actualCol] || ' ');
            }
        }
        return result.join('');
    }
    
    function doubleColumnarDecrypt(text, columnOrder) {
        const numCols = columnOrder.length;
        const numRows = Math.ceil(text.length / numCols);
        const grid = Array.from({ length: numRows }, () => Array(numCols).fill(''));
        const colLengths = Array(numCols).fill(Math.floor(text.length / numCols));
        for (let i = 0; i < text.length % numCols; i++) {
            colLengths[columnOrder.indexOf(i)]++;
        }
        let index = 0;
        for (let col = 0; col < numCols; col++) {
            const actualCol = columnOrder.indexOf(col);
            for (let row = 0; row < colLengths[actualCol]; row++) {
                grid[row][actualCol] = text[index++];
            }
        }
        return grid.flat().join('').trim();
    }
    
    function oneTimePadCipher(text, action) {
        const key = prompt("Enter key (random string of same length as text):");
        if (!key) {
          alert("Key is required for One-Time Pad Cipher.");
          return [text, ""];
        }
        if (key.length !== text.length) {
          alert("Key must be the same length as the text.");
          return [text, ""];
        }
        const result = text.split('').map((char, index) => {
          let textCharCode = char.charCodeAt(0);
          let keyCharCode = key.charCodeAt(index);
          
          // Adjust character codes for lowercase letters
          if (textCharCode >= 97 && textCharCode <= 122) { // a-z
            textCharCode -= 97; // Convert to numeric value (a=0, b=1, ..., z=25)
          } else if (textCharCode >= 65 && textCharCode <= 90) { // A-Z
            textCharCode -= 65; // Convert to numeric value (A=0, B=1, ..., Z=25)
          } else {
            // Keep non-alphabetic characters unchanged
            return String.fromCharCode(textCharCode);
          }
          
          // Adjust character codes for lowercase letters in the key
          if (keyCharCode >= 97 && keyCharCode <= 122) { // a-z
            keyCharCode -= 97;
          } else if (keyCharCode >= 65 && keyCharCode <= 90) { // A-Z
            keyCharCode -= 65;
          }
          
          let code;
          if (action === "encrypt") {
            code = (textCharCode + keyCharCode) % 26; // Modular addition
          } else {
            code = (textCharCode - keyCharCode + 26) % 26; // Modular subtraction
          }
          
          // Convert back to character
          if (char === char.toLowerCase()) {
            return String.fromCharCode(code + 97);
          } else {
            return String.fromCharCode(code + 65);
          }
        }).join('');
        return [result, key];
      }
    
      function aesCipher(text, action) {
        const CryptoJS = window.CryptoJS;
        let result;
        let key;
    
        if (action === "encrypt") {
            let generateNewKey = confirm("Do you want to generate a new AES key?");
            if (generateNewKey) {
                // Generate a new 32-byte key (256-bit)
                key = CryptoJS.lib.WordArray.random(32).toString().substring(0, 32);
                alert(`Generated AES Key: ${key}`);
                localStorage.setItem('aesKey', key);
            } else {
                key = localStorage.getItem('aesKey') || prompt("Enter AES key (16, 24, or 32 characters):");
                if (!key || (key.length !== 16 && key.length !== 24 && key.length !== 32)) {
                    alert("Key must be 16, 24, or 32 characters.");
                    return [text, ""];
                }
            }
            result = CryptoJS.AES.encrypt(text, key).toString();
        } else {
            key = prompt("Enter AES key (16, 24, or 32 characters):");
            if (!key || (key.length !== 16 && key.length !== 24 && key.length !== 32)) {
                alert("Key must be 16, 24, or 32 characters.");
                return [text, ""];
            }
            try {
                const bytes = CryptoJS.AES.decrypt(text, key);
                result = bytes.toString(CryptoJS.enc.Utf8);
                if (!result) {
                    throw new Error("Decryption failed. Invalid key or ciphertext.");
                }
            } catch (error) {
                alert("Decryption failed. Invalid key or ciphertext.");
                return [text, ""];
            }
        }
        return [result, key];
    }
    
    function desCipher(text, action) {
        const CryptoJS = window.CryptoJS;
        let result;
        let key;
    
        if (action === "encrypt") {
            let generateNewKey = confirm("Do you want to generate a new DES key?");
            if (generateNewKey) {
                // Generate a new 8-byte key (64-bit)
                key = CryptoJS.lib.WordArray.random(8).toString().substring(0, 8);
                alert(`Generated DES Key: ${key}`);
                localStorage.setItem('desKey', key);
            } else {
                key = localStorage.getItem('desKey') || prompt("Enter DES key (8 characters):");
                if (!key || key.length !== 8) {
                    alert("Key must be 8 characters.");
                    return [text, ""];
                }
            }
            result = CryptoJS.DES.encrypt(text, key).toString();
        } else {
            key = prompt("Enter DES key (8 characters):");
            if (!key || key.length !== 8) {
                alert("Key must be 8 characters.");
                return [text, ""];
            }
            try {
                const bytes = CryptoJS.DES.decrypt(text, key);
                result = bytes.toString(CryptoJS.enc.Utf8);
                if (!result) {
                    throw new Error("Decryption failed. Invalid key or ciphertext.");
                }
            } catch (error) {
                alert("Decryption failed. Invalid key or ciphertext.");
                return [text, ""];
            }
        }
        return [result, key];
    }
    

    function rsaCipher(text, action) {
        const keySize = 2048;
        const crypt = new JSEncrypt({ default_key_size: keySize });
        let result;
        let privateKey = ""; // Add this line to declare privateKey
    
        // Check if the user wants to generate a new key pair
        let generateNewKeys = confirm("Do you want to generate a new key pair?");
        if (generateNewKeys) {
            crypt.getKey();
            const publicKey = crypt.getPublicKey();
            privateKey = crypt.getPrivateKey();
            alert(`Generated Public Key:\n${publicKey}\n\nGenerated Private Key:\n${privateKey}`);
            
            // Store keys in local storage for future use
            localStorage.setItem('rsaPublicKey', publicKey);
            localStorage.setItem('rsaPrivateKey', privateKey);
    
            if (action === "encrypt") {
                result = crypt.encrypt(text);
                return [result, publicKey, privateKey];
            } else {
                result = crypt.decrypt(text);
                return [result, privateKey];
            }
        } else {
            if (action === "encrypt") {
                let publicKey = localStorage.getItem('rsaPublicKey') || prompt("Enter public key:");
                if (!publicKey) {
                    alert("Public key is required for RSA encryption.");
                    return [text, "", ""];
                }
                crypt.setPublicKey(publicKey);
                result = crypt.encrypt(text);
                privateKey = localStorage.getItem('rsaPrivateKey');
                return [result, publicKey, privateKey];
    
            } else {
                privateKey = localStorage.getItem('rsaPrivateKey') || prompt("Enter private key:");
                if (!privateKey) {
                    alert("Private key is required for RSA decryption.");
                    return [text, ""];
                }
                crypt.setPrivateKey(privateKey);
                result = crypt.decrypt(text);
                return [result, privateKey];
            }
        }
    }

    function eccCipher(text, action) {
        const EC = window.elliptic.ec;
        const ec = new EC('secp256k1');
    
        let result;
        let publicKey;
        let privateKey;
    
        if (action === "encrypt") {
            const key = ec.genKeyPair();
            publicKey = key.getPublic('hex');
            privateKey = key.getPrivate('hex');
            alert(`Generated Public Key:\n${publicKey}\n\nGenerated Private Key:\n${privateKey}`);
    
            const msgHash = ec.hash().update(text).digest();
            const signature = key.sign(msgHash);
            result = {
                r: signature.r.toString(16),
                s: signature.s.toString(16)
            };
            localStorage.setItem('eccMessage', text); // Store the original message in local storage
            result = JSON.stringify(result); // Convert the result object to a string for display
        } else {
            const signatureStr = text; // Assuming the signature is already in the input
            if (!signatureStr) {
                alert("Signature is required for ECC verification.");
                return ["", "", ""];
            }
    
            publicKey = prompt("Enter public key:");
            if (!publicKey) {
                alert("Public key is required for ECC verification.");
                return ["", "", ""];
            }
    
            const message = localStorage.getItem('eccMessage'); // Retrieve the original message from local storage
            if (!message) {
                alert("Original message is not available for ECC verification.");
                return ["", "", ""];
            }
    
            const key = ec.keyFromPublic(publicKey, 'hex');
            const signature = JSON.parse(signatureStr); // Parse the signature object from the string
            const msgHash = ec.hash().update(message).digest(); // Hash the original message
            const isValid = key.verify(msgHash, signature);
    
            result = isValid ? "Signature is valid" : "Signature is invalid";
        }
    
        return [result, publicKey, privateKey];
    }
});
