export const Square = ({ children, isSelected, updateBoard, index }) => {

    // Para darle estilo al turno siguiente
    const className = `square ${isSelected ? 'is-selected' : ''} `;

    // Para controlar el siguiente turno
    const handlerClick = () => {
        updateBoard(index);
    }

    return (
        <div className={className} onClick={handlerClick}>
            {children}
        </div>
    )
}
