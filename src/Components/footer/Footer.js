/**
 * It's a function that takes in a length prop and returns a footer with a paragraph that displays the
 * length of the list.
 * @returns The length of the list items.
 */
const Footer = ({ length }) => {
    return (
        <footer>
            <p>{length} List {length === 1 ? 'items' : 'items'}</p>
        </footer>
    )
}

export default Footer