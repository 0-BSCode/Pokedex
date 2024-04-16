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
    <label
      htmlFor={name}
      className="relative -ms-px -mt-px flex w-full border border-gray-200 px-3 py-2 text-sm shadow-sm first:rounded-t-lg last:rounded-b-lg focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 sm:mt-0 sm:first:ms-0 sm:first:rounded-s-lg sm:first:rounded-se-none sm:last:rounded-e-lg sm:last:rounded-es-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
    >
      <input
        type="radio"
        id={name}
        checked={checked}
        onChange={onChange}
        name={group}
        className="mt-0.5 shrink-0 rounded-full border-gray-300 text-blue-600 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-500 dark:bg-neutral-800 dark:checked:border-blue-500 dark:checked:bg-blue-500 dark:focus:ring-offset-gray-800"
      />
      <span className="ms-3 text-sm text-gray-500 dark:text-neutral-400">
        {label}
      </span>
    </label>
  )
}

export default RadioInput
