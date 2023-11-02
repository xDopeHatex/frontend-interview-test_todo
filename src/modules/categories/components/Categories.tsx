/* VENDOR */
import { useSelector } from "react-redux";

/* APPLICATION */
import CategoryListItem from "./CategoryListItem";
import { selectAllCategories } from "../store/categoriesSlice";

const Categories = () => {
  const categories = useSelector(selectAllCategories);

  return (
    <ul>
      {categories.map((category) => (
        <CategoryListItem key={category.id} item={category} />
      ))}
    </ul>
  );
};

export default Categories;
