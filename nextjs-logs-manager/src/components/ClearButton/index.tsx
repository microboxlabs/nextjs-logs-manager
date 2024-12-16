import { Button } from "flowbite-react"

interface ClearButtonProps {
    onClick: () => void
    color?: "gray" | "red" | "green" | "blue" | "yellow" | "indigo" | "purple" | "pink"
    icon?: React.ReactNode
    size?: "xs" | "sm" | "md" | "lg" | "xl"
}


export const ClearButton = ({ onClick, color = "gray", icon, size }: ClearButtonProps) => {
    return (
        <Button onClick={onClick} color={color} size={size}>
            {icon}
            Clear
        </Button>
    )
}