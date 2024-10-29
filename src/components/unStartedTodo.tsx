// unStartedTodo.tsx
import React from 'react';

type UnStartedTodoProps = {
  todos: string[];
  onClickBegin: (index: number) => void;
};

export const UnStartedTodo: React.FC<UnStartedTodoProps> = ({ todos, onClickBegin }) => {
  return (
    <div className='incomplete-area'>
      <p className='title'>未着手のTODO</p>
      <ul>
        {todos.map((todo, index) => (
          <li key={todo}>
            <div className='list-row'>
              <p className='todo-item'>{todo}</p>
              <button onClick={() => onClickBegin(index)}>着手</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
