const displayOutput = document.getElementById("calc-display");
const buttonSelectors = document.getElementsByClassName("btn");

let currentValue = "";

for (let i = 0; i < buttonSelectors.length; i++) {
    const button = buttonSelectors[i];
    button.addEventListener("click", () => {
        displayOutput.value = "";
        const value = button.innerText;

        const evaluate = () => {
            if (currentValue.match(/(\d+)!/)) {
                const inputValue = currentValue;
                // Extract the numeric value (7) from the input
                const numericValue = parseInt(inputValue);
                console.log(numericValue);
                let result = 1;
                for (let i = 2; i <= numericValue; i++) {
                    result *= i;
                }
                currentValue = result;
            } else {
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
            }
            displayOutput.value = currentValue;
        };
        const displayHideShow = (hide, show, off, on) => {
            const toggleShow = document.querySelectorAll(show);
            const toggleHide = document.querySelectorAll(hide);

            toggleShow.forEach((element) => {
                element.classList.remove("d-none");
            });
            toggleHide.forEach((element) => {
                element.classList.add("d-none");
            });

            toggleNumber = document.querySelector(off);
            toggleFx = document.querySelector(on);

            toggleFx.classList.remove("btn-light");
            toggleNumber.classList.remove("btn-secondary");

            toggleNumber.classList.add("btn-light");
            toggleFx.classList.add("btn-secondary");
        };
        try {
            if (value === "0" && currentValue === "") {
                currentValue = "";
            } else if (value == "AC") {
                currentValue = "";
            } else if (value == "x!") {
                if (currentValue == "") {
                    currentValue += "0!";
                } else {
                    currentValue += "!";
                }
            } else if (
                value == "sin" ||
                value == "ln" ||
                value == "cos" ||
                value == "log" ||
                value == "tan" ||
                value == "√"
            ) {
                currentValue += `${value}(`;
            } else if (value == "=") {
                evaluate();
            } else if (value == "Fx") {
                displayHideShow(
                    ".col-3.show-buttons",
                    ".col-3.hide-buttons",
                    ".toggleNumber",
                    ".toggleFx"
                );
            } else if (value == "123") {
                displayHideShow(
                    ".col-3.hide-buttons",
                    ".col-3.show-buttons",
                    ".toggleFx",
                    ".toggleNumber"
                );
            } else {
                currentValue += value;
            }
            displayOutput.value = currentValue;
        } catch (error) {
            currentValue = "ERROR";
            displayOutput.value = currentValue;
            console.log(error);
        }
    });
}
