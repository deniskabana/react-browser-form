interface FormGroupTitleProps {
  children?: React.ReactNode;
}

export function FormGroupTitle({ children }: FormGroupTitleProps) {
  return <h6 className="mb-3">{children}</h6>;
}
