import React, { useEffect, useState } from 'react';
import { getTopStories } from '../api';
import Story from './Story';

const TopStories = () => {
    const [ stories, setStories ] = useState([]);
    const [ isDataLoading, setIsDataLoading ] = useState(true);

    useEffect(() => {
       const getStoriesData = async () => {
        const { topStories } = await getTopStories(10);

        setStories(topStories || []);
        setIsDataLoading(false);
       };
       getStoriesData();
    }, []);

    return (<div id="top-stories">
        {isDataLoading && <p>Top Stories Loading</p>}
        {!isDataLoading && stories.length && <div>
            {
                stories.map(storyId => <Story storyId={storyId} key={storyId} />)
            }
        </div>}
    </div>);
};

export default TopStories;