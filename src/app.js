const displayOutput = document.getElementById("calc-display");
const buttonSelectors = document.getElementsByClassName("btn");

document.addEventListener("DOMContentLoaded", function () {
    displayOutput.value = "0";
});

let currentValue = "";

for (let i = 0; i < buttonSelectors.length; i++) {
    const button = buttonSelectors[i];
    button.addEventListener("click", () => {
        displayOutput.value = "";
        const value = button.innerText;

        const evaluate = () => {
            const convertedValue = currentValue
                .replace("÷", "/")
                .replace("x", "*")
                .replace("%", "*.01")
                .replace("sin", "Math.sin")
                .replace("cos", "Math.cos")
                .replace("ln", "Math.log")
                .replace("π", "Math.PI")
                .replace("log", "Math.log10")
                .replace("e", "Math.exp")
                .replace("tan", "Math.tan")
                .replace("√", "Math.sqrt");

            const result = eval(convertedValue);
            currentValue = result.toString();
            displayOutput.value = currentValue;
        };
        try {
            if (value == "AC") {
                currentValue = "0";
                displayOutput.value = currentValue;
            } else if (value == "=") {
                evaluate();
            } else {
                currentValue += value;
                displayOutput.value = currentValue;
            }
        } catch (error) {
            currentValue = "ERROR";
            displayOutput.value = currentValue;
        }
    });
}
