import { Component } from 'react';


export class GroupHeaderBgc extends Component {
    state = {
        colors: [
            { id: 'l101', color: "#FADA5E", isPicked: false },
            { id: 'l102', color: "#FCC9A5", isPicked: false },
            { id: 'l103', color: "#FFB1B8", isPicked: false },
            { id: 'l104', color: "#C8BCD4", isPicked: false },
            { id: 'l105', color: "#b1d3dd", isPicked: false },
            { id: 'l106', color: "#ACCFBF", isPicked: false },
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