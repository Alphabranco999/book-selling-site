console.log("payment.js loaded");

window.payWithPesapal = async function (bookTitle, amount) {

  console.log("CLICKED:", bookTitle, amount);

  try {
    const response = await fetch("http://localhost:5000/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        description: bookTitle,
      }),
    });

    const data = await response.json();

    console.log("BACKEND RESPONSE:", data);

    if (data.redirect_url) {
      window.location.href = data.redirect_url;
    } else {
      alert("Payment link not received");
      console.log("FULL ERROR:", data);
    }

  } catch (error) {
    console.error("PAYMENT ERROR:", error);
    alert("Payment failed");
  }
};