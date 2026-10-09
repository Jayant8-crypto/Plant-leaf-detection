import { ChevronDownIcon } from "lucide-react";
import TextReveal from '@/components/text-reveal';

const faqs = [
    {
        question: "What can I analyze with this platform?",
        answer:
            "This version analyzes cotton leaf images and supports the disease classes listed in the Cotton Disease Detection section.",
    },
    {
        question: "How does the disease detection work?",
        answer:
            "The user uploads a cotton leaf image. The image is processed by the plant disease classification model, which produces a predicted disease class and a confidence value.",
    },
    {
        question: "What is the role of the CNN model?",
        answer:
            "The CNN is responsible for analyzing visual patterns in the uploaded leaf image and predicting one of the disease classes supported by the trained model.",
    },
    {
        question: "What does the result include?",
        answer:
            "The result includes the predicted cotton condition and a confidence value from the trained CNN model.",
    },
    {
        question: "Does the confidence score mean the diagnosis is guaranteed?",
        answer:
            "No. A model confidence value represents the model's confidence in its prediction and should not be treated as a guaranteed diagnosis. Image quality, dataset limitations and model performance can affect predictions.",
    },
    {
        question: "How accurate is the confidence score?",
        answer:
            "Confidence reflects how strongly the model supports its prediction. It is not a guaranteed diagnosis and can be affected by image quality and model limitations.",
    },
];

export default function FaqSection() {
    return (
        <section id="faq" className="mx-auto max-w-5xl px-5 py-28 md:px-12">

            {/* Heading */}
            <div className="text-center">

                <div className="inline-flex items-center rounded-full border border-[#315c43]/20 bg-[#e4edd7] px-4 py-2">
                    <span className="text-sm font-medium text-[#315c43]">
                        Frequently Asked Questions
                    </span>
                </div>

                <h2 className="mt-5 text-3xl font-semibold text-gray-900 md:text-4xl">
                    <TextReveal>Questions About Plant Analysis</TextReveal>
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                    Learn how the cotton disease analyzer and CNN model work.
                </p>

            </div>

            {/* FAQ */}
            <div className="mt-12 space-y-4">

                {faqs.map((faq) => (
                    <details
                        key={faq.question}
                        className="group rounded-2xl border border-[#10231d]/10 bg-[#f8faf4] p-5 shadow-[0_8px_22px_rgba(16,35,29,0.04)] transition hover:border-[#315c43]/40"
                    >

                        <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-medium text-gray-900">
                            <span>{faq.question}</span>

                            <ChevronDownIcon className="size-5 shrink-0 text-gray-500 transition-transform group-open:rotate-180" />
                        </summary>

                        <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-600">
                            {faq.answer}
                        </p>

                    </details>
                ))}

            </div>

        </section>
    );
}