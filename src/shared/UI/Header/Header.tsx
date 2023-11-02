/* VENDOR */
import { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

/* APPLICATION */
import "./Header.css";

import { Modal } from "../Modal";
import { ModalHeader } from "../ModalHeader";
import { ModalText } from "../ModalText";
import { ModalFooter } from "../ModalFooter";
import {
  tasksAdded,
  tasksRemoved,
} from "../../../modules/tasks/store/tasksSlice";
import { ModalRow } from "../ModalRow";
import { ModalTextarea } from "../ModalTextarea";
import { categoriesAdded } from "../../../modules/categories/store/categoriesSlice";
import { useDispatch } from "react-redux";
import { ModalInput } from "../ModalInput";

export const Header = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isCategoriesPathname = pathname === "/categories";
  const isTasksPathname = pathname === "/tasks";
  const [isCreateTaskModalActive, setIsCreateTaskModalActive] = useState(false);
  const [isCreateCategoryModalActive, setIsCreateCategoryModalActive] =
    useState(false);
  const [name, setName] = useState("");
  const [selected, setSelected] = useState("");
  const [description, setDescription] = useState("");

  function clearState() {
    setName("");
    setDescription("");
    setSelected("");
  }

  return (
    <main className="App">
      {isCreateTaskModalActive && (
        <Modal
          active={isCreateTaskModalActive}
          onClickCloseHandler={setIsCreateTaskModalActive}
        >
          <ModalHeader
            setActive={setIsCreateTaskModalActive}
            title={"Создание задачи"}
          />
          <ModalRow
            name={name}
            setName={setName}
            selected={selected}
            setSelected={setSelected}
          />
          <ModalTextarea
            description={description}
            setDescription={setDescription}
          />
          <ModalFooter
            setActive={setIsCreateTaskModalActive}
            clearState={clearState}
            size="large"
            onSubmit={
              name
                ? () => {
                    dispatch(
                      tasksAdded({
                        name,
                        description,
                        category: setSelected,
                      }),
                    );
                    clearState();
                    setIsCreateTaskModalActive(false);
                  }
                : () => {}
            }
          />
        </Modal>
      )}
      {isCreateCategoryModalActive && (
        <Modal
          active={isCreateCategoryModalActive}
          onClickCloseHandler={setIsCreateCategoryModalActive}
        >
          <ModalHeader
            setActive={setIsCreateCategoryModalActive}
            title={"Создание категории"}
          />
          <ModalInput name={name} setName={setName} size="large" />
          <ModalFooter
            setActive={setIsCreateCategoryModalActive}
            clearState={clearState}
            size="large"
            onSubmit={
              name
                ? () => {
                    dispatch(categoriesAdded({ name, description }));
                    clearState();
                    setIsCreateCategoryModalActive(false);
                  }
                : () => {}
            }
          />
        </Modal>
      )}
      <header className="header">
        <h1 className="header-title">ToDo List</h1>
        <nav className="header-nav">
          <ul className="header-list">
            <li>
              <NavLink
                to="tasks"
                className={({ isActive }) =>
                  isActive
                    ? "header-list-item header-list-item-active"
                    : "header-list-item"
                }
              >
                Задачи
              </NavLink>
            </li>
            <div className="delimiter"></div>
            <li>
              <NavLink
                to="categories"
                className={({ isActive }) =>
                  isActive
                    ? "header-list-item header-list-item-active"
                    : "header-list-item"
                }
              >
                Категории
              </NavLink>
            </li>
          </ul>
          <button
            className="header-button"
            onClick={() => {
              isCategoriesPathname
                ? setIsCreateCategoryModalActive(true)
                : setIsCreateTaskModalActive(true);
            }}
          >
            {isCategoriesPathname
              ? "Добавить категорию"
              : isTasksPathname
              ? "Добавить задачу"
              : "unknown pathname"}
          </button>
        </nav>
      </header>
      <Outlet />
    </main>
  );
};
