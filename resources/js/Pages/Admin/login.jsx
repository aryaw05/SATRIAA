import { router } from "@inertiajs/react";
import { useId, useState } from "react";
import useActionForm from "../../hooks/useActionForm";

const LoginSatria = (props) => {
    const id = useId();
    console.log(id);


    const { errors } = props;
    const { formData, handleChange } = useActionForm({
        username: "",
        password: "",
    });

    console.log(errors);

    const handleSubmit = (event) => {
        event.preventDefault();
        const res = router.post("/login", formData);
        console.log(res);
        console.log(formData);
    };
    return (
        <div className="bg-gray-200 min-h-screen flex items-center justify-center px-4">
            <div className="rounded-3xl w-full sm:w-[90%] md:w-[70%] lg:w-[40%] xl:w-[30%] max-w-md p-6 py-10 bg-white shadow-lg">
                <h1 className="text-2xl font-semibold text-center mb-4">
                    Login
                </h1>
                <form
                    className="space-y-4 px-2"
                    method="POST"
                    onSubmit={handleSubmit}
                >
                    <div>
                        <label className="text-sm text-black">Username</label>
                        <input
                            name="username"
                            type="text"
                            className="input w-full bg-gray-100 p-2 rounded-md"
                            placeholder="Masukkan Username"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="text-sm text-black">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="input w-full bg-gray-100 p-2 rounded-md"
                            placeholder="Masukkan Password"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex justify-center pt-4">
                        <button
                            type="submit"
                            className="btn bg-orange-500 w-4/5 text-white p-2 rounded-md hover:bg-orange-600 transition"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginSatria;
