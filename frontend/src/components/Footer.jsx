
import { ArrowUp } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-12 px-4 relative border-border flex flex-wrap justify-between items-center mt-auto">
      <p className="text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Abdelaziz Abdelkarim.. All rights reserved.
      </p>
      <a
        href="#hero"
        className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
      >
        <ArrowUp size={20} />
      </a>
    </footer>
  );
};