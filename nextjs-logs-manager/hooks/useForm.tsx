import { useState } from "react"


export const useForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const changeFormValues = ({ name, value }: { name: string, value: string }) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const resetForm = () => {
        setFormData({ email: '', password: '' })
    }

    return {
        formData,
        resetForm,
        changeFormValues

    }
}
