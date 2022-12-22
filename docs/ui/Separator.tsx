export default function Separator({ small = false, dashed = false }: { small?: boolean; dashed?: boolean }) {
  return (
    <div
      style={{
        margin: `${small ? "1" : "2"}rem 0`,
        opacity: 0.25,
        borderTop: `1px ${dashed ? "dashed" : "solid"} var(--bs-gray-800)`,
      }}
    />
  );
}
