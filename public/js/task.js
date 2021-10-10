const taskIDDOM = document.querySelector('#taskID')
const taskNameDOM = document.querySelector('#taskName')
const taskCompletedDOM = document.querySelector('#taskCompleted')
const editFormDOM = document.querySelector('#single-task-form')
const params = window.location.search
const id = new URLSearchParams(params).get('id')

// load task
const loadTask = async () => {
  try {
    const { data: { task } } = await axios.get(`/api/v1/tasks/${id}`)
    const { _id: taskID, completed, name } = task
    console.log(completed)
    taskIDDOM.textContent = taskID
    taskNameDOM.value = name
    if(completed) {
      taskCompletedDOM.checked = true
    }
  } catch (e) {
    console.log(e);
  }
}

loadTask()

// updating task
editFormDOM.addEventListener('submit', async (e) => {
  e.preventDefault()
  try {
    const taskName = taskNameDOM.value
    const taskCompleted = taskCompletedDOM.checked

    const { data: { task } } = await axios.patch(`/api/v1/tasks/${id}`, {
      name: taskName,
      completed: taskCompleted
    })

    const { _id: taskID, completed, name } = task
    taskIDDOM.textContent = taskID
    taskNameDOM.value = name
    if(completed) {
      taskCompletedDOM.checked = true
    }

    location.href = '../index.html'
  } catch (e) {
    console.log(e)
  }
})

// delete 

const deleteTask = async () => {
  try {
    await axios.delete(`/api/v1/tasks/${id}`)
    location.href = '../index.html'
  } catch(err) {
    console.log({msg:err})
  }
}


