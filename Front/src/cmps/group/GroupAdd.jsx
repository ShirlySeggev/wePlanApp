import { Component } from 'react';
import { CgClose } from 'react-icons/cg';
import { utilService } from '../../services/util.service.js';


export class GroupAdd extends Component {
    state = {
        toggleUpdate: false,
        group: {
            title: '',
        }
    }

    toggleUpdate = () => {
        this.setState({ toggleUpdate: !this.state.toggleUpdate })
    }

    handleChange = (ev) => {
        var group = { ...this.state.group }
        var { name, value } = ev.target
        group[name] = value;
        this.setState({ group })
    }

    onAddGroup = (ev) => {
        const {title} = this.state.group
    if (!title) return this.toggleUpdate()
        ev.preventDefault();
        const groupTitle = title;
        const group = this.createGroup(groupTitle);
        const { addGroup } = this.props;
        addGroup(group);
        this.clearGroup();
    }

    clearGroup = () => {
        this.setState({
            toggleUpdate: false,
            group: {
                title: '',
            }
        })
    }

    createGroup = (title) => {
        const group = {
            id: utilService.makeId(),
            createdBy: this.props.loggedInUser || utilService.getGuestUser(),
            title,
            tasks: [],
            style: {
                bgc: utilService.getRandomColor()
            },
        }
        return group;
    }

    render() {
        const { title } = this.state.group;
        const { toggleUpdate } = this.state;
        return (
            <div className="groupAdd">
                <form onSubmit={this.onAddGroup}>
                    <input type="text"
                        className="placeholder"
                        name="title"
                        value={title}
                        placeholder="+ Add another list"
                        autoComplete="off"
                        spellCheck="false"
                        onChange={this.handleChange}
                        onFocus={this.toggleUpdate}
                        // onBlur={this.onAddGroup}
                    />
                </form>
                {toggleUpdate &&
                    <div className="yes-no-btns">
                        <button className="primary-btn" onClick={this.onAddGroup}>Add list</button>
                        <CgClose className="cancel-btn" onClick={this.toggleUpdate} />
                    </div>}
            </div>
        )
    }
}

