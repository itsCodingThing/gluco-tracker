export default function Header({ title }: { title: string }) {
  return (
    <header className="p-4 bg-primary text-primary-foreground">
      <h1 className="text-2xl font-bold">{title}</h1>
    </header>
  );
}
