import {
    ArrowRightIcon,
    CheckCircle2Icon,
    LeafIcon,
} from "lucide-react";
import TextReveal from '@/components/text-reveal';

const cottonDiseases = [
    "Bacterial Blight",
    "Fusarium Wilt",
    "Cotton Leaf Curl",
    "Healthy Cotton Leaf",
];

export default function OurLatestCreations() {
    return (
        <section id="cotton-diseases" className="relative mx-auto max-w-7xl overflow-hidden px-5 py-28 md:px-12 lg:px-20">
            <div className="pointer-events-none absolute right-0 top-20 size-72 rounded-full border border-[#315c43]/10 [background-image:radial-gradient(#315c43_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

            {/* Heading */}
            <div className="mx-auto max-w-2xl text-center">

                <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2">
                    <LeafIcon className="size-4 text-green-600" />

                    <span className="text-sm font-medium text-green-700">
                        Current AI Model
                    </span>
                </div>

                <h2 className="mt-5 text-3xl font-semibold text-gray-900 md:text-4xl">
                    <TextReveal>Cotton Disease Detection</TextReveal>
                </h2>

                <p className="mt-4 text-gray-600">
                    Identify supported cotton leaf conditions with the trained
                    computer vision model.
                </p>

            </div>

            {/* Cotton */}
            <div className="relative mx-auto mt-14 max-w-5xl overflow-hidden rounded-[2rem] border border-[#315c43]/20 bg-[#e4edd7] p-1 shadow-[0_24px_70px_rgba(49,92,67,0.12)] md:p-2">
                <div className="rounded-[1.6rem] border border-white/70 bg-[#f8faf4]/85 p-7 backdrop-blur md:p-10">

                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

                    <div className="flex gap-5">

                        <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-green-100">
                            <LeafIcon className="size-7 text-green-600" />
                        </div>

                        <div>
                            <div className="flex items-center gap-3">
                                <h3 className="text-2xl font-semibold text-gray-900">
                                    Cotton
                                </h3>

                                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                    Available
                                </span>
                            </div>

                            <p className="mt-2 text-sm leading-6 text-gray-600">
                                Upload a cotton leaf image and our trained
                                computer vision model will analyze it for
                                supported conditions.
                            </p>
                        </div>

                    </div>

                </div>

                {/* Supported classes */}
                <div className="mt-8 border-t border-gray-100 pt-6">

                    <h4 className="font-semibold text-gray-900">
                        Current Model Classes
                    </h4>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">

                        {cottonDiseases.map((disease) => (
                            <div
                                key={disease}
                                className="flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm text-gray-700"
                            >
                                <CheckCircle2Icon className="size-4 text-green-600" />
                                {disease}
                            </div>
                        ))}

                    </div>

                </div>

                <button className="cursor-glow mt-8 flex items-center gap-2 rounded-full bg-[#10231d] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#315c43]">
                    Analyze Cotton Leaf
                    <ArrowRightIcon className="size-4" />
                </button>

                </div>
            </div>

        </section>
    );
}