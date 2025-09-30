import React from "react";

type Option = { label: string; value: string } | string;

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: Option[];
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const toPair = (o: Option) => (typeof o === "string" ? { label: o, value: o } : o);

export default function Select({ label, options, error, value, onChange, ...props }: SelectProps) {
  return (
    <label className="field">
      <span>{label}</span>
      <select value={value} onChange={onChange} {...props}>
        <option value="">Selecione...</option>
        {options.map((o) => {
          const p = toPair(o);
          return (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          );
        })}
      </select>
      {error ? <small className="error">{error}</small> : <small className="hint">&nbsp;</small>}
    </label>
  );
}
