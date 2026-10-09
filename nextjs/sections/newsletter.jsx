import SectionTitle from '@/components/section-title';

export default function Newsletter() {
    return (
        <section className='mx-5 mt-24 flex flex-col items-center justify-center overflow-hidden rounded-[2rem] bg-[#dce8cc] px-5 py-20 md:mx-12 lg:mx-20'>
            <SectionTitle title='Keep your field notes close.' subtitle='Get practical updates about new models, plant health research, and the next tools coming to Cotton / Lens.' />

            <div className='flex w-full max-w-xl rounded-full border border-[#315c43]/15 bg-[#f8faf4] p-1 text-sm shadow-[0_12px_35px_rgba(49,92,67,0.1)] my-10'>
                <input className='flex-1 rounded-full pl-5 max-md:py-3 outline-none' type='text' placeholder='Enter your email address' />
                <button className='cursor-glow hidden rounded-full bg-[#10231d] px-7 py-3 font-medium text-white transition hover:bg-[#315c43] md:block'>
                    Get Updates
                </button>
            </div>
            <button className='cursor-glow rounded-full bg-[#10231d] px-7 py-3 font-medium text-white transition hover:bg-[#315c43] md:hidden'>
                Get Updates
            </button>
        </section>
    );
}
