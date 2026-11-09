import { LayoutDashboard, GraduationCap, ClipboardList } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 bg-sidebar border-r flex flex-col h-screen fixed">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-primary">CertiLab</h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <Link href="/" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-sidebar-accent group">
          <LayoutDashboard className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
          <span>Dashboard</span>
        </Link>
        <Link href="/aprendizaje" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-sidebar-accent group">
          <GraduationCap className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
          <span>Aprendizaje</span>
        </Link>
        <Link href="/examen" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-sidebar-accent group">
          <ClipboardList className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
          <span>Examen</span>
        </Link>
      </nav>
    </div>
  );
}
