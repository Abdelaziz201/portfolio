import { ArrowUp } from "lucide-react";
export const Footer = () => {
    return (
        <footer className="py-12 px-4 bg-card relative border-t border-border mt-12 pt-8 flex flex-wrap justify-between items-center">
            <p className="text-sm text-muted-foreground all">© 2025 Abdelaziz Abdelkarim. All rights reserved.</p>
            <a href="#hero" className="text-primary p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                <ArrowUp />
            </a>
        </footer>
    );
}