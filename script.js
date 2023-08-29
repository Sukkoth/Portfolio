document.addEventListener('submit', (e) => {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    if (!fullName || !email || !phone || !message) {
        return alert('All fields are required for sending message');
    }

    sendMessage(fullName, email, phone, message);
});

const sendMessage = (fullName, email, phone, message) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Access-Control-Allow-Origin', 'yes');
    myHeaders.set(
        'Authorization',
        'Basic ' +
            btoa(
                '38356b039db332ed6442e50a295d704e' +
                    ':' +
                    '233132a91c40766e4f975619a01f585a'
            )
    );

    const data = JSON.stringify({
        Messages: [
            {
                From: { Email: email, Name: fullName },
                To: [{ Email: 'suukootj@gmail.com', Name: 'Gadisa Teklu' }],
                Subject: 'Contacting for Work',
                TextPart: message + '\n ' + 'Phone Number: ' + phone,
            },
        ],
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: data,
    };

    fetch('https://api.mailjet.com/v3.1/send', requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log('error', error));
};
