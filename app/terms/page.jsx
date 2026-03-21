import React from "react";

export const metadata = {
  title: "Top Briefing - Terms & Policies",
  description:
    "About, Privacy Policy, Disclaimer and Terms & Conditions of Top Briefing.",
};

export default function TermsPage() {
  return (
    <main className="bg-gray-50 text-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-10">
        
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center mb-8">
          Top Briefing: About, Terms & Policies
        </h1>

        {/* About Us */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-3">About Us</h2>
          <p className="text-sm leading-7">
            Welcome to <strong>Top Briefing (topbriefing.in)</strong>. We are a
            professional news and information platform dedicated to delivering
            timely and accurate updates on Politics, International News, Health,
            and Government Schemes. Our goal is to provide insightful analysis
            and clear reporting to keep our audience well-informed in a
            fast-paced world.
          </p>
        </section>

        {/* Contact */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
          <p className="text-sm leading-7">
            For any inquiries, feedback, or collaboration requests, please
            contact us at:
          </p>
          <ul className="mt-3 text-sm space-y-1">
            <li>📧 Email: <span className="font-medium">contact@topbriefing.in</span></li>
            <li>📍 Address: India</li>
          </ul>
        </section>

        {/* Privacy Policy */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-3">Privacy Policy</h2>
          <p className="text-sm leading-7">
            At Top Briefing, your privacy is our priority. We do not sell or
            share personal user data with third parties. We use standard log
            files and cookies to improve site performance and user experience.
          </p>
          <p className="text-sm mt-3 leading-7">
            Third-party vendors, including Google, may use cookies to serve ads
            based on your visits to our site. By using our website, you consent
            to our privacy practices.
          </p>
        </section>

        {/* Disclaimer */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-3">Disclaimer</h2>
          <p className="text-sm leading-7">
            The information provided on Top Briefing is for general informational
            purposes only. While we strive for accuracy, we make no guarantees
            regarding the completeness of the content.
          </p>
          <p className="text-sm mt-3 leading-7">
            For specific advice regarding health, finance, or legal matters,
            please consult with a qualified professional. We are not liable for
            any losses or damages resulting from the use of our information.
          </p>
        </section>

        {/* Terms */}
        <section>
          <h2 className="text-xl font-semibold mb-3">
            Terms & Conditions
          </h2>
          <p className="text-sm leading-7">
            By using topbriefing.in, you agree to follow our terms of service.
            You are prohibited from copying, republishing, or redistributing our
            content without prior written permission.
          </p>
          <p className="text-sm mt-3 leading-7">
            We reserve the right to modify site content or policies at any time
            without prior notice.
          </p>
        </section>

      </div>
    </main>
  );
}