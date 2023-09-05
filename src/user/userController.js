var userService = require('./userService');

var getDataControllerFn = async (req, res) => {
    try {
        const employees = await userService.getDataFromDBService();
        res.json({ "status": true, "data": employees });
    } catch (error) {
        console.error(error);
        res.status(500).json({ "status": false, "message": "An error occurred while fetching data" });
    }
}

var createUserControllerFn = async (req, res) => {
    try {
        const status = await userService.createUserDBService(req.body);
        if (status) {
            res.json({ "status": true, "message": "User created successfully" });
        } else {
            res.json({ "status": false, "message": "Error creating user" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ "status": false, "message": "An error occurred while creating user" });
    }
}

var updateUserController = async (req, res) => {
    try {
        console.log(req.params.id);
        console.log(req.body);

        const result = await userService.updateUserDBService(req.params.id, req.body);

        if (result) {
            res.json({ "status": true, "message": "User Updated" });
        } else {
            res.json({ "status": false, "message": "User Update Failed" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ "status": false, "message": "An error occurred while updating user" });
    }
}

var deleteUserController = async (req, res) => {
    try {
        console.log(req.params.id);
        const result = await userService.removeUserDBService(req.params.id);
        if (result) {
            res.json({ "status": true, "message": "User Deleted" });
        } else {
            res.json({ "status": false, "message": "User Deletion Failed" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ "status": false, "message": "An error occurred while deleting user" });
    }
}

module.exports = { getDataControllerFn, createUserControllerFn, updateUserController, deleteUserController };
