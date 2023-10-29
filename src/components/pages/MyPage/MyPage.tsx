import React, { useEffect } from 'react';
import { useAppDispatch } from '../../../store/store';
import { setHeader } from '../../layout/slices/headerslice';

const MyPage = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setHeader({title: ""}));
    },[]);

    return (
        <div>
            
        </div>
    );
};

export default MyPage;