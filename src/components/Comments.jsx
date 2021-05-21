import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { getComments } from '../api';

const Comments = ({commentIds}) => {
    const [comments, setComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(true);

    useEffect(() => {
        const getCommentsForTheStory = async () => {
            const { comments } = await getComments(commentIds, 20);

            setComments(comments);
            setLoadingComments(false);
        };

        getCommentsForTheStory();
    }, [commentIds])

    return (<>
        {loadingComments && <div className="comments">Comments For the Story is loading</div>}
        {!loadingComments && comments && comments.length && <div className="comments-container">
            {comments.map(comment => (
                <div key={comment.id} className="comment">
                    <p dangerouslySetInnerHTML={{ __html: comment.text }}></p>
                    <div className="comment-meta-info">
                        <span>Posted By:<label>{comment.by || "NA"}</label></span>
                        <span>Posted At:<label title={moment(comment.time).utc().toString()}>{moment(comment.time).fromNow()}</label></span>
                    </div>
                </div>
            ))}
        </div>}
    </>);
};

export default Comments;