import { ChangeEvent } from "react";

const Search = ({query, onQueryChange}:any) =>{
    return (
        <div>
            <input className="pl-2 border rounded-full shadow-lg md:min-w-full" type="text" name="query" id="query" value={query} onChange={((event:ChangeEvent<HTMLInputElement>) => {onQueryChange(event.target.value)})}
                placeholder="Search For Meal By Ingredient"/>
        </div>
    )
}

export default Search;