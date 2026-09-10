import Image from "next/image";

const shots = [
  {
    src: "/site-images/site-img-1.png",
    alt: "rustrest request builder showing a GET request and JSON response",
    title: "Build and send requests fast",
    description: "Organize requests into collections, set params, and inspect responses instantly.",
  },
  {
    src: "/site-images/site-img-2.jpg",
    alt: "rustrest Git panel showing a branch and uncommitted collection changes",
    title: "Git-native collections",
    description: "Collections live on your filesystem, so you can commit, branch, and diff them like code.",
  },
];

export function ProductShowcase() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold text-foreground">See rustrest in action</h2>
        <p className="mt-3 text-muted">A native client, not another Electron tab.</p>
      </div>
      <div className="mt-12 grid gap-10 md:grid-cols-2">
        {shots.map((shot) => (
          <div key={shot.src}>
            <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
              <Image
                src={shot.src}
                alt={shot.alt}
                width={1200}
                height={800}
                className="w-full"
              />
            </div>
            <h3 className="mt-4 text-lg font-medium text-foreground">{shot.title}</h3>
            <p className="mt-1 text-sm text-muted">{shot.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
