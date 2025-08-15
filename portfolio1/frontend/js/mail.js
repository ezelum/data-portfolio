document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("_form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const senderDetails = {
      name: document.getElementById("sender-name").value,
      email: document.getElementById("sender-email").value,
      message: document.getElementById("sender-message").value,
    };
    const response = await fetch("http://localhost:8000/mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(senderDetails),
    });

    if (!response.ok) {
      console.log(response.data.error);
      alert("message not sent!");
      return;
    }

    alert("Thank you for your message!");
    console.log(response.data);
  });
});
