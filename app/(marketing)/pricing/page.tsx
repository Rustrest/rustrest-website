import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { pricingPlans } from "@/lib/data/pricing-plans";
import { cn } from "@/lib/utils";

export default function PricingPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      {/* <h1 className="text-center text-3xl font-semibold text-foreground">Pricing</h1>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {pricingPlans.map((plan) => (
          <Card
            key={plan.id}
            className={cn(plan.highlighted && "border-brand")}
          >
            <h2 className="text-lg font-semibold text-foreground">{plan.name}</h2>
            <p className="mt-2 text-sm text-muted">{plan.description}</p>
            <p className="mt-4 text-3xl font-semibold text-foreground">
              {plan.price}
              <span className="text-sm font-normal text-muted">
                /{plan.billingPeriod}
              </span>
            </p>
            <ul className="mt-6 space-y-2 text-sm text-foreground">
              {plan.features.map((feature) => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>
            <Button className="mt-6 w-full" variant={plan.highlighted ? "primary" : "outline"}>
              Choose {plan.name}
            </Button>
          </Card>
        ))}
      </div> */}

      <div className="mx-auto mt-12 max-w-3xl text-center border border-border p-6 rounded-lg">
        <img src="./site-images/free.png" alt="" />
      </div>
    </section>
  );
}
