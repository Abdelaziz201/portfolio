export const AboutSection = () => {
    return(
        <section id="about" className="py-24 px-4 relative">
            <div>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                    About<span className="text-primary"> Me</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                   <h3 className="text-2xl font-semibold">Passionate Developer </h3>
                   <p className="text-muted-foreground">i can write more here</p>
                   <p className="text-muted-foreground">i can write even more here</p>
                </div>
                <div>

                </div>
            </div>
        </section>
    );
};
