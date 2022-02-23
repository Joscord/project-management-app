import { useState} from 'react'

const filterList = ['all', 'design', 'mine', 'development', 'marketing', 'sales']

// Nótese que al botón le pasamosa una función anónima que referencia a otra función. Esto lo hacemos porque así podemos pasar el filtro como parámetro a esa función
export const ProjectFilter = () => {
    // Creamos un estado para el filtro escogido. Por default será todo
    const [currentFilter, setCurrentFilter] = useState('all');
    // Definimos la función para manejar el click
    const handleClick = filter => {
        // Actualizamos el estado del filtro
        setCurrentFilter(filter);
    }   
    return (
        <div className="project-filter">
            <nav>
                {filterList.map(filter => (
                    <button key={filter} onClick={() => handleClick(filter)} className={currentFilter === filter ? 'active' : ''}>
                        {filter}
                    </button>
                ))}
            </nav>
        </div>
    )
}
