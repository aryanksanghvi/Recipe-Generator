document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const contactData = {};
    formData.forEach((value, key) => {
      contactData[key] = value;
    });
  
    fetch('/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contactData)
    })
    .then(response => {
      if (response.ok) {
        document.getElementById('response').textContent = 'Message sent successfully!';
      } else {
        throw new Error('An error occurred. Please try again later.');
      }
    })
    .catch(error => {
      console.error(error);
      document.getElementById('response').textContent = error.message;
    });
  });
  