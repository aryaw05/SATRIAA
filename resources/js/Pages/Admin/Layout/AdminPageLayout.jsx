

export default function AdminPageLayout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
      <footer className="bg-gray-800 text-white p-4 text-center">
        © {new Date().getFullYear()} Admin Dashboard
      </footer>
    </div>
  );
}