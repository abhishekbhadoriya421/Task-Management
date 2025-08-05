const CoreUser = require('../models/CoreUser');

exports.DashboardAction = async (req,res)=>{
    const userModel = await CoreUser.find()
    return res.status(200).render('dashboard',{
        'userModel': userModel
    })
}

exports.AddUserAction = async (req,res) =>{
    return res.status(200).render('add_user_form');
}

exports.CreateUserAction = async (req,res) =>{
    if(req.method === 'POST'){
        const {user_name,user_email,employee_id,mobile_number} = req.body
        const model = new CoreUser();
        model.user_name = user_name;
        model.user_email = user_email;
        model.employee_id = employee_id;
        model.mobile_number = mobile_number;
        if(model.save()){
            return res.status(200).redirect('dashboard');
        }else{
            return res.status(500).render('add_user_form',{
                'message' : 'Something went wrong'
            });
        }
    }else{
        return res.status(403).redirect('dashboard');
    }
}

exports.UpdateUserFormAction = async (req,res)=>{
    const id = req.query.id
    if(!id){
        return res.status(403).redirect('dashboard');
    }else{
        //Find User Model
        const model = await CoreUser.find({'_id':id});
        if(model.length <=0){
            return res.status(404).redirect('dashboard',{
                'message':'User Not Found'
            });
        }else{
            return res.status(200).render('update-user-form',{
                'model': model
            });
        }
    }
}


exports.UpdateUserAction = async (req,res)=>{
    if(req.method !== 'POST'){
        return res.status(403).redirect('dashboard');
    }else{
        const {id,user_name,user_email,employee_id,mobile_number} = req.body
        //Find User Model
        const model = await CoreUser.findById(id);
        if(model.length <=0){
            return res.status(404).redirect('dashboard',{
                'message':'User Not Found'
            });
        }else{
            model.user_name = user_name;
            model.user_email = user_email;
            model.employee_id = employee_id;
            model.mobile_number = mobile_number;
            if(model.save()){
                return res.status(200).redirect('dashboard');
            }else{
                return res.status(500).render('update-user-form',{
                    'model': model
                });
            }
        }
    }
}


exports.DeleteUserAction = async (req,res)=>{
    const {id} = req.query
    if(id){
        const model = await CoreUser.findByIdAndDelete(id);
        if(model){
            console.log("Successfully Deleted")
            return res.status(200).redirect('dashboard');
        }else{
            console.log("Something went wrong")
            return res.status(200).redirect('dashboard');
        }
    }else{
        return res.status(403).redirect('dashboard');
    }
}