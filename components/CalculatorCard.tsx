import type { ReactNode } from 'react';

interface CalculatorCardProps {
  id?: string;
  title: string;
  description: string;
  children: ReactNode;
}

export default function CalculatorCard({
  id,
  title,
  description,
  children,
}: CalculatorCardProps) {
  return (
    <section id={id} className="calculator-card">
      <h2 className="calculator-title">{title}</h2>
      <p className="calculator-description">{description}</p>
      <div className="calculator-content">{children}</div>
    </section>
  );
}
