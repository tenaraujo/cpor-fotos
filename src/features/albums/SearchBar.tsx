interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
}: Props) {
  return (
    <input
      type="text"
      placeholder="Buscar fotografias..."
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="
        w-full
        rounded-2xl
        border
        bg-white
        px-5
        py-4
        text-lg
        shadow-sm
        outline-none
        transition
        focus:border-yellow-500
        focus:ring-2
        focus:ring-yellow-200
      "
    />
  );
}