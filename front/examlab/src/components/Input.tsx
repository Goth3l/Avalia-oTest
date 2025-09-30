import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export default function Input({ label, error, ...props }: InputProps) {
  return (
    <label className="field">
      <span>{label}</span>
      <input {...props} />
      {error ? <small className="error">{error}</small> : <small className="hint">&nbsp;</small>}
    </label>
  );
}
