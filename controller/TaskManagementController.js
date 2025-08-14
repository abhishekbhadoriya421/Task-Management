const TaskList = require('../models/TaskList.js');
const CoreUser = require('../models/CoreUser.js');


exports.CreateTaskFormAction = async (req, res) => {
    const model = new TaskList();
    const users = await CoreUser.find({ status: 'Active' }).select('_id user_name user_email').lean();
    return res.status(200).render('task-management/create-task-form', {
        'model': model,
        'users': users
    });
}

