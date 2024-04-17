export function SearchInput({ search, onType }) {
    return (
        <legend>
            <label className='mb-[10px] block text-base font-medium text-dark dark:text-white'>
                Название
            </label>
            <input
                type='text'
                value={search}
                onChange={onType}
                placeholder='Введите название'
                className='w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2'
            />
        </legend>
    );
}