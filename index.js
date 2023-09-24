const gradebtn = document.getElementById("gradebtn");
const speedStatusbtn =document.getElementById("statusBtn");

// Use an event listener to call assignGrade when the button is clicked
gradebtn.addEventListener("click", assignGrade);

function assignGrade(e) {
    // Get the marks as a number from the input field, not from innerHTML
    const marks = parseFloat(document.getElementById("markstxt").value);
    

    // Validate the input
    if (isNaN(marks) || marks < 0 || marks > 100) {
        document.getElementById("gradetxt").value = "Enter marks between 0 - 100 %";
        return;
    }

    let grade;
    //Determine the grade
    if (marks > 79) {
        grade = "A";
    } else if (marks >= 60 && marks <= 79) {
        grade = "B";
    } else if (marks >= 50 && marks <= 59) {
        grade = "C";
    } else if (marks >= 40 && marks <= 49) {
        grade = "D";
    } else {
        grade = "E";
    }

    // Display the grade
    document.getElementById("gradetxt").value = `${grade}`;
}

//add event listener to call getSpeedstatus when the button is clicked

function getSpeedStatus(e){

}
