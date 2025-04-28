document.addEventListener('DOMContentLoaded', () => {
    // Select all buttons with the class 'card-button'
    const buttons = document.querySelectorAll('.card-button');

    // Add a click event listener to each button
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Find the closest parent card element
            const card = event.target.closest('.prep-card');
            // Find the title element within that card
            const companyNameElement = card.querySelector('.card-title');

            if (companyNameElement) {
                const companyName = companyNameElement.textContent;
                console.log(`"GET STARTED" clicked for: ${companyName}`);
                // You can replace this alert with actual navigation or action
                alert(`Starting preparation guide for ${companyName}!`);

                // Example: Redirect to a hypothetical page
                // const companySlug = companyName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                // window.location.href = `/prepare/${companySlug}`;
            } else {
                console.error("Could not find company name for the clicked button.");
            }
        });
    });
});