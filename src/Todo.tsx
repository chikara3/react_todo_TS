// Todo.tsx
import { useState, ChangeEvent } from 'react';
import './Todo.css';
import { InputTodo } from './components/InputTodo';
import { IncompleteTodos } from './components/IncompleteTodos';
import { CompleteTodos } from './components/CompleteTodos';
import { UnStartedTodo } from './components/unStartedTodo';

export function Todo() {
  const [todoText, setTodoText] = useState<string>('');
  const [unStartedTodos, setUnstartedTodos] = useState<string[]>([]);
  const [incompleteTodos, setIncompleteTodos] = useState<string[]>([]);
  const [completeTodos, setCompleteTodos] = useState<string[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>('');

  const onChangeTodoText = (event: ChangeEvent<HTMLInputElement>) => setTodoText(event.target.value);

  const onClickAdd = () => {
    if (todoText === '') return;
    const newTodos = [...unStartedTodos, todoText];
    setUnstartedTodos(newTodos);
    setTodoText('');
  };

  const onClickEdit = (index: number) => {
    setEditingIndex(index);
    setEditingText(incompleteTodos[index]);
  };

  const onSaveEdit = () => {
    if (editingIndex === null) return;
    const newTodos = [...incompleteTodos];
    newTodos[editingIndex] = editingText;
    setIncompleteTodos(newTodos);
    setEditingIndex(null);
    setEditingText('');
  };

  const onCancelEdit = () => {
    setEditingIndex(null);
    setEditingText('');
  };

  const onClickBegin = (index: number) => {
    const newUnstartedTodos = [...unStartedTodos];
    const movingTodo = unStartedTodos[index];
    newUnstartedTodos.splice(index, 1);
    const newIncompleteTodos = [...incompleteTodos, movingTodo];
    setUnstartedTodos(newUnstartedTodos);
    setIncompleteTodos(newIncompleteTodos);
  };

  const onClickDelete = (index: number) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  const onClickComplete = (index: number) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);

    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  const onClickBack = (index: number) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);

    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos);
  };

  const isMaxLimitIncompleteTodos = incompleteTodos.length >= 5;
  const isMaxLimitUnstartedTodos = unStartedTodos.length >= 5;

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={isMaxLimitIncompleteTodos}
      />
      {isMaxLimitIncompleteTodos && <p style={{ color: 'red' }}>登録できる未完了のTODOの上限に達しました</p>}
      {isMaxLimitUnstartedTodos && <p style={{ color: 'red' }}>登録できる未着手のTODOの上限に達しました</p>}
      <UnStartedTodo
        todos={unStartedTodos}
        onClickBegin={onClickBegin}
      />

      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
        onClickEdit={onClickEdit}
        editingIndex={editingIndex}
        editingText={editingText}
        setEditingText={setEditingText}
        onSaveEdit={onSaveEdit}
        onCancelEdit={onCancelEdit}
      />

      <CompleteTodos
        todos={completeTodos}
        onClickBack={onClickBack}
      />
    </>
  );
}
