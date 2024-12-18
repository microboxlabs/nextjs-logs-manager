import { Button } from "flowbite-react"

export interface ClearButtonProps {
    onClick: () => void
    color?: "gray" | "red" | "green" | "blue" | "yellow" | "indigo" | "purple" | "pink"
    icon?: React.ReactNode
    size?: "xs" | "sm" | "md" | "lg" | "xl"
}


/**
 * ClearButton component renders a button with an optional icon and customizable color and size.
 *
 * @param {function} onClick - The function to call when the button is clicked.
 * @param {string} [color="gray"] - The color of the button. Defaults to "gray".
 * @param {React.ReactNode} icon - The icon to display inside the button.
 * @param {string} size - The size of the button.
 *
 * @returns {JSX.Element} The rendered ClearButton component.
 */
export const ClearButton = ({ onClick, color = "gray", icon, size }: ClearButtonProps) => {
    return (
        <Button onClick={onClick} color={color} size={size}>
            {icon}
            Clear
        </Button>
    )
}