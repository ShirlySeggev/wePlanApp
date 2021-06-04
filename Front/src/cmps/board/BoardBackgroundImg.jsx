import { Component } from 'react';


export class BoardBackgroundImg extends Component {
    state = {
        imgs: [
            "https://res.cloudinary.com/dzzvf5ewj/image/upload/v1622840656/faxybtxpe586a2lc5nsh.jpg",
            "https://res.cloudinary.com/dzzvf5ewj/image/upload/v1622842304/tkbrkv8xdk3k3f2swa25.jpg",
            "https://res.cloudinary.com/dgmwynlbw/image/upload/v1585211764/bgc/9.jpg",
            "https://res.cloudinary.com/dgmwynlbw/image/upload/v1585211772/bgc/10.jpg",
            "https://res.cloudinary.com/dgmwynlbw/image/upload/v1585211748/bgc/7.jpg",
            "https://res.cloudinary.com/dgmwynlbw/image/upload/v1585210885/bgc/4.webp",
            // "https://res.cloudinary.com/dgmwynlbw/image/upload/v1585210935/bgc/2.jpg",
            // "https://res.cloudinary.com/dgmwynlbw/image/upload/v1585211744/bgc/6.jpg",
            // "https://res.cloudinary.com/dgmwynlbw/image/upload/v1585210331/bgc/1.jpg",
            // "https://res.cloudinary.com/dgmwynlbw/image/upload/v1585210885/bgc/3.webp",
            // "https://res.cloudinary.com/dgmwynlbw/image/upload/v1585210885/bgc/5.webp",
            // "https://res.cloudinary.com/dgmwynlbw/image/upload/v1585211804/bgc/12.jpg",
        ]

    }


    componentDidMount() {
        console.log('helo');

    }

    onPickBgcImg = (idx) => {
        const bgcImg = this.state.imgs[idx]
        // const { onBoardsCompose } = this.props;
        // if (!onBoardsCompose) this.props.onUpdateBgcImg(style);
        // else this.props.chooseBgcImg(style);
        this.props.chooseBgcImg(bgcImg)
    }


    render() {
        const { imgs } = this.state;
        return (
            <section className="TaskGroupBgc-modal">
                <div className="board-img-container">
                    {imgs.map((img, idx) => {
                        return (
                            <img className="bgImg" key={img.id}
                                style={{ backgroundImage: `url(${img})` }}
                                onClick={() => this.onPickBgcImg(idx)} />
                        )
                    })
                    }
                </div>
            </section>
        )

    }

}