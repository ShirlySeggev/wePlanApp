import { ChecklistPreview } from './ChecklistPreview';

export function ChecklistList({ task, checklists, updateTask, group }) {
    return (
        <div className="checklists-container">
            {checklists.map(checklist =>
                <ChecklistPreview
                    key={checklist.id}
                    task={task}
                    checklist={checklist}
                    updateTask={updateTask} 
                    group={group}
                    />
            )}
        </div>

    )
}