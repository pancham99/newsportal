import React from "react";

export const metadata = {
  title: "Privacy Policy | Top Briefing - Hindi News Portal",
  description:
    "Read the Privacy Policy of Top Briefing. Learn how we collect, protect, and use data, and our compliance with Google AdSense and cookie policies.",
  alternates: {
    canonical: "https://topbriefing.in/privacy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-gray-50 text-gray-800 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-4">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Last Updated: July 2026 | <strong>Top Briefing (topbriefing.in)</strong>
        </p>

        {/* 1. Introduction */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            1. Introduction
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Welcome to <strong>Top Briefing</strong> accessible at{" "}
            <a href="https://topbriefing.in" className="text-red-700 underline">
              topbriefing.in
            </a>
            . One of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Top Briefing and how we use it.
          </p>
        </section>

        {/* 2. Google AdSense & Third-Party Cookies */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            2. Google AdSense & Advertising Cookies
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-3">
            Top Briefing uses Google AdSense to serve advertisements. Google is a third-party vendor on our site. It uses cookies, such as DART cookies, to serve ads to our site visitors based upon their visit to topbriefing.in and other sites on the internet.
          </p>
          <ul className="list-disc pl-6 text-sm text-gray-700 space-y-2">
            <li>
              Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to our website or other websites.
            </li>
            <li>
              Google&apos;s use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.
            </li>
            <li>
              Users may opt out of personalized advertising by visiting{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-700 underline"
              >
                Google Ads Settings
              </a>
              .
            </li>
          </ul>
        </section>

        {/* 3. Log Files */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            3. Log Files
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Top Briefing follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
          </p>
        </section>

        {/* 4. Children's Information */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            4. Children&apos;s Information
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. Top Briefing does not knowingly collect any Personal Identifiable Information from children under the age of 13.
          </p>
        </section>

        {/* 5. Contact Information */}
        <section className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            5. Contact Us
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us by email at{" "}
            <a href="mailto:contact@topbriefing.in" className="text-red-700 font-medium underline">
              contact@topbriefing.in
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
