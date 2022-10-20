const client = require('./client')

const addActivityToRoutine = async( activityObj ) => {
    const {routineId, activityId, duration, repCount, sessionCompleted} = activityObj;
    const {rows: [ routine_activities ]} = await client.query(`
        INSERT INTO routine_activities('routineId', 'activityId', 'duration', 'repCount', 'sessionCompleted')
        VALUES ($1, $2, $3, $4, $5)
        RETURING *;
    ` [routineId, activityId, duration, repCount, sessionCompleted])

    return routine_activities;
};