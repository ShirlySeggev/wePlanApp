
import React from 'react';
import { cloudinaryService } from '../../../services/cloudinary.service';

export class TaskImg extends React.Component {
    state = {
        imgUrl: '',
    }

    onUpload = async (ev) => {
        ev.preventDefault()
        const imgUrl = await cloudinaryService.uploadImg(ev)
        this.setState({imgUrl})
        // this.setState(prevState => {
        //     return {
        //         ...prevState.imgUrl,
        //         imgUrl: img.url
        //     }
        // }
        // )
        this.props.updateImg(this.state.imgUrl);
        this.props.toggleImgUpload();
    }


    render() {
        return (
            <div className="upload-img">
                <div className="upload-img-modal">
                    <label>
                        <input type="file" onChange={(ev) => this.onUpload(ev)} />
                    </label>
                </div>
            </div>

        )
    }
}
