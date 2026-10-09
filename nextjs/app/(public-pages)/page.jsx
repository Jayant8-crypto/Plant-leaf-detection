import CottonAnalysisSection from '@/sections/cotton-analysis-section';
import FaqSection from '@/sections/faq-section';
import HeroSection from '@/sections/hero-section';
import OurLatestCreations from '@/sections/our-latest-creations';
import OurTestimonialSection from '@/sections/our-testimonials-section';
import WhatWeDoSection from '@/sections/what-we-do-section';

export default function Page() {
    return (
        <main>
            <HeroSection />
            <WhatWeDoSection />
            <OurLatestCreations />
            <CottonAnalysisSection />
            <OurTestimonialSection />
            <FaqSection />
        </main>
    );
}
