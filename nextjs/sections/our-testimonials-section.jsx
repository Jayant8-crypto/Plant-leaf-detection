import {
    BrainCircuitIcon,
    ChartNoAxesCombinedIcon,
    ShieldCheckIcon,
} from "lucide-react";
import TextReveal from '@/components/text-reveal';

const features = [
    {
        icon: BrainCircuitIcon,
        title: "CNN-Based Detection",
        description:
            "The platform is designed to use your trained CNN model to analyze cotton leaf images and identify supported disease classes.",
    },
    {
        icon: ShieldCheckIcon,
        title: "Supported Conditions",
        description:
            "The model returns one of the supported cotton conditions along with a confidence value.",
    },
    {
        icon: ChartNoAxesCombinedIcon,
        title: "Clear Results",
        description:
            "Review the predicted condition and confidence score immediately after each upload.",
    },
    {
        icon: ShieldCheckIcon,
        title: "Confidence Information",
        description:
            "Each model prediction can include a confidence value so users can understand how strongly the model supports its prediction.",
    },
];

export default function OurTestimonialSection() {
    return (
        <section className="mx-auto max-w-7xl bg-[#10231d] px-5 py-28 text-[#f4f7ef] md:px-12 lg:px-20">

            {/* Heading */}
            <div className="mx-auto max-w-2xl text-center">

                <div className="inline-flex items-center rounded-full border border-[#b7db68]/30 bg-[#18382b] px-4 py-2">
                    <span className="text-sm font-medium text-[#b7db68]">
                        Platform Features
                    </span>
                </div>

                <h2 className="mt-5 text-3xl font-semibold text-[#f4f7ef] md:text-4xl">
                    <TextReveal>Built Around Your Plant Analysis Model</TextReveal>
                </h2>

                <p className="mt-4 text-[#b7c8b9]">
                    The platform keeps the workflow focused: upload a leaf,
                    run the CNN model, and review the result.
                </p>

            </div>

            {/* Feature cards */}
            <div className="mt-14 grid gap-5 md:grid-cols-2">

                {features.map((feature) => {
                    const Icon = feature.icon;

                    return (
                        <div
                            key={feature.title}
                            className="depth-card group rounded-3xl border border-white/10 bg-[#18382b] p-7 shadow-sm transition hover:border-[#b7db68]/50 hover:shadow-[0_20px_45px_rgba(0,0,0,0.2)]"
                        >
                            <div className="flex size-12 items-center justify-center rounded-xl bg-[#b7db68]">
                                <Icon className="size-6 text-[#10231d]" />
                            </div>

                            <h3 className="mt-5 text-xl font-semibold text-[#f4f7ef]">
                                {feature.title}
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-[#b7c8b9]">
                                {feature.description}
                            </p>
                        </div>
                    );
                })}

            </div>

            {/* Analysis pipeline */}
            <div className="mt-10 rounded-3xl border border-[#b7db68]/25 bg-[#b7db68] p-8 text-[#10231d] shadow-[0_20px_55px_rgba(183,219,104,0.1)]">

                    <h3 className="text-center text-lg font-semibold">
                        Analysis Pipeline
                </h3>

                <div className="mt-8 flex flex-col items-center justify-center gap-3 text-center md:flex-row">

                    <div className="rounded-xl bg-white px-5 py-4 shadow-sm">
                        <p className="text-sm font-semibold text-gray-900">
                            Plant Image
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                            User Upload
                        </p>
                    </div>

                    <span className="text-[#315c43]">→</span>

                    <div className="rounded-xl bg-white px-5 py-4 shadow-sm">
                        <p className="text-sm font-semibold text-gray-900">
                            CNN Model
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                            Disease Prediction
                        </p>
                    </div>

                    <span className="text-[#315c43]">→</span>

                    <div className="rounded-xl bg-white px-5 py-4 shadow-sm">
                        <p className="text-sm font-semibold text-gray-900">
                            Plant Report
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                            User Result
                        </p>
                    </div>

                </div>

            </div>

        </section>
    );
}