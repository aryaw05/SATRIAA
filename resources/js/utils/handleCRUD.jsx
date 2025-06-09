import { router } from "@inertiajs/react";

function handleSubmit(e, route, formData) {
    e.preventDefault();
    
    router.post(route, formData, {
        onSuccess: () => {
            console.log("Sukses simpan data");
            router.visit('/admin/dashboard/bus'); // redirect manual
        },
        onError: (errors) => {
            console.log("Error:", errors);
        }
    });
    
}

function handleDelete(id, route) {
    const res = router.delete(`/${route}/${id}`);
}

function handleLogout(route) {
    const res = router.post(`/${route}`);
}
export { handleSubmit, handleDelete, handleLogout };
