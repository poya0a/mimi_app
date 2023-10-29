import React from 'react';
import { useFormContext } from 'react-hook-form';
import { InputData } from './types/input.interface';
import { ErrorMessage } from '@hookform/error-message';

const Input = ({ data }: { data: InputData }) => {
    const {
        register,
        formState: { errors }
    } = useFormContext();

    return (
        <div className="inputArea">
            <label htmlFor={data.id} className={data.isRequired ? 'required' : ''}>{data.labelName}</label>
            <input 
                {...register(data.name, data.register)}
                type={data.type}
                id={data.id}
                disabled={data.isDisabled}
                placeholder={data.placeholder}
                autoComplete="off"
            />
            <ErrorMessage
                errors={errors}
                name={data.name}
                render={({ message }) => <p className={'errorMessage'}>{message}</p>}
            />
        </div>
    );
};

export default Input;