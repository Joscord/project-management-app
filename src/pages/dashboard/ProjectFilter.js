const filterList = ['all', 'design', 'mine', 'development', 'marketing', 'sales']

export const ProjectFilter = ({currentFilter, changeFilter}) => {

    const handleClick = filter => {
        changeFilter(filter);
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
