import MemberAvatar from '../../shared/MemberAvatar'

export function TaskMembersPreview({members}) {
    return (
        <div className="task-members-preview-avatar">
            {members.map(member =>
                <MemberAvatar member={member} key={member._id} />
            )}
        </div>

    )
}
