const schedule = require("node-schedule");

/**
 * do the job at correct time
 * */
class ScheduleJob {
    /**
     * date format - "30 * * * * *" (https://www.npmjs.com/package/node-schedule)
     * */
    constructor({job, date}) {
        this._job = job;
        this._date = date;
        this._init();
    }

    _init(){
        schedule.scheduleJob(this._date, () => {
            this._job();
        });
    }
}

module.exports = ScheduleJob;