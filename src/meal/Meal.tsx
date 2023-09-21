import { useState, useCallback} from "react";
import Search from "../components/Search";
import MealCard from "./MealCard";

const Meal = () => {
  const [meal, setMeal] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const getMeal = useCallback(async () => {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`);
    const data = await res.json();
    if(data.meals !== null){
      setMeal(data.meals);
    } else{
      setError("No matches for this ingredient")
    }
  }, [query]);

  // useEffect(() => {
  //   getMeal();
  // }, [getMeal]);

  return (
    <main>
      <h1>Search For A Meal</h1>
      <div>
        <Search query={query} onQueryChange={(myQuery:any) => setQuery(myQuery)}/>
        <button onClick={getMeal}>Search</button>
        <p>{error}</p>
      </div>
      <div className="flex flex-wrap">
      {meal && meal.map((m:any,idx) =>(
          <MealCard name={m.strMeal} id={m.idMeal} thumbnail={m.strMealThumb} key={idx}/>
      ))}
      </div>
    </main>
  );
};

export default Meal;
