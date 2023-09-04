const dotenv = require('dotenv').config();

const Mailjet = require('node-mailjet');

exports.message = async (req, res) => {
    const { fullName, email, message, phone } = req.body;
    if (!fullName || !email || !message) {
        return res.status(422).json({
            message: 'Fill all the required fields',
        });
    }

    const mailjet = new Mailjet({
        apiKey: process.env.APIKEY_PUBLIC,
        apiSecret: process.env.APIKEY_PRIVATE,
    });

    try {
        const request = await mailjet
            .post('send', { version: 'v3.1' })
            .request({
                Messages: [
                    {
                        From: {
                            Email: 'Suukootj@gmail.com',
                            Name: fullName,
                        },
                        To: [
                            {
                                Email: 'Suukootj@gmail.com',
                                Name: 'Gadisa Teklu',
                            },
                        ],
                        Subject: `Message from Portfolio [${email}//${phone}]`,
                        TextPart: message,
                    },
                ],
            });
        setTimeout(() => {
            return res.json({ message: 'sent' });
        }, 3000);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Error Sending message',
            error,
        });
    }
};
