const fs = require("fs");

function calculateFunds(totalFund, donations) {
  let F_values = {};
  for (let project in donations) {
    let S = donations[project].reduce((a, b) => a + Math.sqrt(b), 0);
    F_values[project] = Math.pow(S, 2);
  }

  let total_F = Object.values(F_values).reduce((a, b) => a + b);

  let projectFunds = {};
  for (let project in F_values) {
    let percentage = F_values[project] / total_F;
    projectFunds[project] = percentage * totalFund;
  }

  return projectFunds;
}

function calculatePercentageChangeForProject(
  projectToAddDonation,
  donationAmount,
  totalFund,
  donations
) {
  // Calculate the funds before the new donation.
  let oldFunds = calculateFunds(totalFund, donations);

  // Check if the project exists in the donations object.
  if (!donations.hasOwnProperty(projectToAddDonation)) {
    console.error(
      `Project ${projectToAddDonation} does not exist in the donations object.`
    );
    return;
  }

  // Add the new donation to the project.
  donations[projectToAddDonation].push(donationAmount);

  // Calculate the funds after the new donation.
  let newFunds = calculateFunds(totalFund, donations);

  // Calculate and return the percentage change for the specified project.
  let change =
    ((newFunds[projectToAddDonation] - oldFunds[projectToAddDonation]) /
      oldFunds[projectToAddDonation]) *
    100;
  return change;
}

function calculateAmountChangeForProject(
  projectToAddDonation,
  donationAmount,
  totalFund,
  donations
) {
  // Calculate the funds before the new donation.
  let oldFunds = calculateFunds(totalFund, donations);

  // Check if the project exists in the donations object.
  if (!donations.hasOwnProperty(projectToAddDonation)) {
    console.error(
      `Project ${projectToAddDonation} does not exist in the donations object.`
    );
    return;
  }

  // Add the new donation to the project.
  donations[projectToAddDonation].push(donationAmount);

  // Calculate the funds after the new donation.
  let newFunds = calculateFunds(totalFund, donations);

  // Calculate and return the amount change for the specified project.

  let change = newFunds[projectToAddDonation] - oldFunds[projectToAddDonation];
  return change;
}

let totalFund = 100;
let donations = {
  project1: [10, 5, 20],
  project2: [5, 15],
  project3: [10, 10, 10, 10],
};

let donationPercentageChanges = [];
for (let i = 1; i <= 100; i++) {
  let percentageChange = calculatePercentageChangeForProject(
    "project1",
    i,
    totalFund,
    donations
  );

  let amountChange = calculateAmountChangeForProject(
    "project1",
    i,
    totalFund,
    donations
  );

  // Create an object with "donation" and "percentage" properties
  let entry = {
    donation: i,
    percentage: percentageChange,
    amount: amountChange,
  };

  // Add the object to the array
  donationPercentageChanges.push(entry);
  donations = {
    project1: [10, 5, 20],
    project2: [5, 15],
    project3: [10, 10, 10, 10],
  };
}

// Convert the array to JSON format.
let jsonData = JSON.stringify(donationPercentageChanges, null, 2);

// Save the JSON data to a file.
fs.writeFileSync("donation_percentage_changes.json", jsonData);

console.log("Data saved to donation_percentage_changes.json.");
