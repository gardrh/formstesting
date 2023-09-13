document.addEventListener("DOMContentLoaded", function () {
    const projectList = document.getElementById('projectList');

    // Fetch project data directly from Google Apps Script endpoint
    fetch('https://script.google.com/macros/s/AKfycbxIdehdScZyKrPhVb2ieREBeX93PFybPl79zSWkFwoWCT3ydimbOWHeXD3MvlRg2aCgvQ/exec')
        .then(response => response.json())
        .then(data => {
            const currentDate = new Date();

            // Remove the header row from the data
            data.shift();

            // Filter projects based on start and end dates
            const activeProjects = data.filter(row => {
                const startDate = new Date(row[3]); // Assuming Project start is in column D
                const endDate = new Date(row[4]); // Assuming Project end is in column E
                return startDate <= currentDate && currentDate <= endDate;
            });

            if (!activeProjects || activeProjects.length === 0) {
                projectList.innerHTML = '<p>No active projects.</p>';
                return;
            }

            // Sort projects by start date
            activeProjects.sort((a, b) => new Date(a[3]) - new Date(b[3]));

            // Display active projects
            activeProjects.forEach(project => {
                const projectDiv = document.createElement('div');
                projectDiv.innerHTML = `
                    <h2>${project[2]}</h2> <!-- Assuming Prosjekttittel is in column C -->
                    <p>Start Date: ${project[3]}</p>
                    <p>End Date: ${project[4]}</p>
                    <!-- Add more project details here -->
                `;
                projectList.appendChild(projectDiv);
            });
        })
        .catch(error => console.error('Error:', error));
});
