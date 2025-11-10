export default function ShippingPolicy() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
      <h1>Shipping Policy</h1>

      <h2>Order Processing</h2>
      <p>
        All orders are processed within 1 to 2 business days (excluding weekends and holidays)
        after receiving your order confirmation email. You will receive another notification
        when your order has shipped.
      </p>
      <p>
        Please note: There may be potential delays due to a high volume of orders or issues
        with the postal service that are outside of our control.
      </p>

      <h2>Domestic Shipping Rates and Estimates</h2>
      <p>Shipping charges for your order will be calculated and displayed at checkout.</p>
      <table>
        <thead>
          <tr>
            <th>Shipping Option</th>
            <th>Estimated Delivery Time</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Standard</td>
            <td>3 to 5 business days</td>
            <td>₹49</td>
          </tr>
          <tr>
            <td>Express</td>
            <td>1 to 2 business days</td>
            <td>₹99</td>
          </tr>
        </tbody>
      </table>

      <h2>Free Shipping</h2>
      <p>We offer free shipping on all orders over ₹2000 within India.</p>

      <h2>Local Delivery (Mumbai - 400612)</h2>
      <p>
        Free local delivery is available for orders over ₹500 within Mumbai (PIN 400612). For
        orders under ₹500, a delivery fee of ₹30 is charged.
      </p>
      <p>
        Deliveries are made from 10am to 6pm on weekdays. We will contact you via SMS using
        the number provided at checkout to notify you on the day of delivery.
      </p>

      <h2>In-store Pickup</h2>
      <p>
        Skip the shipping fees with free local pickup at our store: 622 Manglam Electronic
        Market Jaipur Rajasthan India 302001. Orders are ready for pickup within 1 to 2
        business days. We will email you once it’s ready with instructions.
      </p>
      <p>
        Pickup hours: 10am to 5pm, Monday to Saturday. Please bring your order confirmation
        email when you arrive.
      </p>

      <h2>International Shipping</h2>
      <p>
        We currently offer international shipping to the following countries: USA, UK,
        Australia, Canada.
      </p>
      <p>
        We do not ship to: Russia, North Korea, Iran, Cuba.
      </p>
      <table>
        <thead>
          <tr>
            <th>Shipping Option</th>
            <th>Estimated Delivery Time</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Standard Intl</td>
            <td>8 to 14 business days</td>
            <td>₹450</td>
          </tr>
          <tr>
            <td>Express Intl</td>
            <td>4 to 7 business days</td>
            <td>₹900</td>
          </tr>
        </tbody>
      </table>
      <p>
        Please note: Your order may be subject to import duties and taxes (including VAT),
        which are incurred once the shipment reaches your destination country. We are not
        responsible for these charges.
      </p>
    </div>
  );
}
