document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-btn');
    const companyLists = document.querySelectorAll('.company-list');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');

            // Hide all company lists
            companyLists.forEach(list => list.classList.add('hidden'));
            // Show selected company list
            const targetList = document.getElementById(`${tab.dataset.company}-companies`);
            targetList.classList.remove('hidden');
        });
    });
});
