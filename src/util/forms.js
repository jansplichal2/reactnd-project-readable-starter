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


export const renderField = (props) => {

    const {
        input,
        label,
        type,
        meta: {touched, error}
    } = props;

    const showError = touched && error;
    const cls = styling(touched, error);

    return (
        <div className="form-group">
            <label>
                {label}
            </label>
            <input {...input} className={cls} ref={props.inputRef} placeholder={label} type={type}/>
            {showError &&
            <div className="invalid-feedback">
                {error}
            </div>}
        </div>);
};

export const renderTextarea = (props) => {
    const {
        input,
        label,
        rows,
        meta: {touched, error}
    } = props;

    const showError = touched && error;
    const cls = styling(touched, error);

    return (<div className="form-group">
        <label>
            {label}
        </label>
        <textarea {...input} className={cls} ref={props.inputRef} rows={rows}/>
        {showError &&
        <div className="invalid-feedback">
            {error}
        </div>}
    </div>);
};