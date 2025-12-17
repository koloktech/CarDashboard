function submitData() {
    // 1. Gather Data from HTML Form
    const dateField = document.getElementById("date").value;
    const data = {
        date: dateField ? dateField : new Date(), // Use current date if field is empty
        brand: document.getElementById("brand").value,
        amount: document.getElementById("amount").value,
        litres: document.getElementById("litres").value,
        odoStart: document.getElementById("odoStart").value,
        odoEnd: document.getElementById("odoEnd").value,
        notes: document.getElementById("notes").value
    };

    // 2. Validate essential fields
    if (!data.amount || !data.odoStart || !data.odoEnd) {
        alert("Please fill in Amount, Odometer Start, and Odometer End.");
        return;
    }

    // 3. Show Loading Screen
    document.getElementById("loadingOverlay").style.display = "flex";

    // --- CONFIGURATION ---
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycby1JIcQKAFEtQWp4Png1Tyn--Jusjd4r-8PdcLg8BK8q6hXvGe2hqCGaOkop2ukWnPY2A/exec"; // <--- PASTE YOUR GOOGLE SCRIPT URL HERE
    
    // We append the current page URL as a query param so the backend can verify it
    const currentOrigin = window.location.href; 
    const urlWithParams = `${SCRIPT_URL}?origin=${encodeURIComponent(currentOrigin)}`;

    // 4. Send Data
    fetch(urlWithParams, {
        method: "POST",
        mode: "no-cors", // 'no-cors' is required for Google Apps Script
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then(() => {
        // Success Logic
        alert("Fuel Log Saved Successfully!");
        document.getElementById("fuelForm").reset(); // Clear form
    })
    .catch((error) => {
        // Error Logic
        console.error("Error:", error);
        alert("Failed to save data. Check console for details.");
    })
    .finally(() => {
        // 5. Hide Loading Screen (runs whether success or fail)
        document.getElementById("loadingOverlay").style.display = "none";
    });
}

// Auto-fill today's date for convenience
document.getElementById('date').valueAsDate = new Date();
