//Listen for submit
document.getElementById('loan-form').addEventListener('submit', (event) => {
    event.preventDefault();
    //Hide Results
    document.getElementById('results').style.display = 'none';

    // Show loader
    document.getElementById('loading').style.display = 'block';

    //show loader only for 2 seconds
    setTimeout(calculateResults, 2000);
});

//Calculate Results
function calculateResults(event) {
    //UI variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');

    //Result UI variables
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    //Calculation
    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //Compute Monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        //Show results div and hide spinner
        document.getElementById('results').style.display = 'block';
        document.getElementById('loading').style.display = 'none';
    } else {
        showError('Please check the values you\'ve entered');
    }

}

//Show Error
function showError(message) {

    //If error, hide both results and spinner
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'none';
    //Create a div
    const errorDiv = document.createElement('div');

    //Get Elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //Add class
    errorDiv.className = 'alert alert-danger';

    //Create Text Node and append to div
    errorDiv.appendChild(document.createTextNode(message));

    card.insertBefore(errorDiv, heading);

    //Clear Error in 3 seconds
    setTimeout(clearError, 2000);
}

//Clear Error
function clearError() {
    document.querySelector('.alert').remove();
}