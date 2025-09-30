import React from "react";

type CardProps = {
  title: React.ReactNode;
  actions?: React.ReactNode;    
  children?: React.ReactNode;
};

export default function Card({ title, actions, children }: CardProps) {
  return (
    <section className="card">
      <header className="card-head">
        <h3>{title}</h3>
        <div className="gap">{actions}</div>
      </header>
      <div className="card-body">{children}</div>
    </section>
  );
}
