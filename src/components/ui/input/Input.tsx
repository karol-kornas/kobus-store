type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input(props: InputProps) {
  return (
    <input
      {...props}
      placeholder={props.placeholder ?? " "}
      className="w-full border placeholder:text-neutral-300 placeholder:opacity-0 focus:placeholder:opacity-100 border-neutral-400 px-3 py-3 peer focus:outline-none transition-shadow duration-300"
    />
  );
}
