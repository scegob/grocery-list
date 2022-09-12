import { FaTrashAlt } from 'react-icons/fa';

const LineItem = ({item, handleCheck, handleDelete}) => {
    return (
        <div>
            <li className='item'>
                    <input
                        type='checkbox'
                        onChange={() => handleCheck(item.id)}
                        checked={item.checked}
                    />
                    <label
                        style={(item.checked) ? { textDecoration: 
                            'line-through'} : null}
                        onDoubleClick={() => handleCheck(item.id)}
                    >{item.item}</label>
                    <FaTrashAlt
                        onClick={() => handleDelete(item.id)} 
                        role='button'
                        tabIndex='0'
                        /* A way to make the delete button accessible to screen readers. */
                        aria-label={`Delete ${item.item}`}
                    />
            </li>
        </div>
    )
}

export default LineItem