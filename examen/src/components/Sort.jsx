export function Sort({ sortOption, onChange }) {
    return (
        <div className='relative z-20'>
            <select value={sortOption} onChange={onChange} className='relative z-20 w-full appearance-none rounded-lg border border-stroke dark:border-dark-3 bg-transparent py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2'>
                <option value='default' className='dark:bg-dark-2'>По умолчанию</option>
                <option value='price_desc' className='dark:bg-dark-2'>Сначала дорогие</option>
                <option value='price_asc' className='dark:bg-dark-2'>Сначала дешевые</option>
            </select>
            <span className='absolute right-4 top-1/2 z-10 mt-[-2px] h-[10px] w-[10px] -translate-y-1/2 rotate-45 border-r-2 border-b-2 border-body-color'></span>
        </div>
    );
}