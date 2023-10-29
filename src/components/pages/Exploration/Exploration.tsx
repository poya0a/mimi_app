import React, { useEffect } from 'react';
import { useAppDispatch } from '../../../store/store';
import { setHeader } from '../../layout/slices/headerslice';

const Exploration = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setHeader({title: "추천"}));
    },[]);

    return (
        <div>
            
        </div>
    );
};

export default Exploration;