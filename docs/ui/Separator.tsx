export default function Separator({
  light = false,
  small = false,
  dashed = false,
}: {
  light?: boolean;
  small?: boolean;
  dashed?: boolean;
}) {
  return (
    <div
      style={{
        margin: `${small ? "1" : "2"}rem 0`,
        opacity: 0.25,
        borderTop: `1px ${dashed ? "dashed" : "solid"} var(${light ? "--bs-gray-400" : "--bs-gray-800"})`,
      }}
    />
  );
}
