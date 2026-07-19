const links = [
  { href: "#sistemas", label: "Sistemas" },
  { href: "#trajetoria", label: "Trajetória" },
  { href: "#sobre", label: "Sobre" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-10">
        <a href="#topo" className="font-display text-lg font-semibold tracking-tight">
          Gabriel Diogo<span className="text-accent">.</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted transition-colors hover:text-text"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#contato"
          className="rounded-full border border-accent/40 px-4 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-accent transition-colors hover:bg-accent hover:text-bg"
        >
          Contato
        </a>
      </div>
    </header>
  );
}
