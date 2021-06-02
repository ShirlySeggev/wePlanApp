import { Fragment } from 'react';
import { BoardPreview } from './BoardPreview.jsx';

export function BoardList({ boards }) {

  return (
    <Fragment>
      {boards.map(board =>
        <BoardPreview board={board} key={board._id} />
      )}
    </Fragment>

  )
}