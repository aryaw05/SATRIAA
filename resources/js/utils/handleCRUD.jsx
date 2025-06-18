import { router } from "@inertiajs/react";
function handleSubmit(e, route, formData) {
    e.preventDefault();
    router.post(route, formData, {
        onError: (errors) => {
            console.log("Error:", errors);
        }
    });
    
}

function handleDelete(id, route) {
     const res = router.delete(`/${route}/${id}`);
     console.log(res);
}

function handleEdit (e ,route, id, formData) {
    e.preventDefault();
    router.put(`/${route}/${id}`, formData , 
{

    onError: (errors) => {
        console.log("Error:", errors);
    }
}
 );
}

function handleEditNotForm (route, id, formData) {
 router.put(`/${route}/${id}`, formData , 
{
    onError: (errors) => {
        console.log("Error:", errors);
    }
}
 );
}
function handleLogout(route) {
    const res = router.post(`/${route}`);
}
export { handleSubmit, handleDelete, handleLogout , handleEdit  , handleEditNotForm};

