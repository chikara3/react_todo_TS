import React, { ChangeEvent } from 'react';

type IncompleteTodosProps = {
  todos: string[];
  onClickComplete: (index: number) => void;
  onClickDelete: (index: number) => void;
  onClickEdit: (index: number) => void;
  editingIndex: number | null;
  editingText: string;
  setEditingText: (text: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
};

export const IncompleteTodos: React.FC<IncompleteTodosProps> = ({ todos, onClickComplete, onClickDelete, onClickEdit, editingIndex, editingText, setEditingText, onSaveEdit, onCancelEdit }) => {
  return (
    <div className='incomplete-area'>
      <p className='title'>未完了のTODO</p>
      <ul>
        {todos.map((todo, index) => (
          <li key={todo}>
            {editingIndex === index ? (
              <div className='list-row'>
                <input
                  value={editingText}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEditingText(e.target.value)}
                />
                <button onClick={onSaveEdit}>保存</button>
                <button onClick={onCancelEdit}>キャンセル</button>
              </div>
            ) : (
              <div className='list-row'>
                <p className='todo-item'>{todo}</p>
                <button onClick={() => onClickEdit(index)}>編集</button>
                <button onClick={() => onClickComplete(index)}>完了</button>
                <button onClick={() => onClickDelete(index)}>削除</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
