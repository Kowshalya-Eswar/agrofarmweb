
const ShippingAndDelivery = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-xl shadow-lg mt-8 font-inter">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Shipping and Delivery Policy</h1>
      <p className="mb-4 text-gray-700">
        Thank you for visiting and shopping at <a href="/" className="text-indigo-600 hover:underline">cocoFields</a>. Following are the terms and
        conditions that constitute our Shipping and Delivery Policy.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Domestic Shipping Policy</h2>
      <h3 className="text-xl font-medium text-gray-700 mb-2">Shipment processing time</h3>
      <p className="mb-4 text-gray-700">
        All orders are processed within [X] business days (e.g., 2-3 business days). Orders
        are not shipped or delivered on weekends or holidays.
      </p>
      <p className="mb-4 text-gray-700">
        If We are experiencing a high volume of orders, shipments may be delayed by a few days.
        Please allow additional days in transit for delivery. If there will be a significant
        delay in shipment of Your Order, We will contact You via email or telephone.
      </p>

      <h3 className="text-xl font-medium text-gray-700 mb-2">Shipping rates & delivery estimates</h3>
      <p className="mb-4 text-gray-700">
        Shipping charges for Your Order will be calculated and displayed at checkout.
      </p>
      <ul className="list-disc list-inside mb-4 text-gray-700">
        <li>Shipping method: Courier</li>
        <li>Estimated delivery time: [e.g., 5-7 business days]</li>
        <li>Shipment cost: Free for orders over INR 500, otherwise INR 100</li>
      </ul>
      <p className="mb-4 text-gray-700">
        Delivery delays can occasionally occur.
      </p>

      <h3 className="text-xl font-medium text-gray-700 mb-2">Shipment to P.O. boxes or APO/FPO addresses</h3>
      <p className="mb-4 text-gray-700">
        <a href="/" className="text-indigo-600 hover:underline">cocoFields</a> ships to addresses within India only. We do not
        ship to P.O. boxes or APO/FPO addresses.
      </p>

      <h3 className="text-xl font-medium text-gray-700 mb-2">Shipment confirmation & Order tracking</h3>
      <p className="mb-4 text-gray-700">
        You will receive a Shipment Confirmation email once Your Order has shipped containing
        your tracking number(s). The tracking number will be active within 24 hours.
      </p>

      <h3 className="text-xl font-medium text-gray-700 mb-2">Customs, Duties and Taxes</h3>
      <p className="mb-4 text-gray-700">
        <a href="/" className="text-indigo-600 hover:underline">cocoFields</a> is not responsible for any customs and taxes applied to Your Order.
        All fees imposed during or after shipping are the responsibility of the customer (tariffs, taxes, etc.).
      </p>

      <h3 className="text-xl font-medium text-gray-700 mb-2">Damages</h3>
      <p className="mb-4 text-gray-700">
        <a href="/" className="text-indigo-600 hover:underline">cocoFields</a> is not liable for any products damaged or lost during shipping. If
        You received Your Order damaged, please contact the shipment carrier to file a claim.
      </p>
      <p className="mb-4 text-gray-700">
        Please save all packaging materials and damaged Goods before filing a claim.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">International Shipping Policy</h2>
      <p className="mb-4 text-gray-700">
        We currently do not ship outside India.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
      <p className="mb-4 text-gray-700">
        If you have any questions about our Shipping and Delivery Policy, please contact us:
      </p>
      <ul className="list-disc list-inside mb-4 text-gray-700">
        <li>By visiting the <a href="/contactus" className="text-indigo-600 hover:underline">Contact Us</a> on our website: </li>
      </ul>
    </div>
  );
};

export default ShippingAndDelivery;
