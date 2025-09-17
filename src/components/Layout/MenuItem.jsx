import React from 'react';

const MenuItem = (props) => {
  const { icon: IconComponent, label, id, isActive, onClick } = props;
  
  return (
    <li>
      <button
        onClick={() => onClick(id)}
        className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 ${
          isActive 
            ? 'bg-blue-600 text-white shadow-lg' 
            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`}
      >
        <IconComponent size={20} className="mr-3" />
        <span className="truncate">{label}</span>
      </button>
    </li>
  );
};

export default MenuItem;