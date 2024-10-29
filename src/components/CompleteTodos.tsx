import React from 'react';

type CompleteTodosProps = {
  todos: string[];
  onClickBack: (index: number) => void;
};

export const CompleteTodos: React.FC<CompleteTodosProps> = ({ todos, onClickBack }) => {
  return (
    <div className='complete-area'>
      <p className='title'>完了のTODO</p>
      <ul>
        {todos.map((todo, index) => (
          <li key={todo}>
            <div className='list-row'>
              <p className='todo-item'>{todo}</p>
              <button onClick={() => onClickBack(index)}>戻す</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
