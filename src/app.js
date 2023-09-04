const displayOutput = document.getElementById("calc-display");
const buttonSelectors = document.getElementsByClassName("btn");

let currentValue = "";
let lastValue = "0";
let degreeeMode = false;
for (let i = 0; i < buttonSelectors.length; i++) {
    const button = buttonSelectors[i];
    button.addEventListener("click", () => {
        displayOutput.value = "";
        const value = button.innerText;

        const evaluate = () => {
            let result;
            if (currentValue.match(/(\d+)!/)) {
                const inputValue = currentValue;
                const numericValue = parseInt(inputValue);
                console.log(numericValue);
                result = 1;
                for (let i = 2; i <= numericValue; i++) {
                    result *= i;
                }
                currentValue = result;
            } else if (currentValue.includes("e^")) {
                const parts = currentValue.split("e^");
                if (parts.length === 2) {
                    const exponent = parseFloat(parts[1]);
                    result = Math.exp(exponent);

                    currentValue = result.toString();
                }
            }
            // else if (degreeeMode) {
            //     const parts = currentValue.split("(");
            //     console.log(parts);
            //     result = parseInt(parts[1]) * (180 / Math.PI);
            //     console.log("(");
            //     console.log(Math.sin(result));
            //     const convertedValue = currentValue
            //         .replace("sin", "Math.sin")
            //         .replace("cos", "Math.cos")
            //         .replace("tan", "Math.tan");

            //     result = eval(convertedValue);
            //     currentValue = result.toString();
            //     lastValue = result.toString();
            // }
            else {
                const convertedValue = currentValue
                    .replace("sin", "Math.sin")
                    .replace("cos", "Math.cos")
                    .replace("tan", "Math.tan")
                    .replace("÷", "/")
                    .replace("x", "*")
                    .replace("%", "*.01")
                    .replace("ln", "Math.log")
                    .replace("π", "Math.PI")
                    .replace("log", "Math.log10")
                    .replace("e", "2.718281828459045")
                    .replace("√", "Math.sqrt")
                    .replace("^", "**")
                    .replace("²", "**2")
                    .replace("Ans", lastValue);

                result = eval(convertedValue);
                currentValue = result.toString();
                lastValue = result.toString();
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

        function toggleInv() {
            const hideInv = document.querySelector(".first-inv");
            const showInv = document.querySelector(".second-inv");

            const sinChange = document.querySelector(".sin-button");
            const lnChange = document.querySelector(".ln-button");
            const cosChange = document.querySelector(".cos-button");
            const logChange = document.querySelector(".log-button");
            const tanChange = document.querySelector(".tan-button");
            const ansChange = document.querySelector(".ans-button");
            const squareRootChange = document.querySelector(
                ".square-root-button"
            );
            const xyChange = document.querySelectorAll(".xy-button");
            if (hideInv.classList.contains("d-md-inline")) {
                hideInv.classList.remove("d-md-inline");
                showInv.classList.add("d-md-inline");

                sinChange.innerText = "sin⁻¹";
                lnChange.innerText = "eˣ";
                cosChange.innerText = "cos⁻¹";
                logChange.innerText = "10ˣ";
                tanChange.innerText = "tan⁻¹";
                squareRootChange.innerText = "x²";
                ansChange.innerText = "Rnd";

                xyChange[0].classList.remove("d-md-inline");
                xyChange[1].classList.add("d-md-inline");
            } else {
                showInv.classList.remove("d-md-inline");
                hideInv.classList.add("d-md-inline");

                sinChange.innerText = "sin";
                lnChange.innerText = "ln";
                cosChange.innerText = "cos";
                logChange.innerText = "log";
                tanChange.innerText = "tan";
                squareRootChange.innerText = "√";
                ansChange.innerText = "Ans";

                xyChange[1].classList.remove("d-md-inline");
                xyChange[0].classList.add("d-md-inline");
            }
        }
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
            } else if (value == "x²") {
                if (currentValue == "") {
                    currentValue += "0²";
                } else {
                    currentValue += "²";
                }
            } else if (value == "x y") {
                if (currentValue == "") {
                    currentValue += "0^";
                } else {
                    currentValue += "^";
                }
            } else if (value == "y √x") {
                currentValue = `Math.pow(${currentValue}, 1 / `;
            } else if (
                value == "sin" ||
                value == "ln" ||
                value == "cos" ||
                value == "log" ||
                value == "tan" ||
                value == "√"
            ) {
                currentValue += `${value}(`;
            } else if (
                value == "sin⁻¹" ||
                value == "cos⁻¹" ||
                value == "tan⁻¹"
            ) {
                const slicedValue = value.slice(0, -2);
                currentValue += `arc${slicedValue}(`;
            } else if (value == "Rnd") {
                currentValue += Math.random();
            } else if (value == "EXP") {
                currentValue += "E";
            } else if (value == "Inv") {
                toggleInv();
            } else if (value == "=") {
                evaluate();
            } else if (value == "Rad" || value == "Deg") {
                const radSelect = document.querySelector(".toggleRad");
                const degSelect = document.querySelector(".toggleDeg");

                if (value == "Rad") {
                    degSelect.classList.remove("active");
                    radSelect.classList.add("active");

                    degreeeMode = false;
                } else {
                    radSelect.classList.remove("active");
                    degSelect.classList.add("active");

                    degreeeMode = true;
                }

                console.log(degreeeMode);
            } else if (value == "Fx") {
                displayHideShow(
                    ".col-3.show-buttons",
                    ".col-3.hide-buttons",
                    ".toggleNumber",
                    ".toggleFx"
                );
            } else if (value == "eˣ" || value == "10ˣ") {
                const slicedValue = value.slice(0, -1);
                currentValue += `${slicedValue}^`;
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

const degrees = 45;
const degreee = Math.sin(45);
console.log(degreee);
