import classes from './AvailableMeals.module.css'
import Card from './../UI/Card'
import MealItem from "./Meal/MealItem";
const AvailableMeals = () => {
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://food-app-d4540-default-rtdb.europe-west1.firebasedatabase.app/meals.json')
            const responseData = await response.json()
        }

        fetchData()
    }, [])
    const meals = DUMMY_MEALS.map(meal =>
        <MealItem
            id={meal.id}
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}/>
    )
    return <section className={classes.meals}>
        <Card>
            <ul>
                {meals}
            </ul>
        </Card>

    </section>
}

export default AvailableMeals;