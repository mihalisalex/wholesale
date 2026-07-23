import { GlassPanel } from "@/components/ui/GlassPanel";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function SampleCta() {
  return (
    <section className="pt-16 md:pt-24 pb-20 md:pb-28">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <Reveal>
          <GlassPanel className="px-8 py-16 md:px-16 md:py-20 text-center">
            <div className="blob w-[360px] h-[360px] bg-gold -top-[140px] -left-[90px]" />
            <div className="blob w-[320px] h-[320px] bg-accent-2 -bottom-[140px] -right-[70px]" />
            <div className="blob w-[220px] h-[220px] bg-accent-3 top-[40%] left-[42%] opacity-35" />
            <div className="relative z-10 max-w-xl mx-auto">
              <p className="text-[0.78rem] uppercase tracking-[0.14em] font-bold text-gold mb-3.5">Ready When You Are</p>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">Build your order in the catalog.</h2>
              <p className="text-ink/60 mb-8">
                Add 8-pair packages to your cart as you browse, then request a Pro Forma Invoice whenever you&rsquo;re ready
                — no commitment until you confirm by bank transfer.
              </p>
              <Button href="/catalog">Browse the Catalog</Button>
            </div>
          </GlassPanel>
        </Reveal>
      </div>
    </section>
  );
}
