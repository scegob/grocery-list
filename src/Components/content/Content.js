import ItemList from "../item-list/ItemList"

const Content = ({ items, handleCheck, handleDelete}) => {

    return (
        // made the elements empty because I put elements in the app.js for the Content component
        <>
            {items.length ? (
            <ItemList 
            items={items}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
            />
        ) : (
            <p style={{ marginTop: '2rem' }}>Your list is empty</p>
        )}
        </>
    )
}

export default Content