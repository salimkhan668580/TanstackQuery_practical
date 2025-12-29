

function Paymentpage() {

  const handlePayment = async () => {
    // 1️⃣ Load Razorpay script
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      alert("Razorpay SDK failed to load!");
      return;
    }

    try {
      // 2️⃣ Create Razorpay order from backend
      const orderRes = await fetch("http://localhost:3000/user/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json", 
            "Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY5MWVjNTUxZjk1YmNlZTkyZjg4ZTlhOCIsIm5hbWUiOiJ1c2VyIHRlc3QiLCJlbWFpbCI6IndlYnVzZXIxMjNAeW9wbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRSYndaSVVTaFlNbUIuQTcuWXFHR2hlWnB3Ym8uWDY5VVNzUHVzZXlIdjZDTFB1ZkxqWEZtLiIsInBob25lIjo3ODUzNDY3NDMwLCJnZW5kZXIiOiJtYWxlIiwicm9sZSI6InVzZXIiLCJhZGRyZXNzIjpbeyJzdHJlZXQiOiIxMiBHcmVlbiBQYXJrIiwiY2l0eSI6Ik11bWJhaSIsInN0YXRlIjoiTWFoYXJhc2h0cmEiLCJwaW4iOjQwMDAxMywiX2lkIjoiNjkxZWM1NTFmOTViY2VlOTJmODhlOWE5In1dLCJpc0RlbGV0ZWQiOmZhbHNlLCJpc0FjdGl2ZSI6dHJ1ZSwiZGVhY3RpdmF0ZWRBdCI6bnVsbCwiY3JlYXRlZEF0IjoiMjAyNS0xMS0yMFQwNzozNzo1My4xNTVaIiwidXBkYXRlZEF0IjoiMjAyNS0xMS0yMFQwNzozNzo1My4xNTVaIiwiX192IjowfSwiaWF0IjoxNzYzNjI0NjMyLCJleHAiOjE3NjM3MTEwMzJ9.4nbUu3jDHV7nIFWpqssArqJhyTJtW4I5xlqBS6g7RfU"
        },
        body: JSON.stringify({
        cartId:"691ecc8699f383e6103edee8",
        address:{
            "fullAddress":"12 Green Parks, Maharashtra",
            "street":"12 Green Parks",
            "city":"Maharashtra",
            "state":"Maharashtra",
            "pin":400013,
        }

          
        }),
      });
      const orderData = await orderRes.json();
      const { payment:order } = orderData;

      if (!order || !order.id) {
        alert("Order creation failed!");
        return;
      }

      // 3️⃣ Prepare Razorpay Checkout options
      const options = {
        key: "rzp_test_G3ejqcku7xIe3N",  // put test key here
        amount: order.amount,
        currency: "INR",
        name: "Test Payment",
        description: "Just testing",
        order_id: order.id,

        handler: async function (response) {
          console.log("Payment success", response);

          // 4️⃣ Verify payment on backend
          const verifyRes = await fetch("http://localhost:3000/user/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json",
                 "Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY5MWVjNTUxZjk1YmNlZTkyZjg4ZTlhOCIsIm5hbWUiOiJ1c2VyIHRlc3QiLCJlbWFpbCI6IndlYnVzZXIxMjNAeW9wbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRSYndaSVVTaFlNbUIuQTcuWXFHR2hlWnB3Ym8uWDY5VVNzUHVzZXlIdjZDTFB1ZkxqWEZtLiIsInBob25lIjo3ODUzNDY3NDMwLCJnZW5kZXIiOiJtYWxlIiwicm9sZSI6InVzZXIiLCJhZGRyZXNzIjpbeyJzdHJlZXQiOiIxMiBHcmVlbiBQYXJrIiwiY2l0eSI6Ik11bWJhaSIsInN0YXRlIjoiTWFoYXJhc2h0cmEiLCJwaW4iOjQwMDAxMywiX2lkIjoiNjkxZWM1NTFmOTViY2VlOTJmODhlOWE5In1dLCJpc0RlbGV0ZWQiOmZhbHNlLCJpc0FjdGl2ZSI6dHJ1ZSwiZGVhY3RpdmF0ZWRBdCI6bnVsbCwiY3JlYXRlZEF0IjoiMjAyNS0xMS0yMFQwNzozNzo1My4xNTVaIiwidXBkYXRlZEF0IjoiMjAyNS0xMS0yMFQwNzozNzo1My4xNTVaIiwiX192IjowfSwiaWF0IjoxNzYzNjI0NjMyLCJleHAiOjE3NjM3MTEwMzJ9.4nbUu3jDHV7nIFWpqssArqJhyTJtW4I5xlqBS6g7RfU"


             },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            })
          });

          const verifyData = await verifyRes.json();
          console.log("VERIFY RESPONSE:", verifyData);

          alert(verifyData.message || "Payment Verified!");
        },

        prefill: {
          name: order.name,
          email: order.email,
          userId:order.userId,
        },

        theme: {
          color: "#3399cc",
        },
      };

      // 5️⃣ Open Razorpay checkout
      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error("Payment error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div>
      <div className="w-screen h-screen flex justify-center items-center bg-gray-50">
        <button
          onClick={handlePayment}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition-all duration-200 active:scale-95"
        >
          Pay
        </button>
      </div>
    </div>
  );
}

// Razorpay loader function
const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default Paymentpage;
