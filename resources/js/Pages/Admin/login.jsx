import { router } from "@inertiajs/react";
import useActionForm from "../../hooks/useActionForm";
import AlertList from "../../components/alert/AlertList";
import { useAlert } from "../../hooks/useAlert";
import { useEffect } from "react";

const LoginSatria = () => {
    const { formData, handleChange } = useActionForm({
        username: "",
        password: "",
    });

    const { showError, showSuccess, clearAlert, isAlert } = useAlert();
    useEffect(() => {
        if (isAlert.success?.length > 0 || isAlert.errors?.length > 0) {
            setTimeout(() => {
                clearAlert();
            }, 3000);
        }
    }, [isAlert]);

    const handleSubmit = (event) => {
        event.preventDefault();
        router.post("/login", formData, {
            onError: (errors) => {
                showError(
                    Object.values(errors).flat().length > 0
                        ? Object.values(errors).flat()
                        : ["Login failed, please try again."]
                );
            },
            preserveState: true,
        });
    };
    return (
        <div className="bg-gray-200 min-h-screen flex items-center justify-center px-4">
            <div className="w-full flex flex-col justify-center items-center">
                <div
                    role="alert"
                    className={`alert alert-error ${
                        isAlert.errors?.length > 0 ||
                        isAlert.success?.length > 0
                            ? ""
                            : "hidden"
                    } mb-5`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span>{isAlert && isAlert.errors}</span>
                </div>
                <div className="rounded-2xl w-full sm:w-[90%] md:w-[70%] lg:w-[40%] xl:w-[30%] max-w-md p-6 py-10 bg-white shadow-lg">
                    <h1 className="text-2xl font-semibold text-center mb-4">
                        Login
                    </h1>
                    <form
                        className="space-y-4 px-2"
                        method="POST"
                        onSubmit={handleSubmit}
                    >
                        <div>
                            <label className="text-sm text-black">
                                Username
                            </label>
                            <input
                                name="username"
                                type="text"
                                className="input w-full bg-gray-100 p-2 rounded-md"
                                placeholder="Masukkan Username"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="text-sm text-black">
                                Password
                            </label>
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
        </div>
    );
};

export default LoginSatria;
