import Header from './Components/header/Header';
import SearchItem from './Components/search-item/SearchItem';
import AddItem from './Components/add-item/AddItem';
import Content from './Components/content/Content.js';
import Footer from './Components/footer/Footer';
import apiRequest from './apiRequest';
import { useState, useEffect } from 'react';

function App() {
    const API_URL = 'http://localhost:3500/items';

    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');
    const [search, setSearch] = useState('');
    const [fetchError, setFetchError] = useState(null)
    const [isLoading, setIsLoading] = useState(true);

    // console.log('before useEffect')

    useEffect(() => {
        
      /**
       * When the component mounts, fetch the data from the API and set the state of the component to
       * the data received from the API.
       */
      const fetchItems = async () => {
        try {
          const response = await fetch(API_URL)
          if (!response.ok) throw Error ('Did not receive expected data')
          const listItems = await response.json();
          setItems(listItems)
          setFetchError(null)
        } catch (err) {
          setFetchError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      /* Delaying the fetchItems function by 2 seconds. */
      setTimeout(() => {
        (async () => await fetchItems())();
      }, 2000)
    }, [])

    // console.log('after useEffect')


  /**
   * It takes an item, creates a new item object with an id, checked property and the item, adds the
   * new item to the items array, and then posts the new item to the API
   * @param item - the item to be added to the list
   */
  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1
    const myNewItem = { id, checked: false, item};
    const listItems = [...items, myNewItem];
    setItems(listItems);
    
    const postOptions = {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myNewItem)
    }
    const result = await apiRequest(API_URL, postOptions)
    if (result) setFetchError(result);
  }

  /**
   * When the checkbox is clicked, the function will update the state of the item to checked or
   * unchecked, and then send a PATCH request to the API to update the database
   * @param id - the id of the item that was clicked
   */
  const handleCheck = async (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, 
    checked: !item.checked } : item);
    setItems(listItems)

    const myItem = listItems.filter((item) => item.id === id)
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checked: myItem[0].checked})
    };
    const requestUrl = `${API_URL}/${id}`;
    const result = await apiRequest(requestUrl, updateOptions);
    if (result) setFetchError(result); 
  }

  /**
   * It filters out the item with the id that matches the id passed in as an argument, and then sets
   * the state to the new list of items
   * @param id - the id of the item to be deleted
   */
  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems)

    const deleteOptions = { method: 'Delete'};
    const requestUrl = `${API_URL}/${id}`;
    const result = await apiRequest(requestUrl, deleteOptions);
    if (result) setFetchError(result); 
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem('');
  }

  return (
    <div>
      <div className="App">
      <Header title='Grocery List'/>
      <AddItem 
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem 
        search={search}
        setSearch={setSearch}
      />
      <main>
        {isLoading && <p>Loading Items...</p>}
        {fetchError && <p className='Error'>
          {` Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && <Content 
          items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />}
      </main>
      <Footer length={items.length} />
      </div>
    </div>
  );
}

export default App;
