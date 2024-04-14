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
        className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
        id={name}
      />
      <label
        htmlFor={name}
        className="text-sm text-gray-500 ms-2 dark:text-gray-400"
      >
        {label}
      </label>
    </div>
  )
}

export default RadioInput
