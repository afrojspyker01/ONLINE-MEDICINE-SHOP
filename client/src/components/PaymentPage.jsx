import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
const PaymentPage = () => {
    const [amount, setAmount] = useState(100);
    const navigate = useNavigate();

    const handlePayment = async () => {
        try {
            const { data } = await axios.post('http://localhost:5600/api/payment/create-order', { amount });
            const { orderId, currency } = data;

            const options = {
                key: 'rzp_test_XKklxwii5Nd5o8', // from .env
                amount: amount * 100,
                currency,
                name: "Eco Smart City",
                description: "Service Payment",
                order_id: orderId,
                handler: async function (response) {
                    await axios.post('http://localhost:5600/api/payment/save-payment', {
                        orderId,
                        paymentId: response.razorpay_payment_id,
                        amount,
                        currency,
                        status: 'success'
                    });
                    alert("Payment Successful!");
                    navigate('/about');
                },
                prefill: {
                    name: "User",
                    email: "user@example.com",
                    contact: "9999999999"
                },
                theme: { color: "#3399cc" }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Payment Error", error);
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Eco Smart City Payment</h2>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <button onClick={handlePayment}>Pay Now</button>
        </div>
    );
};

export default PaymentPage;