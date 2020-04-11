import React from 'react'

const FilterForm = ({ filterValue, filterFunction }) => {
    return (
        <div>
            Filter shown contacts with <input value={filterValue} onChange={filterFunction} />
        </div>
    )
}





export default FilterForm