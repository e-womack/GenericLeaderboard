import React from 'react';
import '../css/LeaderboardPlayer.css';

const LeaderboardPlayer = (props) => {
    return (
        <li onClick={props.click} className="LeaderBoardPlayer">
            <mark>{props.name}
            </mark>
            <mark id="score">
                {props.winCount}
                -{props.lossCount}
            </mark>
            <small id="rating">{props.tskillrating}</small>
        </li>
    )
};
export default LeaderboardPlayer;