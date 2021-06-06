
import React from 'react';
import { cloudinaryService } from '../../../services/cloudinary.service';
import { ModalHeader } from '../../shared/ModalHeader';

export class TaskImg extends React.Component {
    state = {
        imgUrl: '',
    }

    onUpload = async (ev) => {
        ev.preventDefault()
        const imgUrl = await cloudinaryService.uploadImg(ev)
        this.setState({ imgUrl })
        this.props.updateImg(this.state.imgUrl);
    }


    render() {
        const { modalPos, toggleImgUpload } = this.props;
        return (
            <div className="TaskImg-modal" style={{ ...modalPos }}>
                <ModalHeader title='Upload image' closeModal={toggleImgUpload} />
                <label
                    htmlFor="upload"
                    className="primary-btn"
                >
                    upload
                </label>
                <input
                    hidden
                    type="file"
                    id="upload"
                    onChange={(ev) => this.onUpload(ev)}
                />
            </div>

        )
    }
}
