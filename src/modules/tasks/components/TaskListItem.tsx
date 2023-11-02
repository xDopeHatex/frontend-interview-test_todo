/* VENDOR */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/* APPLICATION */
import edit from "../../../shared/assets/icons/edit.svg";
import remove from "../../../shared/assets/icons/remove.svg";
import { selectAllCategories } from "../../categories/store/categoriesSlice";
import { Modal } from "../../../shared/UI/Modal";

import { tasksRemoved, tasksUpdated } from "../store/tasksSlice";
import { ModalHeader } from "../../../shared/UI/ModalHeader";
import { ModalText } from "../../../shared/UI/ModalText";
import { ModalRow } from "../../../shared/UI/ModalRow";
import { ModalTextarea } from "../../../shared/UI/ModalTextarea";
import { ModalFooter } from "../../../shared/UI/ModalFooter";

interface ListItemProps {
  item: {
    id: string;
    name: string;
    description: string;
    category?: string;
  };
}

const TaskListItem: React.FC<ListItemProps> = ({ item }) => {
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
          item={item}
          active={isModalRemoveActive}
          onClickCloseHandler={setIsModalRemoveActive}
        >
          <ModalHeader
            setActive={setIsModalRemoveActive}
            title={"Удаление задачи"}
          />
          <ModalText
            text={`Вы уверены, что хотите удалить задачу ${item.name}?`}
          />

          <ModalFooter
            setActive={setIsModalRemoveActive}
            onSubmit={() => dispatch(tasksRemoved(item.id))}
          />
        </Modal>
      )}
      {isModalEditActive && (
        <Modal
          item={item}
          active={isModalEditActive}
          onClickCloseHandler={setIsModalEditActive}
        >
          <ModalHeader
            setActive={setIsModalEditActive}
            title={"Редактирование задачи"}
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
              dispatch(
                tasksUpdated({
                  id: item.id,
                  name,
                  description,
                  category: selected,
                }),
              );
              setIsModalEditActive(false);
            }}
          />
        </Modal>
      )}
      <li className="list-item">
        <div className="list-item-col1">
          <div className="list-item-col1-row1">
            <h3 className="list-item-col1-row1__title">{item.name}</h3>
            {item.category && (
              <span className="list-item-col1-row1__category">
                {
                  categories.find((category) => category.id === item.category)
                    ?.name
                }
              </span>
            )}
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

export default TaskListItem;
