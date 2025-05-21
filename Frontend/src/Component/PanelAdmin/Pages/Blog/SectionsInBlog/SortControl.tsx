import { useState, useEffect } from "react";
import Select from "react-select";
import apiRoutes from "../../../../../Constants/apiRoutes";

interface SortType {
    value: string;
    label: string;
}

function SortControl({ onSort }: any) {
    const [sortOption, setSortOption] = useState<SortType[]>([]);

    useEffect(() => {
        getBlogsBySort(sortOption);
    }, [sortOption]);

    const getBlogsBySort = async (sortQuery: any) => {
        const sortValue = sortQuery.value;
        try {
            const response = await fetch(apiRoutes.getBlogByQuery(`${sortValue}`));
            const data = await response.json();
            onSort(data)
        } catch (error) {
            console.log(error);
        }
    }

    const customSelectStyle = {
        control: (base: any) => ({
            ...base,
            width: '150px',

        })
    }

    const sortOptions: SortType[] = [
        { value: 'date-desc', label: "Date(Newest)" },
        { value: 'date-asc', label: "Date(Oldest)" },
        { value: 'views-desc', label: "Views(Highest)" },
        { value: 'views-asc', label: "Views(Lowest)" },
    ]
    const handleSortChange = async (selectedOption: any) => {
        setSortOption(selectedOption);
    }

    return (
        <div>
            <Select<SortType>
                options={sortOptions}
                value={sortOption}
                isSearchable={false}
                onChange={handleSortChange}
                placeholder="Sort"
                styles={customSelectStyle}
            />
        </div>
    )
}

export default SortControl
