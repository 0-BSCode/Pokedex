import { ReactElement } from "react"

interface TextInputI {
  name: string
  value: string
  placeholder?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled: boolean
}

const TextInput = ({
  name,
  value,
  placeholder,
  onChange,
  disabled,
}: TextInputI): ReactElement => {
  return (
    <div>
      <input
        type="text"
        id={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
        placeholder={placeholder}
      />
    </div>
  )
}

export default TextInput
