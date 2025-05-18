import React from 'react';
import dynamic from 'next/dynamic';

const Todo = dynamic(() => import('../pages/todo/Todo'), { ssr: false });

const Home = () => {
  return (
    <div className="App mt-5">
      <Todo />
    </div>
  );
};

export default Home;
