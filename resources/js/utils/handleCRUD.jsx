import { router } from "@inertiajs/react";

function handleSubmit(e, route, formData) {
    e.preventDefault();
    const res = router.post(route, formData);
    console.log(res);
}

function handleDelete(id, route) {
    const res = router.delete(`/${route}/${id}`);
}

function handleLogout(route) {
    const res = router.post(`/${route}`);
}
export { handleSubmit, handleDelete, handleLogout };
