export function Title({ text }) {
    return (
        <section className="bg-white py-[70px] dark:bg-dark">
            <div className="mx-auto px-4 sm:container">
                <div className="border-b border-stroke dark:border-dark-3">
                    <h2 className="mb-2 text-2xl font-semibold text-dark dark:text-white">
                        {text}
                    </h2>
                </div>
            </div>
        </section>
    );
}