document.addEventListener('DOMContentLoaded', () => {
    // Select all buttons with the class 'card-button'
    const buttons = document.querySelectorAll('.card-button');

    // Add a click event listener to each button
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Get company name from data attribute
            const companyName = button.getAttribute('data-company');
            if (companyName) {
                console.log(`"GET STARTED" clicked for: ${companyName}`);
                alert(`Starting preparation guide for ${companyName}!`);
                // Example: Redirect to a hypothetical page
                // const companySlug = companyName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                // window.location.href = `/prepare/${companySlug}`;
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                console.error("Could not find company name for the clicked button.");
            }
        });
    });
});