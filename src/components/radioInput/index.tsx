import { ReactElement } from "react"

interface RadioInputI {
  name: string
  label: string
  group: string
  checked: boolean
  onChange: () => void
}

const RadioInput = ({
  name,
  label,
  group,
  checked,
  onChange,
}: RadioInputI): ReactElement => {
  return (
    <div className="flex">
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        name={group}
        className="mt-0.5 shrink-0 rounded-full border-gray-200 text-blue-600 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:checked:border-blue-500 dark:checked:bg-blue-500 dark:focus:ring-offset-gray-800"
        id={name}
      />
      <label
        htmlFor={name}
        className="ms-2 text-sm text-gray-500 dark:text-gray-400"
      >
        {label}
      </label>
    </div>
  )
}

export default RadioInput
