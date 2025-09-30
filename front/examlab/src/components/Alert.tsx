
export default function Alert({ text = " " }: { text?: string }) {
  return <div className="alert-placeholder">{text}</div>;
}
