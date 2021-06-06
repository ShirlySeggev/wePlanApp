import React from 'react';
import MemberAvatar from '../shared/MemberAvatar';
import { formatDistance } from 'date-fns';


export function ActivityLog({ activities }) {
    if (activities.length <= 0) return   <div className="activity">No activities to display</div>
    return (
        <section className="ActivityLog">
            {activities.map(activity => {
                return <div key={activity.id}>
                    <div className="activity">
                        <MemberAvatar member={activity.byMember} />
                        <div className="activity-description">
                            <p ><span>{activity.byMember.fullname}</span> {activity.txt} to <span>
                            {activity.task?.title} 
                            {activity.group?.title} 
                            {activity.board?.title}
                            {activity.app?.app}
                            </span>
                            </p>
                            <p>{formatDistance(activity.createdAt, Date.now())} ago</p>
                        </div>
                    </div>
                </div>
            })
            }
        </section>

    )
}