const gradebtn = document.getElementById("gradebtn");
const speedStatusbtn =document.getElementById("statusBtn");
const getTaxBtn =document.getElementById("calculateBtn");



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
speedStatusbtn.addEventListener("click",getSpeedStatus);

function getSpeedStatus(e){

    let demeritPoints=0;

    const carSpeed = parseFloat(document.getElementById("carSpeedtxt").value);
    document.getElementById("speedStatusTxt").value = "OK";
    document.getElementById("speedStatusTxt").style.backgroundColor = "Aquamarine";

    if(carSpeed>70){        
    

        let excessLimit = carSpeed-70;
        demeritPoints = Math.ceil(excessLimit/5);
        document.getElementById("dimerittxt").value=demeritPoints;
        

        if(demeritPoints >12){
            document.getElementById("speedStatusTxt").value = "License suspended";
            document.getElementById("speedStatusTxt").style.backgroundColor = "Red";

        }




    }

}


//check if the button is null 
if(getTaxBtn){
    getTaxBtn.addEventListener("click",calculateIncomeTax);
} else{console.log("Button is still Null")}



function calculateIncomeTax(e) {
    const income = parseFloat(document.getElementById("basicSalary").value);  //get base income
    const deductions =  parseFloat(document.getElementById("benefitsSum").value); //sum of all deductions

    
    //case of the tax brackets

    const taxBrackets = [
        { lowerLimit: 0, upperLimit: 24000, rate: 0.10 },
        { lowerLimit: 24001, upperLimit: 32333, rate: 0.25 },
        { lowerLimit: 32334, upperLimit: 500000, rate: 0.30 },
        { lowerLimit: 500001, upperLimit: 800000, rate: 0.32 },
        { lowerLimit: 800001, upperLimit: Infinity, rate: 0.35 }
    ];

    // Calculate taxable income.
    const taxableIncome = income - deductions;  //deductions include NHIF,NSSF

    // Initialize the total tax.
    let tax = 0;

    // Calculate tax for each bracket.
    for (const bracket of taxBrackets) {
        if (taxableIncome <= 0) {
            break; // No more taxable income to calculate.
        }

        // Calculate the portion of income in the current bracket.
        const bracketIncome = Math.min(bracket.upperLimit, taxableIncome) - bracket.lowerLimit;

        if (bracketIncome <= 0) {
            continue; // Skip this bracket if no income falls in it.
        }

        // Calculate tax for the current bracket and add it to the total.
        const bracketTax = bracketIncome * bracket.rate;
        tax += bracketTax;
    }

    //console.log(income);
    //console.log(deductions);


    //display
    document.getElementById("taxibleIncome").value = income - deductions;
    document.getElementById("taxvalue").value = tax;
   document.getElementById("netIncome").value= income - deductions -tax;

    
}

