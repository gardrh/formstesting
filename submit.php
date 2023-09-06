<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $projectTitle = $_POST["project_title"];
    $email = $_POST["email"];

    // Append data to the CSV file (replace 'your_github_csv_url' with your actual GitHub CSV URL)
    $data = [$projectTitle, $email];
    $csvFile = fopen('https://github.com/gardrh/formstesting/blob/2cc65e89cc2d66e39427527b5fcd8e4355443592/data.csv', 'a');
    fputcsv($csvFile, $data);
    fclose($csvFile);

    // Redirect to a thank you page or display a confirmation message
    header("Location: thank_you.html");
} else {
    // Handle invalid requests or direct access to this script
    echo "Invalid request!";
}
?>
