import { Head } from "@inertiajs/react";
import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

const DashboardLayout = (props) => {
    const { children } = props;

    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>

            <Sidebar>
                <Navbar />
                {children}
            </Sidebar>
        </>
    );
};

export default DashboardLayout;
