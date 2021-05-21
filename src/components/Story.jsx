import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { getStoryById } from '../api';
import Comments from './Comments';

const Story = ({storyId}) => {
    const [ storyData, setStoryData ] = useState(null);
    const [loadingStoryData, setLoadingStoryData] = useState(true);
    const [viewComments, setViewComments] = useState(false);

    useEffect(() => {
        const getStoreData = async () => {
            const { story } = await getStoryById(storyId);

            setStoryData(story || null);
            setLoadingStoryData(false);
        };

        getStoreData();

        return () => {
            setViewComments(false);
        };
    }, [storyId]);

    return (<>
        {loadingStoryData && <div className="story">Story Data is loading</div>}
        {!loadingStoryData && storyData && <div className="story">
            <h3 title={storyData.title}><a href={storyData.url} target="_blank" rel="noreferrer">{storyData.title}</a></h3>
            <p dangerouslySetInnerHTML={{ __html: storyData.text }}></p>
            <div className="story-meta-info">
                <span className={`comments-btn ${!(storyData.kids || []).length ? 'disabled' : ''}`} onClick={(storyData.kids || []).length ? () => setViewComments(!viewComments) : null}>
                    {!viewComments ? `View Comments (${(storyData.kids || []).length})` : `Hide Comments (${(storyData.kids || []).length})`}
                </span>
                <span>Score:<label>{storyData.score || "NA"}</label></span>
                <span>Posted By:<label>{storyData.by || "NA"}</label></span>
                <span>Posted At:<label title={moment(storyData.time).utc().toString()}>{moment(storyData.time).fromNow()}</label></span>
            </div>
            {viewComments && <Comments commentIds={storyData.kids} />}
        </div>}
    </>);
};

export default Story;