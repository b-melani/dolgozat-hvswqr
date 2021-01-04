import React, { useState } from "react";
import "./style.css";
import styled from "styled-components";

const Div1 = styled.div`
  display: flex;
`;
const ButtonStyled = styled.button`
  background-color: darkblue;
  color: white;
`;

const DivStyled = styled.div`
  display: flex;
  justify-content: space-around;
`;

function ListItem({ item }) {
  const { done, name, future } = item;

  if (done) {
    return <s>{name}</s>;
  }

  if (future) {
    return <i>{name}</i>;
  }

  return <>{name}</>;
}

function ListItemContainer({ item, setDone }) {
  const { id, done } = item;
  return (
    <Div1>
      <input
        type="checkbox"
        value={item}
        onChange={e => setDone(e.target.value)}
      />
      <div onClick={() => setDone(id, !done)}>
        <ListItem item={item} />
      </div>
    </Div1>
  );
}

function List({ list, setDone }) {
  return (
    <div>
      {list.map(listItem => (
        <ListItemContainer
          item={listItem}
          setDone={setDone}
          key={listItem.id}
        />
      ))}
    </div>
  );
}

function AddItem({ onAddItem }) {
  const [newItem, setNewItem] = useState("");

  function add() {
    onAddItem(newItem);
    setNewItem("");
  }

  return (
    <>
      <div class="container">
        <h4>Todo App</h4>
        <div class="row row-cols-4">
          <br />
          <DivStyled>
            <input
              type="text"
              value={newItem}
              onChange={elem => setNewItem(elem.target.value)}
                  onKeyPress={event => {
                if (event.key === 'Enter') {
                  add()
                }
              }}
            />

            <ButtonStyled onClick={add}>Hozzáadás</ButtonStyled>
          </DivStyled>
          
        </div>
      </div>
    </>
  );
}

function useToDoList() {
  const [index, setIndex] = useState(1);
  const [list, setList] = useState([]);

  function addItem(itemName) {
    const item = {
      id: index,
      name: itemName
    };
    setIndex(prevIndex => prevIndex + 1);

    setList(prevList => [...prevList, item]);
  }

  function setDone(id, done) {
    setList(prevList => {
      return prevList.map(item => {
        if (item.id === id) {
          return {
            ...item,
            done
          };
        } else {
          return item;
        }
      });
    });
  }

  function clearDone() {
    setList(prevList => prevList.filter(item => !item.done));
  }

  return { list, addItem, setDone, clearDone };
}

export default function App() {
  const { list, addItem, setDone, clearDone } = useToDoList();

  return (
    <div>
      <AddItem onAddItem={addItem} />
      <List list={list} setDone={setDone} />
      <br />
      <ButtonStyled onClick={clearDone}>Törlés</ButtonStyled>
    </div>
  );
}
