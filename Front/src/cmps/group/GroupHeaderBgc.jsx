import { Component } from 'react';


export class GroupHeaderBgc extends Component {
    state = {
        colors: [
            { id: 'l101', color: "#61bd4f", isPicked: false },
            { id: 'l102', color: "#f2d602", isPicked: false },
            { id: 'l103', color: "#f99f1b", isPicked: false },
            { id: 'l104', color: "#eb5a46", isPicked: false },
            { id: 'l105', color: "#c377e0", isPicked: false },
            { id: 'l106', color: "#1f79bf", isPicked: false },
        ],
        color:null
        
    }
    
    onPickBgc = (idx) => {
        console.log('on pick');
        console.log(idx);
        const newColor=this.state.colors[idx].color
        this.setState({ picked: this.state.colors[idx].isPicked=true })
        // console.log(newColor);
        this.props.changeGroupBgc(newColor)

        
    }

    render() {
        const { colors } = this.state;
        return (
            <section className="TaskGroupBgc-modal">
                <div className="colors-container">
                {colors.map((color, idx) => {
                    return (
                        <div className="b" key={color.id}
                             style={ {backgroundColor: color.color} }
                             onClick={() => this.onPickBgc(idx)}> 
                        </div>
                    )
                })
                }</div>
            </section>
        )

    }

}