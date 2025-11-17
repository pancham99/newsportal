"use client";

import { motion } from "framer-motion";

export default function WriteForUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-100 to-gray-300 px-6 py-16 text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto bg-white backdrop-blur-xl shadow-2xl border border-gray-700 rounded-3xl p-10"
      >
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text text-center mb-8">
          Write For Us – TopBriefing
        </h1>

        <p className="text-black mb-8 text-lg leading-relaxed">
          TopBriefing is searching for creative and passionate writers who can deliver
          **powerful, original, and engaging** content. If you love writing and want
          to express your thoughts to thousands of readers, this platform is your stage.
        </p>

        <Section className="text-black" title="What We Publish">
          <List items={[
            "News articles (National & International)",
            "Tech updates & gadget reviews",
            "Sports, Entertainment & Lifestyle content",
            "Finance, Business, and Market insights",
            "Opinion & Editorial content",
          ]} />
        </Section>

        <Section title="Guidelines">
          <List items={[
            "Content must be 100% original — no plagiarism.",
            "Minimum 700 words per article.",
            "Maintain a clear and engaging writing style.",
            "Add proper sources if required.",
            "No promotional or spam content.",
          ]} />
        </Section>

        <Section title="Why Write for TPBriefing?">
          <List items={[
            "Get featured on a fast‑growing news platform.",
            "Boost your personal writing portfolio.",
            "Reach a wide and active audience.",
            "Opportunity to join our editorial team.",
          ]} />
        </Section>

        <Section title="How to Submit?">
          <p className="text-black mb-4">
            Submit your article or writing sample at:
          </p>
          <div className="bg-gradient-to-r from-purple-700/50 to-pink-600/50 p-4 border border-gray-700 rounded-xl mb-8">
            <p className="text-xl font-semibold">📧 Email: contact@topbriefing.in</p>
          </div>
        </Section>

        <p className="text-gray-400 text-center text-sm mt-6">
          We review all submissions within 2–3 business days. Selected writers will
          be contacted by our editorial team.
        </p>
      </motion.div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mb-10"
    >
      <h2 className="text-3xl font-bold text-purple-400 mb-4 drop-shadow-md">{title}</h2>
      {children}
    </motion.div>
  );
}

function List({ items }) {
  return (
    <ul className="list-disc pl-8 space-y-2 text-black text-lg">
      {items.map((item, i) => (
        <li key={i} className="">{item}</li>
      ))}
    </ul>
  );
}
