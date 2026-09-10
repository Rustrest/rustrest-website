import { Hero } from "@/components/marketing/hero";
import { IntegrationsSection } from "@/components/marketing/integrations-section";
import { ProductShowcase } from "@/components/marketing/product-showcase";
import { WhyRustRest } from "@/components/marketing/why-rustrest";

export default function HomePage() {
  return (
    <>
      <Hero />
      <IntegrationsSection />
      <ProductShowcase />
      <WhyRustRest />
    </>
  );
}
