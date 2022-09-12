import Header from './Components/header/Header';
import SearchItem from './Components/search-item/SearchItem';
import AddItem from './Components/add-item/AddItem'
import Content from './Components/content/Content.js'
import Footer from './Components/footer/Footer'
import { useState } from 'react';

function App() {

    const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')));

    const [newItem, setNewItem] = useState('')
    const [search, setSearch] = useState('')

  const setAndSaveItems = (newItems) => {
    setItems(newItems);
    localStorage.setItems('shoppinglist', JSON.stringify(newItems));
  }

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1
    const myNewItem = { id, checked: false, item};
    const listItems = [...items, myNewItem];
    setAndSaveItems(listItems);
  }

  const handleCheck = (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, 
    checked: !item.checked } : item);
    setAndSaveItems(listItems)
  }

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setAndSaveItems(listItems)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem)
    setNewItem('');
  }

  return (
    <div>
      <div className="App">
      <Header title='Grocery List'/>
      <SearchItem 
        search={search}
        setSearch={setSearch}
      />
      <AddItem 
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <Content 
        items={items}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer length={items.length} />
      </div>
    </div>
  );
}

export default App;
