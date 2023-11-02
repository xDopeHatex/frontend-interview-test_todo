/* VENDOR */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/* APPLICATION */
import edit from "../../../shared/assets/icons/edit.svg";
import remove from "../../../shared/assets/icons/remove.svg";
import {
  categoriesRemoved,
  categoriesUpdated,
  selectAllCategories,
} from "../store/categoriesSlice";

import {
  tasksClearedCategories,
  tasksRemoved,
  tasksUpdated,
} from "../../tasks/store/tasksSlice";
import { Modal } from "../../../shared/UI/Modal";
import { ModalHeader } from "../../../shared/UI/ModalHeader";
import { ModalText } from "../../../shared/UI/ModalText";
import { ModalFooter } from "../../../shared/UI/ModalFooter";
import { ModalRow } from "../../../shared/UI/ModalRow";
import { ModalTextarea } from "../../../shared/UI/ModalTextarea";

interface ListItemProps {
  item: {
    id: string;
    name: string;
    description: string;
    category?: string;
  };
}

const CategoryListItem: React.FC<ListItemProps> = ({ item }) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  const [isModalRemoveActive, setIsModalRemoveActive] =
    useState<boolean>(false);
  const [isModalEditActive, setIsModalEditActive] = useState<boolean>(false);

  const [name, setName] = useState(item.name);

  const [selected, setSelected] = useState(item.category || "");
  const [description, setDescription] = useState(item.description);

  return (
    <>
      {isModalRemoveActive && (
        <Modal
          active={isModalRemoveActive}
          onClickCloseHandler={setIsModalRemoveActive}
        >
          <ModalHeader
            setActive={setIsModalRemoveActive}
            title={"Удаление категории"}
          />
          <ModalText
            text={`Вы уверены, что хотите удалить категорию ${item.name}?`}
          />

          <ModalFooter
            setActive={setIsModalRemoveActive}
            onSubmit={() => {
              dispatch(categoriesRemoved(item.id));
              dispatch(tasksClearedCategories(item.id));
            }}
          />
        </Modal>
      )}
      {isModalEditActive && (
        <Modal
          active={isModalEditActive}
          onClickCloseHandler={setIsModalEditActive}
        >
          <ModalHeader
            setActive={setIsModalEditActive}
            title={"Редактирование категории"}
          />

          <ModalRow
            name={name}
            setName={setName}
            selected={selected}
            setSelected={setSelected}
          />
          <ModalTextarea
            description={description!}
            setDescription={setDescription!}
          />

          <ModalFooter
            setActive={setIsModalEditActive}
            onSubmit={() => {
              dispatch(categoriesUpdated({ id: item.id, name, description }));
              setIsModalEditActive(false);
            }}
          />
        </Modal>
      )}
      <li className="list-item">
        <div className="list-item-col1">
          <div className="list-item-col1-row1">
            <h3 className="list-item-col1-row1__title">{item.name}</h3>

            <span className="list-item-col1-row1__category">
              {
                categories.find((category) => category.id === item.category)
                  ?.name
              }
            </span>
          </div>
          <div className="list-item-col1-row2">{item.description}</div>
        </div>
        <div className="list-item-col2">
          <button
            className="list-item-col2__btn"
            onClick={() => {
              setIsModalEditActive(true);
            }}
          >
            <img src={edit} alt="edit" />
          </button>
          <button
            className="list-item-col2__btn"
            onClick={() => {
              setIsModalRemoveActive(true);
            }}
          >
            <img src={remove} alt="remove" />
          </button>
        </div>
      </li>
    </>
  );
};

export default CategoryListItem;
