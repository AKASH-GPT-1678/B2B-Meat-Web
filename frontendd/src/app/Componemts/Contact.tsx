import Head from "next/head";

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact Us</title>
        <meta name="description" content="Get in touch with us today!" />
      </Head>

      <main className="p-10 max-w-3xl m-auto">
        <h1 className="text-4xl font-semibold mb-6">Contact Us</h1>

        <p className="mb-4">
          We&#39;re here to help you with any inquiries you may have, whether you&#39;re looking for a custom solution, technical assistance, or information about our services.
        </p>

        <h2 className="text-2xl font-semibold mt-6">General Inquiries</h2>
        <ul className="list-inside list-decimal mb-4 ml-5">
          <li>Email: <a href="acashgupta960@gmail.com" className="text-blue-500">acashgupta960@gmail.com</a></li>
          <li>Phone: +91 7208563916</li>
          <li>Business Hours: Monday&#39;s to Friday, 9:00 AM to 5:00 PM (UTC)</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6">Technical Support</h2>
        <p className="mb-4">
          If you&#39;re experiencing technical issues, please reach us directly at <a href="mailto:techsupport@example.com" className="text-blue-500"></a>.
        </p>

        <h2 className="text-2xl font-semibold mt-6">Partnerships</h2>
        <p className="mb-4">
          If you&#39;re interested in a strategic partnership or enterprise collaboration, please email <a href="mailto:partnerships@example.com" className="text-blue-500">7208563916</a>.
        </p>

        <h2 className="text-2xl font-semibold mt-6">Visit Our Office</h2>
        <p className="mb-4">
          123 Business Street, Tech Hub, Innovation Park, USA
        </p>

        <h2 className="text-2xl font-semibold mt-6">Contact Form</h2>

        <form className="bg-gray-100 p-4 rounded-md shadow-md">
          <label className="block mb-4">
            <span>Full Name</span>
            <input
              type="text"
              name="fullName"
              className="w-full p-2 border rounded-md mt-1"
              placeholder="Enter your full name"
              required
            />
          </label>

          <label className="block mb-4">
            <span>Business Name</span>
            <input
              type="text"
              name="businessName"
              className="w-full p-2 border rounded-md mt-1"
              placeholder="Enter your business name"
              required
            />
          </label>

          <label className="block mb-4">
            <span>Email</span>
            <input
              type="email"
              name="email"
              className="w-full p-2 border rounded-md mt-1"
              placeholder="Enter your email address"
              required
            />
          </label>

          <label className="block mb-4">
            <span>Message</span>
            <textarea
              name="message"
              className="w-full p-2 border rounded-md mt-1"
              rows={4}
              placeholder="Write your message here"
              required
            ></textarea>
          </label>

          <button
            type="submit"
            className="bg-blue-500 text-gray-50 px-4 py-2 rounded-md font-semibold shadow-md hover:bg-blue-600 transition ease-in-out duration-300">
            Submit
          </button>
        </form>
      </main>
    </>
  );
}
