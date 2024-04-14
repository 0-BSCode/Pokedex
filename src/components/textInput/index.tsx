import { ReactElement } from "react"

interface TextInputI {
  name: string
  label: string
  value: string
  placeholder?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled: boolean
}

const TextInput = ({
  name,
  label,
  value,
  placeholder,
  onChange,
  disabled,
}: TextInputI): ReactElement => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium mb-2 dark:text-white"
      >
        {label}
      </label>
      <input
        type="text"
        id={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
        placeholder={placeholder}
      />
    </div>
  )
}

export default TextInput
