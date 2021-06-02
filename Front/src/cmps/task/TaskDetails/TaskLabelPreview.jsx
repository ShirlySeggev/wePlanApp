import { Fragment, Component } from 'react';

export class TaskLabelPreview extends Component {

    state = {
        isOpen: true
    }

    componentDidMount() {
        const status = this.props.isOpen;
        this.setState({ isOpen: status })
    }

    toggleLabel = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    render() {
        const { labelIds } = this.props;
        const { isOpen } = this.state;
        return (
            <Fragment>
                {labelIds.map(label => {
                    return label.isPicked ?
                        <div className={`label ${isOpen && 'open'}`} onClick={this.toggleLabel} style={{ backgroundColor: label.color }} key={label.id}><span>{isOpen ? label.title : ''}</span></div> :
                        ''
                })}
            </Fragment>

        )
    }
}