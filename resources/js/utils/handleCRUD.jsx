import { router } from "@inertiajs/react";
function handleSubmit(e, route, formData, options = {}) {
    e.preventDefault();
    router.post(route, formData, options);
}

function handleDelete(id, route, options = {}) {
    const res = router.delete(`/${route}/${id}`, options);
}

function handleEdit(e, route, id, formData, options = {}) {
    e.preventDefault();
    router.put(`/${route}/${id}`, formData, options);
}

function handleEditNotForm(route, id, formData) {
    router.put(`/${route}/${id}`, formData, {
        onError: (errors) => {
            console.log("Error:", errors);
        },
    });
}
function handleLogout(route) {
    const res = router.post(`/${route}`);
}
export {
    handleSubmit,
    handleDelete,
    handleLogout,
    handleEdit,
    handleEditNotForm,
};
