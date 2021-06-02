import { Component } from 'react';


export class BoardBackground extends Component {
    state = {
        bgc: [
            { color: "#61bd4f" },
            { color: "#f2d602" },
            { color: "#f99f1b" },
            { color: "#eb5a46" },
            { color: "#c377e0" },
            { color: "#1f79bf" },
        ],
    }

    onPickBgc = (idx) => {
        const newBgc = this.state.bgc[idx].color;
        const style = { bgc: newBgc };
        const { onBoardsCompose } = this.props;
        if(!onBoardsCompose) this.props.onUpdateBgc(style);
        else this.props.chooseBgc(style);
    }

    render() {
        const { bgc } = this.state;
        return (
            <section className="TaskGroupBgc-modal">
                <div className="colors-container">
                    {bgc.map((bgc, idx) => {
                        return (
                            <div className="b" key={bgc.id}
                                style={{ backgroundColor: bgc.color }}
                                onClick={() => this.onPickBgc(idx)}>
                            </div>
                        )
                    })
                    }
                </div>
            </section>
        )

    }

}