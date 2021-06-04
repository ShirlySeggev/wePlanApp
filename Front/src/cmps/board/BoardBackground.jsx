import { Component } from 'react';


export class BoardBackground extends Component {
    state = {
        bgc: [
            { color: "#b1d3dd" },
            { color: "#FCC9A5" },
            { color: "#FFB1B8" },
            { color: "#C8BCD4" },
            { color: "#ACCFBF" },
            { color: "#FFFCDD" },
        ],
    }

    onPickBgc = (idx) => {
        const newBgc = this.state.bgc[idx].color;
        const style = { bgc: newBgc };
        const { onBoardsCompose } = this.props;
        if (!onBoardsCompose) this.props.onUpdateBgc(style);
        else this.props.chooseBgc(style);
    }

    render() {
        const { bgc } = this.state;
        return (
            <section className="TaskGroupBgc-modal">
                <div className="board-colors-container">
                    {bgc.map((bgc, idx) => {
                        return (
                            <div className="bgColor" key={bgc.id}
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