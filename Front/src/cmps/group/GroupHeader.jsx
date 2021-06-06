import { Component } from 'react';
import { ModalHeader } from '../shared/ModalHeader';
import { GroupHeaderBgc } from './GroupHeaderBgc';
import { BsThreeDots } from 'react-icons/bs';

let modalPos;
export class GroupHeader extends Component {
    state = {
        toggleActions: false,
        group: {
            title: '',
        },
        toggleBgc: false,
        togglesort: false

    }

    componentDidMount() {
        const { title } = this.props.group;
        const group = { title };
        this.setState({ group });
    }

    handleChange = (ev) => {
        var group = { ...this.state.group };
        var { name, value } = ev.target;
        group[name] = value;
        this.setState({ group })
    }

    editGroupName = (ev) => {
        ev.preventDefault();
        const { group, updateGroup } = this.props;
        const copyGroup = { ...group };
        copyGroup.title = this.state.group.title;
        updateGroup(copyGroup, `edited list name ${copyGroup.title}`);
    }

    changeGroupBgc = (bgcColor) => {
        console.log(bgcColor);
        const { group, updateGroup } = this.props;
        const copyGroup = { ...group };
        copyGroup.style.bgc = bgcColor;
        updateGroup(copyGroup, `edited ${copyGroup.title}'s color`);
    }
    sortGroupList = () => {
        const { group, updateGroup } = this.props;
        const sortedTasks = group.tasks.sort((task1, task2) => {
            return task1.title.localeCompare(task2.title)
        })
        updateGroup(sortedTasks)
    }

    toggleColor = () => {
        this.setState({ toggleBgc: !this.state.toggleBgc })
    }

    toggleActions = (ev) => {
        const { clientX, clientY } = ev
        modalPos = { left: (clientX) + 'px', top: (clientY - 80) + 'px' }
        this.setState({ toggleActions: !this.state.toggleActions })
    }

    removeGroup = () => {
        const { group, removeGroup } = this.props;
        removeGroup(group.id);
    }

    render() {
        const { title } = this.state.group;
        const { style } = this.props.group;
        const { toggleActions, toggleBgc } = this.state;

        return (
            <section className="GroupHeader" style={{ backgroundColor: style.bgc }}>
                <form className="group-header" onSubmit={this.editGroupName}>
                    <input type="text" 
                    name="title" 
                    value={title} 
                    autoComplete="off" 
                    spellCheck="false" 
                    onChange={this.handleChange} 
                    onBlur={this.editGroupName}
                    />
                    <BsThreeDots className="icon" onClick={this.toggleActions} />
                </form>
                <div className="group-actions">
                    {toggleActions && <div className="group-menu" >
                        <ModalHeader title='List actions' closeModal={this.toggleActions} />
                        <ul style={{ ...modalPos }} className="menu-options">
                            <li onClick={this.toggleColor} >Change group background</li>
                            {toggleBgc && <GroupHeaderBgc changeGroupBgc={this.changeGroupBgc} />}
                            <li onClick={this.removeGroup}>Delete list</li>
                            <li onClick={this.sortGroupList}>Sort list by name</li>

                        </ul>
                    </div>}
                </div>
            </section >
        )
    }
}

