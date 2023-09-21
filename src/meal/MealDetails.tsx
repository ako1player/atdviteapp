// Please include Title, Category, Image Thumbnail, Instructions, Ingredients and Video (if available)
import { useEffect, useState, useCallback } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";

const MealDetails = () =>{
    const [details, setDetails] = useState<any>([]);
    const [ingredients, setIngredients] = useState<string[]>([]);
    const {id} = useParams();
    
    const getDetails = useCallback(async () => {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await res.json();
        //console.log(data.meals[0])
        setDetails(data.meals[0]);
    }, [id]);

    useEffect(() =>{
        getDetails();
    }, [id])

    useEffect(() =>{
        const res = [];
        for(let i = 1; i <= 20; i++){
            const ingredient = `strIngredient${i}`;
            const ing = details[ingredient]
            //ßconsole.log(ing)
            if(ing){
                res.push(ing)
            }
        }
        setIngredients(res);
    },[details])
    return(
        <main>
            <h1 className="text-white">Meal Details</h1>
                <div className="flex flex-col items-center justify-center">
                    <h3 className="font-bold">Meal Name: {details.strMeal}</h3>
                    <p className="font-bold">Category: {details.strCategory}</p>
                    <img src={details.strMealThumb} alt={details.strMeal} className="w-64 h-64" />
                    <div>
                        <p className="font-bold">Ingredients: </p>
                        {ingredients?.map((i, idx) =>(
                        <ul>
                            <li key={idx}>{i}</li>
                        </ul>
                    ))}
                    <p className="font-bold">Instructions:</p>
                    <p>{details?.strInstructions}</p>
                    </div>
                    <ReactPlayer url={details.strYoutube} />
                </div>
        </main>
    )
}

export default MealDetails;