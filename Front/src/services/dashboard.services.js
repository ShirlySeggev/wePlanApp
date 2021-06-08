export const dashboard = {
    getGroupTitle,
    getUndoneTasks,
    getDoneTasks,
    mapActivitiesByUsername,

}

function getGroupTitle(groups) {
    console.log(groups);
    const titles = []
    groups.map(group => {
        titles.push(group.title)
    })
    return titles
}

function mapActivitiesByUsername(activities) {
    return activities.reduce((acc, currAct) => {
        const { fullname } = currAct.byMember
        if (!acc[fullname]) acc[fullname] = 0
        acc[fullname]++
        return acc
    }, {})

}

function getDoneTasks(groups) {
    const tasks = groups.map(group => {
        const doneTasks = group.tasks.filter(task => {
            return task.isDone
        })
        return doneTasks
    })
    const labels = tasks.map(task => {
        return task.length
    })
    return labels

}


function getUndoneTasks(groups) {
    const tasks = groups.map(group => {
        const doneTasks = group.tasks.filter(task => {
            return !task.isDone
        })
        return doneTasks
    })
    const labels = tasks.map(task => {
        return task.length
    })
    return labels

}

