const resetBtn = document.querySelector(".t-card__reset");

const billInput = document.querySelector(".t-card__bill input"), tipInput = document.querySelector(".t-card__percentage input"), peopleInput = document.querySelector(".t-card__people input");
const tipOptions = document.querySelectorAll(".t-card__percentage li:not(.t-card__percentage-input)");

const tipAmount = document.querySelector(".t-card__tip-amount"), totalAmount = document.querySelector(".t-card__total-amount"); 

function getSelectedTipOption() {
    if (tipInput.value !== "") {
        return tipInput.value;
    } else {
        let returnValue = ""
        tipOptions.forEach((tipOption) => {
            if (tipOption.classList.contains("t-card__percentage--selected")) {
                returnValue = tipOption.textContent.replace("%", "");
            };
        });
        return returnValue;
    };
};

function checkReset() {
    if (billInput.value === "" && getSelectedTipOption() === "" && peopleInput.value === "") {
        resetBtn.disabled = true;
    } else {
        resetBtn.disabled = false;
    };
};

function numberFormat(value, format) {
    let newValue = value.replace(/[^0-9]/g, "");
    if (newValue.length > 0) {
        switch (format) {
            case "percentage":
                newValue = numberFormat(newValue, "number") + "%";
                break;
            default:
                newValue = newValue.replace(/(.{3})/g, "$1,");
                if (newValue.charAt(newValue.length - 1) === ",") {
                    newValue = newValue.slice(0, -1);
                };
        };
    };
    return newValue;
};

// Compute
function computeSplit() {
    if (billInput.value === "" || getSelectedTipOption() === "" || peopleInput.value === "") {
        tipAmount.textContent = "$0.00";
        totalAmount.textContent = "$0.00";
    } else {
        let newTotalAmount = parseFloat(billInput.value) / parseFloat(peopleInput.value);
        let newTipAmount = newTotalAmount * parseFloat(getSelectedTipOption()) / 100;
        tipAmount.textContent = `$${newTipAmount.toFixed(2)}`;
        totalAmount.textContent = `$${newTotalAmount.toFixed(2)}`;
    };
};

billInput.addEventListener("keyup", () => {
    let parentDiv = billInput.closest(".t-card__bill");
    if (billInput.value == "0") {
        parentDiv.classList.add("t-card--error");
    } else {
        parentDiv.classList.remove("t-card--error");
        billInput.value = numberFormat(billInput.value, "number");
    }
    checkReset();
    computeSplit();
});

tipOptions.forEach((tipOption) => {
    tipOption.addEventListener("click", () => {
        if (tipOption.classList.contains("t-card__percentage--selected")) {
            tipOption.classList.remove("t-card__percentage--selected");
        } else {
            tipOptions.forEach((tipOption2) => {
                tipOption2.classList.remove("t-card__percentage--selected");
            });
            tipOption.classList.add("t-card__percentage--selected");
        };
        tipInput.value = "";
        checkReset();
        computeSplit();
    });
});

tipInput.addEventListener("click", () => {
    tipOptions.forEach((tipOption) => {
        tipOption.classList.remove("t-card__percentage--selected");
    });
    checkReset();
    computeSplit();
});

tipInput.addEventListener("keyup", () => {
    tipInput.value = numberFormat(tipInput.value, "percentage");
    tipInput.setSelectionRange(Math.max(tipInput.value.length - 1, 0), Math.max(tipInput.value.length - 1, 0));
    tipInput.focus();
    checkReset();
    computeSplit();
});

peopleInput.addEventListener("keyup", () => {
    let parentDiv = peopleInput.closest(".t-card__people");
    if (peopleInput.value == "0") {
        parentDiv.classList.add("t-card--error");
    } else {
        parentDiv.classList.remove("t-card--error");
        peopleInput.value = numberFormat(peopleInput.value, "number");
    }
    checkReset();
    computeSplit();
});

// Reset
resetBtn.addEventListener("click", () => {
    billInput.value = "";
    tipOptions.forEach((tipOption) => {
        tipOption.classList.remove("t-card__percentage--selected");
    });
    tipInput.value = "";
    peopleInput.value = "";
    checkReset();
    computeSplit();
});