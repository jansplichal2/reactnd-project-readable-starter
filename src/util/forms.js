import React from 'react';

const styling = (touched, error) => {
    let style = 'form-control ';
    if (touched && error) {
        style += 'is-invalid';
    } else if (touched) {
        style += 'is-valid';
    }
    return style;
};


export const renderField = ({
                                input,
                                label,
                                type,
                                meta: {touched, error}
                            }) => {
    const showError = touched && error;
    const cls = styling(touched, error);

    return (
        <div className="form-group">
            <label>
                {label}
            </label>
            <input {...input} className={cls} placeholder={label} type={type}/>
            {showError &&
            <div className="invalid-feedback">
                {error}
            </div>}
        </div>);
};

export const renderTextarea = ({
                                   input,
                                   label,
                                   rows,
                                   meta: {touched, error}
                               }) => {
    const showError = touched && error;
    const cls = styling(touched, error);

    return (<div className="form-group">
        <label>
            {label}
        </label>
        <textarea {...input} className={cls} rows={rows}/>
        {showError &&
        <div className="invalid-feedback">
            {error}
        </div>}
    </div>);
};