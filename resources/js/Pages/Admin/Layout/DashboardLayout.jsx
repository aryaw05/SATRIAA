import { Head } from "@inertiajs/react";
import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

const DashboardLayout = (props) => {
    const { children, title = "Dashboard" } = props;

    return (
        <>
            <Head title={`${title} | Trans Kediri`} />

            <Sidebar>
                <Navbar />
                {children}
            </Sidebar>
        </>
    );
};

export default DashboardLayout;
