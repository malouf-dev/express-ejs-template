const contactForm = document.getElementById('contact-form');

contactForm.onsubmit = async function(e) {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const messageData = Object.fromEntries(formData.entries());
    try {
        const response = await fetch('/api/messages', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(messageData),
        });
        const responseJson = await response.json();
        if(response.status == 201) {
            alert(responseJson.message);
            contactForm.reset();
        } else {
            alert(responseJson.error);
        }
    } catch (err) {
        console.log(err);
    }
};