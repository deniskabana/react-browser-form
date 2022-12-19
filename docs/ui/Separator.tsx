export default function Separator({ small = false }: { small?: boolean }) {
  return <div className="bg-dark" style={{ height: "1px", margin: `${small ? "1.5" : "2"}rem 0`, opacity: 0.25 }} />;
}
