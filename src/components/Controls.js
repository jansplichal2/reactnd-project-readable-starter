import React from 'react';

const Controls = ({size, objectId, onVoteUp, onVoteDown, onEdit, onDelete}) => {

    const iconSizing = size === 'large' ? ' fa-2x' : '';
    const topMargin = size === 'large' ? ' mt-3' : 'mt-1';

    return (
        <div className="readable-control-list">
            <div>
                <li className={"fa fa-thumbs-up readable-control fa-fw" + iconSizing} onClick={() => onVoteUp(objectId)}
                    aria-hidden="true" title="Vote up"/>
                <li className={"ml-1 fa fa-thumbs-down readable-control fa-fw" + iconSizing} onClick={() => onVoteDown(objectId)}
                    aria-hidden="true" title="Vote down"/>
            </div>
            <div className={topMargin}>
                <li className={"fa fa-edit readable-control fa-fw" + iconSizing} onClick={() => onEdit(objectId)}
                    aria-hidden="true" title="Edit"/>
                <li className={"ml-1 fa fa-trash readable-control fa-fw" + iconSizing} onClick={() => onDelete(objectId)}
                    aria-hidden="true" title="Remove"/>
            </div>
        </div>
    );
};

export default Controls;