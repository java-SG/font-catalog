import { styles } from './Styles.tsx'

interface FilterProps {
    listOfFilters: string[];
    filter: string | null;
    setFilter: (value: string | null) => void;
}

export default function Filter({listOfFilters, filter, setFilter}: FilterProps) {

    return (
        <>
            <select className={styles.info} value={filter ?? ""} onChange={(event) => {
                const value = event.target.value;
                setFilter(value === "" || value === "None" ? null : value);
            }} >
                <option value="" disabled hidden>
                    Select Filter
                </option>
                {listOfFilters.map((filterName) => (
                    <option key={filterName} value={filterName}>
                        {filterName}
                    </option>
                ))}
            </select>
        </>
    )
}