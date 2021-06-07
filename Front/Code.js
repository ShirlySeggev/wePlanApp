import React, { Component, Fragment } from 'react';
import { ChecklistAdd } from '../TaskCheckList/ChecklistAdd';
import { TaskDueDate } from './TaskDueDate';
import { TaskImg } from './TaskImg';
import { TaskMembers } from './TaskMembers';
import { TaskLabel } from './TaskLabel';


let modalPos;

class _TaskDetails extends Component {
    state = {
        task: null,
        group: null,
        isDate: false,
        toggleTaskLabel: false,
        toggleImgUpload: false,
        toggleAddCheckList: false,
        toggleMembers: false,
        toggleDueDate: false,
    }

    taskDetailsRef = React.createRef();

    toggle = (ev, key) => {
        const computed = {
            key
        }
        computed.key = 'toggle' + utilService.capitalize(key);
        console.log(computed.key);
        !this.state[computed.key] && this.modalPos(ev);
        this.setState({ [computed.key]: !this.state[computed.key] });
    }

    modalPos = (ev) => {
        let { top, left } = this.taskDetailsRef.current.getBoundingClientRect();
        top = parseFloat(top);
        left = parseFloat(left) + 100;
        const { clientX, clientY } = ev;
        modalPos = { left: clientX - left + 'px', top: (clientY - top) + 'px' };
    }

    render() {
        return (
            <section className="TaskDetails-modal">
                {toggleMembers && <TaskMembers modalPos={modalPos} members={board.members} task={task} toggleMembers={ev => this.toggle(ev, 'members')} updateTask={this.updateTask} />}
                {toggleTaskLabel && <TaskLabel modalPos={modalPos} task={task} updateTask={this.updateTask} toggleTaskLabel={ev => this.toggle(ev, 'taskLabel')} />}
                {toggleAddCheckList && <ChecklistAdd modalPos={modalPos} task={task} toggleAddCheckList={ev => this.toggle(ev, 'addCheckList')} updateTask={this.updateTask} />}
                {toggleImgUpload && <TaskImg modalPos={modalPos} updateImg={this.updateImg} toggleImgUpload={ev => this.toggle(ev, 'imgUpload')} />}
                {toggleDueDate && <TaskDueDate modalPos={modalPos} task={task} updateTask={this.updateTask} toggleDueDate={ev => this.toggle(ev, 'dueDate')} />}
            </section >
        )

    }
}

export class TaskLabel extends Component {
    render() {
        const { labels, labelsRef } = this.state;
        const { toggleTaskLabel, modalPos } = this.props;
        return (
            <section className="TaskLabel-modal" style={{ ...modalPos }}>
               
            </section>
        )
    }
}



