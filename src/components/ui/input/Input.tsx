type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input(props: InputProps) {
  return (
    <input
      {...props}
      className="w-full border border-neutral-400 px-3 py-2 focus:outline-none focus:ring transition-shadow duration-300"
    />
  );
}
