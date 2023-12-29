const express = require('express');
const List = require('../Model/List')
const User = require('../Model/User')

const router = express.Router();

// create a new list
router.post('/:userId/create-list', async (req, resp) => {
    const userId = req.params.userId;

    try {
        const list = await List.create({ title: req.body.title, userId: userId });
        let listInfo = await list.save();

        if (listInfo) {
            const updatedUser = await User.findByIdAndUpdate(userId, { $push: { lists: listInfo._id } }, { new: true });
            if (updatedUser) {
                return resp.status(200).send(updatedUser)
            }
            else {
                return resp.send({ error: 'Error creating a new list' })
            }
        }
        else {
            return resp.send({ error: 'Error creating a new list' })
        }
    }
    catch (error) {
        console.log(error)
        return resp.status(500).send({ error: 'Internal Server Error..!' })
    }
})


router.get('/lists/all/:userId', async(req, resp)=> {
    const userId = req.params.userId;
    try {
        const lists = await List.find({userId: userId});
        resp.status(200).send(lists)
    }
    catch(error) {
        resp.status(500).send({error: 'Internal Server Error..!'})
    }

})


// get all tasks of a user int the lists
router.get('/get-all-tasks', async (req, resp) => {
    const listId = req.body.listId;
    try {
        const list = await List.find({ _id: listId })
        resp.status(200).send(list);
    }
   catch(error) {
        resp.status(500).send({error: 'Internal Server Error..!'})
   }
})

// create a new task
router.post('/:listId/create-task', async (req, resp) => {
    const listId = req.params.listId;

    const task = {
        taskTitle: req.body.taskTitle
    }
    try {
        const updatedList = await List.findByIdAndUpdate(listId, { $push: { tasks: task } }, { new: true });
        if (updatedList) {
            return resp.status(200).send(updatedList);
        }
        else {
            return resp.send({ error: 'Some error occured while creating a task' })
        }
    }
    catch (error) {
        resp.status(500).send({ error: 'Internal Server Error..!' })
    }

})

// update a task to completed
router.put('/update/:listId/:taskId', async (req, resp) => {
    const listId = req.params.listId;
    const taskId = req.params.taskId;

    try {
        const updatedList = await List.updateOne(
            { _id: listId, 'tasks._id': taskId },
            {
                $set: {
                    'tasks.$.isCompleted': true,
                },
            },

        )

        if (updatedList) {
            return resp.status(200).send(updatedList);
        }
        else {
            return resp.send({ error: 'Some error occured while updating a task' })
        }
    }
    catch (error) {
        console.log(error)
        resp.status(500).send({ error: 'Internal Server Error..!' })
    }
})



// drag and drop a task from one list to another
router.put('/move-task/:taskId', async (req, res) => {
    const { sourceListId, destinationListId } = req.body;
    const taskId = req.params.taskId;

    const task = {
        taskTitle: req.body.taskTitle
    }

    try {
        const sourceList = await List.findByIdAndUpdate(
            sourceListId,
            { $pull: { tasks: { _id: taskId } } },
            { new: true }
        );

        const updatedTask = sourceList.tasks.find((task) => task._id === taskId);

        const destinationList = await List.findByIdAndUpdate(
            destinationListId,
            { $push: { tasks: task } },
            { new: true }
        );

        res.status(200).send(destinationList);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

module.exports = router;