const radioButtons = document.getElementsByName("options");
const wrappers = document.querySelectorAll(".checkbox-wrapper");

radioButtons.forEach((radio, index) => {
    radio.addEventListener("change", function () {
        wrappers.forEach((wrapper) => {
            wrapper.style.border = "1px solid hsl(203, 41%, 72%)";
        });
        if (radio.checked) {
            wrappers[index].style.border = "1px solid hsl(61, 70%, 52%)";
        }
    });
});

document
    .getElementById("mortgage-form")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        const resultsElement = document.getElementById("results");
        const resultsCard = document.getElementById("results-card");
        const resultsHeader = document.getElementById("results-header");
        const resultsInfo = document.getElementById("results-info");

        resultsHeader.innerHTML = 'Your Results';
        resultsInfo.innerHTML = 'Your results are shown below based on the information you provided. To adjust your results, please adjust your inputs and click the "Calculate" button again.';
        resultsElement.classList.add("show");
        resultsCard.style.display = "flex";

        // Get form values
        const loanAmount = parseFloat(document.getElementById("loan-amount").value);
        const interestRate = parseFloat(
            document.getElementById("interest-rate").value
        );
        const loanTerm = parseFloat(document.getElementById("loan-term").value);
        const mortgageType = document.querySelector(
            'input[name="options"]:checked'
        ).value;
        console.log("mortType", mortgageType);

        // Call function to calculate the mortgage payment
        const monthlyPayment = calculateMortgagePayment(
            loanAmount,
            interestRate,
            loanTerm,
            mortgageType
        );

        // Display the result
        const repaymentResult = document.getElementById("repayment-result");
        const repayTerm = document.getElementById("repay-term");

        repaymentResult.innerHTML = `€${monthlyPayment}`;
        repayTerm.innerHTML = `€${loanTerm}`;
    });

function calculateMortgagePayment(
    principal,
    annualInterestRate,
    years,
    mortgageType
) {
    const monthlyInterestRate = annualInterestRate / 100 / 12;
    const numberOfPayments = years * 12;

    let monthlyPayment;

    if (mortgageType === "repayment") {
        monthlyPayment =
            (principal *
                monthlyInterestRate *
                Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
            (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    } else if (mortgageType === "interest-only") {
        monthlyPayment = principal * monthlyInterestRate;
    }

    return monthlyPayment ? monthlyPayment.toFixed(2) : 0; // Round to 2 decimal places
}
