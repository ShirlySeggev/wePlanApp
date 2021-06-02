import React, { Component } from 'react';
import { ModalHeader } from '../../shared/ModalHeader.jsx';
import { BsPencil } from 'react-icons/bs';
import { BiCheck } from 'react-icons/bi';

export class TaskLabel extends Component {
    state = {
        labels: [
            { id: 'l101', color: "#61bd4f", title: '', isPicked: false },
            { id: 'l102', color: "#f2d602", title: '', isPicked: false },
            { id: 'l103', color: "#f99f1b", title: '', isPicked: false },
            { id: 'l104', color: "#eb5a46", title: '', isPicked: false },
            { id: 'l105', color: "#c377e0", title: '', isPicked: false },
            { id: 'l106', color: "#1f79bf", title: '', isPicked: false },
        ],
        labelsRef: []
    }

    componentDidMount() {
        const { labelIds } = this.props.task;
        if (!labelIds || labelIds.length <= 0) return;
        const labels = this.state.labels.map((label, idx) => {
            let currLabel = {
                id: label.id,
                color: label.color,
                title: labelIds[idx].title,
                isPicked: labelIds[idx].isPicked,
            }
            return currLabel;
        })
        this.setState({ labels });
        this.setLabelsRef();
    }

    handleChange = (ev, labelId, idx) => {
        ev.preventDefault();
        console.log(labelId, ev.target.value, idx);
        const title = ev.target.value;
        const newLabels = [...this.state.labels];
        newLabels[idx].title = title;
        this.setState({ labels: newLabels })
    }

    onPickLabel = (idx) => {
        const newLabels = [...this.state.labels];
        newLabels[idx].isPicked = !this.state.labels[idx].isPicked;
        this.setState({ labels: newLabels })
        this.updateLabel();
    }

    updateLabel = () => {
        const { updateTask, task } = this.props;
        const newTask = { ...task };
        newTask.labelIds = this.state.labels;
        updateTask(newTask);
    }

    onUpdateLabel = () => {
        this.updateLabel();
        this.props.toggleTaskLabel();
    }

    setLabelsRef = () => {
        const labelsRef = [];
        this.state.labels.forEach(label => {
            labelsRef.push(React.createRef())
        })
        this.setState({ labelsRef: labelsRef }, () => console.log(this.state))
    }

    setFocus = (ev, idx) => {
        ev.stopPropagation();
        const { labelsRef } = this.state;
        labelsRef[idx].current.focus();
    }

    render() {
        const { labels, labelsRef } = this.state;
        const { toggleTaskLabel, modalPos } = this.props;
        return (
            <section className="TaskLabel-modal" style={{ ...modalPos }}>
                <ModalHeader title='Labels' closeModal={toggleTaskLabel} />
                {labels.map((label, idx) => {
                    return (
                        <div className="label-container" key={label.id}>
                            <input
                                style={{ backgroundColor: label.color }}
                                value={label.title}
                                spellCheck="false"
                                onClick={() => this.onPickLabel(idx)}
                                onChange={(ev) => this.handleChange(ev, label.id, idx)}
                                ref={labelsRef[idx]}
                            >
                            </input>
                            <BsPencil title="edit label name" onClick={(ev) => this.setFocus(ev, idx)} />
                            {/* <BiCheck onClick={this.onUpdateLabel} /> */}
                        </div>
                    )
                })
                }
            </section>
        )
    }
}
