import { useState } from "react";

export default function useActionForm(initialValues = {}, baseEndpoints = "") {
    const [formData, setFormData] = useState(initialValues);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     const res = router.post(baseEndpoints, formData);
    //     console.log(res);
    // };

    return {
        formData,
        setFormData,
        handleChange,
    };
}
