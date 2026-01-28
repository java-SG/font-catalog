import { styles } from './Styles.tsx'

interface FilterProps {
    listOfFilters: string[];
    filter: string | null;
    setFilter: (value: string | null) => void;
}

export default function Filter({ listOfFilters, filter, setFilter }: FilterProps) {

    return (
        <div className={styles.filter}>
            <div className={styles.neon_inner}>
                <select className={`${styles.info} appearance-none`} value={filter ?? ""} onChange={(event) => {
                    const value = event.target.value;
                    setFilter(value === "" || value === "None" ? null : value);
                }} >
                    <option className="flex flex-col justify-center items-center" value="" disabled hidden>
                        Select Filter
                    </option>
                    {listOfFilters.map((filterName) => (
                        <option key={filterName} value={filterName}>
                            {filterName}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}