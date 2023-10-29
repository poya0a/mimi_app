import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../store/store';
import { setHeader } from '../../layout/slices/headerslice';

const News = () => {

    const dispatch = useAppDispatch();
    const [selectedTab, setSelectedTab] = useState("");

    useEffect(() => {
        dispatch(setHeader({title: "소식"}));
    },[]);


    const onClickTab = (type: string) => {
        setSelectedTab(type);
    };

    return (
        <div className='newsArea'>

            <div className="herderTapArea">
                <button className={selectedTab === "" ? "active" : ""}
                onClick={() => onClickTab("")}>
                    전체
                </button>
                <button className={selectedTab === "알림" ? "active" : ""}
                onClick={() => onClickTab("알림")}>
                    알림
                </button>
                <button className={selectedTab === "활동" ? "active" : ""}
                onClick={() => onClickTab("활동")}>
                    활동
                </button>
            </div>
            
        </div>
    );
};

export default News;