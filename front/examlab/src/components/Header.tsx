

type HeaderProps = { title: string; subtitle?: string };

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="page-head">
      <h1>{title}</h1>
      {subtitle && <p className="muted">{subtitle}</p>}
    </header>
  );
}
