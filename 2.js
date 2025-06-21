document.addEventListener("DOMContentLoaded", function() {
    const userText = document.getElementById("userText");
    const actionType = document.getElementById("actionType");
    const cipherType = document.getElementById("cipherType");
    const cipherOptionsContainer = document.getElementById("cipherOptionsContainer");
    const executeBtn = document.getElementById("executeBtn");
    const originalAlphabet = document.getElementById("originalAlphabet");
    const keyValue = document.getElementById("keyValue");
    const privateKeyValue = document.getElementById("privateKeyValue");
    const resultText = document.getElementById("resultText");
    const additionalInputContainer = document.getElementById("additionalInputContainer");

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
        let privateKey = "";
        originalAlphabet.textContent = "";
        keyValue.textContent = "";
        privateKeyValue.textContent = "";
        additionalInputContainer.innerHTML = ""; // Clear previous inputs

        function createInputField(labelText, placeholder, callback) {
            const label = document.createElement("label");
            label.textContent = labelText;
            const input = document.createElement("input");
            input.type = "text";
            input.placeholder = placeholder;
            const button = document.createElement("button");
            button.textContent = "Submit";
            button.addEventListener("click", function() {
                callback(input.value);
                additionalInputContainer.innerHTML = ""; // Clear the input field after use
            });
            additionalInputContainer.appendChild(label);
            additionalInputContainer.appendChild(input);
            additionalInputContainer.appendChild(button);
        }

        function handleCaesarCipher() {
            createInputField("Enter shift value (leave blank for random):", "Shift value", function(shift) {
                [result, key] = caesarCipher(text, action, shift);
                keyValue.textContent = key ? `Shift: ${key}` : "";
                resultText.value = result;
            });
        }

        if (selectedType === "substitution") {
            switch (cipherOption) {
                case "caesar":
                    handleCaesarCipher();
                    break;
                case "mono":
                    [result, key] = monoAlphabeticCipher(text, action);
                    originalAlphabet.textContent = "Alphabet: ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                    keyValue.textContent = key ? `Key: ${key}` : "";
                    break;
                case "poly":
                    createInputField("Enter keyword:", "Keyword", function(keyword) {
                        [result, key] = polyAlphabeticCipher(text, action, keyword);
                        keyValue.textContent = key ? `Key: ${key}` : "";
                        resultText.value = result;
                    });
                    break;
                case "playfair":
                    createInputField("Enter key word:", "Key word", function(keyword) {
                        [result, key] = playfairCipher(text, action, keyword);
                        keyValue.textContent = key ? `Key: ${key}` : "";
                        resultText.value = result;
                    });
                    break;
                case "hill":
                    createInputField("Enter a 9-letter keyword:", "9-letter keyword", function(keyword) {
                        [result, key] = hillCipher(text, action, keyword);
                        keyValue.textContent = key ? `Key: ${key}` : "";
                        resultText.value = result;
                    });
                    break;
            }
        } else if (selectedType === "transposition") {
            switch (cipherOption) {
                case "rail":
                    createInputField("Enter number of rails:", "Number of rails", function(rails) {
                        [result, key] = railFenceCipher(text, action, rails);
                        keyValue.textContent = key ? `Key: ${key}` : "";
                        resultText.value = result;
                    });
                    break;
                case "route":
                    createInputField("Enter key (rows and columns, e.g., '3,4'):", "Key", function(key) {
                        [result, key] = routeCipher(text, action, key);
                        keyValue.textContent = key ? `Key: ${key}` : "";
                        resultText.value = result;
                    });
                    break;
                case "single":
                    createInputField("Enter key (word):", "Key", function(key) {
                        [result, key] = singleColumnarTranspositionCipher(text, action, key);
                        keyValue.textContent = key ? `Key: ${key}` : "";
                        resultText.value = result;
                    });
                    break;
                case "double":
                    createInputField("Enter first key (word):", "First Key", function(key1) {
                        createInputField("Enter second key (word):", "Second Key", function(key2) {
                            [result, key] = doubleColumnarTranspositionCipher(text, action, key1, key2);
                            keyValue.textContent = key ? `Keys: ${key[0]} and ${key[1]}` : "";
                            resultText.value = result;
                        });
                    });
                    break;
                case "onetime":
                    createInputField("Enter key (random string of same length as text):", "Key", function(key) {
                        [result, key] = oneTimePadCipher(text, action, key);
                        keyValue.textContent = key ? `Key: ${key}` : "";
                        resultText.value = result;
                    });
                    break;
            }
        } else if (selectedType === "modern") {
            switch (cipherOption) {
                case "aes":
                    createInputField("Enter AES key (16, 24, or 32 characters):", "AES Key", function(key) {
                        [result, key] = aesCipher(text, action, key);
                        keyValue.textContent = key ? `Key: ${key}` : "";
                        resultText.value = result;
                    });
                    break;
                case "des":
                    createInputField("Enter DES key (8 characters):", "DES Key", function(key) {
                        [result, key] = desCipher(text, action, key);
                        keyValue.textContent = key ? `Key: ${key}` : "";
                        resultText.value = result;
                    });
                    break;
                case "rsa":
                    createInputField("Enter public or private key:", "RSA Key", function(key) {
                        [result, key, privateKey] = rsaCipher(text, action, key);
                        keyValue.textContent = key ? `Public Key: ${key}` : "";
                        privateKeyValue.textContent = privateKey ? `Private Key: ${privateKey}` : "";
                        resultText.value = result;
                    });
                    break;
                case "ecc":
                    createInputField("Enter public or private key:", "ECC Key", function(key) {
                        [result, key, privateKey] = eccCipher(text, action, key);
                        keyValue.textContent = key ? `Public Key: ${key}` : "";
                        privateKeyValue.textContent = privateKey ? `Private Key: ${privateKey}` : "";
                        resultText.value = result;
                    });
                    break;
            }
        }
    });

    function caesarCipher(text, action, shift) {
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

    function monoAlphabeticCipher(text, action) {
        const alphabetKey = generateRandomAlphabet();
        const result = text.split('').map(char => {
            if (char.match(/[a-z]/i)) {
                let code = char.charCodeAt();
                let base = code < 97 ? 65 : 97;
                let index = code - base;
                return action === "encrypt" ? alphabetKey[index] : String.fromCharCode(alphabetKey.indexOf(char.toUpperCase()) + base);
            }
            return char;
        }).join('');
        return [result, alphabetKey.join('')];
    }

    function generateRandomAlphabet() {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        for (let i = alphabet.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [alphabet[i], alphabet[j]] = [alphabet[j], alphabet[i]];
        }
        return alphabet;
    }

    function polyAlphabeticCipher(text, action, keyword) {
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

    function playfairCipher(text, action, keyword) {
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

    function hillCipher(text, action, keyword) {
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

    function railFenceCipher(text, action, numRails) {
        if (!numRails || isNaN(numRails)) {
            alert("Valid number of rails is required for Rail Fence Cipher.");
            return [text, ""];
        }
        numRails = parseInt(numRails);
        const result = action === "encrypt"
            ? railFenceEncrypt(text, numRails)
            : railFenceDecrypt(text, numRails);
        return [result, numRails];
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

    function routeCipher(text, action, key) {
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

    function singleColumnarTranspositionCipher(text, action, key) {
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

    function doubleColumnarTranspositionCipher(text, action, key1, key2) {
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

    function oneTimePadCipher(text, action, key) {
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