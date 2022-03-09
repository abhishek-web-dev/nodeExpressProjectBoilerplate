const CREATED = 'created'; // means job has assign to any live user
const RECEIVED = 'received';// means live user has completed the job and sent to BE

// complete status not require bec after completion job will be delete
const JOB_STATUS = [CREATED, RECEIVED];

module.exports = {
  CREATED,
  RECEIVED,
  JOB_STATUS
}