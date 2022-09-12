import LineItem from "../line-item/LineItem"

const ItemList = ({items, handleCheck, handleDelete}) => {
    return (
        <div>
            <ul>
            {items.map((item) => (
                <LineItem 
                key={item.id}
                item={item}
                handleCheck={handleCheck}
                handleDelete={handleDelete}
                />
                ))}
            </ul>
        </div>
    )
}

export default ItemList