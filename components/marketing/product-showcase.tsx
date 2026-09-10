import Image from "next/image";

const shots = [
  {
    src: "/site-images/site-img-3.png",
    alt: "rustrest request builder showing a GET request and JSON response",
    title: "Build and send requests fast",
    description: "Organize requests into collections, set params, and inspect responses instantly.",
  },
  {
    src: "/site-images/site-img-4.png",
    alt: "rustrest Git panel showing a branch and uncommitted collection changes",
    title: "Git-native collections",
    description: "Collections live on your filesystem, so you can commit, branch, and diff them like code.",
  },
];

export function ProductShowcase() {
  return (
    <section className="mx-auto max-w-[90rem] px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold text-foreground">See rustrest in action</h2>
        <p className="mt-3 text-muted">A native client, not another Electron tab.</p>
      </div>
      <div className="mt-20 grid gap-x-12 gap-y-28 md:grid-cols-2">
        {shots.map((shot, index) => (
          <div key={shot.src} className={index === 1 ? "md:mt-32" : undefined}>
            <div className="relative aspect-[3/2] overflow-hidden rounded-2xl">
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-top"
              />
            </div>
            <h3 className="mt-6 text-xl font-medium text-foreground">{shot.title}</h3>
            <p className="mt-2 text-muted">{shot.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
