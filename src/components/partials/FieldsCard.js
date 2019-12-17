import React from 'react';

const FieldsCard = ({
  title,
  label,
  type,
  typ,
  retro,
  addField,
  deleteField,
  typer
}) => {
  return (
    <div className={type + ' card'}>
      <div className='title'>
        {title}
        <a href='#' className='more' onClick={() => addField(type)}>
          +
        </a>
      </div>
      <div className={'input-area ' + type + '-area'}>
        {retro[type].map((_item, index) => (
          <div key={typ + '-' + index} className='input-group'>
            <input
              type='text'
              name={typ}
              id={typ}
              value={retro[type][index]}
              onChange={e => typer(e, index, type)}
            />
            <label htmlFor={typ}>{label}</label>
            <a
              href='#'
              className='btn remove-input'
              onClick={() => deleteField(type, index)}
            >
              -
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FieldsCard;
