import React from 'react';
import '../css/LeaderboardPlayer.css';

const LeaderboardPlayer = (props) => {
    return (
        <li onClick={props.click} className="LeaderBoardPlayer">
            <mark>{props.name}</mark>
            <small>{props.tskillrating}TS</small>
        </li>
    )
};
export default LeaderboardPlayer;