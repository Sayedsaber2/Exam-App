
import { BookOpenCheck, Brain, Code, FileText, Folder } from "lucide-react";
export default function AuthHero() {
    return <>
        <div className="hidden lg:flex flex-col justify-center gap-12 bg-blue-100
        bg-[radial-gradient(ellipse_70%_60%_at_25%_30%,#ffffff_0%,transparent_60%),radial-gradient(ellipse_60%_50%_at_90%_15%,var(--color-blue-200)_0%,transparent_65%),radial-gradient(ellipse_70%_55%_at_60%_100%,var(--color-blue-200)_0%,transparent_60%),radial-gradient(ellipse_70%_60%_at_80%_80%,#ffffff_0%,transparent_60%)] px-16">
            <div className="flex items-center gap-2">
                <div className="relative">
                    <Folder size={28} fill="var(--color-primary)" className="text-primary" />
                    <Code size={13} strokeWidth={2.5} className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 text-white" />
                </div>
                <p className="text-xl font-semibold text-primary">Exam App</p>
            </div>
            <h1 className="text-3xl font-bold text-foreground font-inter mb-4">Empower your learning journey with our smart exam platform.</h1>
            <ul className="space-y-8">
                <li className="flex items-start gap-4">
                    <div className="flex size-9 shrink-0 items-center justify-center border-2 border-primary text-primary">
                        <Brain size={20} />
                    </div>
                    <div className="space-y-1">
                        <h3 className="font-semibold text-xl text-primary">Tailored Diplomas</h3>
                        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                            Choose from specialized tracks like Frontend, Backend, and Mobile Development.
                        </p>
                    </div>
                </li>
                <li className="flex items-start gap-4">
                    <div className="flex size-9 shrink-0 items-center justify-center border-2 border-primary text-primary">
                        <BookOpenCheck size={20} />
                    </div>
                    <div className="space-y-1">
                        <h3 className="font-semibold text-xl text-primary">Focused Exams</h3>
                        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                            Access topic-specific tests including HTML, CSS, JavaScript, and more.
                        </p>
                    </div>
                </li>
                <li className="flex items-start gap-4">
                    <div className="flex size-9 shrink-0 items-center justify-center border-2 border-primary text-primary">
                        <FileText size={20} />
                    </div>
                    <div className="space-y-1">
                        <h3 className="font-semibold text-xl text-primary">Smart Multi-Step Forms</h3>
                        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                            Choose from specialized tracks like Frontend, Backend, and Mobile Development.
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    </>;
}
