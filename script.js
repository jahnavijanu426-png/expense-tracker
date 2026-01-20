document.getElementById("date").value =
    new Date().toISOString().split("T")[0];
let expenseHistory = JSON.parse(localStorage.getItem("expenseHistory")) || [];

let expenses = JSON.parse(localStorage.getItem("expenses")) || {
    Food: 0,
    Travel: 0,
    Rent: 0
};

let totalExpense = JSON.parse(localStorage.getItem("totalExpense")) || 0;

document.getElementById("total").innerText =
    "Total Expense: ₹" + totalExpense;

// Chart
let ctx = document.getElementById("expenseChart").getContext("2d");
let chart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: ["Food", "Travel", "Rent"],
        datasets: [{
            label: "Category-wise Expenses",
            data: [expenses.Food, expenses.Travel, expenses.Rent]
        }]
    }
});

// Load history on page load
displayExpenses();

function addExpense() {
    let amount = Number(document.getElementById("amount").value);
    let category = document.getElementById("category").value;
    let date = document.getElementById("date").value;

    if (amount <= 0 || date === "") {
        alert("Please enter date and valid amount");
        return;
    }

    
    expenses[category] += amount;
    totalExpense += amount;

 
    expenseHistory.push({ date, category, amount });

    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("totalExpense", totalExpense);
    localStorage.setItem("expenseHistory", JSON.stringify(expenseHistory));

    document.getElementById("total").innerText =
        "Total Expense: ₹" + totalExpense;

    chart.data.datasets[0].data = [
        expenses.Food,
        expenses.Travel,
        expenses.Rent
    ];
    chart.update();

    displayExpenses();
    document.getElementById("amount").value = "";
}


function displayExpenses() {
    let list = document.getElementById("expenseList");
    list.innerHTML = "";

    expenseHistory.forEach(exp => {
        let li = document.createElement("li");
        li.textContent =
            `${exp.date} | ${exp.category} | ₹${exp.amount}`;
        list.appendChild(li);
    });
}

displayExpenses();

chart.data.datasets[0].data = [
    expenses.Food,
    expenses.Travel,
    expenses.Rent
];
chart.update();

