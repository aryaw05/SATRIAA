import { router } from "@inertiajs/react";

function handleSubmit(e, route, formData) {
    e.preventDefault();
    
    router.post(route, formData, {
        onSuccess: () => {
            router.visit('/admin/dashboard/bus'); 
        },
        onError: (errors) => {
            console.log("Error:", errors);
        }
    });
    
}

function handleDelete(id, route) {

     const res = router.delete(`/${route}/${id}`);
     console.log(res);
     

    
}

function handleLogout(route) {
    const res = router.post(`/${route}`);
}
export { handleSubmit, handleDelete, handleLogout };
